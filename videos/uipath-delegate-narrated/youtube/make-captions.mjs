// Generates the YouTube caption file and the chapter list from the same timing the video was built with.
//
//   node youtube/make-captions.mjs
//     -> youtube/uipath-delegate-explainer.en.srt   (upload in YouTube Studio > Subtitles > Upload file)
//     -> prints the chapter list (paste into the description)
//
// One cue per narration line, shown text (not the spoken respelling: "CRM", not "C R M"),
// each cue ends 0.25 s after its line or just before the next cue, whichever is first.
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const timing = JSON.parse(readFileSync(root + "timing.json", "utf8"));
const narration = JSON.parse(readFileSync(root + "narration.json", "utf8"));
const shown = (t) => t.replace(/\[([^|\]]+)\|[^\]]+\]/g, "$1");
const text = Object.fromEntries(narration.scenes.flatMap((s) => s.lines.map((l) => [l.id, shown(l.text)])));

const ts = (sec) => {
  const ms = Math.round(sec * 1000);
  const p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const wrap = (s, width = 42) => {
  const out = []; let cur = "";
  for (const w of s.split(" ")) { if ((cur + " " + w).trim().length > width && cur) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }
  if (cur) out.push(cur);
  return out.join("\n");
};

const ids = Object.keys(timing.lines);
const cues = ids.map((id, i) => {
  const l = timing.lines[id];
  const next = i + 1 < ids.length ? timing.lines[ids[i + 1]].start : Infinity;
  return { start: l.start, end: Math.min(l.start + l.dur + 0.25, next - 0.02), text: text[id] };
});
writeFileSync(here("uipath-delegate-explainer.en.srt"), cues.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${wrap(c.text)}\n`).join("\n"));
function here(f) { return root + "youtube/" + f; }
console.log(`${cues.length} cues, last ends ${ts(cues[cues.length - 1].end)}`);

// chapters: first at 0:00, floor to the second so the viewer lands just before the scene starts
const chapters = [
  ["s1", "The Monday busywork problem"],
  ["s2", "What UiPath Delegate is"],
  ["s3", "How it works: ask, plan, act, stop"],
  ["s4", "Tasks that cross applications"],
  ["s5", "A support engineer's day"],
  ["s6", "Teach it by showing it"],
  ["s7", "From raw data to a finished deliverable"],
  ["s8", "Real screens inside the chat (MCP Apps)"],
  ["s9", "Save and reuse work with Routines"],
  ["s10", "Approval modes"],
  ["s11", "Allow and deny lists, audit trail, governance"],
  ["s13", "Recap and next steps"],
];
const mmss = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
const lines = chapters.map(([sc, name], i) => `${i === 0 ? "0:00" : mmss(timing.scenes[sc].start)} ${name}`);
writeFileSync(here("chapters.txt"), lines.join("\n") + "\n");
console.log(lines.join("\n"));
