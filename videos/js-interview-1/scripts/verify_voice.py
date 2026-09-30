#!/usr/bin/env python3
"""Transcribe every generated voice line with Whisper and compare it to the script.

This is what Whisper is good for here: speech-to-text as a quality check. It flags
lines the model could not understand, which are usually mispronounced words
(fix them with the [shown|spoken] markup in narration.json).

    pip install sherpa-onnx numpy
    # Whisper model (GitHub release "asr-models" of k2-fsa/sherpa-onnx):
    #   sherpa-onnx-whisper-base.en.tar.bz2  -> extract into $WHISPER_DIR
    WHISPER_DIR=/path/to/sherpa-onnx-whisper-base.en python3 scripts/verify_voice.py [--all]

Needs ffmpeg on PATH. Prints the weakest lines (or all with --all) and the overall
word accuracy.
"""
import difflib
import json
import os
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
import sherpa_onnx

ROOT = Path(__file__).resolve().parent.parent
D = Path(os.environ.get("WHISPER_DIR", Path.home() / ".cache" / "whisper" / "sherpa-onnx-whisper-base.en"))
recognizer = sherpa_onnx.OfflineRecognizer.from_whisper(
    encoder=str(D / "base.en-encoder.int8.onnx"),
    decoder=str(D / "base.en-decoder.int8.onnx"),
    tokens=str(D / "base.en-tokens.txt"),
    language="en",
    task="transcribe",
    num_threads=4,
)
ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
ALIASES = {"eye": "i", "ok": "okay"}


def num_words(n: int):
    if n < 20:
        return [ONES[n]]
    if n < 100:
        return [TENS[n // 10]] + ([ONES[n % 10]] if n % 10 else [])
    if n < 1000:
        return [ONES[n // 100], "hundred"] + (num_words(n % 100) if n % 100 else [])
    return [str(n)]


def norm(text: str):
    t = text.lower().replace("-", " ")
    t = re.sub(r"\d+", lambda m: " ".join(num_words(int(m.group()))), t)
    return [ALIASES.get(w, w) for w in re.sub(r"[^a-z ]", "", t).split()]


def spoken(text: str):
    t = re.sub(r"\[([^|\]]+)\|([^\]]+)\]", r"\2", text)
    return t.replace("{", "").replace("}", "")


def transcribe(path: Path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-ar", "16000", "-ac", "1", "-f", "f32le", "-"],
                         capture_output=True).stdout
    stream = recognizer.create_stream()
    stream.accept_waveform(16000, np.frombuffer(raw, dtype=np.float32))
    recognizer.decode_stream(stream)
    return stream.result.text.strip()


def word_errors(ref, hyp):
    sm = difflib.SequenceMatcher(a=ref, b=hyp, autojunk=False)
    return len(ref) - sum(b.size for b in sm.get_matching_blocks())


def main():
    narration = json.loads((ROOT / "narration.json").read_text())
    rows, total_ref, total_err = [], 0, 0
    for scene in narration["scenes"]:
        for line in scene["lines"]:
            ref = norm(spoken(line["text"]))
            hyp_text = transcribe(ROOT / "assets" / "vo" / f"{line['id']}.wav")
            hyp = norm(hyp_text)
            # "make counter" vs "makecounter" etc: compare joined text too
            joined = difflib.SequenceMatcher(a="".join(ref), b="".join(hyp)).ratio()
            err = 0 if joined > 0.985 else word_errors(ref, hyp)
            total_ref += len(ref)
            total_err += err
            rows.append((err / max(len(ref), 1), line["id"], spoken(line["text"]), hyp_text))
    rows.sort(reverse=True)
    show = rows if "--all" in sys.argv else [r for r in rows if r[0] > 0]
    for wer, lid, ref, hyp in show:
        print(f"{lid:6} WER {wer:4.0%}\n   said : {ref}\n   heard: {hyp}")
    print(f"\n{len(rows)} lines, {total_ref} words, ~{100 * (1 - total_err / total_ref):.1f}% of words understood by Whisper")


if __name__ == "__main__":
    main()
