#!/usr/bin/env python3
"""Generate the voiceover for the closures video and the timeline that drives it.

    pip install espeakng-loader
    python3 scripts/voice.py

Reads  narration.json
Writes assets/vo/<line>.wav   one clip per sentence
       assets/voiceover.wav   the assembled, silence-padded track
       timing.json            scene/line start times + per-word caption timings

Engine note: this uses espeak-ng because it is the only speech engine that could
be installed offline in the authoring sandbox. Whisper is a speech-to-TEXT
model, so it cannot generate a voice. To use a nicer TTS (Kokoro, Piper, a
cloud voice ...), replace `synthesize()` so that it returns
(samples: list[int16], sample_rate: int, word_starts_ms: list[int] | None);
everything downstream (timing, captions, video) re-times itself automatically.
"""
import ctypes
import json
import re
import struct
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VO_DIR = ROOT / "assets" / "vo"
VO_DIR.mkdir(parents=True, exist_ok=True)

VOICE = "en-us"
RATE_WPM = 138      # slower than conversational, for a "slow and easy" pace
PITCH = 46          # 0-99
LINE_GAP = 0.6      # seconds of silence between sentences
SCENE_LEAD = 1.3    # silence at the start of each scene (titles animate in)
SCENE_TAIL = 0.9    # silence at the end of each scene
INTRO = 0.6
OUTRO = 2.0


# --------------------------------------------------------------------------
# espeak-ng via ctypes
# --------------------------------------------------------------------------
class EspeakEvent(ctypes.Structure):
    _fields_ = [
        ("type", ctypes.c_int),
        ("unique_identifier", ctypes.c_uint),
        ("text_position", ctypes.c_int),
        ("length", ctypes.c_int),
        ("audio_position", ctypes.c_int),
        ("sample", ctypes.c_int),
        ("user_data", ctypes.c_void_p),
        ("id", ctypes.c_char * 8),
    ]


SYNTH_CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.POINTER(EspeakEvent))
EVENT_LIST_TERMINATED, EVENT_WORD = 0, 1

_lib = None
_samples: list = []
_events: list = []


def _callback(wav, numsamples, events):
    if wav and numsamples > 0:
        _samples.extend(wav[i] for i in range(numsamples))
    i = 0
    while events and events[i].type != EVENT_LIST_TERMINATED:
        e = events[i]
        if e.type == EVENT_WORD:
            _events.append((e.text_position, e.audio_position))
        i += 1
    return 0


_cb_ref = SYNTH_CB(_callback)


def _init():
    global _lib
    if _lib:
        return
    import espeakng_loader

    _lib = ctypes.CDLL(espeakng_loader.get_library_path())
    _lib.espeak_Initialize.restype = ctypes.c_int
    rate = _lib.espeak_Initialize(2, 0, espeakng_loader.get_data_path().encode(), 0)  # 2 = synchronous
    if rate <= 0:
        raise RuntimeError("espeak_Initialize failed")
    _lib.espeak_SetSynthCallback(_cb_ref)
    if _lib.espeak_SetVoiceByName(VOICE.encode()) != 0:
        raise RuntimeError(f"voice {VOICE} not found")
    _lib.espeak_SetParameter(1, RATE_WPM, 0)   # rate
    _lib.espeak_SetParameter(3, PITCH, 0)      # pitch
    _lib.espeak_SetParameter(4, 55, 0)         # pitch range (a little more expressive)
    _lib.espeak_SetParameter(2, 110, 0)        # volume (headroom; loudness is normalised later)
    _lib.espeak_SetParameter(7, 4, 0)          # extra word gap (10 ms units) for clarity
    _lib.sample_rate = rate


def synthesize(say: str):
    """Return (int16 samples, sample_rate, [(char_position, ms), ...])."""
    _init()
    _samples.clear()
    _events.clear()
    data = say.encode("utf-8") + b"\0"
    err = _lib.espeak_Synth(data, len(data), 0, 1, 0, 1, None, None)  # chars, UTF-8
    if err != 0:
        raise RuntimeError(f"espeak_Synth error {err}")
    _lib.espeak_Synchronize()
    return list(_samples), _lib.sample_rate, list(_events)


# --------------------------------------------------------------------------
# narration markup:  "call [makeCounter|make counter] once"
# --------------------------------------------------------------------------
TOKEN = re.compile(r"\[([^|\]]+)\|([^\]]+)\]|(\S+)")


def parse(text: str):
    """-> (say string, tokens=[{show, char_start}]) where char_start indexes `say`."""
    say_parts, tokens, pos = [], [], 0
    for m in TOKEN.finditer(text):
        show, spoken = (m.group(1), m.group(2)) if m.group(1) else (m.group(3), m.group(3))
        if say_parts:
            pos += 1  # the joining space
        # espeak reports 1-based text positions
        tokens.append({"show": show, "char_start": pos + 1})
        say_parts.append(spoken)
        pos += len(spoken)
    return " ".join(say_parts), tokens


def word_times(tokens, events, dur_ms):
    """Map espeak word events onto display tokens (start ms of each)."""
    starts = []
    for i, tok in enumerate(tokens):
        nxt = tokens[i + 1]["char_start"] if i + 1 < len(tokens) else 10**9
        hit = [ms for pos, ms in events if tok["char_start"] <= pos < nxt]
        starts.append(min(hit) if hit else None)
    # fill any gaps by interpolation so captions never stall
    known = [(i, s) for i, s in enumerate(starts) if s is not None]
    if not known:
        return [round(dur_ms * i / len(tokens)) for i in range(len(tokens))]
    for i, s in enumerate(starts):
        if s is None:
            prev = max((k for k in known if k[0] < i), default=(0, 0))
            nxt = min((k for k in known if k[0] > i), default=(len(tokens), dur_ms))
            span = max(nxt[0] - prev[0], 1)
            starts[i] = round(prev[1] + (nxt[1] - prev[1]) * (i - prev[0]) / span)
    return starts


def write_wav(path: Path, samples, rate):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(struct.pack("<%dh" % len(samples), *samples))


def main():
    narration = json.loads((ROOT / "narration.json").read_text())
    clips = {}   # line id -> dict
    rate = None
    for scene in narration["scenes"]:
        for line in scene["lines"]:
            say, tokens = parse(line["text"])
            samples, rate, events = synthesize(say)
            # trim leading/trailing near-silence so timing is tight
            thr = 300
            a = next((i for i, s in enumerate(samples) if abs(s) > thr), 0)
            b = len(samples) - next((i for i, s in enumerate(reversed(samples)) if abs(s) > thr), 0)
            a = max(0, a - int(rate * 0.03))
            b = min(len(samples), b + int(rate * 0.06))
            trimmed = samples[a:b]
            shift_ms = a * 1000 / rate
            dur = len(trimmed) / rate
            starts = word_times(tokens, events, dur * 1000 + shift_ms)
            starts = [max(0, s - shift_ms) for s in starts]
            write_wav(VO_DIR / f"{line['id']}.wav", trimmed, rate)
            clips[line["id"]] = {"samples": trimmed, "dur": dur, "tokens": tokens, "starts": starts}
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
    total_samples = int(timing["total"] * rate)
    track = [0] * total_samples
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
