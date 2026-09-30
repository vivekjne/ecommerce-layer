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
    "root-layout": [rng("app/root.tsx", r"^export function Layout", end=r"^      <head>"), rng("app/root.tsx", r"^        <Meta />", end=r"^}$")],
    "root-app": [rng("app/root.tsx", r"^export default function App", end=r"^}$")],
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
    "products-component": [rng("app/routes/products.tsx", r"^export default function Products", end=r"loaderData;")],
    "product-loader": [rng("app/routes/product.tsx", r"^export async function loader", end=r"^}$")],
    "db-server": [rng("app/db.server.ts", r"^export const users", end=r"^}$")],
    "nav": [
        rng("app/routes/shop-layout.tsx", r"const link = ", end=r'^\s+: "text-slate'),
        rng("app/routes/shop-layout.tsx", r"<nav className=\"flex gap-1\">", end=r"</nav>"),
    ],
    "progress": [rng("app/routes/shop-layout.tsx", r"const navigation = useNavigation", count=1), rng("app/routes/shop-layout.tsx", r"const isNavigating", count=1), rng("app/routes/shop-layout.tsx", r"\{isNavigating &&", count=1)],
    "cart-loader": [rng("app/routes/cart.tsx", r"// one request per cart line", count=10)],
    "root-data": [rng("app/routes/shop-layout.tsx", r"const root = useRouteLoaderData", count=1), rng("app/routes/shop-layout.tsx", r"\{\(root\?\.cartCount", count=1)],
    "checkout-guard": [rng("app/routes/checkout.tsx", r"^export async function loader", end=r"^}$")],
    "checkout-validate": [rng("app/routes/checkout.tsx", r"^export async function action", end=r"^  }$", ), ],
    "checkout-create": [rng("app/routes/checkout.tsx", r"session.set\(\"cart\", \{\}\)", end=r"^}$")],
    "checkout-ui": [
        rng("app/routes/checkout.tsx", r"^export default function Checkout", count=5),
        rng("app/routes/checkout.tsx", r"<Form method=\"post\"", count=7),
        rng("app/routes/checkout.tsx", r"^        <button$", count=6),
    ],
    "sessions": [rng("app/sessions.server.ts", r"^export const \{ getSession", end=r"^  \}\);")],
    "cart-action": [rng("app/routes/cart.tsx", r"^export async function action", count=5), rng("app/routes/cart.tsx", r"session\.set\(\"cart\", cart\)", end=r"^  \);")],
    "add-to-cart": [
        rng("app/components/add-to-cart.tsx", r"const fetcher", count=3),
        rng("app/components/add-to-cart.tsx", r"<fetcher.Form", end=r"</fetcher.Form>"),
    ],
    "cart-stock": [rng("app/routes/cart.tsx", r'if \(intent === "add"', end=r'^  \} else if \(intent === "decrease"')],
    "cart-line": [rng("app/routes/cart.tsx", r"^function nextQuantity", end=r"^}$"), rng("app/routes/cart.tsx", r"const fetcher = useFetcher", end=r'if \(intent === "remove"\)')],
    "search-box": [
        rng("app/components/search-box.tsx", r"const fetcher", end=r"^  }$"),
        rng("app/components/search-box.tsx", r"onChange=", count=1),
    ],
    "pending-fetchers": [rng("app/routes/shop-layout.tsx", r"// fetchers that are adding", count=2)],
    "should-revalidate": [rng("app/routes/home.tsx", r"^// cart changes", end=r"^}$")],
    "suspense": [rng("app/routes/product.tsx", r"<Suspense", end=r"</Suspense>")],
    "product-error": [rng("app/routes/product.tsx", r"^// the layout stays", end=r"^}$")],
    "root-error-a": [rng("app/root.tsx", r"^export function ErrorBoundary", end=r"^  }$")],
    "root-error-b": [rng("app/root.tsx", r"^  if \(error instanceof Error\)", end=r"^}$")],
    "middleware": [rng("app/routes/account-layout.tsx", r"^// runs before every", end=r"^export const middleware")],
    "middleware-loader": [rng("app/routes/account-layout.tsx", r"^export async function loader", end=r"^}$")],
    "context-def": [rng("app/context.ts", r"^export const userContext", count=1)],
    "logging": [rng("app/root.tsx", r"^// Runs on the server", end=r"^export const middleware")],
    "client-loader": [rng("app/routes/home.tsx", r"^// browser only", end=r"^}$"), rng("app/routes/home.tsx", r"^clientLoader.hydrate", count=1), rng("app/routes/home.tsx", r"^export function HydrateFallback", end=r"^}$")],
    "resource-search": [rng("app/routes/search.ts", r"^// no default export", end=r"^}$")],
    "resource-invoice": [rng("app/routes/invoice.ts", r"^export async function loader", end=r"^}$")],
    "resource-webhook": [rng("app/routes/webhook.ts", r"^// POST, PUT", end=r"^}$")],
    "meta": [rng("app/routes/product.tsx", r"<title>", count=2)],
    "headers": [rng("app/routes/products.tsx", r"^export function headers", end=r"^}$"), rng("app/routes/products.tsx", r"^export const handle", count=1)],
    "breadcrumbs": [rng("app/routes/shop-layout.tsx", r"// each route can describe", count=7)],
    "config": [rng("app/../react-router.config.ts", r"^export default", end=r"^}")],
}

