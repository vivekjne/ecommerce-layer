
      // ===================== builders for this tutorial =====================
      const stageOf = (sid) => document.getElementById(sid + "-stage");
      function mk(sid, html) {
        const d = document.createElement("div");
        d.innerHTML = html.trim();
        const first = d.firstElementChild;
        while (d.firstElementChild) stageOf(sid).appendChild(d.firstElementChild);
        return first;
      }
      // guard: report animation calls that get an empty target (a wrong line number, a missing id)
      ["to", "fromTo", "set"].forEach((m) => {
        const orig = tl[m];
        tl[m] = function (target, ...rest) {
          const bad = target === undefined || target === null || target === "" || (Array.isArray(target) && target.some((x) => !x));
          if (bad) console.warn("BAD TARGET in tl." + m + ": " + JSON.stringify(rest[0]).slice(0, 60) + " @ " + (new Error().stack.split("\n")[2] || "").trim());
          return orig.call(this, target, ...rest);
        };
      });
      const px = (o) => "left:" + o.x + "px;top:" + o.y + "px;" + (o.w ? "width:" + o.w + "px;" : "") + (o.h ? "height:" + o.h + "px;" : "");

      // code panel: real snippet from codes.json (or raw text). Returns its id.
      function codePanel(sid, id, o) {
        const text = CODES[o.code] !== undefined ? CODES[o.code] : o.code;
        const lines = text.split("\n");
        const maxc = Math.max(...lines.map((l) => l.length));
        const fs = o.fs || Math.max(17, Math.min(27, Math.floor((o.w - 64) / (maxc * 0.61))));
        const h = o.h || Math.ceil(lines.length * fs * 1.34 + 52);
        mk(sid, '<div class="code" id="' + id + '" style="' + px({ x: o.x, y: o.y, w: o.w }) + "height:" + h + "px;font-size:" + fs + 'px"><span class="tab">' + o.name + "</span>" + lines.map((l) => '<span class="cl">' + (l ? highlight(l) : "&nbsp;") + "</span>").join("") + "</div>");
        return { id, n: lines.length, h, fs };
      }

      // browser window that shows real screenshots of the running app
      function browserWin(sid, id, o) {
        const bodyH = Math.round(o.w * 0.64);
        const names = o.frames;
        mk(sid, '<div class="win" id="' + id + '" style="' + px({ x: o.x, y: o.y, w: o.w }) + "height:" + (bodyH + 51) + 'px"><div class="bar"><i></i><i></i><i></i><span class="urlbar" id="' + id + '-url">localhost:5173/</span></div><div class="body">' + names.map((f) => '<img id="' + id + "-f-" + f + '" src="assets/frames/' + f + '.jpg" style="opacity:0" />').join("") + "</div></div>");
        const sc = (o.w - 10) / (FRAMES.__viewport ? FRAMES.__viewport.w : 1000);
        const st = { cur: null, pos: null, made: false };
        const api = {
          id, h: bodyH + 51, w: o.w,
          // crossfade to another real frame
          frame(name, t, d = 0.35) {
            if (st.cur) tl.to("#" + id + "-f-" + st.cur, { opacity: 0, duration: d }, t);
            tl.fromTo("#" + id + "-f-" + name, { opacity: 0 }, { opacity: 1, duration: d }, t);
            tl.set("#" + id + "-url", { textContent: "localhost:5173" + FRAMES[name].url }, t);
            st.cur = name;
          },
          // animated cursor that clicks where the real click happened in that frame
          click(name, tArrive, dur = 0.9) {
            const c = FRAMES[name].click;
            if (!c) return;
            const tx = o.x + 5 + c.x * sc, ty = o.y + 51 + c.y * sc;
            const cid = id + "-cur";
            if (!st.made) {
              mk(sid, '<div class="cur" id="' + cid + '" style="left:0;top:0;opacity:0"><svg viewBox="0 0 30 40"><path d="M3 2 L3 30 L10 24 L15 37 L20 35 L15 22 L25 22z" fill="#fff" stroke="#1f2140" stroke-width="2.5" stroke-linejoin="round"/></svg></div><div class="rip" id="' + id + '-rip" style="left:0;top:0"></div>');
              st.made = true;
              st.pos = { x: o.x + o.w - 120, y: o.y + 51 + 420 };
              tl.set("#" + cid, { x: st.pos.x, y: st.pos.y }, 0);
            }
            tl.to("#" + cid, { opacity: 1, duration: 0.25 }, tArrive - dur - 0.25);
            tl.fromTo("#" + cid, { x: st.pos.x, y: st.pos.y }, { x: tx, y: ty, duration: dur, ease: "power2.inOut", immediateRender: false }, tArrive - dur);
            tl.fromTo("#" + cid, { scale: 1 }, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: "0 0", immediateRender: false }, tArrive);
            tl.fromTo("#" + id + "-rip", { x: tx - 28, y: ty - 28, opacity: 0.9, scale: 0.3 }, { opacity: 0, scale: 2.4, duration: 0.6, ease: "power2.out", immediateRender: false }, tArrive + 0.05);
            st.pos = { x: tx, y: ty };
          },
          hideCursor(t) { if (st.made) tl.to("#" + id + "-cur", { opacity: 0, duration: 0.3 }, t); },
        };
        return api;
      }

      // diagram helpers
      function box(sid, id, o) { mk(sid, '<div class="bx ' + (o.cls || "c1") + '" id="' + id + '" style="' + px(o) + (o.style || "") + '">' + o.html + "</div>"); return "#" + id; }
      function tag(sid, id, o) { mk(sid, '<div class="tag ' + (o.cls || "") + '" id="' + id + '" style="' + px({ x: o.x, y: o.y }) + "font-size:" + (o.fs || 26) + 'px">' + o.html + "</div>"); return "#" + id; }
      function note(sid, id, o) { mk(sid, '<div class="note" id="' + id + '" style="' + px(o) + (o.style || "") + '">' + o.html + "</div>"); return "#" + id; }
      function chip(sid, id, o) { mk(sid, '<div class="tn ' + (o.cls || "a") + '" id="' + id + '" style="' + px({ x: o.x, y: o.y }) + (o.fs ? "font-size:" + o.fs + "px;" : "") + '">' + o.html + "</div>"); return "#" + id; }
      function arrowText(sid, id, o) { mk(sid, '<div class="arrow" id="' + id + '" style="' + px({ x: o.x, y: o.y }) + (o.fs ? "font-size:" + o.fs + "px;" : "") + (o.color ? "color:" + o.color + ";" : "") + '">' + (o.html || "→") + "</div>"); return "#" + id; }
      function svgLayer(sid) {
        let s = document.getElementById(sid + "-ov");
        if (!s) { s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("class", "ov"); s.id = sid + "-ov"; stageOf(sid).appendChild(s); }
        return s;
      }
      function line(sid, id, o) {
        const s = svgLayer(sid);
        const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l.id = id; l.setAttribute("x1", o.x1); l.setAttribute("y1", o.y1); l.setAttribute("x2", o.x2); l.setAttribute("y2", o.y2);
        l.setAttribute("stroke", o.color || "#b4bdf2"); l.setAttribute("stroke-width", o.w || 5); l.setAttribute("stroke-linecap", "round");
        if (o.dash) l.setAttribute("stroke-dasharray", "12 10");
        if (o.arrow) l.setAttribute("marker-end", "url(#" + (o.arrow === true ? "ahW" : o.arrow) + ")");
        s.appendChild(l);
        return "#" + id;
      }
      function drawLine(sel, t, dur = 0.5) {
        const e = document.querySelector(sel);
        const x2 = +e.getAttribute("x2"), y2 = +e.getAttribute("y2"), x1 = +e.getAttribute("x1"), y1 = +e.getAttribute("y1");
        tl.fromTo(sel, { attr: { x2: x1, y2: y1 }, opacity: 0 }, { attr: { x2, y2 }, opacity: 1, duration: dur, ease: "power1.out" }, t);
      }

      function grow(sel, t0, dur) { tl.fromTo(sel, { clipPath: "inset(0% 100% 0% 0% round 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 12px)", duration: dur, ease: "none" }, t0); }
      function strike(sel, t) { tl.set(sel, { textDecoration: "line-through" }, t); }
      // travelling packet between two points
      function packet(sid, id, o) { mk(sid, '<div class="pkt ' + (o.cls || "") + '" id="' + id + '" style="' + px({ x: o.x, y: o.y }) + "opacity:0;font-size:" + (o.fs || 22) + 'px">' + o.html + "</div>"); return "#" + id; }
      function fly(sel, t, dx, dy, dur = 1.2, keep = false) {
        tl.fromTo(sel, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, ease: E }, t);
        tl.fromTo(sel, { x: 0, y: 0 }, { x: dx, y: dy, duration: dur, ease: "power1.inOut", immediateRender: false }, t + 0.2);
        if (!keep) tl.to(sel, { opacity: 0, scale: 0.8, duration: 0.25 }, t + 0.2 + dur);
      }
      function hlEl(sel, t0, dur, color = "rgba(94,234,212,.30)") {
        tl.to(sel, { backgroundColor: color, duration: 0.25 }, t0);
        tl.to(sel, { backgroundColor: "rgba(94,234,212,0)", duration: 0.4 }, t0 + dur);
      }
      // a character cameo (Mallory / Guard) for the lines they speak
      function cameo(sel, lineId, tail = 0.4) {
        pop(sel, L(lineId, -0.15));
        tl.to(sel, { opacity: 0, duration: 0.4 }, LE(lineId, tail));
      }
      // split layout constants: code left, live preview right
      const SPLIT = { cx: 100, cy: 235, cw: 960, px: 1090, py: 235, pw: 710 };
