// Drives the real Nova Market app and saves the preview frames used in the video.
//   (catalog API on :4000, app on :5173)   node demo/capture.mjs
import { chromium } from "/tmp/claude-0/pw/node_modules/playwright-core/index.mjs";
import { writeFileSync } from "node:fs";

const BASE = "http://localhost:5173";
const OUT = new URL("./frames/", import.meta.url).pathname;
const exe = process.env.HYPERFRAMES_BROWSER_PATH;
const browser = await chromium.launch({ executablePath: exe });
const manifest = {};
const setDelay = (q) => fetch("http://localhost:4000/__delay?" + q);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage() {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 640 }, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/");
  await page.waitForLoadState("networkidle");
  return page;
}
async function shot(page, name, click) {
  // raw CDP capture: page.screenshot() would wait for the streamed response to finish
  const cdp = page.__cdp ?? (page.__cdp = await page.context().newCDPSession(page));
  const { data } = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 88 });
  writeFileSync(OUT + name + ".jpg", Buffer.from(data, "base64"));
  const u = new URL(page.url());
  manifest[name] = { url: u.pathname + u.search, click: click ?? null };
  console.log("shot", name, manifest[name].url);
}
async function clickShot(page, locator, name, wait = 0) {
  const box = await locator.boundingBox();
  const click = box ? { x: Math.round(box.x + box.width / 2), y: Math.round(box.y + box.height / 2) } : null;
  await locator.click();
  if (wait) await sleep(wait);
  await shot(page, name, click);
}
await setDelay("list=150&item=100&reviews=1800");

// --- plain pages -----------------------------------------------------------
let page = await newPage();
await shot(page, "home");
await page.goto(BASE + "/products"); await page.waitForLoadState("networkidle"); await shot(page, "products");
await page.goto(BASE + "/products?q=mug"); await page.waitForLoadState("networkidle"); await shot(page, "products-mug");
await page.goto(BASE + "/products?q=zzz"); await page.waitForLoadState("networkidle"); await shot(page, "products-empty");

// --- streaming reviews -------------------------------------------------------
await setDelay("reviews=2200");
await page.goto(BASE + "/products/ceramic-mug", { waitUntil: "commit" });
await sleep(700); await shot(page, "reviews-loading");
await page.getByText("My favourite mug").waitFor(); await shot(page, "reviews-loaded");
await setDelay("reviews=1800");

// --- error boundaries --------------------------------------------------------
await page.goto(BASE + "/products/nope"); await page.waitForLoadState("networkidle"); await shot(page, "product-404");
await page.goto(BASE + "/nothing-here"); await page.waitForLoadState("networkidle"); await shot(page, "root-404");

// --- pending navigation ------------------------------------------------------
await page.goto(BASE + "/"); await page.waitForLoadState("networkidle");
await setDelay("list=1600");
await clickShot(page, page.getByRole("link", { name: "Products", exact: true }).first(), "nav-pending", 500);
await page.waitForLoadState("networkidle"); await sleep(1400); await setDelay("list=150");

// --- fetcher: add to cart ----------------------------------------------------
await page.goto(BASE + "/products"); await page.waitForLoadState("networkidle");
await setDelay("item=1300");
await clickShot(page, page.getByRole("button", { name: "Add to cart" }).first(), "add-busy", 350);
await sleep(2200); await shot(page, "add-done"); await setDelay("item=100");
// out of stock: city sneaker has 3 in stock
const sneaker = page.getByRole("button", { name: /^(Add to cart|Added to cart|Adding)/ }).nth(1);
for (let i = 0; i < 3; i++) { await sneaker.click(); await sleep(700); }
await sneaker.click(); await sleep(900); await shot(page, "add-error");

// --- live search (fetcher.load) ------------------------------------------------
await page.goto(BASE + "/"); await page.waitForLoadState("networkidle");
await page.getByPlaceholder("Search products").click();
await page.getByPlaceholder("Search products").pressSequentially("s", { delay: 80 });
await sleep(900); await shot(page, "live-search");

// --- cart with optimistic quantity ---------------------------------------------
await page.goto(BASE + "/cart"); await page.waitForLoadState("networkidle"); await shot(page, "cart");
await setDelay("item=1500");
await clickShot(page, page.getByRole("button", { name: "+" }).first(), "cart-optimistic", 300);
await sleep(2400); await setDelay("item=100");

// --- checkout: validation, pending, success ------------------------------------
await page.goto(BASE + "/checkout"); await page.waitForLoadState("networkidle");
await clickShot(page, page.getByRole("button", { name: "Place order" }), "checkout-errors", 600);
await page.locator("input[name=name]").fill("Sam Rivera");
await page.locator("input[name=email]").fill("sam@example.com");
await page.locator("input[name=address]").fill("12 Harbour Street, Portland");
await shot(page, "checkout-filled");
await setDelay("item=1400");
await clickShot(page, page.getByRole("button", { name: "Place order" }), "checkout-pending", 450);
await page.waitForURL(/\/order\//); await page.waitForLoadState("networkidle"); await setDelay("item=100");
await shot(page, "order");

// --- auth middleware -----------------------------------------------------------
const anon = await newPage();
await anon.goto(BASE + "/account"); await anon.waitForLoadState("networkidle"); await shot(anon, "login-redirect");
await anon.getByRole("button", { name: "Log in" }).click(); await anon.waitForURL(/\/account$/); await anon.waitForLoadState("networkidle");
await shot(anon, "account");

// --- resource routes ------------------------------------------------------------
await anon.goto(BASE + "/search?q=mu"); await shot(anon, "resource-search");

// --- client loader: recently viewed ---------------------------------------------
const rv = await newPage();
await rv.goto(BASE + "/products"); await rv.waitForLoadState("networkidle");
await rv.locator(`a[href="/products/trail-runner"]`).first().click(); await rv.waitForURL(/products\//); await sleep(700);
await rv.getByRole("link", { name: "Home", exact: true }).click(); await rv.waitForURL(BASE + "/"); await sleep(700);
await shot(rv, "home-recent");

writeFileSync(OUT + "manifest.json", JSON.stringify(manifest, null, 1));
await browser.close();
console.log("frames:", Object.keys(manifest).length);
