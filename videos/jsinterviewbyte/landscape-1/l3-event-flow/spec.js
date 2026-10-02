      // Q3: event flow: capturing down, target, bubbling up
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // nested boxes: outer > middle > button
      const zo = zone("zo", { x: 60, y: 490, w: 960, h: 470, label: "outer box", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      const zm = zone("zm", { x: 190, y: 570, w: 700, h: 330, label: "middle box", color: "#22d3ee", bg: "rgba(34,211,238,.08)" });
      const bt = box("bt", { x: 340, y: 690, w: 400, h: 110, cls: "c4", fs: 46, html: '<code>button</code>' });
      appear(bt, WD("s1b", "button")); appear(zm, WD("s1b", "parents") - 0.3); appear(zo, WD("s1b", "parents") + 0.1);
      const dot = tok("dot", { x: 620, y: 432, cls: "d", fs: 40, html: "click" });
      appear(dot, WD("s1b", "click"));
      pulse(zm, WD("s1b", "travels"), 1.04); pulse(zo, WD("s1b", "through"), 1.03);
      const nm = note("nm", { x: 60, y: 1010, w: 960, fs: 44, html: 'this journey is the <b>event flow</b>' });
      appear(nm, WD("s1b", "journey"));

      // setup: names
      gone(nm, L("s2a", -0.1));
      pulse(bt, WD("s2a", "button"), 1.1); pulse(zm, WD("s2a", "middle"), 1.05); pulse(zo, WD("s2a", "outer"), 1.04);
      const dn = line("dn", { x1: 120, y1: 520, x2: 120, y2: 880, c: "C", w: 8, dash: true });
      drawLine(dn, WD("s2b", "walks") - 0.2, 0.9);

      // phases: the dot moves, pills name the phase
      const leg = (t, y0, y1, d = 0.8) => { tl.fromTo(dot, { y: y0 }, { y: y1, duration: d, ease: "power1.inOut", immediateRender: false }, t); };
      const p1 = pill("p1", { x: 60, y: 1010, cls: "cy", fs: 40, html: "1 · capturing ↓" });
      const p2 = pill("p2", { x: 400, y: 1010, cls: "", fs: 40, html: "2 · target" });
      const p3 = pill("p3", { x: 690, y: 1010, cls: "pk", fs: 40, html: "3 · bubbling ↑" });
      appear(p1, L("s3a", 0.1)); leg(WD("s3a", "outer"), 0, 70); leg(WD("s3a", "middle"), 70, 160);
      tint(zo, WD("s3a", "outer"), "#22d3ee"); tint(zm, WD("s3a", "middle"), "#22d3ee");
      appear(p2, L("s3b", 0.1)); leg(WD("s3b", "reaches"), 160, 285); tint(bt, WD("s3b", "reaches"), "#fde68a"); pulse(bt, WD("s3b", "reaches"), 1.15);
      const up = line("up", { x1: 960, y1: 880, x2: 960, y2: 520, c: "P", w: 8, dash: true });
      appear(p3, L("s3c", 0.1)); drawLine(up, WD("s3c", "goes") , 1.0);
      leg(WD("s3c", "middle"), 285, 160); tint(zm, WD("s3c", "middle"), "#f472b6"); leg(WD("s3c", "outer"), 160, 70); tint(zo, WD("s3c", "outer"), "#f472b6"); leg(L("s3c", 7.0), 70, 0, 0.7);

      // listeners: badges show the order they run
      const badge = (id, x, y, n, cls, t) => { const b = tok(id, { x, y, cls, fs: 44, html: String(n) }); appear(b, t, { y: 10 }); return b; };
      tl.set([p1, p2, p3, dn, up], { opacity: 0 }, L("s4a", -0.1));
      tl.set([zo, zm, bt], { borderColor: "#3a4696" }, L("s4a", -0.1));
      const Ao = consoleBox("cAo", { x: 60, y: 985, w: 430, fs: 30, rows: [["button"], ["middle"], ["outer"]] });
      appear(Ao.sel, WD("s4b", "prints") - 0.6);
      const b1 = badge("b1", 680, 705, 1, "e", WD("s4b", "one")); const b2 = badge("b2", 780, 590, 2, "e", WD("s4b", "one") + 0.5); const b3 = badge("b3", 940, 500, 3, "e", WD("s4b", "one") + 1.0);
      rowIn(Ao, 0, WD("s4b", "button")); rowIn(Ao, 1, WD("s4b", "middle")); rowIn(Ao, 2, WD("s4b", "outer"));
      // capture: pass true
      const Cd = codeBlock("cCd", { x: 540, w: 480, y: 985, fs: 26, lines: ['box.addEventListener(', '  "click", handler, true);'] });
      lineHide(Cd, [1, 2]); appear(Cd.sel, WD("s4c", "pass") - 0.3, { y: 20 }); lineIn(Cd, [1, 2], WD("s4c", "pass") - 0.2, 0.2); lineHl(Cd, [2], WD("s4c", "true"), 1.8);
      const Bo = consoleBox("cBo", { x: 60, y: 985, w: 430, fs: 30, rows: [["outer"], ["middle"], ["button"]] });
      tl.set([Ao.sel, b1, b2, b3], { opacity: 0 }, WD("s4c", "listen") - 0.1);
      appear(Bo.sel, WD("s4c", "listen") - 0.1);
      const c1 = badge("c1", 940, 500, 1, "c", WD("s4d", "outer")); const c2 = badge("c2", 780, 590, 2, "c", WD("s4d", "middle")); const c3 = badge("c3", 680, 705, 3, "c", WD("s4d", "button"));
      rowIn(Bo, 0, WD("s4d", "outer")); rowIn(Bo, 1, WD("s4d", "middle")); rowIn(Bo, 2, WD("s4d", "button"));

      // stop it
      const T5 = L("s5a", -0.1);
      tl.set([Bo.sel, Cd.sel, c1, c2, c3], { opacity: 0 }, T5);
      const Sd = codeBlock("cSd", { x: 540, w: 480, y: 985, fs: 26, lines: ["event.stopPropagation();"] });
      const So = consoleBox("cSo", { x: 60, y: 985, w: 430, fs: 30, rows: [["button"], ["middle"]] });
      const s1 = badge("s1", 680, 705, 1, "e", WD("s5b", "Call") - 0.3); const s2 = badge("s2", 780, 590, 2, "e", WD("s5b", "Call"));
      appear(Sd.sel, WD("s5b", "stopPropagation") - 0.3, { y: 20 }); appear(So.sel, WD("s5b", "middle") - 0.2);
      rowIn(So, 0, WD("s5b", "event")); rowIn(So, 1, WD("s5b", "middle"));
      const stp = tok("stp", { x: 935, y: 495, cls: "f", fs: 40, html: "✗" });
      appear(stp, WD("s5b", "never")); shakeEl(zo, WD("s5b", "never"));

      // delegation
      wipe(L("s6a", -0.15));
      tl.set([zo, zm, bt, dot, stp, Sd.sel, So.sel, s1, s2], { opacity: 0 }, L("s6a", -0.15));
      const ul = zone("ul", { x: 60, y: 490, w: 560, h: 270, label: "list: one listener", color: "#a78bfa", bg: "rgba(167,139,250,.08)" });
      const li = chips("li", 100, 600, ["A", "B"], ["c", "c"], 150, 50);
      appear(ul, WD("s6a", "delegation"));
      const Dl = codeBlock("cDl", { y: 790, fs: 30, name: "one listener on the list", lines: ['list.addEventListener("click", (e) => {', '  if (e.target.tagName === "LI") {', '    console.log(e.target.textContent);', '  }', '});'] });
      lineHide(Dl, [1, 2, 3, 4, 5]);
      li.forEach((t, i) => appear(t, WD("s6b", "every") + i * 0.3, { y: 10 }));
      const lb = tok("lb", { x: 440, y: 530, cls: "a", fs: 34, html: "listener" });
      appear(lb, WD("s6b", "one")); appear(Dl.sel, WD("s6b", "put") - 0.2, { y: 20 }); lineIn(Dl, [1, 2, 3, 4, 5], WD("s6b", "put"), 0.25);
      const bub = line("bub", { x1: 190, y1: 590, x2: 460, y2: 560, c: "P", w: 7 });
      drawLine(bub, WD("s6b", "bubbles"), 0.7);
      const Do = consoleBox("cDo", { x: 660, y: 490, w: 360, fs: 36, rows: [["A"], ["C"]] });
      appear(Do.sel, WD("s6c", "event.target") - 0.2); rowIn(Do, 0, WD("s6c", "event.target") + 0.2);
      lineHl(Dl, [3], WD("s6c", "event.target"), 2.2);
      const newLi = tok("liC", { x: 400, y: 600, cls: "e", fs: 50, html: "C <small>new</small>" });
      appear(newLi, WD("s6c", "later")); pulse(newLi, WD("s6c", "later"), 1.25); rowIn(Do, 1, WD("s6c", "automatically") - 0.2);

      // wrap
      wipe(L("s7a", -0.15));
      tl.set([ul, ...li, lb, bub, Dl.sel, Do.sel, newLi], { opacity: 0 }, L("s7a", -0.15));
      const w1 = box("w1", { x: 60, y: 500, w: 960, h: 160, cls: "c1", fs: 52, html: 'capturing goes <b>down</b>' });
      const w2 = box("w2", { x: 60, y: 700, w: 960, h: 160, cls: "c3", fs: 52, html: 'bubbling goes <b>up</b>' });
      const w3 = box("w3", { x: 60, y: 900, w: 960, h: 160, cls: "c5", fs: 50, html: 'listeners use bubbling unless you pass <code>true</code>' });
      appear(w1, WD("s7a", "Capturing")); appear(w2, WD("s7a", "Bubbling")); appear(w3, WD("s7a", "listeners"));
      cheer("#sam", L("s7b", 0.3));
