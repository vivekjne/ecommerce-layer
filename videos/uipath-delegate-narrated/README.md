# Delegate Demystified: UiPath Delegate

A ~9.5 minute narrated, animated explainer built with [HyperFrames](https://hyperframes.heygen.com),
in the same format as the JavaScript Demystified episodes (hook question, one idea per scene,
word-by-word captions, a "quick check" pause, recap). Everything (script, voice, music, timing,
visuals) is generated from source.

```
# one-time: runtimes + models (model files come from GitHub releases)
pip install kokoro-onnx onnxruntime soundfile espeakng-loader sherpa-onnx numpy imageio-ffmpeg praat-parselmouth
#   Kokoro:  github.com/thewh1teagle/kokoro-onnx  release model-files-v1.0
#            -> kokoro-v1.0.onnx + voices-v1.0.bin into $KOKORO_DIR (default ~/.cache/kokoro)
#   Whisper: github.com/k2-fsa/sherpa-onnx  release asr-models
#            -> sherpa-onnx-whisper-base.en.tar.bz2, extract to $WHISPER_DIR
# ffmpeg + ffprobe must be on PATH; HYPERFRAMES_BROWSER_PATH must point at a Chromium headless shell

KOKORO_VOICE=af_heart KOKORO_SPEED=0.8 python3 scripts/voice.py   # narration.json -> voiceover + timing.json
python3 scripts/verify_voice.py     # Whisper transcribes every line and flags mispronunciations
node scripts/make-music.mjs         # original synthesized music, sized to the video
node scripts/build.mjs              # master audio; inline src/ parts into index.html
node scripts/validate_cues.mjs      # every animation cue sits inside its narration line
npx hyperframes check
npx hyperframes render -f 30 -q standard -w 4 -o rendered.mp4
node scripts/finalize.mjs rendered.mp4 uipath-delegate-explainer.mp4 32   # compress + restore loudness
```

## Layout of `src/`

`src/template.html` is a skeleton; `build.mjs` inlines the parts it includes:
`style.css`, `js/icons.js` (inline icon set), `js/chars.js` (Sam, Byte, and Delegate the intern),
`js/helpers.js` (timeline helpers, captions), and `scenes/sN.html` + `scenes/sN.js` per scene.
Every animation cue is tied to the voice (`L("lineId", offset)`, `W("lineId", wordIndex)`), so
changing the script re-times the whole video.

## Content and sources

- **Source of truth:** the "UiPath Delegate - Premium" product overview deck supplied with the
  request. Every statement in the narration and on screen comes from it, paraphrased.
  The 20 icons on the navy tiles are the deck's own images (`assets/deck/`, duplicates removed);
  the other icons are drawn inline.
- Comparative and vendor claims are attributed in the narration ("UiPath says ...") rather than
  presented as verified fact: the reliability comparison with screen-only tools, and "no new IT
  approval / no new upgrade process".
- The UiPath product page and docs pages (`uipath.com/product/delegate`, `docs.uipath.com/delegate/...`)
  are **blocked by the build sandbox's network policy**, so nothing was taken from them.
  Facts that only a search-result summary of those pages mentioned were left out.
- Acronyms the deck does not define (PDD, SDD, UIA) are read letter by letter, not expanded.
  Slide 7 says "Product Design Documents"; the video says "design documents" because the deck
  does not define PDD, and the narration and on-screen text match.
- **Illustrations are not UiPath UI.** The animated examples (a case list sorting itself, a context
  panel, a license card, logs, a five-source search, a draft reply, a job run, the mode lanes, the
  governance diagram) illustrate what the deck *says* each step does. Their contents (placeholder
  bars, "Task type A", "Server / Browser / Data", "Teammate") are generic, not real screens or data.
  The characters (Sam, Byte, Delegate the "intern") are fictional illustrations.

## Voice

Kokoro `af_heart` (female), speed 0.8, about 129 wpm. Measured on the generated clips: median F0
198 Hz (10th-90th percentile 163-260 Hz), inside the typical adult female speech range.

**"AI" pronunciation.** The first version wrote `[AI|A I]` (and `A P I`). The TTS front end treats a
lone `A` as the English article, so it phonemized "A I" as `ɐ ˈaɪ` ("uh-eye"), which sounds like
"aayi". Plain `AI` and `API` phonemize as `ˌeɪˈaɪ` ("ay-eye") and `ˌeɪpˌiːˈaɪ`, so the script now uses
the plain forms. Whisper transcribed the old lines as "an eye" / "a PI" and the new ones as "AI" / "API".
`PSE`, `SOPs` and `CRM` are still spelled out because their plain forms are mispronounced.

## Measured on the final file (`uipath-delegate-explainer.mp4`)

| Check | Result |
| --- | --- |
| Format | 1920x1080, 30 fps, H.264 + AAC, 9:34.8, 29.1 MB (CRF 32) |
| `hyperframes check` | 0 errors (21 advisory warnings: nested structure, repeated icon images, file size); 118/118 text contrast checks pass WCAG AA |
| Visual review | snapshots from every scene (about 170 frames, plus every scene boundary) viewed, overlaps fixed and re-checked; frames of the final MP4 inspected |
| Loudness | -14.5 LUFS integrated, true peak -2.6 dBFS |
| Whisper on the raw voice clips | 99.9% of words understood, no line at 15% error or worse |
| Whisper on the final MP4 audio (voice + music) | 100.0% of words understood, no line flagged |
| Voice pitch | median F0 198 Hz |

Not verifiable by the author: how the voice actually *sounds*, and how the animation *feels* in
motion; both were checked from measurements and still frames, not by watching or listening.

Encoder note: with FFmpeg's default AAC settings a decoded sample reached +0.8 dBFS although the
input peaked at -5 dBFS (intensity stereo / noise substitution artefact). `scripts/finalize.mjs`
passes `-aac_is 0 -aac_pns 0`, which removes it at the same size.

Authoring note: animating `transform` on a wrapper `div` makes that `div` the containing block for
its absolutely positioned children and shifts them. Wrappers that get faded are opacity-only, and
wrappers that move are pinned to the page origin (see scene 12).
