import json,os,sys
t=json.load(open(os.path.join(os.environ.get("VID","."),"timing.json")))
print(",".join(f"{v['start']+v['dur']*0.85:.1f}" for v in t["lines"].values()))
