# JSInterviewByte — JavaScript interview questions as vertical shorts

One question per video, 1080×1920, about 1:40–2:20 each. Sam asks, Byte answers. Every concept is
explained with an animated diagram (two "machines" for `==`/`===`, scope boxes and backpacks for
closures, memory boxes and a pointer for the Temporal Dead Zone, receipts and an abort signal for
`Promise.all`, a function machine with a `this` slot for `call`/`apply`/`bind`). JS keywords
(`this`, `var`, `let`, `const`, `typeof`, `true`, `null`, ...) are stressed in the voice and shown
as code chips in the captions.
Questions come from https://github.com/sudheerj/javascript-interview-questions
(paraphrased); every answer and every output shown on screen was re-checked by running the
code in Node (`cases.json` → `tools/verify_cases.mjs`).

| # | Question | Source item | Verified |
|---|----------|-------------|----------|
| 01 | `==` vs `===` | #9 | 18 expressions |
| 02 | What is a closure | #28 | counter, loop, factory |
| 03 | Temporal Dead Zone | #22 | var/let/typeof/class/shadowing |
| 04 | Does `Promise.all` cancel the others | #66 | timers + AbortController |
| 05 | `call`, `apply`, `bind` | #3 | 8 scripts |

Where the source text was imprecise it was corrected, not copied:
- #66 says `Promise.all` "waits for all promises to settle". It rejects immediately on the first
  rejection (`allSettled` is the one that waits). The video says the former.
- #28's example prints `"Welcome  John"` (two spaces, from a trailing space in the argument);
  the video uses its own counter / adder examples.

## Layout
- `tools/` shared pipeline (voice, music, build, verify). `engine/` vertical composition engine.
- `qNN-*/script.md` narration (`SAM:`/`BYTE:`), `cases.json` verified snippets, `spec.js` the
  animation script (cues come from the voice timing), `meta.json`.

## Build one video
```bash
cd videos/jsinterviewbyte/q01-loose-vs-strict
export VID=$PWD KOKORO_DIR=... WHISPER_DIR=... SEED=101   # ffmpeg on PATH
node ../tools/verify_cases.mjs            # run the code, compare with what the video shows
python3 ../tools/script_to_narration.py      # markup: {keyword}, [shown|spoken|c] = code word
python3 ../tools/voice.py                  # Kokoro voices -> timing.json
python3 ../tools/verify_voice.py           # Whisper check
node ../tools/make-music.mjs && node ../tools/build.mjs   # index.html
npx hyperframes check
npx hyperframes render -f 30 -q standard -o rendered.mp4
node ../tools/finalize.mjs rendered.mp4 final.mp4 26      # loudness -14.5 LUFS
```

## Landscape episodes (`landscape-1/`)
Landscape 1920×1080, several questions in one video (built with `ENGINE=engine-landscape`).
Episode 1 (new questions, not in the vertical set): higher-order functions (#13), currying (#15),
event flow / capturing / bubbling / delegation (#87–89, #111), memoization (#25).
Code outputs are verified by `tools/verify_cases.mjs`; the browser behaviour (event order, phases,
`stopPropagation`, delegation) by `l3-event-flow/verify_browser.mjs` (Chromium), output in `verified.txt`.
Each part is rendered separately (intro, then one folder per question) and the finalized parts are
concatenated with ffmpeg.

## JWT explainer (`jwt-explainer/`)
Landscape, 4:26 (v2: one visual per sentence, reading pauses; voice at normal speed, built with LINE_GAP=0.4 SCENE_LEAD=0.7 SCENE_TAIL=0.4). Anatomy, flow, upsides, downsides, what not to do, what to do. Facts were checked
against search results quoting RFC 7519 (claims, structure), RFC 8725 (algorithm pinning, `none`,
key confusion, weak secrets, `iss`/`aud` validation), the OWASP cheat sheets (token storage, cookies,
revocation) and RFC 9700 (refresh-token rotation). `verify_jwt.mjs` reproduces every demonstrated
behaviour with `node:crypto` (tampering, expiry, audience/issuer, `alg: none`, RS256→HS256 key
confusion, a dictionary-cracked weak secret, token sizes, logout not invalidating a stateless token);
output in `verified.txt`. The "careless library" verifiers are minimal stand-ins for the attack classes
in RFC 8725, not real libraries (current libraries mostly reject these by default).

## Semantic HTML & landmarks (`semantic-html/`)
Landscape, 3:22. Research: WAI-ARIA landmark mappings (banner, navigation, main, complementary,
contentinfo, region, form, search), HTML `<search>` (all major browsers since Oct 2023), screen-reader
landmark keys (NVDA D, JAWS R, VoiceOver rotor), WebAIM Screen Reader Survey #10 (2024: 71.6% find
information via headings), the first rule of ARIA, and WCAG 1.3.1 / 2.4.1 / 4.1.2.
`verify_a11y.mjs` reads Chromium's accessibility tree (CDP `Accessibility.getFullAXTree`) and drives the
keyboard; `verified.txt` holds every role and behaviour shown: div soup is all `generic`; page-level
header/footer → banner/contentinfo but `sectionheader`/`sectionfooter` inside `<article>`; unnamed
`<section>`/`<form>` → generic, named → region/form; labelled input named "Email", unlabelled has no
name; `<div onclick>` skipped by Tab; `role=button tabindex=0` focusable but Enter/Space do nothing;
`<button>` fires on both.

## Browser storage (`browser-storage/`)
Landscape, 4:24. localStorage, sessionStorage, cookies, IndexedDB and the Cache API, then the shared
rules (per-origin, eviction + `navigator.storage.persist()`, scripts can read everything but HttpOnly
cookies) and a "which one" cheat sheet. `verify_storage.mjs` runs every claim in Chromium over
http://localhost; `verified.txt` holds the results: 42 → `"42"`, objects → `"[object Object]"`; the
`storage` event fires only in the other tab; sessionStorage survives reload but not a new tab;
QuotaExceededError at 5,177,571 characters; `document.cookie` hides the HttpOnly `sid` while the
server's Cookie header carries both; a 5,000-char cookie is dropped and a 4,000-byte one kept; IndexedDB
returns a real Date/Array/Blob and `put()` returns before the transaction completes; Cache API
`match()` returns the stored body.
Voice: `voice.py` has a Qwen3-TTS engine (`VOICE_ENGINE=qwen`, speakers via `QWEN_SPEAKERS`, style via
`QWEN_INSTRUCT_*`), which needs the Qwen3-TTS-12Hz-1.7B-CustomVoice weights in `$KOKORO_DIR/../qwen/`.
The current render uses Kokoro because huggingface.co was not reachable from the build environment.
