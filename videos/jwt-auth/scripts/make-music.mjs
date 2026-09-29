// Synthesizes an original, royalty-free upbeat track for the JWT video.
// No samples or third-party audio: every sound is generated here, so the
// output has no copyright encumbrance. Deterministic (seeded PRNG).
//
//   node scripts/make-music.mjs            -> assets/music.wav
//   ffmpeg -i assets/music.wav -b:a 160k assets/music.mp3
import { writeFileSync } from "node:fs";

const SR = 44100;
const BPM = 104;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const BARS = 35; // ~80.8s, trimmed/faded by the composition
const LEN = Math.ceil(BARS * BAR * SR) + SR;
const L = new Float32Array(LEN);
const R = new Float32Array(LEN);

let seed = 7;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const TAU = 2 * Math.PI;

function add(t0, dur, gain, panL, panR, fn) {
  const s0 = Math.floor(t0 * SR);
  const n = Math.floor(dur * SR);
  for (let i = 0; i < n && s0 + i < LEN; i++) {
    const v = fn(i / SR) * gain;
    L[s0 + i] += v * panL;
    R[s0 + i] += v * panR;
  }
}

// Soft pad-ish chord stab: detuned sines with a gentle swell.
function pad(t0, midi, dur, gain) {
  const f = hz(midi);
  add(t0, dur + 0.6, gain, 1, 1, (t) => {
    const env = Math.min(1, t / 0.08) * Math.exp(-t * 0.7);
    return (Math.sin(TAU * f * t) + 0.6 * Math.sin(TAU * f * 1.004 * t) + 0.2 * Math.sin(TAU * f * 2 * t)) * env;
  });
}

// Marimba-like pluck: fundamental + 4x partial, fast decay.
function marimba(t0, midi, gain, pan) {
  const f = hz(midi);
  add(t0, 0.6, gain, 1 - pan * 0.4, 1 + pan * 0.4, (t) => {
    const env = Math.min(1, t / 0.003) * Math.exp(-t * 7);
    return (Math.sin(TAU * f * t) + 0.25 * Math.sin(TAU * f * 4 * t) * Math.exp(-t * 25)) * env;
  });
}

function bass(t0, midi, dur) {
  const f = hz(midi);
  add(t0, dur, 0.3, 1, 1, (t) => {
    const env = Math.min(1, t / 0.008) * Math.exp(-t * 2.2);
    return Math.tanh(1.4 * Math.sin(TAU * f * t)) * env;
  });
}

function kick(t0) {
  add(t0, 0.35, 0.5, 1, 1, (t) => {
    const f = 50 + 90 * Math.exp(-t * 35);
    return Math.sin(TAU * f * t) * Math.exp(-t * 11);
  });
}

function clap(t0) {
  let lp = 0;
  add(t0, 0.25, 0.22, 0.9, 1, (t) => {
    lp += 0.5 * (rand() - lp);
    const bursts = t < 0.03 ? 0.6 + 0.4 * Math.sin(TAU * 90 * t) : 1; // little flam
    return lp * bursts * Math.exp(-t * 18);
  });
}

function shaker(t0, gain) {
  let prev = 0;
  add(t0, 0.07, gain, 0.8, 1, (t) => {
    const n = rand();
    const hp = n - prev;
    prev = n;
    return hp * Math.min(1, t / 0.01) * Math.exp(-t * 55);
  });
}

// C – G – Am – F (I–V–vi–IV), bright and friendly.
const CHORDS = [
  { root: 36, tones: [60, 64, 67] },
  { root: 43, tones: [59, 62, 67] },
  { root: 45, tones: [60, 64, 69] },
  { root: 41, tones: [60, 65, 69] },
];
// Arpeggio pattern (indices into tones, +12 for octave up), 8 eighth notes.
const ARP = [0, 1, 2, 12, 2, 1, 12 + 1, 2];

for (let bar = 0; bar < BARS; bar++) {
  const t = bar * BAR;
  const ch = CHORDS[bar % 4];
  const last = bar === BARS - 1;
  const full = bar >= 2 && !last;

  ch.tones.forEach((m) => pad(t, m, BAR, 0.05));
  if (!last) {
    ARP.forEach((a, i) => {
      const m = a >= 12 ? ch.tones[a - 12] + 12 : ch.tones[a];
      marimba(t + i * (BEAT / 2), m + 12, i % 2 ? 0.07 : 0.1, i % 2 ? 0.5 : -0.5);
    });
  }
  if (bar >= 1 && !last) {
    [0, 1.5, 2, 3.5].forEach((b) => bass(t + b * BEAT, ch.root, BEAT * 0.9));
  }
  if (full) {
    for (let b = 0; b < 4; b++) kick(t + b * BEAT);
    clap(t + BEAT);
    clap(t + 3 * BEAT);
    for (let s = 0; s < 16; s++) shaker(t + s * (BEAT / 4), s % 4 === 2 ? 0.07 : 0.035);
  }
}

// Master: light low-pass, normalize.
let lpL = 0;
let lpR = 0;
let peak = 0;
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
