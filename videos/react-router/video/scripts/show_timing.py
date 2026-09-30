#!/usr/bin/env python3
"""python3 scripts/show_timing.py s5 s6 ...  -> lines with word indexes and offsets, for writing cues."""
import json, sys
t = json.load(open(__file__.rsplit("/", 2)[0] + "/timing.json"))
for sc in sys.argv[1:]:
    print("---", sc, t["scenes"][sc])
    for k, v in t["lines"].items():
        if v["scene"] == sc:
            ws = " ".join(f"{i}:{w['w']}@{w['t']:.1f}" for i, w in enumerate(v["words"]))
            print(f"{k} [{v['speaker']}] d={v['dur']:.1f} | {ws}")
