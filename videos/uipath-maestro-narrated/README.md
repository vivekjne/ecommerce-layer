# UiPath Maestro: Orchestrate and Automate in five minutes

A 4:49 narrated, animated explainer built with [HyperFrames](https://hyperframes.heygen.com), in the
same pipeline and style as `../uipath-delegate-narrated`. It covers the two products of UiPath Maestro
(Maestro Automate and Maestro Orchestrate), the three Orchestrate canvases (BPMN, Case, Flow), how to
operate live instances, and how to choose. Voice, timing, music and visuals are all generated from source.

```
# tools: see ../uipath-delegate-narrated/README.md (Kokoro, Whisper, ffmpeg, a Chromium headless shell)
KOKORO_VOICE=af_heart KOKORO_SPEED=0.80 python3 scripts/voice.py   # narration.json -> voiceover + timing.json
python3 scripts/verify_voice.py     # Whisper transcribes every line and flags mispronunciations
node scripts/make-music.mjs         # original synthesized music, sized to the video
node scripts/build.mjs              # master audio; inline src/ parts into index.html  (SKIP_AUDIO=1: HTML only)
node scripts/validate_cues.mjs      # every animation cue sits inside its narration line
npx hyperframes@0.8.94 check
npx hyperframes@0.8.94 render -f 30 -q standard -w 4 -o rendered.mp4
node scripts/finalize.mjs rendered.mp4 uipath-maestro-explainer.mp4 33   # compress + restore loudness
```

## Structure (10 scenes)

| Scene | Topic |
| --- | --- |
| s1 | The hook: automated tasks, and the expensive waiting between them |
| s2 | Two products on one durable, stateful engine |
| s3 | Maestro Orchestrate: long-running instances, waits, no cap, failure recovery; BPMN / Case / Flow |
| s4 | BPMN: BPMN 2.0 plus UiPath tasks, DMN decision tables, the signed-off diagram is the one that runs |
| s5 | Case: stages, milestones, SLAs; events, AI decisions and human judgment; Case Manager and Stage Manager agents |
| s6 | Flow: a developer-first canvas; describe it to a coding agent; cloud canvas or VS Code; lives in Git |
| s7 | Operating live instances (retry, cancel, pause, resume, migrate, go to step, in bulk); history and audit trail |
| s8 | Maestro Automate: an order-intake example; building in an editor with a coding agent; probes, breakpoints, evaluation; existing automation as nodes |
| s9 | Choosing between Automate and Orchestrate, and converting one into the other |
| s10 | Getting started under Business Orchestration; closing line |

## Content and sources

- **Source of truth:** the official uipath.com product pages for Maestro Orchestrate, Maestro Automate,
  Maestro BPMN, Maestro Case and Maestro Flow, read on 2026-10-17. Every statement in `narration.json` is a
  paraphrase of those pages. Feature names and availability change between releases; check the current docs.
- **Illustrations are not UiPath UI.** Every screen is a generic illustration made for this explainer
  (placeholder bars, "Agent: check claim", the order-intake example, the refund flow prompt). No UiPath logo,
  screenshots or product images are used. The characters (Sam, Byte) are fictional.
- The narration is a synthetic (text-to-speech) voice.

## Voice

Kokoro `af_heart`, speed 0.80 (about 126 words per minute, 4:49 total). `BPMN` is respelled for the voice
only (`[BPMN|Bee Pee Em En,]`; the captions show the original). Five long sentences are split at a comma
(`s1b`/`s1bx`, `s5d`/`s5dx`, `s7c`/`s7cx`, `s8c`/`s8cx`, `s9d`/`s9dx`) so each caption stays within two lines.

Not verifiable by the author: how the voice sounds and how the animation feels in motion. Both were checked
from measurements and still frames, not by watching or listening.
