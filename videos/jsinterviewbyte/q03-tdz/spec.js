      // Q3: Temporal Dead Zone: memory boxes, a pointer walking the code, and a lock
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // hook: a box that exists but is locked
      const hx = cell("hx", { x: 240, y: 560, w: 600, h: 260, label: "variable x", html: LOCK + " locked", fs: 70, border: "#fb7185" });
      appear(hx, WD("s1b", "exists"));
      const hn = note("hn", { x: 60, y: 880, w: 960, fs: 50, html: 'it <b>exists</b>, but you <b>cannot use it</b> yet' });
      appear(hn, WD("s1b", "allowed"));

      // hoisting: boxes first, then the lines run
      wipe(L("s2a", -0.15));
      const H = codeBlock("cH", { y: 480, fs: 46, name: "your code", lines: SL(0, 2, 2).concat(["let b = 5;"]).map((l, i) => (i === 0 ? "var a = 5;" : l)) });
      appear(H.sel, L("s2a", 0.1), { y: 20 });
      const mz = zone("mz", { x: 60, y: 740, w: 960, h: 300, label: "memory", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      const ma = cell("ma", { x: 110, y: 830, w: 380, h: 160, label: "var a", html: "undefined", fs: 46, border: "#fbbf24" });
      const mb = cell("mb", { x: 590, y: 830, w: 380, h: 160, label: "let b", html: LOCK + " locked", fs: 46, border: "#fb7185" });
      appear(mz, WD("s2a", "reads")); appear(ma, WD("s2a", "creates")); appear(mb, WD("s2a", "creates") + 0.6);
      const st1 = pill("st1", { x: 60, y: 1080, cls: "cy", fs: 42, html: "1 · create the boxes" });
      const st2 = pill("st2", { x: 60, y: 1170, cls: "li", fs: 42, html: "2 · run the lines" });
      appear(st1, WD("s2a", "hoisting")); appear(st2, WD("s2b", "runs"));
      const hp = ptr("hp", H, 1); appear(hp.sel, WD("s2b", "runs")); ptrTo(hp, 2, WD("s2b", "one"));

      // var
      wipe(L("s3a", -0.15));
      const V = codeBlock("cV", { y: 480, fs: 44, name: "var", lines: SL(0, 1, 3) });
      appear(V.sel, L("s3a", 0.1), { y: 20 });
      const vz = zone("vz", { x: 60, y: 750, w: 960, h: 230, label: "memory", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      const va = cell("va", { x: 110, y: 830, w: 420, h: 130, label: "var a", html: "undefined", fs: 46, border: "#fbbf24" });
      appear(vz, WD("s3a", "box")); appear(va, WD("s3a", "box") + 0.2);
      const Vo = consoleBox("cVo", { y: 1010, fs: 42, rows: CASES[0].expect.map((x) => [x, "cy"]) });
      appear(Vo.sel, WD("s3b", "reading") - 0.2);
      const vp = ptr("vp", V, 1); appear(vp.sel, WD("s3b", "reading"));
      rowIn(Vo, 0, WD("s3b", "undefined"));
      ptrTo(vp, 2, L("s3c", 0.1)); swapHTML("#va .vl", "5", WD("s3c", "real")); pulse("#va .vl", WD("s3c", "real"), 1.3);
      ptrTo(vp, 3, WD("s3c", "value") + 0.4); rowIn(Vo, 1, WD("s3c", "value") + 0.9);

      // let
      wipe(L("s4a", -0.15));
      const Lc = codeBlock("cLc", { y: 480, fs: 34, name: "let", lines: SL(1, 1, 6) });
      appear(Lc.sel, L("s4a", 0.1), { y: 20 });
      const lz = zone("lz", { x: 60, y: 850, w: 960, h: 200, label: "memory", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      const lb = cell("lb", { x: 110, y: 920, w: 430, h: 120, label: "let b", html: LOCK + " locked", fs: 44, border: "#fb7185" });
      appear(lz, WD("s4a", "box")); appear(lb, WD("s4a", "box") + 0.2);
      const bar = line("bar", { x1: 40, y1: lineTop(Lc, 1) + 4, x2: 40, y2: lineTop(Lc, 6) - 4, c: "R", w: 14, arrow: false });
      const dz = pill("dz", { x: 590, y: 950, cls: "co", fs: 42, html: "dead zone" });
      appear(dz, WD("s4b", "locked")); drawLine(bar, WD("s4b", "locked"), 0.6);
      const lp = ptr("lp", Lc, 6); appear(lp.sel, WD("s4b", "declares"));
      swapHTML("#lb .vl", OPEN + " 5", WD("s4b", "runs")); tint(lb, WD("s4b", "runs"), "#86efac"); pulse(lb, WD("s4b", "runs"), 1.08);
      // back to the locked state, then read it too early
      swapHTML("#lb .vl", LOCK + " locked", WD("s4c", "Read")); tint(lb, WD("s4c", "Read"), "#fb7185");
      ptrTo(lp, 2, WD("s4c", "Read"), 0.5);
      shakeEl(lb, WD("s4c", "throws")); pulse(dz, WD("s4c", "throws"), 1.3);
      const Lo = consoleBox("cLo", { y: 1080, fs: 38, rows: EX(1).split(": ").map((x, i) => [i ? x : x + ":", "no"]) });
      appear(Lo.sel, WD("s4d", "message") - 0.3);
      ptrTo(lp, 4, WD("s4d", "message"), 0.4);
      rowIn(Lo, 0, WD("s4d", "message") + 0.3); rowIn(Lo, 1, WD("s4d", "cannot"));
      pulse(dz, L("s4e", 0.4), 1.3);

      // typeof
      wipe(L("s5a", -0.15));
      tl.set([bar], { opacity: 0 }, L("s5a", -0.15));
      const tq = tok("tq", { x: 300, y: 600, cls: "c", fs: 74, html: "typeof x" });
      appear(tq, L("s5a", 0.4));
      const c1 = box("c1", { x: 60, y: 500, w: 470, h: 430, cls: "c6", fs: 40, html: '<code>let c</code> not reached yet<div style="font-size:90px;margin:14px 0">' + LOCK + '</div><code>typeof c</code><small>throws ' + "ReferenceError" + '</small>' });
      const c2 = box("c2", { x: 550, y: 500, w: 470, h: 430, cls: "c5", fs: 40, html: 'never declared<div style="font-size:64px;margin:34px 0 26px;color:#86efac;font-family:var(--mono)">?</div><code>typeof neverDeclared</code><small>gives "undefined"</small>' });
      gone(tq, L("s5b", -0.05)); appear(c1, WD("s5b", "locked")); appear(c2, WD("s5c", "never"));

      // when the code runs
      wipe(L("s6a", -0.15));
      const Wn = codeBlock("cW", { x: 130, w: 890, y: 480, fs: 38, name: "when it runs", lines: SL(3, 1, 3) });
      appear(Wn.sel, L("s6a", 0.5), { y: 20 });
      const bd = [1, 2, 3].map((n) => tok("bd" + n, { x: 50, y: lineTop(Wn, n) - 4, cls: "d", fs: 32, html: String(n) }));
      const tB = L("s6b", 0.3);
      bd.forEach((b, i) => { appear(b, tB + i * 0.7, { y: 6 }); lineHl(Wn, [i + 1], tB + i * 0.7, 0.9); });
      const Wo = consoleBox("cWo", { y: 780, fs: 46, rows: [[EX(3)]] });
      appear(Wo.sel, WD("s6c", "works") - 0.2); rowIn(Wo, 0, WD("s6c", "works"));
      const wp = pill("wp", { x: 60, y: 940, cls: "vi", fs: 42, html: "show() runs at step 3" });
      appear(wp, WD("s6c", "after"));
      lineHl(Wn, [3], WD("s6c", "runs"), 2.0);

      // shadowing
      wipe(L("s7a", -0.15));
      const Sh = codeBlock("cS", { y: 480, fs: 34, name: "shadowing", lines: SL(6, 1, 9) });
      appear(Sh.sel, L("s7a", 0.2), { y: 20 });
      const so = cell("so", { x: 60, y: 1010, w: 440, h: 170, label: "outer x", html: '"outer"', fs: 44, border: "#a78bfa" });
      const si = cell("si", { x: 580, y: 1010, w: 440, h: 170, label: "block x", html: LOCK + " locked", fs: 44, border: "#fb7185" });
      appear(so, WD("s7b", "outer")); lineHl(Sh, [1], WD("s7b", "outer"), 1.6);
      appear(si, WD("s7b", "own")); lineHl(Sh, [8], WD("s7b", "own"), 2.0, "rgba(251,191,36,.35)");
      const sa = line("sa", { x1: 600, y1: 700, x2: 760, y2: 1000, c: "R", w: 6, dash: true });
      lineHl(Sh, [4], WD("s7c", "reading"), 2.4, "rgba(251,113,133,.35)"); drawLine(sa, WD("s7c", "reading"));
      swapHTML("#si .vl", "ReferenceError", WD("s7c", "throws")); tl.set("#si .vl", { fontSize: 34, color: "#fda4af" }, WD("s7c", "throws")); shakeEl(si, WD("s7c", "throws"));

      // wrap
      wipe(L("s8a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 200, cls: "c6", fs: 54, html: '<code>let</code> <code>const</code> <code>class</code><small>locked until declared</small>' });
      const w2 = box("w2", { x: 60, y: 730, w: 960, h: 200, cls: "c4", fs: 54, html: '<code>var</code><small>quietly undefined</small>' });
      const w3 = box("w3", { x: 60, y: 960, w: 960, h: 190, cls: "c5", fs: 52, html: 'loud errors beat silent bugs' });
      appear(w1, L("s8a", 0.2)); appear(w2, WD("s8b", "silent")); appear(w3, WD("s8b", "safer"));
      cheer("#sam", L("s8c", 0.3));
