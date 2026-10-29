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

const base = `
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1280px;height:720px;overflow:hidden}
body{position:relative;font-family:ThumbInter,Inter,'DejaVu Sans',sans-serif;color:#1f2140;
  background:radial-gradient(circle at 6% 10%,#ffd3e0 0,transparent 40%),radial-gradient(circle at 96% 94%,#bfefff 0,transparent 44%),radial-gradient(circle at 94% 6%,#ffe58a 0,transparent 34%),#fff6e5}
.char{position:absolute}.char svg{display:block;width:100%;height:auto;overflow:visible}
.pill{position:absolute;font-weight:800;border-radius:999px;white-space:nowrap}
.ntile{position:absolute;width:112px;height:112px;border-radius:26px;background:#fff;border:6px solid #1f2140;display:flex;align-items:center;justify-content:center;box-shadow:0 9px 0 rgba(31,33,64,.18)}
.ntile span{position:absolute;bottom:-44px;left:50%;transform:translateX(-50%);font-size:25px;font-weight:800;white-space:nowrap}
.tk{position:absolute;display:flex;align-items:center;gap:14px;background:#fff;border:6px solid #1f2140;border-radius:22px;padding:8px 24px 8px 12px;font-weight:800;font-size:30px;white-space:nowrap;box-shadow:0 8px 0 rgba(31,33,64,.16)}
.ic{display:block}i[data-ic]{display:inline-flex;font-style:normal}
`;
const poses = `
const q = (s) => document.querySelector(s);
function happy(sel){ q(sel+" .eyes-n").style.opacity=0; q(sel+" .eyes-h").style.opacity=1; }
function sad(sel){ q(sel+" .m-happy").style.opacity=0; q(sel+" .m-sad").style.opacity=1; }
`;
const page = (css, body, extra = "") => `<!doctype html><html><head><meta charset="utf-8"><style>${base}${css}</style></head><body>${body}
<script>${icons}\n${chars}\n${poses}\n${extra}</script></body></html>`;
const tile = (x, y, ic, label, bg = "#fff") => `<div class="ntile" style="left:${x}px;top:${y}px;background:${bg}"><i data-ic="${ic}" data-s="66"></i><span>${label}</span></div>`;

// A: the promise of the title, big and simple
const A = page(`
.glow{position:absolute;left:760px;top:60px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,#8fe9f2 0,rgba(143,233,242,0) 68%)}
.l1{position:absolute;left:54px;top:140px;font-size:84px;font-weight:900;letter-spacing:-.03em}
.l2{position:absolute;left:46px;top:226px;font-size:178px;font-weight:900;letter-spacing:-.05em;color:#0b7a85;line-height:1.1;background:linear-gradient(transparent 66%,#ffc93c 66%,#ffc93c 90%,transparent 90%)}
`, `
<div class="glow"></div>
<div class="pill" style="left:56px;top:48px;background:#0b7a85;color:#fff;font-size:34px;padding:12px 30px;letter-spacing:.03em">UiPath Agent Builder</div>
<div class="l1">HOW TO BUILD AN</div>
<div class="l2">AI AGENT</div>
${tile(60, 470, "pencil", "Prompt")}${tile(200, 470, "gear", "Tools")}${tile(340, 470, "book", "Context")}${tile(480, 470, "loop", "Memory")}${tile(620, 470, "person", "Human")}
<div class="pill" style="left:56px;top:632px;background:#1f2140;color:#fff;font-size:34px;padding:10px 28px">Beginner guide · 12 minutes</div>
<div class="char" data-kind="byte" style="left:870px;top:120px;width:380px"></div>
`, `happy(".char");`);