LITERAL = {
    # a minimal example, as in the React Router docs
    "navigate": 'const navigate = useNavigate();\n\n// not a click: a timer ran out\nnavigate("/logout");',
    # from the React Router docs (file route conventions)
    "fs-routes": 'import { flatRoutes } from "@react-router/fs-routes";\n\nexport default [\n  route("/", "./home.tsx"),\n  ...(await flatRoutes()),\n] satisfies RouteConfig;',
    "create-cmd": "npx create-react-router@latest nova-market\ncd nova-market\nnpm install\nnpm run dev",
    "tree": "nova-market/\n├─ app/\n│  ├─ root.tsx\n│  ├─ routes.ts\n│  └─ routes/\n│     ├─ home.tsx\n│     ├─ products.tsx\n│     └─ product.tsx\n└─ react-router.config.ts",
    "build-cmd": "npm run build\nnpm start",
    # small examples in the style of the React Router docs
    "client-middleware": 'export const clientMiddleware = [\n  async ({ request }, next) => {\n    const start = performance.now();\n    await next(); // no Response is returned\n  },\n];',
    "meta-export": 'export function meta() {\n  return [\n    { title: "Nova Market" },\n    { name: "description", content: "Everyday things" },\n  ];\n}',
    "links-export": 'export function links() {\n  return [{ rel: "stylesheet", href: "/styles.css" }];\n}',
    "use-hook": 'function Reviews({ promise }: { promise: Promise<Review[]> }) {\n  const reviews = use(promise);\n  return <ReviewList reviews={reviews} />;\n}',
    "stream-timeout": '// app/entry.server.tsx\n// reject pending promises after 10 seconds\nexport const streamTimeout = 10_000;',
    "config-spa": 'export default {\n  ssr: false,\n} satisfies Config;',
    "testing": 'const Stub = createRoutesStub([\n  {\n    path: "/login",\n    Component: LoginForm,\n    action: () => ({ errors: { username: "Required" } }),\n  },\n]);\n\nrender(<Stub initialEntries={["/login"]} />);',
    "view-transition": '<ViewTransition>\n  <main>\n    <Outlet />\n  </main>\n</ViewTransition>',
    "client-action": 'export async function clientAction({\n  serverAction,\n}: Route.ClientActionArgs) {\n  localStorage.removeItem("recent");\n  return serverAction();\n}',
    "link-reload": '<Link reloadDocument to={`/invoices/${order.id}`}>\n  Download invoice\n</Link>',
    # call site (React Router docs: revalidation optimization)
    "call-site": '<Form\n  method="post"\n  action="/analytics"\n  defaultShouldRevalidate={false}\n>\n  <button>Track Click</button>\n</Form>',
    "revalidate": 'const revalidator = useRevalidator();\n\nuseEffect(() => {\n  const id = setInterval(() => revalidator.revalidate(), 10_000);\n  return () => clearInterval(id);\n}, [revalidator]);',
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
    # (only strings with a space in them, so file paths and URLs stay intact)
    return re.sub(r'"(?=[^"]* )[a-z0-9:/\[\]\-. ]{22,}"', '"..."', text)


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
