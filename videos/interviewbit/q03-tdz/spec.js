      // Q3: Temporal Dead Zone
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // hook: the zone on a timeline
      const z1 = box("z1", { x: 60, y: 540, w: 270, h: 300, cls: "c1", fs: 44, html: 'scope starts' });
      const z2 = box("z2", { x: 350, y: 540, w: 350, h: 300, cls: "c6", fs: 52, html: 'dead zone<small>x exists, locked</small>' });
      const z3 = box("z3", { x: 720, y: 540, w: 300, h: 300, cls: "c5", fs: 42, html: '<code>let x = 1;</code><small>now usable</small>' });
      appear(z1, WD("s1b", "start")); appear(z3, WD("s1b", "declared")); appear(z2, WD("s1c", "exists"));
      tl.fromTo(z2, { boxShadow: "0 0 0 rgba(251,113,133,0)" }, { boxShadow: "0 0 40px rgba(251,113,133,.7)", duration: 0.6, yoyo: true, repeat: 3 }, WD("s1c", "cannot"));

      // var
      wipe(L("s2a", -0.15));
      const V = codeBlock("cV", { y: 490, fs: 54, name: "var", lines: SL(0, 1, 3) });
      const Vo = consoleBox("cVo", { y: 800, fs: 46, rows: CASES[0].expect.map((x) => [x, "cy"]) });
      appear(V.sel, L("s2a", 0.1), { y: 20 }); appear(Vo.sel, L("s2a", 0.5));
      lineHl(V, [1], WD("s2a", "reading"), 2.2);
      rowIn(Vo, 0, WD("s2a", "undefined", 1)); rowIn(Vo, 1, LE("s2a", -0.4));

      // let
      wipe(L("s3a", -0.15));
      const Lt = codeBlock("cL", { y: 480, fs: 34, name: "let", lines: SL(1, 1, 6) });
      const Lo = consoleBox("cLo", { y: 900, fs: 38, rows: EX(1).split(": ").map((x, i) => [i ? x : x + ":", "no"]) });
      appear(Lt.sel, L("s3a", 0.1), { y: 20 }); appear(Lo.sel, L("s3a", 0.6));
      lineHl(Lt, [2], L("s3a", 1.2), 2.0, "rgba(251,113,133,.35)"); lineHl(Lt, [6], WD("s3a", "early") - 0.4, 2.0);
      rowIn(Lo, 0, WD("s3b", "cannot")); rowIn(Lo, 1, WD("s3b", "cannot") + 0.4);

      // typeof
      wipe(L("s4a", -0.15));
      const Tp = codeBlock("cT", { y: 480, fs: 42, name: "typeof", lines: SL(2, 1, 7) });
      const To = consoleBox("cTo", { y: 1010, fs: 44, rows: CASES[2].expect.map((x, i) => [x, i ? "cy" : "no"]) });
      appear(Tp.sel, L("s4a", 0.8), { y: 20 }); appear(To.sel, L("s4b", 0.2));
      lineHl(Tp, [2, 6], WD("s4b", "Typeof"), 3.0, "rgba(251,113,133,.35)");
      rowIn(To, 0, WD("s4b", "throws"));
      lineHl(Tp, [7], WD("s4c", "never"), 2.6); rowIn(To, 1, WD("s4c", "undefined"));

      // when, not where
      wipe(L("s5a", -0.15));
      const Wn = codeBlock("cW", { y: 500, fs: 42, name: "when it runs", lines: SL(3, 1, 3) });
      const Wo = consoleBox("cWo", { y: 800, fs: 46, rows: [[EX(3)]] });
      appear(Wn.sel, L("s5b", -0.2), { y: 20 }); appear(Wo.sel, L("s5c", 0.1));
      const p1 = pill("p1", { x: 60, y: 1010, cls: "vi", fs: 44, html: "written before x, but called after" });
      appear(p1, L("s5c", 0.4));
      lineHl(Wn, [1], L("s5c", 0.2), 1.6); lineHl(Wn, [3], WD("s5c", "after"), 1.6);
      rowIn(Wo, 0, WD("s5c", "works"));

      // shadowing
      wipe(L("s6a", -0.15));
      const Sh = codeBlock("cS", { y: 470, fs: 42, name: "shadowing", lines: SL(6, 1, 9) });
      const So = consoleBox("cSo", { y: 1110, fs: 44, rows: [[EX(6), "no"]] });
      appear(Sh.sel, L("s6b", -0.2), { y: 20 }); appear(So.sel, L("s6c", 0.3));
      lineHl(Sh, [1], WD("s6b", "outer"), 1.8); lineHl(Sh, [8], WD("s6b", "let"), 2.2, "rgba(251,191,36,.35)");
      lineHl(Sh, [4], WD("s6c", "throws") - 0.8, 2.4, "rgba(251,113,133,.35)"); rowIn(So, 0, WD("s6c", "throws"));

      // wrap
      wipe(L("s7a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 190, cls: "c6", fs: 52, html: '<code>let</code> <code>const</code> <code>class</code><small>locked until declared</small>' });
      const w2 = box("w2", { x: 60, y: 720, w: 960, h: 190, cls: "c4", fs: 52, html: '<code>var</code><small>quietly undefined</small>' });
      const w3 = box("w3", { x: 60, y: 940, w: 960, h: 190, cls: "c5", fs: 52, html: 'loud errors beat silent bugs' });
      appear(w1, L("s7a", 0.2)); appear(w2, WD("s7b", "silent")); appear(w3, WD("s7b", "safer"));
      cheer("#sam", L("s7c", 0.3));
