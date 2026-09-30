
      // ===================== scenes =====================
      // reveal code lines one by one (lines start hidden)
      function hideLines(id, ns) { tl.set(ns.map((n) => $$("#" + id + " .cl")[n - 1]), { opacity: 0 }, 0); }
      function lineAt(id, n, t) { tl.fromTo($$("#" + id + " .cl")[n - 1], { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.45, ease: E }, t); }
      // crossfade helper for panels that replace each other
      function swap(outSel, inSel, t) { hide(outSel, t, 0.35); fade(inSel, t + 0.1, 0.5); }

      // ---------- 1 · Intro ----------
      (function () {
        const sid = "s1";
        const w = browserWin(sid, "s1-w", { x: 560, y: 235, w: 800, frames: ["home", "products", "cart", "checkout-filled"] });
        show("#s1-w", L("s1a", 3.2), { s: 0.85, d: 0.9 });
        w.frame("home", L("s1a", 3.4));
        walkIn("#sam", 0.4, -260); walkIn("#byte", 0.6, 260);
        wave("#byte", L("s1a", 0.2), 2); face("#byte", "h", L("s1a"));
        // Sam's three things: products, cart, checkout
        w.frame("products", W("s1b", 3), 0.3); w.frame("cart", W("s1b", 5), 0.3); w.frame("checkout-filled", W("s1b", 7), 0.3);
        cheer("#sam", W("s1b", 8));
        // what you will learn: chips around the store
        const items = [["routes", 7], ["loaders", 8], ["actions", 9], ["fetchers", 10], ["sessions", 11], ["streaming", 12], ["error boundaries", 13], ["middleware", 16]];
        const cols = ["a", "b", "c", "d", "e", "f", "g", "a"];
        items.forEach(([label, wi], i) => {
          const left = i < 4;
          const sel = chip(sid, "s1-c" + i, { x: left ? 150 : 1400, y: 300 + (i % 4) * 115, html: label, cls: cols[i], fs: 28 });
          show(sel, W("s1c", wi), { s: 0.5, d: 0.6, x: left ? -60 : 60 });
        });
        tl.to("#s1-w", { scale: 1.03, duration: 0.5, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, W("s1c", 16));
        face("#byte", "q", L("s1d")); face("#byte", "h", L("s1e"));
        leave(sid);
      })();

      // ---------- 2 · Project setup ----------
      (function () {
        const sid = "s2";
        enter(sid);
        const term = codePanel(sid, "s2-term", { name: "terminal", code: "create-cmd", x: 110, y: 235, w: 780, fs: 27 });
        const tree = codePanel(sid, "s2-tree", { name: "project", code: "tree", x: 110, y: 470, w: 780, fs: 24 });
        const w = browserWin(sid, "s2-w", { x: 990, y: 235, w: 810, frames: ["home"] });
        hideLines(term.id, [1, 2, 3, 4]);
        fade("#s2-term", L("s2a", 0.2), 0.5);
        lineAt(term.id, 1, W("s2a", 3)); lineAt(term.id, 2, W("s2a", 4) + 0.4);
        lineAt(term.id, 3, W("s2a", 5)); lineAt(term.id, 4, W("s2a", 9));
        show("#s2-w", W("s2a", 11), { s: 0.9, d: 0.8 }); w.frame("home", W("s2a", 11) + 0.2);
        // the project folder
        fade("#s2-tree", L("s2b", 0.2), 0.6);
        hl(tree.id, [2], W("s2b", 2), 1.2); hl(tree.id, [4], W("s2b", 7), 1.4); hl(tree.id, [3], W("s2b", 13), 1.4);
        // root.tsx in detail
        hide("#s2-term, #s2-tree, #s2-w", L("s2c", 0.1), 0.4);
        const root = codePanel(sid, "s2-root", { name: "app/root.tsx", code: "root-layout", x: 110, y: 235, w: 1000, fs: 20 });
        fade("#s2-root", L("s2c", 0.5), 0.6);
        hl(root.id, [1], W("s2d", 1), 1.2); hl(root.id, [7, 13], W("s2d", 5), 2.2);
        hl(root.id, [8, 10, 11], W("s2d", 13), 1.6);
        hl(root.id, [14], W("s2d", 21), 0.9); hl(root.id, [15], W("s2d", 22), 1.4); hl(root.id, [16], W("s2d", 24), 1.2);
        const app = codePanel(sid, "s2-app", { name: "app/root.tsx", code: "root-app", x: 1160, y: 235, w: 640, fs: 27 });
        fade("#s2-app", L("s2e", 0.2), 0.6);
        hl(app.id, [2], W("s2e", 8), 1.4);
        show(tag(sid, "s2-t1", { x: 1160, y: 400, html: "the current route renders here", cls: "cy", fs: 26 }), W("s2e", 12), { s: 0.7, d: 0.5 });
        hl(root.id, [16], W("s2g", 3), 2.2);
        show(tag(sid, "s2-t2", { x: 1160, y: 470, html: "Scripts: the page becomes interactive", cls: "li", fs: 26 }), W("s2g", 5), { s: 0.7, d: 0.5 });
        show(tag(sid, "s2-t3", { x: 1160, y: 535, html: "without it: plain server rendered HTML", cls: "co", fs: 26 }), W("s2g", 12), { s: 0.7, d: 0.5 });
        // the config file
        hide("#s2-app, #s2-t1, #s2-t2, #s2-t3", L("s2h", 0.1), 0.4);
        const cfg = codePanel(sid, "s2-cfg", { name: "react-router.config.ts", code: "config", x: 1160, y: 235, w: 640, fs: 24 });
        fade("#s2-cfg", W("s2h", 3), 0.6);
        hl(cfg.id, [2], W("s2h", 9), 2.0);
        leave(sid);
      })();

      // ---------- 3 · Routing ----------
      (function () {
        const sid = "s3";
        enter(sid);
        const a = codePanel(sid, "s3-a", { name: "app/routes.ts", code: "routes-a", x: 110, y: 235, w: 640, fs: 25 });
        const b = codePanel(sid, "s3-b", { name: "app/routes.ts", code: "routes-b", x: 110, y: 235, w: 640, fs: 25 });
        const c = codePanel(sid, "s3-c", { name: "app/routes.ts", code: "routes-c", x: 110, y: 235, w: 640, fs: 25 });
        const f = codePanel(sid, "s3-f", { name: "app/routes.ts + fs-routes (docs)", code: "fs-routes", x: 110, y: 235, w: 640, fs: 22 });
        tl.set("#s3-b, #s3-c, #s3-f", { opacity: 0 }, 0);
        // the route tree
        const kid = "font-size:25px;padding:12px 6px;";
        const N = {
          root: box(sid, "s3-root", { x: 1110, y: 240, w: 300, cls: "c2", html: "root.tsx<small>every route lives here</small>" }),
          lay: box(sid, "s3-lay", { x: 1085, y: 375, w: 350, cls: "c1", html: "shop-layout.tsx<small>layout: adds no URL segment</small>" }),
          idx: box(sid, "s3-idx", { x: 800, y: 540, w: 140, cls: "c5", html: "index<small>/</small>", style: kid }),
          prd: box(sid, "s3-prd", { x: 950, y: 540, w: 170, cls: "c3", html: "products<small>/products</small>", style: kid }),
          slg: box(sid, "s3-slg", { x: 1130, y: 540, w: 220, cls: "c4", html: "product<small>/products/:slug</small>", style: kid }),
          crt: box(sid, "s3-crt", { x: 1360, y: 540, w: 130, cls: "c3", html: "cart<small>/cart</small>", style: kid }),
          acc: box(sid, "s3-acc", { x: 1500, y: 540, w: 170, cls: "c2", html: "account<small>prefix + layout</small>", style: kid }),
          spl: box(sid, "s3-spl", { x: 1680, y: 540, w: 120, cls: "c6", html: "*<small>catch-all</small>", style: kid }),
          ord: box(sid, "s3-ord", { x: 1410, y: 700, w: 180, cls: "c5", html: "orders<small>/account</small>", style: kid }),
          set: box(sid, "s3-set", { x: 1610, y: 700, w: 190, cls: "c5", html: "settings<small>/account/settings</small>", style: kid }),
        };
        const L1 = { root: line(sid, "s3-l0", { x1: 1260, y1: 318, x2: 1260, y2: 375 }) };
        const kids = [["idx", 870], ["prd", 1035], ["slg", 1240], ["crt", 1425], ["acc", 1585], ["spl", 1740]];
        kids.forEach(([k, cx]) => { L1[k] = line(sid, "s3-l-" + k, { x1: 1260, y1: 455, x2: cx, y2: 540, color: "#a78bfa" }); });
        L1.ord = line(sid, "s3-l-ord", { x1: 1585, y1: 620, x2: 1500, y2: 700, color: "#a78bfa" });
        L1.set = line(sid, "s3-l-set", { x1: 1585, y1: 620, x2: 1705, y2: 700, color: "#a78bfa" });
        Object.values(N).forEach((s) => tl.set(s, { opacity: 0 }, 0));
        Object.values(L1).forEach((s) => tl.set(s, { opacity: 0 }, 0));

        // s3a: configure routes
        fade("#s3-a", L("s3a", 0.3), 0.6);
        hl(a.id, [1], W("s3a", 4), 1.6); hl(a.id, [4], W("s3a", 9), 1.4); hl(a.id, [4], W("s3a", 13), 1.6);
        show(N.root, W("s3a", 13), { s: 0.7, d: 0.6 });
        // s3b: index and products
        show(N.lay, W("s3b", 0), { s: 0.7, d: 0.6 }); drawLine(L1.root, W("s3b", 0));
        hl(a.id, [3], W("s3b", 5), 1.4); show(N.idx, W("s3b", 5), { s: 0.7, d: 0.6 }); drawLine(L1.idx, W("s3b", 5) + 0.1);
        hl(a.id, [4], W("s3b", 11), 1.4); show(N.prd, W("s3b", 11), { s: 0.7, d: 0.6 }); drawLine(L1.prd, W("s3b", 11) + 0.1);
        // s3d: dynamic segment
        hl(a.id, [5], W("s3d", 2), 2.4); show(N.slg, W("s3d", 8), { s: 0.7, d: 0.6 }); drawLine(L1.slg, W("s3d", 8) + 0.1);
        show(chip(sid, "s3-u1", { x: 830, y: 660, html: "/products/trail-runner", cls: "g", fs: 24 }), W("s3d", 9), { s: 0.7, d: 0.5 });
        show(chip(sid, "s3-u2", { x: 830, y: 720, html: "params.slug = \"trail-runner\"", cls: "e", fs: 24 }), W("s3d", 11), { s: 0.7, d: 0.5 });
        // s3e/f: layout route and outlet
        hide("#s3-u1, #s3-u2", L("s3e", 0.3), 0.4);
        hl(a.id, [2], W("s3e", 6), 2.0);
        tl.to(N.lay, { boxShadow: "0 0 0 8px rgba(34,211,238,.8)", duration: 0.4 }, W("s3e", 6)); tl.to(N.lay, { boxShadow: "0 8px 0 rgba(0,0,0,.3)", duration: 0.5 }, W("s3e", 11));
        show(chip(sid, "s3-o", { x: 830, y: 660, html: "&lt;Outlet /&gt; renders the child", cls: "b", fs: 24 }), W("s3f", 7), { s: 0.7, d: 0.5 });
        drawLine(L1.crt, W("s3e", 2)); show(N.crt, W("s3e", 2), { s: 0.7, d: 0.6 });
        // s3g/h: header stays, page changes; loaders in parallel
        const pageSeq = [N.idx, N.prd, N.slg, N.crt];
        pageSeq.forEach((s, i) => { tl.to(s, { boxShadow: "0 0 0 8px rgba(244,114,182,.9)", duration: 0.25 }, W("s3g", 4) + i * 0.55); tl.to(s, { boxShadow: "0 8px 0 rgba(0,0,0,.3)", duration: 0.3 }, W("s3g", 4) + i * 0.55 + 0.5); });
        tl.to(N.lay, { boxShadow: "0 0 0 8px rgba(34,211,238,.8)", duration: 0.3 }, W("s3g", 2)); tl.to(N.lay, { boxShadow: "0 8px 0 rgba(0,0,0,.3)", duration: 0.4 }, LE("s3g", 0.1));
        hide("#s3-o", L("s3h", 0.2), 0.4);
        const lds = [["s3-ld0", 1425, 250], ["s3-ld1", 1450, 385], ["s3-ld2", 985, 488]].map(([id, x, y]) => chip(sid, id, { x, y: y + 4, html: "loader", cls: "e", fs: 20 }));
        lds.forEach((s) => { show(s, W("s3h", 9), { s: 0.4, d: 0.4 }); pulse(s, W("s3h", 11), 1.4); hide(s, W("s3h", 11) + 1.6, 0.4); });
        // s3i: prefix
        swap("#s3-a", "#s3-b", L("s3i", 0.0));
        hl(b.id, [1], W("s3i", 1), 1.6);
        show(N.acc, W("s3i", 20), { s: 0.7, d: 0.6 }); drawLine(L1.acc, W("s3i", 20) + 0.1);
        show(N.ord, W("s3i", 22), { s: 0.7, d: 0.6 }); drawLine(L1.ord, W("s3i", 22) + 0.1);
        show(N.set, W("s3i", 24), { s: 0.7, d: 0.6 }); drawLine(L1.set, W("s3i", 24) + 0.1);
        // s3j/k: splat
        swap("#s3-b", "#s3-c", L("s3k", 0.0));
        hl(c.id, [1], W("s3k", 1), 2.0); show(N.spl, W("s3k", 4), { s: 0.7, d: 0.6 }); drawLine(L1.spl, W("s3k", 4) + 0.1);
        show(chip(sid, "s3-u3", { x: 1440, y: 800, html: "/nothing-here → 404", cls: "f", fs: 24 }), W("s3k", 12), { s: 0.7, d: 0.5 });
        // s3l/m: file routes
        swap("#s3-c", "#s3-f", L("s3m", 0.2));
        hl(f.id, [5], W("s3m", 2), 2.4);
        leave(sid);
      })();

      // ---------- 4 · Route modules ----------
      (function () {
        const sid = "s4";
        enter(sid);
        mk(sid, '<div class="card c-violet" id="s4-card" style="left:110px;top:235px;width:520px;height:570px"><div class="hd">a route module (.tsx)</div></div>');
        fade("#s4-card", L("s4a", 0.3), 0.6);
        const rows = [["default", "the component", "s4a", 11, "b"], ["loader", "reads data", "s4b", 6, "e"], ["action", "writes data", "s4b", 8, "d"], ["meta", "head tags", "s4b", 9, "c"], ["links", "stylesheets", "s4b", 10, "c"], ["headers", "HTTP headers", "s4b", 11, "c"], ["ErrorBoundary", "when it fails", "s4b", 15, "f"]];
        rows.forEach(([name, what, lid, wi, col], i) => {
          const y = 310 + i * 70;
          const sel = chip(sid, "s4-r" + i, { x: 140, y, html: name, cls: col, fs: 24 });
          const sel2 = note(sid, "s4-rn" + i, { x: 390, y: y + 4, html: what, style: "font-size:24px;color:var(--muted);font-weight:600" });
          show(sel, W(lid, wi), { s: 0.6, d: 0.5, x: -30 }); show(sel2, W(lid, wi) + 0.15, { s: 0.9, d: 0.5 });
        });
        const t = codePanel(sid, "s4-types", { name: "app/routes/product.tsx", code: "types", x: 700, y: 235, w: 1100, fs: 28 });
        fade("#s4-types", W("s4c", 7), 0.6);
        hl(t.id, [1], W("s4c", 11), 2.0);
        show(tag(sid, "s4-g1", { x: 700, y: 630, html: "generated for every route", cls: "cy", fs: 26 }), W("s4c", 13), { s: 0.7, d: 0.5 });
        hl(t.id, [3], W("s4e", 4), 1.6);
        show(tag(sid, "s4-g2", { x: 700, y: 700, html: "params.slug: string", cls: "li", fs: 26 }), W("s4e", 6), { s: 0.7, d: 0.5 });
        hl(t.id, [5, 6, 7], W("s4e", 10), 2.4);
        show(tag(sid, "s4-g3", { x: 700, y: 770, html: "loaderData and actionData: typed", cls: "vi", fs: 26 }), W("s4e", 10), { s: 0.7, d: 0.5 });
        leave(sid);
      })();

      // ---------- 5 · How data flows ----------
      (function () {
        const sid = "s5";
        enter(sid);
        const big = "font-size:30px;padding:16px 12px;";
        const A = box(sid, "s5-A", { x: 130, y: 300, w: 300, cls: "c1", html: "Request<small>GET /products</small>", style: big });
        const B = box(sid, "s5-B", { x: 620, y: 300, w: 300, cls: "c2", html: "Loaders<small>read data on the server</small>", style: big });
        const C = box(sid, "s5-C", { x: 1110, y: 300, w: 300, cls: "c5", html: "Components<small>render with loaderData</small>", style: big });
        const D = box(sid, "s5-D", { x: 1110, y: 560, w: 300, cls: "c1", html: "Form submit<small>POST /cart</small>", style: big });
        const E = box(sid, "s5-E", { x: 620, y: 560, w: 300, cls: "c3", html: "Action<small>write data on the server</small>", style: big });
        const lAB = line(sid, "s5-lAB", { x1: 432, y1: 350, x2: 616, y2: 350, arrow: "ahC", w: 6 });
        const lBC = line(sid, "s5-lBC", { x1: 922, y1: 350, x2: 1106, y2: 350, arrow: "ahV", w: 6 });
        const lCD = line(sid, "s5-lCD", { x1: 1260, y1: 410, x2: 1260, y2: 556, arrow: "ahW", w: 6 });
        const lDE = line(sid, "s5-lDE", { x1: 1108, y1: 610, x2: 924, y2: 610, arrow: "ahP", w: 6 });
        const lEB = line(sid, "s5-lEB", { x1: 770, y1: 556, x2: 770, y2: 414, arrow: "ahP", w: 6 });
        [A, B, C, D, E, lAB, lBC, lCD, lDE, lEB].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        const glow = (sel, t, col = "rgba(244,114,182,.9)") => { tl.to(sel, { boxShadow: "0 0 0 8px " + col, duration: 0.3 }, t); tl.to(sel, { boxShadow: "0 8px 0 rgba(0,0,0,.3)", duration: 0.5 }, t + 1.2); };
        // request -> loaders -> components
        show(A, W("s5b", 0), { s: 0.7, d: 0.6 });
        const p1 = packet(sid, "s5-p1", { x: 445, y: 322, html: "request", cls: "cy" }); fly(p1, W("s5b", 2), 165, 0, 1.0);
        drawLine(lAB, W("s5b", 3)); show(B, W("s5b", 4), { s: 0.7, d: 0.6 }); glow(B, W("s5b", 5), "rgba(167,139,250,.9)");
        const p2 = packet(sid, "s5-p2", { x: 935, y: 322, html: "data", cls: "li" }); fly(p2, W("s5b", 12), 165, 0, 1.0);
        drawLine(lBC, W("s5b", 13)); show(C, W("s5b", 14), { s: 0.7, d: 0.6 }); glow(C, W("s5b", 19), "rgba(134,239,172,.9)");
        // form -> action -> loaders again
        drawLine(lCD, W("s5d", 0)); show(D, W("s5d", 0) + 0.2, { s: 0.7, d: 0.6 });
        drawLine(lDE, W("s5d", 4)); show(E, W("s5d", 5), { s: 0.7, d: 0.6 }); glow(E, W("s5d", 8));
        drawLine(lEB, W("s5d", 11)); show(chip(sid, "s5-again", { x: 790, y: 470, html: "loaders run again", cls: "d", fs: 24 }), W("s5d", 12), { s: 0.7, d: 0.5 });
        glow(B, W("s5d", 13), "rgba(167,139,250,.9)"); glow(C, W("s5d", 18), "rgba(134,239,172,.9)");
        // read, write, read again
        show(chip(sid, "s5-t1", { x: 640, y: 240, html: "1 read", cls: "b", fs: 26 }), W("s5e", 0), { s: 0.6, d: 0.5 });
        show(chip(sid, "s5-t2", { x: 640, y: 700, html: "2 write", cls: "d", fs: 26 }), W("s5e", 1), { s: 0.6, d: 0.5 });
        show(chip(sid, "s5-t3", { x: 900, y: 240, html: "3 read again", cls: "e", fs: 26 }), W("s5e", 2), { s: 0.6, d: 0.5 });
        const x1 = chip(sid, "s5-x1", { x: 1160, y: 700, html: "copy server data into state", cls: "f", fs: 24 });
        const x2 = chip(sid, "s5-x2", { x: 1160, y: 760, html: "refresh it by hand", cls: "f", fs: 24 });
        show(x1, W("s5e", 6), { s: 0.6, d: 0.5 }); strike(x1, W("s5e", 8)); show(x2, W("s5e", 14), { s: 0.6, d: 0.5 }); strike(x2, W("s5e", 16));
        // state is for the interface only
        hide("#s5-A, #s5-B, #s5-C, #s5-D, #s5-E, #s5-lAB, #s5-lBC, #s5-lCD, #s5-lDE, #s5-lEB, #s5-again, #s5-t1, #s5-t2, #s5-t3, #s5-x1, #s5-x2, #s5-p1, #s5-p2", L("s5g", 0.0), 0.5);
        const ui = box(sid, "s5-ui", { x: 180, y: 290, w: 740, h: 420, cls: "c3", html: "" });
        const sv = box(sid, "s5-sv", { x: 1000, y: 290, w: 740, h: 420, cls: "c2", html: "" });
        mk(sid, '<div class="tag pk" id="s5-uit" style="left:200px;top:270px;font-size:30px">UI state: useState</div>');
        mk(sid, '<div class="tag vi" id="s5-svt" style="left:1020px;top:270px;font-size:30px">Server data: loaders</div>');
        [ui, sv, "#s5-uit", "#s5-svt"].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        show(ui, W("s5g", 0), { s: 0.9, d: 0.6 }); show("#s5-uit", W("s5g", 0), { s: 0.7, d: 0.5 });
        [["an open menu", 4], ["a focused input", 7], ["a selected tab", 10]].forEach(([t, wi], i) => show(chip(sid, "s5-u" + i, { x: 230, y: 360 + i * 90, html: t, cls: "d", fs: 28 }), W("s5g", wi), { s: 0.6, d: 0.5 }));
        show(sv, W("s5g", 12), { s: 0.9, d: 0.6 }); show("#s5-svt", W("s5g", 12), { s: 0.7, d: 0.5 });
        [["the product list", 13], ["the cart", 14], ["the signed in user", 16]].forEach(([t, wi], i) => show(chip(sid, "s5-s" + i, { x: 1050, y: 360 + i * 90, html: t, cls: "a", fs: 28 }), W("s5g", wi) + i * 0.15, { s: 0.6, d: 0.5 }));
        // server, browser, both
        hide("#s5-ui, #s5-sv, #s5-uit, #s5-svt, #s5-u0, #s5-u1, #s5-u2, #s5-s0, #s5-s1, #s5-s2", L("s5h", 0.0), 0.5);
        const zone = (id, x, col, title) => mk(sid, '<div class="zone" id="' + id + '" style="left:' + x + 'px;top:280px;width:520px;height:420px;border-color:' + col + '"><div class="zl" style="color:' + col + '">' + title + "</div></div>");
        zone("s5-zs", 110, "#a78bfa", "on the server"); zone("s5-zb", 700, "#22d3ee", "in the browser"); zone("s5-zc", 1290, "#f472b6", "in both places");
        ["#s5-zs", "#s5-zb", "#s5-zc"].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        show("#s5-zs", L("s5h", 0.2), { s: 0.9, d: 0.6 }); show(chip(sid, "s5-z1", { x: 150, y: 370, html: "loader", cls: "a", fs: 30 }), W("s5h", 0), { s: 0.6, d: 0.5 }); show(chip(sid, "s5-z2", { x: 150, y: 450, html: "action", cls: "a", fs: 30 }), W("s5h", 2), { s: 0.6, d: 0.5 });
        show("#s5-zb", W("s5h", 7) - 0.2, { s: 0.9, d: 0.6 }); show(chip(sid, "s5-z3", { x: 740, y: 370, html: "clientLoader", cls: "b", fs: 30 }), W("s5h", 7), { s: 0.6, d: 0.5 }); show(chip(sid, "s5-z4", { x: 740, y: 450, html: "clientAction", cls: "b", fs: 30 }), W("s5h", 9), { s: 0.6, d: 0.5 });
        show("#s5-zc", W("s5h", 14) - 0.2, { s: 0.9, d: 0.6 }); show(chip(sid, "s5-z5", { x: 1330, y: 370, html: "components", cls: "d", fs: 30 }), W("s5h", 15), { s: 0.6, d: 0.5 });
        leave(sid);
      })();

      // ---------- 6 · Fetching data from an API ----------
      (function () {
        const sid = "s6";
        enter(sid);
        const c1 = codePanel(sid, "s6-c1", { name: "app/routes/product.tsx", code: "product-loader", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw });
        const c2 = codePanel(sid, "s6-c2", { name: "app/routes/cart.tsx", code: "cart-loader", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw });
        const c3 = codePanel(sid, "s6-c3", { name: "app/routes/products.tsx", code: "products-loader", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw });
        const c4 = codePanel(sid, "s6-c4", { name: "app/routes/shop-layout.tsx", code: "root-data", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw });
        tl.set("#s6-c2, #s6-c3, #s6-c4", { opacity: 0 }, 0);
        fade("#s6-c1", L("s6a", 0.3), 0.6);
        // architecture: browser -> your server -> catalog API
        const big = "font-size:28px;padding:14px 10px;";
        const Bw = box(sid, "s6-bw", { x: 1090, y: 240, w: 380, cls: "c1", html: "Browser<small>asks for the page</small>", style: big });
        const Sv = box(sid, "s6-sv", { x: 1090, y: 440, w: 380, cls: "c2", html: "Your server<small>the loader runs here</small>", style: big });
        const Ap = box(sid, "s6-ap", { x: 1090, y: 640, w: 380, cls: "c4", html: "Catalog API<small>products and reviews</small>", style: big });
        const l1 = line(sid, "s6-l1", { x1: 1280, y1: 335, x2: 1280, y2: 438, arrow: "ahC", w: 6 });
        const l2 = line(sid, "s6-l2", { x1: 1280, y1: 535, x2: 1280, y2: 638, arrow: "ahV", w: 6 });
        [Bw, Sv, Ap, l1, l2].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        show(Bw, L("s6a", 0.3), { s: 0.7, d: 0.6 }); show(Ap, W("s6a", 7), { s: 0.7, d: 0.6 }); show(Sv, W("s6a", 10), { s: 0.7, d: 0.6 });
        drawLine(l1, W("s6a", 10) + 0.3); drawLine(l2, W("s6a", 11) + 0.2);
        hl(c1.id, [2, 3, 4], W("s6a", 13), 2.4);
        const pf = packet(sid, "s6-pf", { x: 1300, y: 555, html: "fetch", cls: "cy" }); fly(pf, W("s6a", 13), 0, 70, 0.9);
        hl(c1.id, [14], W("s6a", 19), 1.2); hl(c1.id, [7], W("s6a", 21), 1.6);
        const pj = packet(sid, "s6-pj", { x: 1300, y: 625, html: "JSON", cls: "li" }); fly(pj, W("s6a", 21), 0, -70, 0.9);
        const ph = packet(sid, "s6-ph", { x: 1300, y: 425, html: "HTML", cls: "pk" }); fly(ph, W("s6a", 22) + 0.9, 0, -85, 0.9);
        // why not useEffect?  (a column of crossed-out habits)
        const y1 = chip(sid, "s6-y1", { x: 1530, y: 250, html: "useEffect", cls: "f", fs: 24 });
        const y2 = chip(sid, "s6-y2", { x: 1530, y: 315, html: "blank screen", cls: "f", fs: 24 });
        const y3 = chip(sid, "s6-y3", { x: 1530, y: 380, html: "loading flag", cls: "f", fs: 24 });
        show(y1, W("s6b", 6), { s: 0.6, d: 0.5 }); strike(y1, L("s6c", 0.5));
        show(y2, W("s6c", 10), { s: 0.6, d: 0.5 }); strike(y2, W("s6c", 10) + 0.6); show(y3, W("s6c", 13), { s: 0.6, d: 0.5 }); strike(y3, W("s6c", 13) + 0.6);
        show(tag(sid, "s6-r1", { x: 1500, y: 470, html: "runs on your server", cls: "li", fs: 22 }), W("s6c", 20), { s: 0.7, d: 0.5 });
        show(tag(sid, "s6-r2", { x: 1500, y: 560, html: "no CORS", cls: "cy", fs: 24 }), W("s6d", 3), { s: 0.7, d: 0.5 });
        show(tag(sid, "s6-r3", { x: 1500, y: 640, html: "API key stays here", cls: "vi", fs: 22 }), W("s6d", 7), { s: 0.7, d: 0.5 });
        // parallel loaders
        const off = "#s6-bw, #s6-sv, #s6-ap, #s6-l1, #s6-l2, #s6-y1, #s6-y2, #s6-y3, #s6-r1, #s6-r2, #s6-r3, #s6-pf, #s6-pj, #s6-ph";
        hide(off, L("s6e", 0.1), 0.4);
        note(sid, "s6-lt", { x: 1110, y: 250, html: "time →", style: "font-size:24px;color:var(--muted);font-weight:700" });
        mk(sid, '<div class="seg" id="s6-b1" style="left:1110px;top:310px;width:520px;height:56px;background:var(--violet);line-height:56px;font-size:24px">layout loader</div>');
        mk(sid, '<div class="seg" id="s6-b2" style="left:1110px;top:390px;width:660px;height:56px;background:var(--cyan);line-height:56px;font-size:24px">page loader</div>');
        [ "#s6-lt", "#s6-b1", "#s6-b2"].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        fade("#s6-lt", W("s6e", 5), 0.5); tl.set("#s6-b1, #s6-b2", { opacity: 1 }, W("s6e", 5));
        grow("#s6-b1", W("s6e", 12), 1.8); grow("#s6-b2", W("s6e", 12), 2.6);
        show(tag(sid, "s6-same", { x: 1110, y: 480, html: "they start at the same time", cls: "li", fs: 26 }), W("s6e", 12), { s: 0.7, d: 0.5 });
        // two calls in one loader
        swap("#s6-c1", "#s6-c2", L("s6f", 0.0));
        hide("#s6-lt, #s6-b1, #s6-b2, #s6-same", L("s6f", 0.1), 0.4);
        mk(sid, '<div class="seg" id="s6-f1" style="left:1110px;top:310px;width:560px;height:56px;background:var(--amber);line-height:56px;font-size:24px">fetch product A</div>');
        mk(sid, '<div class="seg" id="s6-f2" style="left:1110px;top:390px;width:660px;height:56px;background:var(--amber);line-height:56px;font-size:24px">fetch product B</div>');
        tl.set("#s6-f1, #s6-f2", { opacity: 0 }, 0); tl.set("#s6-f1, #s6-f2", { opacity: 1 }, W("s6f", 6));
        hl(c2.id, [3, 4, 5, 6, 7, 8], W("s6f", 6), 2.6); grow("#s6-f1", W("s6f", 6), 2.0); grow("#s6-f2", W("s6f", 6), 2.8);
        hl(c2.id, [2, 10], W("s6f", 13), 1.8);
        show(chip(sid, "s6-all", { x: 1110, y: 480, html: "Promise.all: wait for both", cls: "e", fs: 26 }), W("s6f", 13), { s: 0.7, d: 0.5 });
        // failures
        swap("#s6-c2", "#s6-c3", L("s6h", 0.0));
        hide("#s6-f1, #s6-f2, #s6-all", L("s6g", 0.2), 0.4);
        hl(c3.id, [7], W("s6h", 1), 1.8); hl(c3.id, [8], W("s6h", 6), 1.8);
        const e1 = box(sid, "s6-e1", { x: 1090, y: 260, w: 640, cls: "c6", html: "API answers 502", style: "font-size:28px" });
        const e2 = box(sid, "s6-e2", { x: 1090, y: 420, w: 640, cls: "c3", html: "throw data(\"Catalog unavailable\", { status: 502 })", style: "font-size:22px;font-family:var(--mono)" });
        const e3 = box(sid, "s6-e3", { x: 1090, y: 580, w: 640, cls: "c4", html: "ErrorBoundary renders", style: "font-size:28px" });
        const el1 = line(sid, "s6-el1", { x1: 1410, y1: 350, x2: 1410, y2: 418, arrow: "ahP", w: 6 }); const el2 = line(sid, "s6-el2", { x1: 1410, y1: 512, x2: 1410, y2: 578, arrow: "ahP", w: 6 });
        [e1, e2, e3, el1, el2].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        show(e1, W("s6h", 2), { s: 0.7, d: 0.5 }); drawLine(el1, W("s6h", 5)); show(e2, W("s6h", 6), { s: 0.7, d: 0.5 }); drawLine(el2, W("s6h", 12)); show(e3, W("s6h", 13), { s: 0.7, d: 0.5 });
        // what a loader can return
        hide("#s6-e1, #s6-e2, #s6-e3, #s6-el1, #s6-el2", L("s6i", 0.1), 0.4);
        [["strings", 4], ["numbers", 5], ["dates", 6], ["maps", 7], ["sets", 8], ["promises", 11]].forEach(([t, wi], i) => show(chip(sid, "s6-k" + i, { x: 1110 + (i % 2) * 330, y: 280 + Math.floor(i / 2) * 90, html: t, cls: ["a", "b", "c", "d", "e", "f"][i], fs: 30 }), W("s6i", wi), { s: 0.6, d: 0.5 }));
        show(tag(sid, "s6-typed", { x: 1110, y: 590, html: "loaderData is typed for you", cls: "li", fs: 28 }), W("s6i", 15), { s: 0.7, d: 0.5 });
        // useRouteLoaderData: the cart count in the header
        hide("#s6-k0, #s6-k1, #s6-k2, #s6-k3, #s6-k4, #s6-k5, #s6-typed", L("s6j", 0.1), 0.4);
        swap("#s6-c3", "#s6-c4", L("s6j", 0.0));
        const w = browserWin(sid, "s6-w", { x: SPLIT.px, y: SPLIT.py + 40, w: SPLIT.pw, frames: ["add-done"] });
        show("#s6-w", W("s6j", 8), { s: 0.9, d: 0.8 }); w.frame("add-done", W("s6j", 8) + 0.2);
        hl(c4.id, [1], W("s6j", 11), 2.2); hl(c4.id, [3], W("s6j", 16), 2.6);
        show(tag(sid, "s6-cc", { x: 1470, y: 240, html: "cart count", cls: "pk", fs: 26 }), W("s6j", 19), { s: 0.7, d: 0.5 });
        // client loader teaser
        show(tag(sid, "s6-cl", { x: 1110, y: 810, html: "browser-only data: clientLoader (later)", cls: "cy", fs: 26 }), W("s6k", 9), { s: 0.7, d: 0.5 });
        leave(sid);
      })();

      // ---------- 7 · Loaders ----------
      (function () {
        const sid = "s7";
        enter(sid);
        const c1 = codePanel(sid, "s7-c1", { name: "app/routes/products.tsx", code: "products-loader", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw });
        const cc = codePanel(sid, "s7-cc", { name: "same file: the component", code: "products-component", x: SPLIT.cx, y: SPLIT.cy + c1.h + 28, w: SPLIT.cw });
        const c2 = codePanel(sid, "s7-c2", { name: "app/routes/product.tsx", code: "product-loader", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw });
        const c3 = codePanel(sid, "s7-c3", { name: "app/routes/products.tsx", code: "products-form", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 26 });
        tl.set("#s7-cc, #s7-c2, #s7-c3", { opacity: 0 }, 0);
        const w = browserWin(sid, "s7-w", { x: SPLIT.px, y: SPLIT.py, w: SPLIT.pw, frames: ["products", "product-404", "products-mug"] });
        fade("#s7-c1", L("s7a", 0.3), 0.6);
        hl(c1.id, [1], W("s7a", 10), 3.0); hl(c1.id, [10], W("s7a", 17), 1.8);
        show("#s7-w", W("s7a", 7), { s: 0.9, d: 0.8 }); w.frame("products", W("s7a", 7) + 0.2);
        fade("#s7-cc", W("s7b", 0), 0.6); hl(cc.id, [1, 2, 3], W("s7b", 5), 1.6); hl(cc.id, [4], W("s7b", 7), 2.0);
        // the .server boundary
        hide("#s7-w", L("s7d", 0.1), 0.4);
        const zs = mk(sid, '<div class="zone" id="s7-zs" style="left:1090px;top:235px;width:330px;height:440px;border-color:#a78bfa"><div class="zl" style="color:#a78bfa">server bundle</div></div>');
        const zb = mk(sid, '<div class="zone" id="s7-zb" style="left:1450px;top:235px;width:350px;height:440px;border-color:#22d3ee"><div class="zl" style="color:#22d3ee">browser bundle</div></div>');
        tl.set("#s7-zs, #s7-zb", { opacity: 0 }, 0);
        show("#s7-zs", W("s7d", 2), { s: 0.9, d: 0.6 }); show("#s7-zb", W("s7d", 2) + 0.2, { s: 0.9, d: 0.6 });
        show(chip(sid, "s7-z1", { x: 1115, y: 320, html: "db.server.ts", cls: "a", fs: 26 }), W("s7d", 12), { s: 0.6, d: 0.5 });
        show(chip(sid, "s7-z2", { x: 1115, y: 400, html: "loader", cls: "a", fs: 26 }), W("s7d", 25), { s: 0.6, d: 0.5 });
        show(chip(sid, "s7-z3", { x: 1485, y: 320, html: "components", cls: "b", fs: 26 }), W("s7d", 17), { s: 0.6, d: 0.5 });
        show(tag(sid, "s7-z4", { x: 1455, y: 700, html: "never bundled for the browser", cls: "co", fs: 24 }), W("s7d", 16), { s: 0.7, d: 0.5 });
        show(tag(sid, "s7-z5", { x: 1090, y: 700, html: "no API layer needed", cls: "li", fs: 26 }), W("s7f", 0), { s: 0.7, d: 0.5 });
        // first visit and later navigations
        hide("#s7-zs, #s7-zb, #s7-z1, #s7-z2, #s7-z3, #s7-z4, #s7-z5", L("s7g", 0.1), 0.4);
        show("#s7-w", L("s7g", 0.3), { s: 0.9, d: 0.7 });
        show(tag(sid, "s7-f1", { x: 1090, y: 790, html: "first visit: HTML arrives with the products", cls: "cy", fs: 24 }), W("s7g", 10), { s: 0.7, d: 0.5 });
        hide("#s7-f1", W("s7g", 19) - 0.2, 0.3);
        show(tag(sid, "s7-f2", { x: 1090, y: 790, html: "next: React Router fetches the loader data", cls: "vi", fs: 24 }), W("s7g", 19), { s: 0.7, d: 0.5 });
        // product page and 404
        swap("#s7-c1", "#s7-c2", L("s7h", 0.0)); hide("#s7-cc, #s7-f2", L("s7h", 0.0), 0.4);
        hl(c2.id, [2, 3], W("s7h", 5), 1.6); hl(c2.id, [7], W("s7h", 7), 1.6);
        hl(c2.id, [5, 6], W("s7j", 0), 3.0); w.frame("product-404", W("s7j", 6), 0.4);
        show(tag(sid, "s7-n1", { x: 1090, y: 790, html: "the nearest ErrorBoundary renders it", cls: "co", fs: 24 }), W("s7j", 8), { s: 0.7, d: 0.5 });
        // search lives in the URL
        hide("#s7-n1", L("s7k", 0.1), 0.4); swap("#s7-c2", "#s7-c3", L("s7k", 0.0));
        hl(c3.id, [1], W("s7k", 7), 2.2); hl(c3.id, [3], W("s7k", 12), 1.6);
        w.frame("products-mug", W("s7k", 15), 0.4);
        swap("#s7-c3", "#s7-c1", L("s7l", 0.0)); hide("#s7-cc", L("s7l", 0.0), 0.2);
        hl(c1.id, [2], W("s7l", 5), 1.4); hl(c1.id, [3], W("s7l", 10), 1.8); hl(c1.id, [4, 5, 6], W("s7l", 13), 1.8);
        ["shared", "bookmarked", "survives a refresh"].forEach((t, i) => show(tag(sid, "s7-u" + i, { x: 1090 + i * 220, y: 790, html: t, cls: ["cy", "vi", "li"][i], fs: 22 }), W("s7n", [4, 5, 8][i]), { s: 0.7, d: 0.5 }));
        leave(sid);
      })();

      // ---------- 8 · Navigation and pending UI ----------
      (function () {
        const sid = "s8";
        enter(sid);
        // Link renders a real anchor
        const lk = chip(sid, "s8-lk", { x: 200, y: 330, html: "&lt;Link to=\"/products\"&gt;", cls: "b", fs: 30 });
        const la = arrowText(sid, "s8-la", { x: 620, y: 322, html: "→" });
        const an = chip(sid, "s8-an", { x: 720, y: 330, html: "&lt;a href=\"/products\"&gt;", cls: "e", fs: 30 });
        [lk, la, an].forEach((s) => tl.set(s, { opacity: 0 }, 0));
        show(lk, W("s8a", 1), { s: 0.6, d: 0.5 }); show(la, W("s8a", 6), { s: 0.6, d: 0.5 }); show(an, W("s8a", 7), { s: 0.6, d: 0.5 });
        show(tag(sid, "s8-lt", { x: 200, y: 430, html: "works before JavaScript loads", cls: "li", fs: 28 }), W("s8a", 12), { s: 0.7, d: 0.5 });
        // NavLink: active and pending
        hide("#s8-lk, #s8-la, #s8-an, #s8-lt", L("s8b", 0.1), 0.4);
        const n = codePanel(sid, "s8-n", { name: "app/routes/shop-layout.tsx", code: "nav", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 21 });
        const w = browserWin(sid, "s8-w", { x: SPLIT.px, y: SPLIT.py, w: SPLIT.pw, frames: ["home", "nav-pending"] });
        tl.set("#s8-n", { opacity: 0 }, 0);
        fade("#s8-n", L("s8b", 0.3), 0.6); hl(n.id, [9, 10], W("s8b", 1), 2.0);
        show("#s8-w", W("s8b", 3), { s: 0.9, d: 0.8 }); w.frame("home", W("s8b", 3) + 0.2);
        hl(n.id, [1, 2, 3, 4, 5, 6, 7], W("s8b", 11), 4.4);
        w.click("nav-pending", W("s8d", 1), 1.0); w.frame("nav-pending", W("s8d", 2), 0.3);
        show(tag(sid, "s8-t1", { x: 1090, y: 790, html: "Home: active", cls: "cy", fs: 24 }), W("s8b", 11), { s: 0.7, d: 0.5 });
        show(tag(sid, "s8-t2", { x: 1310, y: 790, html: "Products: pending", cls: "pk", fs: 24 }), W("s8d", 3), { s: 0.7, d: 0.5 });
        // global progress bar with useNavigation
        hide("#s8-t1, #s8-t2", L("s8e", 0.1), 0.4);
        const pr = codePanel(sid, "s8-pr", { name: "app/routes/shop-layout.tsx", code: "progress", x: SPLIT.cx, y: SPLIT.cy, w: SPLIT.cw, fs: 27 });
        tl.set("#s8-pr", { opacity: 0 }, 0); swap("#s8-n", "#s8-pr", L("s8e", 0.0));
        hl(pr.id, [1], W("s8e", 8), 1.6); hl(pr.id, [3], W("s8e", 9), 4.0); hl(pr.id, [5], W("s8e", 17), 3.0);
        show(tag(sid, "s8-t3", { x: 1090, y: 790, html: "progress bar while the loaders run", cls: "pk", fs: 24 }), W("s8e", 17), { s: 0.7, d: 0.5 });
        // redirect
        hide("#s8-t3", L("s8f", 0.1), 0.4);
        const g = codePanel(sid, "s8-g", { name: "app/routes/checkout.tsx", code: "checkout-guard", x: SPLIT.cx, y: SPLIT.cy + 250, w: SPLIT.cw, fs: 24 });
        tl.set("#s8-g", { opacity: 0 }, 0); fade("#s8-g", L("s8f", 0.3), 0.6); hl(g.id, [6], W("s8f", 4), 2.6);
        hide("#s8-w", L("s8f", 0.0), 0.4);
        show(chip(sid, "s8-r1", { x: 1110, y: 300, html: "/checkout", cls: "g", fs: 28 }), W("s8f", 2), { s: 0.6, d: 0.5 });
        show(arrowText(sid, "s8-ra", { x: 1340, y: 292, html: "→" }), W("s8f", 5), { s: 0.6, d: 0.5 });
        show(chip(sid, "s8-r2", { x: 1420, y: 300, html: "redirect(\"/cart\")", cls: "d", fs: 28 }), W("s8f", 5), { s: 0.6, d: 0.5 });
        show(tag(sid, "s8-r3", { x: 1110, y: 390, html: "the cart is empty, so go back", cls: "li", fs: 24 }), W("s8f", 7), { s: 0.7, d: 0.5 });
        // useNavigate
        hide("#s8-pr, #s8-g, #s8-r1, #s8-ra, #s8-r2, #s8-r3", L("s8g", 0.0), 0.4);
        const nv = codePanel(sid, "s8-nv", { name: "useNavigate (docs example)", code: "navigate", x: SPLIT.cx, y: SPLIT.cy, w: 760, fs: 30 });
        tl.set("#s8-nv", { opacity: 0 }, 0); fade("#s8-nv", W("s8g", 0), 0.6); hl(nv.id, [4], W("s8g", 16), 2.0);
        show(tag(sid, "s8-nt", { x: 110, y: 470, html: "rare: only when the user is not clicking", cls: "vi", fs: 28 }), W("s8g", 5), { s: 0.7, d: 0.5 });
        leave(sid);
      })();
