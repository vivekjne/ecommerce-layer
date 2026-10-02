
      // ---------------- captions (word-by-word, timed from the voice) ----------------
      const capEl = document.getElementById("captions");
      const NAMES = { byte: "Byte", sam: "Sam" };
      Object.keys(T.lines).forEach((id) => {
        const ln = T.lines[id];
        const div = document.createElement("div");
        div.className = "cline";
        div.id = "cap-" + id;
        div.innerHTML = '<span class="spk ' + ln.speaker + '">' + NAMES[ln.speaker] + "</span><span>" + ln.words.map((w, i) => '<span class="cw' + (w.code ? " cwk" : "") + '" id="cw-' + id + "-" + i + '">' + esc(w.w) + "</span>").join(" ") + "</span>";
        const nch = ln.words.map((w) => w.w).join(" ").length;
        div.style.fontSize = nch > 150 ? "30px" : nch > 120 ? "34px" : "40px";
        capEl.appendChild(div);
      });
      Object.keys(T.lines).forEach((id) => {
        const ln = T.lines[id];
        const t0 = ln.start, t1 = ln.start + ln.dur;
        tl.set("#cap-" + id, { opacity: 0 }, 0);
        tl.set("#cap-" + id, { opacity: 1 }, t0 - 0.05);
        tl.set("#cap-" + id, { opacity: 0 }, t1 + 0.25);
        ln.words.forEach((w, i) => {
          const a = t0 + w.t;
          const b = i + 1 < ln.words.length ? t0 + ln.words[i + 1].t : t1;
          const sel = "#cw-" + id + "-" + i;
          const rest = "rgba(255,201,60,0)";
          tl.set(sel, { color: "#1f2140", backgroundColor: w.code ? "#fbbf24" : "rgba(255,201,60,0.75)" }, a);
          if (w.code) tl.fromTo(sel, { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 60%", immediateRender: false }, a);
          tl.set(sel, w.code ? { backgroundColor: "#6a4df0", color: "#fff" } : { backgroundColor: rest }, Math.max(a + 0.09, b - 0.05));
        });
        talkAny(({ byte: "#byte", sam: "#sam" })[ln.speaker], t0 + 0.02, t1 - 0.02);
      });
      bob("#sam", 0.4, T.total - 1, 5, 2.0);
      bob("#byte", 0.6, T.total - 1, 5, 2.2);
      breathe("#sam", 0.4, T.total - 1);
      for (let t = 3; t < T.total - 2; t += 4.3) { blink("#sam", t); blink("#byte", t + 1.1); }

      // ---------------- stage builders (absolute page coordinates, y 470..1290 is the stage) ----------------
      const stage = document.getElementById("stage");
      const live = [];
      function mk(html, id) {
        const d = document.createElement("div");
        d.innerHTML = html.trim();
        const f = d.firstElementChild;
        stage.appendChild(f);
        tl.set(f, { opacity: 0 }, 0);
        if (id) live.push("#" + id);
        return f;
      }
      const pos = (o) => "left:" + o.x + "px;top:" + o.y + "px;" + (o.w ? "width:" + o.w + "px;" : "") + (o.h ? "height:" + o.h + "px;" : "");
      const nth = (code, n) => document.querySelectorAll("#" + code.id + " .cl")[n - 1];
      // code panel: one line per array item
      function codeBlock(id, o) {
        const fs = o.fs || 34;
        const h = Math.ceil(o.lines.length * fs * 1.4 + 52);
        mk('<div class="code" id="' + id + '" style="' + pos({ x: o.x ?? 60, y: o.y, w: o.w ?? 960 }) + "height:" + h + "px;font-size:" + fs + 'px">' + (o.name ? '<span class="tab">' + o.name + "</span>" : "") + o.lines.map((l) => { const c = Array.isArray(l) ? l[0] : l; const r = Array.isArray(l) ? l[1] : null; return '<span class="cl">' + (c ? highlight(c) : "&nbsp;") + (r !== null ? '<i class="rs ' + (r === "true" ? "ok" : r === "false" ? "no" : "cy") + '">' + esc(r) + "</i>" : "") + "</span>"; }).join("") + "</div>", id);
        document.querySelectorAll("#" + id + " .rs").forEach((el) => tl.set(el, { opacity: 0 }, 0));
        return { sel: "#" + id, id, n: o.lines.length, h, y: o.y, x: o.x ?? 60, fs };
      }
      // result badge at the end of code line n
      function resIn(code, n, t) {
        const el = nth(code, n).querySelector(".rs");
        tl.fromTo(el, { scale: 0.5 }, { scale: 1, duration: 0.4, ease: POP, transformOrigin: "100% 50%" }, t);
        tl.set(el, { opacity: 1 }, t);
      }
      // start time of the nth (0-based) word of a line that matches `word` (punctuation and case ignored)
      const norm = (s) => s.toLowerCase().replace(/[^a-z0-9=<>.]/g, "").replace(/\.+$/, "");
      function WD(id, word, k = 0) {
        const ws = T.lines[id].words; let seen = 0;
        for (let i = 0; i < ws.length; i++) if (norm(ws[i].w) === norm(word) && seen++ === k) return T.lines[id].start + ws[i].t;
        throw new Error("WD: no word '" + word + "' #" + k + " in line " + id);
      }
      // pointer arrow that walks down a code block line by line: create with ptr(), move with ptrTo()
      const lineTop = (code, n) => code.y + 28 + (n - 1) * code.fs * 1.4;
      function ptr(id, code, n0 = 1) {
        const sz = Math.round(code.fs * 0.8);
        mk('<div id="' + id + '" style="left:' + (code.x + 6) + "px;top:" + (lineTop(code, n0) + code.fs * 0.7 - sz / 2) + "px;width:" + sz + "px;height:" + sz + 'px;z-index:6"><svg viewBox="0 0 20 20" width="' + sz + '" height="' + sz + '"><path d="M3 2 L18 10 L3 18 Z" fill="#f472b6" stroke="#1f2140" stroke-width="2"/></svg></div>', id);
        return { sel: "#" + id, code, n: n0 };
      }
      function ptrTo(p, n, t, dur = 0.35) {
        tl.fromTo(p.sel, { y: (p.n - 1) * p.code.fs * 1.4 }, { y: (n - 1) * p.code.fs * 1.4, duration: dur, ease: "power2.inOut", immediateRender: false }, t);
        p.n = n;
      }
      // console: rows = [text, cls?]; rows start hidden, rowIn() reveals them
      function consoleBox(id, o) {
        const fs = o.fs || 34;
        const h = Math.ceil(o.rows.length * fs * 1.5 + 78);
        mk('<div class="cons" id="' + id + '" style="' + pos({ x: o.x ?? 60, y: o.y, w: o.w ?? 960 }) + "height:" + h + "px;font-size:" + fs + 'px"><div class="ct">' + (o.title || "Output") + "</div>" + o.rows.map((r) => '<span class="out ' + (r[1] || "") + '">' + (r[0] ? esc(r[0]) : "&nbsp;") + "</span>").join("") + "</div>", id);
        document.querySelectorAll("#" + id + " .out").forEach((el) => tl.set(el, { opacity: 0 }, 0));
        return { sel: "#" + id, id, n: o.rows.length, h, y: o.y };
      }
      function rowIn(box, i, t) {
        const el = document.querySelectorAll("#" + box.id + " .out")[i];
        tl.fromTo(el, { x: -30 }, { x: 0, duration: 0.4, ease: E }, t);
        tl.set(el, { opacity: 1 }, t);
      }
      function box(id, o) { mk('<div class="bx ' + (o.cls || "c1") + '" id="' + id + '" style="' + pos(o) + (o.fs ? "font-size:" + o.fs + "px;" : "") + '"><div>' + o.html + "</div></div>", id); return "#" + id; }
      function note(id, o) { mk('<div class="note" id="' + id + '" style="' + pos(o) + (o.fs ? "font-size:" + o.fs + "px;" : "") + '">' + o.html + "</div>", id); return "#" + id; }
      function chip(id, o) { mk('<div class="tn ' + (o.cls || "a") + '" id="' + id + '" style="' + pos(o) + (o.fs ? "font-size:" + o.fs + "px;" : "") + '">' + o.html + "</div>", id); return "#" + id; }
      function pill(id, o) { mk('<div class="pill ' + (o.cls || "") + '" id="' + id + '" style="' + pos(o) + (o.fs ? "font-size:" + o.fs + "px;" : "") + '">' + o.html + "</div>", id); return "#" + id; }
      function arrow(id, o) { mk('<div class="arrow" id="' + id + '" style="' + pos(o) + '">' + (o.html || "↓") + "</div>", id); return "#" + id; }
      // reveal at full opacity with a slide; wipe() removes everything still on the stage
      function appear(sel, t, o = {}) { show(sel, t, { s: o.s ?? 0.9, y: o.y ?? 30, d: o.d ?? 0.55 }); }
      function wipe(t) { live.splice(0).forEach((sel) => tl.set(sel, { opacity: 0 }, t)); }
      function lineHl(code, ns, t0, dur, color = "rgba(94,234,212,.30)") {
        const els = ns.map((n) => nth(code, n));
        tl.to(els, { backgroundColor: color, duration: 0.2 }, t0);
        tl.to(els, { backgroundColor: "rgba(94,234,212,0)", duration: 0.3 }, t0 + dur);
      }
      function lineHide(code, ns) { tl.set(ns.map((n) => nth(code, n)), { opacity: 0 }, 0); }
      function lineIn(code, ns, t, stagger = 0) {
        ns.forEach((n, i) => {
          const el = nth(code, n);
          tl.fromTo(el, { x: -26 }, { x: 0, duration: 0.4, ease: E }, t + i * stagger);
          tl.set(el, { opacity: 1 }, t + i * stagger);
        });
      }


      // ---------------- diagram primitives ----------------
      const NS = "http://www.w3.org/2000/svg";
      const svgL = document.createElementNS(NS, "svg");
      svgL.setAttribute("viewBox", "0 0 1080 1920");
      svgL.style.cssText = "position:absolute;left:0;top:0;width:1080px;height:1920px;overflow:visible;pointer-events:none";
      const HEADS = { W: "#b4bdf2", P: "#f472b6", C: "#22d3ee", L: "#86efac", R: "#fb7185", A: "#fbbf24", V: "#a78bfa" };
      svgL.innerHTML = "<defs>" + Object.entries(HEADS).map(([k, c]) => '<marker id="ah' + k + '" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="' + c + '"/></marker>').join("") + "</defs>";
      stage.insertBefore(svgL, stage.firstChild);
      // arrow / line between two points. color = key of HEADS ("W","P","C","L","R","A","V")
      function line(id, o) {
        const l = document.createElementNS(NS, "line");
        l.id = id;
        l.setAttribute("x1", o.x1); l.setAttribute("y1", o.y1); l.setAttribute("x2", o.x2); l.setAttribute("y2", o.y2);
        l.setAttribute("stroke", HEADS[o.c || "W"]); l.setAttribute("stroke-width", o.w || 6); l.setAttribute("stroke-linecap", "round");
        if (o.dash) l.setAttribute("stroke-dasharray", "14 12");
        if (o.arrow !== false) l.setAttribute("marker-end", "url(#ah" + (o.c || "W") + ")");
        svgL.appendChild(l);
        tl.set(l, { opacity: 0 }, 0);
        live.push("#" + id);
        return "#" + id;
      }
      // draw a line from its start to its end
      function drawLine(sel, t, dur = 0.5) {
        const e = document.querySelector(sel);
        const x1 = +e.getAttribute("x1"), y1 = +e.getAttribute("y1"), x2 = +e.getAttribute("x2"), y2 = +e.getAttribute("y2");
        tl.fromTo(sel, { attr: { x2: x1, y2: y1 } }, { attr: { x2, y2 }, duration: dur, ease: "power1.out", immediateRender: false }, t);
        tl.set(sel, { opacity: 1 }, t);
      }
      // a small labelled token that can travel (cls a..g)
      function tok(id, o) { mk('<div class="tok ' + (o.cls || "c") + '" id="' + id + '" style="' + pos(o) + "font-size:" + (o.fs || 34) + 'px">' + o.html + "</div>", id); return "#" + id; }
      // memory-cell style card: small label on top, value below
      function cell(id, o) { mk('<div class="cell" id="' + id + '" style="' + pos(o) + "border-color:" + (o.border || "var(--edge)") + '"><div class="lb">' + (o.label || "") + '</div><div class="vl" style="font-size:' + (o.fs || 40) + 'px;color:' + (o.color || "var(--text)") + '">' + o.html + "</div></div>", id); return "#" + id; }
      function zone(id, o) { mk('<div class="zone" id="' + id + '" style="' + pos(o) + "border-color:" + (o.color || "var(--coral)") + ";background:" + (o.bg || "rgba(251,113,133,.10)") + '"><div class="zl" style="color:' + (o.color || "var(--coral)") + '">' + (o.label || "") + "</div></div>", id); return "#" + id; }
      function lab(id, o) { mk('<div class="lab" id="' + id + '" style="' + pos(o) + (o.fs ? "font-size:" + o.fs + "px;" : "") + (o.color ? "color:" + o.color + ";" : "") + '">' + o.html + "</div>", id); return "#" + id; }
      // move an element along offsets [[dx,dy],...] from its resting place, visiting each in turn
      function path(sel, t, pts, dur = 0.8, ease = "power1.inOut") {
        let prev = [0, 0];
        pts.forEach((p, i) => { tl.fromTo(sel, { x: prev[0], y: prev[1] }, { x: p[0], y: p[1], duration: dur, ease, immediateRender: false }, t + i * (dur + 0.05)); prev = p; });
      }
      function tint(sel, t, color, bg) { tl.to(sel, Object.assign({ borderColor: color, duration: 0.25 }, bg ? { backgroundColor: bg } : {}), t); }
      function swapHTML(sel, html, t) { tl.set(sel, { innerHTML: html }, t); }
      function gone(sel, t) { tl.set(sel, { opacity: 0 }, t); }
      function shakeEl(sel, t) { tl.fromTo(sel, { x: 0 }, { x: 10, duration: 0.07, yoyo: true, repeat: 7, ease: "none", immediateRender: false }, t); tl.set(sel, { x: 0 }, t + 0.6); }
      const LOCK = '<svg viewBox="0 0 40 46" width="1em" height="1.15em" style="vertical-align:-0.15em"><rect x="4" y="18" width="32" height="26" rx="6" fill="#fb7185"/><path d="M11 18v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#fb7185" stroke-width="5"/><circle cx="20" cy="30" r="3.5" fill="#1f2140"/></svg>';
      const OPEN = '<svg viewBox="0 0 40 46" width="1em" height="1.15em" style="vertical-align:-0.15em"><rect x="4" y="18" width="32" height="26" rx="6" fill="#86efac"/><path d="M11 18v-6a9 9 0 0 1 18 0" fill="none" stroke="#86efac" stroke-width="5"/><circle cx="20" cy="30" r="3.5" fill="#1f2140"/></svg>';
      const TICK = '<svg viewBox="0 0 40 40" width="1em" height="1em" style="vertical-align:-0.12em"><path d="M6 21l9 9 19-20" fill="none" stroke="#86efac" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      const CROSS = '<svg viewBox="0 0 40 40" width="1em" height="1em" style="vertical-align:-0.12em"><path d="M8 8l24 24M32 8L8 32" fill="none" stroke="#fb7185" stroke-width="6" stroke-linecap="round"/></svg>';
      const SL = (i, a, b) => CASES[i].script.split("\n").slice(a - 1, b);
      const SLF = (i, prefix) => { const ls = CASES[i].script.split("\n"); return ls.slice(ls.findIndex((l) => l.startsWith(prefix))); };
      const EX = (i, k = 0) => CASES[i].expect[k];
      // a row of value chips: returns their selectors (hidden until appear())
      function chips(prefix, x, y, vals, cls, gap = 110, fs = 40) {
        return vals.map((v, i) => tok(prefix + i, { x: x + i * gap, y, cls: Array.isArray(cls) ? cls[i] : cls, fs, html: String(v) }));
      }
      // ===================== this video's script =====================
