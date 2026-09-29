// Synthesizes an original, royalty-free, laid-back upbeat track for the
// UiPath Delegate explainer. No samples or third-party audio: every sound is
// generated here, so the output carries no copyright or attribution
// requirements. Deterministic (seeded PRNG).
//
//   node scripts/make-music.mjs            -> assets/music.wav
//   ffmpeg -i assets/music.wav -b:a 160k assets/music.mp3
import { writeFileSync } from "node:fs";

const SR = 44100;
const BPM = 96; // relaxed tempo to match the slower visuals
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const BARS = 50; // 125s, trimmed/faded by the composition
const LEN = Math.ceil(BARS * BAR * SR) + SR;
const L = new Float32Array(LEN);
const R = new Float32Array(LEN);

let seed = 21;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
const TAU = 2 * Math.PI;

function add(t0, dur, gain, pl, pr, fn) {
  const s0 = Math.floor(t0 * SR);
  const n = Math.floor(dur * SR);
  for (let i = 0; i < n && s0 + i < LEN; i++) {
    const v = fn(i / SR) * gain;
    L[s0 + i] += v * pl;
    R[s0 + i] += v * pr;
  }
}

function pad(t0, m, dur, gain) {
  const f = hz(m);
  add(t0, dur + 0.6, gain, 1, 1, (t) => {
    const env = Math.min(1, t / 0.12) * Math.exp(-t * 0.6);
    return (Math.sin(TAU * f * t) + 0.6 * Math.sin(TAU * f * 1.004 * t) + 0.2 * Math.sin(TAU * f * 2 * t)) * env;
  });
}

// Bell-like pluck: soft attack, gentle inharmonic partial.
function bell(t0, m, gain, pan) {
  const f = hz(m);
  add(t0, 1.0, gain, 1 - pan * 0.4, 1 + pan * 0.4, (t) => {
    const env = Math.min(1, t / 0.004) * Math.exp(-t * 5);
    return (Math.sin(TAU * f * t) + 0.3 * Math.sin(TAU * f * 2.76 * t) * Math.exp(-t * 14)) * env;
  });
}

function bass(t0, m, dur) {
  const f = hz(m);
  add(t0, dur, 0.3, 1, 1, (t) => {
    const env = Math.min(1, t / 0.01) * Math.exp(-t * 2.0);
    return Math.tanh(1.4 * Math.sin(TAU * f * t)) * env;
  });
}

function kick(t0) {
  add(t0, 0.35, 0.48, 1, 1, (t) => Math.sin(TAU * (48 + 85 * Math.exp(-t * 34)) * t) * Math.exp(-t * 10));
}

function clap(t0) {
  let lp = 0;
  add(t0, 0.28, 0.2, 0.9, 1, (t) => {
    lp += 0.5 * (rand() - lp);
    return lp * (t < 0.03 ? 0.6 + 0.4 * Math.sin(TAU * 90 * t) : 1) * Math.exp(-t * 16);
  });
}

function shaker(t0, g) {
  let prev = 0;
  add(t0, 0.07, g, 0.8, 1, (t) => {
    const n = rand();
    const hp = n - prev;
    prev = n;
    return hp * Math.min(1, t / 0.01) * Math.exp(-t * 55);
  });
}

// C – Am – F – G, then a lifted variant every 4th cycle for variety.
const CH = [
  { root: 36, tones: [60, 64, 67] },
  { root: 33, tones: [60, 64, 69] },
  { root: 41, tones: [60, 65, 69] },
  { root: 43, tones: [59, 62, 67] },
];
const ARP = [0, 1, 2, 1, 2, 12, 2, 1];
// Simple hummable top line (scale degrees over each chord tone), every other bar.
const LEAD = [[2, 0], [1, 1.5], [2, 2.5]];

for (let bar = 0; bar < BARS; bar++) {
  const t = bar * BAR;
  const ch = CH[bar % 4];
  const last = bar === BARS - 1;
  const drums = bar >= 4 && !last;

  ch.tones.forEach((m) => pad(t, m, BAR, 0.05));
  if (!last) {
    ARP.forEach((a, i) => {
      const m = a >= 12 ? ch.tones[a - 12] + 12 : ch.tones[a];
      bell(t + i * (BEAT / 2), m + 12, i % 2 ? 0.06 : 0.09, i % 2 ? 0.5 : -0.5);
    });
  }
  if (bar >= 2 && bar % 2 === 1 && !last) LEAD.forEach(([ti, beat]) => bell(t + beat * BEAT, ch.tones[ti] + 24, 0.09, 0));
  if (bar >= 2 && !last) {
    bass(t, ch.root, BEAT * 1.8);
    bass(t + 2.5 * BEAT, ch.root, BEAT * 1.2);
  }
  if (drums) {
    kick(t);
    kick(t + 2.5 * BEAT);
    clap(t + 2 * BEAT); // half-time backbeat keeps it calm
    for (let s = 0; s < 8; s++) shaker(t + s * (BEAT / 2), s % 2 ? 0.035 : 0.06);
  }
}

let lpL = 0, lpR = 0, peak = 0;
for (let i = 0; i < LEN; i++) {
  lpL += 0.6 * (L[i] - lpL);
  lpR += 0.6 * (R[i] - lpR);
  L[i] = lpL;
  R[i] = lpR;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const gain = 0.89 / peak;
const buf = Buffer.alloc(44 + LEN * 4);
buf.write("RIFF", 0);
buf.writeUInt32LE(36 + LEN * 4, 4);
buf.write("WAVEfmt ", 8);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20);
buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32);
buf.writeUInt16LE(16, 34);
buf.write("data", 36);
buf.writeUInt32LE(LEN * 4, 40);
for (let i = 0; i < LEN; i++) {
  buf.writeInt16LE(Math.round(L[i] * gain * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(R[i] * gain * 32767), 46 + i * 4);
}
writeFileSync(new URL("../assets/music.wav", import.meta.url), buf);
console.log(`wrote assets/music.wav (${(LEN / SR).toFixed(1)}s)`);
