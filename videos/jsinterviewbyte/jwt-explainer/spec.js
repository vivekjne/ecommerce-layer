      // JWT explainer v2. One visual idea per sentence: each scene's visuals start with the line that talks about them.
      // Every value shown comes from verify_jwt.mjs (sample.json / verified.txt).
      const SEG = {
        h: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        p: "eyJzdWIiOiJ1c2VyXzQyIiwicm9sZSI6InVzZXIiLCJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJhdWQiOiJzaG9wLWFwaSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAwOTAwfQ",
        s: "Abdu8UPZ1qI_V8wt0ro2V1BY14t973bZZWMUHiAfsiI",
      };
      const SHORT = { h: "eyJhbGciOiJIUz…", p: "eyJzdWIiOiJ1c2…", s: "Abdu8UPZ1qI_V8…" };
      const COL = { h: "#a78bfa", p: "#f472b6", s: "#22d3ee" };

      // ---- helpers for this video
      const chapEl = document.createElement("div");
      chapEl.style.cssText = "position:absolute;left:50px;top:350px;width:440px;z-index:12;font:800 32px Inter,Arial,sans-serif;color:#1f2140;background:#22d3ee;border-radius:18px;padding:12px 22px;line-height:1.2;box-shadow:0 6px 0 rgba(0,0,0,.3)";
      document.getElementById("root").appendChild(chapEl);
      tl.set(chapEl, { opacity: 0 }, 0);
      function chapter(text, t) { tl.set(chapEl, { innerHTML: text, opacity: 1 }, t); tl.fromTo(chapEl, { x: -30 }, { x: 0, duration: 0.5, ease: E, immediateRender: false }, t); }
      function moveTo(sel, t, from, to, dur = 1.0, ease = "power2.inOut") { tl.fromTo(sel, { x: from[0], y: from[1] }, { x: to[0], y: to[1], duration: dur, ease, immediateRender: false }, t); }
      // a chip that appears at (x, y), then travels by (dx, dy)
      function packet(id, o, t, dx, dy, dur = 1.3) {
        const s = tok(id, { x: o.x, y: o.y, w: o.w, cls: o.cls, fs: o.fs || 30, html: o.html });
        appear(s, t, { y: 0, s: 0.7 });
        moveTo(s, t + 0.45, [0, 0], [dx, dy], dur);
        return s;
      }
      const stampIn = (sel, t) => { tl.fromTo(sel, { scale: 2.2, rotation: -14 }, { scale: 1, rotation: -6, duration: 0.45, ease: "back.out(2)", immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t); };
      function ring(id, x, y, size, t0, t1) {
        mk('<div id="' + id + '" style="left:' + x + "px;top:" + y + "px;width:" + size + "px;height:" + size + 'px;border-radius:50%;border:10px solid #3a4696;border-top-color:#22d3ee;border-right-color:#a78bfa"></div>', id);
        appear("#" + id, t0, { s: 0.5 });
        tl.fromTo("#" + id, { rotation: 0 }, { rotation: 720, duration: t1 - t0, ease: "none", immediateRender: false }, t0);
        return "#" + id;
      }
      // the token as three coloured segment chips in a row (compact form, used across scenes)
      function segRow(pfx, y, t) {
        const xs = { h: 60, p: 380, s: 700 };
        return ["h", "p", "s"].map((k) => {
          const s = tok(pfx + k, { x: xs[k], y, w: 300, cls: { h: "a", p: "d", s: "b" }[k], fs: 27, html: SHORT[k] });
          appear(s, t, { y: 10 });
          return s;
        });
      }
      const sceneStart = (id) => { wipe(S(id)); };
      const allowOverlap = (...sels) => sels.forEach((s) => document.querySelector(s).setAttribute("data-layout-allow-overlap", ""));

      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // ================= 1. hook =================
      chapter("JSON Web Token", L("s1a", 0));
      const q = tok("q", { x: 380, y: 640, w: 320, cls: "c", fs: 90, html: "JWT ?" });
      appear(q, L("s1a", 0.3), { s: 0.5 });
      gone(q, L("s1b", 0));
      const note1 = box("note1", { x: 220, y: 520, w: 640, h: 300, cls: "c4", fs: 40, html: '<div style="font-size:30px;color:#b4bdf2">a note from the server</div><div style="font-family:var(--mono);font-size:52px;margin-top:14px">"this is user_42"</div>' });
      appear(note1, L("s1b", 0.1));
      const stamp = tok("stamp", { x: 700, y: 770, w: 240, cls: "e", fs: 40, html: TICK + " signed" });
      tl.set(stamp, { opacity: 0 }, 0); stampIn(stamp, WD("s1b", "signed") + 0.1);
      const up1 = pill("up1", { x: 130, y: 900, cls: "li", fs: 46, html: TICK + " very useful" });
      const dn1 = pill("dn1", { x: 560, y: 900, cls: "co", fs: 46, html: CROSS + " easy to misuse" });
      appear(up1, WD("s1c", "useful")); appear(dn1, WD("s1c", "misuse"));
      const both = note("both", { x: 60, y: 1030, w: 960, fs: 46, html: "today: <b>both sides</b>" });
      appear(both, WD("s1c", "both"));

      // ================= 2. three parts =================
      sceneStart("s2");
      chapter("1 · Three parts", S("s2") + 0.2);
      const segHTML = (k) => '<span class="sg" id="sg-' + k + '" style="border-radius:8px;padding:0 2px">' + SEG[k] + "</span>";
      const dotHTML = (i) => '<span class="jd" id="jd' + i + '" style="display:inline-block;color:#fbbf24;font-weight:900;padding:0 4px">.</span>';
      mk('<div id="tbox" style="left:60px;top:500px;width:960px;padding:26px 30px;background:#0a0f2a;border:4px solid #3a4696;border-radius:22px;font:700 33px/1.5 var(--mono);color:#e9ecff;word-break:break-all;box-shadow:0 8px 0 rgba(0,0,0,.32)">' + segHTML("h") + dotHTML(1) + segHTML("p") + dotHTML(2) + segHTML("s") + "</div>", "tbox");
      appear("#tbox", L("s2a", 0.1), { y: 20 });
      // the two dots: grow and glow
      ["#jd1", "#jd2"].forEach((d, i) => {
        tl.fromTo(d, { scale: 1 }, { scale: 1.9, duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 70%", immediateRender: false }, WD("s2a", "dots") + i * 0.25);
      });
      allowOverlap("#jd1", "#jd2");
      const legend = [["h", "header", 60, "vi"], ["p", "payload", 380, "pk"], ["s", "signature", 700, "cy"]];
      const legs = legend.map(([k, n, x, c]) => pill("lg" + k, { x: x + 40, y: 960, cls: c, fs: 40, html: n }));
      const colourSeg = (k, t) => { tl.set("#sg-" + k, { backgroundColor: COL[k], color: "#1f2140" }, t); tl.fromTo("#sg-" + k, { opacity: 0.4 }, { opacity: 1, duration: 0.5, immediateRender: false }, t); };
      colourSeg("h", WD("s2b", "header")); appear(legs[0], WD("s2b", "header"));
      colourSeg("p", L("s2c", 0.0)); appear(legs[1], L("s2c", 0.0));
      colourSeg("s", L("s2d", 0.2)); appear(legs[2], L("s2d", 0.2));

      // ================= 3. reading it =================
      sceneStart("s3");
      chapter("2 · Reading it", S("s3") + 0.2);
      const r3 = segRow("r3", 500, S("s3") + 0.3);
      const dec = box("dec", { x: 330, y: 640, w: 420, h: 100, cls: "c4", fs: 34, html: "base64url decode" });
      appear(dec, WD("s3a", "encoded"));
      const H = codeBlock("cH", { y: 800, fs: 40, name: "header", lines: ["{", '  "alg": "HS256",', '  "typ": "JWT"', "}"] });
      lineHide(H, [1, 2, 3, 4]);
      // header chip drops into the decoder, JSON comes out below
      moveTo(r3[0], L("s3b", 0.1), [0, 0], [330, 140], 0.9); tl.to(r3[0], { opacity: 0, duration: 0.2 }, L("s3b", 0.95)); pulse(dec, L("s3b", 1.0), 1.08);
      appear(H.sel, L("s3b", 1.1), { y: 20 }); lineIn(H, [1, 2, 3, 4], L("s3b", 1.2), 0.2);
      lineHl(H, [2], WD("s3b", "HS256") - 0.2, 2.2);
      // payload
      gone(H.sel, L("s3c", 0));
      const P = codeBlock("cP", { y: 780, fs: 30, name: "payload: the claims", lines: ["{", '  "sub": "user_42",', '  "role": "user",', '  "iss": "https://auth.example.com",', '  "aud": "shop-api",', '  "iat": 1700000000,', '  "exp": 1700000900', "}"] });
      lineHide(P, [1, 2, 3, 4, 5, 6, 7, 8]);
      moveTo(r3[1], L("s3c", 0.2), [0, 0], [10, 140], 0.9); tl.to(r3[1], { opacity: 0, duration: 0.2 }, L("s3c", 1.05)); pulse(dec, L("s3c", 1.1), 1.08);
      appear(P.sel, L("s3c", 1.1), { y: 20 }); lineIn(P, [1, 2, 3, 4, 5, 6, 7, 8], L("s3c", 1.2), 0.12);
      lineHl(P, [2], WD("s3c", "sub"), 1.6); lineHl(P, [3], WD("s3c", "role"), 1.8);
      lineHl(P, [6, 7], WD("s3d", "exp"), 4.0, "rgba(251,191,36,.35)");
      const plus = pill("plus", { x: 690, y: 1035, cls: "", fs: 30, html: "900 s = 15 min later" });
      appear(plus, WD("s3d", "fifteen"));
      const keyq = tok("keyq", { x: 800, y: 650, w: 220, cls: "f", fs: 32, html: "key?" });
      appear(keyq, L("s3e", 0.2));
      tl.set(keyq, { innerHTML: "no key " + CROSS }, L("s3f", 0.1)); pulse(keyq, L("s3f", 0.1), 1.2);
      gone(dec, L("s3f", 0)); gone(r3[2], L("s3f", 0));
      const anyone = pill("anyone", { x: 60, y: 660, cls: "co", fs: 36, html: OPEN + " anyone can read this" });
      appear(anyone, WD("s3f", "Anyone"));
      const sns = box("sns", { x: 60, y: 490, w: 700, h: 100, cls: "c6", fs: 46, html: "signed, <b>not secret</b>" });
      appear(sns, WD("s3f", "signed"));

      // ================= 4. signature =================
      sceneStart("s4");
      chapter("3 · The signature", S("s4") + 0.2);
      const why = note("why", { x: 60, y: 600, w: 960, fs: 50, html: "what stops someone from <b>editing</b> it?" });
      appear(why, L("s4a", 0.2)); gone(why, L("s4b", 0));
      const iH = tok("iH", { x: 60, y: 500, w: 300, cls: "a", fs: 30, html: "header" });
      const iP = tok("iP", { x: 390, y: 500, w: 300, cls: "d", fs: 30, html: "payload" });
      const iK = tok("iK", { x: 720, y: 500, w: 300, cls: "f", fs: 30, html: LOCK + " secret key" });
      appear(iH, WD("s4b", "header")); appear(iP, WD("s4b", "payload")); appear(iK, WD("s4b", "secret"));
      const mac = box("mac", { x: 330, y: 760, w: 420, h: 150, cls: "c2", fs: 54, html: "<code>HMAC</code>" });
      appear(mac, WD("s4b", "HMAC") - 0.4);
      const tIn = WD("s4b", "HMAC");
      moveTo(iH, tIn, [0, 0], [380, 280], 1.0); moveTo(iP, tIn + 0.15, [0, 0], [50, 280], 1.0); moveTo(iK, tIn + 0.3, [0, 0], [-280, 280], 1.0);
      [iH, iP, iK].forEach((s, i) => tl.to(s, { opacity: 0, duration: 0.2 }, tIn + 1.15 + i * 0.15));
      ring("rg", 470, 780, 110, tIn + 0.9, L("s4c", 1.2));
      tl.set("#rg", { opacity: 0 }, L("s4c", 1.2));
      const sOut = tok("sOut", { x: 300, y: 980, w: 480, cls: "b", fs: 34, html: SHORT.s });
      appear(sOut, WD("s4c", "Out")); moveTo(sOut, WD("s4c", "Out"), [0, -80], [0, 0], 0.7);
      const only = box("only", { x: 60, y: 1100, w: 960, h: 100, cls: "c5", fs: 40, html: LOCK + " only the key holder can make it match" });
      appear(only, WD("s4c", "Only"));

      // ================= 5. flow =================
      sceneStart("s5");
      chapter("4 · How it is used", S("s5") + 0.2);
      const bw = box("bw", { x: 60, y: 490, w: 250, h: 90, cls: "c1", fs: 40, html: "Your app" });
      const sv = box("sv", { x: 770, y: 490, w: 250, h: 90, cls: "c2", fs: 40, html: "Server" });
      const vb = line("vb", { x1: 185, y1: 585, x2: 185, y2: 1220, c: "W", w: 4, dash: true, arrow: false });
      const vs = line("vs", { x1: 895, y1: 585, x2: 895, y2: 1220, c: "W", w: 4, dash: true, arrow: false });
      appear(bw, S("s5") + 0.3); appear(sv, S("s5") + 0.4); drawLine(vb, S("s5") + 0.5, 0.6); drawLine(vs, S("s5") + 0.5, 0.6);
      const a1 = line("a1", { x1: 190, y1: 660, x2: 890, y2: 660, c: "C", w: 6 });
      drawLine(a1, WD("s5a", "sends"), 1.4);
      packet("pk1", { x: 200, y: 610, w: 330, cls: "b", html: "email + password" }, WD("s5a", "sends"), 340, 0, 1.4);
      pulse(sv, L("s5b", 0.2), 1.12);
      const sgn = tok("sgn", { x: 570, y: 700, w: 300, cls: "e", fs: 28, html: TICK + " signs a token" });
      appear(sgn, WD("s5b", "signs"));
      const a2 = line("a2", { x1: 890, y1: 800, x2: 190, y2: 800, c: "L", w: 6 });
      drawLine(a2, WD("s5b", "back") - 0.4, 1.3);
      packet("pk2", { x: 640, y: 750, w: 200, cls: "e", html: "JWT" }, WD("s5b", "back") - 0.4, -400, 0, 1.3);
      const a3 = line("a3", { x1: 190, y1: 930, x2: 890, y2: 930, c: "C", w: 6 });
      drawLine(a3, L("s5c", 0.2), 1.3);
      packet("pk3", { x: 200, y: 880, w: 300, cls: "c", fs: 28, html: "GET /orders + JWT" }, L("s5c", 0.2), 360, 0, 1.3);
      const auth = lab("auth", { x: 200, y: 942, fs: 26, html: "header: <b>Authorization: Bearer &lt;JWT&gt;</b>" });
      appear(auth, WD("s5c", "Authorization") - 0.2);
      // "every request": more requests follow, each carrying the token
      packet("pk3b", { x: 200, y: 990, w: 280, cls: "c", fs: 24, html: "GET /profile + JWT" }, WD("s5c", "every"), 380, 0, 1.0);
      packet("pk3c", { x: 200, y: 1040, w: 280, cls: "c", fs: 24, html: "POST /cart + JWT" }, WD("s5c", "every") + 0.8, 380, 0, 1.0);
      const vf = box("vf", { x: 560, y: 1080, w: 460, h: 140, cls: "c5", fs: 30, html: '<div id="vf1" style="opacity:.25">' + TICK + " signature matches</div>" + '<div id="vf2" style="opacity:.25">' + TICK + " not expired</div>" + '<div id="vf3" style="opacity:.25">' + CROSS + " no database lookup</div>" });
      appear(vf, L("s5d", 0.1));
      tl.set("#vf1", { opacity: 1 }, WD("s5d", "recomputes")); tl.set("#vf2", { opacity: 1 }, WD("s5d", "expiry")); tl.set("#vf3", { opacity: 1 }, WD("s5d", "database"));
      const db = box("db", { x: 200, y: 1110, w: 300, h: 100, cls: "c4", fs: 34, html: "session database" });
      appear(db, WD("s5d", "database") - 0.3);
      const dbx = tok("dbx", { x: 70, y: 1115, w: 100, cls: "f", fs: 52, html: "✗" });
      tl.set(dbx, { opacity: 0 }, 0); stampIn(dbx, WD("s5d", "needed"));

      // ================= 6. tampering =================
      sceneStart("s6");
      chapter("5 · Try to cheat", S("s6") + 0.2);
      const r6 = segRow("r6", 500, S("s6") + 0.3);
      const ed = codeBlock("ed", { y: 620, fs: 44, name: "payload, decoded and edited", lines: ['"role": "user"'] });
      appear(ed.sel, WD("s6a", "change") - 0.3, { y: 20 });
      const tEdit = WD("s6a", "admin");
      tl.set("#ed .cl", { innerHTML: '<span class="st">"role"</span>: <span class="st" style="text-decoration:line-through;opacity:.6">"user"</span> <span class="st" style="color:#fda4af">"admin"</span>' }, tEdit);
      lineHl(ed, [1], tEdit, 2.5, "rgba(251,113,133,.35)");
      tl.set(r6[1], { backgroundColor: "#fb7185" }, tEdit + 0.3); tl.set(r6[1], { innerHTML: "edited payload" }, tEdit + 0.3); pulse(r6[1], tEdit + 0.3, 1.15);
      const c1 = cell("c1", { x: 60, y: 800, w: 440, h: 150, label: "signature in the token", html: "Abdu8UPZ1qI_V8…", fs: 32, border: "#22d3ee" });
      const c2 = cell("c2", { x: 580, y: 800, w: 440, h: 150, label: "recomputed by the server", html: "computing…", fs: 32, border: "#fb7185" });
      appear(c1, L("s6b", 0.1)); appear(c2, WD("s6b", "recomputes"));
      tl.set("#c2 .vl", { innerHTML: "O5o5m6dqckElPn…" }, WD("s6b", "payload") + 0.2); pulse("#c2 .vl", WD("s6b", "payload") + 0.2, 1.2);
      const ne = note("ne", { x: 500, y: 840, w: 80, fs: 70, html: "≠" });
      appear(ne, WD("s6b", "match") - 0.2); pulse(ne, WD("s6b", "match"), 1.5);
      const rej = tok("rej", { x: 270, y: 1010, w: 540, cls: "f", fs: 64, html: CROSS + " REJECTED" });
      tl.set(rej, { opacity: 0 }, 0); stampIn(rej, WD("s6c", "rejected"));
      const nk = note("nk", { x: 60, y: 1150, w: 960, fs: 40, html: "no key → no valid signature" });
      appear(nk, WD("s6c", "Without"));

      // ================= 7. upsides =================
      sceneStart("s7");
      chapter("6 · The upsides", S("s7") + 0.2);
      const ut = tok("ut", { x: 90, y: 790, w: 200, cls: "e", fs: 50, html: "JWT" });
      appear(ut, L("s7a", 0.3));
      const ss = box("ss", { x: 60, y: 500, w: 420, h: 120, cls: "c4", fs: 32, html: "session store<small>not needed</small>" });
      appear(ss, WD("s7b", "stateless") - 0.2);
      const ssx = tok("ssx", { x: 400, y: 510, w: 90, cls: "f", fs: 48, html: "✗" });
      tl.set(ssx, { opacity: 0 }, 0); stampIn(ssx, WD("s7b", "stateless") + 0.2);
      const svs = ["orders", "billing", "search"].map((n, i) => box("svc" + i, { x: 600, y: 660 + i * 180, w: 420, h: 130, cls: "c5", fs: 38, html: n + ' service<small id="vk' + i + '" style="opacity:0">' + TICK + " verified with the key</small>" }));
      const sl = [0, 1, 2].map((i) => line("sl" + i, { x1: 295, y1: 820, x2: 590, y2: 720 + i * 180, c: "L", w: 6 }));
      const tS = WD("s7b", "service");
      svs.forEach((s, i) => { appear(s, tS + i * 0.5); drawLine(sl[i], tS + 0.2 + i * 0.5, 0.6); tl.set("#vk" + i, { opacity: 1 }, WD("s7b", "itself") + i * 0.35); });

      // ================= 8. downsides =================
      sceneStart("s8");
      chapter("7 · The downsides", S("s8") + 0.2);
      const catchQ = note("cq", { x: 60, y: 640, w: 960, fs: 60, html: "what is the <b>catch</b>?" });
      appear(catchQ, L("s8a", 0.2)); gone(catchQ, L("s8b", 0));
      const ctitle = (id, txt, t) => { const s = pill(id, { x: 60, y: 490, cls: "co", fs: 40, html: txt }); appear(s, t); return s; };
      // catch 1: no take-backs, on a clock timeline
      const k1 = ctitle("k1", "catch 1 · you cannot take it back", L("s8b", 0.1));
      const tl0 = 120, tl1 = 960, ty = 760;
      const bar = line("tbar", { x1: tl0, y1: ty, x2: tl1, y2: ty, c: "L", w: 14, arrow: false });
      drawLine(bar, L("s8c", 0.1), 0.8);
      const ticks = ["10:00", "10:05", "10:10", "10:15"].map((s, i) => lab("tk" + i, { x: tl0 - 40 + i * (tl1 - tl0) / 3, y: ty + 30, fs: 30, html: s }));
      ticks.forEach((t, i) => appear(t, L("s8c", 0.3 + i * 0.15)));
      const lo = tok("lo", { x: tl0 - 60, y: ty - 120, w: 160, cls: "f", fs: 30, html: "logout" });
      appear(lo, WD("s8c", "logs"));
      const exl = tok("exl", { x: tl1 - 70, y: ty - 120, w: 140, cls: "c", fs: 30, html: "exp" });
      appear(exl, WD("s8c", "logs") + 0.5);
      const cp = tok("cp", { x: tl0 - 70, y: ty + 90, w: 220, cls: "d", fs: 28, html: "copied token" });
      appear(cp, WD("s8c", "copied"));
      moveTo(cp, WD("s8c", "copied") + 0.3, [0, 0], [tl1 - tl0, 0], WD("s8c", "fifteen") - WD("s8c", "copied") + 0.3, "none");
      [1, 2].forEach((i) => { const m = tok("ok" + i, { x: tl0 - 30 + i * (tl1 - tl0) / 3, y: ty - 75, w: 60, cls: "e", fs: 30, html: "✓" }); appear(m, WD("s8c", "copied") + 0.3 + i * (WD("s8c", "fifteen") - WD("s8c", "copied")) / 3); });
      const acc = note("acc", { x: 60, y: 980, w: 960, fs: 40, html: "still <b>accepted</b>: the server has no list to cancel it" });
      appear(acc, WD("s8c", "works"));
      // catch 2: stale claims
      const T2 = L("s8d", -0.1);
      [k1, bar, ...ticks, lo, exl, cp, "#ok1", "#ok2", acc].forEach((e) => gone(e, T2));
      const k2 = ctitle("k2", "catch 2 · claims go stale", L("s8d", 0));
      const dbc = cell("dbc", { x: 60, y: 640, w: 440, h: 170, label: "database", html: 'role = "user"', fs: 40, border: "#86efac" });
      const tkc = cell("tkc", { x: 580, y: 640, w: 440, h: 170, label: "token", html: 'role = "user"', fs: 40, border: "#a78bfa" });
      appear(dbc, L("s8d", 0.4)); appear(tkc, L("s8d", 0.7));
      tl.set("#dbc .vl", { innerHTML: 'role = "editor"' }, WD("s8e", "editor")); pulse("#dbc .vl", WD("s8e", "editor"), 1.25);
      tint(tkc, WD("s8e", "still"), "#fb7185");
      const stl = pill("stl", { x: 680, y: 850, cls: "co", fs: 36, html: "stale until it expires" });
      appear(stl, WD("s8e", "still"));
      // catch 3: size (verified: 32 and 235 characters; 659 with more claims)
      const T3 = L("s8f", -0.1);
      [k2, dbc, tkc, stl].forEach((e) => gone(e, T3));
      const k3 = ctitle("k3", "catch 3 · size", L("s8f", 0));
      const sizes = [["session id", 32, "c", "session"], ["our JWT", 235, "e", "token"], ["JWT + more claims", 659, "f", "grows"]];
      sizes.forEach(([n, v, cls, w], i) => {
        const y = 640 + i * 150;
        const lb = lab("szl" + i, { x: 60, y: y + 10, fs: 32, html: n });
        const b = tok("szb" + i, { x: 380, y, w: Math.max(30, Math.round(v / 659 * 560)), h: 52, cls, fs: 28, html: "" });
        const nn = lab("szn" + i, { x: 380, y: y + 70, fs: 28, html: v + " characters" });
        appear(lb, WD("s8f", w) - 0.2); appear(nn, WD("s8f", w) + 0.3);
        tl.set(b, { scaleX: 0.02, transformOrigin: "0% 50%" }, 0); tl.set(b, { opacity: 1 }, WD("s8f", w));
        tl.to(b, { scaleX: 1, duration: 1.0, ease: E }, WD("s8f", w));
      });
      // catch 4: localStorage + XSS
      const T4 = L("s8g", -0.1);
      gone(k3, T4); [0, 1, 2].forEach((i) => { gone("#szl" + i, T4); gone("#szb" + i, T4); gone("#szn" + i, T4); });
      const k4 = ctitle("k4", "catch 4 · local storage + XSS", L("s8g", 0));
      const page = zone("page", { x: 60, y: 600, w: 600, h: 420, label: "your page", color: "#22d3ee", bg: "rgba(34,211,238,.06)" });
      appear(page, L("s8g", 0.2));
      const lsc = cell("lsc", { x: 110, y: 690, w: 500, h: 130, label: "localStorage", html: "JWT", fs: 44, border: "#fbbf24" });
      appear(lsc, WD("s8g", "local"));
      const xs = tok("xs", { x: 150, y: 890, w: 260, cls: "f", fs: 32, html: "&lt;script&gt; XSS" });
      appear(xs, WD("s8g", "scripting"));
      const stol = tok("stol", { x: 470, y: 860, w: 160, cls: "e", fs: 32, html: "JWT copy" });
      const atk = box("atk", { x: 760, y: 620, w: 260, h: 130, cls: "c6", fs: 38, html: "attacker" });
      appear(atk, WD("s8g", "scripting") + 0.2);
      moveTo(xs, WD("s8g", "steal") - 0.6, [0, 0], [0, -40], 0.6);
      appear(stol, WD("s8g", "steal"), { s: 0.6 });
      moveTo(stol, WD("s8g", "steal") + 0.3, [0, 0], [360, -60], 1.2);
      allowOverlap(xs, stol, iH, iP, iK);

      // ================= 9. mistakes =================
      sceneStart("s9");
      chapter("8 · Mistakes to avoid", S("s9") + 0.2);
      const mlist = ["1 · trusting the header's algorithm", "2 · a weak secret", "3 · skipping checks", "4 · secrets in the payload"];
      const mpills = mlist.map((m, i) => box("ml" + i, { x: 160, y: 520 + i * 160, w: 760, h: 120, cls: "c6", fs: 40, html: m }));
      mpills.forEach((p, i) => appear(p, L("s9a", 0.2 + i * 0.35)));
      mpills.forEach((p) => gone(p, L("s9b", 0)));
      // 1: alg none
      const m1 = ctitle("m1", "mistake 1 · trusting the header's algorithm", L("s9b", 0));
      const ah = codeBlock("ah", { y: 610, fs: 42, name: "token header", lines: ['{ "alg": "HS256" }'] });
      appear(ah.sel, L("s9b", 0.4), { y: 20 });
      tl.set("#ah .cl", { innerHTML: '{ <span class="st">"alg"</span>: <span class="st" style="color:#fda4af">"none"</span> }   <span class="cm">// no signature</span>' }, WD("s9b", "none"));
      lineHl(ah, [1], WD("s9b", "none"), 2.0, "rgba(251,113,133,.35)");
      const nv = box("nv", { x: 60, y: 780, w: 460, h: 260, cls: "c6", fs: 34, html: "careless verifier<small>uses the alg from the token</small><div style='font-size:46px;margin-top:10px'>" + TICK + " accepted</div><small>role: admin</small>" });
      appear(nv, L("s9c", 0.2)); shakeEl(nv, WD("s9c", "fake"));
      const pv = box("pv", { x: 560, y: 780, w: 460, h: 260, cls: "c5", fs: 34, html: "pinned to HS256<small>chosen by the server</small><div style='font-size:46px;margin-top:10px'>" + CROSS + " rejected</div><small>alg none not allowed</small>" });
      appear(pv, L("s9d", 0.2));
      // key confusion (verified in verify_jwt.mjs, case 6)
      const T9e = L("s9e", -0.1);
      [ah.sel, nv, pv].forEach((e) => gone(e, T9e));
      const kpub = tok("kpub", { x: 60, y: 620, w: 340, cls: "c", fs: 32, html: "public key<small>published on purpose</small>" });
      const kuse = tok("kuse", { x: 540, y: 620, w: 480, cls: "f", fs: 28, html: "misused as the HMAC secret<small>header switched to HS256</small>" });
      const kl = line("kl", { x1: 405, y1: 665, x2: 530, y2: 665, c: "R", w: 7 });
      appear(kpub, WD("s9e", "public")); drawLine(kl, WD("s9e", "misused") - 0.2, 0.6); appear(kuse, WD("s9e", "misused"));
      const kfix = box("kfix", { x: 160, y: 860, w: 760, h: 140, cls: "c5", fs: 38, html: TICK + " pinned to RS256: forged token rejected" });
      appear(kfix, WD("s9e", "secret") - 0.2);
      // 2: weak secret
      const T9f = L("s9f", -0.1);
      [m1, kpub, kuse, kl, kfix].forEach((e) => gone(e, T9f));
      const m2 = ctitle("m2", "mistake 2 · a weak secret", L("s9f", 0));
      const one = tok("one", { x: 60, y: 615, w: 320, cls: "e", fs: 30, html: "one stolen token" });
      appear(one, WD("s9f", "token"));
      const guesses = ["password", "123456", "admin", "letmein", "secret"];
      const gb = cell("gb", { x: 420, y: 590, w: 600, h: 130, label: "offline guessing", html: "…", fs: 42, border: "#fb7185" });
      appear(gb, WD("s9f", "guesses"));
      const gStart = WD("s9f", "guesses") + 0.3, gEnd = WD("s9g", "fifth");
      guesses.forEach((g, i) => tl.set("#gb .vl", { innerHTML: g + (i < 4 ? " " + CROSS : " " + TICK) }, gStart + i * (gEnd - gStart) / 4));
      tint(gb, gEnd, "#86efac");
      const found = pill("found", { x: 420, y: 750, cls: "co", fs: 36, html: "cracked on guess 5" });
      appear(found, gEnd);
      const strong = box("strong", { x: 60, y: 880, w: 960, h: 140, cls: "c5", fs: 38, html: TICK + " at least 32 random bytes<small>not a word, not a password</small>" });
      appear(strong, WD("s9g", "thirty"));
      // 3: skipping checks: a token passes three gates
      const T9h = L("s9h", -0.1);
      [m2, one, gb, found, strong].forEach((e) => gone(e, T9h));
      const m3 = ctitle("m3", "mistake 3 · skipping checks", L("s9h", 0));
      const gates = [["exp", "not expired?", "expiry"], ["iss", "right issuer?", "issuer"], ["aud", "meant for us?", "audience"]];
      const gt = gates.map(([c, d, w], i) => { const g = box("gt" + i, { x: 120 + i * 310, y: 640, w: 260, h: 200, cls: "c1", fs: 40, html: "<code>" + c + "</code><small>" + d + "</small>" }); appear(g, WD("s9h", w) - 0.2); tint(g, WD("s9h", w) + 0.5, "#86efac"); return g; });
      const gtok = tok("gtok", { x: 60, y: 900, w: 160, cls: "e", fs: 34, html: "JWT" });
      appear(gtok, WD("s9h", "Always"));
      moveTo(gtok, WD("s9h", "expiry"), [0, 0], [860, 0], LE("s9h", 0) - WD("s9h", "expiry"), "none");
      // 4: secrets in the payload
      const T9i = L("s9i", -0.1);
      [m3, ...gt, gtok].forEach((e) => gone(e, T9i));
      const m4 = ctitle("m4", "mistake 4 · secrets in the payload", L("s9i", 0));
      const sp = codeBlock("sp", { y: 640, fs: 42, name: "payload", lines: ['"sub": "user_42",', '"password": "hunter2"'] });
      appear(sp.sel, L("s9i", 0.3), { y: 20 }); lineHl(sp, [2], WD("s9i", "secrets"), 3.0, "rgba(251,113,133,.35)");
      const rdb = pill("rdb", { x: 60, y: 880, cls: "co", fs: 40, html: OPEN + " readable by anyone with the token" });
      appear(rdb, WD("s9i", "anyone"));

      // ================= 10. do instead =================
      sceneStart("s10");
      chapter("9 · Do this instead", S("s10") + 0.2);
      // short access tokens
      const d1 = box("d1", { x: 60, y: 500, w: 960, h: 110, cls: "c5", fs: 40, html: TICK + " access token: 5 to 15 minutes" });
      appear(d1, L("s10b", 0.1));
      // HttpOnly cookie blocks scripts
      const ck = cell("ck", { x: 60, y: 660, w: 520, h: 140, label: "HttpOnly · Secure · SameSite cookie", html: "refresh token", fs: 38, border: "#86efac" });
      appear(ck, L("s10c", 0.2));
      const xs2 = tok("xs2", { x: 830, y: 700, w: 190, cls: "f", fs: 30, html: "&lt;script&gt;" });
      appear(xs2, WD("s10c", "scripts") - 0.3); moveTo(xs2, WD("s10c", "scripts"), [0, 0], [-40, 0], 0.6);
      const blk = tok("blk", { x: 600, y: 705, w: 200, cls: "f", fs: 28, html: CROSS + " blocked" });
      tl.set(blk, { opacity: 0 }, 0); stampIn(blk, WD("s10c", "read"));
      // rotation with reuse detection
      const rot = [1, 2, 3].map((n, i) => tok("rt" + n, { x: 60 + i * 230, y: 860, w: 190, cls: "c", fs: 28, html: "refresh #" + n }));
      const rl = [0, 1].map((i) => line("rl" + i, { x1: 255 + i * 230, y1: 895, x2: 285 + i * 230, y2: 895, c: "L", w: 6 }));
      rot.forEach((r, i) => appear(r, L("s10d", 0.2 + i * 0.6)));
      rl.forEach((l, i) => drawLine(l, L("s10d", 0.6 + i * 0.6), 0.3));
      [0, 1].forEach((i) => tl.set(rot[i], { backgroundColor: "#6b7299" }, L("s10d", 0.8 + i * 0.6)));
      const reuse = tok("reuse", { x: 760, y: 845, w: 260, cls: "f", fs: 26, html: "#1 used again!<small>reuse = stolen</small>" });
      appear(reuse, WD("s10d", "old")); shakeEl(reuse, WD("s10d", "stolen"));
      // one server: sessions
      const ses = box("ses", { x: 60, y: 1010, w: 960, h: 130, cls: "c1", fs: 38, html: TICK + " one server? a classic session<small>simpler, and revoked instantly</small>" });
      appear(ses, WD("s10e", "session"));

      // ================= 11. wrap =================
      sceneStart("s11");
      chapter("Remember", S("s11") + 0.2);
      const w1 = box("w1", { x: 60, y: 520, w: 960, h: 150, cls: "c1", fs: 56, html: "signed, <b>not secret</b>" });
      const w2 = box("w2", { x: 60, y: 710, w: 960, h: 150, cls: "c3", fs: 56, html: "short lived" });
      const w3 = box("w3", { x: 60, y: 900, w: 960, h: 150, cls: "c5", fs: 56, html: "verified strictly" });
      appear(w1, WD("s11b", "Signed")); appear(w2, WD("s11b", "Short")); appear(w3, WD("s11b", "Verified"));
      cheer("#sam", LE("s11b", -0.5));
