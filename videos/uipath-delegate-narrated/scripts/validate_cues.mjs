// Checks that every animation cue in src/template.html lands inside the narration line it is tied to.
//
//   node scripts/validate_cues.mjs
//
// L("line", off)  must satisfy  0 <= off < line duration   (small negative lead-ins are allowed)
// LE("line", off) is relative to the line end, so any off is fine as long as the line exists
// W("line", i)    the word index must exist
// A cue that starts after its line has ended fires during the next line, so it is reported.
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const timing = JSON.parse(readFileSync(root + "timing.json", "utf8"));
const src = readFileSync(root + "src/template.html", "utf8");

let problems = 0;
const report = (msg) => { problems++; console.log("  x " + msg); };

for (const m of src.matchAll(/\bL\("([^"]+)"(?:\s*,\s*(-?[\d.]+))?\)/g)) {
  const [, id, offStr] = m;
  const line = timing.lines[id];
  if (!line) { report(`L("${id}") - unknown line`); continue; }
  const off = offStr === undefined ? 0 : parseFloat(offStr);
  if (off < -0.5) report(`L("${id}", ${off}) - starts more than 0.5s before its line`);
  if (off > line.dur - 0.1) report(`L("${id}", ${off}) - line is only ${line.dur.toFixed(2)}s long`);
}
for (const m of src.matchAll(/\bLE\("([^"]+)"/g)) {
  if (!timing.lines[m[1]]) report(`LE("${m[1]}") - unknown line`);
}
for (const m of src.matchAll(/\bW\("([^"]+)"\s*,\s*(\d+)\)/g)) {
  const line = timing.lines[m[1]];
  if (!line) report(`W("${m[1]}") - unknown line`);
  else if (+m[2] >= line.words.length) report(`W("${m[1]}", ${m[2]}) - line has ${line.words.length} words`);
}
for (const m of src.matchAll(/\b(?:S|SE)\("([^"]+)"/g)) {
  if (!timing.scenes[m[1]]) report(`scene "${m[1]}" - unknown`);
}
// every narrated line should be used by at least one cue or be a plain caption-only line
const used = new Set([...src.matchAll(/\bLE?\("([^"]+)"/g)].map((m) => m[1]));
const idle = Object.keys(timing.lines).filter((id) => !used.has(id));
console.log(`${Object.keys(timing.lines).length} lines, ${idle.length} without a visual cue: ${idle.join(" ") || "-"}`);
console.log(problems ? `${problems} cue problem(s)` : "all cues sit inside their narration lines");
process.exit(problems ? 1 : 0);
