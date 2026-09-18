import { expect, test } from "@playwright/test";

test.describe("chat widget", () => {
  test("opens and closes without navigating away from the current page", async ({ page }) => {
    await page.goto("/products");

    await page.getByRole("button", { name: "Open shopping assistant" }).click();
    await expect(page.getByText("How can I help you shop today?")).toBeVisible();
    await expect(page).toHaveURL("/products");

    await page.getByRole("button", { name: "Close shopping assistant" }).click();
    await expect(page.getByText("How can I help you shop today?")).toBeHidden();
  });

  test("persists across a client-side route navigation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open shopping assistant" }).click();
    await expect(page.getByText("How can I help you shop today?")).toBeVisible();

    await page.getByRole("link", { name: "Shop", exact: true }).click();
    await expect(page).toHaveURL(/\/products/);

    // Still open — mounted once in root.tsx, not remounted per route.
    await expect(page.getByRole("button", { name: "Close shopping assistant" })).toBeVisible();
  });

  test("a suggestion chip sends a user message", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open shopping assistant" }).click();
    await page.getByRole("button", { name: "Show me some hoodies" }).click();

    await expect(page.getByText("Show me some hoodies", { exact: true })).toBeVisible();
  });
});
