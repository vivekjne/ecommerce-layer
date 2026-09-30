# UiPath Delegate: Hire your first AI-intern

A 9:51 narrated, animated explainer built with [HyperFrames](https://hyperframes.heygen.com).
The voiceover is the supplied 10-section script (`narration.json`), word for word; the visuals are
illustrated, animated diagrams (characters, icons, arrows), not slides. Everything (voice, timing,
music, visuals) is generated from source.

```
# one-time: runtimes + models (model files come from GitHub releases)
pip install kokoro-onnx onnxruntime soundfile espeakng-loader sherpa-onnx numpy imageio-ffmpeg praat-parselmouth
#   Kokoro:  github.com/thewh1teagle/kokoro-onnx  release model-files-v1.0
#            -> kokoro-v1.0.onnx + voices-v1.0.bin into $KOKORO_DIR (default ~/.cache/kokoro)
#   Whisper: github.com/k2-fsa/sherpa-onnx  release asr-models
#            -> sherpa-onnx-whisper-base.en.tar.bz2, extract to $WHISPER_DIR
# ffmpeg + ffprobe must be on PATH; HYPERFRAMES_BROWSER_PATH must point at a Chromium headless shell

KOKORO_VOICE=af_heart KOKORO_SPEED=0.80 python3 scripts/voice.py   # narration.json -> voiceover + timing.json
python3 scripts/verify_voice.py     # Whisper transcribes every line and flags mispronunciations
node scripts/make-music.mjs         # original synthesized music, sized to the video
node scripts/build.mjs              # master audio; inline src/ parts into index.html  (SKIP_AUDIO=1: HTML only)
node scripts/validate_cues.mjs      # every animation cue sits inside its narration line
npx hyperframes@0.8.94 check
npx hyperframes@0.8.94 render -f 30 -q standard -w 4 -o rendered.mp4
node scripts/finalize.mjs rendered.mp4 uipath-delegate-explainer.mp4 33   # compress + restore loudness
```

## Structure (13 scenes, following the script's ON SCREEN cues)

| Time | Scene | Script section |
| --- | --- | --- |
| 0:01 | s1 Cold open: busy Monday montage, a Delegate session, title card | 1 Cold open |
| 0:42 | s2 What it is: computer use, four ways to start, four ideas, the enterprise door | 2 What Delegate is |
| 1:42 | s3 The four-step loop beside a session mockup, then under the hood and attached SOPs | 3 How Delegate works |
| 2:57 | s4 One session, three prompts: report to CRM, morning triage, draft and approve | 4 Demo |
| 3:48 | s5 Support example: backlog, summary, licensing data, first response, one chat | 4 Demo (cutaway) |
| 4:16 | s6 No-API system, cost scale, record once, routine or knowledge skill, share | 5 Teach it |
| 5:08 | s7 Raw data to deliverable split screen, hours vs minutes, three enterprise use cases | 6 Data to deliverable |
| 5:54 | s8 A form arrives pre-filled inside the chat; "Works through MCP Apps" | 7 MCP Apps |
| 6:40 | s9 Save as routine, run, schedule, share | 8 Routines |
| 7:26 | s10 Cautious / Adaptive / Full access lanes, the Smart approvals toggle | 9 Approval modes |
| 8:13 | s11 Allow and deny lists, permissions, audit trail, your data | 9 Governance |
| 8:28 | s12 Orchestrator, credential vault, AI Trust Layer, role-based access: built in | 9 Governance |
| 8:56 | s13 Recap, extension of what you have, end slide with links | 10 Wrap-up |

`src/template.html` is a skeleton; `build.mjs` inlines the parts it includes: `style.css`,
`js/icons.js` (inline icon set), `js/chars.js` (Sam, Byte, and Delegate the intern), `js/helpers.js`
(timeline, caption and cursor helpers) and `scenes/sN.html` + `scenes/sN.js`. Every animation cue is
tied to the voice (`L("lineId", offset)`, `W("lineId", wordIndex)`), so changing the script re-times
the whole video.

## Content and sources

- **Source of truth:** the 10-section script supplied with the request. Where it differs from the
  earlier deck-based version, the script wins (for example the approval-mode names: the script says
  Cautious / Adaptive / Full access, the deck said Always ask / Smart / Unrestricted).
- The 20 navy-tile icons are images from the "UiPath Delegate - Premium" deck (`assets/deck/`); the
  other icons are drawn inline. The deck also informed the support example (case backlog, summary,
  licensing lookup, first response).
- Claims that appear only in the script and could not be cross-checked (MCP Apps, saving, scheduling
  and sharing routines, Smart approvals, the credential-vault and role-based-access details, "no new
  IT approval / no new upgrade process") are narrated as the script states them.
- The UiPath product page and docs pages are **blocked by the build sandbox's network policy**, so
  nothing was verified against them.
- **Illustrations are not UiPath UI.** The script asks for recordings of a real environment; none
  were available, so every screen is a generic illustration (placeholder bars, "Task type A",
  "Request form", "Teammate"). The characters (Sam, Byte, Delegate the "intern") are fictional.
- The closing line says the guide and product page are "linked below": the links belong in the
  description where the video is posted. The end slide shows the labels and `uipath.com/product/delegate`.

## Voice

Kokoro `af_heart` (female), speed 0.80: about 145 words per minute, matching the ~140 wpm the script
assumes. Speed was chosen by measuring total length at several settings (0.78 gave 10:24, 0.81 gave
9:19; 0.80 gives 9:51). Median F0 of the generated clips is 196 Hz (10th to 90th percentile 164-257 Hz),
inside the typical adult female speech range.

Pronunciation notes: `AI` and `API` are written plainly (the TTS reads a spaced "A I" as "uh-eye");
`CRM`, `SOPs`, `MCP` and "flowchart" are respelled for the voice only, the captions show the original.
Whisper heard "flowchart" as "float chart" until it was respelled `flow chart`.

## Measured on the final file (`uipath-delegate-explainer.mp4`)

| Check | Result |
| --- | --- |
| Format | 1920x1080, 30 fps, H.264 + AAC, 9:51.2, 29.5 MiB (CRF 33) |
| `hyperframes check` | 0 errors (21 advisory lint warnings: nested structure, repeated icon images, file size); 136/136 text contrast checks pass WCAG AA |
| Visual review | snapshots of every scene, several per scene, viewed and fixed; nine frames of the final MP4 inspected |
| Loudness | -14.5 LUFS integrated, true peak -2.6 dBFS |
| Whisper on the raw voice clips | 99.2% of words understood |
| Whisper on the final MP4 audio (voice + music) | 99.8% of words understood; the only flag is "roles" heard as "rolls" (homophone) |
| Voice pitch | median F0 196 Hz |

Not verifiable by the author: how the voice actually *sounds*, and how the animation *feels* in
motion; both were checked from measurements and still frames, not by watching or listening.

Encoder note: `scripts/finalize.mjs` passes `-aac_is 0 -aac_pns 0`; FFmpeg's default AAC settings
produced a decoded sample above 0 dBFS from a -5 dBFS input.

Authoring notes: animating `transform` on a wrapper `div` makes that `div` the containing block for
its absolutely positioned children and shifts them, so wrappers that get faded are opacity-only and
wrappers that move are pinned to the page origin. Captions leave no later than the next caption
arrives, so lines split mid-sentence (short `gap`) do not overlap.
