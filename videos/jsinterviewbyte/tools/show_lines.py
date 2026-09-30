import json,os
n=json.load(open(os.path.join(os.environ.get("VID","."),"narration.json")))
for s in n["scenes"]:
    print("#",s["id"],s["title"])
    for l in s["lines"]: print(" ",l["id"],l["speaker"][:1],l["text"])
