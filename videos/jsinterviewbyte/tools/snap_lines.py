import json,os,sys
t=json.load(open(os.path.join(os.environ.get("VID","."),"timing.json")))
frac=float(os.environ.get("FRAC","0.92"))
ids=sys.argv[1:] or list(t["lines"].keys())
print(",".join(f"{t['lines'][i]['start']+t['lines'][i]['dur']*frac:.1f}" for i in ids))
