import type { Money } from "@commerce/core";
import { useEffect, useRef, useState } from "react";
import { Form, Link, redirect, useActionData, useLoaderData, useNavigation } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "react-router";
import { SelectField, TextField } from "../components/Field.js";
import { requireNativeBackend } from "../lib/adapters.js";
import { cartCookie } from "../lib/cart-cookie.js";
import { toUserError } from "../lib/errors.js";
import { formatMoney } from "../lib/format.js";
import { SITE_NAME } from "../lib/seo.js";

const COUNTRIES: [code: string, name: string][] = [
  ["US", "United States"],
  ["CA", "Canada"],
  ["GB", "United Kingdom"],
  ["AU", "Australia"],
  ["DE", "Germany"],
  ["FR", "France"],
  ["IN", "India"],
  ["JP", "Japan"],
  ["NL", "Netherlands"],
  ["NZ", "New Zealand"],
];

const ADDRESS_FIELDS = ["email", "name", "line1", "line2", "city", "region", "postalCode", "country", "shippingRate"] as const;
type AddressValues = Partial<Record<(typeof ADDRESS_FIELDS)[number], string>>;

export async function loader({ params }: LoaderFunctionArgs) {
  const native = requireNativeBackend();
  const checkout = native.checkouts.get(params.checkoutId!);
  if (!checkout) throw new Response("Checkout not found", { status: 404 });
  if (checkout.status === "completed" && checkout.orderId) throw redirect(`/orders/${checkout.orderId}`);
  return { checkout };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const native = requireNativeBackend();
  const form = await request.formData();
  const field = (name: string) => String(form.get(name) ?? "");

  try {
    const { orderId } = await native.checkouts.complete(params.checkoutId!, {
      email: field("email"),
      shippingAddress: {
        name: field("name"),
        line1: field("line1"),
        line2: field("line2"),
        city: field("city"),
        region: field("region"),
        postalCode: field("postalCode"),
        country: field("country"),
      },
      shippingRateId: field("shippingRate"),
      card: { number: field("cardNumber"), expiry: field("cardExpiry"), cvc: field("cardCvc"), name: field("cardName") },
    });
    // The cart is now an order — drop it so the next Add to Cart starts fresh.
    return redirect(`/orders/${orderId}`, { headers: { "Set-Cookie": await cartCookie.serialize("", { maxAge: 0 }) } });
  } catch (err) {
    const { message, status, fieldErrors } = toUserError(err);
    // Echo back what the shopper typed so they don't retype it — except card details, which are never sent back.
    const values: AddressValues = Object.fromEntries(ADDRESS_FIELDS.map((name) => [name, field(name)]));
    return Response.json({ error: message, fieldErrors, values }, { status });
  }
}

export const meta: MetaFunction = () => [{ title: `Checkout — ${SITE_NAME}` }, { name: "robots", content: "noindex, nofollow" }];

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
      {children}
    </h2>
  );
}

