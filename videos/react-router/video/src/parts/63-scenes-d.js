
      // ---------- 17 · Resource routes ----------
      (function () {
        const sid = "s17";
        enter(sid);
        const P = (id, name, code, fs) => codePanel(sid, id, { name, code, x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs });
        const a = P("s17-a", "app/routes/search.ts", "resource-search", 22);
        const b = P("s17-b", "app/routes/invoice.ts", "resource-invoice", 24);
        const c = P("s17-c", "app/routes/webhook.ts", "resource-webhook", 26);
        const d = P("s17-d", "app/routes/order.tsx", "link-reload", 27);
        tl.set("#s17-b, #s17-c, #s17-d", { opacity: 0 }, 0);
        fade("#s17-a", L("s17a", 0.3), 0.6); hl(a.id, [1], W("s17a", 3), 3.0); hl(a.id, [2], W("s17a", 0) + 0.2, 1.6);
        show(box(sid, "s17-p1", { x: 1090, y: 260, w: 640, cls: "c1", html: "page route<small>default export: renders UI</small>", style: "font-size:30px" }), W("s17a", 4), { s: 0.7, d: 0.5 });
        show(box(sid, "s17-p2", { x: 1090, y: 430, w: 640, cls: "c2", html: "resource route<small>loader or action only: serves data</small>", style: "font-size:30px" }), W("s17a", 10), { s: 0.7, d: 0.5 });
        // invoice, JSON, webhook
        hide("#s17-p1, #s17-p2", L("s17b", 0.1), 0.4);
        swap("#s17-a", "#s17-b", L("s17b", 0.0)); hl(b.id, [3, 4, 5, 6, 7, 8], W("s17b", 2), 3.0);
        show(tag(sid, "s17-i1", { x: 1090, y: 300, html: "/invoices/1002 → a file download", cls: "cy", fs: 26 }), W("s17b", 2), { s: 0.7, d: 0.5 });
        const w = browserWin(sid, "s17-w", { x: SPLIT.px, y: SPLIT.py + 60, w: SPLIT.pw, frames: ["resource-search"] });
        hide("#s17-i1", W("s17b", 7) - 0.2, 0.3);
        show("#s17-w", W("s17b", 8), { s: 0.9, d: 0.8 }); w.frame("resource-search", W("s17b", 8) + 0.2);
        show(tag(sid, "s17-i2", { x: 1090, y: 820, html: "a route that returns JSON", cls: "li", fs: 26 }), W("s17b", 10), { s: 0.7, d: 0.5 });
        hide("#s17-w, #s17-i2", W("s17b", 12) - 0.2, 0.4);
        swap("#s17-b", "#s17-c", W("s17b", 12) - 0.2); hl(c.id, [2], W("s17b", 15), 3.0);
        show(tag(sid, "s17-i3", { x: 1090, y: 300, html: "POST → action", cls: "vi", fs: 28 }), W("s17b", 15), { s: 0.7, d: 0.5 });
        // linking
        hide("#s17-i3", L("s17c", 0.1), 0.4);
        swap("#s17-c", "#s17-d", L("s17c", 0.0)); hl(d.id, [1], W("s17c", 11), 2.6);
        show(tag(sid, "s17-l1", { x: 1090, y: 300, html: "a normal anchor works too", cls: "li", fs: 26 }), W("s17c", 6), { s: 0.7, d: 0.5 });
        show(tag(sid, "s17-l2", { x: 1090, y: 380, html: "otherwise: client navigation", cls: "co", fs: 26 }), W("s17c", 13), { s: 0.7, d: 0.5 });
        leave(sid);
      })();

      // ---------- 18 · Head tags, headers, handle ----------
      (function () {
        const sid = "s18";
        enter(sid);
        const P = (id, name, code, fs) => codePanel(sid, id, { name, code, x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs });
        const a = P("s18-a", "app/routes/product.tsx", "meta", 25);
        const b = P("s18-b", "meta export", "meta-export", 26);
        const l = P("s18-l", "links export", "links-export", 26);
        const h = P("s18-h", "app/routes/products.tsx", "headers", 27);
        const d = P("s18-d", "app/routes/shop-layout.tsx", "breadcrumbs", 24);
        tl.set("#s18-b, #s18-l, #s18-h, #s18-d", { opacity: 0 }, 0);
        // the browser tab and the description
        mk(sid, '<div id="s18-tab" style="position:absolute;left:1090px;top:250px;width:640px;height:64px;border-radius:16px 16px 0 0;background:#e3e8ff;color:#1f2140;font:700 26px/64px Inter,Arial,sans-serif;padding-left:24px"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#6a4df0;vertical-align:-3px;margin-right:14px"></span>Ceramic Mug | Nova Market</div>');
        mk(sid, '<div id="s18-desc" style="position:absolute;left:1090px;top:330px;width:640px;padding:16px 22px;border-radius:14px;background:#172050;border:3px solid #3a4696;font:600 24px/1.4 Inter,Arial,sans-serif;color:#f4f6ff"><b style="color:#22d3ee">description</b><br />Hand glazed, dishwasher safe, holds 350 ml.</div>');
        tl.set("#s18-tab, #s18-desc", { opacity: 0 }, 0);
        fade("#s18-a", L("s18a", 0.3), 0.6); hl(a.id, [1], W("s18a", 4), 2.4); hl(a.id, [2], W("s18a", 6), 2.4);
        show("#s18-tab", W("s18a", 12), { s: 0.9, d: 0.6 }); show("#s18-desc", W("s18a", 18), { s: 0.9, d: 0.6 });
        // the meta export
        swap("#s18-a", "#s18-b", L("s18b", 0.0)); hl(b.id, [1], W("s18b", 1), 2.0);
        show(tag(sid, "s18-t1", { x: 1090, y: 470, html: "the last matching route wins", cls: "pk", fs: 26 }), W("s18b", 7), { s: 0.7, d: 0.5 });
        // links and headers
        hide("#s18-t1", L("s18c", 0.1), 0.4);
        swap("#s18-b", "#s18-l", L("s18c", 0.0)); hl(l.id, [2], W("s18c", 3), 2.4);
        swap("#s18-l", "#s18-h", W("s18c", 7) - 0.3); hl(h.id, [2], W("s18c", 10), 2.8);
        show(tag(sid, "s18-t2", { x: 1090, y: 470, html: "Cache-Control for public pages", cls: "cy", fs: 26 }), W("s18c", 11), { s: 0.7, d: 0.5 });
        // handle + useMatches
        hide("#s18-tab, #s18-desc, #s18-t2", L("s18d", 0.1), 0.4);
        hl(h.id, [5], W("s18d", 0), 2.0);
        swap("#s18-h", "#s18-d", W("s18d", 10) - 0.3); hl(d.id, [2], W("s18d", 12), 2.6);
        const w = browserWin(sid, "s18-w", { x: SPLIT.px, y: SPLIT.py + 40, w: SPLIT.pw, frames: ["reviews-loaded"] });
        show("#s18-w", W("s18d", 5), { s: 0.9, d: 0.8 }); w.frame("reviews-loaded", W("s18d", 5) + 0.2);
        show(tag(sid, "s18-t3", { x: 1090, y: 800, html: "Nova Market / Product: from handle", cls: "vi", fs: 24 }), W("s18d", 8), { s: 0.7, d: 0.5 });
        leave(sid);
      })();

      // ---------- 19 · Rendering strategies ----------
      (function () {
        const sid = "s19";
        enter(sid);
        const a = codePanel(sid, "s19-a", { name: "react-router.config.ts", code: "config", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 27 });
        const b = codePanel(sid, "s19-b", { name: "react-router.config.ts (SPA)", code: "config-spa", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 30 });
        tl.set("#s19-b", { opacity: 0 }, 0);
        const card = (id, y, cls, html) => box(sid, id, { x: 1090, y, w: 690, cls, html, style: "font-size:30px" });
        const c1 = card("s19-c1", 250, "c2", "ssr: true<small>server rendered on every request</small>");
        const c2 = card("s19-c2", 400, "c1", "ssr: false<small>a single page app, rendered in the browser</small>");
        const c3 = card("s19-c3", 550, "c5", "prerender<small>built once, at build time: /about</small>");
        [c1, c2, c3].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        fade("#s19-a", L("s19a", 0.3), 0.6); hl(a.id, [3], W("s19a", 4), 2.6); show(c1, W("s19a", 8), { s: 0.7, d: 0.5 });
        swap("#s19-a", "#s19-b", L("s19b", 0.0)); hl(b.id, [2], W("s19b", 1), 2.4); show(c2, W("s19b", 5), { s: 0.7, d: 0.5 });
        swap("#s19-b", "#s19-a", L("s19c", 0.0)); hl(a.id, [5, 6, 7], W("s19c", 7), 3.0); show(c3, W("s19c", 15), { s: 0.7, d: 0.5 });
        show(box(sid, "s19-log", { x: 1090, y: 700, w: 690, cls: "c1", html: "Prerender (html): /about → build/client/about/index.html<small>a line from the real build</small>", style: "font-size:21px;font-family:var(--mono);padding:12px 14px" }), W("s19c", 17), { s: 0.7, d: 0.5 });
        leave(sid);
      })();

      // ---------- 20 · Finishing touches ----------
      (function () {
        const sid = "s20";
        enter(sid);
        const items = [["Progressive enhancement", "forms work before JavaScript", "c5"], ["View transitions", "animate page changes", "c3"], ["Testing", "createRoutesStub", "c2"], ["Deploying", "build, then serve", "c4"]];
        items.forEach(([t, s, cls], i) => box(sid, "s20-i" + i, { x: 1090, y: 250 + i * 130, w: 690, cls, html: t + "<small>" + s + "</small>", style: "font-size:30px" }));
        items.forEach((_, i) => tl.set("#s20-i" + i, { opacity: 0 }, 0));
        const P = (id, name, code, fs) => codePanel(sid, id, { name, code, x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs });
        const v = P("s20-v", "app/routes/shop-layout.tsx (React 19.3+)", "view-transition", 28);
        const t = P("s20-t", "a test (docs example)", "testing", 24);
        const d = P("s20-d", "terminal", "build-cmd", 30);
        tl.set("#s20-v, #s20-t, #s20-d", { opacity: 0 }, 0);
        // progressive enhancement: form -> html form
        show("#s20-i0", W("s20a", 0), { s: 0.7, d: 0.5 });
        show(chip(sid, "s20-f1", { x: 120, y: 300, html: "&lt;Form method=\"post\"&gt;", cls: "b", fs: 30 }), W("s20a", 6), { s: 0.6, d: 0.5 });
        show(arrowText(sid, "s20-f2", { x: 560, y: 292, html: "→", fs: 50 }), W("s20a", 8), { s: 0.6, d: 0.4 });
        show(chip(sid, "s20-f3", { x: 640, y: 300, html: "&lt;form method=\"post\"&gt;", cls: "e", fs: 30 }), W("s20a", 9), { s: 0.6, d: 0.5 });
        show(tag(sid, "s20-f4", { x: 120, y: 400, html: "a plain HTML form: it works without JavaScript", cls: "li", fs: 28 }), W("s20a", 11), { s: 0.7, d: 0.5 });
        hide("#s20-f1, #s20-f2, #s20-f3, #s20-f4", L("s20b", 0.1), 0.4);
        // view transitions
        show("#s20-i1", L("s20b", 0.2), { s: 0.7, d: 0.5 }); fade("#s20-v", L("s20b", 0.3), 0.6); hl(v.id, [1], W("s20b", 10), 3.4);
        // testing
        swap("#s20-v", "#s20-t", L("s20c", 0.0)); show("#s20-i2", L("s20c", 0.2), { s: 0.7, d: 0.5 }); hl(t.id, [1], W("s20c", 10), 2.4);
        // deploying
        swap("#s20-t", "#s20-d", L("s20d", 0.0)); show("#s20-i3", L("s20d", 0.2), { s: 0.7, d: 0.5 }); hl(d.id, [1], W("s20d", 3), 2.0); hl(d.id, [2], W("s20d", 8), 2.4);
        leave(sid);
      })();

      // ---------- 21 · Recap ----------
      (function () {
        const sid = "s21";
        enter(sid);
        const w = browserWin(sid, "s21-w", { x: SPLIT.px, y: SPLIT.py + 20, w: SPLIT.pw, frames: ["home", "products", "cart", "checkout-filled", "order"] });
        show("#s21-w", L("s21a", 0.3), { s: 0.9, d: 0.8 }); w.frame("home", L("s21a", 0.5));
        const rows = [
          ["Routes map URLs to modules", "c1", "s21b", 0, "products"], ["Loaders read data", "c2", "s21b", 5, "products"], ["Actions write it, loaders refresh", "c3", "s21b", 8, "cart"],
          ["Fetchers save without navigating", "c4", "s21c", 0, "cart"], ["Sessions remember users", "c5", "s21c", 4, "checkout-filled"], ["Streaming, error boundaries, middleware", "c6", "s21c", 7, "order"],
        ];
        rows.forEach(([t, cls, lid, wi, frame], i) => {
          box(sid, "s21-r" + i, { x: 110, y: 240 + i * 100, w: 880, cls, html: t, style: "font-size:30px;padding:16px 20px;text-align:left" });
          tl.set("#s21-r" + i, { opacity: 0 }, 0);
          show("#s21-r" + i, W(lid, wi), { s: 0.9, d: 0.5, x: -50 });
        });
        w.frame("products", W("s21b", 0), 0.4); w.frame("cart", W("s21b", 8), 0.4); w.frame("checkout-filled", W("s21c", 4), 0.4); w.frame("order", W("s21c", 7), 0.4);
        cheer("#sam", L("s21d", 0.2)); mood("#sam", "happy", L("s21d")); cheer("#byte", L("s21e", 0.1)); face("#byte", "h", L("s21e"));
        show(tag(sid, "s21-thx", { x: 1090, y: 820, html: "Thanks for watching", cls: "pk", fs: 32 }), L("s21e", 0.2), { s: 0.6, d: 0.7 });
        leave(sid);
      })();
