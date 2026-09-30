// Builds three 1280x720 YouTube thumbnails from the video's own characters, icons and palette,
// then screenshots them with headless Chromium.
//
//   node youtube/build-thumbnails.mjs        ->  youtube/thumbnail-A.png, -B.png, -C.png (+ the .html sources)
//
// Needs a Chromium headless shell (HYPERFRAMES_BROWSER_PATH) and the Inter font files that HyperFrames
// caches (THUMB_FONT_DIR, default ~/.cache/hyperframes/fonts/inter). Without the font it falls back to a system sans.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";

const root = new URL("..", import.meta.url).pathname;
const here = root + "youtube/";
const icons = readFileSync(root + "src/js/icons.js", "utf8");
const chars = readFileSync(root + "src/js/chars.js", "utf8");
const browser = process.env.HYPERFRAMES_BROWSER_PATH || "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const fontDir = process.env.THUMB_FONT_DIR || homedir() + "/.cache/hyperframes/fonts/inter/";
const fontFile = (w) => fontDir + w + "-normal-2806d0d69a81.woff2";   // a subset that covers basic Latin
const fonts = [800, 900].filter((w) => existsSync(fontFile(w)))
  .map((w) => `@font-face{font-family:ThumbInter;font-weight:${w};src:url('file://${fontFile(w)}') format('woff2')}`).join("\n");
const deck = (n) => `file://${root}assets/deck/${n}.png`;

const base = `
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1280px;height:720px;overflow:hidden}
body{position:relative;font-family:ThumbInter,Inter,'DejaVu Sans',sans-serif;color:#1f2140;
  background:radial-gradient(circle at 6% 10%,#ffd3e0 0,transparent 40%),radial-gradient(circle at 96% 94%,#bfefff 0,transparent 44%),radial-gradient(circle at 94% 6%,#ffe58a 0,transparent 34%),#fff6e5}
.abs{position:absolute}
.char{position:absolute}.char svg{display:block;width:100%;height:auto;overflow:visible}
.pill{position:absolute;font-weight:800;border-radius:999px;white-space:nowrap}
.tile{position:absolute;width:104px;height:104px;border-radius:26px;background:#121a30;border:5px solid #1f2140;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 0 rgba(31,33,64,.18)}
.tile img{width:62px;height:62px}
.ntile{position:absolute;width:120px;height:120px;border-radius:28px;background:#fff;border:6px solid #1f2140;display:flex;align-items:center;justify-content:center;box-shadow:0 9px 0 rgba(31,33,64,.18)}
.ic{display:block}i[data-ic]{display:inline-flex;font-style:normal}
`;
const poses = `
const q = (s) => document.querySelector(s);
function happy(sel){ q(sel+" .eyes-n").style.opacity=0; q(sel+" .eyes-h").style.opacity=1; }
function sad(sel){ q(sel+" .m-happy").style.opacity=0; q(sel+" .m-sad").style.opacity=1; }
`;
const page = (css, body, extra = "") => `<!doctype html><html><head><meta charset="utf-8"><style>${base}${css}</style></head><body>${body}
<script>${icons}\n${chars}\n${poses}\n${extra}</script></body></html>`;

// A: the promise of the title, big and simple
const A = page(`
.glow{position:absolute;left:700px;top:60px;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,#8fe9f2 0,rgba(143,233,242,0) 68%)}
.l1{position:absolute;left:54px;top:150px;font-size:80px;font-weight:900;letter-spacing:-.025em}
.l2{position:absolute;left:46px;top:226px;font-size:158px;font-weight:900;letter-spacing:-.045em;color:#0b7a85;line-height:1.1;background:linear-gradient(transparent 66%,#ffc93c 66%,#ffc93c 90%,transparent 90%)}
`, `
<div class="glow"></div>
<div class="pill" style="left:56px;top:50px;background:#0b7a85;color:#fff;font-size:36px;padding:12px 30px;letter-spacing:.03em">UiPath Delegate</div>
<div class="l1">HIRE YOUR FIRST</div>
<div class="l2">AI-INTERN</div>
<div class="tile" style="left:56px;top:452px"><img src="${deck("keyboard")}"></div>
<div class="tile" style="left:184px;top:452px"><img src="${deck("mic")}"></div>
<div class="tile" style="left:312px;top:452px"><img src="${deck("video")}"></div>
<div class="tile" style="left:440px;top:452px"><img src="${deck("layers")}"></div>
<div class="pill" style="left:56px;top:596px;background:#1f2140;color:#fff;font-size:38px;padding:12px 30px">Explained in 10 minutes</div>
<div class="char" data-kind="dlg" style="left:770px;top:112px;width:470px"></div>
`, `happy(".char");`);

