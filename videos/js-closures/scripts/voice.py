#!/usr/bin/env python3
"""Generate the voiceover for the closures video and the timeline that drives it.

    pip install kokoro-onnx onnxruntime soundfile espeakng-loader
    # Kokoro model files (GitHub release "model-files-v1.0" of thewh1teagle/kokoro-onnx):
    #   kokoro-v1.0.onnx, voices-v1.0.bin  -> put them in $KOKORO_DIR (default ~/.cache/kokoro)
    python3 scripts/voice.py

Reads  narration.json
Writes assets/vo/<line>.wav   one clip per sentence
       assets/voiceover.wav   the assembled, silence-padded track
       timing.json            scene/line start times + per-word caption timings

Engines (VOICE_ENGINE=kokoro|espeak, default kokoro when its model files exist):
  kokoro  natural-sounding neural voice (Kokoro-82M via ONNX). Word timings for the
          captions are estimated from the audio (weights + detected pauses).
  espeak  robotic, but needs no model download; gives exact word timings.

Tuning: KOKORO_VOICE (default af_heart), KOKORO_SPEED (default 0.75, lower = slower).
Whisper is speech-to-TEXT, so it cannot generate a voice; use scripts/verify_voice.py
to transcribe the result and catch mispronounced words.
"""
import ctypes
import hashlib
import json
import os
import re
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VO_DIR = ROOT / "assets" / "vo"
VO_DIR.mkdir(parents=True, exist_ok=True)

KOKORO_DIR = Path(os.environ.get("KOKORO_DIR", Path.home() / ".cache" / "kokoro"))
KOKORO_VOICE = os.environ.get("KOKORO_VOICE", "af_heart")
KOKORO_SPEED = float(os.environ.get("KOKORO_SPEED", "0.75"))
ENGINE = os.environ.get(
    "VOICE_ENGINE", "kokoro" if (KOKORO_DIR / "kokoro-v1.0.onnx").exists() else "espeak"
)

LINE_GAP = 0.6      # seconds of silence between sentences
SCENE_LEAD = 1.3    # silence at the start of each scene (titles animate in)
SCENE_TAIL = 0.9    # silence at the end of each scene
INTRO = 0.6
OUTRO = 2.0


# --------------------------------------------------------------------------
# narration markup:  "call [makeCounter|make counter] once"
# --------------------------------------------------------------------------
TOKEN = re.compile(r"\[([^|\]]+)\|([^\]]+)\]|(\S+)")


def parse(text: str):
    """-> (say string, tokens=[{show, spoken, char_start}]); char_start indexes `say` (1-based)."""
    say_parts, tokens, pos = [], [], 0
    for m in TOKEN.finditer(text):
        show, spoken = (m.group(1), m.group(2)) if m.group(1) else (m.group(3), m.group(3))
        if say_parts:
            pos += 1
        tokens.append({"show": show, "spoken": spoken, "char_start": pos + 1})
        say_parts.append(spoken)
        pos += len(spoken)
    return " ".join(say_parts), tokens


# --------------------------------------------------------------------------
# engine: kokoro
# --------------------------------------------------------------------------
_kokoro = None


def synth_kokoro(say: str):
    """-> (float32 samples in [-1, 1], sample_rate, None)"""
    global _kokoro
    if _kokoro is None:
        from kokoro_onnx import Kokoro

        _kokoro = Kokoro(str(KOKORO_DIR / "kokoro-v1.0.onnx"), str(KOKORO_DIR / "voices-v1.0.bin"))
    samples, sr = _kokoro.create(say, voice=KOKORO_VOICE, speed=KOKORO_SPEED, lang="en-us")
    return samples, sr, None


# --------------------------------------------------------------------------
# engine: espeak-ng (fallback)
# --------------------------------------------------------------------------
class EspeakEvent(ctypes.Structure):
    _fields_ = [("type", ctypes.c_int), ("unique_identifier", ctypes.c_uint), ("text_position", ctypes.c_int),
                ("length", ctypes.c_int), ("audio_position", ctypes.c_int), ("sample", ctypes.c_int),
                ("user_data", ctypes.c_void_p), ("id", ctypes.c_char * 8)]


SYNTH_CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.POINTER(EspeakEvent))
_lib = None
_es_samples: list = []
_es_events: list = []


