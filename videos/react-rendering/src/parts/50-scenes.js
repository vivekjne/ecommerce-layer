
      // ---------------- extra helpers for this episode ----------------
      function fly(sel, t, dx, dy, dur = 1.4, keep = false) {
        tl.fromTo(sel, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, ease: E }, t);
        tl.fromTo(sel, { x: 0, y: 0 }, { x: dx, y: dy, duration: dur, ease: "power1.inOut", immediateRender: false }, t + 0.2);
        if (!keep) tl.to(sel, { opacity: 0, scale: 0.8, duration: 0.25 }, t + 0.2 + dur);
      }
      function hlEl(sel, t0, dur, color = "rgba(255,201,60,.35)") {
        tl.to(sel, { backgroundColor: color, duration: 0.25 }, t0);
        tl.to(sel, { backgroundColor: "rgba(255,201,60,0)", duration: 0.4 }, t0 + dur);
      }
      function spinner(sel, t0, t1) {
        tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.25 }, t0);
        tl.fromTo(sel, { rotation: 0 }, { rotation: 360 * Math.max(1, Math.round((t1 - t0) * 0.9)), duration: t1 - t0, ease: "none", immediateRender: false }, t0);
        tl.to(sel, { opacity: 0, duration: 0.25 }, t1);
      }
      function grow(sel, t0, dur) { tl.fromTo(sel, { clipPath: "inset(0% 100% 0% 0% round 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 12px)", duration: dur, ease: "none" }, t0); }
      function blinkLeds(scene, t0, t1) { tl.to("#" + scene + " .led", { opacity: 0.2, duration: 0.45, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.45) - 1), ease: "sine.inOut" }, t0); }
      function bobA(sel, t0, t1, amp = 6, period = 2) { tl.to(sel + " svg", { y: -amp, duration: period / 2, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / (period / 2)) - 1), ease: "sine.inOut" }, t0); }
      function click(t, target) {
        tl.fromTo("#s9-rip", { opacity: 0.9, scale: 0.3 }, { opacity: 0, scale: 2.4, duration: 0.6, ease: "power2.out", immediateRender: false }, t + 0.15);
        tl.fromTo("#s9-cur", { scale: 1 }, { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1, transformOrigin: "0 0", immediateRender: false }, t);
        if (target) tl.fromTo("#s9-btn", { scale: 1 }, { scale: 0.93, duration: 0.12, yoyo: true, repeat: 1, transformOrigin: "50% 50%", immediateRender: false }, t);
      }

      // pages that are visible from the first frame of their window
      ["#s2-full", "#s8-full", "#s9-full", "#s14-full"].forEach((s) => tl.set(s, { opacity: 1 }, 0));
      tl.set("#s11-full", { opacity: 1 }, 0);
      tl.set("#s5-a, #s5-b, #s5-c, #s8-a, #s9-c, #s11-c, #s13-a, #s13-b, #s14-c, #s15-us", { opacity: 0 }, 0);

      // ===================== 1 · Hook =====================
      tl.fromTo("#s1 .kick", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: E }, 0.3);
      tl.fromTo("#s1 h1", { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: POP }, 0.6);
      tl.fromTo("#s1 p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: E }, 1.5);
      walkIn("#sam", 0.4, -260); walkIn("#byte", 0.6, 260);
      wave("#byte", L("s1a", 0.2), 2); face("#byte", "h", L("s1a"));
      // site A: blank, then spinner, then content (slow)
      show("#s1-wa", L("s1a", 0.3), { s: 0.85 });
      show("#s1-ta", W("s1a", 9), { s: 0.6, d: 0.5 });
      mood("#sam", "sad", W("s1a", 9)); wobble("#sam", W("s1a", 9), 2, 5);
      spinner("#s1-wa-sp", L("s1b", 0.2), W("s1b", 6));
      fade("#s1-wa-full", W("s1b", 6) + 0.1, 0.6);
      // site B: instant
      show("#s1-wb", L("s1c", 0.0), { s: 0.85 });
      tl.fromTo("#s1-wb-full", { opacity: 0 }, { opacity: 1, duration: 0.15 }, L("s1c", 0.5));
      show("#s1-tb", W("s1c", 4), { s: 0.6, d: 0.5 });
      mood("#sam", "happy", L("s1c", 0.5)); cheer("#sam", W("s1c", 4));
      hide("#s1-ta, #s1-tb", L("s1d", 0.2), 0.4);
      show("#s1-q", W("s1d", 5), { s: 0.7, d: 0.6 });
      pulse("#s1-wa", W("s1d", 10), 1.05); pulse("#s1-wb", W("s1d", 14), 1.05);
      face("#byte", "q", W("s1d", 5));
      hide("#s1-q", L("s1e", 0.0), 0.3);
      show("#s1-c1", W("s1e", 1), { s: 0.5, d: 0.6 }); show("#s1-c2", W("s1e", 2), { s: 0.5, d: 0.6 }); show("#s1-c3", W("s1e", 4), { s: 0.5, d: 0.6 });
      face("#byte", "h", L("s1f")); wiggle("#byte", L("s1f"), 2); cheer("#sam", L("s1f", 1.2));
      leave("s1");

      // ===================== 2 · The players =====================
      enter("s2");
      show("#s2-win", W("s2a", 5) - 0.1, { s: 0.8 });
      fade("#s2-full", W("s2a", 6), 0.6);
      show("#s2-bn", W("s2a", 6), { s: 0.7, d: 0.6 });
      show("#s2-srv", W("s2a", 7) - 0.1, { s: 0.6, d: 0.8 }); show("#s2-w1", W("s2a", 7) + 0.2, { s: 1, d: 0.6, y: 0, x: -30 });
      show("#s2-db", W("s2a", 10) - 0.1, { s: 0.6, d: 0.8 }); show("#s2-w2", W("s2a", 10) + 0.2, { s: 1, d: 0.6, y: 0, x: -30 });
      blinkLeds("s2", W("s2a", 7), SE("s2") - 1);
      bobA("#s2-srv", W("s2a", 8), SE("s2") - 0.6, 6, 2.2); bobA("#s2-db", W("s2a", 11), SE("s2") - 0.6, 6, 2.4);
      show("#s2-f1", W("s2b", 3), { s: 0.7, d: 0.6 }); show("#s2-f2", W("s2b", 4), { s: 0.7, d: 0.5 });
      show("#s2-f3", W("s2b", 5), { s: 0.7, d: 0.6 }); show("#s2-f4", W("s2b", 6), { s: 0.7, d: 0.5 });
      show("#s2-f5", W("s2b", 7), { s: 0.7, d: 0.6 }); pulse("#s2-f5", W("s2b", 12), 1.2);
      // a request goes out and an answer returns while we talk about the players
      show("#s2-q", W("s2c", 1), { s: 0.4, d: 0.9 });
      pulse("#s2-win", W("s2c", 6), 1.05); pulse("#s2-srv", W("s2c", 9), 1.1);
      face("#byte", "q", W("s2c", 1)); leave("s2");

      // ===================== 3 · Analogy =====================
      enter("s3");
      show("#s3-l", L("s3a", 0.3), { s: 0.85 }); show("#s3-r", L("s3a", 0.7), { s: 0.85 });
      // CSR: box of parts, build at home
      show("#s3-boxL", L("s3b", 0.3), { s: 0.6, d: 0.8 });
      tl.to("#s3-flapL", { rotation: -75, duration: 0.6, ease: E }, W("s3b", 4));
      tl.to("#s3-flapR", { rotation: 75, duration: 0.6, ease: E }, W("s3b", 4));
      const OFF = [[-300, 160, -70], [-240, 220, 50], [-260, 40, -30], [-330, 190, 80], [-200, 120, -50], [-280, 90, 40]];
      for (let i = 0; i < 6; i++) tl.fromTo("#s3l-pl" + i, { opacity: 0, x: OFF[i][0], y: OFF[i][1], rotation: OFF[i][2] }, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.7, ease: "power2.out" }, W("s3b", 6) + i * 0.24);
      for (let i = 0; i < 11; i++) tl.fromTo("#s3l-bk" + i, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, W("s3b", 10) + i * 0.07);
      show("#s3-tl", W("s3b", 9), { s: 0.6, d: 0.6 }); wobble("#sam", W("s3b", 9), 2, 5);
      // SSR: truck arrives with the finished shelf
      tl.fromTo("#s3-truck", { opacity: 0, x: 500 }, { opacity: 1, x: 0, duration: 1.4, ease: "power2.out" }, L("s3c", 0.1));
      tl.fromTo("#s3-shelfR", { opacity: 0, x: 80, scale: 0.85 }, { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: POP, transformOrigin: "50% 100%" }, W("s3c", 4));
      show("#s3-tr", W("s3c", 5), { s: 0.6, d: 0.6 });
      face("#byte", "q", W("s3c", 6));
      show("#s3-catch", W("s3c", 10), { s: 0.4, d: 0.7 }); pulse("#s3-catch", W("s3c", 11), 1.2); shake("#s3-catch", W("s3c", 12));
      leave("s3");

      // ===================== 4 · CSR flow =====================
      enter("s4");
      show("#s4-win", L("s4a", 0.2), { s: 0.85 });
      show("#s4-srv", W("s4a", 5), { s: 0.6, d: 0.8 }); show("#s4-db", W("s4a", 5) + 0.3, { s: 0.6, d: 0.8 });
      show("#s4-w1", W("s4a", 6), { s: 1, d: 0.6, y: 0, x: -30 }); show("#s4-w2", W("s4a", 6) + 0.3, { s: 1, d: 0.6, y: 0, x: -30 });
      blinkLeds("s4", W("s4a", 5), SE("s4") - 1);
      fade("#s4-lane", L("s4a", 3.3), 0.8);
      // step 1: ask for the page
      show("#s4-n1", L("s4b", 0.0), { s: 0.4, d: 0.5 });
      fly("#s4-p1", W("s4b", 3), 175, 0, 1.2);
      grow("#s4-g1", L("s4b", 0.9), 1.4);
      // the server answers with the empty shell
      fly("#s4-p2", L("s4c", 0.2), -160, 0, 1.4);
      tl.fromTo("#s4-root", { opacity: 0 }, { opacity: 1, duration: 0.5 }, W("s4c", 9));
      show("#s4-shell", W("s4c", 9), { s: 0.9, d: 0.6 });
      pulse("#s4-shell", W("s4c", 14), 1.06);
      hide("#s4-n1", L("s4c", 0.4), 0.3);
      // step 2: the bundle
      show("#s4-n2", L("s4d", 0.0), { s: 0.4, d: 0.5 });
      fly("#s4-p3", L("s4d", 0.6), 165, 0, 1.2);
      fly("#s4-p4", L("s4d", 2.1), -125, 0, 2.6);
      grow("#s4-g2", L("s4d", 2.0), 4.6);
      pulse("#s4-p4", W("s4d", 9), 1.3);
      mood("#sam", "sad", L("s4d", 2.0)); wobble("#sam", L("s4d", 2.2), 3, 5);
      hide("#s4-n2", L("s4e", 0.0), 0.3);
      // step 3: React runs
      show("#s4-n3", L("s4e", 0.0), { s: 0.4, d: 0.5 });
      hide("#s4-root", L("s4e", 0.9), 0.3);
      spinner("#s4-sp", L("s4e", 1.0), W("s4f", 17) - 0.1);
      grow("#s4-g3", L("s4e", 0.8), 3.0);
      // step 4: data
      hide("#s4-n3", L("s4f", 0.0), 0.3);
      show("#s4-n4", L("s4f", 0.0), { s: 0.4, d: 0.5 });
      fly("#s4-p5", W("s4f", 4), 330, 0, 1.2);
      fly("#s4-p6", W("s4f", 4) + 1.9, -330, 0, 1.2);
      grow("#s4-g4", L("s4f", 0.6), 6.4);
      fade("#s4-full", W("s4f", 17), 0.6);
      show("#s4-done", W("s4f", 18), { s: 0.5, d: 0.5 });
      mood("#sam", "happy", W("s4f", 17));
      hide("#s4-n4", L("s4g", 0.0), 0.3);
      show("#s4-blank", W("s4g", 5), { s: 0.6, d: 0.5 });
      pulse("#s4-lane", W("s4g", 5), 1.02);
      leave("s4");

      // ===================== 5 · CSR code =====================
      enter("s5");
      codeIn("s5-a", L("s5a", 0.2)); hl("s5-a", [1], W("s5a", 7), 1.0); hl("s5-a", [2], W("s5a", 11), 1.0);
      codeIn("s5-b", L("s5b", 0.1)); hl("s5-b", [1], W("s5b", 1), 1.2);
      codeIn("s5-c", L("s5c", 0.0)); hl("s5-c", [4, 5, 6, 7, 8], L("s5c", 1.5), 2.2); hl("s5-c", [10, 11], W("s5c", 6), 1.2);
      show("#s5-t3", W("s5d", 2), { s: 0.7, d: 0.6 }); show("#s5-t1", W("s5d", 3), { s: 0.7, d: 0.6 }); show("#s5-t2", W("s5d", 7), { s: 0.7, d: 0.6 });
      leave("s5");

      // ===================== 6 · Pros and cons =====================
      enter("s6");
      fade("#s6-gh", W("s6a", 0) + 0.2, 0.6);
      show("#s6-g1", L("s6b", 0.2), { x: -50, s: 0.9 }); pulse("#s6-g1 .ico", W("s6b", 2), 1.3);
      show("#s6-g2", L("s6c", 0.2), { x: -50, s: 0.9 }); pulse("#s6-g2 .ico", W("s6c", 6), 1.3);
      fade("#s6-bh", W("s6d", 1), 0.6);
      show("#s6-b1", W("s6d", 2), { x: 50, s: 0.9 }); tl.to("#s6-b1 .ico", { rotation: 180, duration: 1.0, ease: "power2.inOut" }, W("s6d", 4));
      show("#s6-b2", W("s6d", 7), { x: 50, s: 0.9 }); pulse("#s6-b2 .ico", W("s6d", 8), 1.3);
      show("#s6-b3", L("s6e", 0.2), { x: 50, s: 0.9 });
      pop("#mal", W("s6e", 2)); bob("#mal", W("s6e", 3), SE("s6") - 0.8, 5, 2); wobble("#mal", W("s6e", 15), 2, 5);
      show("#s6-bub", W("s6e", 11), { s: 0.6, d: 0.5 });
      tl.to("#mal", { opacity: 0, duration: 0.4 }, SE("s6") - 0.7);
      face("#byte", "q", W("s6d", 2)); leave("s6");

      // ===================== 7 · SSR flow =====================
      enter("s7");
      show("#s7-win", L("s7a", 0.2), { s: 0.85 });
      show("#s7-srv", W("s7a", 3), { s: 0.6, d: 0.8 }); show("#s7-db", W("s7a", 3) + 0.3, { s: 0.6, d: 0.8 });
      show("#s7-w1", W("s7a", 4), { s: 1, d: 0.6, y: 0, x: -30 }); show("#s7-w2", W("s7a", 4) + 0.3, { s: 1, d: 0.6, y: 0, x: -30 });
      blinkLeds("s7", W("s7a", 3), SE("s7") - 1);
      show("#s7-react", W("s7a", 5), { s: 0.4, d: 0.9 });
      tl.fromTo("#s7-react svg", { rotation: 0 }, { rotation: 360, duration: 22, ease: "none", transformOrigin: "50% 50%", immediateRender: false }, W("s7a", 5));
      fade("#s7-lane", L("s7a", 1.2), 0.8);
      fly("#s7-p1", L("s7a", 3.6), 170, 0, 1.0);
      show("#s7-t1", W("s7b", 3), { s: 0.6, d: 0.5 }); show("#s7-t2", W("s7b", 3) + 0.45, { s: 0.6, d: 0.5 }); show("#s7-t3", W("s7b", 3) + 0.9, { s: 0.6, d: 0.5 });
      show("#s7-tl", W("s7b", 2), { s: 0.8, d: 0.5 });
      grow("#s7-g1", L("s7b", 0.3), 5.0);
      fly("#s7-p2", W("s7b", 5), 330, 0, 1.0); fly("#s7-p3", W("s7b", 5) + 1.4, -330, 0, 1.0);
      fly("#s7-p4", W("s7b", 12), -140, 0, 1.4);
      grow("#s7-g2", W("s7b", 12), 1.2);
      fade("#s7-full", L("s7c", 0.3), 0.25);
      show("#s7-done", L("s7c", 0.5), { s: 0.5, d: 0.5 });
      pulse("#s7-win", W("s7c", 5), 1.04); cheer("#sam", W("s7c", 5)); mood("#sam", "happy", L("s7a"));
      leave("s7");

      // ===================== 8 · SSR code =====================
      enter("s8");
      codeIn("s8-a", L("s8a", 0.1)); hl("s8-a", [4], W("s8a", 5), 1.0); hl("s8-a", [5, 10], W("s8a", 8), 1.4);
      hl("s8-a", [11], W("s8b", 3), 2.6);
      show("#s8-o", W("s8b", 3), { s: 0.9, d: 0.6 });
      for (let i = 0; i < 4; i++) tl.fromTo("#s8-o-r" + i, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, W("s8b", 4) + 0.25 + i * 0.35);
      hlEl("#s8-o-r1", W("s8c", 3), 1.0); hlEl("#s8-o-r2", W("s8c", 7), 1.8);
      show("#s8-win", W("s8c", 5), { s: 0.8, d: 0.7 }); fade("#s8-full", W("s8c", 8), 0.5);
      show("#s8-t3", W("s8d", 1), { s: 0.6, d: 0.5 });
      pop("#mal", W("s8d", 6)); bob("#mal", W("s8d", 7), SE("s8") - 0.8, 5, 2);
      show("#s8-t1", W("s8d", 7), { s: 0.6, d: 0.5 }); show("#s8-t2", W("s8d", 10), { s: 0.6, d: 0.5 });
      tl.to("#mal", { opacity: 0, duration: 0.4 }, SE("s8") - 0.7);
      face("#byte", "h", W("s8d", 1)); leave("s8");

      // ===================== 9 · Hydration =====================
      enter("s9");
      show("#s9-win", L("s9a", 0.2), { s: 0.85 });
      pulse("#s9-win", W("s9a", 8), 1.03); face("#byte", "q", L("s9a", 1.4));
      // the click that does nothing
      tl.fromTo("#s9-cur", { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.3 }, W("s9b", 3) - 0.4);
      tl.fromTo("#s9-cur", { x: 0, y: 0 }, { x: -140, y: -128, duration: 1.0, ease: "power2.inOut", immediateRender: false }, W("s9b", 3) - 0.3);
      click(W("s9b", 6), true);
      shake("#s9-btn", W("s9b", 6) + 0.4); mood("#sam", "sad", W("s9b", 6)); wobble("#sam", W("s9b", 6) + 0.3, 2, 5);
      show("#s9-dead", W("s9b", 9), { s: 0.6, d: 0.5 });
      // JS arrives, hydrateRoot runs
      fly("#s9-js", L("s9c", 1.0), -560, 270, 1.8);
      codeIn("s9-c", W("s9c", 8)); hl("s9-c", [2, 3, 4, 5], W("s9c", 10), 2.0);
      // hydration walks the HTML, matches components, attaches listeners
      tl.fromTo("#s9-scan", { opacity: 0, y: 0 }, { opacity: 1, duration: 0.2 }, W("s9d", 1));
      tl.fromTo("#s9-scan", { y: 0 }, { y: 448, duration: 2.6, ease: "power1.inOut", immediateRender: false }, W("s9d", 1));
      tl.to("#s9-scan", { opacity: 0, duration: 0.3 }, W("s9d", 1) + 2.7);
      ["#s9-o1", "#s9-o2", "#s9-o3", "#s9-o4"].forEach((s, i) => tl.fromTo(s, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.5, ease: E, transformOrigin: "50% 50%" }, W("s9d", 5) + i * 0.35));
      hide("#s9-dead", W("s9d", 11), 0.3); show("#s9-alive", W("s9d", 11) + 0.2, { s: 0.6, d: 0.5 });
      tl.to("#s9-btn", { boxShadow: "0 0 0 10px rgba(134,239,172,.95)", duration: 0.4 }, W("s9d", 11));
      tl.to("#s9-btn", { boxShadow: "0 5px 0 #4a34b8", duration: 0.5 }, W("s9d", 11) + 1.6);
      hide("#s9-o1, #s9-o2, #s9-o3, #s9-o4", L("s9e", 0.0), 0.5);
      show("#s9-re", W("s9e", 1), { s: 0.6, d: 0.5 }); show("#s9-nr", W("s9e", 8), { s: 0.6, d: 0.5 });
      // now it works: two clicks
      hide("#s9-re, #s9-nr", LE("s9e", 0.2), 0.4);
      mood("#sam", "happy", L("s9f", 0.1));
      click(L("s9f", 0.2), true); setText("#s9-btn", "Clicked 1 times", L("s9f", 0.4));
      click(L("s9f", 1.3), true); setText("#s9-btn", "Clicked 2 times", L("s9f", 1.5));
      cheer("#sam", L("s9f", 0.6)); face("#byte", "h", L("s9f"));
      hide("#s9-cur", L("s9g", 0.3), 0.3); hide("#s9-alive", L("s9g", 0.3), 0.3);
      // mismatch warning
      show("#s9-mm", W("s9g", 2), { s: 0.9, d: 0.6 });
      show("#s9-m1", W("s9g", 2) + 0.2, { s: 0.7, d: 0.5 }); show("#s9-m3", W("s9g", 4), { s: 0.7, d: 0.5 });
      show("#s9-m2", W("s9g", 10), { s: 0.3, d: 0.6 }); show("#s9-m4", W("s9g", 11), { s: 0.9, d: 0.5 });
      shake("#s9-mm", W("s9g", 14)); face("#byte", "a", W("s9g", 13)); mood("#sam", "sad", W("s9g", 13));
      hide("#s9-mm, #s9-m1, #s9-m2, #s9-m3, #s9-m4", SE("s9") - 0.7, 0.4);
      leave("s9");

      // ===================== 10 · The race =====================
      enter("s10");
      show("#s10-l1", L("s10a", 0.3), { s: 0.95, y: 20 }); show("#s10-l2", L("s10a", 0.7), { s: 0.95, y: 20 });
      const lane = (segs, ph, x0, t0, xEnd, tEnd) => {
        const v = (xEnd - x0) / (tEnd - t0);
        tl.fromTo(ph, { opacity: 0, x: 0 }, { opacity: 1, duration: 0.2 }, t0);
        tl.fromTo(ph, { x: 0 }, { x: xEnd - x0, duration: tEnd - t0, ease: "none", immediateRender: false }, t0);
        segs.forEach(([sel, l, w]) => grow(sel, t0 + (l - x0) / v, w / v));
      };
      // CSR lane (absolute x = lane left 140 + local left)
      lane([["#s10-a1", 320, 70], ["#s10-a2", 390, 616], ["#s10-a3", 1006, 250], ["#s10-a4", 1256, 110]], "#s10-ph", 320, L("s10b", 0.3), 1366, W("s10b", 12) + 0.3);
      show("#s10-f1", W("s10b", 12) + 0.3, { s: 0.6, d: 0.5, y: 0 }); tl.to("#s10-ph", { opacity: 0, duration: 0.3 }, W("s10b", 12) + 0.6);
      // SSR lane: fast to content, then the hydration gap
      lane([["#s10-b1", 320, 420], ["#s10-b2", 740, 84]], "#s10-ph2", 320, L("s10c", 0.2), 824, W("s10c", 4) + 0.1);
      show("#s10-f2", W("s10c", 4) + 0.1, { s: 0.6, d: 0.5, y: 0 });
      tl.fromTo("#s10-ph2", { x: 504 }, { x: 1290, duration: W("s10d", 7) - L("s10d", 0.0), ease: "none", immediateRender: false }, L("s10d", 0.0));
      grow("#s10-b3", L("s10d", 0.0), 2.1); grow("#s10-b4", L("s10d", 2.1), 0.6);
      fade("#s10-gapbg", W("s10d", 3), 0.6); show("#s10-gap", W("s10d", 3), { s: 0.7, d: 0.5, y: 0 });
      show("#s10-f3", W("s10d", 7) + 0.4, { s: 0.6, d: 0.5, y: 0 }); tl.to("#s10-ph2", { opacity: 0, duration: 0.3 }, W("s10d", 7) + 0.8);
      pulse("#s10-gap", W("s10d", 11), 1.12); face("#byte", "q", W("s10d", 8));
      show("#s10-e1", W("s10e", 1), { s: 0.6, d: 0.5 }); show("#s10-e2", W("s10e", 1) + 0.3, { s: 0.6, d: 0.5 });
      show("#s10-e3", W("s10f", 3), { s: 0.6, d: 0.6 }); nod("#byte", W("s10f", 3));
      leave("s10");

      // ===================== 11 · Streaming =====================
      enter("s11");
      show("#s11-win", L("s11a", 0.2), { s: 0.85 }); pulse("#s11-win", W("s11a", 10), 1.03); face("#byte", "q", L("s11a", 0.5));
      codeIn("s11-c", W("s11b", 2)); hl("s11-c", [1, 3], W("s11b", 7), 1.4);
      show("#s11-o", L("s11c", 0.0), { s: 0.9, d: 0.6 });
      [0, 1, 2].forEach((i) => tl.fromTo("#s11-o-r" + i, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, L("s11c", 0.5) + i * 0.4));
      fly("#s11-k1", W("s11c", 3), -230, 0, 1.0);
      fade("#s11-fb", W("s11c", 8), 0.5); spinner("#s11-fb .spin", W("s11c", 8), W("s11d", 13));
      [3, 4, 5].forEach((i) => tl.fromTo("#s11-o-r" + i, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, W("s11d", 6) + (i - 3) * 0.4));
      fly("#s11-k2", W("s11d", 7), -230, 0, 1.0);
      hide("#s11-fb", W("s11d", 13), 0.3);
      [0, 1, 2].forEach((i) => tl.fromTo("#s11-rv" + i, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.5, ease: E }, W("s11d", 14) + i * 0.25));
      hlEl("#s11-o-r2", W("s11e", 3), 1.2); hlEl("#s11-o-r4", W("s11e", 5), 1.4);
      face("#byte", "h", W("s11e", 3)); leave("s11");

      // ===================== 12 · The catch with SSR =====================
      enter("s12");
      show("#s12-zl", L("s12a", 0.2), { s: 0.9 });
      ["#s12-a1", "#s12-a2", "#s12-a3", "#s12-a4", "#s12-a5", "#s12-a6"].forEach((s, i) => show(s, L("s12a", 1.2) + i * 0.2, { s: 0.6, d: 0.5 }));
      show("#s12-zr", L("s12b", 0.2), { s: 0.9 }); show("#s12-arr", W("s12b", 2), { s: 0.5, x: -40, d: 0.6 });
      ["#s12-b1", "#s12-b2", "#s12-b3", "#s12-b4", "#s12-b5", "#s12-b6"].forEach((s, i) => tl.fromTo(s, { opacity: 0, x: -420 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, W("s12b", 3) + i * 0.28));
      pulse("#s12-arr", W("s12b", 11), 1.25);
      ["#s12-q5", "#s12-q6"].forEach((s, i) => show(s, L("s12c", 0.1) + i * 0.2, { s: 0.6, d: 0.5 }));
      ["#s12-q1", "#s12-q2", "#s12-q3", "#s12-q4"].forEach((s, i) => show(s, W("s12c", 4) + i * 0.22, { s: 0.6, d: 0.5 }));
      pulse("#s12-b2", W("s12c", 8), 1.12);
      show("#s12-note", L("s12d", 0.2), { s: 0.95, d: 0.6 }); face("#byte", "q", L("s12d", 0.3)); mood("#sam", "sad", L("s12d", 0.3));
      ["#s12-b1", "#s12-b2", "#s12-b3", "#s12-b4"].forEach((s, i) => tl.to(s, { x: -420, opacity: 0, duration: 0.8, ease: "power2.in" }, W("s12e", 7) + i * 0.2));
      ["#s12-q1", "#s12-q2", "#s12-q3", "#s12-q4"].forEach((s) => hide(s, W("s12e", 7), 0.4));
      hide("#s12-note", W("s12e", 6), 0.4);
      mood("#sam", "happy", W("s12e", 7));
      hide("#s12-arr, #s12-zl, #s12-zr, #s12-a1, #s12-a2, #s12-a3, #s12-a4, #s12-a5, #s12-a6, #s12-b5, #s12-b6, #s12-q5, #s12-q6", W("s12f", 4), 0.5);
      show("#s12-rsc", W("s12f", 5), { s: 0.7, d: 0.9 });
      tl.fromTo("#s12-atom svg", { rotation: 0 }, { rotation: 360, duration: 8, ease: "none", transformOrigin: "50% 50%", immediateRender: false }, W("s12f", 5));
      cheer("#sam", W("s12f", 6)); face("#byte", "h", W("s12f", 5));
      leave("s12");

      // ===================== 13 · Server components =====================
      enter("s13");
      codeIn("s13-a", L("s13a", 0.2)); show("#s13-zs", L("s13a", 0.6), { s: 0.9 });
      show("#s13-n1", W("s13a", 3), { s: 0.6, d: 0.6 }); show("#s13-lock", W("s13a", 8), { s: 0.6, d: 0.5 });
      show("#s13-zc", W("s13a", 13), { s: 0.9 });
      hl("s13-a", [1], W("s13b", 3), 1.2); show("#s13-db", W("s13b", 6), { s: 0.6, d: 0.6 }); hl("s13-a", [2], W("s13b", 6), 1.8);
      hl("s13-a", [2], W("s13c", 3), 1.4); hl("s13-a", [5, 6], W("s13c", 8), 2.2);
      show("#s13-x1", W("s13d", 1), { s: 0.6, d: 0.4 }); show("#s13-x2", W("s13d", 4), { s: 0.6, d: 0.4 }); show("#s13-x3", W("s13d", 7), { s: 0.6, d: 0.4 });
      ["#s13-x1", "#s13-x2", "#s13-x3"].forEach((s, i) => tl.set(s, { textDecoration: "line-through" }, [W("s13d", 1), W("s13d", 4), W("s13d", 7)][i] + 0.6));
      codeIn("s13-b", W("s13e", 2)); show("#s13-n2", W("s13e", 7), { s: 0.6, d: 0.6 }); hl("s13-b", [1], W("s13e", 13), 1.6);
      fly("#s13-p1", W("s13f", 2), 0, 150, 1.6, true); show("#s13-js", W("s13f", 3), { s: 0.6, d: 0.5 });
      hide("#s13-p1", W("s13f", 7) + 0.9, 0.4);
      show("#s13-def", W("s13g", 1), { s: 0.6, d: 0.5 }); pulse("#s13-n1", W("s13g", 4), 1.12);
      face("#byte", "h", W("s13g", 1)); leave("s13");

      // ===================== 14 · The RSC payload =====================
      enter("s14");
      show("#s14-nx1", W("s14a", 7), { s: 0.6, d: 0.5 }); show("#s14-nx2", W("s14a", 10), { s: 0.6, d: 0.5 });
      tl.set("#s14-nx1, #s14-nx2", { opacity: 0 }, L("s14b", 0.2));
      face("#byte", "q", L("s14a", 1.0));
      codeIn("s14-c", W("s14b", 2)); reveal("s14-c", [1, 2, 3, 4, 5, 6], W("s14b", 3) + 0.2, 0.3);
      ["#s14-n0", "#s14-n1", "#s14-n2", "#s14-n3"].forEach((s, i) => show(s, W("s14b", 10) + i * 0.3, { s: 0.6, d: 0.5 }));
      ["#s14-l1", "#s14-l2", "#s14-l3"].forEach((s, i) => tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.4 }, W("s14b", 10) + 0.3 + i * 0.3));
      hl("s14-c", [2], W("s14c", 1), 1.0); hl("s14-c", [3], W("s14c", 3), 1.0); hl("s14-c", [4], W("s14c", 5), 1.2);
      show("#s14-t2", W("s14c", 2), { s: 0.6, d: 0.5 });
      hl("s14-c", [5], W("s14d", 6), 2.0, "rgba(244,114,182,.35)"); pulse("#s14-n3", W("s14d", 6), 1.25); show("#s14-ln3", W("s14d", 7), { s: 0.9, d: 0.5 });
      hl("s14-c", [1], W("s14d", 11), 2.4, "rgba(244,114,182,.35)"); show("#s14-t1", W("s14d", 11), { s: 0.6, d: 0.5 });
      show("#s14-win", L("s14e", 0.2), { s: 0.85 });
      tl.set("#s14-full", { opacity: 0 }, 0); fade("#s14-full", W("s14e", 4), 0.6);
      tl.to("#s14-like", { boxShadow: "0 0 0 8px rgba(34,211,238,.95)", duration: 0.4 }, W("s14e", 9));
      pulse("#s14-like", W("s14e", 9), 1.15);
      show("#s14-f1", L("s14f", 0.2), { s: 0.6, d: 0.5 }); show("#s14-fa", W("s14f", 3), { s: 0.6, d: 0.4 });
      show("#s14-f2", W("s14f", 4), { s: 0.6, d: 0.5 }); show("#s14-fb", W("s14f", 8), { s: 0.6, d: 0.4 });
      show("#s14-f3", W("s14f", 9), { s: 0.6, d: 0.5 }); pulse("#s14-f3", W("s14f", 12), 1.1);
      leave("s14");

      // ===================== 15 · The boundary =====================
      enter("s15");
      show("#s15-n0", L("s15a", 0.3), { s: 0.6, d: 0.5 });
      ["#s15-n1", "#s15-n2", "#s15-n3"].forEach((s, i) => show(s, L("s15a", 0.7) + i * 0.3, { s: 0.6, d: 0.5 }));
      ["#s15-l1", "#s15-l2", "#s15-l3"].forEach((s, i) => tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.4 }, L("s15a", 0.7) + i * 0.3));
      show("#s15-uc", W("s15b", 4), { s: 0.6, d: 0.5 });
      ["#s15-n4", "#s15-n5"].forEach((s, i) => { show(s, W("s15b", 5) + i * 0.3, { s: 0.6, d: 0.5 }); tl.fromTo(s, { backgroundColor: "#a78bfa" }, { backgroundColor: "#22d3ee", duration: 0.6 }, W("s15b", 7) + i * 0.2); });
      ["#s15-l4", "#s15-l5"].forEach((s, i) => tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.4 }, W("s15b", 5) + i * 0.3));
      show("#s15-imp", W("s15b", 7), { s: 0.6, d: 0.5 });
      show("#s15-r1", W("s15c", 3), { x: -40, s: 0.9 }); show("#s15-r2", W("s15c", 8), { x: 40, s: 0.9 });
      show("#s15-low", W("s15d", 3), { s: 0.7, d: 0.5 });
      ["#s15-n3", "#s15-n4", "#s15-n5"].forEach((s, i) => pulse(s, W("s15d", 9) + i * 0.2, 1.15));
      hide("#s15-r1, #s15-r2, #s15-low", L("s15e", 0.0), 0.5);
      codeIn("s15-us", W("s15e", 3)); hl("s15-us", [1], W("s15e", 3), 1.4); hl("s15-us", [3], W("s15e", 12), 1.6);
      show("#s15-pub", W("s15f", 1), { s: 0.6, d: 0.5 }); shake("#s15-pub", W("s15f", 2));
      pop("#guard", W("s15f", 1)); bob("#guard", W("s15f", 2), SE("s15") - 0.8, 5, 2);
      show("#s15-val", W("s15f", 6), { s: 0.6, d: 0.5 }); nod("#guard", W("s15f", 8));
      tl.to("#guard", { opacity: 0, duration: 0.4 }, SE("s15") - 0.7);
      leave("s15");

      // ===================== 16 · SSR vs Server Components =====================
      enter("s16");
      show("#s16-b", W("s16a", 2), { s: 0.85, d: 0.7 }); show("#s16-a", W("s16a", 6), { s: 0.85, d: 0.7 });
      show("#s16-ne", W("s16a", 8), { s: 0.3, d: 0.6 }); shake("#s16-ne", W("s16a", 8) + 0.5);
      pulse("#s16-a", L("s16b", 0.0), 1.04); pulse("#s16-b", L("s16c", 0.0), 1.04);
      show("#s16-n1", L("s16d", 0.4), { s: 0.6, d: 0.5 }); show("#s16-s", L("s16d", 0.4), { s: 0.9, d: 0.5 });
      show("#s16-a1", W("s16d", 4) - 0.2, { s: 0.5, d: 0.4 }); show("#s16-n2", W("s16d", 4), { s: 0.6, d: 0.5 });
      show("#s16-a2", W("s16d", 7) - 0.2, { s: 0.5, d: 0.4 }); show("#s16-n3", W("s16d", 7), { s: 0.6, d: 0.5 });
      show("#s16-a3", W("s16d", 10) - 0.2, { s: 0.5, d: 0.4 }); show("#s16-n4", W("s16d", 10), { s: 0.6, d: 0.5 }); show("#s16-c", W("s16d", 10), { s: 0.9, d: 0.5 });
      show("#s16-a4", W("s16d", 13) - 0.2, { s: 0.5, d: 0.4 }); show("#s16-n5", W("s16d", 13), { s: 0.6, d: 0.5 });
      fly("#s16-p", L("s16d", 0.8), 1230, 0, 7.6);
      cheer("#sam", W("s16d", 15)); face("#byte", "h", L("s16d"));
      leave("s16");

      // ===================== 17 · Which should you use =====================
      enter("s17");
      show("#s17-a", L("s17b", 0.2), { s: 0.85, y: 40 }); pulse("#s17-a .ico", W("s17b", 5), 1.2);
      show("#s17-b", L("s17c", 0.2), { s: 0.85, y: 40 }); pulse("#s17-b .ico", W("s17c", 5), 1.2);
      show("#s17-c", L("s17d", 0.2), { s: 0.85, y: 40 }); pulse("#s17-c .ico", W("s17d", 4), 1.2);
      show("#s17-d", L("s17e", 0.2), { s: 0.85, y: 40 }); pulse("#s17-d .ico", W("s17e", 6), 1.2);
      face("#byte", "q", L("s17a")); face("#byte", "h", L("s17e", 0.5));
      leave("s17");

      // ===================== 18 · Recap =====================
      enter("s18");
      show("#rc1", L("s18b", 0.1), { x: -60, s: 0.9 }); show("#rc2", L("s18c", 0.1), { x: -60, s: 0.9 });
      show("#rc3", L("s18d", 0.1), { x: -60, s: 0.9 }); show("#rc4", L("s18e", 0.1), { x: -60, s: 0.9 });
      show("#s18-atom", L("s18a", 0.2), { s: 0.4, d: 1.0 });
      tl.fromTo("#s18-atom svg", { rotation: 0 }, { rotation: 360, duration: 20, ease: "none", transformOrigin: "50% 50%", immediateRender: false }, L("s18a", 0.2));
      show("#s18-thx", L("s18f", 0.1), { s: 0.6, d: 0.7 });
      cheer("#sam", L("s18f", 0.1)); cheer("#byte", L("s18f", 0.5)); face("#byte", "h", L("s18f"));

      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
      tl.seek(0);

    </script>
  </body>
</html>
