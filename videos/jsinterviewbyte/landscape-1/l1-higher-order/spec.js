      // Q1: higher-order functions
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // hook: functions in, functions out
      const hf = box("hf", { x: 330, y: 620, w: 400, h: 220, cls: "c2", fs: 54, html: '<code>function</code><small>works with functions</small>' });
      const hin = tok("hin", { x: 70, y: 700, cls: "c", fs: 40, html: "ƒ in" });
      const hout = tok("hout", { x: 800, y: 700, cls: "e", fs: 40, html: "ƒ out" });
      const hl1 = line("hl1", { x1: 250, y1: 735, x2: 320, y2: 735, c: "A", w: 7 });
      const hl2 = line("hl2", { x1: 740, y1: 735, x2: 790, y2: 735, c: "L", w: 7 });
      appear(hf, WD("s1b", "function")); appear(hin, WD("s1b", "works")); drawLine(hl1, WD("s1b", "works")); appear(hout, WD("s1b", "other") ); drawLine(hl2, WD("s1b", "other"));

      // functions are values
      wipe(L("s2a", -0.15));
      const V = codeBlock("cV", { y: 480, fs: 34, name: "functions are values", lines: ["const double = (x) => x * 2;", "const increment = (x) => x + 1;", ["typeof double", '"function"'], "const fns = [double, increment];", ["fns[0](5)", "10"], ["fns[1](5)", "6"]] });
      lineHide(V, [1, 2, 3, 4, 5, 6]);
      appear(V.sel, L("s2a", 0.1), { y: 20 });
      lineIn(V, [1, 2], WD("s2a", "function"), 0.3); lineIn(V, [3], WD("s2a", "number") + 0.2); resIn(V, 3, WD("s2a", "string") + 0.6);
      const vt = chips("vt", 60, 960, [5, '"hi"', "ƒ"], ["b", "c", "a"], 150, 44);
      vt.forEach((t, i) => appear(t, WD("s2a", ["number", "string", "function"][i], i === 2 ? 0 : 0) + 0.2, { y: 10 }));
      const vtn = lab("vtn", { x: 520, y: 975, fs: 42, html: 'all of them are <b>values</b>' });
      appear(vtn, WD("s2a", "value"));
      lineIn(V, [4], WD("s2b", "array") - 0.4); lineIn(V, [5], WD("s2b", "call")); resIn(V, 5, WD("s2b", "call") + 0.5);
      lineIn(V, [6], WD("s2b", "call") + 0.8); resIn(V, 6, WD("s2b", "later"));

      // rule one: accept a function
      wipe(L("s3a", -0.15));
      const R1 = codeBlock("cR1", { y: 480, fs: 36, name: "rule 1: accepts a function", lines: ["function applyTwice(fn, x) {", "  return fn(fn(x));", "}", "const double = (x) => x * 2;", ["applyTwice(double, 3)", "12"]] });
      lineHide(R1, [1, 2, 3, 4, 5]);
      appear(R1.sel, L("s3a", 0.1), { y: 20 });
      lineIn(R1, [1, 2, 3], WD("s3a", "accept"), 0.3); lineIn(R1, [4], WD("s3b", "takes") - 0.3);
      const m1 = box("m1", { x: 250, y: 870, w: 250, h: 100, cls: "c3", fs: 40, html: "double" });
      const m2 = box("m2", { x: 600, y: 870, w: 250, h: 100, cls: "c3", fs: 40, html: "double" });
      const a0 = tok("a0", { x: 90, y: 888, cls: "b", fs: 44, html: "3" });
      const a1 = tok("a1", { x: 520, y: 888, cls: "c", fs: 44, html: "6" });
      const a2 = tok("a2", { x: 890, y: 888, cls: "e", fs: 44, html: "12" });
      const al1 = line("al1", { x1: 160, y1: 920, x2: 245, y2: 920, c: "W", w: 6 });
      const al2 = line("al2", { x1: 505, y1: 920, x2: 595, y2: 920, c: "W", w: 6 });
      const al3 = line("al3", { x1: 855, y1: 920, x2: 885, y2: 920, c: "W", w: 6 });
      lineIn(R1, [5], WD("s3b", "Double") - 0.2);
      appear(m1, WD("s3b", "calls")); appear(m2, WD("s3b", "calls") + 0.4);
      appear(a0, WD("s3b", "three")); drawLine(al1, WD("s3b", "three") + 0.2); lineHl(R1, [2], WD("s3b", "three"), 1.4);
      appear(a1, WD("s3b", "six") - 0.4); drawLine(al2, WD("s3b", "six") - 0.2);
      appear(a2, WD("s3b", "twelve") - 0.3); drawLine(al3, WD("s3b", "twelve") - 0.2); resIn(R1, 5, WD("s3b", "twelve"));
      const cb = pill("cb", { x: 330, y: 1030, cls: "pk", fs: 44, html: "double = the callback" });
      appear(cb, WD("s3c", "callback") - 0.6); pulse(m1, WD("s3c", "callback"), 1.15); pulse(m2, WD("s3c", "callback"), 1.15);

      // rule two: return a function
      wipe(L("s4a", -0.15));
      const R2 = codeBlock("cR2", { y: 480, fs: 36, name: "rule 2: returns a function", lines: ["function multiplier(n) {", "  return (x) => x * n;", "}", "const triple = multiplier(3);", ["triple(5)", "15"]] });
      lineHide(R2, [1, 2, 3, 4, 5]);
      appear(R2.sel, L("s4a", 0.1), { y: 20 });
      lineIn(R2, [1, 2, 3], WD("s4a", "return"), 0.3);
      const mb = box("mb", { x: 60, y: 880, w: 330, h: 120, cls: "c2", fs: 38, html: "multiplier(3)" });
      const mf = box("mf", { x: 480, y: 880, w: 330, h: 120, cls: "c5", fs: 34, html: "(x) => x * 3<small>remembers n = 3</small>" });
      const ml = line("ml", { x1: 395, y1: 940, x2: 470, y2: 940, c: "L", w: 7 });
      lineIn(R2, [4], WD("s4b", "remembers") - 0.5);
      appear(mb, WD("s4b", "multiplier")); drawLine(ml, WD("s4b", "hands")); appear(mf, WD("s4b", "hands") + 0.2);
      const mt = pill("mt", { x: 830, y: 920, cls: "li", fs: 40, html: "triple" });
      appear(mt, WD("s4b", "new") + 0.2);
      const f5 = tok("f5", { x: 480, y: 1060, cls: "b", fs: 44, html: "5" });
      const f15 = tok("f15", { x: 700, y: 1060, cls: "e", fs: 44, html: "15" });
      const fl = line("fl", { x1: 550, y1: 1090, x2: 690, y2: 1090, c: "W", w: 6 });
      lineIn(R2, [5], WD("s4c", "five") - 0.2); appear(f5, WD("s4c", "five")); drawLine(fl, WD("s4c", "five") + 0.3); appear(f15, WD("s4c", "fifteen") - 0.3); resIn(R2, 5, WD("s4c", "fifteen"));

      // built-ins: map, filter, reduce
      wipe(L("s5a", -0.15));
      const src = chips("sr", 330, 540, [1, 2, 3, 4], "b", 100, 44);
      const srl = lab("srl", { x: 60, y: 555, fs: 38, html: "nums" });
      src.forEach((s, i) => appear(s, L("s5b", 0.2 + i * 0.2), { y: 10 })); appear(srl, L("s5b", 0.2));
      const mpl = lab("mpl", { x: 330, y: 660, fs: 34, html: "<b>map</b>(n => n * 2)" });
      const mp = chips("mp", 330, 710, [2, 4, 6, 8], "c", 100, 44);
      appear(mpl, WD("s5c", "runs")); mp.forEach((s, i) => { appear(s, WD("s5c", "runs") + 0.5 + i * 0.45, { y: 14 }); pulse(src[i], WD("s5c", "runs") + 0.5 + i * 0.45, 1.2); });
      const flt = lab("flt", { x: 330, y: 830, fs: 34, html: "<b>filter</b>(n => n % 2 === 0)" });
      const fl2 = chips("fl2", 330, 880, [2, 4], "e", 100, 44);
      const fx = chips("fx", 330, 880, [1, 3], "f", 100, 44);
      appear(flt, WD("s5d", "keeps") - 0.3); fl2.forEach((s, i) => appear(s, WD("s5d", "keeps") + 0.6 + i * 0.5, { y: 14 }));
      const rdl = lab("rdl", { x: 330, y: 1000, fs: 34, html: "<b>reduce</b>((sum, n) => sum + n, 0)" });
      const rd = tok("rd", { x: 330, y: 1050, cls: "a", fs: 48, html: "10" });
      appear(rdl, WD("s5e", "folds") - 0.3); appear(rd, WD("s5e", "sum") + 0.2); pulse(rd, WD("s5e", "ten"), 1.3);
      tl.set(fx, { opacity: 0 }, 0);

      // wrap
      wipe(L("s6a", -0.15));
      tl.set([...src, srl, mpl, ...mp, flt, ...fl2, rdl, rd], { opacity: 0 }, L("s6a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 140, cls: "c4", fs: 48, html: 'first order: neither takes nor returns a function' });
      appear(w1, WD("s6a", "first"));
      const w2 = box("w2", { x: 60, y: 690, w: 960, h: 140, cls: "c1", fs: 50, html: 'accepts a function' });
      const w3 = box("w3", { x: 60, y: 860, w: 960, h: 140, cls: "c2", fs: 50, html: 'returns a function' });
      const w4 = box("w4", { x: 60, y: 1030, w: 960, h: 150, cls: "c5", fs: 52, html: 'either one = higher order' });
      appear(w2, WD("s6b", "accepts")); appear(w3, WD("s6b", "returns")); appear(w4, WD("s6b", "both") + 0.2);
      cheer("#sam", L("s6c", 0.3));
