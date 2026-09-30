#!/usr/bin/env python3
"""Concatenates src/parts/* (in name order) into src/template.html."""
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
parts = sorted((ROOT / "src" / "parts").glob("*"))
out = "".join(p.read_text() for p in parts)
(ROOT / "src" / "template.html").write_text(out)
print("template.html:", len(out), "chars from", len(parts), "parts")
