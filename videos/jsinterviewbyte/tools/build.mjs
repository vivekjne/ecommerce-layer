// Builds one JSInterviewByte short: audio mastering + index.html.
//
//   cd videos/jsinterviewbyte/qNN-name
//   VID=$PWD python3 ../tools/voice.py          # voiceover + timing.json
//   VID=$PWD node ../tools/make-music.mjs       # music sized to the video
//   VID=$PWD node ../tools/build.mjs            # mastering + index.html
//   npx hyperframes render -f 30 -q standard -o rendered.mp4
//
// Voice is normalised to -14 LUFS, music to -28 LUFS (about 14 LU under the voice).
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const root = (process.env.VID || process.cwd()) + "/";
const eng = new URL("../" + (process.env.ENGINE || "engine") + "/", import.meta.url).pathname;
const timing = JSON.parse(readFileSync(root + "timing.json", "utf8"));
const meta = JSON.parse(readFileSync(root + "meta.json", "utf8"));
const ff = (...args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });

function master(input, output, pre, I, TP, extra) {
  const base = `loudnorm=I=${I}:TP=${TP}:LRA=7`;
  const probe = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", input, "-af", `${pre}${base}:print_format=json`, "-f", "null", "-"], { encoding: "utf8", maxBuffer: 1 << 28 });
  const m = JSON.parse(probe.stderr.slice(probe.stderr.lastIndexOf("{"), probe.stderr.lastIndexOf("}") + 1));
  const measured = `measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`;
  ff("-i", input, "-af", `${pre}${base}:${measured}`, ...extra, output);
}
mkdirSync(root + "assets", { recursive: true });
if (!existsSync(root + "assets/gsap.min.js")) copyFileSync(eng + "gsap.min.js", root + "assets/gsap.min.js");
master(root + "assets/voiceover.wav", root + "assets/voiceover.mp3",
  "highpass=f=70,acompressor=threshold=-24dB:ratio=3.5:attack=5:release=90:makeup=4,equalizer=f=3000:t=q:w=1.2:g=1.5,alimiter=limit=0.89:attack=3:release=40:level=false,",
  -14, -1.0, ["-ar", "44100", "-ac", "1", "-b:a", "128k"]);
master(root + "assets/music.wav", root + "assets/music.mp3", "", -28, -3, ["-ar", "44100", "-b:a", "112k"]);

const part = (f) => readFileSync(eng + f, "utf8");
let html = part("head.html")
  .replaceAll("{{total}}", String(timing.total))
  .replace("{{tag}}", meta.tag)
  .replace("{{question}}", meta.questionHtml)
  .replace("/*__TIMING__*/ null", JSON.stringify(timing));
const cases = existsSync(root + "cases.json") ? readFileSync(root + "cases.json", "utf8") : "[]";
html += part("core.js") + part("lib.js") + "      const CASES = " + cases + ";\n" + readFileSync(root + "spec.js", "utf8") + part("tail.js");
writeFileSync(root + "index.html", html);
console.log(`built index.html (${timing.total.toFixed(1)}s)`);
