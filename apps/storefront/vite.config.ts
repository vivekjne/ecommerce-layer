import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [reactRouter()],
  test: {
    environment: "node",
  },
});
