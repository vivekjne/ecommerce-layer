// Synthesizes an original, royalty-free, calm "thinking" underscore for the
// interview video. No samples or third-party audio: every sound is generated
// here, so it carries no copyright or attribution requirements. Deterministic.
//
//   python3 scripts/voice.py        # writes timing.json (video length)
//   node scripts/make-music.mjs     # -> assets/music.wav (sized to the video)
//   (build.mjs encodes it to mp3)
//
// Deliberately sparse (soft pads, a slow bell arpeggio, gentle bass, no drums)
// so it never competes with the voiceover.
import { readFileSync, writeFileSync } from "node:fs";

const timing = JSON.parse(readFileSync(new URL("../timing.json", import.meta.url)));
const SR = 44100;
const BPM = 92;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const BARS = Math.ceil((timing.total + 2) / BAR);
const LEN = Math.ceil(BARS * BAR * SR) + SR;
const L = new Float32Array(LEN);
const R = new Float32Array(LEN);

let seed = 11;
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
  add(t0, dur + 1.2, gain, 1, 1, (t) => {
    const env = Math.min(1, t / 0.6) * Math.min(1, Math.max(0, (dur + 1.2 - t) / 1.0));
    const trem = 1 + 0.05 * Math.sin(TAU * 0.25 * t);
    return (Math.sin(TAU * f * t) + 0.55 * Math.sin(TAU * f * 1.003 * t) + 0.18 * Math.sin(TAU * f * 2 * t)) * env * trem;
  });
}

function bell(t0, m, gain, pan) {
  const f = hz(m);
  add(t0, 1.6, gain, 1 - pan * 0.5, 1 + pan * 0.5, (t) => {
    const env = Math.min(1, t / 0.006) * Math.exp(-t * 3.6);
    return (Math.sin(TAU * f * t) + 0.28 * Math.sin(TAU * f * 2.76 * t) * Math.exp(-t * 10)) * env;
  });
}

function bass(t0, m, dur) {
  const f = hz(m);
  add(t0, dur, 0.22, 1, 1, (t) => {
    const env = Math.min(1, t / 0.03) * Math.exp(-t * 1.3);
    return Math.tanh(1.2 * Math.sin(TAU * f * t)) * env;
  });
}

function brush(t0, g) {
  let prev = 0;
  add(t0, 0.12, g, 0.8, 1, (t) => {
    const n = rand();
    const hp = n - prev;
    prev = n;
    return hp * Math.min(1, t / 0.02) * Math.exp(-t * 30);
  });
}

const C = (root, tones) => ({ root, tones });
// three gentle sections so 9 minutes doesn't feel like one loop
const SECTIONS = [
  [C(38, [62, 65, 69]), C(34, [62, 65, 70]), C(41, [60, 65, 69]), C(36, [60, 64, 67])], // Dm  Bb  F  C
  [C(41, [60, 65, 69]), C(36, [60, 64, 67]), C(38, [62, 65, 69]), C(33, [60, 64, 69])], // F   C   Dm Am
  [C(34, [62, 65, 70]), C(41, [60, 65, 69]), C(43, [58, 62, 67]), C(38, [62, 65, 69])], // Bb  F   Gm Dm
];
const ARPS = [
  [0, 1, 2, 1, 2, 1, 0, 1],
  [0, 2, 1, 2, 0, 2, 1, 2],
  [2, 1, 0, 1, 2, 12, 2, 1],
];
const BARS_PER_SECTION = 12;

for (let bar = 0; bar < BARS; bar++) {
  const t = bar * BAR;
  const sec = Math.floor(bar / BARS_PER_SECTION) % SECTIONS.length;
  const ch = SECTIONS[sec][bar % 4];
  const arp = ARPS[sec];
  const last = bar >= BARS - 2;

  ch.tones.forEach((m, i) => pad(t + i * 0.03, m, BAR, 0.05));
  if (!last) {
    arp.forEach((a, i) => {
      // arpeggio plays every other beat-pair to leave space for speech
      if (i % 2 === 1 && bar % 2 === 0) return;
      const m = a >= 12 ? ch.tones[a - 12] + 12 : ch.tones[a];
      bell(t + i * (BEAT / 2), m + 12, i % 2 ? 0.045 : 0.06, i % 2 ? 0.5 : -0.5);
    });
  }
  if (bar >= 1 && !last) bass(t, ch.root, BEAT * 3);
  if (bar % 16 >= 8 && !last) for (let s = 0; s < 4; s++) brush(t + s * BEAT + BEAT / 2, 0.03);
}

let lpL = 0,
  lpR = 0,
  peak = 0;
for (let i = 0; i < LEN; i++) {
  lpL += 0.5 * (L[i] - lpL);
  lpR += 0.5 * (R[i] - lpR);
  L[i] = lpL;
  R[i] = lpR;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const gain = 0.85 / peak;
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
console.log(`wrote assets/music.wav (${(LEN / SR).toFixed(1)}s, ${BARS} bars)`);
