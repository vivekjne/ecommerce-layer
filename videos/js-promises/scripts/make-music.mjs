// Synthesizes an original, royalty-free lo-fi background track for the video.
// No samples or third-party audio: every sound is generated here, so the
// output has no copyright encumbrance. Deterministic (seeded PRNG).
//
//   node scripts/make-music.mjs            -> assets/music.wav
//   ffmpeg -i assets/music.wav -b:a 160k assets/music.mp3
import { writeFileSync } from "node:fs";

const SR = 44100;
const BPM = 80;
const BEAT = 60 / BPM; // 0.75s
const BAR = BEAT * 4; // 3s
const BARS = 25; // 75s
const LEN = Math.ceil(BARS * BAR * SR) + SR; // +1s tail
const L = new Float32Array(LEN);
const R = new Float32Array(LEN);

let seed = 42;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const swing = (beat) => (beat % 1 === 0.5 ? beat + 0.08 : beat); // lazy 8ths

function add(t0, dur, gain, panL, panR, fn) {
  const s0 = Math.floor(t0 * SR);
  const n = Math.floor(dur * SR);
  for (let i = 0; i < n && s0 + i < LEN; i++) {
    const v = fn(i / SR) * gain;
    L[s0 + i] += v * panL;
    R[s0 + i] += v * panR;
  }
}

// Electric-piano-ish tone: sine + fading bell harmonic, slow tremolo.
function keys(t0, midi, dur, gain) {
  const f = hz(midi);
  add(t0, dur + 1.5, gain, 1, 1, (t) => {
    const env = Math.min(1, t / 0.012) * Math.exp(-t * 0.9);
    const bell = 0.35 * Math.sin(2 * Math.PI * f * 2 * t) * Math.exp(-t * 4);
    const trem = 1 + 0.08 * Math.sin(2 * Math.PI * 4.5 * t);
    return (Math.sin(2 * Math.PI * f * t) + bell) * env * trem;
  });
}

function bass(t0, midi, dur) {
  const f = hz(midi);
  add(t0, dur, 0.32, 1, 1, (t) => {
    const env = Math.min(1, t / 0.01) * Math.exp(-t * 1.6);
    return Math.tanh(1.6 * Math.sin(2 * Math.PI * f * t)) * env;
  });
}

function kick(t0) {
  add(t0, 0.45, 0.55, 1, 1, (t) => {
    const f = 45 + 80 * Math.exp(-t * 30);
    return Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 9);
  });
}

function snare(t0) {
  let lp = 0;
  add(t0, 0.3, 0.2, 0.9, 1, (t) => {
    lp += 0.35 * (rand() - lp); // soft, dusty noise
    return (lp * 1.4 + 0.4 * Math.sin(2 * Math.PI * 185 * t)) * Math.exp(-t * 16);
  });
}

function hat(t0, gain) {
  let prev = 0;
  add(t0, 0.06, gain, 1, 0.75, (t) => {
    const n = rand();
    const hp = n - prev; // crude high-pass
    prev = n;
    return hp * Math.exp(-t * 70);
  });
}

// Fmaj7 – Em7 – Dm7 – Cmaj7, voiced around middle C.
const CHORDS = [
  { root: 41, notes: [57, 60, 64, 65] },
  { root: 40, notes: [55, 59, 62, 64] },
  { root: 38, notes: [53, 57, 60, 62] },
  { root: 36, notes: [52, 55, 59, 60] },
];

for (let bar = 0; bar < BARS; bar++) {
  const t = bar * BAR;
  const ch = CHORDS[bar % 4];
  const drums = bar >= 2 && bar < BARS - 1; // keys-only intro and ending

  // Slightly strummed chord on 1, softer re-hit on the "and" of 3.
  ch.notes.forEach((m, i) => keys(t + i * 0.018, m, BAR, 0.075));
  if (bar < BARS - 1) ch.notes.forEach((m) => keys(t + swing(2.5) * BEAT, m, BEAT, 0.04));
  // Little melodic answer every other bar.
  if (bar % 2 === 1 && drums) keys(t + swing(3.5) * BEAT, ch.notes[3] + 12, BEAT, 0.05);

  if (bar >= 1) {
    bass(t, ch.root, BEAT * 2);
    bass(t + swing(2.5) * BEAT, ch.root + (bar % 4 === 3 ? 7 : 0), BEAT * 1.4);
  }
  if (drums) {
    kick(t);
    kick(t + swing(2.5) * BEAT);
    snare(t + BEAT);
    snare(t + 3 * BEAT);
    for (let e = 0; e < 8; e++) hat(t + swing(e / 2) * BEAT, e % 2 ? 0.05 : 0.08);
  }
}

// Master: gentle low-pass for warmth, faint vinyl crackle, normalize.
let lpL = 0;
let lpR = 0;
let peak = 0;
for (let i = 0; i < LEN; i++) {
  lpL += 0.45 * (L[i] - lpL);
  lpR += 0.45 * (R[i] - lpR);
  const crackle = rand() > 0.9994 ? rand() * 0.04 : rand() * 0.0015;
  L[i] = lpL + crackle;
  R[i] = lpR + crackle;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}

const gain = 0.89 / peak;
const buf = Buffer.alloc(44 + LEN * 4);
buf.write("RIFF", 0);
buf.writeUInt32LE(36 + LEN * 4, 4);
buf.write("WAVEfmt ", 8);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); // PCM
buf.writeUInt16LE(2, 22); // stereo
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
