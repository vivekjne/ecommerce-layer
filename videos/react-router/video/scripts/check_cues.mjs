// Validates every L("line", off) / W("line", idx) cue in the scene code against timing.json:
// the offset must be inside the line, the word index must exist.
import { readFileSync, readdirSync } from "node:fs";
const root = new URL("..", import.meta.url).pathname;
const T = JSON.parse(readFileSync(root + "timing.json", "utf8"));
const src = readdirSync(root + "src/parts").filter((f) => /^6\d-scenes.*\.js$/.test(f)).sort().map((f) => readFileSync(root + "src/parts/" + f, "utf8")).join("\n");
let bad = 0, n = 0;
for (const m of src.matchAll(/\b(L|LE|W)\("([a-z0-9]+)",\s*(-?[\d.]+)?\)/g)) {
  const [, fn, id, arg] = m; n++;
  const ln = T.lines[id];
  const line = src.slice(0, m.index).split("\n").length;
  if (!ln) { console.log(`line ${line}: unknown line id ${id}`); bad++; continue; }
  if (fn === "W") {
    const i = +arg;
    if (!(i >= 0 && i < ln.words.length)) { console.log(`line ${line}: W("${id}", ${i}) but only ${ln.words.length} words`); bad++; }
  } else if (fn === "L" && arg !== undefined) {
    if (+arg > ln.dur - 0.05) { console.log(`line ${line}: L("${id}", ${arg}) beyond duration ${ln.dur.toFixed(1)}`); bad++; }
  }
}
for (const m of src.matchAll(/\b(?:S|SE|enter|leave)\("([a-z0-9]+)"/g)) if (!T.scenes[m[1]]) { console.log("unknown scene " + m[1]); bad++; }
console.log(`${n} cues checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
