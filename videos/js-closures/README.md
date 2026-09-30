# JavaScript Demystified: Closures

A ~9 minute narrated explainer built with [HyperFrames](https://hyperframes.heygen.com).
Everything (script, voice, music, timing, visuals) is generated from source.

```
pip install espeakng-loader
python3 scripts/voice.py        # narration.json -> voiceover + timing.json
node scripts/make-music.mjs     # original music, sized to the video
node scripts/build.mjs          # master audio, fill src/template.html -> index.html
npx hyperframes check && npx hyperframes render -f 30 -q standard -o js-closures-explainer.mp4
```

- `narration.json` is the script. `[shown|spoken]` gives a caption spelling and a
  pronunciation. `after` adds silence for the "what prints?" countdowns.
- Every animation cue in `src/template.html` is tied to the voice timing
  (`L("lineId")`, `W("lineId", wordIndex)`), so changing the script or the voice
  re-times the whole video.
- **Voice engine:** espeak-ng, because it was the only engine available offline in the
  authoring sandbox. It is clear but robotic. To upgrade, replace `synthesize()` in
  `scripts/voice.py` (Kokoro, Piper, a cloud voice ...) and re-run the pipeline.
  Whisper is speech-to-text, so it cannot generate a voice; it could be used to
  verify or caption a voice track.
- Voice is mastered to about -14 LUFS, music to -28 LUFS (about 14 LU below the voice).
- Sources for the explanation: MDN Web Docs "Closures"; javascript.info "Variable scope, closure".
