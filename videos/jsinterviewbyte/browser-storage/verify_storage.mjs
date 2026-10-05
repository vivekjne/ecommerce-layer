// Verifies every browser-storage fact shown in the video, in headless Chromium on http://localhost.
import http from "node:http";
import fs from "node:fs";
import { chromium } from "/tmp/claude-0/pw/node_modules/playwright-core/index.mjs";
const seen = [];
const srv = http.createServer((req, res) => {
  if (req.url.startsWith("/echo")) { seen.push(req.headers.cookie || "(none)"); res.end(req.headers.cookie || ""); return; }
  if (req.url.startsWith("/login")) { res.setHeader("Set-Cookie", "sid=abc123; HttpOnly; Path=/; SameSite=Lax"); res.end("ok"); return; }
  res.setHeader("content-type", "text/html"); res.end("<!doctype html><title>t</title><p>shop</p>");
}).listen(0);
const O = `http://localhost:${srv.address().port}`;
const out = []; const log = (k, v) => out.push(k + ": " + (typeof v === "string" ? v : JSON.stringify(v)));
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell" });
const ctx = await b.newContext();
const p1 = await ctx.newPage(); await p1.goto(O + "/");
// 1. localStorage stores strings
log("1 localStorage types", await p1.evaluate(() => {
  localStorage.setItem("count", 42); localStorage.setItem("user", { name: "Ada" });
  localStorage.setItem("cart", JSON.stringify({ items: 3 }));
  return { count: localStorage.getItem("count"), countType: typeof localStorage.getItem("count"), user: localStorage.getItem("user"), cartBack: JSON.parse(localStorage.getItem("cart")).items };
}));
// 2. tabs: localStorage shared, sessionStorage per tab, survives reload
await p1.evaluate(() => sessionStorage.setItem("draft", "Hello"));
await p1.reload();
log("2 sessionStorage after reload (same tab)", await p1.evaluate(() => sessionStorage.getItem("draft")));
const p2 = await ctx.newPage(); await p2.goto(O + "/");
log("2 new tab sees localStorage count", await p2.evaluate(() => localStorage.getItem("count")));
log("2 new tab sees sessionStorage draft", await p2.evaluate(() => sessionStorage.getItem("draft")));
// 3. storage event fires in the other tab, not in the writer
await p1.evaluate(() => { window.ev = []; addEventListener("storage", (e) => window.ev.push(e.key + "=" + e.newValue)); });
await p2.evaluate(() => { window.ev = []; addEventListener("storage", (e) => window.ev.push(e.key + "=" + e.newValue)); });
await p2.evaluate(() => localStorage.setItem("theme", "dark"));
await p1.waitForTimeout(300);
log("3 storage event in other tab", await p1.evaluate(() => window.ev));
log("3 storage event in writing tab", await p2.evaluate(() => window.ev));
// 4. localStorage limit
log("4 localStorage limit", await p1.evaluate(() => {
  localStorage.clear(); const chunk = "x".repeat(1024 * 64); let n = 0;
  try { for (;;) { localStorage.setItem("k" + n, chunk); n++; } } catch (e) {
    let tot = 0; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); tot += k.length + localStorage.getItem(k).length; }
    localStorage.clear(); return { error: e.name, charsStored: tot, approxMB: +(tot / 1024 / 1024).toFixed(2) };
  }
}));
// 5. cookies travel with requests; HttpOnly hidden from JS
await p1.evaluate(() => { document.cookie = "theme=dark; path=/; max-age=3600"; });
await p1.evaluate((o) => fetch(o + "/login"), O);
await p1.evaluate((o) => fetch(o + "/echo"), O);
log("5 document.cookie (JS view)", await p1.evaluate(() => document.cookie));
log("5 Cookie header the server received", seen[seen.length - 1]);
// 6. a cookie over 4096 bytes is dropped
log("6 oversized cookie stored?", await p1.evaluate(() => { document.cookie = "big=" + "x".repeat(5000) + "; path=/"; return document.cookie.includes("big="); }));
log("6 4000-byte cookie stored?", await p1.evaluate(() => { document.cookie = "ok=" + "x".repeat(4000) + "; path=/"; const r = document.cookie.includes("ok="); document.cookie = "ok=; max-age=0; path=/"; return r; }));
// 7. IndexedDB keeps real objects, asynchronously
log("7 IndexedDB", await p1.evaluate(() => new Promise((resolve) => {
  const order = [];
  const req = indexedDB.open("shop", 1);
  req.onupgradeneeded = () => req.result.createObjectStore("orders", { keyPath: "id" });
  req.onsuccess = () => {
    const db = req.result;
    const tx = db.transaction("orders", "readwrite");
    tx.objectStore("orders").put({ id: 1, total: 4999, placed: new Date("2026-10-01"), items: ["shoes", "bag"], receipt: new Blob(["pdf bytes"]) });
    order.push("put() returned");
    tx.oncomplete = () => {
      order.push("transaction complete");
      db.transaction("orders").objectStore("orders").get(1).onsuccess = (e) => {
        const o = e.target.result;
        resolve({ order, placedIsDate: o.placed instanceof Date, itemsIsArray: Array.isArray(o.items), receiptIsBlob: o.receipt instanceof Blob, total: o.total });
      };
    };
  };
})));
// 8. Cache API stores request/response pairs
log("8 Cache API", await p1.evaluate(async () => {
  const c = await caches.open("v1");
  await c.put("/api/products", new Response(JSON.stringify([{ id: 1 }]), { headers: { "content-type": "application/json" } }));
  const r = await c.match("/api/products"); return { matched: !!r, body: await r.text() };
}));
// 9. quota estimate
log("9 storage estimate", await p1.evaluate(async () => { const e = await navigator.storage.estimate(); return { quotaGB: +(e.quota / 1e9).toFixed(1) }; }));
await b.close(); srv.close();
console.log(out.join("\n"));
fs.writeFileSync("verified.txt", out.join("\n") + "\n");
