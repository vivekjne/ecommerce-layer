import { expect, test } from "@playwright/test";

async function addHoodieToCart(page: import("@playwright/test").Page) {
  await page.goto("/products/midnight-runner-hoodie");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("button", { name: "Added to cart" })).toBeVisible();
}

test.describe("cart", () => {
  test("shows an empty state with no cart cookie", async ({ page }) => {
    await page.goto("/cart");
    await expect(page.getByText("Your cart is empty")).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse products" })).toBeVisible();
  });

  test("reflects an item added from the PDP, and quantity/remove controls work", async ({ page }) => {
    await addHoodieToCart(page);
    await page.goto("/cart");

    await expect(page.getByText("Midnight Runner Hoodie")).toBeVisible();
    await expect(page.getByTestId("line-total")).toHaveText("$68.00");
    await expect(page.getByTestId("cart-total")).toHaveText("$68.00");

    await page.getByRole("button", { name: "Increase quantity" }).click();
    await expect(page.getByTestId("line-total")).toHaveText("$136.00");
    await expect(page.getByTestId("cart-total")).toHaveText("$136.00");

    await page.getByRole("button", { name: "Remove" }).click();
    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });

  test("Checkout takes the shopper to the hosted checkout page", async ({ page }) => {
    await addHoodieToCart(page);
    await page.goto("/cart");

    await page.getByRole("button", { name: "Checkout" }).click();

    await expect(page).toHaveURL(/\/checkout\/checkout_/);
    await expect(page.getByRole("heading", { name: "Checkout", level: 1 })).toBeVisible();
    await expect(page.getByText("Midnight Runner Hoodie")).toBeVisible();
  });
});
