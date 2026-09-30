      // ===================== 1 · Intro =====================
      const BIG = { sam: { x: 595, y: -170, s: 1.7 }, byte: { x: -597, y: -170, s: 1.7 } };
      tl.set("#s1 .kick, #s1 h1, #s1 p", { opacity: 0 }, 0);
      tl.fromTo("#s1 .kick", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: E }, 0.3);
      tl.fromTo("#s1 h1", { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: POP }, 0.6);
      tl.fromTo("#s1 p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: E }, L("s1a", 1.0));
      ["#tp1", "#tp2", "#tp3", "#tp4"].forEach((s, i) => show(s, W("s1b", 3) + i * 0.9, { s: 0.5, d: 0.6 }));
      show("#cred1", L("s1d", 0.6), { s: 0.7, d: 0.7 });
      tl.fromTo("#sam", { opacity: 0, x: -300, y: BIG.sam.y, scale: BIG.sam.s }, { opacity: 1, x: BIG.sam.x, y: BIG.sam.y, scale: BIG.sam.s, duration: 2.0, ease: "power1.out", transformOrigin: "50% 100%" }, 0.4);
      tl.fromTo("#byte", { opacity: 0, x: 300, y: BIG.byte.y, scale: BIG.byte.s }, { opacity: 1, x: BIG.byte.x, y: BIG.byte.y, scale: BIG.byte.s, duration: 2.0, ease: "power1.out", transformOrigin: "50% 100%" }, 0.6);
      wave("#sam", L("s1a"), 3); wave("#byte", L("s1a", 0.6), 3);
      face("#byte", "h", L("s1a")); wiggle("#byte", L("s1b"), 2);
      mood("#sam", "sad", L("s1c", 2.0)); wobble("#sam", L("s1c", 2.0), 2, 5);
      mood("#sam", "happy", L("s1d", 0.4)); cheer("#sam", L("s1d", 1.4));
      const walkBack = LE("s1d", 0.8);
      tl.to("#sam", { x: 0, y: 0, scale: 1, duration: 1.6, ease: "power2.inOut", transformOrigin: "50% 100%" }, walkBack);
      tl.to("#byte", { x: 0, y: 0, scale: 1, duration: 1.6, ease: "power2.inOut", transformOrigin: "50% 100%" }, walkBack);
      tl.to("#s1", { opacity: 0, duration: 0.6 }, walkBack);

      // ===================== 2 · Q1: the short answer =====================
      enter("s2");
      face("#byte", "q", S("s2") + 0.4);
      show("#cA2", L("s2c", 0.1), { y: 40 }); fade("#eA2", L("s2c", 0.7), 0.5);
      show("#stA1", L("s2c", 1.4), { x: -30, s: 0.9, d: 0.6 });
      show("#stA2", L("s2c", 2.6), { x: -30, s: 0.9, d: 0.6 });
      show("#rA2", L("s2c", 3.6), { s: 0.5, d: 0.5 });
      show("#cB2", L("s2d", 0.1), { y: 40 }); fade("#eB2", L("s2d", 0.6), 0.5);
      fade("#convB", L("s2d", 1.2), 0.5);
      tl.fromTo("#cvto", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.6, ease: POP, transformOrigin: "50% 50%" }, L("s2d", 1.9));
      show("#stB2", L("s2d", 2.8), { x: -30, s: 0.9, d: 0.6 });
      show("#rB2", L("s2d", 3.4), { s: 0.5, d: 0.5 });
      show("#tagB2", L("s2e", 0.6), { s: 0.5, d: 0.6 });
      wiggle("#byte", L("s2e", 0.6), 2); mood("#sam", "sad", L("s2e", 1.5)); wobble("#sam", L("s2e", 1.5), 2, 5);
      face("#byte", "h", L("s2c"));
      leave("s2");

      // ===================== 3 · Q1: in practice =====================
      enter("s3");
      mood("#sam", "happy", S("s3"));
      fade("#th3a, #th3b", L("s3a", 0.0), 0.6);
      const row = (i, t) => show("#r3_" + i, t, { x: -40, s: 0.95, d: 0.6 });
      const cell = (i, c, t) => show("#c3_" + i + "_" + c, t, { s: 0.4, d: 0.5 });
      row(1, L("s3b")); cell(1, 1, W("s3b", 4));
      cell(1, 2, W("s3c", 5));
      row(2, L("s3d")); cell(2, 1, W("s3d", 8)); cell(2, 2, W("s3d", 11));
      row(3, L("s3e")); cell(3, 1, W("s3e", 4)); cell(3, 2, W("s3e", 7));
      row(4, L("s3f")); cell(4, 1, W("s3f", 8)); cell(4, 2, W("s3f", 8));
      row(5, L("s3g")); cell(5, 1, W("s3g", 6)); cell(5, 2, W("s3g", 6));
      face("#byte", "a", W("s3f", 1)); face("#byte", "n", L("s3g"));
      show("#rule3", L("s3h", 0.4), { s: 0.85, d: 0.8 }); face("#byte", "h", L("s3h")); cheer("#sam", L("s3h", 1.0));
      show("#null3", L("s3i", 0.4), { s: 0.85, d: 0.8 });
      leave("s3");

      // ===================== 4 · Q2: the short answer =====================
      enter("s4");
      face("#byte", "q", S("s4") + 0.4);
      fade("#hv4, #hl4", L("s4a", 0.8), 0.6);
      fade("#l41", L("s4b"), 0.5); show("#c41v", W("s4b", 4), { x: -40, s: 0.95, d: 0.7 }); show("#c41l", W("s4b", 9), { x: 40, s: 0.95, d: 0.7 });
      fade("#l42", L("s4c"), 0.5); show("#c42v", W("s4c", 4), { x: -40, s: 0.95, d: 0.7 }); show("#c42l", W("s4c", 10), { x: 40, s: 0.95, d: 0.7 });
      show("#tdz4", L("s4d", 0.1), { y: 40, s: 0.95, d: 0.8 });
      face("#byte", "a", L("s4d", 0.3)); mood("#sam", "sad", L("s4d", 0.5));
      leave("s4");

      // ===================== 5 · Q2: in code =====================
      enter("s5");
      face("#byte", "q", S("s5") + 0.4); mood("#sam", "happy", S("s5"));
      fade("#code5a", L("s5a"), 0.7);
      fade("#cons5", L("s5a", 0.4), 0.5);
      countdown("cd5", LE("s5a", 0.15), 1.25);
      wobble("#sam", L("s5a", 0.6), 2, 4);
      hl("code5a", [1], L("s5b", 0.3), 2.2); out("#o5a", W("s5b", 4)); face("#byte", "n", L("s5b"));
      hl("code5a", [3], L("s5c", 0.2), 2.2, "rgba(217,45,72,.35)"); out("#o5b", W("s5c", 5));
      face("#byte", "a", W("s5c", 5)); mood("#sam", "sad", W("s5c", 5));
      hl("code5a", [4], L("s5d", 0.3), 3.2, "rgba(217,45,72,.35)");
      show("#tdz5", W("s5d", 9), { s: 0.6, d: 0.6 });
      // -- scope demo
      hide("#code5a, #o5a, #o5b, #tdz5", L("s5e", 0.0), 0.4);
      fade("#code5b", L("s5e", 0.4), 0.6); face("#byte", "n", L("s5e")); mood("#sam", "happy", L("s5e"));
      hl("code5b", [2], W("s5e", 5), 2.0, "rgba(255,201,60,.6)"); show("#leak5", W("s5e", 7), { s: 0.6, d: 0.6 });
      hl("code5b", [5], W("s5e", 9), 1.6, "rgba(10,138,95,.35)"); out("#o5c", W("s5e", 9));
      hide("#leak5", L("s5f", 0.0), 0.4);
      hl("code5b", [3], W("s5f", 1), 2.0, "rgba(10,127,191,.3)"); show("#stay5", W("s5f", 3), { s: 0.6, d: 0.6 });
      hl("code5b", [6], W("s5f", 7), 2.0, "rgba(217,45,72,.35)"); out("#o5d", W("s5f", 9));
      face("#byte", "a", W("s5f", 9));
      // -- redeclare
      hide("#code5b, #o5c, #o5d, #stay5", L("s5g", 0.2), 0.4);
      fade("#code5c", L("s5h", 0.0), 0.6); face("#byte", "n", L("s5h"));
      hl("code5c", [1, 2], W("s5h", 0), 3.0, "rgba(10,138,95,.3)");
      hl("code5c", [4, 5], W("s5h", 8), 2.4, "rgba(217,45,72,.35)"); out("#o5e", W("s5h", 11)); face("#byte", "a", W("s5h", 11));
      // -- const
      hide("#code5c, #o5e", L("s5i", 0.0), 0.4);
      fade("#code5d", L("s5i", 0.3), 0.6); face("#byte", "n", L("s5i"));
      hl("code5d", [2], W("s5i", 7), 1.6, "rgba(217,45,72,.35)"); out("#o5f", W("s5i", 8)); face("#byte", "a", W("s5i", 8));
      hide("#code5d, #o5f", L("s5j", 0.0), 0.4);
      show("#rec5", L("s5j", 0.4), { s: 0.85, d: 0.8 }); face("#byte", "h", L("s5j", 0.4)); mood("#sam", "happy", L("s5j", 0.4)); cheer("#sam", L("s5j", 1.0));
      leave("s5");

      // ===================== 6 · Q3: the short answer =====================
      enter("s6");
      face("#byte", "q", S("s6") + 0.4);
      show("#ban6", L("s6b", 0.3), { y: 30, s: 0.95, d: 0.8 });
      show("#kc6", W("s6c", 0), { y: 40, s: 0.9, d: 0.8 });
      show("#ka6", W("s6c", 2), { y: 40, s: 0.9, d: 0.8 });
      show("#kb6", W("s6c", 7), { y: 40, s: 0.9, d: 0.8 });
      pulse("#ag6c", L("s6d", 0.4), 1.12); pulse("#ag6a", L("s6d", 1.6), 1.12);
      show("#mn6", L("s6e", 0.4), { s: 0.8, d: 0.7 });
      pulse("#mnc", W("s6e", 7), 1.6); pulse("#mna", W("s6e", 13), 1.6);
      face("#byte", "h", L("s6e")); nod("#sam", L("s6e", 1.0));
      leave("s6");

      // ===================== 7 · Q3: in code =====================
      enter("s7");
      face("#byte", "n", S("s7") + 0.4);
      fade("#code7", L("s7a"), 0.7);
      hl("code7", [4, 5, 6], L("s7a", 0.4), 2.4);
      show("#fn7", L("s7a", 0.4), { y: 30, d: 0.8 });
      show("#ava7", L("s7b", 0.0), { y: 30, s: 0.9 });
      hl("code7", [8], L("s7b", 0.4), 5.5);
      fade("#arA7", W("s7b", 9), 0.5); setText("#this7", "this = Ava", W("s7b", 10));
      setText("#res7", '→ "Hi, Ava!"', W("s7b", 14));
      show("#ben7", L("s7c", 0.0), { y: 30, s: 0.9 });
      hide("#arA7", L("s7c", 0.1), 0.3);
      hl("code7", [9], L("s7c", 0.4), 4.0);
      fade("#arB7", W("s7c", 2), 0.5); setText("#this7", "this = Ben", W("s7c", 3));
      setText("#res7", '→ "Hello, Ben?"', W("s7c", 12));
      pulse("#res7", L("s7d", 0.2), 1.15); face("#byte", "h", L("s7d"));
      hide("#arB7, #ava7, #ben7, #res7", L("s7e", 0.0), 0.4); setText("#this7", "this = ?", L("s7e", 0.0));
      hl("code7", [10], L("s7e", 0.3), 5.0);
      show("#bound7", W("s7e", 7), { y: 30, s: 0.9 });
      hl("code7", [11], L("s7f", 0.2), 2.0); show("#res7b", W("s7f", 7), { s: 0.6, d: 0.6 });
      cheer("#sam", L("s7g", 0.6)); face("#byte", "h", L("s7g"));
      leave("s7");

      // ===================== 8 · Q4: the short answer =====================
      enter("s8");
      face("#byte", "q", S("s8") + 0.4);
      show("#cAll8", W("s8b", 2), { y: 40, s: 0.9, d: 0.8 });
      show("#cRace8", W("s8b", 7), { y: 40, s: 0.9, d: 0.8 });
      show("#raceB1", W("s8b", 11), { x: -30, s: 0.9, d: 0.6 });
      show("#allB1", W("s8c", 4), { x: -30, s: 0.9, d: 0.6 }); fade("#allB3", W("s8c", 9), 0.6);
      show("#allB2", W("s8d", 4), { x: -30, s: 0.9, d: 0.6 }); face("#byte", "a", W("s8d", 4));
      leave("s8");

      // ===================== 9 · Q4: in code =====================
      enter("s9");
      face("#byte", "n", S("s9") + 0.4);
      fade("#code9", L("s9a"), 0.7);
      hl("code9", [1, 2], L("s9a", 0.6), 4.5);
      show("#trk9", L("s9a", 1.6), { y: 30, s: 0.95, d: 0.8 });
      tl.set("#rall9, #rrace9, #q9, #no9, #code9b, #first9, #still9", { opacity: 0 }, 0);
      const tick = (t0, n) => { for (let k = 0; k <= n; k++) tl.set("#clk9", { textContent: k * 100 + " ms" }, t0 + k); };
      // run 1: Promise.all
      hl("code9", [4, 5], L("s9b", 0.2), 5.6);
      tl.fromTo("#bs9", { scaleX: 0 }, { scaleX: 1, duration: 5, ease: "none" }, L("s9b", 0.8));
      tl.fromTo("#bf9", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, L("s9b", 0.8));
      tick(L("s9b", 0.8), 5);
      show("#rall9", L("s9b", 5.8), { s: 0.6, d: 0.6 });
      pulse("#rall9", L("s9c", 0.6), 1.1); hl("code9", [5], L("s9c", 0.3), 2.4, "rgba(10,138,95,.3)");
      // run 2: Promise.race
      hide("#rall9", L("s9d", 0.0), 0.3);
      tl.set("#bs9, #bf9", { scaleX: 0 }, L("s9d", 0.0)); tl.set("#clk9", { textContent: "0 ms" }, L("s9d", 0.0));
      hl("code9", [7, 8], L("s9d", 0.2), 5.8);
      tl.fromTo("#bs9", { scaleX: 0 }, { scaleX: 1, duration: 5, ease: "none", immediateRender: false }, L("s9d", 0.8));
      tl.fromTo("#bf9", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none", immediateRender: false }, L("s9d", 0.8));
      tick(L("s9d", 0.8), 5);
      show("#rrace9", L("s9d", 1.8), { s: 0.6, d: 0.6 }); face("#byte", "h", L("s9d", 1.8));
      show("#first9", L("s9e", 0.8), { s: 0.8, d: 0.7 });
      hide("#first9", L("s9f", 0.0), 0.3);
      show("#q9", L("s9f", 0.3), { y: 20, s: 0.9, d: 0.7 }); face("#byte", "q", L("s9f", 0.3));
      hide("#q9", L("s9g", 0.2), 0.3);
      show("#no9", L("s9g", 0.5), { y: 20, s: 0.9, d: 0.7 }); face("#byte", "n", L("s9g", 0.5));
      show("#still9", L("s9g", 1.2), { s: 0.6, d: 0.6 });
      hide("#no9", L("s9h", 0.0), 0.3);
      fade("#code9b", L("s9h", 0.4), 0.6);
      hl("code9b", [3], W("s9h", 12), 2.0, "rgba(10,138,95,.3)");
      face("#byte", "h", L("s9h", 3.0)); cheer("#sam", L("s9h", 4.0));
      leave("s9");

      // ===================== 10 · Recap =====================
      enter("s10");
      tl.set("#next10, #src10", { opacity: 0 }, 0);
      const RC = { sam: { x: 1295, y: -140, s: 1.7 }, byte: { x: -77, y: -140, s: 1.7 } };
      tl.to("#sam", { x: RC.sam.x, y: RC.sam.y, scale: RC.sam.s, duration: 1.6, ease: "power2.inOut", transformOrigin: "50% 100%" }, S("s10") + 0.4);
      tl.to("#byte", { x: RC.byte.x, y: RC.byte.y, scale: RC.byte.s, duration: 1.6, ease: "power2.inOut", transformOrigin: "50% 100%" }, S("s10") + 0.4);
      face("#byte", "h", L("s10a"));
      show("#rc1", L("s10b", 0.3), { x: -60, s: 0.9 }); wave("#sam", L("s10b", 1.0), 2);
      show("#rc2", L("s10c", 0.3), { x: -60, s: 0.9 });
      show("#rc3", L("s10d", 0.2), { x: -60, s: 0.9 });
      show("#rc4", L("s10e", 0.3), { x: -60, s: 0.9 });
      fade("#src10", L("s10f", 0.2), 0.8);
      show("#next10", L("s10g", 0.2), { s: 0.6, d: 0.7 });
      cheer("#sam", L("s10g", 0.2)); cheer("#byte", L("s10g", 0.6));

      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
      tl.seek(0);
