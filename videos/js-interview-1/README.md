# JavaScript Demystified: Interview Questions #1

A ~6 minute narrated explainer built with [HyperFrames](https://hyperframes.heygen.com).
Everything (script, voice, music, timing, visuals) is generated from source.

```
# one-time: runtimes + models (model files come from GitHub releases)
pip install kokoro-onnx onnxruntime soundfile espeakng-loader sherpa-onnx
#   Kokoro:  github.com/thewh1teagle/kokoro-onnx  release model-files-v1.0
#            -> kokoro-v1.0.onnx + voices-v1.0.bin into $KOKORO_DIR (default ~/.cache/kokoro)
#   Whisper: github.com/k2-fsa/sherpa-onnx  release asr-models
#            -> sherpa-onnx-whisper-base.en.tar.bz2, extract to $WHISPER_DIR

python3 scripts/voice.py        # narration.json -> voiceover + timing.json (Kokoro; ~7 min on 4 CPUs)
python3 scripts/verify_voice.py # Whisper transcribes every line and flags mispronunciations
node scripts/make-music.mjs     # original music, sized to the video
node scripts/build.mjs          # master audio, fill src/template.html -> index.html
npx hyperframes check
npx hyperframes render -f 30 -q standard -o rendered.mp4
node scripts/finalize.mjs rendered.mp4 js-closures-explainer.mp4   # compress + restore loudness
```

- `narration.json` is the script. `[shown|spoken]` gives a caption spelling and a
  pronunciation. `after` adds silence for the "what will this print?" countdown.
- `scripts/assemble_template.py` + `scripts/timeline_scenes.js` generate `src/template.html`
  (scenes and animation). Every cue is tied to the voice timing (`L("lineId")`,
  `W("lineId", wordIndex)`), so changing the script or the voice re-times the whole video.
- **Voice:** Kokoro (`am_michael`, speed 0.85). Whisper is used only to check the voice
  (`scripts/verify_voice.py`), since it is speech-to-text.
- Fonts have ligatures disabled on purpose, so `===` is never drawn as one glyph.
- Voice is mastered to about -14.5 LUFS, music to -28 LUFS. `finalize.mjs` restores the level after rendering.

## Sources
The four questions come from https://github.com/sudheerj/javascript-interview-questions
(#9 `==` vs `===`, #19/#22 `var` vs `let` and the Temporal Dead Zone, #3 `call`/`apply`/`bind`,
#65-#67 `Promise.all`/`Promise.race`). The explanations and code examples are written fresh
(and every output shown was run in Node); the repo has no license file, so nothing is copied verbatim.
