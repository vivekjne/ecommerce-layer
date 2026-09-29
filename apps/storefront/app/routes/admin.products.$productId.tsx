import type { Variant } from "@commerce/core";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { SelectField, TextAreaField, TextField } from "../components/Field.js";
import { requireNativeBackend } from "../lib/adapters.js";
import { requireAdmin } from "../lib/admin-auth.server.js";
import { toUserError } from "../lib/errors.js";
import { formatMoneyInput, parseMoneyInput } from "../lib/money-input.js";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const native = requireNativeBackend();
  await requireAdmin(request);
  const product = native.admin.getProduct(params.productId!);
  if (!product) throw new Response("Product not found", { status: 404 });
  return { product };
}

type ActionResult =
  | { scope: "product"; saved: true }
  | { scope: "product"; error: string; fieldErrors: Record<string, string> }
  | { scope: "variant"; variantId: string; saved: true }
  | { scope: "variant"; variantId: string; error: string; fieldErrors: Record<string, string> };

export async function action({ request, params }: ActionFunctionArgs) {
  const native = requireNativeBackend();
  await requireAdmin(request);
  const form = await request.formData();
  const text = (name: string) => String(form.get(name) ?? "");

  if (form.get("intent") === "variant") {
    const variantId = text("variantId");
    const price = parseMoneyInput(text("price"));
    const compareAtRaw = text("compareAtPrice").trim();
    const compareAtPrice = compareAtRaw ? parseMoneyInput(compareAtRaw) : null;
    const inventory = Number(text("inventoryQuantity"));
    const fieldErrors: Record<string, string> = {};
    if (price == null) fieldErrors.price = "Enter a price like 19.99.";
    if (compareAtRaw && compareAtPrice == null) fieldErrors.compareAtPrice = "Enter a price like 24.99, or leave blank.";
    if (!Number.isInteger(inventory) || inventory < 0) fieldErrors.inventoryQuantity = "Enter 0 or more.";
    if (Object.keys(fieldErrors).length > 0) {
      return Response.json({ scope: "variant", variantId, error: "Fix the highlighted fields.", fieldErrors } satisfies ActionResult, { status: 400 });
    }
    try {
      native.admin.updateVariant(variantId, { price: price!, compareAtPrice, inventoryQuantity: inventory, sku: text("sku") });
      return { scope: "variant", variantId, saved: true } satisfies ActionResult;
    } catch (err) {
      const { message, status, fieldErrors: fe } = toUserError(err);
      return Response.json({ scope: "variant", variantId, error: message, fieldErrors: fe } satisfies ActionResult, { status });
    }
  }

  try {
    native.admin.updateProduct(params.productId!, {
      title: text("title"),
      description: text("description"),
      status: text("status") as "active" | "draft" | "archived",
      productType: text("productType"),
      vendor: text("vendor"),
      tags: text("tags").split(","),
    });
    return { scope: "product", saved: true } satisfies ActionResult;
  } catch (err) {
    const { message, status, fieldErrors } = toUserError(err);
    return Response.json({ scope: "product", error: message, fieldErrors } satisfies ActionResult, { status });
  }
}

const CELL_INPUT =
  "w-full min-w-20 rounded-lg border bg-white px-2.5 py-1.5 text-sm tabular-nums dark:bg-neutral-950 dark:text-neutral-100";