def _es_callback(wav, numsamples, events):
    if wav and numsamples > 0:
        _es_samples.extend(wav[i] for i in range(numsamples))
    i = 0
    while events and events[i].type != 0:
        if events[i].type == 1:
            _es_events.append((events[i].text_position, events[i].audio_position))
        i += 1
    return 0


_es_cb_ref = SYNTH_CB(_es_callback)


def synth_espeak(say: str):
    """-> (float32 samples, sample_rate, [(char_position, ms), ...])"""
    global _lib
    import numpy as np

    if _lib is None:
        import espeakng_loader

        _lib = ctypes.CDLL(espeakng_loader.get_library_path())
        _lib.espeak_Initialize.restype = ctypes.c_int
        _lib.sample_rate = _lib.espeak_Initialize(2, 0, espeakng_loader.get_data_path().encode(), 0)
        _lib.espeak_SetSynthCallback(_es_cb_ref)
        _lib.espeak_SetVoiceByName(b"en-us")
        for param, val in ((1, 138), (3, 46), (4, 55), (2, 110), (7, 4)):  # rate, pitch, range, volume, word gap
            _lib.espeak_SetParameter(param, val, 0)
    _es_samples.clear()
    _es_events.clear()
    data = say.encode("utf-8") + b"\0"
    if _lib.espeak_Synth(data, len(data), 0, 1, 0, 1, None, None) != 0:
        raise RuntimeError("espeak_Synth failed")
    _lib.espeak_Synchronize()
    return np.array(_es_samples, dtype="float32") / 32768.0, _lib.sample_rate, list(_es_events)


# --------------------------------------------------------------------------
# word timings for captions
# --------------------------------------------------------------------------
def words_from_events(tokens, events, dur_ms):
    starts = []
    for i, tok in enumerate(tokens):
        nxt = tokens[i + 1]["char_start"] if i + 1 < len(tokens) else 10**9
        hit = [ms for pos, ms in events if tok["char_start"] <= pos < nxt]
        starts.append(min(hit) if hit else None)
    known = [(i, s) for i, s in enumerate(starts) if s is not None]
    if not known:
        return [round(dur_ms * i / len(tokens)) for i in range(len(tokens))]
    for i, s in enumerate(starts):
        if s is None:
            prev = max((k for k in known if k[0] < i), default=(0, 0))
            nxt = min((k for k in known if k[0] > i), default=(len(tokens), dur_ms))
            starts[i] = round(prev[1] + (nxt[1] - prev[1]) * (i - prev[0]) / max(nxt[0] - prev[0], 1))
    return starts


def words_from_audio(tokens, samples, sr):
    """Estimate word start times (ms) when the engine gives no timings.

    Words get weight ~ their length. Pauses detected in the audio are matched to the
    punctuation in the text, which anchors the proportional spread inside each clause.
    """
    import numpy as np

    n = len(tokens)
    dur = len(samples) / sr
    weights = [1.5 + len(re.sub(r"[^A-Za-z0-9]", "", t["spoken"])) for t in tokens]
    total = sum(weights)

    hop = int(sr * 0.01)
    frames = len(samples) // hop
    rms = np.sqrt((samples[: frames * hop].reshape(frames, hop) ** 2).mean(axis=1))
    thr = 0.06 * np.percentile(rms, 90)
    quiet = rms < thr
    gaps, i = [], 0
    while i < frames:
        if quiet[i]:
            j = i
            while j < frames and quiet[j]:
                j += 1
            if j - i >= 12 and i > 5 and j < frames - 5:   # >=120 ms, internal only
                gaps.append((i * 0.01, j * 0.01))
            i = j
        else:
            i += 1

    cum, run = [], 0.0
    for w in weights:
        run += w
        cum.append(run)
    boundaries = [i for i in range(n - 1) if re.search(r"[,.;:!?]$", tokens[i]["show"])]
    anchors, last = [], -1     # (token index after the pause, gap start, gap end)
    for b in boundaries:
        expect = cum[b] / total * dur
        cand = [(abs((g[0] + g[1]) / 2 - expect), gi) for gi, g in enumerate(gaps) if gi > last]
        if cand:
            err, gi = min(cand)
            if err < 0.18 * dur + 0.4:
                anchors.append((b + 1, gaps[gi][0], gaps[gi][1]))
                last = gi

    starts = [0.0] * n
    seg_starts = [(0, 0.0)] + [(a[0], a[2]) for a in anchors]      # (first token, time it starts)
    seg_ends = [a[1] for a in anchors] + [dur]
    for (first, t0), t1 in zip(seg_starts, seg_ends):
        nxt_first = next((a[0] for a in anchors if a[0] > first), n)
        idx = list(range(first, nxt_first))
        w = sum(weights[k] for k in idx)
        acc = 0.0
        for k in idx:
            starts[k] = t0 + (t1 - t0) * acc / w
            acc += weights[k]
    return [round(s * 1000) for s in starts]


