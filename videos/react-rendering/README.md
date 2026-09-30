# React rendering explained: CSR, SSR and React Server Components

Narrated, animated explainer (HyperFrames: HTML + GSAP, rendered to MP4). About 8:45,
1080p / 30 fps, male neural voice (Kokoro `am_michael`), original synthesized music.

Covers: the three players in a request, client side rendering (flow, code, trade-offs),
server side rendering (`renderToString`), hydration and hydration mismatches, a CSR vs SSR
timeline, streaming with `Suspense`, why SSR still ships all component JavaScript, React
Server Components, the real RSC payload, the `"use client"` / `"use server"` boundary,
SSR vs RSC, and when to use what.

## Rebuild

```bash
export PATH=/tmp/claude-0/bin:$PATH        # ffmpeg + ffprobe
export KOKORO_DIR=/tmp/claude-0/models      # kokoro-v1.0.onnx + voices-v1.0.bin
python3 scripts/voice.py                    # narration.json -> assets/voiceover.wav + timing.json
python3 scripts/verify_voice.py             # Whisper check of every line (optional)
node scripts/make-music.mjs                 # assets/music.wav, sized to the video
python3 scripts/assemble.py                 # src/parts/* -> src/template.html
node scripts/check_cues.mjs                 # every L()/W() cue lies inside its line
node scripts/build.mjs                      # audio mastering + index.html
npx hyperframes check
npx hyperframes render -f 30 -q standard -w 4 -o rendered.mp4
node scripts/finalize.mjs                   # loudness + compression -> react-rendering.mp4
```

`src/parts/` is the source of truth (head/CSS, scene DOM, JS helpers, scene timelines);
`src/template.html` is generated from it. `verify/` holds the scripts and real outputs behind
every code sample on screen (see `verify/README.md`).
