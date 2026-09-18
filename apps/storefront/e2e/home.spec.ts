import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the hero, category tiles, and featured products", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Shop the collection" })).toBeVisible();

    // Category tiles derived from the catalog's product types.
    await expect(page.getByRole("link", { name: "Hoodie", exact: true })).toBeVisible();

    // Featured grid has at least one real product link.
    await expect(page.getByRole("link", { name: "Midnight Runner Hoodie" })).toBeVisible();
  });

  test("a category tile navigates to the filtered catalog", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Hoodie", exact: true }).click();

    await expect(page).toHaveURL(/\/products\?type=Hoodie/);
    await expect(page.getByRole("link", { name: "Midnight Runner Hoodie" })).toBeVisible();
  });

  test("the chat bubble is present on every page and opens a panel", async ({ page }) => {
    await page.goto("/");
    const bubble = page.getByRole("button", { name: "Open shopping assistant" });
    await expect(bubble).toBeVisible();

    await bubble.click();
    await expect(page.getByText("How can I help you shop today?")).toBeVisible();
    await expect(page.getByRole("button", { name: "Show me some hoodies" })).toBeVisible();
  });
});
