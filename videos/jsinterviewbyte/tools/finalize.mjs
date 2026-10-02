// Final encode: compress the rendered MP4 and restore the narration loudness.
//
//   node scripts/finalize.mjs rendered.mp4 final.mp4 [crf=28] [targetLUFS=-14.5]
//
// Why: the renderer's audio mix comes out at an unpredictable level (we measured
// -14.9, -18.7 and -11.5 LUFS for the same tracks in different renders), so the
// final level is measured and corrected here, with a limiter guarding the peaks.
import { spawnSync, execFileSync } from "node:child_process";

const [input, output, crf = "28", target = "-14.5"] = process.argv.slice(2);
if (!input || !output) throw new Error("usage: finalize.mjs in.mp4 out.mp4 [crf] [targetLUFS]");

const probe = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", input, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8", maxBuffer: 1 << 28 });
const summary = probe.stderr.slice(Math.max(0, probe.stderr.lastIndexOf("Integrated loudness")));
const measured = parseFloat(/I:\s+(-?[\d.]+) LUFS/.exec(summary)[1]);
const gain = parseFloat(target) - measured;
console.log(`measured ${measured} LUFS -> applying ${gain.toFixed(2)} dB to reach ${target} LUFS`);

execFileSync("ffmpeg", [
  "-v", "error", "-y", "-i", input,
  "-c:v", "libx264", "-crf", crf, "-preset", "medium", "-pix_fmt", "yuv420p",
  "-af", `volume=${gain.toFixed(2)}dB,alimiter=limit=0.79:attack=2:release=40:level=false`,
  "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", output,
], { stdio: "inherit" });

const check = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", output, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8", maxBuffer: 1 << 28 });
const s2 = check.stderr.slice(check.stderr.lastIndexOf("Summary"));
console.log(`final: ${/I:\s+(-?[\d.]+) LUFS/.exec(s2)[1]} LUFS, true peak ${/Peak:\s+(-?[\d.]+) dBFS/.exec(s2)[1]} dBFS`);