# --------------------------------------------------------------------------
def write_wav(path: Path, samples_i16, rate):
    import numpy as np

    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(np.asarray(samples_i16, dtype="<i2").tobytes())


def main():
    import numpy as np

    narration = json.loads((ROOT / "narration.json").read_text())
    synth = synth_kokoro if ENGINE == "kokoro" else synth_espeak
    print(f"engine: {ENGINE}" + (f" voice={KOKORO_VOICE} speed={KOKORO_SPEED}" if ENGINE == "kokoro" else ""))
    clips, rate = {}, None
    for scene in narration["scenes"]:
        for line in scene["lines"]:
            say, tokens = parse(line["text"])
            key = hashlib.sha1(f"{ENGINE}|{KOKORO_VOICE}|{KOKORO_SPEED}|{say}".encode()).hexdigest()[:10]
            raw = VO_DIR / f"{line['id']}.{key}.npy"
            meta = VO_DIR / f"{line['id']}.{key}.json"
            if raw.exists() and meta.exists():
                samples = np.load(raw)
                m = json.loads(meta.read_text())
                rate, events = m["rate"], m["events"]
            else:
                samples, rate, events = synth(say)
                samples = np.asarray(samples, dtype="float32")
                np.save(raw, samples)
                meta.write_text(json.dumps({"rate": rate, "events": events}))
            # trim leading/trailing near-silence so timing is tight
            thr = 0.012
            loud = np.flatnonzero(np.abs(samples) > thr)
            a = max(0, (loud[0] if len(loud) else 0) - int(rate * 0.04))
            b = min(len(samples), (loud[-1] if len(loud) else len(samples)) + int(rate * 0.09))
            trimmed = samples[a:b]
            dur = len(trimmed) / rate
            if events is not None:
                shift = a * 1000 / rate
                starts = [max(0, s - shift) for s in words_from_events(tokens, events, dur * 1000 + shift)]
            else:
                starts = words_from_audio(tokens, trimmed, rate)
            i16 = np.clip(trimmed * 32767, -32768, 32767).astype("int16")
            write_wav(VO_DIR / f"{line['id']}.wav", i16, rate)
            clips[line["id"]] = {"samples": i16, "dur": dur, "tokens": tokens, "starts": starts}
            if len(line["text"]) > 110:
                print(f"warn: {line['id']} is {len(line['text'])} chars; captions may wrap to 3 lines")

    # ---- timeline ----
    timing = {"scenes": {}, "lines": {}, "total": 0}
    t = INTRO
    for scene in narration["scenes"]:
        s0 = t
        cur = t + SCENE_LEAD
        for line in scene["lines"]:
            c = clips[line["id"]]
            timing["lines"][line["id"]] = {
                "scene": scene["id"],
                "start": round(cur, 3),
                "dur": round(c["dur"], 3),
                "words": [{"w": tok["show"], "t": round(st / 1000, 3)} for tok, st in zip(c["tokens"], c["starts"])],
            }
            cur += c["dur"] + line.get("after", 0) + LINE_GAP
        end = cur - LINE_GAP + SCENE_TAIL
        timing["scenes"][scene["id"]] = {"start": round(s0, 3), "dur": round(end - s0, 3)}
        t = end
    timing["total"] = round(t + OUTRO, 3)

    # ---- assemble one voiceover track ----
    track = np.zeros(int(timing["total"] * rate), dtype="int16")
    for lid, info in timing["lines"].items():
        s = int(info["start"] * rate)
        data = clips[lid]["samples"]
        track[s : s + len(data)] = data
    write_wav(ROOT / "assets" / "voiceover.wav", track, rate)
    (ROOT / "timing.json").write_text(json.dumps(timing, indent=1))
    words = sum(len(v["words"]) for v in timing["lines"].values())
    speech = sum(v["dur"] for v in timing["lines"].values())
    print(f"{len(timing['lines'])} lines, {words} words, {speech:.0f}s of speech ({words / speech * 60:.0f} wpm), total {timing['total']:.1f}s")


if __name__ == "__main__":
    main()
