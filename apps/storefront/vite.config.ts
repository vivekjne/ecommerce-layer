import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  test: {
    environment: "node",
    // e2e/**.spec.ts is Playwright's, not vitest's — the default include
    // glob (**/*.spec.ts) would otherwise pick both up.
    exclude: ["**/node_modules/**", "e2e/**"],
  },
});
