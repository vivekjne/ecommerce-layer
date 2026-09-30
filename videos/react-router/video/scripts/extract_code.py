#!/usr/bin/env python3
"""Extracts the code shown in the video from the real Nova Market app -> codes.json.

Each snippet is one or more contiguous ranges of a real file. A range starts at the first line
matching `start` (a regex) and ends after `count` lines, or at the first later line matching `end`
(inclusive). Ranges of one snippet are joined with a "// ..." line. `lit` snippets are literal text
(shell commands and the like) and are marked as such.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT.parent / "nova-market"

def rng(file, start, end=None, count=None):
    return {"file": file, "start": start, "end": end, "count": count if (count or end) else 1}

SNIPPETS = {
    "root-layout": [rng("app/root.tsx", r"^export function Layout", end=r"^}$")],
    "root-loader": [rng("app/root.tsx", r"^export async function loader", end=r"^}$")],
    "routes-a": [rng("app/routes.ts", r"^export default", end=r'route\("cart"'), rng("app/routes.ts", r"^\] satisfies", count=1)],
    "routes-b": [rng("app/routes.ts", r"\.\.\.prefix", end=r"^    \]\),")],
    "routes-c": [rng("app/routes.ts", r'route\("\*"'), rng("app/routes.ts", r"// resource routes", end=r'route\("search"')],
    "types": [
        rng("app/routes/product.tsx", r"^import type \{ Route \}", count=1),
        rng("app/routes/product.tsx", r"^export async function loader", count=1),
        rng("app/routes/product.tsx", r"^export default function ProductPage", count=4),
    ],
    "products-loader": [rng("app/routes/products.tsx", r"^export async function loader", end=r"^}$")],
    "products-form": [rng("app/routes/products.tsx", r"<Form method=\"get\"", end=r"</Form>")],
    "product-loader": [rng("app/routes/product.tsx", r"^export async function loader", end=r"^}$")],
    "db-server": [rng("app/db.server.ts", r"^export const users", end=r"^}$")],
    "nav": [
        rng("app/routes/shop-layout.tsx", r"const link = ", end=r'^\s+: "text-slate'),
        rng("app/routes/shop-layout.tsx", r"<nav className=\"flex gap-1\">", end=r"</nav>"),
    ],
    "progress": [rng("app/routes/shop-layout.tsx", r"const navigation = useNavigation", count=1), rng("app/routes/shop-layout.tsx", r"const isNavigating", count=1), rng("app/routes/shop-layout.tsx", r"\{isNavigating &&", count=1)],
    "checkout-validate": [rng("app/routes/checkout.tsx", r"^export async function action", end=r"^  }$", ), ],
    "checkout-create": [rng("app/routes/checkout.tsx", r"session.set\(\"cart\", \{\}\)", end=r"^}$")],
    "checkout-ui": [
        rng("app/routes/checkout.tsx", r"^export default function Checkout", count=5),
        rng("app/routes/checkout.tsx", r"<Form method=\"post\"", count=7),
        rng("app/routes/checkout.tsx", r"^        <button$", count=6),
    ],
    "sessions": [rng("app/sessions.server.ts", r"^export const \{ getSession", end=r"^  \}\);")],
    "cart-action": [rng("app/routes/cart.tsx", r"^export async function action", count=9), rng("app/routes/cart.tsx", r"session\.set\(\"cart\"", count=2)],
    "add-to-cart": [
        rng("app/components/add-to-cart.tsx", r"const fetcher", count=4),
        rng("app/components/add-to-cart.tsx", r"<fetcher.Form", count=4),
        rng("app/components/add-to-cart.tsx", r"\{fetcher.data &&", count=1),
    ],
    "cart-line": [rng("app/routes/cart.tsx", r"const fetcher = useFetcher", count=5)],
    "search-box": [
        rng("app/components/search-box.tsx", r"const fetcher", count=1),
        rng("app/components/search-box.tsx", r"onChange=", count=1),
        rng("app/components/search-box.tsx", r"\{fetcher.data &&", count=1),
    ],
    "pending-fetchers": [rng("app/routes/shop-layout.tsx", r"// fetchers that are adding", count=2)],
    "should-revalidate": [rng("app/routes/home.tsx", r"^// cart changes", end=r"^}$")],
    "suspense": [rng("app/routes/product.tsx", r"<Suspense", end=r"</Suspense>")],
    "product-error": [rng("app/routes/product.tsx", r"^// the layout and header stay", end=r"^}$")],
    "root-error": [rng("app/root.tsx", r"^export function ErrorBoundary", count=8)],
    "middleware": [rng("app/routes/account-layout.tsx", r"^// runs before every", end=r"^export const middleware"), rng("app/routes/account-layout.tsx", r"^export async function loader", end=r"^}$")],
    "logging": [rng("app/root.tsx", r"^// Runs on the server", end=r"^export const middleware")],
    "client-loader": [rng("app/routes/home.tsx", r"^// runs in the browser", end=r"^}$"), rng("app/routes/home.tsx", r"^clientLoader.hydrate", count=1), rng("app/routes/home.tsx", r"^export function HydrateFallback", end=r"^}$")],
    "resource-search": [rng("app/routes/search.ts", r"^// no default export", end=r"^}$")],
    "resource-invoice": [rng("app/routes/invoice.ts", r"^export async function loader", end=r"^}$")],
    "resource-webhook": [rng("app/routes/webhook.ts", r"^// POST, PUT", end=r"^}$")],
    "meta": [rng("app/routes/product.tsx", r"<title>", count=2)],
    "headers": [rng("app/routes/products.tsx", r"^export function headers", end=r"^}$"), rng("app/routes/products.tsx", r"^export const handle", count=1)],
    "breadcrumbs": [rng("app/routes/shop-layout.tsx", r"// each route can describe", count=6)],
    "config": [rng("app/../react-router.config.ts", r"^export default", end=r"^}")],
}

LITERAL = {
    "create-cmd": "npx create-react-router@latest nova-market\ncd nova-market\nnpm install\nnpm run dev",
    "tree": "nova-market/\n├─ app/\n│  ├─ root.tsx\n│  ├─ routes.ts\n│  └─ routes/\n│     ├─ home.tsx\n│     ├─ products.tsx\n│     └─ product.tsx\n└─ react-router.config.ts",
    "build-cmd": "npm run build\nnpm start",
}


def strip_classes(text: str) -> str:
    """Display only: Tailwind class strings are collapsed to className="..." so panels stay readable."""
    out, i = [], 0
    while True:
        j = text.find("className=", i)
        if j < 0:
            out.append(text[i:])
            break
        out.append(text[i:j])
        k = j + len("className=")
        if text[k] == '"':
            e = text.index('"', k + 1) + 1
        else:  # className={ ... } with balanced braces
            depth, e = 0, k
            while True:
                depth += (text[e] == "{") - (text[e] == "}")
                e += 1
                if depth == 0:
                    break
        out.append('className="..."')
        i = e
    text = "".join(out)
    # long strings made only of Tailwind-like tokens are collapsed too
    return re.sub(r'"[a-z0-9:/\[\]\-. ]{22,}"', '"..."', text)


def extract(spec):
    out = []
    for r in spec:
        lines = (APP / r["file"]).read_text().splitlines()
        i = next((k for k, l in enumerate(lines) if re.search(r["start"], l)), None)
        if i is None:
            raise SystemExit(f"start not found: {r}")
        if r["count"]:
            j = i + r["count"]
        else:
            j = next((k for k in range(i, len(lines)) if re.search(r["end"], lines[k])), None)
            if j is None:
                raise SystemExit(f"end not found: {r}")
            j += 1
        chunk = lines[i:j]
        indent = min((len(l) - len(l.lstrip()) for l in chunk if l.strip()), default=0)
        out.append([l[indent:] for l in chunk])
    text = []
    for k, chunk in enumerate(out):
        if k:
            text.append("// ...")
        text.extend(chunk)
    return strip_classes("\n".join(text))


codes, failed = {}, []
for name, spec in SNIPPETS.items():
    try:
        codes[name] = extract(spec)
    except SystemExit as e:
        failed.append(f"{name}: {e}")
if failed:
    raise SystemExit("\n".join(failed))
codes.update(LITERAL)
(ROOT / "codes.json").write_text(json.dumps(codes, indent=1, ensure_ascii=False))
for name, text in codes.items():
    n = len(text.splitlines())
    w = max(len(l) for l in text.splitlines())
    print(f"{name:20s} {n:3d} lines, widest {w:3d} chars")