// B: before / after
const B = page(`
.left{position:absolute;left:0;top:0;width:640px;height:720px;background:linear-gradient(160deg,#ffd9e0,#ffeef1)}
.right{position:absolute;left:640px;top:0;width:640px;height:720px;background:linear-gradient(200deg,#bff3dc,#e6fbf2)}
.big{position:absolute;font-weight:900;letter-spacing:-.04em;line-height:1}
.arrow{position:absolute;left:566px;top:270px;width:148px;height:148px;border-radius:50%;background:#0b7a85;border:8px solid #1f2140;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 0 rgba(31,33,64,.2);color:#fff;font-size:92px;font-weight:900;line-height:1;padding-bottom:10px}
.badge{position:absolute;min-width:92px;height:62px;padding:0 16px;border-radius:31px;background:#d92d48;color:#fff;border:5px solid #1f2140;font-weight:900;font-size:36px;display:flex;align-items:center;justify-content:center}
.tk{position:absolute;display:flex;align-items:center;gap:14px;background:#fff;border:6px solid #1f2140;border-radius:22px;padding:8px 24px 8px 12px;font-weight:800;font-size:30px;box-shadow:0 8px 0 rgba(31,33,64,.16)}
`, `
<div class="left"></div><div class="right"></div>
<div class="big" style="left:44px;top:70px;font-size:104px;color:#d92d48">BUSYWORK</div>
<div class="big" style="left:700px;top:70px;font-size:104px;color:#0a8a5f">DONE</div>
<div class="ntile" style="left:60px;top:250px"><i data-ic="mail" data-s="84"></i></div><div class="badge" style="left:150px;top:230px">99+</div>
<div class="ntile" style="left:60px;top:400px"><i data-ic="calendar" data-s="84"></i></div><div class="ntile" style="left:200px;top:400px;background:#fff2c4"><i data-ic="warn" data-s="84"></i></div>
<div class="char" data-kind="sam" style="left:330px;top:300px;width:250px"></div>
<div class="arrow">→</div>
<div class="char" data-kind="dlg" style="left:730px;top:230px;width:290px"></div>
<div class="tk" style="left:1010px;top:260px"><i data-ic="tick" data-s="44"></i>Inbox</div>
<div class="tk" style="left:1010px;top:362px"><i data-ic="tick" data-s="44"></i>Calendar</div>
<div class="tk" style="left:1010px;top:464px"><i data-ic="tick" data-s="44"></i>CRM</div>
<div class="pill" style="left:340px;top:610px;background:#1f2140;color:#fff;font-size:44px;padding:14px 40px">UiPath Delegate explained</div>
`, `sad(".char[data-kind=sam]"); happy(".char[data-kind=dlg]");`);

// C: dark, text-led, for feeds that are mostly light
const C = page(`
body{background:radial-gradient(circle at 85% 20%,#1c2c5c 0,transparent 55%),radial-gradient(circle at 10% 100%,#0e4a55 0,transparent 50%),#121a30;color:#fff}
.t1{position:absolute;left:56px;top:140px;font-size:102px;white-space:nowrap;font-weight:900;letter-spacing:-.04em;line-height:1.02}
.t2{position:absolute;left:56px;top:260px;font-size:102px;white-space:nowrap;font-weight:900;letter-spacing:-.04em;line-height:1.02;color:#ffc93c}
`, `
<div class="pill" style="left:56px;top:50px;background:#21c7d6;color:#121a30;font-size:36px;padding:12px 30px;letter-spacing:.03em">UiPath Delegate</div>
<div class="t1">Delegate the busywork.</div>
<div class="t2">Keep the judgment.</div>
<div style="position:absolute;left:880px;top:340px;width:460px;height:460px;border-radius:50%;background:radial-gradient(circle,rgba(80,222,235,.85) 0,rgba(80,222,235,0) 68%)"></div>
<div class="char" data-kind="sam" style="left:760px;top:470px;width:190px"></div>
<div class="char" data-kind="dlg" style="left:990px;top:400px;width:250px"></div>
<div class="tile" style="left:56px;top:432px"><img src="${deck("keyboard")}"></div><div class="tile" style="left:184px;top:432px"><img src="${deck("mic")}"></div><div class="tile" style="left:312px;top:432px"><img src="${deck("video")}"></div><div class="tile" style="left:440px;top:432px"><img src="${deck("layers")}"></div>
<div class="pill" style="left:56px;top:600px;background:#fff;color:#121a30;font-size:38px;padding:12px 30px">Your first AI-intern</div>
`, `happy(".char[data-kind=dlg]");`);

for (const [k, html] of Object.entries({ A, B, C })) {
  writeFileSync(here + `thumbnail-${k}.html`, html);
  const r = spawnSync(browser, ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files", "--hide-scrollbars", "--force-device-scale-factor=1",
    "--window-size=1280,720", "--virtual-time-budget=3000", `--screenshot=${here}thumbnail-${k}.png`, `file://${here}thumbnail-${k}.html`], { encoding: "utf8" });
  console.log(k, (r.stderr || "").split("\n").filter((l) => /written|error/i.test(l)).join(" "));
}
