import { expect, test, type Page } from "@playwright/test";

// Matches ADMIN_PASSWORD in playwright.config.ts's webServer env.
const PASSWORD = "e2e-admin";

async function signIn(page: Page, path = "/admin") {
  await page.goto(path);
  await expect(page).toHaveURL(/\/admin\/login/);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
}

async function placeOrder(page: Page) {
  await page.goto("/products/trailrunner-shorts");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("button", { name: "Added to cart" })).toBeVisible();
  await page.goto("/cart");
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByLabel("Email").fill("grace@example.com");
  await page.getByLabel("Full name").fill("Grace Hopper");
  await page.getByLabel("Address", { exact: true }).fill("2 Navy Way");
  await page.getByLabel("City").fill("Arlington");
  await page.getByLabel("State / region").fill("VA");
  await page.getByLabel("Postal code").fill("22202");
  await page.getByLabel("Card number").fill("4242 4242 4242 4242");
  await page.getByLabel("Expiry (MM/YY)").fill("12/40");
  await page.getByLabel("Security code").fill("123");
  await page.getByLabel("Name on card").fill("Grace Hopper");
  await page.getByRole("button", { name: /^Pay / }).click();
  await expect(page).toHaveURL(/\/orders\//);
  return (await page.getByText(/^Order #\d+$/).textContent())!.replace("Order ", "");
}

test.describe("admin", () => {
  test("requires sign-in, rejects a wrong password, and returns to the requested page", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page).toHaveURL(/\/admin\/login\?redirectTo=%2Fadmin%2Forders/);

    await page.getByLabel("Password").fill("wrong");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("Incorrect password.")).toBeVisible();

    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL("/admin/orders");
    await expect(page.getByRole("heading", { name: "Orders", level: 1 })).toBeVisible();
  });

  test("a new order shows up and can be fulfilled", async ({ page }) => {
    const orderNumber = await placeOrder(page);

    await signIn(page, "/admin/orders");
    await page.getByRole("link", { name: orderNumber, exact: true }).click();
    await expect(page.getByText("grace@example.com")).toBeVisible();

    await page.getByRole("button", { name: "Mark as fulfilled" }).click();
    await expect(page.getByText("Fulfilled", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Mark as fulfilled" })).toHaveCount(0);
  });

  test("editing inventory in the admin is reflected on the storefront", async ({ page }) => {
    await signIn(page, "/admin/products?q=Midnight");
    await page.getByRole("link", { name: "Midnight Runner Hoodie" }).click();

    await page.getByLabel("Inventory for Heather Grey / L").fill("0");
    await page.getByRole("button", { name: "Save Heather Grey / L" }).click();
    await expect(page.getByText("Saved")).toBeVisible();

    await page.goto("/products/midnight-runner-hoodie");
    await page.getByText("Heather Grey", { exact: true }).click();
    await page.getByText("L", { exact: true }).click();
    await expect(page.getByRole("button", { name: "Out of stock" })).toBeDisabled();
  });

  test("a product created in the admin is purchasable in the store", async ({ page }) => {
    await signIn(page, "/admin/products/new");
    await page.getByLabel("Title").fill("Summit Beanie");
    await page.getByLabel("Price").fill("24.00");
    await page.getByLabel("Inventory").fill("10");
    await page.getByLabel("Status").selectOption("active");
    await page.getByRole("button", { name: "Create product" }).click();
    await expect(page.getByRole("heading", { name: "Summit Beanie", level: 1 })).toBeVisible();

    await page.goto("/products/summit-beanie");
    await expect(page.getByText("$24.00")).toBeVisible();
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByRole("button", { name: "Added to cart" })).toBeVisible();
  });
});
