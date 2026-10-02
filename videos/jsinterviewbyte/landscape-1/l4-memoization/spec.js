      // Q4: memoization: a notepad (cache) in front of a function
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      const hf = box("hf", { x: 60, y: 560, w: 420, h: 220, cls: "c2", fs: 52, html: '<code>function</code><small>does the work</small>' });
      const hc = box("hc", { x: 600, y: 560, w: 420, h: 220, cls: "c4", fs: 52, html: 'cache<small>remembers the results</small>' });
      const hlk = line("hl", { x1: 490, y1: 670, x2: 590, y2: 670, c: "A", w: 8 });
      appear(hf, WD("s1b", "function")); appear(hc, WD("s1b", "remembering")); drawLine(hlk, WD("s1b", "remembering") + 0.2);
      const hn = note("hn", { x: 60, y: 860, w: 960, fs: 48, html: 'same call twice? <b>work it out once</b>' });
      appear(hn, WD("s1b", "twice"));

      // the idea: check the notepad first
      wipe(L("s2a", -0.15));
      const i1 = tok("i1", { x: 60, y: 640, cls: "b", fs: 46, html: "input" });
      const i2 = box("i2", { x: 280, y: 590, w: 280, h: 150, cls: "c4", fs: 40, html: 'in the notepad?' });
      const i3 = box("i3", { x: 690, y: 490, w: 330, h: 130, cls: "c5", fs: 36, html: 'yes → read the answer' });
      const i4 = box("i4", { x: 690, y: 710, w: 330, h: 150, cls: "c6", fs: 34, html: 'no → calculate, write it down' });
      const l1 = line("il1", { x1: 190, y1: 665, x2: 270, y2: 665, c: "W", w: 7 });
      const l2 = line("il2", { x1: 565, y1: 620, x2: 680, y2: 560, c: "L", w: 7 });
      const l3 = line("il3", { x1: 565, y1: 710, x2: 680, y2: 770, c: "R", w: 7 });
      appear(i1, WD("s2a", "calculator")); appear(i2, WD("s2a", "notepad")); drawLine(l1, WD("s2a", "notepad") + 0.2);
      appear(i3, WD("s2a", "answer") - 0.2); drawLine(l2, WD("s2a", "answer") - 0.3); appear(i4, WD("s2a", "Before") + 0.1); drawLine(l3, WD("s2a", "Before") + 0.1);
      appear(i4, WD("s2a", "check") + 0.6); drawLine(l3, WD("s2a", "check") + 0.5);

      // the code
      wipe(L("s3a", -0.15));
      tl.set([i1, i2, i3, i4, l1, l2, l3], { opacity: 0 }, L("s3a", -0.15));
      const M = codeBlock("cM", { y: 480, fs: 29, name: "memoize", lines: SL(0, 1, 13) });
      lineHide(M, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
      appear(M.sel, L("s3a", 0.1), { y: 20 });
      lineIn(M, [1, 2, 3, 4], WD("s3a", "square"), 0.3); lineHl(M, [2], WD("s3a", "prints"), 1.8);
      lineIn(M, [5, 6], WD("s3b", "memo"), 0.4); lineHl(M, [6], WD("s3b", "Map") , 2.0);
      const cl = pill("cl", { x: 640, y: 690, cls: "vi", fs: 36, html: "lives in a closure" });
      appear(cl, WD("s3b", "closure"));
      lineIn(M, [7, 8], WD("s3c", "first"), 0.5); lineHl(M, [8], WD("s3c", "already"), 2.6, "rgba(251,191,36,.35)");
      lineIn(M, [9, 10, 11, 12, 13], WD("s3d", "Otherwise"), 0.35); lineHl(M, [9], WD("s3d", "run"), 1.2); lineHl(M, [10], WD("s3d", "save"), 1.4); lineHl(M, [11], WD("s3d", "return"), 1.4);

      // running it
      wipe(L("s4a", -0.15));
      tl.set([cl], { opacity: 0 }, L("s4a", -0.15));
      const R = codeBlock("cR", { y: 480, w: 600, fs: 33, name: "calling it", lines: [SL(0, 14, 14)[0], "console.log(fast(9));", "console.log(fast(9));", "console.log(fast(4));"] });
      lineHide(R, [1, 2, 3, 4]);
      const Ro = consoleBox("cRo", { x: 700, w: 320, y: 480, fs: 34, rows: [["compute", "am"], ["81"], ["81"], ["compute", "am"], ["16"]] });
      appear(R.sel, L("s4a", 0.1), { y: 20 }); appear(Ro.sel, L("s4a", 0.4));
      const cc = cell("cc", { x: 60, y: 880, w: 960, h: 150, label: "cache (the notepad)", html: "empty", fs: 46, border: "#fbbf24" });
      appear(cc, L("s4a", 0.2));
      const miss1 = pill("m1", { x: 60, y: 1070, cls: "co", fs: 42, html: "miss" });
      const hit = pill("hit", { x: 60, y: 1070, cls: "li", fs: 42, html: "hit" });
      const miss2 = pill("m2", { x: 60, y: 1070, cls: "co", fs: 42, html: "miss" });
      lineIn(R, [1], L("s4a", 0.3)); lineIn(R, [2], WD("s4a", "nine"));
      appear(miss1, WD("s4a", "miss")); rowIn(Ro, 0, WD("s4a", "prints")); rowIn(Ro, 1, WD("s4a", "eighty"));
      swapHTML("#cc .vl", "9 → 81", WD("s4a", "eighty")); pulse("#cc .vl", WD("s4a", "eighty"), 1.2); lineHl(R, [2], WD("s4a", "nine"), 3.0);
      gone(miss1, WD("s4b", "nine") - 0.1);
      lineIn(R, [3], WD("s4b", "nine") - 0.2); lineHl(R, [3], WD("s4b", "again"), 3.0);
      appear(hit, WD("s4b", "hit")); rowIn(Ro, 2, WD("s4b", "same")); tint(cc, WD("s4b", "hit"), "#86efac");
      gone(hit, WD("s4c", "four") - 0.2); tint(cc, WD("s4c", "four") - 0.1, "#fbbf24");
      lineIn(R, [4], WD("s4c", "four") - 0.2); lineHl(R, [4], WD("s4c", "four"), 3.0);
      appear(miss2, WD("s4c", "miss")); rowIn(Ro, 3, WD("s4c", "Compute")); rowIn(Ro, 4, WD("s4c", "sixteen"));
      swapHTML("#cc .vl", "9 → 81 &nbsp;·&nbsp; 4 → 16", WD("s4c", "sixteen")); pulse("#cc .vl", WD("s4c", "sixteen"), 1.15);

      // fibonacci: calls with and without a cache
      wipe(L("s5a", -0.15));
      tl.set([R.sel, Ro.sel, cc, miss2], { opacity: 0 }, L("s5a", -0.15));
      const pl = lab("pl", { x: 60, y: 500, fs: 40, html: "plain <b>fib(20)</b>" });
      const pb = box("pb", { x: 60, y: 570, w: 960, h: 110, cls: "c6", fs: 46, html: "0 calls" });
      const ml2 = lab("ml2", { x: 60, y: 760, fs: 40, html: "with a cache" });
      const mbx = box("mbx", { x: 60, y: 830, w: 60, h: 110, cls: "c5", fs: 40, html: "" });
      const mt = lab("mt", { x: 150, y: 860, fs: 44, html: "0 calls" });
      appear(pl, L("s5b", 0.2)); appear(pb, L("s5b", 0.3));
      tl.set(pb, { scaleX: 0.02, transformOrigin: "0% 50%" }, 0);
      tl.to(pb, { scaleX: 1, duration: 4.5, ease: "power2.in" }, WD("s5b", "calls") - 2.0);
      ["1", "400", "3,000", "9,500", "16,000", "21,891 calls"].forEach((v, i) => swapHTML(pb + " > div", v.includes("calls") ? v : v + " calls", WD("s5b", "calls") - 2.0 + i * 0.9));
      appear(ml2, WD("s5c", "cache") - 0.4); appear(mbx, WD("s5c", "cache")); appear(mt, WD("s5c", "cache") + 0.2);
      swapHTML(mt, "21 calls", WD("s5c", "twenty") + 0.2); pulse(mt, WD("s5c", "twenty") + 0.2, 1.3);

      // caveat
      wipe(L("s6a", -0.15));
      tl.set([pl, pb, ml2, mbx, mt], { opacity: 0 }, L("s6a", -0.15));
      const c1 = box("c1", { x: 60, y: 500, w: 460, h: 190, cls: "c6", fs: 50, html: 'memory <b>↑</b><small>results are stored</small>' });
      const c2 = box("c2", { x: 560, y: 500, w: 460, h: 190, cls: "c5", fs: 50, html: 'speed <b>↑</b><small>repeat calls are instant</small>' });
      const c3 = box("c3", { x: 60, y: 740, w: 960, h: 210, cls: "c2", fs: 48, html: 'pure functions only<small>same input → same output, every time</small>' });
      appear(c1, WD("s6a", "memory")); appear(c2, WD("s6a", "speed")); appear(c3, WD("s6b", "pure"));

      // wrap
      wipe(L("s7a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 160, cls: "c1", fs: 50, html: 'check the notepad first' });
      const w2 = box("w2", { x: 60, y: 700, w: 960, h: 160, cls: "c3", fs: 50, html: 'a closure holds the cache' });
      const w3 = box("w3", { x: 60, y: 900, w: 960, h: 160, cls: "c5", fs: 50, html: 'a pure function does the work' });
      appear(w1, L("s7a", 0.3)); appear(w2, WD("s7b", "closure")); appear(w3, WD("s7b", "pure"));
      cheer("#sam", L("s7b", 1.5));
