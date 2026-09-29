import { expect, test, type Page } from "@playwright/test";

async function startCheckout(page: Page) {
  await page.goto("/products/midnight-runner-hoodie");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("button", { name: "Added to cart" })).toBeVisible();
  await page.goto("/cart");
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page).toHaveURL(/\/checkout\//);
}

async function fillShipping(page: Page) {
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Full name").fill("Ada Lovelace");
  await page.getByLabel("Address", { exact: true }).fill("1 Main St");
  await page.getByLabel("City").fill("Springfield");
  await page.getByLabel("State / region").fill("IL");
  await page.getByLabel("Postal code").fill("62701");
}

async function fillCard(page: Page, number: string) {
  await page.getByLabel("Card number").fill(number);
  await page.getByLabel("Expiry (MM/YY)").fill("12/40");
  await page.getByLabel("Security code").fill("123");
  await page.getByLabel("Name on card").fill("Ada Lovelace");
}

test.describe("checkout", () => {
  test("places an order and shows the confirmation; the cart starts fresh afterwards", async ({ page }) => {
    await startCheckout(page);
    await fillShipping(page);

    await expect(page.getByTestId("checkout-total")).toHaveText("$73.99");
    await page.getByText("Express", { exact: true }).click();
    await expect(page.getByTestId("checkout-total")).toHaveText("$82.99");

    await fillCard(page, "4242 4242 4242 4242");
    await page.getByRole("button", { name: "Pay $82.99" }).click();

    await expect(page).toHaveURL(/\/orders\/order_/);
    await expect(page.getByRole("heading", { name: "Thank you for your order!" })).toBeVisible();
    await expect(page.getByTestId("order-total")).toHaveText("$82.99");
    await expect(page.getByText("Visa ending in 4242")).toBeVisible();

    await page.goto("/cart");
    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });

  test("shows per-field errors and moves focus to the error summary", async ({ page }) => {
    await startCheckout(page);
    await page.getByRole("button", { name: /^Pay / }).click();

    const summary = page.getByRole("alert").filter({ hasText: "Please correct the highlighted fields." });
    await expect(summary).toBeFocused();
    await expect(page.getByLabel("Email")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Enter a valid email address.")).toBeVisible();
    await expect(page.getByText("Enter a valid card number.")).toBeVisible();
  });

  test("a declined card keeps the shopper on checkout with their address intact", async ({ page }) => {
    await startCheckout(page);
    await fillShipping(page);
    await fillCard(page, "4000 0000 0000 0002");
    await page.getByRole("button", { name: /^Pay / }).click();

    await expect(page.getByRole("alert").filter({ hasText: "Your card was declined" })).toBeVisible();
    await expect(page).toHaveURL(/\/checkout\//);
    await expect(page.getByLabel("Email")).toHaveValue("ada@example.com");
  });
});
