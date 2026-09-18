import type { LoaderFunctionArgs } from "react-router";
import { getAdapters } from "../lib/adapters.js";
import { listProductTypes } from "../lib/categories.js";
import { absoluteUrl } from "../lib/seo.js";

function xmlEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { commerce } = getAdapters();
  // A single large page covers this demo's whole catalog; a bigger store
  // would need to paginate through commerce.searchProducts and/or split
  // into multiple sitemap files under a sitemap index.
  const [products, types] = await Promise.all([commerce.searchProducts({ first: 100 }), listProductTypes(commerce)]);

  const urls = [
    absoluteUrl(request, "/"),
    absoluteUrl(request, "/products"),
    ...types.map((type) => absoluteUrl(request, `/products?type=${encodeURIComponent(type)}`)),
    ...products.edges.map((edge) => absoluteUrl(request, `/products/${edge.node.handle}`)),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
