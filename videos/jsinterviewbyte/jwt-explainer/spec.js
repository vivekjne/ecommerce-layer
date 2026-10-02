      // JWT explainer: anatomy, flow, upsides, downsides, what not to do, what to do. Every output is from verify_jwt.mjs.
      const TK = { h: "eyJhbGciOiJIUz…", p: "eyJzdWIiOiJ1c2Vy…", s: "Abdu8UPZ1qI_V8w…" };
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // ---- hook
      const seal = box("seal", { x: 250, y: 540, w: 560, h: 250, cls: "c2", fs: 62, html: '<code>JWT</code><small>a signed note: "this is user_42"</small>' });
      appear(seal, WD("s1b", "signed"));
      const ok1 = pill("ok1", { x: 160, y: 860, cls: "li", fs: 46, html: TICK + " very useful" });
      const no1 = pill("no1", { x: 560, y: 860, cls: "co", fs: 46, html: CROSS + " easy to misuse" });
      appear(ok1, WD("s1b", "useful")); appear(no1, WD("s1b", "misuse"));
      const both = note("both", { x: 60, y: 990, w: 960, fs: 48, html: 'two sides: <b>upsides</b> and <b>downsides</b>' });
      appear(both, WD("s1b", "both"));

      // ---- anatomy
      wipe(L("s2a", -0.15));
      const tcol = [["h", "a", 60], ["p", "d", 372], ["s", "b", 686]];
      const chipsT = tcol.map(([k, cls, x]) => tok("t" + k, { x, y: 500, w: 290, cls, fs: 27, html: TK[k] }));
      const dots = [350, 664].map((x, i) => lab("dot" + i, { x, y: 498, fs: 52, html: "." }));
      const nms = [["header", 60], ["payload", 372], ["signature", 686]].map(([n, x], i) => pill("nm" + i, { x: x + 60, y: 570, cls: ["vi", "pk", "cy"][i], fs: 32, html: n }));
      chipsT.forEach((c, i) => appear(c, WD("s2a", ["header,", "payload,", "signature."][i].replace(/[,.]/g, "")) - 1.0 + 0.0, { y: 10 }));
      dots.forEach((d, i) => appear(d, WD("s2a", "dots") + i * 0.3));
      nms.forEach((n, i) => appear(n, WD("s2a", ["header", "payload", "signature"][i], 0) - 0.1));
      // decoded cards, one at a time in the same place
      const hdr = codeBlock("jh", { y: 660, fs: 40, name: "header (decoded)", lines: ["{", '  "alg": "HS256",', '  "typ": "JWT"', "}"] });
      lineHide(hdr, [1, 2, 3, 4]);
      const pay = codeBlock("jp", { y: 660, fs: 31, name: "payload = claims (decoded)", lines: ["{", '  "sub": "user_42",', '  "role": "user",', '  "iss": "https://auth.example.com",', '  "aud": "shop-api",', '  "iat": 1700000000,', '  "exp": 1700000900', "}"] });
      lineHide(pay, [1, 2, 3, 4, 5, 6, 7, 8]);
      const sig = codeBlock("js", { y: 660, fs: 38, name: "signature", lines: ["HMAC-SHA256(", '  header + "." + payload,', "  secret key", ")"] });
      lineHide(sig, [1, 2, 3, 4]);
      appear(hdr.sel, WD("s2b", "header") - 0.2, { y: 20 }); lineIn(hdr, [1, 2, 3, 4], WD("s2b", "names") - 0.2, 0.2); lineHl(hdr, [2], WD("s2b", "algorithm"), 1.6);
      const t2 = WD("s2b", "payload"); gone(hdr.sel, t2 - 0.1);
      appear(pay.sel, t2 - 0.1, { y: 20 }); lineIn(pay, [1, 2, 3, 4, 5, 6, 7, 8], t2, 0.15); lineHl(pay, [2], WD("s2b", "user,"), 1.3); lineHl(pay, [7], WD("s2b", "expires"), 1.8, "rgba(251,191,36,.35)");
      const t3 = WD("s2c", "signature"); gone(pay.sel, t3 - 0.1);
      appear(sig.sel, t3 - 0.1, { y: 20 }); lineIn(sig, [1, 2, 3, 4], t3, 0.35); lineHl(sig, [3], WD("s2c", "secret"), 1.6, "rgba(251,113,133,.35)");
      const sres = tok("sres", { x: 60, y: 1010, w: 470, cls: "b", fs: 30, html: "= " + TK.s });
      appear(sres, WD("s2c", "hash"));
      // readable by anyone
      const t4 = L("s2d", 0.0); gone(sig.sel, t4 - 0.05); gone(sres, t4 - 0.05);
      appear(pay.sel, t4 - 0.05, { y: 20 }); lineIn(pay, [1, 2, 3, 4, 5, 6, 7, 8], t4, 0); 
      const b64 = pill("b64", { x: 60, y: 1090, cls: "cy", fs: 36, html: "base64url = an encoding, not encryption" });
      appear(b64, WD("s2d", "base"));
      const rd = pill("rd", { x: 60, y: 1160, cls: "co", fs: 38, html: OPEN + " anyone can read it" });
      appear(rd, WD("s2d", "Anyone"));
      const sn = note("sn", { x: 560, y: 1155, w: 460, fs: 44, html: 'signed <b>≠</b> secret' });
      appear(sn, WD("s2d", "signed"));

      // ---- flow
      wipe(L("s3a", -0.15));
      tl.set([...chipsT, ...dots, ...nms, hdr.sel, pay.sel, sig.sel, sres, b64, rd, sn], { opacity: 0 }, L("s3a", -0.15));
      const bw = box("bw", { x: 60, y: 490, w: 250, h: 90, cls: "c1", fs: 40, html: "Browser" });
      const sv = box("sv", { x: 770, y: 490, w: 250, h: 90, cls: "c2", fs: 40, html: "Server" });
      const vb = line("vb", { x1: 185, y1: 590, x2: 185, y2: 1200, c: "W", w: 4, dash: true, arrow: false });
      const vs = line("vs", { x1: 895, y1: 590, x2: 895, y2: 1200, c: "W", w: 4, dash: true, arrow: false });
      appear(bw, L("s3a", 0.1)); appear(sv, L("s3a", 0.2)); drawLine(vb, L("s3a", 0.3), 0.6); drawLine(vs, L("s3a", 0.4), 0.6);
      const m1 = line("m1", { x1: 190, y1: 690, x2: 890, y2: 690, c: "C", w: 7 });
      const m1l = lab("m1l", { x: 330, y: 635, fs: 34, html: 'POST /login <b>(email, password)</b>' });
      drawLine(m1, WD("s3a", "log") - 0.1, 0.8); appear(m1l, WD("s3a", "log"));
      const sg = tok("sg", { x: 480, y: 720, w: 410, cls: "c", fs: 30, html: "server signs the token" });
      appear(sg, WD("s3a", "signs")); pulse(sv, WD("s3a", "signs"), 1.12);
      const m2 = line("m2", { x1: 890, y1: 830, x2: 190, y2: 830, c: "L", w: 7 });
      const m2l = tok("m2l", { x: 330, y: 770, w: 200, cls: "e", fs: 34, html: "JWT" });
      drawLine(m2, WD("s3a", "sends") - 0.2, 0.8); appear(m2l, WD("s3a", "sends"));
      const m3 = line("m3", { x1: 190, y1: 960, x2: 890, y2: 960, c: "C", w: 7 });
      const m3l = lab("m3l", { x: 230, y: 905, fs: 30, html: 'GET /orders <b>Authorization: Bearer JWT</b>' });
      drawLine(m3, WD("s3b", "every") - 0.3, 0.8); appear(m3l, WD("s3b", "every") - 0.2);
      const vf = box("vf", { x: 560, y: 985, w: 460, h: 125, cls: "c5", fs: 32, html: TICK + ' signature matches<br>' + TICK + ' not expired<small>no database lookup</small>' });
      appear(vf, WD("s3b", "recomputes")); pulse(vf, WD("s3b", "expiry"), 1.06);
      const m4 = line("m4", { x1: 890, y1: 1190, x2: 190, y2: 1190, c: "L", w: 7 });
      const m4l = lab("m4l", { x: 420, y: 1135, fs: 34, html: '<b>200 OK</b> + the data' });
      drawLine(m4, WD("s3b", "database") - 0.2, 0.7); appear(m4l, WD("s3b", "database") - 0.1);

      // tamper
      wipe(L("s3c", -0.15));
      tl.set([bw, sv, vb, vs, m1, m1l, sg, m2, m2l, m3, m3l, vf, m4, m4l], { opacity: 0 }, L("s3c", -0.15));
      const tpay = tok("tpay2", { x: 372, y: 500, w: 290, cls: "f", fs: 27, html: "eyJzdWIiOiJ1c2Vy…" });
      const th = tok("th2", { x: 60, y: 500, w: 290, cls: "a", fs: 27, html: TK.h });
      const ts = tok("ts2", { x: 686, y: 500, w: 290, cls: "b", fs: 27, html: TK.s });
      appear(th, L("s3c", 0.0)); appear(tpay, L("s3c", 0.0)); appear(ts, L("s3c", 0.0));
      const pc = codeBlock("pc", { y: 600, fs: 36, name: "payload edited", lines: ['"role": "user"  →  "role": "admin"'] });
      appear(pc.sel, WD("s3c", "letter") - 0.2, { y: 20 }); lineHl(pc, [1], WD("s3c", "admin"), 2.0, "rgba(251,113,133,.35)");
      const cmp1 = cell("cmp1", { x: 60, y: 760, w: 460, h: 150, label: "signature in the token", html: "Abdu8UPZ1qI_V8…", fs: 32, border: "#22d3ee" });
      const cmp2 = cell("cmp2", { x: 560, y: 760, w: 460, h: 150, label: "recomputed from the payload", html: "O5o5m6dqckElPn…", fs: 32, border: "#fb7185" });
      const neq = note("neq", { x: 440, y: 820, w: 200, fs: 70, html: "≠" });
      appear(cmp1, WD("s3c", "signature")); appear(cmp2, WD("s3c", "signature") + 0.4); appear(neq, WD("s3c", "no"));
      const rej = box("rej", { x: 210, y: 970, w: 660, h: 130, cls: "c6", fs: 52, html: CROSS + " token rejected" });
      appear(rej, WD("s3c", "rejected")); shakeEl(rej, WD("s3c", "rejected"));

      // ---- upsides
      wipe(L("s4a", -0.15));
      tl.set([th, tpay, ts, pc.sel, cmp1, cmp2, neq, rej], { opacity: 0 }, L("s4a", -0.15));
      const ut = tok("ut", { x: 100, y: 770, w: 200, cls: "e", fs: 50, html: "JWT" });
      appear(ut, L("s4a", 0.2));
      const svs = ["orders", "billing", "search"].map((n, i) => box("sv" + i, { x: 560, y: 520 + i * 200, w: 400, h: 140, cls: "c5", fs: 38, html: TICK + " " + n + "<small>verifies with the key</small>" }));
      const sl = [0, 1, 2].map((i) => line("sl" + i, { x1: 310, y1: 800, x2: 550, y2: 590 + i * 200, c: "L", w: 7 }));
      const k = ["stateless", "service", "key"];
      appear(svs[0], WD("s4a", "stateless")); drawLine(sl[0], WD("s4a", "stateless") + 0.1); appear(svs[1], WD("s4a", "service") + 0.2); drawLine(sl[1], WD("s4a", "service") + 0.2); appear(svs[2], WD("s4a", "key") + 0.1); drawLine(sl[2], WD("s4a", "key") + 0.1);
      const nd = pill("nd", { x: 60, y: 900, cls: "li", fs: 38, html: "no shared session store" });
      appear(nd, WD("s4a", "stateless") + 0.3);

      // ---- downsides: four cards
      wipe(L("s5a", -0.15));
      tl.set([ut, ...svs, ...sl, nd], { opacity: 0 }, L("s5a", -0.15));
      const card = (id, x, y, title, cls) => box(id, { x, y, w: 470, h: 330, cls, fs: 34, html: '<div style="position:absolute;left:18px;top:12px;font-size:32px;text-align:left">' + title + "</div>" });
      const c1 = card("c1", 60, 490, "1 · no take-backs", "c6");
      const c2 = card("c2", 550, 490, "2 · stale claims", "c6");
      const c3 = card("c3", 60, 845, "3 · bigger than a session id", "c6");
      const c4 = card("c4", 550, 845, "4 · local storage + XSS", "c6");
      // card 1: a token lifetime bar, logout in the middle, still valid
      appear(c1, WD("s5b", "First"));
      const l1 = box("l1", { x: 90, y: 600, w: 410, h: 50, cls: "c5", fs: 26, html: "token valid" });
      const lo = tok("lo", { x: 190, y: 665, cls: "f", fs: 30, html: "logout" });
      const lx = line("lx", { x1: 240, y1: 600, x2: 240, y2: 660, c: "R", w: 6, arrow: false });
      const ex = lab("ex", { x: 400, y: 740, fs: 28, html: "exp" });
      const ex2 = lab("ex2", { x: 90, y: 760, fs: 30, html: "still accepted until <b>exp</b>" });
      appear(l1, WD("s5b", "token") - 0.1); appear(lo, WD("s5b", "After")); drawLine(lx, WD("s5b", "After") + 0.1, 0.3); appear(ex2, WD("s5b", "works"));
      tl.set(l1, { scaleX: 0.01, transformOrigin: "0% 50%" }, 0); tl.to(l1, { scaleX: 1, duration: 2.6, ease: "none" }, WD("s5b", "First"));
      // card 2: stale role
      appear(c2, WD("s5c", "Second"));
      const db = cell("db", { x: 575, y: 560, w: 420, h: 100, label: "database now", html: 'role = "editor"', fs: 34, border: "#86efac" });
      const tk2 = cell("tk2", { x: 575, y: 685, w: 420, h: 100, label: "old token says", html: 'role = "user" ✗', fs: 34, border: "#fb7185" });
      appear(db, WD("s5c", "role")); appear(tk2, WD("s5c", "old") - 0.2);
      const st = tok("st", { x: 0, y: 0, cls: "f", fs: 10, html: "" }); tl.set(st, { opacity: 0 }, 0);
      // card 3: sizes (characters): 32, 235, 659 (verified)
      appear(c3, WD("s5d", "Third"));
      const sizes = [["session id", 32, "c"], ["JWT", 235, "e"], ["JWT + more claims", 659, "f"]];
      sizes.forEach(([n, v, cls], i) => {
        const w = Math.max(18, Math.round(v / 659 * 200));
        const lb = lab("sl" + i + "l", { x: 85, y: 925 + i * 62, fs: 24, html: n + " · " + v });
        const b = tok("sb" + i, { x: 300, y: 915 + i * 62, w: w, cls, fs: 24, html: "" });
        const nn = lab("sn" + i, { x: 300, y: 0, fs: 10, html: "" }); tl.set(nn, { opacity: 0 }, 0);
        appear(lb, WD("s5d", ["session", "bigger", "travels"][i] ) - 0.1); appear(b, WD("s5d", ["session", "bigger", "travels"][i]) ); 
        tl.set(b, { scaleX: 0.05, transformOrigin: "0% 50%" }, 0); tl.to(b, { scaleX: 1, duration: 0.7 }, WD("s5d", ["session", "bigger", "travels"][i]));
      });
      // card 4: XSS steals from localStorage
      appear(c4, WD("s5e", "Fourth"));
      const ls = cell("ls", { x: 575, y: 960, w: 270, h: 100, label: "localStorage", html: "JWT", fs: 34, border: "#fbbf24" });
      const xs = tok("xs", { x: 880, y: 985, w: 110, cls: "f", fs: 24, html: "XSS" });
      const xl = line("xl", { x1: 875, y1: 1020, x2: 855, y2: 1020, c: "R", w: 6 });
      const sto = pill("sto", { x: 575, y: 1085, cls: "co", fs: 30, html: "script reads it → stolen" });
      appear(ls, WD("s5e", "storage") - 0.2); appear(xs, WD("s5e", "cross")); drawLine(xl, WD("s5e", "scripting")); appear(sto, WD("s5e", "steal") - 0.3); shakeEl(ls, WD("s5e", "steal"));

      // ---- what not to do
      wipe(L("s6a", -0.15));
      tl.set([c1, c2, c3, c4, l1, lo, lx, ex2, db, tk2, st, ls, xs, xl, sto, ...[0, 1, 2].flatMap((i) => ["#sl" + i + "l", "#sb" + i, "#sn" + i])], { opacity: 0 }, L("s6a", -0.15));
      const nt = box("nt", { x: 160, y: 620, w: 760, h: 200, cls: "c6", fs: 80, html: CROSS + " what NOT to do" });
      appear(nt, L("s6a", 0.1));
      // alg none
      gone(nt, L("s6b", -0.1));
      const an = codeBlock("an", { y: 490, fs: 38, name: "attacker's token header", lines: ['{ "alg": "none" }  // no signature at all'] });
      appear(an.sel, L("s6b", -0.1), { y: 20 }); lineHl(an, [1], WD("s6c", "none"), 1.6, "rgba(251,113,133,.35)");
      const nv = box("nv", { x: 60, y: 690, w: 460, h: 300, cls: "c6", fs: 34, html: '<b>careless library</b><br>trusts the header<div style="font-size:60px;margin:10px 0">' + TICK + '</div>accepted: <code>role: "admin"</code>' });
      const pv = box("pv", { x: 560, y: 690, w: 460, h: 300, cls: "c5", fs: 34, html: '<b>pinned algorithm</b><br>only HS256 allowed<div style="font-size:60px;margin:10px 0">' + CROSS + '</div>rejected: <code>alg none not allowed</code>' });
      appear(nv, WD("s6c", "careless"));
      // pinned algorithm, then key confusion
      const Tp = WD("s6d", "Pin") - 0.3;
      gone(nv, Tp); appear(pv, Tp);
      const Tk = WD("s6d", "where") - 0.2;
      gone(an.sel, Tk); gone(pv, Tk);
      const pk = tok("pk", { x: 70, y: 500, w: 330, cls: "c", fs: 34, html: "public key<small>published on purpose</small>" });
      const kc = tok("kc", { x: 480, y: 500, w: 540, cls: "f", fs: 32, html: "used as the HMAC secret<small>token header changed from RS256 to HS256</small>" });
      const kl = line("kl", { x1: 405, y1: 545, x2: 470, y2: 545, c: "R", w: 7 });
      const kok = box("kok", { x: 60, y: 680, w: 960, h: 110, cls: "c6", fs: 36, html: 'confused verifier accepts a forged <code>admin</code> token' });
      const kpin = box("kpin", { x: 60, y: 830, w: 960, h: 130, cls: "c5", fs: 36, html: TICK + ' verifier pinned to RS256: <code>rejected</code><small>alg HS256 is not allowed</small>' });
      appear(pk, WD("s6d", "public") - 0.2); appear(kc, WD("s6d", "misused") - 0.5); drawLine(kl, WD("s6d", "misused") - 0.4); appear(kok, WD("s6d", "misused") + 0.2); appear(kpin, WD("s6d", "secret") + 0.1);

      // weak secret
      const T6d = L("s6e", -0.1);
      gone(pk, T6d); gone(kc, T6d); gone(kl, T6d); gone(kok, T6d); gone(kpin, T6d);
      const guesses = ["password", "123456", "admin", "letmein", "secret"];
      const gs = guesses.map((g, i) => tok("g" + i, { x: 60 + (i % 3) * 330, y: 520 + Math.floor(i / 3) * 90, w: 300, cls: i === 4 ? "e" : "g", fs: 34, html: g + (i === 4 ? " " + TICK : " " + CROSS) }));
      gs.forEach((g, i) => appear(g, WD("s6e", "Short") + i * 0.4, { y: 10 }));
      const wk = box("wk", { x: 60, y: 730, w: 960, h: 130, cls: "c6", fs: 40, html: 'cracked offline in <b>5 guesses</b><small>no server involved: the attacker only needs one token</small>' });
      appear(wk, WD("s6e", "cracked") + 0.3);
      const gd = box("gd", { x: 60, y: 900, w: 960, h: 130, cls: "c5", fs: 40, html: TICK + ' at least <b>32 random bytes</b>' });
      appear(gd, WD("s6e", "thirty"));
      // skipped checks + secrets in payload
      const T6e = L("s6f", -0.1);
      gs.forEach((g) => gone(g, T6e)); gone(wk, T6e); gone(gd, T6e);
      const chk = [["exp", "expired token → rejected", "c1"], ["iss", "wrong issuer → rejected", "c2"], ["aud", "token for billing-api → rejected by shop-api", "c3"]];
      const cks = chk.map(([n, t, c], i) => box("ck" + i, { x: 60, y: 500 + i * 130, w: 960, h: 110, cls: c, fs: 36, html: '<code>' + n + '</code> &nbsp;' + t }));
      cks.forEach((b, i) => appear(b, WD("s6f", ["expiry,", "issuer,", "audience."][i].replace(/[,.]/g, "")) - 0.2));
      const sc = codeBlock("sc", { y: 920, fs: 36, name: "payload is readable by anyone", lines: ['"password": "hunter2"   // never'] });
      appear(sc.sel, WD("s6f", "secrets") - 0.5, { y: 20 }); lineHl(sc, [1], WD("s6f", "secrets"), 2.0, "rgba(251,113,133,.35)");

      // ---- what to do
      wipe(L("s7a", -0.15));
      tl.set([...cks, sc.sel], { opacity: 0 }, L("s7a", -0.15));
      const d1 = box("d1", { x: 60, y: 500, w: 960, h: 150, cls: "c5", fs: 44, html: TICK + ' short-lived access token<small>5 to 15 minutes</small>' });
      appear(d1, WD("s7a", "short"));
      const d2 = box("d2", { x: 60, y: 690, w: 960, h: 190, cls: "c5", fs: 40, html: TICK + ' refresh token in an <code>HttpOnly</code> · <code>Secure</code> · <code>SameSite</code> cookie<small>rotated on every use: the old one stops working</small>' });
      appear(d2, WD("s7b", "refresh"));
      const r1 = tok("r1", { x: 100, y: 910, w: 260, cls: "c", fs: 32, html: "refresh #1" });
      const r2 = tok("r2", { x: 480, y: 910, w: 260, cls: "e", fs: 32, html: "refresh #2" });
      const rl = line("rl", { x1: 365, y1: 945, x2: 470, y2: 945, c: "L", w: 7 });
      appear(r1, WD("s7b", "rotate") - 0.4); drawLine(rl, WD("s7b", "rotate")); appear(r2, WD("s7b", "rotate") + 0.3);
      tl.set(r1, { backgroundColor: "#6b7299" }, WD("s7b", "every") + 0.2);
      const d3 = box("d3", { x: 60, y: 1030, w: 960, h: 140, cls: "c1", fs: 42, html: TICK + ' or just use a server-side session<small>simpler, and revocable</small>' });
      appear(d3, WD("s7c", "plain") - 0.3);

      // ---- wrap
      wipe(L("s8a", -0.15));
      tl.set([d1, d2, d3, r1, r2, rl], { opacity: 0 }, L("s8a", -0.15));
      const w1 = box("w1", { x: 60, y: 520, w: 960, h: 150, cls: "c1", fs: 54, html: 'signed, <b>not secret</b>' });
      const w2 = box("w2", { x: 60, y: 710, w: 960, h: 150, cls: "c3", fs: 54, html: 'short lived' });
      const w3 = box("w3", { x: 60, y: 900, w: 960, h: 150, cls: "c5", fs: 54, html: 'verified strictly' });
      appear(w1, WD("s8b", "Signed")); appear(w2, WD("s8b", "Short")); appear(w3, WD("s8b", "Verified"));
      cheer("#sam", L("s8b", 2.4));
