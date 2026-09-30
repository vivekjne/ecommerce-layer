# JavaScript Demystified: Closures

A ~9 minute narrated explainer built with [HyperFrames](https://hyperframes.heygen.com).
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
  pronunciation. `after` adds silence for the "what prints?" countdowns.
- Every animation cue in `src/template.html` is tied to the voice timing
  (`L("lineId")`, `W("lineId", wordIndex)`), so changing the script or the voice
  re-times the whole video.
- **Voice:** Kokoro (`af_heart`, speed 0.75, about 135 wpm). Other voices: set `KOKORO_VOICE`
  (e.g. `af_bella`, `am_michael`, `bf_emma`) and `KOKORO_SPEED`. `VOICE_ENGINE=espeak` gives a
  robotic fallback with no model download. To use another TTS, replace `synth_kokoro()` in
  `scripts/voice.py`; timing, captions and animation re-time automatically.
  Whisper is speech-to-text, so it cannot generate a voice. `verify_voice.py` uses it to check
  the generated voice instead. Caption word timings for Kokoro are estimated from the audio.
- Voice is mastered to about -14.5 LUFS, music to -28 LUFS (about 14 LU below the voice).
  The renderer's final mix level is unpredictable, so `finalize.mjs` measures it and restores -14.5 LUFS.
- Sources for the explanation: MDN Web Docs "Closures"; javascript.info "Variable scope, closure".
