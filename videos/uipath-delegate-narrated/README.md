# Delegate Demystified: UiPath Delegate

A ~9 minute narrated explainer built with [HyperFrames](https://hyperframes.heygen.com), in the
same format as the JavaScript Demystified episodes (hook question, one idea per scene, word-by-word
captions, a "quick check" pause, recap). Everything (script, voice, music, timing, visuals) is
generated from source.

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
node scripts/validate_cues.mjs      # every animation cue sits inside its narration line
node scripts/make-music.mjs         # original synthesized music, sized to the video
node scripts/build.mjs              # master audio, fill src/template.html -> index.html
npx hyperframes check
npx hyperframes render -f 30 -q standard -w 4 -o rendered.mp4
node scripts/finalize.mjs rendered.mp4 uipath-delegate-explainer.mp4   # compress + restore loudness
```

## Content and sources

- **Source of truth:** the "UiPath Delegate - Premium" product overview deck supplied with the
  request. Every statement in the narration and on screen comes from it, paraphrased.
  The 20 icons on the navy tiles are the deck's own images (`assets/deck/`, duplicates removed).
- Comparative and vendor claims are attributed in the narration ("UiPath says ...") rather than
  presented as verified fact: the reliability comparison with screen-only tools, and "no new IT
  approval / no new upgrade process".
- The UiPath product page and docs pages (`uipath.com/product/delegate`, `docs.uipath.com/delegate/...`)
  are **blocked by the build sandbox's network policy**, so nothing was taken from them.
  Facts that only a search-result summary of those pages mentioned were left out.
- Acronyms the deck does not define (PDD, SDD, UIA) are read letter by letter, not expanded.
  Slide 7 says "Product Design Documents"; the video says "design documents" because the deck
  does not define PDD, and the narration and on-screen text match.
- The "PSE day" example prompts are the deck's; the placeholder labels in the access-control
  visual (approved / blocked apps and URLs) are generic illustrations, not UiPath UI.

## Voice

Kokoro `af_heart` (female), speed 0.8, about 128 wpm. Measured on the generated clips: median F0
198 Hz (10th-90th percentile 163-260 Hz), inside the typical adult female speech range.
Whisper (`sherpa-onnx-whisper-base.en`) recognises about 98.8% of the words; the remaining
differences are formatting ("UI" vs "U I") or stray `[buzzer]` tags Whisper adds after a line.
`narration.json` uses `[shown|spoken]` for caption text vs pronunciation, and `after` for pauses.

## Measured on the final file (`uipath-delegate-explainer.mp4`)

| Check | Result |
| --- | --- |
| Format | 1920x1080, 30 fps, H.264 + AAC, 9:02.3, 27.8 MB (CRF 30) |
| `hyperframes check` | 0 errors (19 advisory "nested structure" warnings, same as the reference videos); 98/98 text contrast checks pass WCAG AA |
| Visual review | snapshots from every scene viewed, overlaps fixed and re-checked; two frames of the final MP4 inspected |
| Loudness | -14.5 LUFS integrated, true peak -3.3 dBFS |
| Whisper on the final MP4 audio (voice + music) | 99.3% of words understood; the only flagged line is a spelled-letters formatting difference |
| Voice pitch | median F0 198 Hz |

Not verifiable by the author: how the voice actually *sounds*. Nobody listened to it. Lines
with acronyms and product names are the ones to check by ear (timestamps in the delivery notes).

Encoder note: with FFmpeg's default AAC settings a single decoded sample reached +0.8 dBFS at
3:24 although the input peaked at -5 dBFS (intensity stereo / noise substitution artefact).
`scripts/finalize.mjs` now passes `-aac_is 0 -aac_pns 0`, which removes it at the same size.

## Look

Same cream background, ink-outlined cards, and characters as the series (Sam, Byte the narrator,
Guard for governance scenes). Enumerated items (benefits, reasons, modes, governance controls) start
dimmed and light up as each one is narrated. Every cue is tied to the voice timing
(`L("lineId")`, `W("lineId", wordIndex)`), so changing the script re-times the whole video.
