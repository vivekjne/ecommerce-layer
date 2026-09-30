
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
        div.style.fontSize = nch > 110 ? "36px" : nch > 85 ? "40px" : "44px";
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
          const rest = w.code ? "rgba(106,77,240,0.14)" : "rgba(255,201,60,0)";
          tl.to(sel, { color: w.code ? "#3b2bb5" : "#1f2140", backgroundColor: "rgba(255,201,60,0.75)", duration: 0.08 }, a);
          tl.to(sel, { backgroundColor: rest, duration: 0.15 }, Math.max(a + 0.09, b - 0.05));
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
        return { sel: "#" + id, id, n: o.lines.length, h, y: o.y };
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

      const SL = (i, a, b) => CASES[i].script.split("\n").slice(a - 1, b);
      const SLF = (i, prefix) => { const ls = CASES[i].script.split("\n"); return ls.slice(ls.findIndex((l) => l.startsWith(prefix))); };
      const EX = (i, k = 0) => CASES[i].expect[k];
      // ===================== this video's script =====================
