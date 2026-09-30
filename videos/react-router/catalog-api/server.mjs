// A tiny catalog REST API for the Nova Market demo (port 4000).
// GET /products?q=&category=   GET /products/:slug   GET /products/:slug/reviews (slow)
import { createServer } from "node:http";

const products = [
  { slug: "trail-runner", name: "Trail Runner", category: "shoes", price: 8900, stock: 12, color: "#f472b6", art: "shoe", description: "Lightweight shoes with grippy soles for wet trails." },
  { slug: "city-sneaker", name: "City Sneaker", category: "shoes", price: 7400, stock: 3, color: "#22d3ee", art: "shoe", description: "Clean white leather for everyday wear." },
  { slug: "ceramic-mug", name: "Ceramic Mug", category: "home", price: 1800, stock: 40, color: "#fbbf24", art: "mug", description: "Hand glazed, dishwasher safe, holds 350 ml." },
  { slug: "desk-lamp", name: "Desk Lamp", category: "home", price: 4600, stock: 0, color: "#a78bfa", art: "lamp", description: "Warm dimmable light with a flexible arm." },
  { slug: "day-backpack", name: "Day Backpack", category: "bags", price: 6500, stock: 9, color: "#34d399", art: "bag", description: "20 litres, water resistant, padded laptop sleeve." },
  { slug: "wireless-headphones", name: "Wireless Headphones", category: "audio", price: 12900, stock: 6, color: "#fb7185", art: "phones", description: "Noise cancelling with 30 hours of battery." },
];
const reviews = {
  "trail-runner": [{ author: "Priya", stars: 5, text: "Grippy and light. Perfect for muddy runs." }, { author: "Marco", stars: 4, text: "Runs a little narrow." }],
  "city-sneaker": [{ author: "Lena", stars: 5, text: "Goes with everything." }],
  "ceramic-mug": [{ author: "Omar", stars: 5, text: "My favourite mug, and it keeps coffee hot." }, { author: "Kim", stars: 4, text: "Lovely glaze." }],
  "desk-lamp": [{ author: "Ayo", stars: 4, text: "Great light, wish it was in stock." }],
  "day-backpack": [{ author: "Jo", stars: 5, text: "Fits my laptop and lunch." }],
  "wireless-headphones": [{ author: "Sven", stars: 5, text: "Quiet on the train. Battery lasts forever." }],
};
// delays can be changed while running (used to capture loading states): GET /__delay?list=1500&item=800&reviews=2500
const delays = { list: Number(process.env.LIST_DELAY ?? 150), item: Number(process.env.ITEM_DELAY ?? 100), reviews: Number(process.env.REVIEWS_DELAY ?? 1800) };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const send = (res, status, body) => { res.writeHead(status, { "content-type": "application/json", "access-control-allow-origin": "*" }); res.end(JSON.stringify(body)); };

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const parts = url.pathname.split("/").filter(Boolean);
  if (url.pathname === "/__delay") { for (const k of Object.keys(delays)) if (url.searchParams.has(k)) delays[k] = Number(url.searchParams.get(k)); return send(res, 200, delays); }
  if (parts[0] !== "products") return send(res, 404, { error: "not found" });
  if (parts.length === 1) {
    const q = (url.searchParams.get("q") ?? "").toLowerCase();
    const category = url.searchParams.get("category");
    await sleep(delays.list);
    return send(res, 200, products.filter((p) => (!q || p.name.toLowerCase().includes(q)) && (!category || p.category === category)));
  }
  const product = products.find((p) => p.slug === parts[1]);
  if (!product) return send(res, 404, { error: "not found" });
  if (parts[2] === "reviews") {
    await sleep(delays.reviews);
    return send(res, 200, reviews[product.slug] ?? []);
  }
  await sleep(delays.item);
  return send(res, 200, product);
}).listen(4000, () => console.log("catalog api on http://localhost:4000"));
