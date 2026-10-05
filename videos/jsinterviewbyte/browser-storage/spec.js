      // Browser storage. One visual idea per sentence. Every behaviour shown comes from
      // verify_storage.mjs (Chromium, http://localhost) -> verified.txt.

      // ---- helpers
      const chapEl = document.createElement("div");
      chapEl.style.cssText = "position:absolute;left:50px;top:385px;width:440px;z-index:12;font:800 32px Inter,Arial,sans-serif;color:#1f2140;background:#22d3ee;border-radius:18px;padding:12px 22px;line-height:1.2;box-shadow:0 6px 0 rgba(0,0,0,.3)";
      document.getElementById("root").appendChild(chapEl);
      tl.set(chapEl, { opacity: 0 }, 0);
      function chapter(text, t) { tl.set(chapEl, { innerHTML: text, opacity: 1 }, t); tl.fromTo(chapEl, { x: -30 }, { x: 0, duration: 0.5, ease: E, immediateRender: false }, t); }
      function moveTo(sel, t, from, to, dur = 1.0, ease = "power2.inOut") { tl.fromTo(sel, { x: from[0], y: from[1] }, { x: to[0], y: to[1], duration: dur, ease, immediateRender: false }, t); }
      const stampIn = (sel, t) => { tl.fromTo(sel, { scale: 2.2, rotation: -10 }, { scale: 1, rotation: -4, duration: 0.45, ease: "back.out(2)", immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t); };
      const allowOverlap = (...sels) => sels.forEach((s) => document.querySelector(s).setAttribute("data-layout-allow-overlap", ""));
      const sceneStart = (id) => wipe(S(id));
      const esc2 = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      // a browser window: title bar with dots + url, body area
      function win(id, o) {
        mk('<div id="' + id + '" style="left:' + o.x + "px;top:" + o.y + "px;width:" + o.w + "px;height:" + o.h + "px;border-radius:18px;border:4px solid " + (o.border || "#22d3ee") + ";background:" + (o.bg || "#f4f6ff") + ';overflow:hidden;box-shadow:0 8px 0 rgba(0,0,0,.3)">' +
          '<div style="height:44px;background:#e3e8ff;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:3px solid #c9d0f5"><i style="width:12px;height:12px;border-radius:50%;background:#ff6b81;display:block"></i><i style="width:12px;height:12px;border-radius:50%;background:#ffc93c;display:block"></i><i style="width:12px;height:12px;border-radius:50%;background:#3ddc97;display:block"></i>' +
          '<span id="' + id + '-url" style="margin-left:10px;flex:1;height:26px;border-radius:13px;background:#fff;color:#5b5f86;font:700 17px/26px Inter,Arial,sans-serif;padding:0 12px;white-space:nowrap">' + (o.url || "shop.example") + "</span></div>" +
          '<div id="' + id + '-body" style="position:absolute;left:0;right:0;top:48px;bottom:0;color:#1f2140;font:800 ' + (o.fs || 30) + 'px Inter,Arial,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center">' + (o.html || "") + "</div></div>", id);
        return "#" + id;
      }
      // DevTools-style key/value table
      function kv(id, o) {
        const rows = o.rows.map((r, i) => '<div id="' + id + "-r" + i + '" style="display:flex;border-top:2px solid #2b3570;opacity:' + (r[2] === false ? 0 : 1) + '"><span style="width:45%;padding:8px 14px;color:#c4a7ff">' + r[0] + '</span><span id="' + id + "-v" + i + '" style="flex:1;padding:8px 14px;color:#86efac">' + r[1] + "</span></div>").join("");
        mk('<div id="' + id + '" style="left:' + o.x + "px;top:" + o.y + "px;width:" + o.w + 'px;background:#0a0f2a;border:4px solid ' + (o.border || "#3a4696") + ';border-radius:18px;overflow:hidden;font:700 ' + (o.fs || 28) + 'px var(--mono);box-shadow:0 8px 0 rgba(0,0,0,.3)"><div style="background:#1f2a6b;color:#b4bdf2;font:800 22px Inter,Arial,sans-serif;padding:8px 14px;letter-spacing:.06em;text-transform:uppercase">' + o.title + '</div><div style="display:flex;color:#93a0d6;font:800 20px Inter,Arial,sans-serif;padding:4px 14px"><span style="width:45%">key</span><span>value</span></div>' + rows + "</div>", id);
        return "#" + id;
      }
      const showRow = (id, i, t) => { tl.set("#" + id + "-r" + i, { opacity: 1 }, t); tl.fromTo("#" + id + "-r" + i, { x: -20 }, { x: 0, duration: 0.4, ease: E, immediateRender: false }, t); };
      const setVal = (id, i, html, t) => { tl.set("#" + id + "-v" + i, { innerHTML: html }, t); pulse("#" + id + "-v" + i, t, 1.2); };
      function bubble(id, o) { const s = tok(id, { x: o.x, y: o.y, w: o.w, cls: o.cls || "d", fs: o.fs || 28, html: o.html }); return s; }

      document.querySelector("#qcard h1").style.fontSize = "38px";
      appear("#qcard", 0.25, { y: 20 });
      wave("#sam", L("s1a", 0.2), 2);

      // ================= 1. hook: dark mode forgotten =================
      chapter("Browser storage", L("s1a", 0));
      const w1 = win("w1", { x: 160, y: 500, w: 760, h: 460, html: '<div id="w1-t" style="font-size:52px">Nova Shop</div><div id="w1-tg" style="font-size:30px;background:#e5e7ff;border-radius:999px;padding:8px 22px">☀ light mode</div>' });
      appear(w1, L("s1a", 0.1));
      const tDark = WD("s1a", "dark") - 0.2;
      tl.set("#w1-body", { backgroundColor: "#111633", color: "#f4f6ff" }, tDark); tl.set("#w1-tg", { innerHTML: "☾ dark mode", backgroundColor: "#2b3570" }, tDark); pulse("#w1-tg", tDark, 1.15);
      const rf = tok("rf", { x: 940, y: 520, w: 70, cls: "c", fs: 44, html: "↻" });
      appear(rf, WD("s1a", "refreshed") - 0.1); tl.fromTo(rf, { rotation: 0 }, { rotation: 360, duration: 0.8, ease: "power2.inOut", immediateRender: false }, WD("s1a", "refreshed"));
      const tLight = WD("s1a", "refreshed") + 0.8;
      tl.set("#w1-body", { backgroundColor: "#f4f6ff", color: "#1f2140" }, tLight); tl.set("#w1-tg", { innerHTML: "☀ light mode", backgroundColor: "#e5e7ff" }, tLight);
      const forgot = pill("forgot", { x: 300, y: 1000, cls: "co", fs: 40, html: "the page forgot" });
      appear(forgot, WD("s1b", "forgot"));
      const save = pill("save", { x: 300, y: 1080, cls: "li", fs: 40, html: "save it in the browser" });
      appear(save, WD("s1b", "saves"));

      // ================= 2. localStorage =================
      sceneStart("s2");
      chapter("localStorage", S("s2") + 0.2);
      const c2 = codeBlock("c2", { y: 490, fs: 34, name: "JavaScript", lines: ['localStorage.setItem("theme", "dark");'] });
      appear(c2.sel, L("s2a", 0.2), { y: 20 });
      const t2 = kv("t2", { x: 560, y: 640, w: 460, title: "localStorage · shop.example", rows: [["theme", '"dark"', false]] });
      appear(t2, WD("s2a", "localStorage"));
      showRow("t2", 0, WD("s2a", "key") + 0.2);
      const w2 = win("w2", { x: 60, y: 640, w: 440, h: 300, bg: "#111633", html: '<div style="color:#f4f6ff">☾ dark</div>' });
      appear(w2, WD("s2a", "saves"));
      // close, a week passes, reopen
      const tClose = WD("s2b", "Close");
      tl.to(w2, { scale: 0.2, opacity: 0, duration: 0.5, ease: "power2.in" }, tClose);
      const wk = pill("wk", { x: 140, y: 760, cls: "", fs: 36, html: "one week later…" });
      appear(wk, WD("s2b", "week") - 0.3); gone(wk, WD("s2b", "getItem") - 0.1);
      tl.fromTo(w2, { scale: 0.2 }, { scale: 1, duration: 0.5, ease: POP, immediateRender: false }, WD("s2b", "getItem") - 0.1); tl.set(w2, { opacity: 1 }, WD("s2b", "getItem") - 0.1);
      const g2 = codeBlock("g2", { y: 970, fs: 34, lines: [['localStorage.getItem("theme")', '"dark"']] });
      appear(g2.sel, WD("s2b", "getItem")); resIn(g2, 1, WD("s2b", "dark"));
      // two tabs share it; the other tab gets a storage event (verified: fires in other tab only)
      const T2c = L("s2c", -0.1);
      [c2.sel, g2.sel, w2, t2].forEach((e) => gone(e, T2c));
      const tA = win("tA", { x: 60, y: 500, w: 440, h: 260, url: "Tab A · shop.example", html: "Tab A" });
      const tB = win("tB", { x: 580, y: 500, w: 440, h: 260, url: "Tab B · shop.example", html: "Tab B" });
      const sh = kv("sh", { x: 270, y: 860, w: 540, title: "one shared localStorage", rows: [["theme", '"dark"']] });
      appear(tA, L("s2c", 0.1)); appear(tB, L("s2c", 0.3)); appear(sh, WD("s2c", "shares"));
      const la = line("la", { x1: 280, y1: 765, x2: 400, y2: 852, c: "C", w: 6 });
      const lb = line("lb", { x1: 800, y1: 765, x2: 680, y2: 852, c: "C", w: 6 });
      drawLine(la, WD("s2c", "shares") + 0.2); drawLine(lb, WD("s2c", "shares") + 0.4);
      const ta1 = tok("ta1", { x: 100, y: 690, w: 360, cls: "c", fs: 24, html: 'setItem("theme", "light")' });
      appear(ta1, WD("s2c", "Change")); setVal("sh", 0, '"light"', WD("s2c", "Change") + 0.6);
      const evB = bubble("evB", { x: 620, y: 690, w: 360, cls: "e", fs: 26, html: "🔔 storage event" });
      appear(evB, WD("s2c", "event") - 0.2, { s: 0.5 }); pulse(evB, WD("s2c", "event"), 1.15);
      const noA = pill("noA", { x: 120, y: 1120, cls: "", fs: 28, html: "not fired in the tab that wrote it" });
      appear(noA, WD("s2c", "other") + 0.2);
      // strings only (verified: 42 -> "42", {name} -> "[object Object]")
      const T2d = L("s2d", -0.1);
      [tA, tB, sh, la, lb, ta1, evB, noA].forEach((e) => gone(e, T2d));
      const S2 = codeBlock("S2", { y: 500, fs: 32, name: "strings only", lines: [
        'localStorage.setItem("count", 42);', ['localStorage.getItem("count")', '"42"'], ['typeof localStorage.getItem("count")', '"string"'],
        'localStorage.setItem("user", { name: "Ada" });', ['localStorage.getItem("user")', '"[object Object]"'] ] });
      lineHide(S2, [1, 2, 3, 4, 5]); appear(S2.sel, L("s2d", 0.1), { y: 20 });
      lineIn(S2, [1], WD("s2d", "number")); lineIn(S2, [2], WD("s2d", "back")); resIn(S2, 2, WD("s2d", "string")); lineIn(S2, [3], WD("s2d", "string") + 0.3); resIn(S2, 3, WD("s2d", "string") + 0.8);
      lineIn(S2, [4], WD("s2e", "object")); lineIn(S2, [5], WD("s2e", "Object") - 0.4); resIn(S2, 5, WD("s2e", "Object"));
      lineHl(S2, [5], WD("s2e", "Object"), 1.6, "rgba(251,113,133,.35)");
      const J2 = codeBlock("J2", { y: 860, fs: 30, name: "the fix", lines: ['localStorage.setItem("cart", JSON.stringify({ items: 3 }));', ['JSON.parse(localStorage.getItem("cart")).items', "3"]] });
      lineHide(J2, [1, 2]); appear(J2.sel, WD("s2e", "JSON.stringify") - 0.2, { y: 20 });
      lineIn(J2, [1], WD("s2e", "JSON.stringify")); lineIn(J2, [2], WD("s2e", "JSON.parse")); resIn(J2, 2, WD("s2e", "JSON.parse") + 0.5);
      // quota (verified: QuotaExceededError at 5,177,571 characters)
      const T2f = L("s2f", -0.1);
      [S2.sel, J2.sel].forEach((e) => gone(e, T2f));
      const meterBg = box("mbg", { x: 60, y: 600, w: 960, h: 90, cls: "c1", fs: 30, html: "" });
      const meter = tok("meter", { x: 64, y: 604, w: 952, h: 82, cls: "b", fs: 30, html: "" });
      const ml = lab("ml", { x: 60, y: 520, fs: 36, html: "localStorage limit: <b>about 5 MB</b> per site" });
      appear(meterBg, L("s2f", 0.1)); appear(ml, L("s2f", 0.1));
      tl.set(meter, { opacity: 1, scaleX: 0.01, transformOrigin: "0% 50%" }, L("s2f", 0.2));
      tl.to(meter, { scaleX: 1, duration: WD("s2f", "error") - L("s2f", 0.2), ease: "power1.in" }, L("s2f", 0.2));
      const qe = tok("qe", { x: 240, y: 760, w: 600, cls: "f", fs: 46, html: "QuotaExceededError" });
      tl.set(qe, { opacity: 0 }, 0); stampIn(qe, WD("s2f", "error"));
      const qn = lab("qn", { x: 160, y: 880, fs: 32, html: "Chrome stopped at <b>5,177,571</b> characters" });
      appear(qn, WD("s2f", "characters") - 0.6);
      // synchronous: the page waits
      const T2g = L("s2g", -0.1);
      [meterBg, meter, ml, qe, qn].forEach((e) => gone(e, T2g));
      const lane = box("lane", { x: 60, y: 620, w: 960, h: 110, cls: "c2", fs: 26, html: "" });
      const lanel = lab("lanel", { x: 60, y: 560, fs: 30, html: "main thread" });
      const blocks = [["click", 60, 150, "c"], ["render", 230, 150, "e"], ["setItem(…big…)", 400, 380, "f"], ["render", 800, 150, "e"]];
      appear(lane, L("s2g", 0.1)); appear(lanel, L("s2g", 0.1));
      blocks.forEach(([n, x, w, c], i) => { const b = tok("bk" + i, { x: x + 10, y: 640, w, h: 70, cls: c, fs: 24, html: n }); appear(b, WD("s2g", "synchronous") + i * 0.5); });
      const frz = pill("frz", { x: 410, y: 760, cls: "co", fs: 32, html: "page frozen until it finishes" });
      appear(frz, WD("s2g", "blocks")); shakeEl("#bk2", WD("s2g", "blocks"));
      const small2 = pill("small2", { x: 410, y: 840, cls: "li", fs: 32, html: TICK + " keep it small" });
      appear(small2, WD("s2g", "small"));

      // ================= 3. sessionStorage =================
      sceneStart("s3");
      chapter("sessionStorage", S("s3") + 0.2);
      const form = win("form", { x: 260, y: 500, w: 560, h: 340, url: "shop.example/checkout", fs: 26, html: '<div>Checkout</div><div style="background:#fff;border:3px solid #c9d0f5;border-radius:10px;width:80%;padding:6px 12px;text-align:left">Name: Sam Rivera</div><div style="background:#fff;border:3px solid #c9d0f5;border-radius:10px;width:80%;padding:6px 12px;text-align:left;color:#5b5f86">Address: …</div>' });
      appear(form, L("s3a", 0.3));
      const T3b = L("s3b", -0.1);
      gone(form, T3b);
      const sA = win("sA", { x: 60, y: 500, w: 440, h: 230, url: "Tab A · checkout", fs: 26, html: "Tab A" });
      const sB = win("sB", { x: 580, y: 500, w: 440, h: 230, url: "Tab B · checkout", fs: 26, html: "Tab B" });
      const kA = kv("kA", { x: 60, y: 760, w: 440, title: "Tab A's sessionStorage", rows: [["draft", '"Sam Rivera"']] });
      const kB = kv("kB", { x: 580, y: 760, w: 440, title: "Tab B's sessionStorage", rows: [["draft", "null"]] });
      appear(sA, L("s3b", 0.1)); appear(kA, WD("s3b", "Same")); appear(sB, WD("s3b", "every")); appear(kB, WD("s3b", "own"));
      const rA = tok("rA", { x: 420, y: 515, w: 70, cls: "c", fs: 36, html: "↻" });
      appear(rA, WD("s3c", "Reload")); tl.fromTo(rA, { rotation: 0 }, { rotation: 360, duration: 0.8, immediateRender: false }, WD("s3c", "Reload") + 0.1);
      const still = pill("still", { x: 60, y: 940, cls: "li", fs: 28, html: TICK + " still there after reload" });
      appear(still, WD("s3c", "still"));
      const empt = pill("empt", { x: 580, y: 940, cls: "co", fs: 28, html: "new tab starts empty" });
      appear(empt, WD("s3c", "empty")); pulse("#kB-v0", WD("s3c", "empty"), 1.3);
      const xA = tok("xA", { x: 455, y: 450, w: 70, cls: "f", fs: 40, html: "✕" });
      appear(xA, WD("s3c", "Close") - 0.1);
      tl.to([sA, kA, still], { scale: 0.2, opacity: 0, duration: 0.5, ease: "power2.in" }, WD("s3c", "Close") + 0.3);
      gone(xA, WD("s3c", "Close") + 0.5);
      const gone3 = pill("gone3", { x: 120, y: 700, cls: "co", fs: 34, html: "tab closed → data gone" });
      appear(gone3, WD("s3c", "gone"));

      // ================= 4. cookies =================
      sceneStart("s4");
      chapter("Cookies", S("s4") + 0.2);
      const bw = box("bw4", { x: 60, y: 490, w: 260, h: 90, cls: "c1", fs: 36, html: "Browser" });
      const sv = box("sv4", { x: 760, y: 490, w: 260, h: 90, cls: "c2", fs: 36, html: "Server" });
      const vb = line("vb4", { x1: 190, y1: 585, x2: 190, y2: 1220, c: "W", w: 4, dash: true, arrow: false });
      const vs = line("vs4", { x1: 890, y1: 585, x2: 890, y2: 1220, c: "W", w: 4, dash: true, arrow: false });
      appear(bw, L("s4a", 0.2)); appear(sv, L("s4a", 0.3)); drawLine(vb, L("s4a", 0.4), 0.5); drawLine(vs, L("s4a", 0.4), 0.5);
      const jar = kv("jar", { x: 60, y: 980, w: 380, title: "cookie jar", fs: 24, rows: [["theme", "dark"], ["sid", "abc123", false]] });
      appear(jar, WD("s4b", "small"));
      // every request carries the cookie
      const req = (id, y, label, t) => { const l = line(id + "l", { x1: 195, y1: y + 30, x2: 885, y2: y + 30, c: "C", w: 5 }); drawLine(l, t, 1.0); const p = tok(id, { x: 210, y, w: 470, cls: "c", fs: 22, html: label }); appear(p, t, { s: 0.7 }); moveTo(p, t + 0.3, [0, 0], [200, 0], 1.0); return [l, p]; };
      const r1 = req("rq1", 620, "GET /  · Cookie: theme=dark", WD("s4b", "every") - 0.3);
      const r2 = req("rq2", 690, "GET /cart · Cookie: theme=dark", WD("s4b", "request") - 0.1);
      const rd = tok("rd", { x: 560, y: 770, w: 320, cls: "e", fs: 24, html: "server reads it ✓" });
      appear(rd, WD("s4c", "read")); pulse(sv, WD("s4c", "read"), 1.1);
      const lg = tok("lg", { x: 560, y: 820, w: 320, cls: "a", fs: 24, html: "logged in as Sam" });
      appear(lg, WD("s4c", "logged"));
      // Set-Cookie back, then the next request carries both (verified header: "theme=dark; sid=abc123")
      const T4d = L("s4d", -0.1);
      [r1[0], r1[1], r2[0], r2[1], rd, lg].forEach((e) => gone(e, T4d));
      const sc = line("scl", { x1: 885, y1: 660, x2: 195, y2: 660, c: "L", w: 5 });
      const scp = tok("scp", { x: 520, y: 620, w: 360, cls: "e", fs: 20, html: "Set-Cookie: sid=abc123; HttpOnly" });
      drawLine(sc, WD("s4d", "Set-Cookie") - 0.2, 1.0); appear(scp, WD("s4d", "Set-Cookie") - 0.2, { s: 0.7 }); moveTo(scp, WD("s4d", "Set-Cookie") + 0.1, [0, 0], [-310, 0], 1.0);
      showRow("jar", 1, WD("s4d", "Set-Cookie") + 1.1);
      const r3 = req("rq3", 740, "Cookie: theme=dark; sid=abc123", WD("s4d", "next"));
      const auto = pill("auto", { x: 470, y: 820, cls: "li", fs: 26, html: "sent back automatically" });
      appear(auto, WD("s4d", "automatically") - 0.3);
      // HttpOnly hides it from JS (verified: document.cookie === "theme=dark")
      const T4e = L("s4e", -0.1);
      [sc, scp, r3[0], r3[1], auto].forEach((e) => gone(e, T4e));
      const dc = codeBlock("dc", { x: 470, w: 550, y: 640, fs: 28, name: "page script", lines: [["document.cookie", '"theme=dark"']] });
      appear(dc.sel, WD("s4e", "scripts")); resIn(dc, 1, WD("s4e", "document.cookie") + 0.4);
      const hid = pill("hid", { x: 470, y: 780, cls: "vi", fs: 28, html: LOCK + " sid is HttpOnly: hidden from JS" });
      appear(hid, WD("s4e", "session")); tl.set("#jar-r1", { backgroundColor: "#2b2050" }, WD("s4e", "HttpOnly"));
      // Secure + SameSite
      const at1 = pill("at1", { x: 470, y: 860, cls: "cy", fs: 28, html: "Secure: HTTPS only" });
      const at2 = pill("at2", { x: 470, y: 930, cls: "", fs: 28, html: "SameSite: limits cross-site sending" });
      appear(at1, WD("s4f", "Secure")); appear(at2, WD("s4f", "SameSite"));
      // size (verified: 5,000 chars dropped, 4,000 kept)
      const T4g = L("s4g", -0.1);
      [dc.sel, hid, at1, at2].forEach((e) => gone(e, T4g));
      const lim = box("lim", { x: 470, y: 630, w: 550, h: 110, cls: "c4", fs: 34, html: "about 4 KB per cookie" });
      appear(lim, WD("s4g", "tiny"));
      const big = tok("big", { x: 470, y: 780, w: 550, cls: "f", fs: 26, html: "big=xxxx… (5,000 chars)" });
      appear(big, WD("s4g", "five") - 0.2); moveTo(big, WD("s4g", "dropped") - 0.3, [0, 0], [0, 260], 0.8, "power2.in"); tl.to(big, { opacity: 0, duration: 0.3 }, WD("s4g", "dropped") + 0.4);
      const drp = tok("drp", { x: 620, y: 860, w: 280, cls: "f", fs: 32, html: CROSS + " dropped" });
      tl.set(drp, { opacity: 0 }, 0); stampIn(drp, WD("s4g", "dropped"));

      // ================= 5. IndexedDB =================
      sceneStart("s5");
      chapter("IndexedDB", S("s5") + 0.2);
      const cat = win("cat", { x: 200, y: 500, w: 680, h: 360, url: "shop.example/catalog", fs: 26, html: '<div style="display:grid;grid-template-columns:repeat(3,150px);gap:14px">' + ["Shoes", "Bags", "Hats", "Socks", "Belts", "Caps"].map((n) => '<div style="background:#dfe4ff;border-radius:12px;padding:18px 0">' + n + "</div>").join("") + "</div>" });
      appear(cat, L("s5a", 0.2));
      const off = pill("off", { x: 700, y: 880, cls: "co", fs: 30, html: "offline ✕ wifi" });
      appear(off, WD("s5a", "offline"));
      const T5b = L("s5b", -0.1);
      [cat, off].forEach((e) => gone(e, T5b));
      const dbx = box("dbx", { x: 600, y: 500, w: 420, h: 300, cls: "c2", fs: 40, html: 'database "shop"<small>object store: orders</small>' });
      appear(dbx, WD("s5b", "database"));
      const ob = codeBlock("ob", { x: 60, w: 500, y: 500, fs: 26, name: "an order object", lines: ["{", "  id: 1,", "  total: 4999,", '  placed: new Date(),', '  items: ["shoes", "bag"],', '  receipt: new Blob([…])', "}"] });
      appear(ob.sel, L("s5c", 0.1), { y: 20 });
      const pkt = tok("pkt5", { x: 400, y: 830, w: 160, cls: "c", fs: 28, html: "put()" });
      appear(pkt, WD("s5c", "saved") - 0.2); allowOverlap("#pkt5"); moveTo(pkt, WD("s5c", "saved"), [0, 0], [300, -150], 0.8); gone(pkt, WD("s5c", "saved") + 0.9);
      const chk = [["placed is a Date", "date,"], ["items is an Array", "array,"], ["receipt is a Blob", "blob."]].map(([t, w], i) => { const s = pill("ck" + i, { x: 600, y: 830 + i * 70, cls: "li", fs: 28, html: TICK + " " + t }); appear(s, WD("s5c", w.replace(/[,.]/g, ""))); return s; });
      // transactions + indexes
      const T5d = L("s5d", -0.1);
      [ob.sel, ...chk].forEach((e) => gone(e, T5d));
      const tx = zone("tx", { x: 60, y: 500, w: 500, h: 300, label: "transaction", color: "#fbbf24", bg: "rgba(251,191,36,.08)" });
      const w5a = tok("w5a", { x: 100, y: 570, w: 420, cls: "c", fs: 26, html: "write: order #2" });
      const w5b = tok("w5b", { x: 100, y: 650, w: 420, cls: "c", fs: 26, html: "write: stock − 1" });
      const all = pill("all", { x: 100, y: 730, cls: "", fs: 26, html: "both, or neither" });
      appear(tx, L("s5d", 0.1)); appear(w5a, L("s5d", 0.4)); appear(w5b, L("s5d", 0.7)); appear(all, WD("s5d", "all") - 0.2);
      const idx = box("idx", { x: 600, y: 840, w: 420, h: 110, cls: "c5", fs: 30, html: 'index: "by date"<small>fast lookups</small>' });
      appear(idx, WD("s5d", "indexes"));
      // asynchronous (verified order: "put() returned" before "transaction complete")
      const T5e = L("s5e", -0.1);
      [tx, w5a, w5b, all, idx].forEach((e) => gone(e, T5e));
      const ord = consoleBox("ord", { x: 60, w: 500, y: 520, fs: 30, rows: [["1. put() returned", "cy"], ["   …page keeps running…", "dim"], ["2. transaction complete", "am"]] });
      appear(ord.sel, L("s5e", 0.1)); rowIn(ord, 0, WD("s5e", "returns")); rowIn(ord, 1, WD("s5e", "later") - 0.4); rowIn(ord, 2, WD("s5e", "later"));
      const spin = tok("spin5", { x: 230, y: 790, w: 160, cls: "e", fs: 30, html: "UI ✓" });
      appear(spin, WD("s5e", "freezes") - 0.4); tl.fromTo(spin, { rotation: -6 }, { rotation: 6, duration: 0.3, yoyo: true, repeat: 5, immediateRender: false }, WD("s5e", "freezes") - 0.4);
      // size comparison
      const T5f = L("s5f", -0.1);
      [ord.sel, spin, dbx].forEach((e) => gone(e, T5f));
      const sz1 = lab("sz1", { x: 60, y: 560, fs: 30, html: "localStorage" });
      const sb1 = tok("sb1", { x: 330, y: 550, w: 30, h: 56, cls: "b", fs: 20, html: "" });
      const sn1 = lab("sn1", { x: 380, y: 560, fs: 30, html: "≈ 5 MB" });
      const sz2 = lab("sz2", { x: 60, y: 660, fs: 30, html: "IndexedDB" });
      const sb2 = tok("sb2", { x: 330, y: 650, w: 240, h: 56, cls: "a", fs: 20, html: "" });
      const sn2 = lab("sn2", { x: 590, y: 660, fs: 30, html: "often GBs (share of free disk)" });
      appear(sz1, L("s5f", 0.1)); appear(sb1, L("s5f", 0.1)); appear(sn1, L("s5f", 0.3));
      appear(sz2, WD("s5f", "gigabytes") - 0.3); tl.set(sb2, { opacity: 1, scaleX: 0.05, transformOrigin: "0% 50%" }, WD("s5f", "gigabytes") - 0.3); tl.to(sb2, { scaleX: 1, duration: 1.0, ease: E }, WD("s5f", "gigabytes") - 0.3); appear(sn2, WD("s5f", "gigabytes"));

      // ================= 6. Cache API =================
      sceneStart("s6");
      chapter("Cache API", S("s6") + 0.2);
      const cb = kv("cb", { x: 440, y: 500, w: 580, title: 'cache "v1"', fs: 22, rows: [["GET /api/products", '200 · [{"id":1}]', false], ["GET /app.js", "200 · …", false]] });
      appear(cb, L("s6a", 0.1)); showRow("cb", 0, WD("s6a", "requests")); showRow("cb", 1, WD("s6a", "responses"));
      const pg6 = box("pg6", { x: 60, y: 760, w: 220, h: 100, cls: "c1", fs: 30, html: "page" });
      const sw6 = box("sw6", { x: 330, y: 760, w: 260, h: 100, cls: "c4", fs: 28, html: "service worker" });
      const nw6 = box("nw6", { x: 760, y: 760, w: 260, h: 100, cls: "c6", fs: 30, html: "network" });
      appear(pg6, L("s6b", 0.1)); appear(sw6, WD("s6b", "worker") - 0.2); appear(nw6, WD("s6b", "network") - 0.3);
      const nx = tok("nx6", { x: 850, y: 870, w: 90, cls: "f", fs: 40, html: "✕" });
      tl.set(nx, { opacity: 0 }, 0); stampIn(nx, WD("s6b", "down"));
      const l6a = line("l6a", { x1: 285, y1: 810, x2: 325, y2: 810, c: "C", w: 6 });
      const l6b = line("l6b", { x1: 520, y1: 755, x2: 700, y2: 690, c: "L", w: 6 });
      drawLine(l6a, WD("s6b", "answers"), 0.4); drawLine(l6b, WD("s6b", "cache") , 0.6);
      tl.set("#cb-r0", { backgroundColor: "#1f3b2e" }, WD("s6b", "cache"));
      const op6 = pill("op6", { x: 60, y: 920, cls: "li", fs: 32, html: TICK + " app still opens offline" });
      appear(op6, WD("s6b", "offline"));

      // ================= 7. rules =================
      sceneStart("s7");
      chapter("Rules for all", S("s7") + 0.2);
      const orig = mk('<div id="orig" style="left:60px;top:520px;width:960px;text-align:center;font:800 54px var(--mono);color:#f4f6ff"><span id="o1" style="color:#22d3ee">https://</span><span id="o2" style="color:#fbbf24">shop.example</span><span id="o3" style="color:#f472b6">:443</span></div>', "orig");
      appear("#orig", WD("s7a", "origin") - 0.3);
      const ol = [["scheme", "#o1", 230, "cy"], ["host", "#o2", 520, ""], ["port", "#o3", 840, "pk"]].map(([n, s, x, c]) => { const p = pill("ol" + n, { x, y: 610, cls: c, fs: 30, html: n }); appear(p, WD("s7a", n)); return p; });
      const oth = tok("oth", { x: 150, y: 700, w: 780, cls: "g", fs: 28, html: LOCK + " https://blog.example cannot read it" });
      appear(oth, LE("s7a", -0.4));
      const disk = box("disk", { x: 60, y: 790, w: 460, h: 140, cls: "c6", fs: 28, html: "disk almost full<small>best-effort data may be cleared</small>" });
      appear(disk, WD("s7b", "disk") - 0.2);
      const per = codeBlock("per", { x: 560, w: 460, y: 790, fs: 26, name: "ask to keep it", lines: ["await navigator.storage.persist()"] });
      appear(per.sel, WD("s7b", "navigator.storage.persist"));
      const T7c = L("s7c", -0.1);
      ["#orig", ...ol, oth, disk, per.sel].forEach((e) => gone(e, T7c));
      const xss = tok("xss", { x: 60, y: 560, w: 260, cls: "f", fs: 32, html: "&lt;script&gt; XSS" });
      appear(xss, L("s7c", 0.1));
      const stores = [["localStorage", "token=eyJ…"], ["sessionStorage", "token=eyJ…"], ["IndexedDB", "token=eyJ…"]].map(([n, v], i) => { const s = kv("st" + i, { x: 560, y: 500 + i * 160, w: 460, title: n, fs: 22, rows: [["token", v]] }); appear(s, WD("s7c", ["local", "session", "IndexedDB"][i]) - 0.2); return s; });
      const sl7 = [0, 1, 2].map((i) => line("sl7" + i, { x1: 325, y1: 600, x2: 550, y2: 560 + i * 160, c: "R", w: 6 }));
      sl7.forEach((l, i) => drawLine(l, WD("s7c", "IndexedDB") + 0.2 + i * 0.15, 0.4));
      const nev = box("nev", { x: 60, y: 760, w: 460, h: 140, cls: "c6", fs: 34, html: CROSS + " no tokens or secrets here" });
      appear(nev, WD("s7c", "never"));

      // ================= 8. which one =================
      sceneStart("s8");
      chapter("Which one?", S("s8") + 0.2);
      const pick = [["login session", "HttpOnly cookie", "c1", ["s8b", "login"]], ["theme, language", "localStorage", "c2", ["s8b", "theme"]], ["form draft, one tab", "sessionStorage", "c3", ["s8c", "form"]], ["big or offline data", "IndexedDB", "c4", ["s8c", "Big"]], ["offline pages", "Cache API", "c5", ["s8c", "Offline"]]];
      pick.forEach(([u, s, c, [ln, w]], i) => {
        const y = 500 + i * 140;
        const a = box("pu" + i, { x: 60, y, w: 440, h: 110, cls: c, fs: 32, html: u });
        const b = box("ps" + i, { x: 580, y, w: 440, h: 110, cls: c, fs: 34, html: "<code>" + s + "</code>" });
        const l = line("pl" + i, { x1: 505, y1: y + 55, x2: 575, y2: y + 55, c: "W", w: 6 });
        appear(a, WD(ln, w) - 0.1); drawLine(l, WD(ln, w) + 0.2, 0.3); appear(b, WD(ln, w) + 0.4);
      });
      cheer("#sam", L("s8d", 0.4));