// B: the whole journey as a checklist, no reading of small text needed
const B = page(`
.l1{position:absolute;left:54px;top:60px;font-size:96px;font-weight:900;letter-spacing:-.04em;line-height:1}
.l2{position:absolute;left:54px;top:166px;font-size:96px;font-weight:900;letter-spacing:-.04em;line-height:1;color:#0b7a85}
.n{position:absolute;width:56px;height:56px;border-radius:50%;background:#0b7a85;color:#fff;border:5px solid #1f2140;font-weight:900;font-size:28px;display:flex;align-items:center;justify-content:center}
`, `
<div class="l1">BUILD AN AGENT</div>
<div class="l2">IN THIS ORDER</div>
<div class="tk" style="left:60px;top:320px"><i data-ic="target" data-s="46"></i>Goal</div>
<div class="tk" style="left:290px;top:320px"><i data-ic="db" data-s="46"></i>Inputs and outputs</div>
<div class="tk" style="left:690px;top:320px"><i data-ic="pencil" data-s="46"></i>Prompts</div>
<div class="tk" style="left:60px;top:432px"><i data-ic="gear" data-s="46"></i>Tools</div>
<div class="tk" style="left:290px;top:432px"><i data-ic="book" data-s="46"></i>Context</div>
<div class="tk" style="left:570px;top:432px"><i data-ic="loop" data-s="46"></i>Memory</div>
<div class="tk" style="left:60px;top:544px"><i data-ic="lock" data-s="46"></i>Guardrails</div>
<div class="tk" style="left:350px;top:544px;background:#d9f7ea;border-color:#0a8a5f"><i data-ic="tick" data-s="46"></i>Evaluate and deploy</div>
<div class="pill" style="left:56px;top:650px;background:#1f2140;color:#fff;font-size:32px;padding:8px 26px">UiPath Agent Builder</div>
<div class="char" data-kind="sam" style="left:1000px;top:330px;width:240px"></div>
<div class="char" data-kind="byte" style="left:1060px;top:60px;width:170px"></div>
`, "");

// C: dark, text-led, for feeds that are mostly light
const C = page(`
body{background:radial-gradient(circle at 85% 20%,#1c2c5c 0,transparent 55%),radial-gradient(circle at 10% 100%,#0e4a55 0,transparent 50%),#121a30;color:#fff}
.t1{position:absolute;left:56px;top:150px;font-size:118px;white-space:nowrap;font-weight:900;letter-spacing:-.045em;line-height:1.02}
.t2{position:absolute;left:56px;top:276px;font-size:118px;white-space:nowrap;font-weight:900;letter-spacing:-.045em;line-height:1.02;color:#ffc93c}
.ntile{background:#fff}
`, `
<div class="pill" style="left:56px;top:48px;background:#21c7d6;color:#121a30;font-size:34px;padding:12px 30px;letter-spacing:.03em">UiPath Agent Builder</div>
<div class="t1">Not a chatbot.</div>
<div class="t2">An agent.</div>
<div style="position:absolute;left:820px;top:300px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(80,222,235,.8) 0,rgba(80,222,235,0) 68%)"></div>
<div class="char" data-kind="byte" style="left:900px;top:330px;width:290px"></div>
${tile(60, 470, "chat", "Reason")}
<div style="position:absolute;left:190px;top:500px;font-size:58px;font-weight:900;color:#ffc93c">+</div>
${tile(260, 470, "gear", "Act", "#ffc93c")}
<div class="pill" style="left:56px;top:650px;background:#fff;color:#121a30;font-size:34px;padding:10px 28px">Beginner guide</div>
`, `happy(".char[data-kind=byte]");`);

for (const [k, html] of Object.entries({ A, B, C })) {
  writeFileSync(here + `thumbnail-${k}.html`, html);
  const r = spawnSync(browser, ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files", "--hide-scrollbars", "--force-device-scale-factor=1",
    "--window-size=1280,720", "--virtual-time-budget=3000", `--screenshot=${here}thumbnail-${k}.png`, `file://${here}thumbnail-${k}.html`], { encoding: "utf8" });
  console.log(k, (r.stderr || "").split("\n").filter((l) => /written|error/i.test(l)).join(" "));
}
