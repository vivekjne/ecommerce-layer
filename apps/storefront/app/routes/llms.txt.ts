import type { LoaderFunctionArgs } from "react-router";
import { getAdapters } from "../lib/adapters.js";
import { listProductTypes } from "../lib/categories.js";
import { absoluteUrl, SITE_NAME } from "../lib/seo.js";

// https://llmstxt.org — a markdown file at /llms.txt describing the site
// for LLMs/AI agents to read, the way robots.txt/sitemap.xml describe it
// for crawlers and search engines.
export async function loader({ request }: LoaderFunctionArgs) {
  const { commerce } = getAdapters();
  const [featured, types] = await Promise.all([commerce.searchProducts({ first: 10 }), listProductTypes(commerce)]);

  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> A demo ecommerce storefront over a normalized, AI-native commerce layer. Prices and inventory are mock data for demonstration, not a real store.",
    "",
    "## Shop",
    "",
    `- [All products](${absoluteUrl(request, "/products")}): Full catalog. Supports \`?q=\` free-text search and \`?type=\` category filtering.`,
    ...types.map((type) => `- [${type}](${absoluteUrl(request, `/products?type=${encodeURIComponent(type)}`)}): Products in the ${type} category.`),
    "",
    "## Featured products",
    "",
    ...featured.edges.map((edge) => {
      const p = edge.node;
      return `- [${p.title}](${absoluteUrl(request, `/products/${p.handle}`)}): ${p.description}`;
    }),
    "",
    "## For AI agents and assistants",
    "",
    "- This storefront exposes an MCP server (search_products, get_product, get_cart, add_to_cart, update_cart_line, remove_from_cart, create_checkout) for programmatic, conversational shopping — see the project repository for connection details.",
    "- Every page also embeds an in-browser AI shopping assistant (chat bubble, bottom right of the screen) for the same operations without leaving the page.",
    "- Cart and checkout writes always require the shopper's explicit confirmation before they execute — no action is ever taken on a model's tool call alone.",
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
