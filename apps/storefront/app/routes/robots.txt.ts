import type { LoaderFunctionArgs } from "react-router";
import { absoluteUrl } from "../lib/seo.js";

export function loader({ request }: LoaderFunctionArgs) {
  const body = ["User-agent: *", "Allow: /", "Disallow: /cart", "Disallow: /api/", "", `Sitemap: ${absoluteUrl(request, "/sitemap.xml")}`, ""].join(
    "\n",
  );

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
