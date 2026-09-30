
      // ---------- 13 · Streaming ----------
      (function () {
        const sid = "s13";
        enter(sid);
        const P = (id, name, code, fs) => codePanel(sid, id, { name, code, x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs });
        const c1 = P("s13-a", "app/routes/product.tsx", "product-loader", 22);
        const c2 = P("s13-b", "app/routes/product.tsx", "suspense", 27);
        const c3 = P("s13-c", "React 19: use", "use-hook", 26);
        const c4 = P("s13-d", "streamTimeout", "stream-timeout", 27);
        tl.set("#s13-a, #s13-b, #s13-c, #s13-d", { opacity: 0 }, 0);
        const w = browserWin(sid, "s13-w", { x: SPLIT.px, y: SPLIT.py, w: SPLIT.pw, frames: ["reviews-loading", "reviews-loaded"] });
        show("#s13-w", L("s13a", 0.3), { s: 0.9, d: 0.8 }); w.frame("reviews-loading", L("s13a", 0.5));
        const t1 = tag(sid, "s13-t1", { x: 1090, y: 790, html: "the whole page waits", cls: "co", fs: 26 });
        show(t1, W("s13a", 6), { s: 0.7, d: 0.5 }); strike(t1, W("s13a", 9)); hide(t1, L("s13b", 0.2), 0.4);
        // return the promise without awaiting it
        fade("#s13-a", L("s13b", 0.2), 0.6);
        hl(c1.id, [9, 10, 11, 12], W("s13b", 3), 4.0);
        show(tag(sid, "s13-t2", { x: 1090, y: 790, html: "awaited: the critical data", cls: "li", fs: 26 }), W("s13b", 9), { s: 0.7, d: 0.5 });
        hl(c1.id, [2, 3, 4, 7], W("s13b", 9), 3.6);
        hide("#s13-t2", W("s13b", 14) - 0.2, 0.3);
        show(tag(sid, "s13-t3", { x: 1090, y: 790, html: "not awaited: streamed later", cls: "pk", fs: 26 }), W("s13b", 14), { s: 0.7, d: 0.5 });
        hl(c1.id, [10, 11, 12], W("s13b", 14), 4.0);
        // Suspense + Await
        hide("#s13-t3", L("s13c", 0.1), 0.4);
        swap("#s13-a", "#s13-b", L("s13c", 0.0));
        hl(c2.id, [1, 5], W("s13c", 3), 2.6); hl(c2.id, [1], W("s13c", 8), 2.4); hl(c2.id, [2, 3, 4], W("s13c", 12), 3.2);
        // the use hook
        swap("#s13-b", "#s13-c", L("s13e", 0.0)); hl(c3.id, [2], W("s13e", 9), 2.4);
        // it renders right away, then the reviews replace the fallback
        swap("#s13-c", "#s13-b", L("s13f", 0.0));
        show(tag(sid, "s13-t4", { x: 1090, y: 790, html: "the page renders right away", cls: "cy", fs: 26 }), W("s13f", 2), { s: 0.7, d: 0.5 });
        hide("#s13-t4", W("s13f", 5) - 0.1, 0.3);
        w.frame("reviews-loaded", W("s13f", 5) + 0.2, 0.5);
        show(tag(sid, "s13-t5", { x: 1090, y: 790, html: "reviews replace the fallback", cls: "li", fs: 26 }), W("s13f", 9), { s: 0.7, d: 0.5 });
        // the timeout
        hide("#s13-t5", L("s13g", 0.1), 0.4);
        swap("#s13-b", "#s13-d", L("s13g", 0.0)); hl(c4.id, [3], W("s13g", 9), 3.0);
        show(tag(sid, "s13-t6", { x: 1090, y: 790, html: "default: about 5 seconds", cls: "cy", fs: 26 }), W("s13g", 4), { s: 0.7, d: 0.5 });
        leave(sid);
      })();

      // ---------- 14 · Error boundaries ----------
      (function () {
        const sid = "s14";
        enter(sid);
        // who throws
        const th = [["loader throws", 2, "a"], ["action throws", 4, "d"], ["component throws", 7, "c"]];
        th.forEach(([t, wi, col], i) => show(chip(sid, "s14-th" + i, { x: 1090, y: 270 + i * 90, html: t, cls: col, fs: 28 }), W("s14a", wi), { s: 0.6, d: 0.5, x: -40 }));
        show(arrowText(sid, "s14-tha", { x: 1450, y: 340, html: "→", fs: 60 }), W("s14a", 9), { s: 0.6, d: 0.4 });
        show(box(sid, "s14-thb", { x: 1540, y: 300, w: 250, cls: "c4", html: "closest<br/>ErrorBoundary", style: "font-size:26px;padding:14px 8px" }), W("s14a", 10), { s: 0.7, d: 0.5 });
        hide("#s14-th0, #s14-th1, #s14-th2, #s14-tha, #s14-thb", L("s14b", 0.1), 0.4);
        // the root boundary
        const a = codePanel(sid, "s14-a", { name: "app/root.tsx", code: "root-error-a", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 24 });
        const b = codePanel(sid, "s14-b", { name: "app/root.tsx", code: "root-error-b", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 24 });
        const c = codePanel(sid, "s14-c", { name: "app/routes/product.tsx", code: "product-error", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 25 });
        tl.set("#s14-a, #s14-b, #s14-c", { opacity: 0 }, 0);
        const w = browserWin(sid, "s14-w", { x: SPLIT.px, y: SPLIT.py, w: SPLIT.pw, frames: ["root-404", "product-404"] });
        fade("#s14-a", L("s14b", 0.2), 0.6);
        hl(a.id, [1, 2, 3], W("s14b", 1), 2.0); hl(a.id, [4], W("s14b", 6), 3.6);
        show("#s14-w", W("s14b", 8), { s: 0.9, d: 0.8 }); w.frame("root-404", W("s14b", 8) + 0.2);
        swap("#s14-a", "#s14-b", W("s14b", 14) - 0.2);
        hl(b.id, [1], W("s14b", 15), 2.0); hl(b.id, [9, 10], W("s14b", 18), 3.0);
        // Mallory breaks the reviews
        cameo("#mal", "s14c");
        const wp = chip(sid, "s14-wp", { x: 1090, y: 790, html: "a white page", cls: "f", fs: 28 });
        show(wp, W("s14c", 7), { s: 0.6, d: 0.5 }); strike(wp, W("s14c", 9)); hide(wp, L("s14d", 0.2), 0.4);
        // a boundary in the product route
        swap("#s14-b", "#s14-c", L("s14d", 0.0));
        hl(c.id, [2, 3, 4], W("s14d", 0), 2.6); w.frame("product-404", W("s14d", 9), 0.4);
        hl(c.id, [8], W("s14d", 15), 2.4);
        show(tag(sid, "s14-l1", { x: 1090, y: 790, html: "layout and header stay", cls: "li", fs: 26 }), W("s14d", 18), { s: 0.7, d: 0.5 });
        // what boundaries are for
        hide("#s14-l1", L("s14e", 0.1), 0.4);
        show(chip(sid, "s14-e1", { x: 1090, y: 790, html: "surprises", cls: "f", fs: 26 }), W("s14e", 3), { s: 0.6, d: 0.5 });
        show(chip(sid, "s14-e2", { x: 1290, y: 790, html: "missing pages", cls: "f", fs: 26 }), W("s14e", 6), { s: 0.6, d: 0.5 });
        show(chip(sid, "s14-e3", { x: 1090, y: 840, html: "form validation: actionData", cls: "e", fs: 26 }), W("s14e", 9), { s: 0.6, d: 0.5 });
        leave(sid);
      })();

      // ---------- 15 · Middleware ----------
      (function () {
        const sid = "s15";
        enter(sid);
        cameo("#guard", "s15a"); face("#byte", "h", L("s15b"));
        // the middleware chain
        const rows = [
          ["root middleware", "c2", 1, "down"], ["account middleware", "c2", 9, "down"], ["loaders and actions run", "c5", 13, ""],
          ["account middleware, after", "c2", 16, "up"], ["root middleware, after", "c2", 18, "up"],
        ];
        rows.forEach(([t, cls, wi, dir], i) => {
          const y = 250 + i * 110;
          show(box(sid, "s15-r" + i, { x: 1090, y, w: 600, cls, html: t, style: "font-size:28px;padding:14px 10px" }), W("s15b", wi), { s: 0.7, d: 0.5 });
          if (i < rows.length - 1) show(arrowText(sid, "s15-ra" + i, { x: 1370, y: y + 72, html: i < 2 ? "↓" : "↑", fs: 34, color: i < 2 ? "#22d3ee" : "#f472b6" }), W("s15b", rows[i + 1][2]) - 0.3, { s: 0.6, d: 0.4 });
        });
        // context and the middleware export
        const cd = codePanel(sid, "s15-a", { name: "app/context.ts", code: "context-def", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 24 });
        const m = codePanel(sid, "s15-b", { name: "app/routes/account-layout.tsx", code: "middleware", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 20 });
        const ml = codePanel(sid, "s15-c", { name: "app/routes/account-layout.tsx", code: "middleware-loader", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 26 });
        const lg = codePanel(sid, "s15-d", { name: "app/root.tsx", code: "logging", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 22 });
        const cm = codePanel(sid, "s15-e", { name: "clientMiddleware (docs example)", code: "client-middleware", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 26 });
        tl.set("#s15-b, #s15-c, #s15-d, #s15-e", { opacity: 0 }, 0);
        fade("#s15-a", W("s15c", 0), 0.6); hl(cd.id, [1], W("s15c", 5), 2.4);
        swap("#s15-a", "#s15-b", W("s15c", 6)); hl(m.id, [19], W("s15c", 9), 3.6);
        show(tag(sid, "s15-g1", { x: 1090, y: 800, html: "a session is required", cls: "li", fs: 26 }), L("s15d", 0.3), { s: 0.7, d: 0.5 }); cameo("#guard", "s15d");
        hide("#s15-g1", L("s15e", 0.1), 0.4);
        // reads the session, redirects or stores the user
        hide("#s15-r0, #s15-r1, #s15-r2, #s15-r3, #s15-r4, #s15-ra0, #s15-ra1, #s15-ra2, #s15-ra3", L("s15e", 0.1), 0.4);
        hl(m.id, [6, 7, 8], W("s15e", 2), 2.4); hl(m.id, [12], W("s15e", 10), 3.2); hl(m.id, [13, 14, 15, 16, 17], W("s15e", 16), 3.4);
        const w = browserWin(sid, "s15-w", { x: SPLIT.px, y: SPLIT.py, w: SPLIT.pw, frames: ["login-redirect", "account"] });
        show("#s15-w", W("s15e", 10), { s: 0.9, d: 0.8 }); w.frame("login-redirect", W("s15e", 10) + 0.2); w.frame("account", W("s15e", 19), 0.4);
        // child loaders read the user from context
        swap("#s15-b", "#s15-c", L("s15f", 0.0)); hl(ml.id, [2], W("s15f", 4), 2.2);
        // logging middleware
        swap("#s15-c", "#s15-d", L("s15g", 0.0)); hl(lg.id, [6, 7, 8], W("s15g", 9), 3.0);
        hide("#s15-w", L("s15g", 0.3), 0.4);
        show(box(sid, "s15-lg", { x: 1090, y: 300, w: 640, cls: "c1", html: "GET /about.data 200 5ms<small>a line from the real server log</small>", style: "font-size:26px;font-family:var(--mono)" }), W("s15g", 10), { s: 0.7, d: 0.5 });
        // the client version
        swap("#s15-d", "#s15-e", L("s15i", 0.0)); hide("#s15-lg", L("s15i", 0.0), 0.4); hl(cm.id, [4], W("s15i", 8), 3.4);
        leave(sid);
      })();

      // ---------- 16 · Client loaders and actions ----------
      (function () {
        const sid = "s16";
        enter(sid);
        const c1 = codePanel(sid, "s16-a", { name: "app/routes/home.tsx", code: "client-loader", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 20 });
        const c2 = codePanel(sid, "s16-b", { name: "clientAction (example)", code: "client-action", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 26 });
        tl.set("#s16-a, #s16-b", { opacity: 0 }, 0);
        const w = browserWin(sid, "s16-w", { x: SPLIT.px, y: SPLIT.py, w: SPLIT.pw, frames: ["home", "home-recent"] });
        show("#s16-w", L("s16a", 0.3), { s: 0.9, d: 0.8 }); w.frame("home", L("s16a", 0.5));
        show(tag(sid, "s16-t1", { x: 1090, y: 790, html: "recently viewed: localStorage", cls: "vi", fs: 26 }), W("s16a", 7), { s: 0.7, d: 0.5 });
        fade("#s16-a", L("s16b", 0.2), 0.6); hl(c1.id, [1, 2, 3, 4], W("s16b", 2), 2.4);
        w.frame("home-recent", W("s16b", 8), 0.4); hide("#s16-t1", L("s16b", 0.2), 0.4);
        hl(c1.id, [5], W("s16c", 2), 2.0); hl(c1.id, [6, 7, 8, 9], W("s16c", 8), 2.4);
        hl(c1.id, [12], W("s16d", 9), 2.4); hl(c1.id, [14, 15, 16, 17, 18, 19, 20], W("s16d", 16), 3.4);
        show(tag(sid, "s16-t2", { x: 1090, y: 790, html: "also runs on the first load", cls: "cy", fs: 26 }), W("s16d", 10), { s: 0.7, d: 0.5 });
        hide("#s16-t2", L("s16e", 0.1), 0.4);
        swap("#s16-a", "#s16-b", L("s16e", 0.0)); hl(c2.id, [4, 5], W("s16e", 5), 2.8);
        show(tag(sid, "s16-t3", { x: 1090, y: 790, html: "browser only: no server needed", cls: "vi", fs: 26 }), W("s16e", 5), { s: 0.7, d: 0.5 });
        leave(sid);
      })();
