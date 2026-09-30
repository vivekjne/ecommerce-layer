      // Q5: call, apply, bind: a function "machine" with a slot for this
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      const k1 = box("k1", { x: 60, y: 500, w: 960, h: 200, cls: "c1", fs: 60, html: '<code>call</code><small>runs now · arguments one by one</small>' });
      const k2 = box("k2", { x: 60, y: 730, w: 960, h: 200, cls: "c2", fs: 60, html: '<code>apply</code><small>runs now · arguments as an array</small>' });
      const k3 = box("k3", { x: 60, y: 960, w: 960, h: 200, cls: "c3", fs: 60, html: '<code>bind</code><small>runs later · returns a new function</small>' });
      appear(k1, WD("s1a", "call")); appear(k2, WD("s1a", "apply")); appear(k3, WD("s1a", "bind"));

      // this + the machine
      wipe(L("s2a", -0.15));
      const Sb = codeBlock("cS", { y: 470, fs: 32, name: "setup", lines: SL(0, 1, 5) });
      const mz = zone("mz", { x: 280, y: 780, w: 520, h: 220, label: "function invite()", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      const slot = cell("slot", { x: 330, y: 850, w: 420, h: 120, label: "this", html: "?", fs: 56, border: "#f472b6" });
      appear(mz, WD("s2a", "function")); appear(slot, WD("s2a", "this", 1));
      appear(Sb.sel, L("s2b", 0.1), { y: 20 }); lineHl(Sb, [2], WD("s2b", "reads"), 1.6);
      const jn = tok("jn", { x: 30, y: 795, cls: "a", fs: 34, html: 'john<small>{ name: "John" }</small>' });
      const jm = tok("jm", { x: 30, y: 885, cls: "e", fs: 34, html: 'jimmy<small>{ name: "Jimmy" }</small>' });
      appear(jn, WD("s2b", "john")); appear(jm, WD("s2b", "jimmy"));
      const c1 = tok("c1", { x: 830, y: 800, cls: "c", fs: 34, html: '"Hello"' });
      const c2 = tok("c2", { x: 830, y: 890, cls: "c", fs: 34, html: '"!"' });
      const ca = tok("ca", { x: 790, y: 850, cls: "c", fs: 30, html: '["Hello", "!"]' });
      const plug = (who, dx, dy, t, name) => { path(who, t, [[dx, dy]], 0.8); swapHTML("#slot .vl", name, t + 0.85); tl.set(who, { opacity: 0 }, t + 0.9); tint(slot, t + 0.85, "#86efac"); pulse("#slot .vl", t + 0.85, 1.25); };

      // call
      const A1 = codeBlock("cA1", { y: 1020, fs: 34, name: "call", lines: [SL(0, 6, 6)[0]] });
      const O1 = consoleBox("cO1", { y: 1140, fs: 42, rows: [[EX(0), "cy"]] });
      appear(A1.sel, L("s3a", 0.1), { y: 20 });
      plug(jn, 330, 85, WD("s3a", "plugs"), "john");
      appear(c1, WD("s3a", "Arguments")); appear(c2, WD("s3a", "Arguments") + 0.3);
      path(c1, WD("s3a", "one"), [[-300, 20]], 0.7); path(c2, WD("s3a", "one", 1), [[-300, -20]], 0.7);
      appear(O1.sel, LE("s3a", -0.7)); rowIn(O1, 0, LE("s3a", -0.6));

      // apply
      const T4 = L("s4a", -0.1);
      gone(A1.sel, T4); gone(O1.sel, T4); gone(c1, T4); gone(c2, T4);
      swapHTML("#slot .vl", "?", T4); tint(slot, T4, "#f472b6"); tl.set(jn, { x: 0, y: 0, opacity: 1 }, T4);
      const A2 = codeBlock("cA2", { y: 1020, fs: 34, name: "apply", lines: [SL(1, 6, 6)[0]] });
      const O2 = consoleBox("cO2", { y: 1140, fs: 42, rows: [[EX(1), "cy"]] });
      appear(A2.sel, T4, { y: 20 });
      tl.set(jn, { opacity: 0 }, T4 + 0.01); tl.set(jn, { opacity: 1 }, T4 + 0.02);
      plug(jm, 330, -5, WD("s4a", "same"), "jimmy");
      appear(ca, WD("s4a", "array")); path(ca, WD("s4a", "array") + 0.2, [[-300, 0]], 0.7);
      lineHl(A2, [1], WD("s4a", "array"), 1.6);
      appear(O2.sel, LE("s4a", -0.6)); rowIn(O2, 0, LE("s4a", -0.5));
      const T4b = L("s4b", -0.05);
      gone(O2.sel, T4b);
      const pc = pill("pc", { x: 60, y: 1170, cls: "cy", fs: 44, html: "call → commas" });
      const pa = pill("pa", { x: 540, y: 1170, cls: "vi", fs: 44, html: "apply → array" });
      appear(pc, WD("s4b", "commas")); appear(pa, WD("s4b", "arrays"));

      // bind
      const T5 = L("s5a", -0.1);
      gone(A2.sel, T5); gone(ca, T5); gone(pc, T5); gone(pa, T5);
      swapHTML("#slot .vl", "?", T5); tint(slot, T5, "#f472b6"); tl.set(jn, { x: 0, y: 0, opacity: 1 }, T5); tl.set(jm, { x: 0, y: 0, opacity: 1 }, T5);
      const A3 = codeBlock("cA3", { y: 1015, fs: 30, name: "bind", lines: SL(2, 6, 7) });
      const O3 = consoleBox("cO3", { y: 1170, fs: 42, rows: [[EX(2), "cy"]] });
      appear(A3.sel, L("s5a", 0.1), { y: 20 });
      lineHl(A3, [1], L("s5a", 0.3), 2.4);
      swapHTML(mz + " .zl", "inviteJohn: a new function", WD("s5a", "returns"));
      plug(jn, 330, 85, WD("s5a", "returns") + 0.3, LOCK + " john");
      tint(slot, WD("s5a", "returns") + 1.2, "#fb7185");
      const nr = pill("nr", { x: 810, y: 940, cls: "pk", fs: 36, html: "nothing runs yet" });
      appear(nr, WD("s5a", "anything")); gone(nr, WD("s5a", "fixed"));
      const pre = tok("pre", { x: 830, y: 850, cls: "c", fs: 34, html: '"Hi"' });
      appear(pre, WD("s5b", "preset")); path(pre, WD("s5b", "preset") + 0.4, [[-300, 0]], 0.7);
      lineHl(A3, [2], WD("s5b", "filled"), 1.6);
      appear(O3.sel, WD("s5b", "filled")); rowIn(O3, 0, WD("s5b", "filled") + 0.3);

      // twist: a bound function ignores a different this
      const T6 = L("s6a", 0.05);
      gone(A3.sel, T6); gone(O3.sel, T6); gone(pre, T6);
      const A4 = codeBlock("cA4", { y: 1015, fs: 30, name: "another this?", lines: SL(3, 6, 7) });
      const O4 = consoleBox("cO4", { y: 1170, fs: 42, rows: [[EX(3), "cy"]] });
      appear(A4.sel, T6 + 0.1, { y: 20 }); lineHl(A4, [2], WD("s6a", "different"), 2.0);
      path(jm, WD("s6b", "ignored") - 0.9, [[240, -20], [120, 0]], 0.5);
      shakeEl(slot, WD("s6b", "ignored") - 0.3); tint(slot, WD("s6b", "ignored") - 0.3, "#fb7185");
      const ig = pill("ig", { x: 810, y: 940, cls: "co", fs: 36, html: "ignored" });
      appear(ig, WD("s6b", "ignored")); gone(ig, WD("s6c", "new") - 0.2);
      appear(O4.sel, WD("s6b", "first") - 0.2); rowIn(O4, 0, WD("s6b", "first"));
      const T6c = WD("s6c", "new") - 0.1;
      gone(A4.sel, T6c); gone(O4.sel, T6c); gone(jm, T6c);
      const A5 = codeBlock("cA5", { y: 1015, fs: 30, name: "a new function", lines: SL(4, 6, 7) });
      const O5 = consoleBox("cO5", { y: 1170, fs: 42, rows: [[EX(4), "cy"]] });
      appear(A5.sel, T6c, { y: 20 }); appear(O5.sel, T6c + 0.4); rowIn(O5, 0, WD("s6c", "untouched"));

      // real use: a method loses its this
      wipe(L("s7a", -0.15));
      tl.set([mz, slot, jn, jm, nr], { opacity: 0 }, L("s7a", -0.15));
      const U = codeBlock("cU", { y: 480, fs: 34, name: "losing this", lines: SL(5, 1, 8) });
      const uz = zone("uz", { x: 60, y: 960, w: 470, h: 230, label: "function f()", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      const us = cell("us", { x: 100, y: 1030, w: 390, h: 120, label: "this", html: "?", fs: 52, border: "#f472b6" });
      const Uo = consoleBox("cUo", { x: 570, y: 1000, w: 450, fs: 46, rows: [[EX(5), "no"]] });
      appear(U.sel, L("s7b", -0.2), { y: 20 }); appear(uz, WD("s7b", "loses")); appear(us, WD("s7b", "loses") + 0.3);
      lineHl(U, [7, 8], WD("s7c", "Take"), 2.4);
      swapHTML("#us .vl", "undefined", WD("s7c", "undefined")); tint(us, WD("s7c", "undefined"), "#fb7185"); tl.set("#us .vl", { color: "#fda4af" }, WD("s7c", "undefined"));
      appear(Uo.sel, WD("s7c", "undefined") - 0.1); rowIn(Uo, 0, WD("s7c", "undefined"));
      const U2 = codeBlock("cU2", { y: 480, fs: 34, name: "bound", lines: SL(6, 1, 8) });
      const U2o = consoleBox("cU2o", { x: 570, y: 1000, w: 450, fs: 46, rows: [[EX(6), "cy"]] });
      gone(U.sel, L("s7d", -0.1)); gone(Uo.sel, L("s7d", -0.1));
      appear(U2.sel, L("s7d", -0.1), { y: 20 }); lineHl(U2, [7], WD("s7d", "Bind"), 2.2);
      swapHTML("#us .vl", LOCK + " user", WD("s7d", "Bind") + 0.4); tint(us, WD("s7d", "Bind") + 0.4, "#86efac"); tl.set("#us .vl", { color: "#f4f6ff" }, WD("s7d", "Bind") + 0.4);
      appear(U2o.sel, WD("s7d", "works") - 0.1); rowIn(U2o, 0, WD("s7d", "works"));

      // wrap
      wipe(L("s8a", -0.15));
      tl.set([uz, us], { opacity: 0 }, L("s8a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 200, cls: "c1", fs: 56, html: '<code>call</code> · <code>apply</code><small>run now</small>' });
      const w2 = box("w2", { x: 60, y: 730, w: 960, h: 200, cls: "c3", fs: 56, html: '<code>bind</code><small>a function for later</small>' });
      appear(w1, WD("s8a", "call")); appear(w2, WD("s8a", "Bind"));
      const w3 = box("w3", { x: 60, y: 960, w: 960, h: 170, cls: "c5", fs: 46, html: 'call = commas · apply = array' });
      appear(w3, L("s8b", 0.2));
      cheer("#sam", L("s8b", 0.4));
