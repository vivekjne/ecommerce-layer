import { data, Form, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/checkout";
import { commitSession, getSession } from "~/sessions.server";
import { createOrder } from "~/db.server";
import { CATALOG_URL, type Product } from "~/lib/types";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (Object.keys(session.get("cart") ?? {}).length === 0)
    throw redirect("/cart");
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const address = String(form.get("address") ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name";
  if (!email.includes("@"))
    errors.email = "Enter a valid email address";
  if (address.length < 8) errors.address = "Enter your full address";
  if (Object.keys(errors).length > 0) {
    return data(
      { errors, values: { name, email, address } },
      { status: 400 },
    );
  }

  const session = await getSession(request.headers.get("Cookie"));
  const cart = session.get("cart") ?? {};
  const items = await Promise.all(
    Object.entries(cart).map(async ([slug, quantity]) => {
      const product: Product = await (
        await fetch(`${CATALOG_URL}/products/${slug}`)
      ).json();
      return {
        slug,
        name: product.name,
        price: product.price,
        quantity,
      };
    }),
  );
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const id = createOrder({
    userEmail: email,
    name,
    address,
    items,
    total,
  });

  session.set("cart", {});
  return redirect(`/order/${id}`, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  defaultValue?: string;
};

function Field({ name, label, error, defaultValue }: FieldProps) {
  const border = error ? "border-rose-400" : "border-slate-300";
  return (
    <label className="block font-semibold">
      {label}
      <input
        name={name}
        defaultValue={defaultValue}
        className={"mt-1 w-full rounded-lg border px-3 py-2 " + border}
      />
      {error && (
        <em className="text-sm not-italic text-rose-600">{error}</em>
      )}
    </label>
  );
}

export default function Checkout({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const placing = navigation.formAction === "/checkout";
  const errors = actionData?.errors;
  const values = actionData?.values;

  return (
    <div className="mx-auto max-w-lg">
      <title>Checkout | Nova Market</title>
      <h1 className="text-3xl font-black">Checkout</h1>
      <Form method="post" className="mt-6 space-y-4">
        <Field
          name="name"
          label="Name"
          error={errors?.name}
          defaultValue={values?.name}
        />
        <Field
          name="email"
          label="Email"
          error={errors?.email}
          defaultValue={values?.email}
        />
        <Field
          name="address"
          label="Address"
          error={errors?.address}
          defaultValue={values?.address}
        />
        <button
          disabled={placing}
          className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:bg-slate-400"
        >
          {placing ? "Placing order..." : "Place order"}
        </button>
      </Form>
    </div>
  );
}
