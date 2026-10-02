import { chromium } from "/tmp/claude-0/pw/node_modules/playwright-core/index.mjs";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell" });
const out = [];
const log = (k, v) => { out.push(k + ": " + (typeof v === "string" ? v : JSON.stringify(v))); };
async function tree(html) {
  const p = await b.newPage(); await p.setContent(html);
  const c = await p.context().newCDPSession(p);
  const { nodes } = await c.send("Accessibility.getFullAXTree");
  const pick = nodes.filter((n) => !n.ignored && n.role && !["StaticText", "InlineTextBox", "RootWebArea", "none", "LineBreak"].includes(n.role.value))
    .map((n) => n.role.value + (n.name && n.name.value ? ' "' + n.name.value + '"' : ""));
  await p.close(); return pick;
}
const soup = `<div class="header"><div class="logo">Shop</div><div class="nav"><div>Home</div><div>Deals</div></div></div>
<div class="main"><div class="title">Summer sale</div><div class="card">Item</div></div><div class="footer">© 2026</div>`;
log("div soup tree", await tree(soup));
const sem = `<header><a href="/">Shop</a><nav aria-label="Main"><ul><li><a href="/">Home</a></li><li><a href="/d">Deals</a></li></ul></nav>
<search><form><label for="q">Search</label><input id="q" type="search"></form></search></header>
<main><h1>Summer sale</h1><article><header><h2>Shoes</h2></header><p>Item</p><footer>Price</footer></article>
<section><h2>Unnamed section</h2></section><section aria-labelledby="r"><h2 id="r">Reviews</h2></section></main>
<aside><h2>Related</h2></aside><footer><p>© 2026</p></footer>`;
log("semantic tree", await tree(sem));
log("form unnamed vs named", await tree(`<form><input aria-label="x"></form><form aria-label="Newsletter"><input aria-label="y"></form>`));
log("list", await tree(`<ul><li>A</li><li>B</li><li>C</li></ul>`));
log("label", await tree(`<label for="e">Email</label><input id="e">`));
log("no label", await tree(`<div>Email</div><input>`));
log("div vs button", await tree(`<div onclick="1">Buy</div><button>Buy</button>`));
// keyboard
const p = await b.newPage();
await p.setContent(`<input id="start"><div id="d" onclick="window.log.push('div clicked')">Buy (div)</div>
<div id="r" role="button" tabindex="0" onclick="window.log.push('role=button clicked')">Buy (role=button)</div>
<button id="bt" onclick="window.log.push('button clicked')">Buy (button)</button><script>window.log=[]</script>`);
await p.focus("#start");
const stops = [];
for (let i = 0; i < 3; i++) { await p.keyboard.press("Tab"); stops.push(await p.evaluate(() => document.activeElement.id || document.activeElement.tagName)); }
log("tab stops after #start", stops);
await p.focus("#r"); await p.keyboard.press("Enter"); await p.keyboard.press("Space");
await p.focus("#bt"); await p.keyboard.press("Enter"); await p.keyboard.press("Space");
log("keyboard activation log", await p.evaluate(() => window.log));
await b.close();
console.log(out.join("\n"));
import fs from "node:fs"; fs.writeFileSync("verified.txt", out.join("\n") + "\n");
