#!/usr/bin/env python3
"""Builds src/template.html from src/parts/* plus generated scene shells, code snippets and frame manifest.

  python3 scripts/extract_code.py     # codes.json from the real app
  python3 scripts/assemble.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
P = ROOT / "src" / "parts"
narr = json.loads((ROOT / "narration.json").read_text())
meta = json.loads((ROOT / "scenes-meta.json").read_text())

sections = []
for sc in narr["scenes"]:
    sid = sc["id"]
    m = meta[sid]
    sections.append(
        f'      <section id="{sid}" class="clip" data-start="{{{{{sid}.start}}}}" data-duration="{{{{{sid}.dur}}}}" data-track-index="0">\n'
        f'        <div class="eyebrow">{m["eyebrow"]}</div>\n        <h2>{m["title"]}</h2>\n'
        f'        <div class="stage" id="{sid}-stage"></div>\n      </section>\n'
    )

def part(name):
    return (P / name).read_text()

js_head = part("30-js-head.js")
js_head = js_head.replace("/*__CODES__*/ {}", (ROOT / "codes.json").read_text())
js_head = js_head.replace("/*__FRAMES__*/ {}", (ROOT / "frames-manifest.json").read_text())

out = (
    part("00-head.html")
    + part("05-body-open.html")
    + "".join(sections)
    + part("20-body-close.html")
    + js_head
    + part("45-framework-tail.js")
    + part("50-lib.js")
    + "".join(p.read_text() for p in sorted(P.glob("6*-scenes*.js")))
    + part("99-end.js")
)
(ROOT / "src" / "template.html").write_text(out)
print("template.html:", len(out), "chars,", len(sections), "scenes")
