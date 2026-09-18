import { expect, test } from "@playwright/test";

test.describe("catalog", () => {
  test("search narrows results to matching products", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByRole("link", { name: "Trailblazer Backpack" })).toBeVisible();

    await page.getByPlaceholder("Search products…").fill("Midnight Runner");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(/[?&]q=Midnight\+Runner/);
    await expect(page.getByRole("link", { name: "Midnight Runner Hoodie" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Trailblazer Backpack" })).toHaveCount(0);
  });

  test("a category pill filters to that product type only", async ({ page }) => {
    await page.goto("/products");
    await page.getByRole("link", { name: "Bags", exact: true }).click();

    await expect(page).toHaveURL(/[?&]type=Bags/);
    await expect(page.getByRole("link", { name: "Trailblazer Backpack" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Midnight Runner Hoodie" })).toHaveCount(0);
  });

  test("Load more appends another page of results", async ({ page }) => {
    await page.goto("/products");

    const initialCount = await page.locator(".grid a[href^='/products/']").count();
    expect(initialCount).toBeGreaterThan(0);

    const loadMore = page.getByRole("button", { name: "Load more" });
    await expect(loadMore).toBeVisible();
    await loadMore.click();

    await expect(async () => {
      const count = await page.locator(".grid a[href^='/products/']").count();
      expect(count).toBeGreaterThan(initialCount);
    }).toPass();
  });
});
