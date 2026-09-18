import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const PORT = 5183;

// Some sandboxes pre-install a browser at a fixed path outside Playwright's
// own version-pinned cache (so `playwright install` isn't needed/allowed
// there). Use it only when present; otherwise fall back to Playwright's
// normal browser resolution, which is what a standard dev machine or CI
// image expects.
const preinstalledChromium = process.env.PLAYWRIGHT_CHROMIUM_PATH ?? "/opt/pw-browsers/chromium";
const executablePath = existsSync(preinstalledChromium) ? preinstalledChromium : undefined;

export default defineConfig({
  testDir: "./e2e",
  // All specs share one dev-server process and one in-memory mock adapter
  // singleton (getAdapters() in app/lib/adapters.ts) — there's no per-test
  // backend isolation, so running specs concurrently races real requests
  // against shared state. Serialize instead of trading reliability for
  // speed on a suite this small.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
