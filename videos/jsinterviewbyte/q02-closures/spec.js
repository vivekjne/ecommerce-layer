      // Q2: closures, explained with "scope boxes" and "backpacks"
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // hook: function + remembered variables
      const hA = box("h-a", { x: 60, y: 540, w: 400, h: 260, cls: "c1", fs: 46, html: 'inner function<small>runs later</small>' });
      const hP = note("h-p", { x: 460, y: 620, w: 160, fs: 90, html: "+" });
      const hB = box("h-b", { x: 620, y: 540, w: 400, h: 260, cls: "c2", fs: 46, html: 'its variables<small>the "backpack"</small>' });
      const hC = box("h-c", { x: 160, y: 860, w: 760, h: 170, cls: "c5", fs: 64, html: '= a <code>closure</code>' });
      appear(hA, WD("s1b", "function")); appear(hP, WD("s1b", "remembers")); appear(hB, WD("s1b", "variables")); appear(hC, L("s1c", 0.2));

      // scope = a private box of variables, thrown away when the function ends
      wipe(L("s2a", -0.15));
      const sz = zone("sz", { x: 60, y: 520, w: 960, h: 400, label: "scope of one function", color: "#22d3ee", bg: "rgba(34,211,238,.08)" });
      const sc1 = cell("sc1", { x: 120, y: 640, w: 380, h: 150, label: "variable", html: "total = 10", fs: 46, border: "#22d3ee" });
      const sc2 = cell("sc2", { x: 560, y: 640, w: 380, h: 150, label: "variable", html: 'name = "Ada"', fs: 46, border: "#22d3ee" });
      appear(sz, WD("s2a", "box")); appear(sc1, WD("s2a", "variables")); appear(sc2, WD("s2a", "variables") + 0.4);
      const scN = note("scn", { x: 60, y: 960, w: 960, fs: 48, html: 'private to the <b>function</b>' });
      appear(scN, WD("s2a", "scope"));
      tl.to([sz, sc1, sc2], { scale: 0.05, opacity: 0, duration: 0.6, transformOrigin: "50% 50%", ease: "power2.in" }, WD("s2b", "thrown"));
      tl.set(scN, { opacity: 0 }, WD("s2b", "thrown"));
      const gN = pill("gn", { x: 330, y: 700, cls: "co", fs: 70, html: "gone" });
      appear(gN, WD("s2b", "gone"));

      // the counter, step by step
      wipe(L("s3a", -0.15));
      const F = codeBlock("cF", { y: 480, fs: 34, name: "makeCounter", lines: SL(0, 1, 7) });
      lineHide(F, [1, 2, 3, 4, 5, 6, 7]);
      appear(F.sel, L("s3a", 0.1), { y: 20 });
      lineIn(F, [1, 7], WD("s3a", "makeCounter"), 0); lineIn(F, [2], WD("s3a", "let"));
      lineIn(F, [3, 4, 5, 6], WD("s3a", "return"), 0.35);
      const z2 = zone("z2", { x: 60, y: 900, w: 480, h: 270, label: "makeCounter scope", color: "#22d3ee", bg: "rgba(34,211,238,.08)" });
      const cnt = cell("cnt", { x: 100, y: 985, w: 300, h: 140, label: "let", html: "count = 0", fs: 44, border: "#22d3ee" });
      const fnT = tok("fnT", { x: 640, y: 940, cls: "a", fs: 40, html: "inner function" });
      const arr1 = line("arr1", { x1: 545, y1: 1000, x2: 630, y2: 975, c: "V", w: 6 });
      appear(z2, WD("s3a", "variable")); appear(cnt, WD("s3a", "count")); appear(fnT, WD("s3a", "inner")); drawLine(arr1, WD("s3a", "function") - 0.1);
      const endP = pill("endp", { x: 90, y: 1195, cls: "co", fs: 36, html: "outer function ended" });
      const need = line("need", { x1: 670, y1: 1010, x2: 405, y2: 1070, c: "R", w: 6, dash: true });
      tint(z2, WD("s3b", "ends"), "#fb7185"); appear(endP, WD("s3b", "ends")); drawLine(need, WD("s3b", "needs") - 0.2);
      const bp = cell("bp", { x: 590, y: 1030, w: 420, h: 150, label: "backpack = closure", html: "count = 0", fs: 46, border: "#fbbf24" });
      const bpL = line("bpl", { x1: 800, y1: 1000, x2: 800, y2: 1025, c: "A", w: 6 });
      tint(z2, WD("s3c", "keeps"), "#86efac");
      gone(z2, WD("s3c", "backpack")); gone(cnt, WD("s3c", "backpack")); gone(arr1, WD("s3c", "backpack")); gone(need, WD("s3c", "backpack")); gone(endP, WD("s3c", "backpack"));
      appear(bp, WD("s3c", "backpack")); drawLine(bpL, WD("s3c", "backpack") + 0.3);
      const clP = pill("clp", { x: 640, y: 1205, cls: "li", fs: 40, html: "closure" });
      appear(clP, WD("s3c", "closure", 0));

      // using it
      const K = codeBlock("cK", { y: 480, fs: 40, name: "using it", lines: [
        "const counter = makeCounter();", ["counter()", "1"], ["counter()", "2"],
        "const other = makeCounter();", ["other()", "1"], ["typeof count", '"undefined"'] ] });
      lineHide(K, [1, 2, 3, 4, 5, 6]);
      gone(F.sel, L("s4a", -0.05)); gone(clP, L("s4a", -0.05));
      appear(K.sel, L("s4a", -0.05), { y: 20 });
      swapHTML(fnT, "counter", L("s4a", 0.1)); pulse(fnT, L("s4a", 0.1), 1.2);
      lineIn(K, [1], L("s4a", 0.1)); lineIn(K, [2], WD("s4a", "opens"));
      tint(bp, WD("s4a", "opens"), "#fde68a");
      swapHTML("#bp .vl", "count = 1", WD("s4a", "adds") + 0.5); pulse("#bp .vl", WD("s4a", "adds") + 0.5, 1.2);
      resIn(K, 2, WD("s4a", "one", 1));
      lineIn(K, [3], L("s4b", 0.1));
      swapHTML("#bp .vl", "count = 2", WD("s4b", "two") - 0.4); pulse("#bp .vl", WD("s4b", "two") - 0.4, 1.2);
      resIn(K, 3, WD("s4b", "two"));
      const fnO = tok("fnO", { x: 120, y: 940, cls: "c", fs: 40, html: "other" });
      const bp2 = cell("bp2", { x: 50, y: 1030, w: 420, h: 150, label: "backpack #2", html: "count = 0", fs: 46, border: "#22d3ee" });
      const bp2L = line("bp2l", { x1: 190, y1: 1000, x2: 190, y2: 1025, c: "C", w: 6 });
      lineIn(K, [4, 5], L("s4c", 0.1), 0.6);
      appear(fnO, WD("s4c", "second")); appear(bp2, WD("s4c", "brand")); drawLine(bp2L, WD("s4c", "brand") + 0.3);
      swapHTML("#bp2 .vl", "count = 1", WD("s4c", "one") - 0.3); pulse("#bp2 .vl", WD("s4c", "one") - 0.3, 1.2);
      resIn(K, 5, WD("s4c", "one"));
      lineIn(K, [6], L("s4d", 0.1)); resIn(K, 6, WD("s4d", "undefined"));
      const pv = pill("pv", { x: 300, y: 1215, cls: "vi", fs: 38, html: LOCK + " private" });
      appear(pv, WD("s4d", "touch"));

      // the loop trap: var shares one backpack, let gives each turn its own
      wipe(L("s5a", -0.15));
      const timerHTML = (n) => "timer " + n + "<small>console.log(i)</small>";
      const V = codeBlock("cV", { y: 480, fs: 38, name: "var", lines: SL(1, 1, 3) });
      appear(V.sel, L("s5a", 0.5), { y: 20 });
      const vt = [0, 1, 2].map((i) => tok("vt" + i, { x: 70 + i * 320, y: 750, cls: "c", fs: 34, html: timerHTML(i + 1) }));
      const vi = cell("vi", { x: 330, y: 1010, w: 420, h: 150, label: "one shared variable", html: "i = 0", fs: 50, border: "#f472b6" });
      const vl = [[190, 830, 450, 1005], [460, 830, 530, 1005], [780, 830, 620, 1005]].map((p, i) => line("vl" + i, { x1: p[0], y1: p[1], x2: p[2], y2: p[3], c: "P", w: 6 }));
      appear(vi, WD("s5b", "shared"));
      vt.forEach((t, i) => appear(t, WD("s5b", "timers") + i * 0.3, { y: 10 }));
      vl.forEach((l, i) => drawLine(l, WD("s5b", "same") + i * 0.25));
      const tI = WD("s5c", "loop");
      ["i = 1", "i = 2", "i = 3"].forEach((v, k) => { swapHTML("#vi .vl", v, tI + k * 0.4); pulse("#vi .vl", tI + k * 0.4, 1.25); });
      vt.forEach((t, i) => { const w = WD("s5c", "three", i + 1); swapHTML(t, "prints 3<small>same i</small>", w); pulse(t, w, 1.2); });
      // let
      const T5 = L("s5d", 0.05);
      gone(V.sel, T5); gone(vi, T5); vt.forEach((t) => gone(t, T5)); vl.forEach((l) => gone(l, T5));
      const Lt = codeBlock("cL", { y: 480, fs: 38, name: "let", lines: SL(2, 1, 3) });
      appear(Lt.sel, T5 + 0.1, { y: 20 });
      lineHl(Lt, [1], WD("s5d", "let"), 2.0);
      const lt = [0, 1, 2].map((i) => tok("lt" + i, { x: 70 + i * 320, y: 750, cls: "c", fs: 34, html: timerHTML(i + 1) }));
      const lc = [0, 1, 2].map((i) => cell("lc" + i, { x: 60 + i * 330, y: 1010, w: 300, h: 150, label: "own copy", html: "i = " + i, fs: 46, border: ["#a78bfa", "#22d3ee", "#fbbf24"][i] }));
      const ll = [0, 1, 2].map((i) => line("ll" + i, { x1: 135 + i * 320 + 60, y1: 830, x2: 210 + i * 330, y2: 1005, c: ["V", "C", "A"][i], w: 6 }));
      lc.forEach((c, i) => appear(c, WD("s5d", "fresh") + i * 0.4)); lt.forEach((t, i) => appear(t, WD("s5d", "fresh") + i * 0.4, { y: 10 }));
      ll.forEach((l, i) => drawLine(l, WD("s5d", "fresh") + 0.4 + i * 0.4));
      [["zero", 0], ["one", 1], ["two", 2]].forEach(([w, i]) => { const t = WD("s5d", w); swapHTML(lt[i], "prints " + i + "<small>its own i</small>", t); pulse(lt[i], t, 1.2); });

      // factory
      wipe(L("s6a", -0.15));
      const M = codeBlock("cM", { y: 480, fs: 36, name: "function factory", lines: [...SL(3, 1, 5), ["add5(3)", "8"], ["add10(3)", "13"]] });
      lineHide(M, [1, 2, 3, 4, 5, 6, 7]);
      appear(M.sel, L("s6b", 0.1), { y: 20 });
      lineIn(M, [1, 2, 3], L("s6b", 0.1), 0.3); lineIn(M, [4, 5], WD("s6b", "number"), 0.4);
      const f5 = tok("f5", { x: 120, y: 940, cls: "a", fs: 40, html: "add5" });
      const f10 = tok("f10", { x: 640, y: 940, cls: "c", fs: 40, html: "add10" });
      const b5 = cell("b5", { x: 50, y: 1030, w: 420, h: 150, label: "backpack", html: "n = 5", fs: 46, border: "#a78bfa" });
      const b10 = cell("b10", { x: 590, y: 1030, w: 420, h: 150, label: "backpack", html: "n = 10", fs: 46, border: "#fbbf24" });
      const l5 = line("l5", { x1: 190, y1: 1000, x2: 190, y2: 1025, c: "V", w: 6 });
      const l10 = line("l10", { x1: 710, y1: 1000, x2: 710, y2: 1025, c: "A", w: 6 });
      appear(f5, WD("s6b", "remembers")); appear(b5, WD("s6b", "remembers") + 0.3); drawLine(l5, WD("s6b", "remembers") + 0.6);
      appear(f10, WD("s6b", "gave")); appear(b10, WD("s6b", "gave") + 0.3); drawLine(l10, WD("s6b", "gave") + 0.6);
      lineIn(M, [6], WD("s6c", "five") - 0.3); tint(b5, WD("s6c", "five"), "#fde68a"); resIn(M, 6, WD("s6c", "eight"));
      lineIn(M, [7], WD("s6c", "ten") - 0.3); tint(b10, WD("s6c", "ten"), "#fde68a"); resIn(M, 7, WD("s6c", "thirteen"));

      // wrap
      wipe(L("s7a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 170, cls: "c1", fs: 56, html: 'Private state' });
      const w2 = box("w2", { x: 60, y: 700, w: 960, h: 170, cls: "c2", fs: 56, html: 'Function factories' });
      const w3 = box("w3", { x: 60, y: 900, w: 960, h: 170, cls: "c3", fs: 56, html: 'Callbacks with memory' });
      appear(w1, WD("s7a", "private")); appear(w2, WD("s7a", "factories")); appear(w3, WD("s7a", "callbacks"));
      const w4 = box("w4", { x: 60, y: 1110, w: 960, h: 150, cls: "c5", fs: 50, html: 'closure = function + backpack' });
      appear(w4, L("s7b", 0.4));
      cheer("#sam", L("s7c", 0.3));
