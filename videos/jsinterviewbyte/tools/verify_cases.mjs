// Runs every snippet in cases.json in a fresh Node VM and checks it prints/returns what the video shows.
//   VID=$PWD node ../tools/verify_cases.mjs
// A case is { code, expect }: `code` is an expression (its String() value is compared), or
// { script, expect: [lines] } for a multi-line script whose console.log lines are compared.
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const root = (process.env.VID || process.cwd()) + "/";
const cases = JSON.parse(readFileSync(root + "cases.json", "utf8"));
let bad = 0;
const report = [];
for (const [i, c] of cases.entries()) {
  let got;
  if (c.script !== undefined) {
    const logs = [];
    vm.runInNewContext(c.script, { console: { log: (...a) => logs.push(a.map(String).join(" ")) }, setTimeout, clearTimeout, AbortController });
    await new Promise((r) => setTimeout(r, c.wait || 0)); // let timers in the script finish
    got = logs;
  } else {
    got = String(vm.runInNewContext(c.code));
  }
  const ok = JSON.stringify(got) === JSON.stringify(c.expect);
  if (!ok) bad++;
  report.push(`${ok ? "ok " : "BAD"} ${i}: ${c.code ?? "(script)"} -> ${JSON.stringify(got)}${ok ? "" : "   expected " + JSON.stringify(c.expect)}`);
}
writeFileSync(root + "verified.txt", report.join("\n") + "\n");
console.log(report.join("\n"));
console.log(bad ? `${bad} MISMATCH` : `all ${cases.length} cases verified with node ${process.version}`);
process.exit(bad ? 1 : 0);