export default function CheckoutRoute() {
  const { checkout } = useLoaderData<typeof loader>();
  const { tax } = checkout;
  const actionData = useActionData<{ error: string; fieldErrors: Record<string, string>; values: AddressValues }>();
  const navigation = useNavigation();
  const submitting = navigation.state !== "idle" && navigation.formMethod === "POST";
  const errorRef = useRef<HTMLDivElement>(null);

  const errors = actionData?.fieldErrors ?? {};
  const values = actionData?.values ?? {};
  const [rateId, setRateId] = useState(values.shippingRate || checkout.shippingOptions[0]?.id || "");
  const rate = checkout.shippingOptions.find((o) => o.id === rateId);
  const shipping = rate?.price.amount ?? 0;
  const total: Money = { amount: checkout.subtotal.amount + shipping + tax.amount, currencyCode: checkout.currencyCode };

  // Move focus to the error summary so keyboard and screen reader users land on what went wrong.
  useEffect(() => {
    if (actionData?.error) errorRef.current?.focus();
  }, [actionData]);

  if (checkout.lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Nothing to check out</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">This checkout's cart is empty.</p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <Form method="post" noValidate className="space-y-8" aria-describedby={actionData?.error ? "checkout-error" : undefined}>
          {actionData?.error ? (
            <div
              ref={errorRef}
              id="checkout-error"
              role="alert"
              tabIndex={-1}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 outline-none dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              {actionData.error}
            </div>
          ) : null}

          <section aria-labelledby="contact-heading" className="space-y-4">
            <SectionHeading id="contact-heading">Contact</SectionHeading>
            <TextField label="Email" name="email" type="email" autoComplete="email" required defaultValue={values.email} error={errors.email} hint="We'll send your receipt here." />
          </section>

          <section aria-labelledby="shipping-heading" className="space-y-4">
            <SectionHeading id="shipping-heading">Shipping address</SectionHeading>
            <TextField label="Full name" name="name" autoComplete="name" required defaultValue={values.name} error={errors.name} />
            <TextField label="Address" name="line1" autoComplete="address-line1" required defaultValue={values.line1} error={errors.line1} />
            <TextField label="Apartment, suite, etc. (optional)" name="line2" autoComplete="address-line2" defaultValue={values.line2} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="City" name="city" autoComplete="address-level2" required defaultValue={values.city} error={errors.city} />
              <TextField label="State / region" name="region" autoComplete="address-level1" required defaultValue={values.region} error={errors.region} />
              <TextField label="Postal code" name="postalCode" autoComplete="postal-code" required defaultValue={values.postalCode} error={errors.postalCode} />
              <SelectField label="Country" name="country" autoComplete="country" required defaultValue={values.country || "US"} error={errors.country}>
                {COUNTRIES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </SelectField>
            </div>
          </section>

          <fieldset className="space-y-3">
            <legend className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Shipping method</legend>
            {errors.shippingRate ? <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.shippingRate}</p> : null}
            {checkout.shippingOptions.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm has-[:checked]:border-indigo-600 has-[:checked]:ring-2 has-[:checked]:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-950"
              >
                <input
                  type="radio"
                  name="shippingRate"
                  value={option.id}
                  checked={rateId === option.id}
                  onChange={() => setRateId(option.id)}
                  className="h-4 w-4 accent-indigo-600"
                />
                <span className="flex-1">
                  <span className="block font-medium text-neutral-900 dark:text-neutral-100">{option.title}</span>
                  <span className="block text-xs text-neutral-500 dark:text-neutral-400">{option.description}</span>
                </span>
                <span className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                  {option.price.amount === 0 ? "Free" : formatMoney(option.price)}
                </span>
              </label>
            ))}
          </fieldset>

          <section aria-labelledby="payment-heading" className="space-y-4">
            <SectionHeading id="payment-heading">Payment</SectionHeading>
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
              <strong>Test mode — no real charges.</strong> Use card 4242 4242 4242 4242 with any future expiry and any CVC. Card 4000 0000 0000 0002 is always
              declined.
            </p>
            <TextField label="Card number" name="cardNumber" autoComplete="cc-number" inputMode="numeric" required error={errors.cardNumber} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Expiry (MM/YY)" name="cardExpiry" autoComplete="cc-exp" placeholder="MM/YY" required error={errors.cardExpiry} />
              <TextField label="Security code" name="cardCvc" autoComplete="cc-csc" inputMode="numeric" required error={errors.cardCvc} />
            </div>
            <TextField label="Name on card" name="cardName" autoComplete="cc-name" required error={errors.cardName} />
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 disabled:opacity-50"
          >
            {submitting ? "Placing order…" : `Pay ${formatMoney(total)}`}
          </button>
        </Form>

        <aside aria-labelledby="summary-heading" className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 lg:sticky lg:top-24 dark:border-neutral-800 dark:bg-neutral-950">
          <SectionHeading id="summary-heading">Order summary</SectionHeading>
          <ul className="mt-4 divide-y divide-neutral-100 dark:divide-neutral-900">
            {checkout.lines.map((line) => (
              <li key={line.id} className="flex items-center gap-3 py-3">
                {line.image ? (
                  <img src={line.image.url} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                ) : (
                  <div aria-hidden="true" className="h-14 w-14 shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-900" />
                )}
                <div className="min-w-0 flex-1 text-sm">
                  <div className="truncate font-medium text-neutral-900 dark:text-neutral-100">{line.title}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {line.variantTitle} · Qty {line.quantity}
                  </div>
                </div>
                <div className="text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-100">{formatMoney(line.lineTotal)}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-sm dark:border-neutral-900">
            <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{formatMoney(checkout.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
              <dt>Shipping</dt>
              <dd className="tabular-nums">{shipping === 0 ? "Free" : formatMoney({ amount: shipping, currencyCode: checkout.currencyCode })}</dd>
            </div>
            {tax.amount > 0 ? (
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <dt>Tax</dt>
                <dd className="tabular-nums">{formatMoney(tax)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-neutral-100 pt-2 text-base font-semibold text-neutral-900 dark:border-neutral-900 dark:text-neutral-100">
              <dt>Total</dt>
              <dd data-testid="checkout-total" className="tabular-nums">
                {formatMoney(total)}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            <Link to="/cart" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
              Edit cart
            </Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
