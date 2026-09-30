      // Q1: == vs ===, explained with two "machines" the values travel through
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // hook
      const eqA = box("eq-a", { x: 60, y: 560, w: 450, h: 300, cls: "c1", fs: 46, html: '<div style="font-size:120px;font-family:var(--mono);color:#22d3ee">==</div>loose<small>converts types first</small>' });
      const eqB = box("eq-b", { x: 570, y: 560, w: 450, h: 300, cls: "c2", fs: 46, html: '<div style="font-size:120px;font-family:var(--mono);color:#a78bfa">===</div>strict<small>the type must match</small>' });
      appear(eqA, WD("s1a", "==")); appear(eqB, WD("s1a", "==="));
      const eqQ = note("eq-q", { x: 60, y: 940, w: 960, fs: 50, html: 'Two ways to ask <b>"are these equal?"</b>' });
      appear(eqQ, L("s1b", 0.2));

      // types
      wipe(L("s2a", -0.15));
      const t1 = cell("ty1", { x: 60, y: 540, w: 300, h: 210, label: "number", html: "1", fs: 84, border: "#22d3ee" });
      const t2 = cell("ty2", { x: 390, y: 540, w: 300, h: 210, label: "string", html: '"1"', fs: 84, border: "#fbbf24" });
      const t3 = cell("ty3", { x: 720, y: 540, w: 300, h: 210, label: "boolean", html: "true", fs: 72, border: "#f472b6" });
      appear(t1, WD("s2a", "Numbers")); appear(t2, WD("s2a", "strings")); appear(t3, WD("s2a", "booleans"));
      const tyN = note("ty-n", { x: 60, y: 820, w: 960, fs: 50, html: 'a <b>type</b> = the kind of value' });
      appear(tyN, WD("s2a", "type"));
      const tyD = pill("ty-d", { x: 210, y: 960, cls: "co", fs: 48, html: "look alike, different types" });
      appear(tyD, WD("s2b", "different"));
      tint(t1, WD("s2b", "number"), "#fb7185"); tint(t2, WD("s2b", "string"), "#fb7185");

      // lane builder: two stations, tokens travel underneath
      function lane(k, y0, title, a, aCls, b) {
        return {
          k, y0,
          title: lab(k + "-t", { x: 60, y: y0 - 64, fs: 40, html: title }),
          a: box(k + "-a", { x: 220, y: y0, w: 320, h: 110, cls: aCls, fs: 38, html: a }),
          b: box(k + "-b", { x: 595, y: y0, w: 290, h: 110, cls: "c1", fs: 38, html: b }),
          l1: line(k + "-l1", { x1: 545, y1: y0 + 55, x2: 590, y2: y0 + 55, c: "W", w: 5 }),
          l2: line(k + "-l2", { x1: 889, y1: y0 + 55, x2: 916, y2: y0 + 55, c: "W", w: 5 }),
          aHTML: a,
        };
      }
      const strict = lane("st", 610, '<b>===</b> strict', "same type?", "c2", "same value?");
      const loose = lane("lo", 900, '<b>==</b> loose', "convert types", "c4", "same value?");
      const tokens = (ln, defs, t) => defs.map((d, i) => {
        const id = ln.k + "-tk" + (i + 1) + "-" + Math.round(t * 10);
        const s = tok(id, { x: 40 + i * 155, y: ln.y0 + 124, cls: d.cls, fs: 36, html: d.html });
        appear(s, t + i * 0.15, { y: 10 });
        return s;
      });
      const result = (ln, ok, t) => {
        const id = ln.k + "-r-" + Math.round(t * 10);
        const p = pill(id, { x: 922, y: ln.y0 + 34, cls: ok ? "li" : "co", fs: 36, html: String(ok) });
        appear(p, t, { y: 10 });
        return p;
      };
      const resetLane = (ln, t, els) => { els.forEach((e) => gone(e, t)); swapHTML(ln.a + " > div", ln.aHTML, t); tint(ln.a, t, ln.k === "st" ? "#a78bfa" : "#fbbf24"); tl.set(ln.b, { opacity: 1 }, t); };
      const toStation = (toks, t, dx) => toks.forEach((s, i) => path(s, t + i * 0.1, [[dx, 0]], 0.8));
      const toSecond = (toks, t, dx) => toks.forEach((s, i) => path(s, t + i * 0.1, [[dx, 0]], 0.8));

      // strict lane
      wipe(L("s3a", -0.15));
      appear(strict.title, L("s3a", 0.1)); appear(strict.a, WD("s3a", "type")); drawLine(strict.l1, WD("s3a", "type") + 0.3); appear(strict.b, WD("s3a", "value")); drawLine(strict.l2, WD("s3a", "value") + 0.3);
      const stN = note("st-n", { x: 60, y: 1150, w: 960, fs: 46, html: 'types differ → <b>false</b>, no more checks' });
      appear(stN, WD("s3b", "types"));

      // loose lane
      appear(loose.title, L("s4a", 0.1)); appear(loose.a, WD("s4a", "converts")); drawLine(loose.l1, WD("s4a", "converts") + 0.3); appear(loose.b, WD("s4a", "compares")); drawLine(loose.l2, WD("s4a", "compares") + 0.3);
      const loN = note("lo-n", { x: 60, y: 1170, w: 960, fs: 46, html: 'types differ → <b>convert</b>, then compare' });
      tl.set(stN, { opacity: 0 }, L("s4a", 0.1)); appear(loN, WD("s4a", "converts"));

      // demo one: "1" vs 1
      const d1 = tokens(loose, [{ cls: "c", html: '"1"<small>string</small>' }, { cls: "b", html: '1<small>number</small>' }], L("s5a", 0.3));
      toStation(d1, WD("s5a", "converted") - 0.4, 190);
      tint(loose.a, WD("s5a", "converted") + 0.3, "#fde68a");
      swapHTML(d1[0], '1<small>number</small>', WD("s5a", "converted") + 0.7); pulse(d1[0], WD("s5a", "converted") + 0.7, 1.25);
      toSecond(d1, WD("s5a", "Now") - 0.2, 355);
      result(loose, true, WD("s5a", "true"));
      // ...and the strict lane
      const d2 = tokens(strict, [{ cls: "c", html: '"1"<small>string</small>' }, { cls: "b", html: '1<small>number</small>' }], L("s5b", 0.2));
      toStation(d2, WD("s5b", "types") - 0.1, 190);
      swapHTML(strict.a + " > div", 'same type? ' + CROSS, WD("s5b", "different")); tint(strict.a, WD("s5b", "different"), "#fb7185");
      tl.to(strict.b, { opacity: 0.3, duration: 0.3 }, WD("s5b", "stops"));
      result(strict, false, WD("s5b", "false"));

      // demo two: 0 vs false
      const T2 = L("s6a", -0.1);
      resetLane(loose, T2, [...d1, "#lo-r-" + Math.round(WD("s5a", "true") * 10)]);
      resetLane(strict, T2, [...d2, "#st-r-" + Math.round(WD("s5b", "false") * 10)]);
      const d3 = tokens(loose, [{ cls: "b", html: '0<small>number</small>' }, { cls: "d", html: 'false<small>boolean</small>' }], L("s6a", 0.3));
      toStation(d3, WD("s6a", "converts") - 0.3, 190);
      tint(loose.a, WD("s6a", "converts") + 0.2, "#fde68a");
      swapHTML(d3[1], '0<small>number</small>', WD("s6a", "number") - 0.2); pulse(d3[1], WD("s6a", "number") - 0.2, 1.25);
      toSecond(d3, WD("s6a", "match") - 1.0, 355);
      result(loose, true, WD("s6a", "match"));
      const d4 = tokens(strict, [{ cls: "b", html: '0<small>number</small>' }, { cls: "d", html: 'false<small>boolean</small>' }], L("s6b", 0.2));
      toStation(d4, WD("s6b", "sees") + 0.2, 190);
      swapHTML(strict.a + " > div", 'same type? ' + CROSS, WD("s6b", "Different")); tint(strict.a, WD("s6b", "Different"), "#fb7185");
      tl.to(strict.b, { opacity: 0.3, duration: 0.3 }, WD("s6b", "Different"));
      result(strict, false, WD("s6b", "false"));

      // special pair
      wipe(L("s7a", -0.15));
      [strict, loose].forEach((ln) => [ln.title, ln.a, ln.b, ln.l1, ln.l2].forEach((e) => gone(e, L("s7a", -0.15))));
      gone(stN, L("s7a", -0.15)); gone(loN, L("s7a", -0.15));
      tl.set([...d3, ...d4, "#lo-r-" + Math.round(WD("s6a", "match") * 10), "#st-r-" + Math.round(WD("s6b", "false") * 10)], { opacity: 0 }, L("s7a", -0.15));
      const sp1 = tok("sp1", { x: 150, y: 540, cls: "a", fs: 64, html: "null" });
      const sp2 = tok("sp2", { x: 620, y: 540, cls: "c", fs: 64, html: "undefined" });
      const spL = line("sp-l", { x1: 380, y1: 575, x2: 600, y2: 575, c: "P", w: 6, arrow: false });
      const spP = pill("sp-p", { x: 330, y: 640, cls: "pk", fs: 36, html: "a special pair" });
      appear(sp1, L("s7a", 0.3)); appear(sp2, WD("s7a", "undefined")); drawLine(spL, WD("s7a", "undefined") + 0.3); appear(spP, WD("s7a", "special") + 0.3);
      const sc = codeBlock("sc", { y: 780, fs: 46, lines: [[CASES[4].code, "true"], [CASES[5].code, "false"]] });
      lineHide(sc, [1, 2]); appear(sc.sel, WD("s7a", "double") - 0.3, { y: 20 });
      lineIn(sc, [1], WD("s7a", "double")); resIn(sc, 1, WD("s7a", "true"));
      lineIn(sc, [2], WD("s7a", "triple")); resIn(sc, 2, WD("s7a", "false"));

      // NaN
      wipe(L("s8a", -0.15));
      const nq = tok("nq", { x: 330, y: 560, cls: "f", fs: 80, html: "NaN" });
      appear(nq, L("s8a", 0.4));
      const n1 = cell("n1", { x: 100, y: 540, w: 300, h: 190, label: "value", html: "NaN", fs: 70, border: "#fb7185" });
      const n2 = cell("n2", { x: 680, y: 540, w: 300, h: 190, label: "same value", html: "NaN", fs: 70, border: "#fb7185" });
      const ne = note("ne", { x: 420, y: 570, w: 240, fs: 120, html: "≠" });
      tl.set(nq, { opacity: 0 }, L("s8b", -0.05));
      appear(n1, L("s8b", 0.1)); appear(n2, WD("s8b", "itself") - 0.5); appear(ne, WD("s8b", "itself") - 0.2);
      const nn = lab("nn", { x: 60, y: 780, fs: 42, html: 'not even equal to <b>itself</b>' });
      appear(nn, WD("s8b", "itself") + 0.3);
      const nc = codeBlock("nc", { y: 870, fs: 42, lines: [[CASES[6].code, "false"], [CASES[7].code, "false"], [CASES[8].code, "true"]] });
      lineHide(nc, [1, 2, 3]); appear(nc.sel, L("s8c", 0.1), { y: 20 });
      lineIn(nc, [1], L("s8c", 0.2)); lineIn(nc, [2], L("s8c", 0.6)); resIn(nc, 1, WD("s8c", "false")); resIn(nc, 2, WD("s8c", "false") + 0.4);
      lineIn(nc, [3], WD("s8c", "test")); resIn(nc, 3, WD("s8c", "Number.isNaN"));

      // objects: names point at places in memory
      wipe(L("s9a", -0.15));
      const mem = zone("mem", { x: 60, y: 520, w: 960, h: 480, label: "memory", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      appear(mem, L("s9a", 0.2));
      const byRef = lab("byref", { x: 60, y: 1030, fs: 42, html: 'compared by <b>reference</b>, not content' });
      appear(byRef, WD("s9a", "reference"));
      const na = tok("na", { x: 170, y: 590, cls: "a", fs: 46, html: "a" });
      const nc2 = tok("nc2", { x: 790, y: 590, cls: "c", fs: 46, html: "c" });
      const la = line("la", { x1: 200, y1: 665, x2: 200, y2: 720, c: "V", w: 6 });
      const lc = line("lc", { x1: 820, y1: 665, x2: 820, y2: 720, c: "A", w: 6 });
      const ca = cell("ca", { x: 90, y: 730, w: 290, h: 200, label: "place #1", html: "[ ]", fs: 80, border: "#a78bfa" });
      const cc = cell("cc", { x: 690, y: 730, w: 290, h: 200, label: "place #2", html: "[ ]", fs: 80, border: "#fbbf24" });
      appear(na, WD("s9b", "arrays") - 0.2); appear(nc2, WD("s9b", "identical") - 0.2);
      appear(ca, WD("s9b", "identical")); appear(cc, WD("s9b", "identical") + 0.3);
      drawLine(la, WD("s9b", "identical") + 0.5); drawLine(lc, WD("s9b", "identical") + 0.8);
      const ne2 = note("ne2", { x: 420, y: 790, w: 240, fs: 110, html: "≠" });
      appear(ne2, WD("s9c", "Different") - 0.3);
      const oc = codeBlock("oc", { y: 1100, fs: 46, lines: [[CASES[9].script.split("\n")[2].replace("console.log(", "").replace(");", ""), "false"]] });
      appear(oc.sel, WD("s9c", "operators") - 0.3, { y: 20 }); resIn(oc, 1, WD("s9c", "false"));
      // two names, one array
      const T9 = L("s9d", 0.1);
      gone(nc2, T9); gone(lc, T9); gone(cc, T9); gone(ne2, T9); gone(oc.sel, T9);
      const nb = tok("nb", { x: 300, y: 590, cls: "e", fs: 46, html: "b" });
      const lb = line("lb", { x1: 330, y1: 665, x2: 300, y2: 728, c: "L", w: 6 });
      appear(nb, T9 + 0.2); drawLine(lb, T9 + 0.6);
      const eq2 = note("eq2", { x: 420, y: 790, w: 240, fs: 110, html: "=" });
      const ob = codeBlock("ob", { y: 1100, fs: 46, lines: [["a === b", "true"]] });
      appear(eq2, WD("s9d", "same")); appear(ob.sel, WD("s9d", "same") - 0.2, { y: 20 }); resIn(ob, 1, WD("s9d", "equal"));

      // rule
      wipe(L("s10a", -0.15));
      tl.set([mem, byRef, na, la, ca, nb, lb, eq2, ob.sel], { opacity: 0 }, L("s10a", -0.15));
      const r1 = box("r1", { x: 60, y: 500, w: 960, h: 170, cls: "c5", fs: 64, html: 'Default: <code>===</code>' });
      appear(r1, WD("s10a", "Use"));
      const r2 = box("r2", { x: 60, y: 700, w: 960, h: 200, cls: "c4", fs: 54, html: 'Exception: <code>x == null</code><small>null or undefined, nothing else</small>' });
      appear(r2, L("s10b", 0.2));
      const rc = codeBlock("rc", { y: 940, fs: 46, lines: [[CASES[12].code, "true"], [CASES[13].code, "false"], [CASES[14].code, "false"]] });
      lineHide(rc, [1, 2, 3]); appear(rc.sel, WD("s10b", "It") - 0.2, { y: 20 });
      lineIn(rc, [1], WD("s10b", "It")); resIn(rc, 1, WD("s10b", "true"));
      lineIn(rc, [2], WD("s10b", "and", 1) - 0.2); resIn(rc, 2, WD("s10b", "nothing"));
      lineIn(rc, [3], WD("s10b", "nothing")); resIn(rc, 3, WD("s10b", "else") + 0.2);
      cheer("#sam", L("s10d", 0.3));
