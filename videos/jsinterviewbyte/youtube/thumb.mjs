import { chromium } from "/tmp/claude-0/pw/node_modules/playwright-core/index.mjs";
const css = `*{margin:0;box-sizing:border-box}body{width:1280px;height:720px;overflow:hidden;font-family:Inter,"Helvetica Neue",Arial,sans-serif;color:#f4f6ff;
background:radial-gradient(circle at 8% 10%,rgba(244,114,182,.35) 0,transparent 35%),radial-gradient(circle at 95% 90%,rgba(34,211,238,.3) 0,transparent 40%),#0d1230}
.brand{position:absolute;left:50px;top:36px;font-size:40px;font-weight:900}.brand b{color:#f472b6}
h1{position:absolute;left:50px;top:110px;font-size:118px;line-height:1;font-weight:900;letter-spacing:-.03em}
h1 .y{color:#fbbf24}.sub{position:absolute;left:54px;font-size:44px;font-weight:800}
.tok{position:absolute;font-family:"DejaVu Sans Mono",monospace;font-weight:800;border-radius:14px;padding:10px 18px;color:#1f2140}
.pill{position:absolute;font-size:40px;font-weight:900;border-radius:999px;padding:8px 26px;color:#1f2140}`;
const pages = {
  "thumb-storage.png": `<div class="brand">JS Interview<b>Byte</b></div>
<h1 style="font-size:104px">Browser<br><span class="y">storage</span></h1>
<div class="sub" style="top:345px;color:#b4bdf2">which one, and when?</div>
<div class="pill" style="left:54px;top:430px;background:#22d3ee">localStorage</div>
<div class="pill" style="left:390px;top:430px;background:#a78bfa">sessionStorage</div>
<div class="pill" style="left:54px;top:520px;background:#fbbf24">🍪 cookies</div>
<div class="pill" style="left:330px;top:520px;background:#86efac">IndexedDB</div>
<div class="pill" style="left:54px;top:610px;background:#f472b6">Cache API</div>
<div style="position:absolute;right:60px;top:170px;width:420px;height:400px;border-radius:40px;background:#172050;border:8px solid #fb7185;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px">
<div style="font-family:monospace;font-size:34px;font-weight:900;color:#c4a7ff">setItem("n", 42)</div>
<div style="font-family:monospace;font-size:34px;font-weight:900;color:#f4f6ff">getItem("n") →</div>
<div style="white-space:nowrap;font-family:monospace;font-size:64px;font-weight:900;background:#fb7185;color:#1f2140;padding:6px 26px;border-radius:16px;transform:rotate(-5deg)">"42" ?!</div></div>`,
  "thumb-jwt.png": `<div class="brand">JS Interview<b>Byte</b></div>
<h1>JWT<br><span class="y">explained</span></h1>
<div class="tok" style="left:54px;top:400px;font-size:34px;background:#a78bfa">eyJhbGci…</div>
<div class="tok" style="left:290px;top:400px;font-size:34px;background:#f472b6">eyJzdWIi…</div>
<div class="tok" style="left:526px;top:400px;font-size:34px;background:#22d3ee">Abdu8UPZ…</div>
<div class="pill" style="left:54px;top:520px;background:#86efac">✓ upsides</div>
<div class="pill" style="left:330px;top:520px;background:#fb7185">✗ downsides</div>
<div class="pill" style="left:54px;top:610px;background:#fbbf24">+ mistakes to avoid</div>
<div style="position:absolute;right:60px;top:170px;width:400px;height:400px;border-radius:40px;background:#172050;border:8px solid #fb7185;display:flex;flex-direction:column;align-items:center;justify-content:center">
<div style="font-family:monospace;font-size:52px;font-weight:900;color:#fda4af">alg: none</div>
<div style="margin-top:24px;white-space:nowrap;font-size:52px;font-weight:900;background:#fb7185;color:#1f2140;padding:6px 26px;border-radius:16px;transform:rotate(-6deg)">✗ REJECTED</div></div>`,
  "thumb-ep1.png": `<div class="brand">JS Interview<b>Byte</b></div>
<h1 style="font-size:96px">4 JavaScript<br><span class="y">interview Qs</span></h1>
<div class="sub" style="top:330px;color:#b4bdf2">explained with animations</div>
<div class="pill" style="left:54px;top:430px;background:#22d3ee">higher-order functions</div>
<div class="pill" style="left:54px;top:520px;background:#a78bfa">currying</div>
<div class="pill" style="left:300px;top:520px;background:#f472b6">event flow</div>
<div class="pill" style="left:54px;top:610px;background:#86efac">memoization</div>
<div style="position:absolute;right:70px;top:140px;width:440px;height:440px;border:6px dashed #a78bfa;border-radius:30px">
<div style="position:absolute;left:50px;top:70px;right:50px;bottom:70px;border:6px dashed #22d3ee;border-radius:24px"></div>
<div style="position:absolute;left:110px;top:180px;width:220px;height:80px;border-radius:18px;background:#172050;border:6px solid #fbbf24;font:900 40px monospace;color:#fbbf24;display:flex;align-items:center;justify-content:center">button</div>
<div style="position:absolute;left:180px;top:10px;font-size:46px;font-weight:900;color:#22d3ee">↓ ↑</div></div>`,
};
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell" });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
for (const [f, html] of Object.entries(pages)) { await p.setContent(`<style>${css}</style>${html}`); await p.screenshot({ path: f }); }
await b.close();
console.log("ok");
