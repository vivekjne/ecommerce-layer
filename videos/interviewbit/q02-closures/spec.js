      // Q2: closures
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // hook: closure = function + remembered scope
      const hA = box("h-a", { x: 60, y: 540, w: 400, h: 260, cls: "c1", fs: 44, html: 'inner function<small>the code that runs later</small>' });
      const hP = note("h-p", { x: 460, y: 610, w: 160, fs: 90, html: "+" });
      const hB = box("h-b", { x: 620, y: 540, w: 400, h: 260, cls: "c2", fs: 44, html: 'its scope<small>the variables around it</small>' });
      const hC = box("h-c", { x: 160, y: 860, w: 760, h: 170, cls: "c5", fs: 64, html: '= a <code>closure</code>' });
      appear(hA, WD("s1b", "function")); appear(hP, WD("s1b", "remembers")); appear(hB, WD("s1b", "variables"), {}); appear(hC, L("s1c", 0.2));

      // counter
      wipe(L("s2a", -0.15));
      const F = codeBlock("cF", { y: 480, fs: 42, name: "makeCounter", lines: SL(0, 1, 7) });
      lineHide(F, [1, 2, 3, 4, 5, 6, 7]);
      appear(F.sel, L("s2a", -0.1), { y: 20 });
      lineIn(F, [1, 7], L("s2a", 0), 0); lineIn(F, [2], WD("s2a", "count"), 0);
      lineIn(F, [3, 4, 5, 6], L("s2b", 0.1), 0.45);
      const p1 = pill("p1", { x: 60, y: 960, cls: "vi", fs: 44, html: "count lives inside makeCounter" });
      appear(p1, L("s2a", 1.5));
      const p2 = pill("p2", { x: 60, y: 1040, cls: "co", fs: 44, html: "…then it should be gone?" });
      appear(p2, L("s2c", 0.4));
      lineHl(F, [2, 4, 5], L("s2d", 0), 3.5, "rgba(251,191,36,.35)");
      const p3 = pill("p3", { x: 60, y: 1120, cls: "li", fs: 44, html: "no: the inner function keeps it" });
      appear(p3, WD("s2d", "closure"));
      const K = codeBlock("cK", { y: 500, fs: 42, name: "using it", lines: [
        "const counter = makeCounter();", ["counter()", "1"], ["counter()", "2"],
        "const other = makeCounter();", ["other()", "1"], ["typeof count", '"undefined"'] ] });
      lineHide(K, [1, 2, 3, 4, 5, 6]);
      tl.set([F.sel, p1, p2, p3], { opacity: 0 }, L("s2e", -0.05));
      appear(K.sel, L("s2e", -0.05), { y: 20 });
      lineIn(K, [1], L("s2e", 0.1)); lineIn(K, [2], WD("s2e", "once")); resIn(K, 2, WD("s2e", "one"));
      lineIn(K, [3], WD("s2e", "again")); resIn(K, 3, WD("s2e", "two"));
      lineIn(K, [4, 5], L("s2f", 0.1), 0.6); resIn(K, 5, WD("s2f", "own"));
      const p4 = pill("p4", { x: 60, y: 990, cls: "vi", fs: 44, html: "a new closure = its own count" });
      appear(p4, WD("s2f", "new"));
      lineIn(K, [6], L("s2g", 0.1)); resIn(K, 6, WD("s2g", "private"));
      const p5 = pill("p5", { x: 60, y: 1070, cls: "li", fs: 44, html: "count is private" });
      appear(p5, WD("s2g", "private"));

      // loop trap
      wipe(L("s3a", -0.15));
      const V = codeBlock("cV", { y: 490, fs: 38, name: "var", lines: SL(1, 1, 3) });
      const Vo = consoleBox("cVo", { y: 720, fs: 44, rows: CASES[1].expect.map((x) => [x, "no"]) });
      appear(V.sel, L("s3b", -0.2), { y: 20 }); appear(Vo.sel, L("s3b", 0.3));
      lineHl(V, [1], L("s3b", 0.3), 1.6);
      rowIn(Vo, 0, WD("s3b", "already") - 0.3); rowIn(Vo, 1, WD("s3b", "already") + 0.1); rowIn(Vo, 2, WD("s3b", "three"));
      const Lt = codeBlock("cL", { y: 490, fs: 38, name: "let", lines: SL(2, 1, 3) });
      const Lo = consoleBox("cLo", { y: 720, fs: 44, rows: CASES[2].expect.map((x) => [x]) });
      tl.set([V.sel, Vo.sel], { opacity: 0 }, L("s3c", -0.1));
      appear(Lt.sel, L("s3c", -0.1), { y: 20 }); appear(Lo.sel, L("s3c", 0.2));
      lineHl(Lt, [1], L("s3c", 0.3), 1.6);
      rowIn(Lo, 0, WD("s3c", "zero")); rowIn(Lo, 1, WD("s3c", "one")); rowIn(Lo, 2, WD("s3c", "two"));
      const p6 = pill("p6", { x: 60, y: 1010, cls: "li", fs: 44, html: "let: a fresh i for each turn" });
      appear(p6, WD("s3c", "every"));

      // factory
      wipe(L("s4a", -0.15));
      const M = codeBlock("cM", { y: 490, fs: 46, name: "function factory", lines: [...SL(3, 1, 5), ["add5(3)", "8"], ["add10(3)", "13"]] });
      lineHide(M, [1, 2, 3, 4, 5, 6, 7]);
      appear(M.sel, L("s4b", -0.2), { y: 20 });
      lineIn(M, [1, 2, 3], L("s4b", 0), 0.3); lineIn(M, [4, 5], WD("s4b", "number") - 0.3, 0.3);
      lineIn(M, [6], WD("s4c", "five") - 0.3); resIn(M, 6, WD("s4c", "eight"));
      lineIn(M, [7], WD("s4c", "ten") - 0.3); resIn(M, 7, WD("s4c", "thirteen"));
      const p7 = pill("p7", { x: 60, y: 1080, cls: "vi", fs: 44, html: "each function remembers its own n" });
      appear(p7, WD("s4c", "Each"));

      // wrap
      wipe(L("s5a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 170, cls: "c1", fs: 56, html: 'Private state' });
      const w2 = box("w2", { x: 60, y: 700, w: 960, h: 170, cls: "c2", fs: 56, html: 'Function factories' });
      const w3 = box("w3", { x: 60, y: 900, w: 960, h: 170, cls: "c3", fs: 56, html: 'Callbacks with memory' });
      appear(w1, WD("s5a", "private")); appear(w2, WD("s5a", "factories")); appear(w3, WD("s5a", "callbacks"));
      const w4 = box("w4", { x: 60, y: 1110, w: 960, h: 150, cls: "c5", fs: 52, html: 'closure = function + scope' });
      appear(w4, L("s5b", 0.4));
      cheer("#sam", L("s5c", 0.3));
