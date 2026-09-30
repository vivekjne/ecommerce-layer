// Builds index.html + the final audio from src/template.html and timing.json.
//
//   python3 scripts/voice.py        # voiceover + timing.json
//   node scripts/make-music.mjs     # music sized to the video
//   node scripts/build.mjs          # audio mastering + index.html
//   npx hyperframes render ...
//
// Audio mastering:
//   voice  -> high-pass, gentle compression, presence boost, then normalised to
//             -14 LUFS (loud and clear, the usual streaming target)
//   music  -> normalised to -28 LUFS, i.e. ~14 LU under the voice, so it never
//             fights the narration
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const timing = JSON.parse(readFileSync(root + "timing.json", "utf8"));
const ff = (...args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });

// Two-pass loudness normalisation (measure, then apply exact linear gain).
function master(input, output, pre, I, TP, extra) {
  const base = `loudnorm=I=${I}:TP=${TP}:LRA=7`;
  const probe = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", input, "-af", `${pre}${base}:print_format=json`, "-f", "null", "-"], { encoding: "utf8" });
  const m = JSON.parse(probe.stderr.slice(probe.stderr.lastIndexOf("{"), probe.stderr.lastIndexOf("}") + 1));
  const measured = `measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`;
  ff("-i", input, "-af", `${pre}${base}:${measured}`, ...extra, output);
}
master(root + "assets/voiceover.wav", root + "assets/voiceover.mp3",
  "highpass=f=70,acompressor=threshold=-24dB:ratio=3.5:attack=5:release=90:makeup=4,equalizer=f=3000:t=q:w=1.2:g=1.5,alimiter=limit=0.89:attack=3:release=40:level=false,",
  -14, -1.0, ["-ar", "44100", "-ac", "1", "-b:a", "128k"]);
master(root + "assets/music.wav", root + "assets/music.mp3", "", -28, -3, ["-ar", "44100", "-b:a", "112k"]);

let html = readFileSync(root + "src/template.html", "utf8");
html = html.replaceAll("{{total}}", String(timing.total));
html = html.replace(/\{\{(s\d+x?)\.(start|dur)\}\}/g, (_, id, k) => {
  if (!timing.scenes[id]) throw new Error("unknown scene " + id);
  return String(timing.scenes[id][k]);
});
html = html.replace("/*__TIMING__*/ null", JSON.stringify(timing));
writeFileSync(root + "index.html", html);
console.log(`built index.html (${timing.total.toFixed(1)}s, ${Object.keys(timing.scenes).length} scenes)`);
