import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { SelectField, TextAreaField, TextField } from "../components/Field.js";
import { requireNativeBackend } from "../lib/adapters.js";
import { requireAdmin } from "../lib/admin-auth.server.js";
import { toUserError } from "../lib/errors.js";
import { parseMoneyInput } from "../lib/money-input.js";

const FIELDS = ["title", "handle", "description", "productType", "vendor", "tags", "status", "imageUrl", "price", "inventoryQuantity", "sku"] as const;
type Values = Partial<Record<(typeof FIELDS)[number], string>>;

export async function loader({ request }: LoaderFunctionArgs) {
  requireNativeBackend();
  await requireAdmin(request);
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const native = requireNativeBackend();
  await requireAdmin(request);
  const form = await request.formData();
  const values: Values = Object.fromEntries(FIELDS.map((f) => [f, String(form.get(f) ?? "")]));

  const price = parseMoneyInput(values.price ?? "");
  const inventory = Number(values.inventoryQuantity);
  const status = values.status === "active" ? "active" : "draft";
  if (price == null) {
    return Response.json({ error: "Please correct the highlighted fields.", fieldErrors: { price: "Enter a price like 19.99." }, values }, { status: 400 });
  }

  try {
    const product = native.admin.createProduct({
      title: values.title ?? "",
      handle: values.handle,
      description: values.description ?? "",
      productType: values.productType,
      vendor: values.vendor,
      tags: (values.tags ?? "").split(","),
      status,
      imageUrl: values.imageUrl?.trim() || null,
      price,
      inventoryQuantity: Number.isInteger(inventory) ? inventory : -1,
      sku: values.sku,
    });
    return redirect(`/admin/products/${product.id}`);
  } catch (err) {
    const { message, status: httpStatus, fieldErrors } = toUserError(err);
    return Response.json({ error: message, fieldErrors, values }, { status: httpStatus });
  }
}

export default function AdminNewProduct() {
  const actionData = useActionData<{ error: string; fieldErrors: Record<string, string>; values: Values }>();
  const navigation = useNavigation();
  const errors = actionData?.fieldErrors ?? {};
  const v = actionData?.values ?? {};

  return (
    <div className="max-w-2xl">
      <Link to="/admin/products" className="text-sm text-neutral-500 hover:underline dark:text-neutral-400">
        ← Products
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Add product</h1>

      <Form method="post" noValidate className="mt-6 space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
        {actionData?.error ? (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {actionData.error}
          </p>
        ) : null}
        <TextField label="Title" name="title" required defaultValue={v.title} error={errors.title} />
        <TextField label="Handle (URL slug)" name="handle" defaultValue={v.handle} error={errors.handle} hint="Leave blank to generate from the title." />
        <TextAreaField label="Description" name="description" rows={4} defaultValue={v.description} />
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField label="Price" name="price" inputMode="decimal" required placeholder="0.00" defaultValue={v.price} error={errors.price} />
          <TextField
            label="Inventory"
            name="inventoryQuantity"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={v.inventoryQuantity ?? "0"}
            error={errors.inventoryQuantity}
          />
          <TextField label="SKU" name="sku" defaultValue={v.sku} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Product type" name="productType" defaultValue={v.productType} />
          <TextField label="Vendor" name="vendor" defaultValue={v.vendor} />
        </div>
        <TextField label="Tags" name="tags" defaultValue={v.tags} hint="Comma-separated" />
        <TextField label="Image URL" name="imageUrl" type="url" defaultValue={v.imageUrl} error={errors.imageUrl} />
        <SelectField label="Status" name="status" defaultValue={v.status ?? "draft"}>
          <option value="draft">Draft — hidden from the store</option>
          <option value="active">Active — visible in the store</option>
        </SelectField>
        <button
          type="submit"
          disabled={navigation.state !== "idle"}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          Create product
        </button>
      </Form>
    </div>
  );
}
