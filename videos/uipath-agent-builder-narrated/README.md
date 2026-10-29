# UiPath Agent Builder: a beginner-friendly guide (Build with Treesa)

An 11:46 narrated, animated explainer built with [HyperFrames](https://hyperframes.heygen.com), in the same
pipeline and style as `../uipath-delegate-narrated` and `../uipath-maestro-narrated`. The voiceover is the supplied
script, word for word (emojis dropped); the visuals are generic illustrated diagrams, not product screenshots.
Voice, timing, music and visuals are all generated from source.

```
# tools: see ../uipath-delegate-narrated/README.md (Kokoro, Whisper, ffmpeg, a Chromium headless shell)
LINE_GAP=0.25 KOKORO_VOICE=af_heart KOKORO_SPEED=1.0 python3 scripts/voice.py   # narration.json -> voiceover + timing.json
python3 scripts/verify_voice.py     # Whisper transcribes every line and flags mispronunciations
node scripts/make-music.mjs         # original synthesized music, sized to the video
python3 scripts/align_words.py      # measure each word's time in the voice (CTC model) and write it to timing.json
node scripts/build.mjs              # master audio; inline src/ parts into index.html
node scripts/validate_cues.mjs      # every animation cue sits inside its narration line
npx hyperframes@0.8.94 check
npx hyperframes@0.8.94 render -f 30 -q standard -w 4 -o rendered.mp4
node scripts/finalize.mjs rendered.mp4 uipath-agent-builder-guide.mp4 33   # compress + restore loudness
```

## Structure (13 scenes, one per section of the script)

| Scene | Section |
| --- | --- |
| s1 | Intro: the concepts that feel like a lot, and the journey ahead |
| s2 | What makes an agent: Prompt, Tools, Context, Escalations, Memory |
| s3 | The workspace: Form View and Canvas View (one agent definition), panels, bottom tabs |
| s4 | Data Manager: inputs and outputs as the agent's contract |
| s5 | Prompts: system prompt, user prompt, referencing capabilities |
| s6 | Tools: the execution loop, the laptop-request example, tool descriptions |
| s7 | Context: Context Grounding and the HR policy example |
| s8 | Memory: episodic and escalation memory, Memory Spaces |
| s9 | Escalations: the refund-threshold example, human-in-the-loop |
| s10 | Guardrails: checks before a tool runs, autonomy inside boundaries |
| s11 | Model settings: model, temperature, maximum tokens, maximum iterations |
| s12 | Execution Trail, History, Evaluations, publish and deploy |
| s13 | The twelve-step checklist, then the call to action |

`src/scenes/sN.html` / `sN.js` hold each scene. Animations are anchored to spoken words with
`K("lineId", "word")` (a pop-in lands 0.12 s before the word); `validate_cues.mjs` fails the build if an anchor names a
word that is not in that line. Changing the script re-times the whole video.

## Sync

`voice.py` only estimates word times (about 0.2-0.6 s off in places), which made visuals appear early or late.
`scripts/align_words.py` transcribes each line with a CTC model that reports a time per token (sherpa-onnx NeMo
conformer-small, 76 MB, in `$CTC_DIR`, default `~/.cache/sherpa-ctc`) and writes the measured word starts back. A
60-word spot check (transcribing a window cut at each word's time) found 58/60 words at their measured time, against
33/60 with the estimates.

## Content and sources

- **Source of truth:** the script supplied with the request. Nothing was checked against UiPath's own pages, so
  product names and behaviour (for example episodic and escalation memory, Memory Spaces, Context Grounding, the
  Execution Trail) are narrated exactly as the script states them. Check them against the current documentation.
- **Illustrations are not UiPath UI.** Every screen is a generic illustration made for this explainer. No UiPath
  logo, screenshots or product images are used. The characters (Sam, Byte) are fictional.
- The closing line asks viewers to save "the Agent Builder cheat sheet"; the video does not include one.
- The narration is a synthetic (text-to-speech) voice.

## Voice and length

Kokoro `af_heart`, speed 1.0, 0.25 s between lines (about 164 words per minute, 11:46). The script's own
timestamps add up to 10:40; at a natural pace the 1,748 words run longer, and speeding up to match would have
meant roughly 185 wpm. Twenty-two long sentences are split at a comma (`gap` 0.15) so each caption stays within two
lines. `MCP`, `LLM`, `HR` and `ID` are respelled for the voice only, and `Treesa` is spoken "Tree suh"; the
captions show the original text.

Not verifiable by the author: how the voice sounds and how the animation feels in motion. Both were checked from
measurements and still frames, not by watching or listening.

## Measured on the final file (`uipath-agent-builder-guide.mp4`)

| Check | Result |
| --- | --- |
| Format | 1920x1080, 30 fps, H.264 + AAC, 11:46, 29.4 MiB (CRF 35) |
| `hyperframes check` | 0 errors; 110/110 text contrast checks pass WCAG AA |
| Visual review | snapshots of every scene, several per scene, viewed and fixed |
| Loudness | -14.5 LUFS integrated, true peak -1.2 dBFS |
| Whisper on the final MP4 audio (voice + music) | 99.4% of words understood; the flags are the channel name ("Treesa" heard as "Teresa"/"Trisa") and a UK/US spelling |

`scripts/finalize.mjs` raises the child-process buffer so loudness measurement works on videos longer than about
ten minutes (the default 1 MB buffer truncated ffmpeg's log).
