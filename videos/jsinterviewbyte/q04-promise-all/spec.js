      // Q4: does Promise.all cancel the others? promises as receipts, a fan-in diagram, three racing tasks, an abort signal
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      const h1 = box("h1", { x: 60, y: 540, w: 960, h: 200, cls: "c6", fs: 56, html: 'one promise rejects…' });
      const h2 = box("h2", { x: 60, y: 780, w: 960, h: 200, cls: "c5", fs: 56, html: '…do the others stop?' });
      appear(h1, L("s1b", 0.1)); appear(h2, WD("s1b", "keep"));
      tl.set(h2, { innerHTML: "<div>…no, they keep running</div>" }, WD("s1b", "keep") + 0.2);

      // what is a promise
      wipe(L("s2a", -0.15));
      const pc = box("pc", { x: 60, y: 500, w: 960, h: 200, cls: "c1", fs: 60, html: 'Promise<small>a receipt for a result that arrives later</small>' });
      appear(pc, WD("s2a", "receipt"));
      const sp = tok("sp", { x: 70, y: 880, cls: "c", fs: 46, html: "pending" });
      const sf = tok("sf", { x: 520, y: 800, cls: "e", fs: 40, html: 'fulfilled<small>with a value</small>' });
      const sr = tok("sr", { x: 520, y: 950, cls: "f", fs: 40, html: 'rejected<small>with an error</small>' });
      const l1 = line("sl1", { x1: 300, y1: 895, x2: 510, y2: 835, c: "L", w: 6 });
      const l2 = line("sl2", { x1: 300, y1: 915, x2: 510, y2: 985, c: "R", w: 6 });
      appear(sp, WD("s2b", "pending"));
      appear(sf, WD("s2b", "fulfilled")); drawLine(l1, WD("s2b", "fulfilled") - 0.2);
      appear(sr, WD("s2b", "rejected")); drawLine(l2, WD("s2b", "rejected") - 0.2);

      // Promise.all: many in, one out
      wipe(L("s3a", -0.15));
      const ip = [0, 1, 2].map((i) => tok("ip" + i, { x: 100 + i * 300, y: 500, cls: "c", fs: 40, html: "promise " + (i + 1) + "<small>pending</small>" }));
      const pa = box("pa", { x: 200, y: 720, w: 680, h: 130, cls: "c2", fs: 50, html: '<code>Promise.all([…])</code>' });
      const ol = ip.map((_, i) => line("ol" + i, { x1: 200 + i * 300, y1: 590, x2: 400 + i * 140, y2: 715, c: "V", w: 6 }));
      const op = tok("op", { x: 330, y: 930, cls: "a", fs: 46, html: "one promise<small>waiting for all three</small>" });
      const ol2 = line("ol2", { x1: 540, y1: 855, x2: 540, y2: 920, c: "V", w: 6 });
      ip.forEach((t, i) => appear(t, WD("s3a", "several") + i * 0.3, { y: 10 }));
      appear(pa, WD("s3a", "takes")); ol.forEach((l, i) => drawLine(l, WD("s3a", "takes") + 0.3 + i * 0.15));
      appear(op, WD("s3a", "one")); drawLine(ol2, WD("s3a", "one") - 0.2);
      // one rejects: the combined promise rejects at once
      swapHTML(ip[1], "promise 2<small>rejected</small>", WD("s3b", "rejected")); tl.set(ip[1], { backgroundColor: "#fb7185" }, WD("s3b", "rejected")); pulse(ip[1], WD("s3b", "rejected"), 1.2);
      swapHTML(op, "one promise<small>rejected immediately</small>", WD("s3b", "immediately")); tl.set(op, { backgroundColor: "#fb7185" }, WD("s3b", "immediately")); pulse(op, WD("s3b", "immediately"), 1.2);

      // demo: code, then three tasks racing
      wipe(L("s4a", -0.15));
      const P = codeBlock("cP", { y: 480, fs: 36, name: "the experiment", lines: SLF(0, "Promise.all") });
      appear(P.sel, L("s4a", 0.1), { y: 20 });
      lineHl(P, [2], WD("s4a", "three", 1), 1.8); lineHl(P, [3], WD("s4a", "fails"), 1.8, "rgba(251,113,133,.35)"); lineHl(P, [4], WD("s4a", "two"), 1.8);
      const hp = note("hp", { x: 60, y: 830, w: 960, fs: 36, html: '<code>wait(ms, name)</code> prints its name when done<br><code>fail(ms)</code> rejects with an error' });
      appear(hp, L("s4a", 1.0));
      gone(P.sel, L("s4b", -0.1)); gone(hp, L("s4b", -0.1));
      const laneY = [520, 630, 740], laneW = [900, 300, 600], names = ["A · 300 ms", "fail · 100 ms", "C · 200 ms"], cls = ["c1", "c6", "c2"];
      const bars = names.map((n, i) => {
        const back = box("lb" + i, { x: 60, y: laneY[i], w: 960, h: 92, cls: "c1", fs: 34, html: "" });
        const bar = box("bar" + i, { x: 60, y: laneY[i], w: laneW[i], h: 92, cls: cls[i], fs: 34, html: "" });
        const lb = note("lab" + i, { x: 90, y: laneY[i] + 22, w: 500, fs: 36, html: n });
        tl.set(lb, { textAlign: "left", zIndex: 5 }, 0);
        tl.set(bar, { scaleX: 0, transformOrigin: "0% 50%" }, 0);
        return { back, bar, lb };
      });
      bars.forEach((b, i) => { appear(b.back, L("s4b", -0.1), { y: 10 }); appear(b.lb, L("s4b", -0.1), { y: 10 }); tl.set(b.bar, { opacity: 1 }, L("s4b", -0.1)); });
      const pst = box("pst", { x: 60, y: 860, w: 960, h: 100, cls: "c2", fs: 46, html: '<code>Promise.all</code> · pending' });
      appear(pst, L("s4b", -0.1));
      const Co = consoleBox("cCo", { y: 1035, fs: 40, rows: CASES[0].expect.map((x, i) => [x, i ? "cy" : "no"]) });
      appear(Co.sel, L("s4b", 0.2));
      const t0 = L("s4b", 0.2), U = Math.min(WD("s4b", "rejected") - t0, (L("s5a", -0.5) - t0) / 3);
      bars.forEach((b, i) => tl.to(b.bar, { scaleX: 1, duration: U * (laneW[i] / 300), ease: "none" }, t0));
      tl.to(bars[1].bar, { backgroundColor: "#7f1d3a", duration: 0.2 }, t0 + U);
      swapHTML(pst + " > div", '<code>Promise.all</code> · <b style="color:#fda4af">rejected!</b>', t0 + U); tint(pst, t0 + U, "#fb7185"); pulse(pst, t0 + U, 1.06);
      rowIn(Co, 0, t0 + U); rowIn(Co, 1, t0 + U * 2); rowIn(Co, 2, t0 + U * 3);
      const kp = note("kp", { x: 60, y: 975, w: 960, fs: 38, html: 'the other tasks keep going' });
      appear(kp, t0 + U * 1.2);

      // why: the promise is only the receipt
      wipe(L("s5a", -0.15));
      tl.set(kp, { opacity: 0 }, L("s5a", -0.15));
      const wr = box("wr", { x: 60, y: 500, w: 960, h: 170, cls: "c1", fs: 54, html: 'the Promise<small>only the receipt</small>' });
      const ww = box("ww", { x: 60, y: 860, w: 960, h: 170, cls: "c4", fs: 54, html: 'the work<small>a timer, a request, a stream</small>' });
      const wl = line("wl", { x1: 540, y1: 680, x2: 540, y2: 850, c: "R", w: 8, dash: true });
      const wn = pill("wn", { x: 380, y: 725, cls: "co", fs: 44, html: "no cancel()" });
      appear(wr, WD("s5b", "receipt") - 0.4); appear(wn, WD("s5b", "cancel")); drawLine(wl, WD("s5b", "cancel") + 0.1);
      appear(ww, WD("s5c", "work")); tl.fromTo(ww, { boxShadow: "0 0 0 rgba(251,191,36,0)" }, { boxShadow: "0 0 40px rgba(251,191,36,.7)", duration: 0.6, yoyo: true, repeat: 3 }, WD("s5c", "itself"));

      // fix: one AbortController, one shared signal
      wipe(L("s6a", -0.15));
      const Fx = codeBlock("cFx", { y: 470, fs: 34, name: "AbortController", lines: SLF(1, "const ac") });
      appear(Fx.sel, L("s6a", 0.1), { y: 20 });
      lineHl(Fx, [1], WD("s6a", "AbortController"), 1.8); lineHl(Fx, [3, 5], WD("s6a", "signal") - 0.4, 2.0);
      const ac = box("ac", { x: 270, y: 1000, w: 540, h: 90, cls: "c3", fs: 38, html: 'AbortController' });
      const tk = [0, 1, 2].map((i) => box("tk" + i, { x: 60 + i * 330, y: 1170, w: 300, h: 90, cls: "c1", fs: 34, html: ["task A", "task fail", "task C"][i] }));
      const sg = [[440, 1090, 210, 1165], [540, 1095, 540, 1165], [640, 1090, 870, 1165]].map((p, i) => line("sg" + i, { x1: p[0], y1: p[1], x2: p[2], y2: p[3], c: "V", w: 6 }));
      appear(ac, WD("s6a", "AbortController") + 0.4); tk.forEach((t, i) => appear(t, WD("s6a", "task") + i * 0.2)); sg.forEach((l, i) => drawLine(l, WD("s6a", "signal") + i * 0.15));
      tint(tk[1], WD("s6b", "fails"), "#fb7185"); swapHTML(tk[1] + " > div", "task fail ✗", WD("s6b", "fails"));
      tint(ac, WD("s6b", "abort"), "#fbbf24"); pulse(ac, WD("s6b", "abort"), 1.1);
      sg.forEach((l) => { tl.to(l, { stroke: "#fbbf24", duration: 0.3 }, WD("s6b", "abort") + 0.2); });
      [0, 2].forEach((i) => { swapHTML(tk[i] + " > div", ["task A", "", "task C"][i] + " · stopped", WD("s6b", "stop")); tint(tk[i], WD("s6b", "stop"), "#6b7299", "#101538"); });
      const Fo = consoleBox("cFo", { y: 480, fs: 46, rows: [[EX(1), "no"]] });
      gone(Fx.sel, WD("s6c", "Now") - 0.1); appear(Fo.sel, WD("s6c", "Now")); rowIn(Fo, 0, WD("s6c", "rejected"));
      const nx = note("nx", { x: 60, y: 700, w: 960, fs: 48, html: 'A and C never finish' });
      appear(nx, WD("s6c", "never"));

      // allSettled + wrap
      wipe(L("s7a", -0.15));
      tl.set([ac, ...sg, ...tk], { opacity: 0 }, L("s7a", -0.15));
      const As = codeBlock("cAs", { y: 480, fs: 34, name: "allSettled", lines: CASES[2].script.split("\n") });
      const Ao = consoleBox("cAo", { y: 850, fs: 44, rows: [[EX(2), "cy"]] });
      appear(As.sel, L("s7b", -0.3), { y: 20 }); appear(Ao.sel, L("s7b", 0.4));
      rowIn(Ao, 0, WD("s7b", "reports"));
      const q1 = box("q1", { x: 60, y: 1010, w: 960, h: 130, cls: "c5", fs: 48, html: 'Promise.all combines results' });
      appear(q1, WD("s7c", "combines"));
      const q2 = box("q2", { x: 60, y: 1160, w: 960, h: 110, cls: "c6", fs: 46, html: 'it does not cancel work' });
      appear(q2, WD("s7c", "not"));
      cheer("#sam", LE("s7c", -1.4));