function VariantRow({ variant, result, busy }: { variant: Variant; result: ActionResult | undefined; busy: boolean }) {
  const formId = `variant-${variant.id}`;
  const mine = result?.scope === "variant" && result.variantId === variant.id ? result : undefined;
  const errors = mine && "error" in mine ? mine.fieldErrors : {};
  const border = (field: string) => (errors[field] ? "border-red-500" : "border-neutral-200 dark:border-neutral-800");
  const label = variant.title === "Default Title" ? "Default variant" : variant.title;

  return (
    <tr>
      <th scope="row" className="px-4 py-3 text-left font-medium text-neutral-900 dark:text-neutral-100">
        {label}
        {mine && "error" in mine ? (
          <p role="alert" className="mt-1 text-xs font-normal text-red-600 dark:text-red-400">
            {Object.values(mine.fieldErrors)[0] ?? mine.error}
          </p>
        ) : null}
        {mine && "saved" in mine ? (
          <p role="status" className="mt-1 text-xs font-normal text-emerald-600 dark:text-emerald-400">
            Saved
          </p>
        ) : null}
      </th>
      <td className="px-2 py-3">
        <input form={formId} name="sku" aria-label={`SKU for ${label}`} defaultValue={variant.sku ?? ""} className={`${CELL_INPUT} ${border("sku")}`} />
      </td>
      <td className="px-2 py-3">
        <input
          form={formId}
          name="price"
          inputMode="decimal"
          aria-label={`Price for ${label}`}
          aria-invalid={errors.price ? true : undefined}
          defaultValue={formatMoneyInput(variant.price.amount)}
          className={`${CELL_INPUT} ${border("price")}`}
        />
      </td>
      <td className="px-2 py-3">
        <input
          form={formId}
          name="compareAtPrice"
          inputMode="decimal"
          aria-label={`Compare-at price for ${label}`}
          aria-invalid={errors.compareAtPrice ? true : undefined}
          defaultValue={formatMoneyInput(variant.compareAtPrice?.amount)}
          className={`${CELL_INPUT} ${border("compareAtPrice")}`}
        />
      </td>
      <td className="px-2 py-3">
        <input
          form={formId}
          name="inventoryQuantity"
          type="number"
          min={0}
          step={1}
          aria-label={`Inventory for ${label}`}
          aria-invalid={errors.inventoryQuantity ? true : undefined}
          defaultValue={variant.inventoryQuantity}
          className={`${CELL_INPUT} ${border("inventoryQuantity")}`}
        />
      </td>
      <td className="px-4 py-3 text-right">
        <Form method="post" id={formId}>
          <input type="hidden" name="intent" value="variant" />
          <input type="hidden" name="variantId" value={variant.id} />
          <button
            type="submit"
            disabled={busy}
            aria-label={`Save ${label}`}
            className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-neutral-900"
          >
            Save
          </button>
        </Form>
      </td>
    </tr>
  );
}

export default function AdminProduct() {
  const { product } = useLoaderData<typeof loader>();
  const result = useActionData<ActionResult>();
  const navigation = useNavigation();
  const busy = navigation.state !== "idle";
  const productResult = result?.scope === "product" ? result : undefined;
  const productErrors = productResult && "error" in productResult ? productResult.fieldErrors : {};

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin/products" className="text-sm text-neutral-500 hover:underline dark:text-neutral-400">
          ← Products
        </Link>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{product.title}</h1>
          {product.status === "active" ? (
            <a href={`/products/${product.handle}`} className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
              View in store
            </a>
          ) : null}
        </div>
      </div>

      <Form method="post" className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">Details</h2>
        <input type="hidden" name="intent" value="product" />
        {productResult && "error" in productResult ? (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {productResult.error}
          </p>
        ) : null}
        {productResult && "saved" in productResult ? (
          <p role="status" className="text-sm text-emerald-600 dark:text-emerald-400">
            Product saved.
          </p>
        ) : null}
        <TextField label="Title" name="title" required defaultValue={product.title} error={productErrors.title} />
        <TextAreaField label="Description" name="description" rows={4} defaultValue={product.description} />
        <div className="grid gap-4 sm:grid-cols-3">
          <SelectField label="Status" name="status" defaultValue={product.status}>
            <option value="active">Active — visible in store</option>
            <option value="draft">Draft — hidden</option>
            <option value="archived">Archived — hidden</option>
          </SelectField>
          <TextField label="Product type" name="productType" defaultValue={product.productType ?? ""} />
          <TextField label="Vendor" name="vendor" defaultValue={product.vendor ?? ""} />
        </div>
        <TextField label="Tags" name="tags" defaultValue={product.tags.join(", ")} hint="Comma-separated" />
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-neutral-900"
        >
          Save details
        </button>
      </Form>

      <section aria-labelledby="variants-heading" className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <h2 id="variants-heading" className="px-5 pt-5 font-semibold text-neutral-900 dark:text-neutral-100">
          Pricing &amp; inventory
        </h2>
        <div className="overflow-x-auto">
          <table className="mt-3 w-full text-sm">
            <thead className="border-y border-neutral-200 text-left text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Variant</th>
                <th scope="col" className="px-2 py-2.5 font-medium">SKU</th>
                <th scope="col" className="px-2 py-2.5 font-medium">Price ({product.minPrice.currencyCode})</th>
                <th scope="col" className="px-2 py-2.5 font-medium">Compare at</th>
                <th scope="col" className="px-2 py-2.5 font-medium">Inventory</th>
                <th scope="col" className="px-4 py-2.5">
                  <span className="sr-only">Save</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {product.variants.map((variant) => (
                <VariantRow key={variant.id} variant={variant} result={result} busy={busy} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
