# JSInterviewByte — JavaScript interview questions as vertical shorts

One question per video, 1080×1920, about 1:40–2:20 each. Sam asks, Byte answers. Every concept is
explained with an animated diagram (two "machines" for `==`/`===`, scope boxes and backpacks for
closures, memory boxes and a pointer for the Temporal Dead Zone, receipts and an abort signal for
`Promise.all`, a function machine with a `this` slot for `call`/`apply`/`bind`). JS keywords
(`this`, `var`, `let`, `const`, `typeof`, `true`, `null`, ...) are stressed in the voice and shown
as code chips in the captions.
Questions come from https://github.com/sudheerj/javascript-interview-questions
(paraphrased); every answer and every output shown on screen was re-checked by running the
code in Node (`cases.json` → `tools/verify_cases.mjs`).

| # | Question | Source item | Verified |
|---|----------|-------------|----------|
| 01 | `==` vs `===` | #9 | 18 expressions |
| 02 | What is a closure | #28 | counter, loop, factory |
| 03 | Temporal Dead Zone | #22 | var/let/typeof/class/shadowing |
| 04 | Does `Promise.all` cancel the others | #66 | timers + AbortController |
| 05 | `call`, `apply`, `bind` | #3 | 8 scripts |

Where the source text was imprecise it was corrected, not copied:
- #66 says `Promise.all` "waits for all promises to settle". It rejects immediately on the first
  rejection (`allSettled` is the one that waits). The video says the former.
- #28's example prints `"Welcome  John"` (two spaces, from a trailing space in the argument);
  the video uses its own counter / adder examples.

## Layout
- `tools/` shared pipeline (voice, music, build, verify). `engine/` vertical composition engine.
- `qNN-*/script.md` narration (`SAM:`/`BYTE:`), `cases.json` verified snippets, `spec.js` the
  animation script (cues come from the voice timing), `meta.json`.

## Build one video
```bash
cd videos/jsinterviewbyte/q01-loose-vs-strict
export VID=$PWD KOKORO_DIR=... WHISPER_DIR=... SEED=101   # ffmpeg on PATH
node ../tools/verify_cases.mjs            # run the code, compare with what the video shows
python3 ../tools/script_to_narration.py      # markup: {keyword}, [shown|spoken|c] = code word
python3 ../tools/voice.py                  # Kokoro voices -> timing.json
python3 ../tools/verify_voice.py           # Whisper check
node ../tools/make-music.mjs && node ../tools/build.mjs   # index.html
npx hyperframes check
npx hyperframes render -f 30 -q standard -o rendered.mp4
node ../tools/finalize.mjs rendered.mp4 final.mp4 26      # loudness -14.5 LUFS
```
