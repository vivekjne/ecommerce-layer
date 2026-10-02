      // Q2: currying: one function with 3 arguments becomes a chain of three functions with 1 each
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      const hL = box("hL", { x: 60, y: 560, w: 330, h: 200, cls: "c1", fs: 40, html: '<code>f(a, b, c)</code><small>many arguments</small>' });
      const hA = tok("hA", { x: 470, y: 640, cls: "d", fs: 54, html: "→" });
      const hc = [["f(a)", "c2"], ["(b)", "c3"], ["(c)", "c5"]].map((p, i) => box("hc" + i, { x: 560 + i * 155, y: 570, w: 140, h: 180, cls: p[1], fs: 38, html: p[0] + "<small>one</small>" }));
      appear(hL, WD("s1b", "function")); appear(hA, WD("s1b", "into") - 0.2); hc.forEach((b, i) => appear(b, WD("s1b", "chain") + i * 0.35));
      const hN = note("hN", { x: 60, y: 840, w: 960, fs: 50, html: 'each function takes <b>one</b> argument' });
      appear(hN, WD("s1b", "just"));

      // normal function: all arguments at once
      wipe(L("s2a", -0.15));
      const N = codeBlock("cN", { y: 480, fs: 38, name: "a normal function", lines: ["const add = (a, b, c) => a + b + c;", ["add(1, 2, 3)", "6"]] });
      lineHide(N, [1, 2]);
      appear(N.sel, L("s2a", 0.1), { y: 20 }); lineIn(N, [1], WD("s2a", "normal"));
      const nm = box("nm", { x: 380, y: 800, w: 300, h: 130, cls: "c2", fs: 54, html: "add" });
      const nt = chips("nt", 60, 840, [1, 2, 3], ["b", "c", "e"], 90, 48);
      appear(nm, WD("s2a", "three", 0));
      nt.forEach((t, i) => appear(t, WD("s2a", "one") + i * 0.35, { y: 10 }));
      nt.forEach((t, i) => path(t, WD("s2a", "three", 1) + 0.2, [[250 + i * 8, i === 1 ? 0 : (i - 1) * 20]], 0.8));
      lineIn(N, [2], WD("s2a", "three", 1) + 0.2); resIn(N, 2, WD("s2a", "six"));
      const nr = tok("nr", { x: 760, y: 840, cls: "e", fs: 54, html: "6" });
      const nl = line("nl", { x1: 690, y1: 865, x2: 750, y2: 865, c: "L", w: 7 });
      drawLine(nl, WD("s2a", "six") - 0.4); appear(nr, WD("s2a", "six"));

      // curried: a chain of three functions
      wipe(L("s3a", -0.15));
      const Cc = codeBlock("cC", { y: 480, fs: 30, name: "curried", lines: ["const curriedAdd = (a) => (b) => (c) => a + b + c;"] });
      appear(Cc.sel, L("s3a", 0.1), { y: 20 });
      const bA = box("bA", { x: 60, y: 700, w: 290, h: 150, cls: "c2", fs: 46, html: '<code>(a) =></code><small>returns a function</small>' });
      const bB = box("bB", { x: 390, y: 700, w: 290, h: 150, cls: "c3", fs: 46, html: '<code>(b) =></code><small>returns a function</small>' });
      const bC = box("bC", { x: 720, y: 700, w: 300, h: 150, cls: "c5", fs: 40, html: '<code>(c) =></code><small>a + b + c</small>' });
      const k1 = line("k1", { x1: 352, y1: 775, x2: 386, y2: 775, c: "W", w: 7 });
      const k2 = line("k2", { x1: 682, y1: 775, x2: 716, y2: 775, c: "W", w: 7 });
      appear(bA, WD("s3a", "only")); appear(bB, WD("s3b", "b")); drawLine(k1, WD("s3b", "b") - 0.3); appear(bC, WD("s3b", "c")); drawLine(k2, WD("s3b", "c") - 0.3);
      pulse(bC, WD("s3b", "adding"), 1.12); tint(bC, WD("s3b", "adding"), "#86efac");
      // these three stay on screen for the next scenes
      const keep = [bA, bB, bC, k1, k2];

      // calls: arguments arrive one at a time
      const T4 = L("s4a", -0.1);
      gone(Cc.sel, T4);
      const Ca = codeBlock("cCa", { y: 480, fs: 40, name: "calling it", lines: [["curriedAdd(1)", "function"], ["curriedAdd(1)(2)", "function"], ["curriedAdd(1)(2)(3)", "6"]] });
      lineHide(Ca, [1, 2, 3]); appear(Ca.sel, T4, { y: 20 });
      const ar = chips("ar", 130, 910, [1, 2, 3], ["b", "c", "e"], 330, 48);
      const arl = [0, 1, 2].map((i) => line("arl" + i, { x1: 170 + i * 330, y1: 905, x2: 170 + i * 330 + (i === 2 ? 20 : 0), y2: 860, c: "W", w: 6 }));
      const waits = [["s4a", "one"], ["s4b", "two"], ["s4b", "three"]];
      waits.forEach(([ln, w], i) => {
        appear(ar[i], WD(ln, w) - 0.1, { y: 10 }); drawLine(arl[i], WD(ln, w) + 0.1);
        tint(keep[i], WD(ln, w) + 0.2, "#86efac"); pulse(keep[i], WD(ln, w) + 0.2, 1.1);
        lineIn(Ca, [i + 1], WD(ln, w) + 0.2);
      });
      resIn(Ca, 1, WD("s4a", "waiting") + 0.2); resIn(Ca, 2, WD("s4b", "waiting") + 0.2); resIn(Ca, 3, WD("s4b", "six"));
      const wb = pill("wb", { x: 340, y: 1000, cls: "pk", fs: 36, html: "waiting for c" });
      const wa = pill("wa", { x: 60, y: 1000, cls: "pk", fs: 36, html: "waiting for b" });
      appear(wa, WD("s4a", "waiting")); gone(wa, WD("s4b", "Give")); appear(wb, WD("s4b", "waiting")); gone(wb, WD("s4b", "Give", 1));
      const fin = tok("fin", { x: 820, y: 1000, cls: "e", fs: 54, html: "= 6" });
      appear(fin, WD("s4b", "answer"));

      // closure: the backpacks
      const T5 = L("s5a", -0.1);
      gone(Ca.sel, T5); ar.forEach((a) => gone(a, T5)); arl.forEach((a) => gone(a, T5)); gone(fin, T5);
      const bp1 = cell("bp1", { x: 390, y: 900, w: 290, h: 130, label: "backpack", html: "a = 1", fs: 44, border: "#fbbf24" });
      const bp2 = cell("bp2", { x: 720, y: 900, w: 300, h: 130, label: "backpack", html: "a = 1, b = 2", fs: 38, border: "#fbbf24" });
      const bq1 = line("bq1", { x1: 535, y1: 860, x2: 535, y2: 895, c: "A", w: 6 });
      const bq2 = line("bq2", { x1: 870, y1: 860, x2: 870, y2: 895, c: "A", w: 6 });
      const cq = note("cq", { x: 60, y: 520, w: 960, fs: 50, html: 'each inner function keeps the <b>arguments</b> before it' });
      appear(cq, WD("s5b", "closures"));
      appear(bp1, WD("s5b", "keeps")); drawLine(bq1, WD("s5b", "keeps") + 0.3); appear(bp2, WD("s5b", "arguments") + 0.2); drawLine(bq2, WD("s5b", "arguments") + 0.5);

      // use: partial application
      wipe(L("s6a", -0.15));
      tl.set([...keep, bp1, bp2, bq1, bq2, cq], { opacity: 0 }, L("s6a", -0.15));
      const Dd = codeBlock("cD", { y: 480, fs: 32, name: "partial application", lines: ["const discount = (pct) => (price) =>", "  price - (price * pct) / 100;", "const tenOff = discount(10);", ["tenOff(200)", "180"], ["tenOff(50)", "45"]] });
      lineHide(Dd, [1, 2, 3, 4, 5]);
      appear(Dd.sel, L("s6a", 0.1), { y: 20 }); lineIn(Dd, [1, 2], WD("s6a", "first"), 0.3);
      const dm = box("dm", { x: 60, y: 830, w: 380, h: 120, cls: "c2", fs: 40, html: "discount(10)" });
      const dt = box("dt", { x: 540, y: 830, w: 480, h: 120, cls: "c5", fs: 36, html: 'tenOff<small>remembers pct = 10</small>' });
      const dl = line("dl", { x1: 450, y1: 890, x2: 530, y2: 890, c: "L", w: 7 });
      lineIn(Dd, [3], WD("s6b", "percent") - 0.3); appear(dm, WD("s6b", "ten")); drawLine(dl, WD("s6b", "new")); appear(dt, WD("s6b", "tenOff") - 0.2);
      const e1 = chips("e1", 540, 1010, [200, "→", 180], ["b", "g", "e"], 130, 44);
      const e2 = chips("e2", 540, 1100, [50, "→", 45], ["b", "g", "e"], 130, 44);
      lineIn(Dd, [4], WD("s6c", "two") - 0.2); e1.forEach((t, i) => appear(t, WD("s6c", "two") + i * 0.2, { y: 10 })); resIn(Dd, 4, WD("s6c", "hundred") + 0.2);
      lineIn(Dd, [5], WD("s6c", "fifty") - 0.2); e2.forEach((t, i) => appear(t, WD("s6c", "fifty") + i * 0.2, { y: 10 })); resIn(Dd, 5, WD("s6c", "forty"));

      // wrap
      wipe(L("s7a", -0.15));
      tl.set([dm, dt, dl, ...e1, ...e2], { opacity: 0 }, L("s7a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 160, cls: "c1", fs: 52, html: 'one argument at a time' });
      const w2 = box("w2", { x: 60, y: 700, w: 960, h: 160, cls: "c4", fs: 52, html: 'closures remember the earlier arguments' });
      const w3 = box("w3", { x: 60, y: 900, w: 960, h: 160, cls: "c5", fs: 52, html: 'payoff: partial application' });
      appear(w1, WD("s7a", "argument")); appear(w2, WD("s7a", "closures")); appear(w3, WD("s7a", "payoff"));
      cheer("#sam", L("s7b", 0.3));
