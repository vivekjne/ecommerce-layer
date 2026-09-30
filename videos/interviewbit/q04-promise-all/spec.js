      // Q4: does Promise.all cancel?
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      const h1 = box("h1", { x: 60, y: 540, w: 960, h: 200, cls: "c6", fs: 56, html: 'one promise rejects…' });
      const h2 = box("h2", { x: 60, y: 780, w: 960, h: 200, cls: "c5", fs: 56, html: '…the others keep running' });
      appear(h1, L("s1b", 0.1)); appear(h2, WD("s1b", "keep"));

      // demo: code first, then the three lanes
      wipe(L("s2a", -0.15));
      const P = codeBlock("cP", { y: 480, fs: 38, name: "the experiment", lines: SLF(0, "Promise.all") });
      appear(P.sel, L("s2a", 0.2), { y: 20 });
      const hp = note("hp", { x: 60, y: 880, w: 960, fs: 36, html: '<code>wait(ms, name)</code> logs its name when done<br><code>fail(ms)</code> rejects with an error' });
      appear(hp, L("s2a", 1.0));
      lineHl(P, [2], WD("s2a", "three"), 1.4); lineHl(P, [3], WD("s2a", "one", 1), 1.6, "rgba(251,113,133,.35)"); lineHl(P, [4], WD("s2a", "two"), 1.4);

      // lanes (3 px per millisecond)
      tl.set([P.sel, hp], { opacity: 0 }, L("s2b", -0.1));
      const laneY = [520, 640, 760], laneW = [900, 300, 600], names = ["A · 300 ms", "fail · 100 ms", "C · 200 ms"], cls = ["c1", "c6", "c2"];
      const bars = names.map((n, i) => {
        const back = box("lb" + i, { x: 60, y: laneY[i], w: 960, h: 92, cls: "c1", fs: 34, style: "" , html: "" });
        const bar = box("bar" + i, { x: 60, y: laneY[i], w: laneW[i], h: 92, cls: cls[i], fs: 34, html: "" });
        const lab = note("lab" + i, { x: 90, y: laneY[i] + 22, w: 500, fs: 36, html: n });
        tl.set(lab, { textAlign: "left", zIndex: 5 }, 0);
        return { back, bar, lab };
      });
      bars.forEach((b, i) => { appear(b.back, L("s2b", -0.1), { y: 10 }); appear(b.lab, L("s2b", -0.1), { y: 10 }); tl.set(b.bar, { opacity: 0 }, 0); tl.set(b.bar, { opacity: 1 }, L("s2b", -0.1)); tl.set(b.bar, { scaleX: 0, transformOrigin: "0% 50%" }, 0); });
      const flag = pill("flag", { x: 250, y: 890, cls: "co", fs: 40, html: "rejected!" });
      const Co = consoleBox("cCo", { y: 960, fs: 42, rows: CASES[0].expect.map((x, i) => [x, i ? "cy" : "no"]) });
      appear(Co.sel, L("s2b", 0.2));
      const t0 = L("s2b", 0.6), unit = 1.6; // seconds of video per 100 ms of task time
      bars.forEach((b, i) => tl.to(b.bar, { scaleX: 1, duration: unit * (laneW[i] / 300), ease: "none" }, t0));
      appear(flag, t0 + unit); rowIn(Co, 0, t0 + unit);
      tl.to(bars[1].bar, { backgroundColor: "#7f1d3a", duration: 0.2 }, t0 + unit);
      rowIn(Co, 1, t0 + unit * 2); rowIn(Co, 2, t0 + unit * 3);
      tl.set(flag, { opacity: 0 }, t0 + unit * 3.6);

      // why
      wipe(L("s3a", -0.15));
      const y1 = box("y1", { x: 60, y: 500, w: 960, h: 200, cls: "c1", fs: 50, html: 'a promise = a result that will arrive' });
      const y2 = box("y2", { x: 60, y: 740, w: 960, h: 200, cls: "c6", fs: 50, html: 'no <code>.cancel()</code> method' });
      const y3 = box("y3", { x: 60, y: 980, w: 960, h: 220, cls: "c4", fs: 46, html: 'stopping the work is up to the work<small>timers, requests, streams</small>' });
      appear(y1, WD("s3b", "result")); appear(y2, WD("s3b", "cancel")); appear(y3, WD("s3c", "stopping") - 0.2);

      // fix
      wipe(L("s4a", -0.15));
      const Fx = codeBlock("cFx", { y: 470, fs: 36, name: "AbortController", lines: SLF(1, "const ac") });
      const Fo = consoleBox("cFo", { y: 1050, fs: 44, rows: [[EX(1), "no"]] });
      appear(Fx.sel, L("s4a", 0.1), { y: 20 }); appear(Fo.sel, L("s4c", 0.1));
      lineHl(Fx, [1], WD("s4a", "AbortController"), 1.8); lineHl(Fx, [3, 5], WD("s4a", "signal") - 0.4, 2.0);
      lineHl(Fx, [8], WD("s4b", "abort"), 2.4, "rgba(251,113,133,.35)");
      rowIn(Fo, 0, WD("s4c", "rejected"));
      const nx = note("nx", { x: 60, y: 1190, w: 960, fs: 48, html: 'A and C never finish' });
      appear(nx, WD("s4c", "never"));

      // allSettled
      wipe(L("s5a", -0.15));
      const As = codeBlock("cAs", { y: 480, fs: 34, name: "allSettled", lines: CASES[2].script.split("\n") });
      const Ao = consoleBox("cAo", { y: 850, fs: 44, rows: [[EX(2), "cy"]] });
      appear(As.sel, L("s5b", -0.3), { y: 20 }); appear(Ao.sel, L("s5b", 0.4));
      rowIn(Ao, 0, WD("s5b", "reports"));
      const q1 = box("q1", { x: 60, y: 1010, w: 960, h: 130, cls: "c5", fs: 48, html: 'Promise.all combines results' });
      appear(q1, WD("s5c", "combines"));
      const q2 = box("q2", { x: 60, y: 1160, w: 960, h: 110, cls: "c6", fs: 46, html: 'it does not cancel work' });
      appear(q2, WD("s5c", "not"));
      cheer("#sam", LE("s5c", -1.4));
