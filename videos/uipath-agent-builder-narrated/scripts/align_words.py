#!/usr/bin/env python3
"""Replace the estimated word times in timing.json with times measured from the voice track.

  python3 scripts/align_words.py            # run after voice.py, before build.mjs

voice.py spreads each line's words over its duration by word length (anchored at detected pauses), which is
good to ~0.2 s. This pass transcribes every line with a CTC speech model that reports a time per token,
matches that letter stream to the line's text, and writes the measured start of every word back into
timing.json. Animation cues and caption highlights then follow the voice, not an estimate.

Model (sherpa-onnx, NeMo CTC English, 76 MB) -> $CTC_DIR (default ~/.cache/sherpa-ctc):
  github.com/k2-fsa/sherpa-onnx  release asr-models  -> sherpa-onnx-nemo-ctc-en-conformer-small.tar.bz2
"""
import difflib, json, os, re, subprocess, sys
from pathlib import Path

import numpy as np
import sherpa_onnx

ROOT = Path(__file__).resolve().parent.parent
CTC = Path(os.environ.get("CTC_DIR", Path.home() / ".cache/sherpa-ctc")) / "sherpa-onnx-nemo-ctc-en-conformer-small"
timing = json.loads((ROOT / "timing.json").read_text())
rec = sherpa_onnx.OfflineRecognizer.from_nemo_ctc(
    model=str(CTC / "model.int8.onnx"), tokens=str(CTC / "tokens.txt"), num_threads=4, decoding_method="greedy_search")

PAD = 0.15
letters = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())
stats = []
for lid, line in timing["lines"].items():
    t0 = max(0.0, line["start"] - PAD)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t0:.3f}", "-t", f"{line['dur'] + 2 * PAD:.3f}", "-i", str(ROOT / "assets/voiceover.wav"),
                          "-ar", "16000", "-ac", "1", "-f", "f32le", "-"], capture_output=True).stdout
    st = rec.create_stream()
    st.accept_waveform(16000, np.frombuffer(raw, dtype=np.float32))
    rec.decode_stream(st)
    res = st.result
    # hypothesis: one (char, time) per letter; letters inside a token are spread up to the next token's time
    hyp, times = "", []
    for k, (tok, ts) in enumerate(zip(res.tokens, res.timestamps)):
        nxt = res.timestamps[k + 1] if k + 1 < len(res.timestamps) else ts + 0.25
        chars = letters(tok)
        for j, c in enumerate(chars):
            hyp += c
            times.append(ts + (min(nxt - ts, 0.3)) * j / max(len(chars), 1))
    # reference: the line's words, letters only
    words = line["words"]
    ref, owner = "", []
    for i, w in enumerate(words):
        for c in letters(w["w"]):
            ref += c
            owner.append(i)
    first = {}
    for a, b, n in difflib.SequenceMatcher(a=ref, b=hyp, autojunk=False).get_matching_blocks():
        for k in range(n):
            first.setdefault(owner[a + k], times[b + k] - PAD + (line["start"] - t0 - PAD) * 0)   # time within the line
    old = [w["t"] for w in words]
    new = [first.get(i) for i in range(len(words))]
    # words without a matching letter: interpolate between neighbours (keep the old estimate's spacing)
    for i in range(len(words)):
        if new[i] is None:
            lo = next((j for j in range(i - 1, -1, -1) if new[j] is not None), None)
            hi = next((j for j in range(i + 1, len(words)) if new[j] is not None), None)
            a = new[lo] if lo is not None else 0.0
            b = new[hi] if hi is not None else line["dur"]
            la = old[lo] if lo is not None else 0.0
            lb = old[hi] if hi is not None else line["dur"]
            new[i] = a + (b - a) * ((old[i] - la) / (lb - la) if lb > la else 0.5)
    for i in range(1, len(new)):                         # keep strictly increasing
        new[i] = max(new[i], new[i - 1] + 0.02)
    new[0] = max(0.0, min(new[0], 0.4))
    stats.append(float(np.mean([abs(n - o) for n, o in zip(new, old)])))
    for w, n in zip(words, new):
        w["t"] = round(n, 3)
(ROOT / "timing.json").write_text(json.dumps(timing, indent=2))
print(f"aligned {len(stats)} lines; mean |change| {np.mean(stats):.3f}s, worst line {np.max(stats):.3f}s")
