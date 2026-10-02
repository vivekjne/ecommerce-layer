      // Semantic HTML & landmarks. One visual idea per sentence; every role shown was read from
      // Chromium's accessibility tree (verify_a11y.mjs -> verified.txt).

      // ---- helpers
      const chapEl = document.createElement("div");
      chapEl.style.cssText = "position:absolute;left:50px;top:385px;width:440px;z-index:12;font:800 32px Inter,Arial,sans-serif;color:#1f2140;background:#22d3ee;border-radius:18px;padding:12px 22px;line-height:1.2;box-shadow:0 6px 0 rgba(0,0,0,.3)";
      document.getElementById("root").appendChild(chapEl);
      tl.set(chapEl, { opacity: 0 }, 0);
      function chapter(text, t) { tl.set(chapEl, { innerHTML: text, opacity: 1 }, t); tl.fromTo(chapEl, { x: -30 }, { x: 0, duration: 0.5, ease: E, immediateRender: false }, t); }
      function moveTo(sel, t, from, to, dur = 1.0, ease = "power2.inOut") { tl.fromTo(sel, { x: from[0], y: from[1] }, { x: to[0], y: to[1], duration: dur, ease, immediateRender: false }, t); }
      const stampIn = (sel, t) => { tl.fromTo(sel, { scale: 2.2, rotation: -10 }, { scale: 1, rotation: -4, duration: 0.45, ease: "back.out(2)", immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t); };
      const allowOverlap = (...sels) => sels.forEach((s) => document.querySelector(s).setAttribute("data-layout-allow-overlap", ""));
      const sceneStart = (id) => wipe(S(id));
      // focus ring that glides between rectangles
      function ring(id, r, t) {
        mk('<div id="' + id + '" style="left:0;top:0;width:100px;height:100px;z-index:8;filter:drop-shadow(0 0 10px rgba(251,191,36,.9))"><svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible"><rect x="0" y="0" width="100" height="100" rx="6" fill="none" stroke="#fbbf24" stroke-width="7" vector-effect="non-scaling-stroke"/></svg></div>', id);
        tl.set("#" + id, { x: r.x, y: r.y, scaleX: r.w / 100, scaleY: r.h / 100, transformOrigin: "0 0" }, 0);
        tl.set("#" + id, { opacity: 1 }, t);
        allowOverlap("#" + id);
        return { sel: "#" + id, r };
      }
      function ringTo(rg, r, t, dur = 0.7) {
        const a = rg.r;
        tl.fromTo(rg.sel, { x: a.x, y: a.y, scaleX: a.w / 100, scaleY: a.h / 100 }, { x: r.x, y: r.y, scaleX: r.w / 100, scaleY: r.h / 100, duration: dur, ease: "power2.inOut", immediateRender: false, transformOrigin: "0 0" }, t);
        rg.r = r;
      }
      function key(id, label, x, y, t) {
        const s = tok(id, { x, y, w: label.length > 2 ? 150 : 90, cls: "g", fs: 40, html: label });
        appear(s, t, { s: 0.6 });
        tl.fromTo(s, { y: 0 }, { y: 8, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, t + 0.5);
        return s;
      }
      const R = (x, y, w, h) => ({ x, y, w, h });
      // the big shop page
      const BIG = { hdr: R(90, 520, 900, 145), srch: R(270, 535, 220, 62), nav: R(520, 535, 450, 62), main: R(90, 685, 600, 395), aside: R(710, 685, 280, 395), ftr: R(90, 1100, 900, 90) };
      function bigPage(p, t, withSearch) {
        const b = {};
        b.hdr = box(p + "hdr", { ...BIG.hdr, cls: "c1", fs: 26, html: "" });
        b.logo = lab(p + "logo", { x: 112, y: 545, fs: 40, html: "Shop" });
        b.nav = box(p + "nav", { ...BIG.nav, cls: "c2", fs: 28, html: "Home · Deals · Help" });
        b.main = box(p + "main", { ...BIG.main, cls: "c3", fs: 30, html: '<div style="font-size:54px;font-weight:900;text-align:left;width:100%">Summer sale</div><div style="display:flex;gap:22px;margin-top:34px"><div style="background:#26306e;border-radius:14px;padding:50px 46px">Shoes</div><div style="background:#26306e;border-radius:14px;padding:50px 46px">Bags</div></div>' });
        b.aside = box(p + "aside", { ...BIG.aside, cls: "c4", fs: 30, html: "Related<small>you may also like</small>" });
        b.ftr = box(p + "ftr", { ...BIG.ftr, cls: "c5", fs: 28, html: "© 2026 Shop" });
        ["hdr", "logo", "nav", "main", "aside", "ftr"].forEach((k, i) => appear(b[k], t + i * 0.12, { y: 14 }));
        return b;
      }
      // tag chip on a block's top edge
      const tagAt = (id, r, txt, t) => { const s = tok(id, { x: r.x + 14, y: r.y - 20, cls: "g", fs: 22, html: txt }); appear(s, t, { s: 0.6 }); return s; };

      document.querySelector("#qcard h1").style.fontSize = "36px";
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // ================= 1. hook =================
      chapter("Semantic HTML", L("s1a", 0));
      const pg = bigPage("a", L("s1a", 0.2));
      const nice = pill("nice", { x: 720, y: 1110, cls: "li", fs: 32, html: TICK + " looks perfect" });
      appear(nice, WD("s1a", "perfect"));
      gone(nice, L("s1b", 0));
      // x-ray scan line sweeps the page
      mk('<div id="scan" style="left:80px;top:510px;width:920px;height:10px;border-radius:5px;background:#22d3ee;box-shadow:0 0 30px #22d3ee;z-index:9"></div>', "scan");
      allowOverlap("#scan");
      tl.set("#scan", { opacity: 1 }, WD("s1b", "structure") - 0.6);
      moveTo("#scan", WD("s1b", "structure") - 0.6, [0, 0], [0, 690], 1.8, "none");
      tl.set("#scan", { opacity: 0 }, WD("s1b", "structure") + 1.3);
      const divTags = [["hdr", BIG.hdr], ["nav", BIG.nav], ["main", BIG.main], ["aside", BIG.aside], ["ftr", BIG.ftr]].map(([k, r], i) => tagAt("t1" + k, r, "&lt;div&gt;", L("s1c", 0.3 + i * 0.3)));
      const allDiv = box("alldiv", { x: 300, y: 860, w: 480, h: 110, cls: "c6", fs: 44, html: "all &lt;div&gt;" });
      appear(allDiv, WD("s1c", "div"));
      allowOverlap(allDiv);

      // ================= 2. the accessibility tree =================
      sceneStart("s2");
      chapter("1 · Under the hood", S("s2") + 0.2);
      const MINI = { hdr: R(60, 520, 440, 60), nav: R(60, 595, 440, 50), main: R(60, 660, 290, 230), aside: R(365, 660, 135, 230), ftr: R(60, 905, 440, 55) };
      function miniPage(p, labels, t) {
        const b = {};
        const cls = { hdr: "c1", nav: "c2", main: "c3", aside: "c4", ftr: "c5" };
        Object.keys(MINI).forEach((k, i) => { b[k] = box(p + k, { ...MINI[k], cls: cls[k], fs: k === "aside" ? 22 : 26, html: labels[k] }); appear(b[k], t + i * 0.1, { y: 10 }); });
        return b;
      }
      const m2 = miniPage("m2", { hdr: "&lt;div&gt; Shop", nav: "&lt;div&gt; Home · Deals", main: "&lt;div&gt; Summer sale", aside: "&lt;div&gt;", ftr: "&lt;div&gt; © 2026" }, S("s2") + 0.3);
      const treeHd = lab("treehd", { x: 560, y: 515, fs: 34, html: "accessibility tree" });
      appear(treeHd, WD("s2a", "accessibility"));
      const rowsT = ["generic", "generic", "generic", "generic", "generic"];
      const rowEls = rowsT.map((r, i) => tok("tr" + i, { x: 560, y: 580 + i * 72, w: 300, cls: "g", fs: 32, html: "role: " + r }));
      const nm = tok("trn", { x: 880, y: 580, w: 140, cls: "c", fs: 28, html: "name" });
      appear(nm, WD("s2a", "name"));
      const roleChip = tok("trr", { x: 880, y: 650, w: 140, cls: "b", fs: 28, html: "role" });
      appear(roleChip, WD("s2a", "role"));
      gone(nm, L("s2b", 0)); gone(roleChip, L("s2b", 0));
      rowEls.forEach((r, i) => appear(r, WD("s2b", "generic") - 0.3 + i * 0.25, { y: 10 }));
      const ttl = tok("ttl", { x: 560, y: 945, w: 460, cls: "f", fs: 30, html: '"Summer sale": just text' });
      appear(ttl, WD("s2b", "title"));
      const noH = pill("noh", { x: 640, y: 1015, cls: "co", fs: 32, html: CROSS + " not a heading" });
      appear(noH, WD("s2b", "heading"));
      // line by line: a highlight walks every block while the speech bubble reads it out
      const sr = cell("sr", { x: 60, y: 985, w: 440, h: 130, label: "screen reader says", html: "…", fs: 34, border: "#f472b6" });
      appear(sr, L("s2c", 0.1));
      const rd = ring("rd", MINI.hdr, L("s2c", 0.2));
      const order = [["hdr", "“Shop”"], ["nav", "“Home”"], ["nav", "“Deals”"], ["main", "“Summer sale”"], ["main", "“Shoes”"], ["aside", "“Related”"], ["ftr", "“© 2026”"]];
      const tA = L("s2c", 0.4), tB = LE("s2c", 0.6), stp = (tB - tA) / order.length;
      order.forEach(([k, said], i) => { if (i) ringTo(rd, MINI[k], tA + i * stp, 0.4); tl.set("#sr .vl", { innerHTML: said }, tA + i * stp + 0.1); });
      const slow = pill("slow", { x: 60, y: 1140, cls: "co", fs: 30, html: "every line, in order: no shortcuts" });
      appear(slow, WD("s2c", "everything"));

      // ================= 3. landmarks =================
      sceneStart("s3");
      chapter("2 · Landmarks", S("s3") + 0.2);
      const pg3 = bigPage("b", S("s3") + 0.3);
      const semTags = { hdr: "&lt;header&gt;", nav: "&lt;nav&gt;", main: "&lt;main&gt;", aside: "&lt;aside&gt;", ftr: "&lt;footer&gt;" };
      const words3 = { hdr: "header", nav: "nav", main: "main", aside: "aside", ftr: "footer" };
      Object.keys(semTags).forEach((k) => {
        const s = tok("t3" + k, { x: BIG[k].x + 14, y: BIG[k].y - 20, cls: "g", fs: 22, html: "&lt;div&gt;" });
        appear(s, S("s3") + 0.6);
        const tw = WD("s3a", words3[k]);
        tl.set(s, { innerHTML: semTags[k], backgroundColor: "#fbbf24" }, tw); pulse(s, tw, 1.3);
      });
      // landmark role chips (verified in Chromium: banner, navigation, main, complementary, contentinfo)
      const chipAt = (id, x, y, txt, cls, t) => { const s = pill(id, { x, y, cls, fs: 28, html: txt }); appear(s, t, { s: 0.6 }); return s; };
      chipAt("rbn", 105, 612, "banner", "cy", WD("s3b", "banner"));
      chipAt("rnv", 760, 607, "navigation", "vi", WD("s3b", "navigation"));
      chipAt("rmn", 500, 700, "main", "pk", WD("s3b", "Main", 0) + 0.2);
      chipAt("rcm", 720, 1030, "complementary", "", WD("s3c", "complementary"));
      chipAt("rci", 800, 1122, "contentinfo", "li", WD("s3c", "info"));
      // the search element
      const sb = box("srch", { ...BIG.srch, cls: "c6", fs: 26, html: "Search…" });
      appear(sb, WD("s3d", "search") - 0.2);
      const st = tok("t3s", { x: BIG.srch.x + 14, y: BIG.srch.y - 20, cls: "c", fs: 22, html: "&lt;search&gt;" });
      appear(st, WD("s3d", "search"));
      chipAt("rsr", 300, 612, "search", "co", WD("s3d", "landmark"));

      // ================= 4. jumping =================
      sceneStart("s4");
      chapter("3 · Jumping around", S("s4") + 0.2);
      const m4 = miniPage("m4", { hdr: "banner", nav: "navigation", main: "main", aside: "compl.", ftr: "contentinfo" }, S("s4") + 0.3);
      const lmPanel = cell("lmp", { x: 560, y: 510, w: 460, h: 470, label: "landmarks list", html: "", fs: 30, border: "#22d3ee" });
      appear(lmPanel, L("s4a", 0.1));
      const lms = [["banner", "hdr"], ["navigation", "nav"], ["main", "main"], ["complementary", "aside"], ["contentinfo", "ftr"]];
      const lmRows = lms.map(([n], i) => tok("lr" + i, { x: 590, y: 570 + i * 78, w: 400, cls: "g", fs: 30, html: n }));
      lmRows.forEach((r, i) => appear(r, L("s4a", 0.5 + i * 0.3), { y: 8 }));
      const rg4 = ring("rg4", MINI.hdr, L("s4a", 2.0));
      const hiRow = (i, t) => { lmRows.forEach((r, j) => tl.set(r, { backgroundColor: j === i ? "#fbbf24" : "#e5e7ff" }, t)); };
      hiRow(0, L("s4a", 2.0));
      // NVDA: D, then JAWS: R
      const kd = key("kd", "D", 560, 1010, WD("s4b", "D"));
      const tD = WD("s4b", "D") + 0.4, tR = WD("s4b", "R");
      [1, 2, 3].forEach((i, n) => { ringTo(rg4, MINI[lms[i][1]], tD + n * ((tR - tD) / 3), 0.45); hiRow(i, tD + n * ((tR - tD) / 3)); });
      const kr = key("kr", "R", 680, 1010, tR);
      ringTo(rg4, MINI.ftr, tR + 0.4, 0.45); hiRow(4, tR + 0.4);
      const kl = lab("kl", { x: 800, y: 1022, fs: 28, html: "NVDA: <b>D</b> · JAWS: <b>R</b>" });
      appear(kl, WD("s4b", "JAWS"));
      // skip link
      const skip = tok("skip", { x: 60, y: 990, w: 440, cls: "c", fs: 30, html: "Skip to main content" });
      appear(skip, WD("s4c", "skip"));
      ringTo(rg4, R(60, 990, 440, 62), WD("s4c", "skip") + 0.2, 0.5);
      const kt = key("kt", "Tab", 560, 1100, WD("s4c", "skip"));
      ringTo(rg4, MINI.main, WD("s4c", "jump"), 0.8); hiRow(2, WD("s4c", "jump"));

      // ================= 5. gotchas =================
      sceneStart("s5");
      chapter("4 · Gotchas", S("s5") + 0.2);
      const q5 = note("q5", { x: 60, y: 620, w: 960, fs: 54, html: "every &lt;header&gt; is a <b>banner</b>?" });
      appear(q5, L("s5a", 0.2)); gone(q5, L("s5b", 0));
      const G = codeBlock("gt", { y: 500, fs: 32, name: "what Chromium exposes", lines: [
        ["<header> on the page", "banner"],
        ["<header> inside <article>", "not a landmark"],
        ["<section> with no name", "generic"],
        ['<section aria-labelledby>', 'region "Reviews"'],
      ] });
      lineHide(G, [1, 2, 3, 4]);
      appear(G.sel, L("s5b", 0.1), { y: 20 });
      lineIn(G, [1], WD("s5b", "page")); resIn(G, 1, WD("s5b", "page") + 0.4);
      lineIn(G, [2], WD("s5b", "article")); resIn(G, 2, WD("s5b", "article") + 0.6);
      // a small article card with its own header strip
      const art = zone("art", { x: 60, y: 800, w: 460, h: 280, label: "article", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      const artH = box("arth", { x: 90, y: 860, w: 400, h: 80, cls: "c2", fs: 28, html: "header: “Shoes”" });
      const artP = lab("artp", { x: 100, y: 970, fs: 26, html: "belongs to the article,<br>not the page" });
      appear(art, WD("s5b", "article")); appear(artH, WD("s5b", "article") + 0.3); appear(artP, WD("s5b", "header", 1));
      lineIn(G, [3], WD("s5c", "section")); resIn(G, 3, WD("s5c", "section") + 0.6);
      lineIn(G, [4], WD("s5c", "name")); resIn(G, 4, WD("s5c", "aria-labelledby"));
      const sec = codeBlock("sec", { x: 560, w: 460, y: 800, fs: 26, name: "named section", lines: ['<section aria-labelledby="r">', '  <h2 id="r">Reviews</h2>', "</section>"] });
      lineHide(sec, [1, 2, 3]);
      appear(sec.sel, WD("s5c", "heading") - 0.2, { y: 20 }); lineIn(sec, [1, 2, 3], WD("s5c", "heading"), 0.25);
      lineHl(sec, [1, 2], WD("s5c", "aria-labelledby"), 2.0);
      const oneMain = box("onemain", { x: 560, y: 1020, w: 460, h: 110, cls: "c3", fs: 34, html: "one &lt;main&gt; per page" });
      appear(oneMain, L("s5d", 0.2)); pulse(oneMain, WD("s5d", "one"), 1.1);

      // ================= 6. headings =================
      sceneStart("s6");
      chapter("5 · Headings", S("s6") + 0.2);
      const m6 = miniPage("m6", { hdr: "banner", nav: "navigation", main: "", aside: "", ftr: "contentinfo" }, S("s6") + 0.3);
      const signs = [["h1", "Summer sale", 75, 675, "c"], ["h2", "Shoes", 95, 745, "e"], ["h2", "Bags", 95, 810, "e"], ["h2", "Related", 372, 675, "e"]];
      const sgEls = signs.map(([h, t, x, y, c], i) => tok("sg" + i, { x, y, cls: c, fs: 24, html: "<b>" + h + "</b> " + t }));
      sgEls.forEach((s, i) => appear(s, WD("s6a", "signs") + i * 0.3, { y: 10 }));
      const lmTxt = lab("lmtxt", { x: 560, y: 560, fs: 40, html: "landmarks = <b>rooms</b>" });
      const hTxt = lab("htxt", { x: 560, y: 630, fs: 40, html: "headings = <b>signs</b>" });
      appear(lmTxt, WD("s6a", "rooms")); appear(hTxt, WD("s6a", "signs"));
      // the survey (WebAIM Screen Reader User Survey #10, 2024)
      const T6b = L("s6b", -0.1);
      [lmTxt, hTxt].forEach((e) => gone(e, T6b));
      const qcd = box("qcd", { x: 560, y: 510, w: 460, h: 150, cls: "c1", fs: 28, html: "WebAIM survey, 2024<small>“How do you find information on a long page?”</small>" });
      appear(qcd, L("s6b", 0.2));
      const bars = [["headings", 71.6, "e"], ["find (Ctrl+F)", 13.6, "c"], ["read it all", 6.4, "g"], ["links", 4.8, "g"], ["landmarks", 3.7, "g"]];
      bars.forEach(([n, v, c], i) => {
        const y = 690 + i * 78;
        const lb = lab("bl" + i, { x: 560, y: y + 6, fs: 24, html: n });
        const b = tok("bb" + i, { x: 720, y, w: Math.max(24, Math.round(v / 71.6 * 230)), h: 46, cls: c, fs: 20, html: "" });
        const nv = lab("bn" + i, { x: 960, y: y + 6, fs: 24, html: v + "%" });
        const tt = WD("s6c", "Almost") + i * 0.25;
        appear(lb, tt); appear(nv, tt + 0.6); tl.set(b, { scaleX: 0.02, transformOrigin: "0% 50%" }, 0); tl.set(b, { opacity: 1 }, tt); tl.to(b, { scaleX: 1, duration: 0.9, ease: E }, tt);
      });
      pulse("#bb0", WD("s6c", "headings"), 1.15);
      // heading outline: good vs skipped
      const T6d = L("s6d", -0.1);
      [qcd, ...[0, 1, 2, 3, 4].flatMap((i) => ["#bl" + i, "#bb" + i, "#bn" + i])].forEach((e) => gone(e, T6d));
      const good = codeBlock("good", { x: 560, w: 460, y: 520, fs: 30, name: "good outline", lines: ["h1 Summer sale", "  h2 Shoes", "    h3 Running", "  h2 Bags"] });
      const bad = codeBlock("bad", { x: 560, w: 460, y: 800, fs: 30, name: "skipped level", lines: ["h1 Summer sale", "        h4 Shoes"] });
      appear(good.sel, WD("s6d", "h1")); lineHl(good, [1], WD("s6d", "h1"), 1.6);
      appear(bad.sel, WD("s6d", "skip")); lineHl(bad, [2], WD("s6d", "skip") + 0.3, 2.4, "rgba(251,113,133,.35)");
      const fsz = pill("fsz", { x: 560, y: 1000, cls: "co", fs: 30, html: "level = structure, not font size" });
      appear(fsz, WD("s6d", "structure"));

      // ================= 7. lists and labels =================
      sceneStart("s7");
      chapter("6 · Lists & labels", S("s7") + 0.2);
      const L1 = codeBlock("l1", { x: 60, w: 460, y: 520, fs: 32, name: "a real list", lines: ["<ul>", "  <li>Shoes</li>", "  <li>Bags</li>", "  <li>Hats</li>", "</ul>"] });
      appear(L1.sel, L("s7a", 0.2), { y: 20 });
      const said7 = cell("said7", { x: 560, y: 560, w: 460, h: 140, label: "the tree", html: "list · 3 items", fs: 40, border: "#86efac" });
      appear(said7, WD("s7a", "many"));
      const F1 = codeBlock("f1", { x: 60, w: 460, y: 860, fs: 28, name: "labelled", lines: ['<label for="e">Email</label>', '<input id="e">'] });
      const F2 = codeBlock("f2", { x: 560, w: 460, y: 860, fs: 28, name: "no label", lines: ["<div>Email</div>", "<input>"] });
      appear(F1.sel, WD("s7b", "label")); appear(F2.sel, WD("s7b", "Without"));
      const n1 = pill("n1", { x: 60, y: 1050, cls: "li", fs: 32, html: 'textbox “Email”' });
      const n2 = pill("n2", { x: 560, y: 1050, cls: "co", fs: 32, html: "textbox (no name)" });
      appear(n1, WD("s7b", "name")); appear(n2, WD("s7b", "no"));

      // ================= 8. buttons =================
      sceneStart("s8");
      chapter("7 · Buttons", S("s8") + 0.2);
      const B = { inp: R(60, 520, 460, 90), div: R(60, 650, 460, 90), rb: R(60, 780, 460, 90), btn: R(60, 910, 460, 90) };
      const bInp = box("binp", { ...B.inp, cls: "c1", fs: 30, html: "&lt;input&gt;" });
      const bDiv = box("bdiv", { ...B.div, cls: "c6", fs: 30, html: "&lt;div onclick&gt; Buy" });
      const bRb = box("brb", { ...B.rb, cls: "c4", fs: 28, html: '&lt;div role="button" tabindex="0"&gt;' });
      const bBtn = box("bbtn", { ...B.btn, cls: "c5", fs: 30, html: "&lt;button&gt; Buy" });
      appear(bDiv, L("s8a", 0.3));
      appear(bInp, L("s8b", 0.2)); appear(bBtn, L("s8b", 0.4));
      const rg8 = ring("rg8", B.inp, WD("s8b", "Tab") - 0.2);
      const kt8 = key("kt8", "Tab", 560, 540, WD("s8b", "Tab"));
      // Tab from the input skips the div and lands on the button (verified tab order)
      ringTo(rg8, B.btn, WD("s8b", "Tab") + 0.5, 0.8);
      const skp = pill("skp", { x: 560, y: 670, cls: "co", fs: 30, html: "skipped · no role" });
      appear(skp, WD("s8b", "skipped")); shakeEl(bDiv, WD("s8b", "skipped"));
      // role=button + tabindex: focusable, but keys do nothing
      appear(bRb, L("s8c", 0.2));
      ringTo(rg8, B.rb, WD("s8c", "focus") - 0.3, 0.6);
      const fok = pill("fok", { x: 560, y: 800, cls: "li", fs: 30, html: TICK + " focus" });
      appear(fok, WD("s8c", "focus"));
      const log8 = consoleBox("log8", { x: 560, w: 460, y: 1030, fs: 30, rows: [["(nothing happened)", "no"], ["button clicked", "cy"], ["button clicked", "cy"]] });
      const ke = key("ke", "Enter", 560, 900, WD("s8d", "Enter"));
      const ks = key("ks", "Space", 730, 900, WD("s8d", "Space"));
      appear(log8.sel, WD("s8d", "Enter") + 0.3);
      rowIn(log8, 0, WD("s8d", "nothing"));
      // the real button
      gone(fok, L("s8e", 0)); gone(skp, L("s8e", 0));
      ringTo(rg8, B.btn, L("s8e", 0.2), 0.6);
      gone(ke, L("s8e", 0)); gone(ks, L("s8e", 0));
      const ke2 = key("ke2", "Enter", 560, 900, WD("s8e", "keys") - 0.6);
      const ks2 = key("ks2", "Space", 730, 900, WD("s8e", "keys") - 0.1);
      rowIn(log8, 1, WD("s8e", "keys") - 0.1); rowIn(log8, 2, WD("s8e", "keys") + 0.4);
      const freeChips = [["focus", "focus,"], ["Enter + Space", "keys,"], ["role: button", "role,"]].map(([t, w], i) => { const s = pill("fc" + i, { x: 560 + (i % 2) * 230, y: 660 + Math.floor(i / 2) * 70, cls: "li", fs: 28, html: TICK + " " + t }); appear(s, WD("s8e", w.replace(/,/g, ""))); return s; });
      const rule = box("rule", { x: 60, y: 1030, w: 460, h: 180, cls: "c2", fs: 32, html: "1st rule of ARIA<small>use the native element when one exists</small>" });
      gone(ke2, L("s8f", 0)); gone(ks2, L("s8f", 0));
      appear(rule, WD("s8f", "rule"));

      // ================= 9. wrap =================
      sceneStart("s9");
      chapter("Remember", S("s9") + 0.2);
      const pg9 = bigPage("c", S("s9") + 0.3);
      [["hdr", "&lt;header&gt;"], ["nav", "&lt;nav&gt;"], ["main", "&lt;main&gt;"], ["aside", "&lt;aside&gt;"], ["ftr", "&lt;footer&gt;"]].forEach(([k, t], i) => { const s = tok("t9" + k, { x: BIG[k].x + 14, y: BIG[k].y - 20, cls: "c", fs: 22, html: t }); appear(s, S("s9") + 0.8 + i * 0.15); });
      chipAt("w9a", 105, 612, "banner", "cy", WD("s9b", "Same") );
      chipAt("w9b", 760, 607, "navigation", "vi", WD("s9b", "Same") + 0.15);
      chipAt("w9c", 500, 700, "main", "pk", WD("s9b", "Same") + 0.3);
      chipAt("w9d", 720, 1030, "complementary", "", WD("s9b", "Same") + 0.45);
      chipAt("w9e", 800, 1122, "contentinfo", "li", WD("s9b", "Same") + 0.6);
      const every = pill("every", { x: 110, y: 1012, cls: "li", fs: 38, html: TICK + " everyone can find their way" });
      appear(every, WD("s9b", "everyone"));
      cheer("#sam", LE("s9b", -0.4));
