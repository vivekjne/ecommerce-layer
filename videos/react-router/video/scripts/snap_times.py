#!/usr/bin/env python3
"""python3 scripts/snap_times.py s1 s2 ... -> comma list of snapshot times (25%, 55%, 85% of each scene)"""
import json, sys
t = json.load(open(__file__.rsplit("/", 2)[0] + "/timing.json"))
out = []
for sc in sys.argv[1:]:
    v = t["scenes"][sc]
    out += [f"{v['start'] + v['dur'] * f:.1f}" for f in (0.25, 0.55, 0.85)]
print(",".join(out))
