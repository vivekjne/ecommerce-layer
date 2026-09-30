      // Q5: call, apply, bind
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      const k1 = box("k1", { x: 60, y: 500, w: 960, h: 200, cls: "c1", fs: 60, html: '<code>call</code><small>runs now · arguments one by one</small>' });
      const k2 = box("k2", { x: 60, y: 730, w: 960, h: 200, cls: "c2", fs: 60, html: '<code>apply</code><small>runs now · arguments as an array</small>' });
      const k3 = box("k3", { x: 60, y: 960, w: 960, h: 200, cls: "c3", fs: 60, html: '<code>bind</code><small>runs later · returns a new function</small>' });
      appear(k1, WD("s1a", "call")); appear(k2, WD("s1a", "apply")); appear(k3, WD("s1a", "bind"));

      // setup block stays for scenes 2-6
      wipe(L("s2a", -0.15));
      const Sb = codeBlock("cS", { y: 470, fs: 34, name: "setup", lines: SL(0, 1, 5) });
      appear(Sb.sel, L("s2a", 0.2), { y: 20 });
      lineHl(Sb, [2], WD("s2a", "this.name"), 1.6); lineHl(Sb, [4, 5], WD("s2a", "two"), 1.6);

      // call
      const A1 = codeBlock("cA1", { y: 790, fs: 36, name: "call", lines: [SL(0, 6, 6)[0]] });
      const O1 = consoleBox("cO1", { y: 950, fs: 44, rows: [[EX(0), "cy"]] });
      appear(A1.sel, L("s3a", 0.1), { y: 20 }); appear(O1.sel, WD("s3a", "immediately") - 0.2);
      rowIn(O1, 0, WD("s3a", "immediately") + 0.2);
      const c1 = pill("c1", { x: 60, y: 1140, cls: "cy", fs: 40, html: "call → commas" });
      appear(c1, WD("s3a", "one"));

      // apply
      const A2 = codeBlock("cA2", { y: 790, fs: 36, name: "apply", lines: [SL(1, 6, 6)[0]] });
      const O2 = consoleBox("cO2", { y: 950, fs: 44, rows: [[EX(1), "cy"]] });
      tl.set([A1.sel, O1.sel, c1], { opacity: 0 }, L("s4a", -0.1));
      appear(A2.sel, L("s4a", -0.1), { y: 20 }); appear(O2.sel, L("s4a", 0.4)); rowIn(O2, 0, WD("s4a", "immediately"));
      lineHl(A2, [1], WD("s4a", "array"), 1.8);
      const c2 = pill("c2", { x: 60, y: 1140, cls: "cy", fs: 40, html: "call → commas" });
      const c3 = pill("c3", { x: 480, y: 1140, cls: "vi", fs: 40, html: "apply → array" });
      appear(c2, WD("s4b", "commas")); appear(c3, WD("s4b", "arrays"));

      // bind
      const A3 = codeBlock("cA3", { y: 790, fs: 32, name: "bind", lines: SL(2, 6, 7) });
      const O3 = consoleBox("cO3", { y: 990, fs: 44, rows: [[EX(2), "cy"]] });
      tl.set([A2.sel, O2.sel, c2, c3], { opacity: 0 }, L("s5a", -0.1));
      appear(A3.sel, L("s5a", -0.1), { y: 20 }); appear(O3.sel, L("s5b", -0.2));
      lineHl(A3, [1], L("s5a", 0.2), 2.2);
      const b1 = pill("b1", { x: 60, y: 1180, cls: "pk", fs: 40, html: "nothing printed yet" });
      appear(b1, WD("s5a", "anything")); tl.set(b1, { opacity: 0 }, L("s5b", -0.2));
      lineHl(A3, [2], WD("s5b", "Hi"), 1.6); rowIn(O3, 0, WD("s5b", "Hi") + 0.3);

      // twist
      const A4 = codeBlock("cA4", { y: 790, fs: 32, name: "bound this wins", lines: SL(3, 6, 7) });
      const O4 = consoleBox("cO4", { y: 990, fs: 44, rows: [[EX(3), "cy"]] });
      tl.set([A3.sel, O3.sel, b1], { opacity: 0 }, L("s6a", 0.1));
      appear(A4.sel, L("s6a", 0.1), { y: 20 }); appear(O4.sel, L("s6b", 0.2)); rowIn(O4, 0, WD("s6b", "ignored"));
      lineHl(A4, [2], WD("s6b", "ignored") - 0.3, 2.2);
      const A5 = codeBlock("cA5", { y: 790, fs: 32, name: "a new function", lines: SL(4, 6, 7) });
      const O5 = consoleBox("cO5", { y: 990, fs: 44, rows: [[EX(4), "cy"]] });
      tl.set([A4.sel, O4.sel], { opacity: 0 }, L("s6c", -0.05));
      appear(A5.sel, L("s6c", -0.05), { y: 20 }); appear(O5.sel, L("s6c", 0.4)); rowIn(O5, 0, WD("s6c", "new"));

      // real use
      wipe(L("s7a", -0.15));
      const U = codeBlock("cU", { y: 470, fs: 40, name: "losing this", lines: SL(5, 1, 8) });
      const Uo = consoleBox("cUo", { y: 1030, fs: 44, rows: [[EX(5), "no"]] });
      appear(U.sel, L("s7b", -0.2), { y: 20 }); appear(Uo.sel, L("s7c", 0.2));
      lineHl(U, [8], WD("s7b", "callback"), 2.0); rowIn(Uo, 0, WD("s7c", "undefined"));
      const U2 = codeBlock("cU2", { y: 470, fs: 40, name: "bound", lines: SL(6, 1, 8) });
      const U2o = consoleBox("cU2o", { y: 1030, fs: 44, rows: [[EX(6), "cy"]] });
      tl.set([U.sel, Uo.sel], { opacity: 0 }, L("s7d", -0.1));
      appear(U2.sel, L("s7d", -0.1), { y: 20 }); appear(U2o.sel, L("s7d", 0.3));
      lineHl(U2, [7], WD("s7d", "Bind"), 2.0); rowIn(U2o, 0, WD("s7d", "works"));

      // wrap
      wipe(L("s8a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 200, cls: "c1", fs: 56, html: '<code>call</code> · <code>apply</code><small>run now</small>' });
      const w2 = box("w2", { x: 60, y: 730, w: 960, h: 200, cls: "c3", fs: 56, html: '<code>bind</code><small>a function for later</small>' });
      appear(w1, WD("s8a", "call")); appear(w2, WD("s8a", "Bind"));
      const w3 = box("w3", { x: 60, y: 960, w: 960, h: 170, cls: "c5", fs: 46, html: 'call = commas · apply = array' });
      appear(w3, L("s8b", 0.2));
      cheer("#sam", L("s8b", 0.4));
