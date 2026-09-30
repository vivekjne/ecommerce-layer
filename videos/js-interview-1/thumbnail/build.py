#!/usr/bin/env python3
"""Build thumbnail.html (1280x720, YouTube size) and screenshot it with headless Chromium.

    python3 thumbnail/build.py            # -> thumbnail/thumbnail.png
Reuses the character drawings from src/template.html so the look stays consistent.
"""
import re, subprocess, shutil, os
from pathlib import Path

HERE = Path(__file__).resolve().parent
tpl = (HERE.parent / "src" / "template.html").read_text()
a = tpl.index("const INK =")
b = tpl.index('document.querySelectorAll(".char")')
chars_js = tpl[a:b]

FONTS = Path.home() / ".cache/hyperframes/fonts/inter"
font_faces = ""
if FONTS.exists():
    latin = sorted(FONTS.glob("900-normal-9ca5*.woff2"))
    ext = sorted(FONTS.glob("900-normal-f29b*.woff2"))
    if latin:
        font_faces += f"@font-face{{font-family:'ThumbInter';font-weight:100 900;src:url('file://{latin[0]}') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}}\n"
    if ext:
        font_faces += f"@font-face{{font-family:'ThumbInter';font-weight:100 900;src:url('file://{ext[0]}') format('woff2');unicode-range:U+0100-02AF,U+1E00-1EFF}}\n"

html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
{font_faces}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1280px;height:720px;overflow:hidden}}
body{{font-family:ThumbInter,Inter,'DejaVu Sans',sans-serif;color:#1f2140;
 background:radial-gradient(circle at 8% 12%,#ffd3e0 0,transparent 42%),radial-gradient(circle at 95% 95%,#bfefff 0,transparent 45%),radial-gradient(circle at 92% 6%,#ffe58a 0,transparent 36%),#fff6e5;position:relative}}
.pill{{position:absolute;left:56px;top:44px;background:#6a4df0;color:#fff;font-weight:800;font-size:27px;letter-spacing:.16em;text-transform:uppercase;padding:10px 24px;border-radius:999px}}
h1{{position:absolute;left:50px;top:96px;font-size:168px;font-weight:900;letter-spacing:-.05em;line-height:1}}
h1 span{{background:linear-gradient(transparent 62%,#ffc93c 62%,#ffc93c 92%,transparent 92%)}}
.sub{{position:absolute;left:58px;top:272px;font-size:62px;font-weight:800;color:#6a4df0;letter-spacing:-.02em}}
.code{{position:absolute;left:56px;top:388px;width:560px;background:#fff;border:6px solid #1f2140;border-radius:26px;padding:22px 30px;font-family:'DejaVu Sans Mono',monospace;font-weight:700;font-size:31px;line-height:1.5;box-shadow:0 10px 0 rgba(31,33,64,.16);white-space:pre}}
.kw{{color:#8a2be2}}.fn{{color:#0a6fb0}}.nu{{color:#c2410c}}
.cons{{position:absolute;left:330px;top:566px;background:#1f2140;border:6px solid #1f2140;border-radius:24px;padding:12px 30px;font-family:'DejaVu Sans Mono',monospace;font-weight:800;font-size:56px;color:#ff8fa0;box-shadow:0 10px 0 rgba(31,33,64,.2);letter-spacing:.3em}}
.cons small{{font-size:24px;letter-spacing:.14em;color:#aab0dc;display:block;text-transform:uppercase;margin-bottom:0}}
.char{{position:absolute}} .char svg{{display:block;width:100%;height:auto;overflow:visible}}
#sam{{left:760px;top:250px;width:270px}} #byte{{left:1000px;top:262px;width:250px}}
.q{{position:absolute;left:905px;top:98px;font-size:104px;font-weight:900;color:#d92d48;transform:rotate(-10deg)}}
.bp{{position:absolute;left:1075px;top:118px;font-size:120px;transform:rotate(12deg)}}
</style></head><body>
<div class="pill">JavaScript Demystified</div>
<h1><span>CLOSURES</span></h1>
<div class="sub">explained simply</div>
<div class="code"><span class="kw">for</span> (<span class="kw">var</span> i = <span class="nu">0</span>; i &lt; <span class="nu">3</span>; i++) {{
  <span class="fn">setTimeout</span>(() =&gt; <span class="fn">log</span>(i));
}}</div>
<div class="cons"><small>prints</small>3 3 3?!</div>
<div class="q">?!</div><div class="bp">🎒</div>
<div class="char" id="sam" data-kind="sam"></div><div class="char" id="byte" data-kind="byte"></div>
<script>
{chars_js}
document.querySelectorAll(".char").forEach(el=>{{el.innerHTML=KINDS[el.dataset.kind].svg();}});
// Sam looks worried, Byte looks happy
document.querySelector("#sam .m-happy").setAttribute("opacity","0");
document.querySelector("#sam .m-sad").setAttribute("opacity","1");
document.querySelector("#byte .m-n").setAttribute("opacity","1");
["n","q","a"].forEach(x=>document.querySelector("#byte .eyes-"+x).setAttribute("opacity","0"));
document.querySelector("#byte .eyes-h").setAttribute("opacity","1");
document.querySelector("#byte .bulb").setAttribute("fill","#0a8a5f");
</script></body></html>"""
(HERE / "thumbnail.html").write_text(html)

chrome = next(Path("/opt/pw-browsers").glob("chromium-*/chrome-linux/chrome"), None) or shutil.which("chromium") or shutil.which("google-chrome")
subprocess.run([str(chrome), "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                "--window-size=1280,900", "--virtual-time-budget=3000", f"--screenshot={HERE / 'thumbnail.png'}", f"file://{HERE / 'thumbnail.html'}"],
               check=True, capture_output=True)
# headless Chromium's viewport is shorter than the window: shoot tall, crop to 1280x720
raw = HERE / 'thumbnail.png'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(raw), '-vf', 'crop=1280:720:0:0', str(HERE / 'thumbnail_1280x720.png')], check=True)
raw.unlink()
(HERE / 'thumbnail_1280x720.png').rename(raw)
print("wrote", raw)
