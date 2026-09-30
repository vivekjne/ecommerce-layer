# React Router framework mode — narrated tutorial (~18 min)

Byte and Sam (with short cameos by Mallory and Guard) walk through React Router 8
framework mode using a real demo store, Nova Market. Split-screen scenes show real
code on the left and the real running app on the right.

## Layout

- `SCRIPT.md` — the narration, source of truth (`SPEAKER: text` under `## N. Title`).
- `nova-market/` — the real demo app (React Router 8). Code shown in the video is extracted from it.
- `catalog-api/server.mjs` — tiny REST API on :4000 that the app fetches from.
- `demo/capture.mjs` — Playwright driver that captures the preview frames.
- `video/` — the HyperFrames project (scenes in `src/parts/`, scripts in `scripts/`).

## Rebuild

```bash
cd videos/react-router
(cd nova-market && npm install)
node catalog-api/server.mjs &            # :4000
(cd nova-market && npm run dev &)         # :5173
node demo/capture.mjs                     # writes demo/frames + manifest.json
cp demo/frames/*.jpg video/assets/frames/ && cp demo/frames/manifest.json video/frames-manifest.json

cd video
python3 scripts/script_to_narration.py    # SCRIPT.md -> narration.json
python3 scripts/voice.py                  # Kokoro TTS, per-speaker voices -> timing.json
python3 scripts/verify_voice.py           # Whisper check
node scripts/make-music.mjs               # generated background music
python3 scripts/extract_code.py           # real code -> codes.json
python3 scripts/assemble.py && node scripts/check_cues.mjs
node scripts/build.mjs                    # index.html
npx hyperframes check
npx hyperframes render -f 30 -q standard -w 4 -o rendered.mp4
node scripts/finalize.mjs rendered.mp4 react-router-store.mp4
```

Environment variables: `KOKORO_DIR`, `WHISPER_DIR`, `HYPERFRAMES_BROWSER_PATH`; ffmpeg on `PATH`.

## Notes

- Testing, ViewTransition, client middleware, `use`, `useRevalidator`, and the
  `meta`/`links` exports are docs-style examples, not code from Nova Market.
- Audio was checked with Whisper (about 96% of words recognised), not by ear.
