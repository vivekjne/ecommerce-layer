#!/usr/bin/env python3
"""SCRIPT.md (spoken form) -> narration.json (markup for voice.py + captions).

Each "SPEAKER: text" line becomes one narration line. Spoken jargon such as "routes dot t s" is
turned into [routes.ts|routes dot t s] so captions show code and the voice says it naturally.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPT = (ROOT.parent / "SCRIPT.md").read_text()

VOICES = {"BYTE": ("byte", "am_michael"), "SAM": ("sam", "af_nova"), "MALLORY": ("mallory", "bm_george"), "GUARD": ("guard", "am_onyx")}

# (spoken regex, shown) - longest first; the spoken text is kept as matched
TERMS = [
    ("react router dot config dot t s", "react-router.config.ts"),
    ("app routes dot t s", "app/routes.ts"),
    ("routes dot t s", "routes.ts"),
    ("root dot t s x", "root.tsx"),
    ("sessions dot server", "sessions.server"),
    ("dot server", ".server"),
    ("create react router", "create-react-router"),
    ("react router serve", "react-router-serve"),
    ("fetcher dot form data", "fetcher.formData"),
    ("fetcher dot Form", "fetcher.Form"),
    ("fetcher dot state", "fetcher.state"),
    ("fetcher dot data", "fetcher.data"),
    ("fetcher dot load", "fetcher.load"),
    ("navigation dot state", "navigation.state"),
    ("navigation dot form data", "navigation.formData"),
    ("request dot form data", "request.formData"),
    ("request dot url", "request.url"),
    ("response dot ok", "response.ok"),
    ("params dot slug", "params.slug"),
    ("Promise dot all", "Promise.all"),
    ("create cookie session storage", "createCookieSessionStorage"),
    ("use route loader data", "useRouteLoaderData"),
    ("use fetchers", "useFetchers"),
    ("use fetcher", "useFetcher"),
    ("use navigation", "useNavigation"),
    ("use navigate", "useNavigate"),
    ("use matches", "useMatches"),
    ("use effect", "useEffect"),
    ("is route error response", "isRouteErrorResponse"),
    ("create context", "createContext"),
    ("create routes stub", "createRoutesStub"),
    ("get session", "getSession"),
    ("commit session", "commitSession"),
    ("destroy session", "destroySession"),
    ("default should revalidate false", "defaultShouldRevalidate={false}"),
    ("default should revalidate", "defaultShouldRevalidate"),
    ("should revalidate", "shouldRevalidate"),
    ("stream timeout", "streamTimeout"),
    ("hydrate fallback", "HydrateFallback"),
    ("client loader", "clientLoader"),
    ("client action", "clientAction"),
    ("reload document", "reloadDocument"),
    ("plus types", "+types"),
    ("fs routes", "fs-routes"),
    ("form data", "formData"),
    ("set cookie", "Set-Cookie"),
    ("ssr true", "ssr: true"),
    ("ssr to false", "ssr: false"),
    ("four oh four", "404"),
    ("four hundred", "400"),
    ("loader data", "loaderData"),
    ("action data", "actionData"),
    ("error boundary", "ErrorBoundary"),
]
SPELLED = [
    (r"\bhtml\b", "HTML", "H T M L"),
    (r"\bjson\b", "JSON", "jay son"),
    (r"\bAPI\b", "API", "A P I"),
    (r"\bapi\b", "API", "A P I"),
    (r"\burls\b", "URLs", "U R Ls"),
    (r"\burl\b", "URL", "U R L"),
    (r"\bCORS\b", "CORS", "cores"),
    (r"\bui\b", "UI", "U I"),
    (r"\bssr\b", "SSR", "S S R"),
    (r"\bt s\b", "TS", "T S"),
]
# ErrorBoundary / loaderData etc. only become code in these specific phrases; elsewhere prose stays plain
CODE_ONLY_IN = {"error boundary": ["Export error boundary", "export error boundary"], "loader data": ["loader data prop", "Loader data"], "action data": ["action data"]}


def convert(text: str) -> str:
    placeholders = []

    def stash(shown, spoken):
        placeholders.append(f"[{shown}|{spoken}]")
        return f"\u0001{len(placeholders) - 1}\u0002"

    for spoken, shown in TERMS:
        if spoken in CODE_ONLY_IN and not any(p in text for p in CODE_ONLY_IN[spoken]):
            continue
        text = re.sub(re.escape(spoken), lambda m: stash(shown, m.group(0)), text, flags=re.I if spoken[0].islower() and spoken not in ("fetcher dot Form",) else 0)
    for pat, shown, spoken in SPELLED:
        text = re.sub(pat, lambda m: stash(shown, spoken), text)
    return re.sub("\u0001(\\d+)\u0002", lambda m: placeholders[int(m.group(1))], text)


AFTER = {}          # line id -> seconds of silence after (demo holds), filled from SCRIPT.md "~2.0" suffixes
scenes = []
cur = None
for raw in SCRIPT.splitlines():
    h = re.match(r"^## (\d+)\. (.*?)(?: \(|$)", raw)
    if h:
        cur = {"id": f"s{h.group(1)}", "title": h.group(2).strip(), "lines": []}
        scenes.append(cur)
        continue
    m = re.match(r"^(BYTE|SAM|MALLORY|GUARD): (.*?)(?: ~([\d.]+))?$", raw)
    if m and cur is not None:
        speaker, voice = VOICES[m.group(1)]
        lid = f"{cur['id']}{chr(97 + len(cur['lines'])) if len(cur['lines']) < 26 else chr(65 + len(cur['lines']) - 26)}"
        line = {"id": lid, "speaker": speaker, "voice": voice, "text": convert(m.group(2))}
        if m.group(3):
            line["after"] = float(m.group(3))
        cur["lines"].append(line)

out = {"_notes": "generated by scripts/script_to_narration.py from ../SCRIPT.md", "scenes": scenes}
(ROOT / "narration.json").write_text(json.dumps(out, indent=1, ensure_ascii=False))
n = sum(len(s["lines"]) for s in scenes)
words = sum(len(re.sub(r"\[[^|\]]+\|([^\]]+)\]", r"\1", l["text"]).split()) for s in scenes for l in s["lines"])
print(f"{len(scenes)} scenes, {n} lines, {words} spoken words")
