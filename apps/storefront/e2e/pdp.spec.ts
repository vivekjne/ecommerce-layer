import { expect, test } from "@playwright/test";

test.describe("product detail page", () => {
  test("selecting a variant updates price and availability", async ({ page }) => {
    await page.goto("/products/midnight-runner-hoodie");

    await expect(page.getByRole("heading", { name: "Midnight Runner Hoodie" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add to cart" })).toBeEnabled();

    await page.getByRole("button", { name: "Cobalt Blue" }).click();
    await page.getByRole("button", { name: "M", exact: true }).click();
    await expect(page.getByRole("button", { name: "Add to cart" })).toBeEnabled();
  });

  test("an unknown handle 404s instead of crashing", async ({ page }) => {
    const response = await page.goto("/products/does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("Add to cart updates the button state and the header badge", async ({ page }) => {
    await page.goto("/products/midnight-runner-hoodie");

    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByRole("button", { name: "Added to cart" })).toBeVisible();

    await expect(page.getByRole("link", { name: "View cart" })).toContainText("1");
  });
});
