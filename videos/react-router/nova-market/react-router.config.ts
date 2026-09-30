import type { Config } from "@react-router/dev/config";

export default {
  // pages are server rendered by default
  ssr: true,
  // pages that never change are built once, at build time
  async prerender() {
    return ["/about"];
  },
} satisfies Config;
