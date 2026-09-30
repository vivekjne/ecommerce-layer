      // Q1: == vs ===
      const C = (a, b) => CASES.slice(a, b).map((c) => [c.code, c.expect]);
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // hook: the two operators
      const eqA = box("eq-a", { x: 60, y: 540, w: 450, h: 400, cls: "c1", fs: 46, html: '<div style="font-size:130px;font-family:var(--mono);color:#22d3ee">==</div>converts types<small>then compares</small>' });
      const eqB = box("eq-b", { x: 570, y: 540, w: 450, h: 400, cls: "c2", fs: 46, html: '<div style="font-size:130px;font-family:var(--mono);color:#a78bfa">===</div>no conversion<small>type and value</small>' });
      appear(eqA, WD("s1b", "==")); appear(eqB, WD("s1b", "==="));
      const hint = note("hint", { x: 60, y: 1010, w: 960, html: 'Same value, <b>different type?</b>' });
      appear(hint, L("s1c", 0));

      // basics
      wipe(L("s2a", -0.15));
      const A = codeBlock("cA", { y: 500, fs: 54, lines: C(0, 6).flatMap((c, i) => (i % 2 === 1 ? [c] : [c])) });
      lineHide(A, [1, 2, 3, 4, 5, 6]);
      appear(A.sel, L("s2a", 0.2), { y: 20 });
      const n1 = note("n1", { x: 60, y: 1050, w: 960, html: '<b>false</b> becomes <b>0</b>' });
      const n2 = note("n2", { x: 60, y: 1050, w: 960, html: 'boolean vs number: <b>different types</b>' });
      const n3 = note("n3", { x: 60, y: 1050, w: 960, html: 'the string becomes <b>1</b> with <code>==</code>' });
      const n4 = note("n4", { x: 60, y: 1050, w: 960, html: '<code>null</code> and <code>undefined</code> are a special pair' });
      lineIn(A, [1, 2, 3, 4, 5, 6], L("s2a", 0.9), 0);
      // (all lines visible from the start of the explanation; results appear with the voice)
      lineHl(A, [1], L("s2b", 0), 3.0); appear(n1, L("s2b", 0.2)); resIn(A, 1, WD("s2b", "true"));
      tl.set(n1, { opacity: 0 }, L("s2c", 0)); lineHl(A, [2], L("s2c", 0), 3.0); appear(n2, L("s2c", 0.1)); resIn(A, 2, WD("s2c", "false"));
      tl.set(n2, { opacity: 0 }, L("s2d", 0)); lineHl(A, [3, 4], L("s2d", 0), 3.0); appear(n3, L("s2d", 0.1)); resIn(A, 3, WD("s2d", "string")); resIn(A, 4, WD("s2d", "number"));
      tl.set(n3, { opacity: 0 }, L("s2e", 0)); lineHl(A, [5, 6], L("s2e", 0), 4.0); appear(n4, L("s2e", 0.1)); resIn(A, 5, WD("s2e", "true")); resIn(A, 6, WD("s2e", "false"));

      // NaN and objects
      wipe(L("s3a", -0.15));
      const B = codeBlock("cB", { y: 500, fs: 54, lines: C(6, 12) });
      lineHide(B, [1, 2, 3, 4, 5, 6]);
      appear(B.sel, L("s3b", -0.2), { y: 20 });
      const q3 = pill("q3", { x: 300, y: 1060, cls: "vi", fs: 44, html: "so, always safe?" });
      appear(q3, L("s3a", 0.3));
      tl.set(q3, { opacity: 0 }, L("s3b", -0.2));
      lineIn(B, [1, 2], L("s3b", 0.2), 0.5); resIn(B, 1, WD("s3b", "anything")); resIn(B, 2, WD("s3b", "operator"));
      lineIn(B, [3, 4], L("s3c", 0.1), 0.9); resIn(B, 3, WD("s3c", "Number.isNaN")); resIn(B, 4, WD("s3c", "Object.is"));
      lineIn(B, [5, 6], L("s3d", 0.1), 0.6); resIn(B, 5, WD("s3d", "empty")); resIn(B, 6, WD("s3d", "equal"));
      const n5 = note("n5", { x: 60, y: 1050, w: 960, html: 'objects compare by <b>reference</b>' });
      appear(n5, WD("s3d", "Objects"));

      // the classic trap
      wipe(L("s4a", -0.15));
      const Cc = codeBlock("cC", { y: 520, fs: 62, lines: C(12, 15) });
      lineHide(Cc, [1, 2, 3]);
      appear(Cc.sel, L("s4b", -0.3), { y: 20 });
      lineIn(Cc, [1], L("s4b", 0.3)); resIn(Cc, 1, WD("s4b", "false"));
      lineIn(Cc, [2], WD("s4b", "null", 1)); resIn(Cc, 2, WD("s4b", "true"));
      const n6 = box("n6", { x: 60, y: 880, w: 960, h: 260, cls: "c4", fs: 52, html: 'comparisons turn <code>null</code> into <code>0</code><small><code>==</code> has its own rule for null</small>' });
      lineIn(Cc, [3], L("s4c", 0.2)); resIn(Cc, 3, L("s4c", 1.0)); appear(n6, L("s4c", 0.6));

      // the rule
      wipe(L("s5a", -0.15));
      const d1 = box("d1", { x: 60, y: 500, w: 960, h: 200, cls: "c5", fs: 64, html: 'Default: <code>===</code>' });
      appear(d1, L("s5a", 0.3));
      const d2 = box("d2", { x: 60, y: 740, w: 960, h: 240, cls: "c4", fs: 56, html: 'Exception: <code>x == null</code><small>null or undefined, nothing else</small>' });
      appear(d2, L("s5b", 0.2));
      const Dd = codeBlock("cD", { y: 1010, fs: 52, lines: C(15, 18) });
      lineHide(Dd, [1, 2, 3]);
      appear(Dd.sel, L("s5c", 0.1), { y: 20 });
      lineIn(Dd, [1, 2, 3], L("s5c", 0.2), 0.5);
      resIn(Dd, 1, WD("s5c", "null")); resIn(Dd, 2, WD("s5c", "nothing")); resIn(Dd, 3, WD("s5c", "nothing", 0) + 0.5);
      cheer("#sam", L("s5e", 0.3));
