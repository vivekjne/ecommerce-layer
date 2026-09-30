
      // ---------- 9 · Actions ----------
      (function () {
        const sid = "s9";
        enter(sid);
        const a = codePanel(sid, "s9-a", { name: "app/routes/checkout.tsx", code: "checkout-validate", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 22 });
        const b = codePanel(sid, "s9-b", { name: "app/routes/checkout.tsx", code: "checkout-ui", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 21 });
        const c = codePanel(sid, "s9-c", { name: "app/routes/checkout.tsx", code: "checkout-create", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 22 });
        tl.set("#s9-b, #s9-c", { opacity: 0 }, 0);
        const w = browserWin(sid, "s9-w", { x: SPLIT.px, y: SPLIT.py, w: SPLIT.pw, frames: ["checkout-filled", "checkout-errors", "order", "checkout-pending"] });
        fade("#s9-a", L("s9a", 0.3), 0.6); hl(a.id, [1], W("s9a", 5), 3.0);
        // the Form
        show("#s9-w", W("s9b", 0), { s: 0.9, d: 0.8 }); w.frame("checkout-filled", W("s9b", 0) + 0.2);
        swap("#s9-a", "#s9-b", W("s9b", 0)); hl(b.id, [7], W("s9b", 2), 3.6);
        show(chip(sid, "s9-c1", { x: 1090, y: 790, html: "&lt;Form method=\"post\"&gt;", cls: "b", fs: 22 }), W("s9b", 2), { s: 0.6, d: 0.5 });
        show(arrowText(sid, "s9-c2", { x: 1372, y: 780, html: "→", fs: 36 }), W("s9b", 8), { s: 0.6, d: 0.4 });
        show(chip(sid, "s9-c3", { x: 1430, y: 790, html: "action({ request })", cls: "d", fs: 22 }), W("s9b", 8), { s: 0.6, d: 0.5 });
        // request.formData
        hide("#s9-c1, #s9-c2, #s9-c3", L("s9c", 0.1), 0.4);
        swap("#s9-b", "#s9-a", L("s9c", 0.0)); hl(a.id, [2], W("s9c", 3), 2.0); hl(a.id, [3, 4, 5], W("s9c", 5), 3.0);
        // Mallory submits an empty form
        cameo("#mal", "s9d");
        w.click("checkout-errors", L("s9d", 2.3), 1.0); w.frame("checkout-errors", L("s9d", 2.6), 0.35);
        // validate and return errors with a 400
        hl(a.id, [7, 8, 9, 10, 11, 12], W("s9e", 4), 3.6); hl(a.id, [13, 14, 15, 16, 17, 18], W("s9e", 10), 4.6);
        show(chip(sid, "s9-v1", { x: 1090, y: 790, html: "data({ errors }, { status: 400 })", cls: "f", fs: 24 }), W("s9e", 13), { s: 0.6, d: 0.5 });
        // actionData in the component
        hide("#s9-v1", L("s9f", 0.1), 0.4);
        swap("#s9-a", "#s9-b", L("s9f", 0.0)); hl(b.id, [2], W("s9f", 5), 2.0); hl(b.id, [11], W("s9f", 10), 3.6);
        // why 400: only successful responses revalidate
        show(chip(sid, "s9-h1", { x: 1090, y: 775, html: "2xx: loaders revalidate", cls: "e", fs: 24 }), W("s9h", 1), { s: 0.6, d: 0.5 });
        show(chip(sid, "s9-h2", { x: 1090, y: 835, html: "400: no reload needed", cls: "f", fs: 24 }), W("s9h", 6), { s: 0.6, d: 0.5 });
        // valid order: create it and redirect
        hide("#s9-h1, #s9-h2", L("s9i", 0.1), 0.4);
        swap("#s9-b", "#s9-c", L("s9i", 0.0)); hl(c.id, [2], W("s9i", 8), 2.6);
        w.frame("order", W("s9i", 10), 0.4);
        // pending UI
        swap("#s9-c", "#s9-b", L("s9j", 0.0)); w.frame("checkout-pending", W("s9j", 1), 0.4);
        hl(b.id, [4, 5], W("s9j", 4), 3.6); hl(b.id, [16, 19], W("s9j", 10), 2.6);
        // ?index
        hide("#s9-w", L("s9k", 0.2), 0.4);
        show(box(sid, "s9-i1", { x: 1090, y: 280, w: 660, cls: "c2", html: "/projects<small>action=\"/projects\" runs the parent route action</small>", style: "font-size:30px" }), W("s9k", 3), { s: 0.7, d: 0.5 });
        show(box(sid, "s9-i2", { x: 1090, y: 460, w: 660, cls: "c5", html: "/projects?index<small>runs the index route action</small>", style: "font-size:30px" }), W("s9k", 14), { s: 0.7, d: 0.5 });
        show(tag(sid, "s9-i3", { x: 1090, y: 640, html: "added for you inside an index route", cls: "cy", fs: 26 }), W("s9k", 19), { s: 0.7, d: 0.5 });
        leave(sid);
      })();

      // ---------- 10 · Sessions and cookies ----------
      (function () {
        const sid = "s10";
        enter(sid);
        const s1 = codePanel(sid, "s10-a", { name: "app/sessions.server.ts", code: "sessions", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 24 });
        const s2 = codePanel(sid, "s10-b", { name: "app/routes/cart.tsx (action)", code: "cart-action", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 24 });
        tl.set("#s10-a, #s10-b", { opacity: 0 }, 0);
        // browser <-> server lifelines
        const bb = box(sid, "s10-bb", { x: 1110, y: 240, w: 250, cls: "c1", html: "Browser", style: "font-size:30px;padding:12px" });
        const sb = box(sid, "s10-sb", { x: 1500, y: 240, w: 250, cls: "c2", html: "Server", style: "font-size:30px;padding:12px" });
        const lb = line(sid, "s10-lb", { x1: 1235, y1: 318, x2: 1235, y2: 790, dash: true, w: 4, color: "#5b66b8" });
        const ls = line(sid, "s10-ls", { x1: 1625, y1: 318, x2: 1625, y2: 790, dash: true, w: 4, color: "#5b66b8" });
        [bb, sb, lb, ls].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        show(bb, W("s10a", 7), { s: 0.7, d: 0.5 }); show(sb, W("s10a", 8), { s: 0.7, d: 0.5 }); drawLine(lb, W("s10a", 9), 0.7); drawLine(ls, W("s10a", 9), 0.7);
        fade("#s10-a", L("s10b", 0.3), 0.6);
        hl(s1.id, [1, 2], W("s10b", 0), 2.0); hl(s1.id, [4], W("s10b", 9), 1.6); hl(s1.id, [5], W("s10b", 11), 1.6); hl(s1.id, [6], W("s10b", 13), 1.6); hl(s1.id, [8], W("s10b", 17), 2.0);
        // read the cookie
        swap("#s10-a", "#s10-b", L("s10c", 0.0));
        hl(s2.id, [2, 3, 4], W("s10c", 5), 3.2);
        const a1 = line(sid, "s10-a1", { x1: 1250, y1: 410, x2: 1610, y2: 410, arrow: "ahC", w: 6, color: "#22d3ee" }); tl.set(a1, { opacity: 0 }, 0);
        drawLine(a1, W("s10c", 9)); show(chip(sid, "s10-l1", { x: 1300, y: 350, html: "request + Cookie", cls: "b", fs: 22 }), W("s10c", 9), { s: 0.7, d: 0.5 });
        // get, set, commit
        hl(s2.id, [5], W("s10d", 0), 1.6); hl(s2.id, [7], W("s10d", 4), 1.6); hl(s2.id, [10], W("s10d", 13), 2.6);
        show(box(sid, "s10-mid", { x: 1470, y: 470, w: 310, cls: "c3", html: "session.get<br/>session.set", style: "font-size:24px;padding:10px" }), W("s10d", 0), { s: 0.7, d: 0.5 });
        const a3 = line(sid, "s10-a3", { x1: 1610, y1: 640, x2: 1250, y2: 640, arrow: "ahP", w: 6, color: "#f472b6" }); tl.set(a3, { opacity: 0 }, 0);
        drawLine(a3, W("s10d", 14)); show(chip(sid, "s10-l3", { x: 1300, y: 580, html: "Set-Cookie", cls: "d", fs: 22 }), W("s10d", 17), { s: 0.7, d: 0.5 });
        // forgetting to commit
        show(chip(sid, "s10-f1", { x: 1110, y: 720, html: "no commitSession", cls: "f", fs: 24 }), L("s10f", 0.1), { s: 0.7, d: 0.5 });
        show(chip(sid, "s10-f2", { x: 1420, y: 720, html: "change lost", cls: "f", fs: 24 }), W("s10f", 3), { s: 0.7, d: 0.5 });
        hide("#s10-f1, #s10-f2", L("s10g", 0.1), 0.4);
        // flash
        mk(sid, '<div class="card c-lime" id="s10-fl" style="left:1150px;top:700px;width:560px;height:70px"><div style="position:absolute;left:24px;top:14px;font-size:30px;font-weight:800">Added to cart ✓</div></div>');
        tl.set("#s10-fl", { opacity: 0 }, 0);
        show("#s10-fl", W("s10g", 4), { s: 0.9, d: 0.5 }); hide("#s10-fl", W("s10g", 8), 0.4);
        show(tag(sid, "s10-fl2", { x: 1150, y: 790, html: "flash: read once, then gone", cls: "li", fs: 24 }), W("s10g", 7), { s: 0.7, d: 0.5 });
        // log out
        hide("#s10-fl2", L("s10h", 0.1), 0.4);
        show(chip(sid, "s10-o1", { x: 1110, y: 720, html: "destroySession", cls: "f", fs: 26 }), W("s10h", 4), { s: 0.7, d: 0.5 });
        show(arrowText(sid, "s10-o2", { x: 1400, y: 712, html: "→", fs: 36 }), W("s10h", 5), { s: 0.6, d: 0.4 });
        show(chip(sid, "s10-o3", { x: 1460, y: 720, html: "redirect(\"/\")", cls: "d", fs: 26 }), W("s10h", 6), { s: 0.7, d: 0.5 });
        leave(sid);
      })();

      // ---------- 11 · Fetchers ----------
      (function () {
        const sid = "s11";
        enter(sid);
        const P = (id, name, code, fs) => codePanel(sid, id, { name, code, x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs });
        const a = P("s11-a", "app/components/add-to-cart.tsx", "add-to-cart", 22);
        const b = P("s11-b", "app/routes/cart.tsx", "cart-line", 22);
        const c = P("s11-c", "app/routes/cart.tsx (action)", "cart-stock", 24);
        const d = P("s11-d", "app/components/search-box.tsx", "search-box", 24);
        const e = P("s11-e", "app/routes/shop-layout.tsx", "pending-fetchers", 27);
        tl.set("#s11-a, #s11-b, #s11-c, #s11-d, #s11-e", { opacity: 0 }, 0);
        const w = browserWin(sid, "s11-w", { x: SPLIT.px, y: SPLIT.py, w: SPLIT.pw, frames: ["products", "add-busy", "add-done", "cart", "cart-optimistic", "add-error", "live-search"] });
        show("#s11-w", L("s11a", 0.3), { s: 0.9, d: 0.8 }); w.frame("products", L("s11a", 0.5));
        show(tag(sid, "s11-t1", { x: 1090, y: 790, html: "Form: navigates", cls: "co", fs: 24 }), W("s11a", 2), { s: 0.7, d: 0.5 });
        show(tag(sid, "s11-t2", { x: 1330, y: 790, html: "stay where you are", cls: "li", fs: 24 }), W("s11a", 10), { s: 0.7, d: 0.5 });
        // useFetcher + fetcher.Form
        hide("#s11-t1, #s11-t2", L("s11b", 0.1), 0.4);
        fade("#s11-a", L("s11b", 0.3), 0.6); hl(a.id, [1], W("s11b", 5), 2.4); hl(a.id, [5], W("s11b", 8), 4.4);
        // the URL does not change
        show(chip(sid, "s11-u1", { x: 1090, y: 790, html: "URL stays /products", cls: "b", fs: 24 }), W("s11d", 0), { s: 0.6, d: 0.5 });
        show(chip(sid, "s11-u2", { x: 1370, y: 790, html: "no new history entry", cls: "b", fs: 24 }), W("s11d", 4), { s: 0.6, d: 0.5 });
        hide("#s11-u1, #s11-u2", W("s11d", 8), 0.4);
        show(tag(sid, "s11-u3", { x: 1090, y: 790, html: "URL should change: Form", cls: "co", fs: 24 }), W("s11d", 12), { s: 0.6, d: 0.5 });
        show(tag(sid, "s11-u4", { x: 1400, y: 790, html: "if not: fetcher", cls: "li", fs: 24 }), W("s11d", 17), { s: 0.6, d: 0.5 });
        // state
        hide("#s11-u3, #s11-u4", L("s11e", 0.1), 0.4);
        hl(a.id, [2], W("s11e", 7), 2.2);
        w.click("add-busy", W("s11e", 4), 1.0); w.frame("add-busy", W("s11e", 5), 0.3);
        show(tag(sid, "s11-s1", { x: 1090, y: 790, html: "state: submitting → \"Adding...\"", cls: "pk", fs: 24 }), W("s11e", 10), { s: 0.6, d: 0.5 });
        // revalidation after the action
        w.frame("add-done", W("s11f", 2), 0.4);
        hide("#s11-s1", W("s11f", 4), 0.3);
        show(tag(sid, "s11-s2", { x: 1090, y: 790, html: "loaders revalidate: the cart count updates", cls: "li", fs: 24 }), W("s11f", 9), { s: 0.6, d: 0.5 });
        // optimistic UI
        hide("#s11-s2", L("s11g", 0.1), 0.4);
        swap("#s11-a", "#s11-b", L("s11g", 0.0)); w.frame("cart", L("s11g", 0.3), 0.4);
        hl(b.id, [8], W("s11g", 5), 2.4);
        w.click("cart-optimistic", W("s11h", 3), 1.0); w.frame("cart-optimistic", W("s11h", 3) + 0.3, 0.2);
        hl(b.id, [1, 2, 3, 4, 5], W("s11h", 4), 2.6); hl(b.id, [9], W("s11h", 8), 2.4);
        show(tag(sid, "s11-o1", { x: 1090, y: 790, html: "optimistic UI: next state first", cls: "vi", fs: 24 }), W("s11h", 17), { s: 0.6, d: 0.5 });
        // errors from the action
        hide("#s11-o1", L("s11j", 0.1), 0.4);
        swap("#s11-b", "#s11-c", L("s11j", 0.0)); hl(c.id, [2, 3, 4, 5, 6], W("s11j", 0), 4.4);
        w.frame("add-error", W("s11j", 6), 0.4);
        show(tag(sid, "s11-e1", { x: 1090, y: 790, html: "fetcher.data.error → shown here", cls: "co", fs: 24 }), W("s11j", 9), { s: 0.6, d: 0.5 });
        // fetchers that load data: live search
        hide("#s11-e1", L("s11k", 0.1), 0.4);
        swap("#s11-c", "#s11-d", L("s11k", 0.0)); hl(d.id, [1], W("s11k", 6), 2.0);
        hl(d.id, [9], W("s11k", 16), 4.0); w.frame("live-search", W("s11k", 12), 0.4);
        hl(d.id, [5, 6, 7], W("s11l", 4), 4.0);
        show(tag(sid, "s11-l1", { x: 1090, y: 790, html: "runs that loader: no navigation", cls: "cy", fs: 24 }), W("s11l", 18), { s: 0.6, d: 0.5 });
        hl(d.id, [2], W("s11m", 4), 2.4); hide("#s11-l1", W("s11m", 3), 0.3);
        show(tag(sid, "s11-l2", { x: 1090, y: 790, html: "your live search", cls: "li", fs: 26 }), W("s11m", 7), { s: 0.6, d: 0.5 });
        // useFetchers
        hide("#s11-l2", L("s11n", 0.1), 0.4);
        swap("#s11-d", "#s11-e", L("s11n", 0.0)); hl(e.id, [2], W("s11n", 1), 3.6);
        w.frame("add-busy", W("s11n", 10), 0.4);
        show(tag(sid, "s11-n1", { x: 1090, y: 790, html: "pending cart count", cls: "pk", fs: 26 }), W("s11n", 13), { s: 0.6, d: 0.5 });
        leave(sid);
      })();

      // ---------- 12 · Revalidation ----------
      (function () {
        const sid = "s12";
        enter(sid);
        const act = box(sid, "s12-act", { x: 1090, y: 240, w: 640, cls: "c3", html: "an action finishes<small>a successful response</small>", style: "font-size:30px" });
        const l1 = box(sid, "s12-l1", { x: 1090, y: 400, w: 640, cls: "c2", html: "root loader  ✓ runs again", style: "font-size:28px" });
        const l2 = box(sid, "s12-l2", { x: 1090, y: 500, w: 640, cls: "c2", html: "shop-layout loader  ✓ runs again", style: "font-size:28px" });
        const l3 = box(sid, "s12-l3", { x: 1090, y: 600, w: 640, cls: "c2", html: "page loader  ✓ runs again", style: "font-size:28px" });
        [act, l1, l2, l3].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        show(act, W("s12a", 0), { s: 0.7, d: 0.5 });
        [l1, l2, l3].forEach((s, i) => show(s, W("s12a", 4) + i * 0.4, { s: 0.7, d: 0.5 }));
        show(tag(sid, "s12-fresh", { x: 1090, y: 720, html: "the UI is never out of date", cls: "li", fs: 28 }), W("s12a", 16), { s: 0.7, d: 0.5 });
        // opt out with shouldRevalidate
        hide("#s12-fresh", L("s12c", 0.1), 0.4);
        const sr = codePanel(sid, "s12-a", { name: "app/routes/home.tsx", code: "should-revalidate", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 27 });
        const cs = codePanel(sid, "s12-b", { name: "call site", code: "call-site", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 27 });
        const rv = codePanel(sid, "s12-c", { name: "useRevalidator (example)", code: "revalidate", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 22 });
        tl.set("#s12-a, #s12-b, #s12-c", { opacity: 0 }, 0);
        fade("#s12-a", L("s12c", 0.2), 0.6);
        hl(sr.id, [2, 3, 4, 5], W("s12c", 4), 2.6); hl(sr.id, [6], W("s12c", 10), 2.6);
        tl.to(l3, { backgroundColor: "#4a1d2e", borderColor: "#fb7185", duration: 0.5 }, W("s12c", 10));
        tl.set(l3, { innerHTML: "home loader  ✗ skipped after /cart" }, W("s12c", 10));
        hl(sr.id, [7], W("s12d", 3), 2.0);
        swap("#s12-a", "#s12-b", L("s12e", 0.0)); hl(cs.id, [4], W("s12e", 6), 2.4);
        swap("#s12-b", "#s12-c", L("s12f", 0.0)); hl(rv.id, [1], W("s12f", 2), 2.0); hl(rv.id, [4], W("s12f", 12), 3.0);
        leave(sid);
      })();
