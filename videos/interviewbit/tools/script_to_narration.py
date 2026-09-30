#!/usr/bin/env python3
"""script.md -> narration.json.   Lines are `SPEAKER: text` under `## scene title` headings.
Markup passes through to voice.py: [shown|spoken] and {code word}.   Optional `(after 1.5)` suffix adds silence."""
import json, os, re
from pathlib import Path

ROOT = Path(os.environ.get("VID", os.getcwd())).resolve()
VOICES = {"byte": "am_michael", "sam": "af_nova"}
scenes, cur = [], None
for raw in (ROOT / "script.md").read_text().splitlines():
    raw = raw.strip()
    if not raw or raw.startswith("#!") or raw.startswith("<!--"):
        continue
    if raw.startswith("## "):
        cur = {"id": f"s{len(scenes)+1}", "title": raw[3:].strip(), "lines": []}
        scenes.append(cur)
        continue
    m = re.match(r"(BYTE|SAM):\s*(.+)", raw)
    if not m:
        continue
    text, after = m.group(2).strip(), 0
    a = re.search(r"\s*\(after ([\d.]+)\)$", text)
    if a:
        after, text = float(a.group(1)), text[: a.start()]
    sp = m.group(1).lower()
    line = {"id": f"{cur['id']}{chr(97 + len(cur['lines']))}", "speaker": sp, "voice": VOICES[sp], "text": text}
    if after:
        line["after"] = after
    cur["lines"].append(line)
(ROOT / "narration.json").write_text(json.dumps({"scenes": scenes}, indent=1, ensure_ascii=False))
print(sum(len(s["lines"]) for s in scenes), "lines,", sum(len(l["text"].split()) for s in scenes for l in s["lines"]), "words")
