      // ---------------- characters ----------------
      const INK = "#1f2140";
      function blob(body, belly, extra) {
        return `<svg viewBox="0 0 240 290">
          <ellipse cx="120" cy="280" rx="80" ry="10" fill="rgba(31,33,64,.12)"/>
          <g class="fx"><g class="inner">
            <g class="arm-l"><path d="M44 170 q-36 6 -40 44" stroke="${body}" stroke-width="20" stroke-linecap="round" fill="none"/></g>
            <g class="arm-r"><path d="M196 170 q36 6 40 44" stroke="${body}" stroke-width="20" stroke-linecap="round" fill="none"/></g>
            <ellipse cx="88" cy="262" rx="26" ry="14" fill="${body}"/><ellipse cx="152" cy="262" rx="26" ry="14" fill="${body}"/>
            <path d="M112 44 q6 -34 34 -26 q-18 6 -16 28z" fill="${body}"/>
            <rect x="30" y="40" width="180" height="222" rx="90" fill="${body}"/>
            <ellipse cx="120" cy="196" rx="58" ry="46" fill="${belly}"/>
            ${extra}
            <ellipse cx="74" cy="156" rx="14" ry="9" fill="#ff9bb3" opacity=".8"/><ellipse cx="166" cy="156" rx="14" ry="9" fill="#ff9bb3" opacity=".8"/>
            <g class="eyes">
              <ellipse cx="92" cy="122" rx="21" ry="23" fill="#fff"/><ellipse cx="148" cy="122" rx="21" ry="23" fill="#fff"/>
              <circle cx="95" cy="126" r="10" fill="${INK}"/><circle cx="151" cy="126" r="10" fill="${INK}"/>
              <circle cx="99" cy="121" r="3.5" fill="#fff"/><circle cx="155" cy="121" r="3.5" fill="#fff"/>
            </g>
            <path class="m-happy" d="M100 158 q20 24 40 0" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none"/>
            <path class="m-sad" d="M102 170 q18 -16 36 0" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0"/>
            <ellipse class="m-talk" cx="120" cy="164" rx="14" ry="11" fill="#7a1f3a" opacity="0"/>
          </g></g>
        </svg>`;
      }
      const SHIELD = `<path d="M120 168 l28 9 v24 q0 20 -28 30 q-28 -10 -28 -30 v-24z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M107 200 l10 10 l18 -20" stroke="#06a37a" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      const MASK = `<path d="M52 104 q68 -22 136 0 v30 q-68 -16 -136 0z" fill="${INK}"/><ellipse cx="92" cy="120" rx="14" ry="9" fill="#fff"/><ellipse cx="148" cy="120" rx="14" ry="9" fill="#fff"/><circle cx="96" cy="121" r="5" fill="${INK}"/><circle cx="152" cy="121" r="5" fill="${INK}"/>`;
      const BOT = `<svg viewBox="0 0 260 320">
        <ellipse cx="130" cy="312" rx="90" ry="10" fill="rgba(31,33,64,.12)"/>
        <g class="fx"><g class="inner">
          <g class="ant"><line x1="130" y1="40" x2="130" y2="10" stroke="${INK}" stroke-width="6"/><circle class="bulb" cx="130" cy="10" r="12" fill="#c2410c" stroke="${INK}" stroke-width="4"/></g>
          <g class="arm-l"><rect x="22" y="200" width="36" height="80" rx="18" fill="#05b98a"/></g>
          <g class="arm-r"><rect x="202" y="200" width="36" height="80" rx="18" fill="#05b98a"/></g>
          <rect x="66" y="188" width="128" height="110" rx="28" fill="#038a66" stroke="${INK}" stroke-width="5"/>
          <text x="130" y="258" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-weight="800" font-size="34" fill="#fff">JS</text>
          <rect class="head" x="30" y="40" width="200" height="150" rx="40" fill="#06d6a0" stroke="${INK}" stroke-width="5"/>
          <rect x="54" y="62" width="152" height="106" rx="26" fill="${INK}"/>
          <g class="eyes-n"><rect x="88" y="94" width="22" height="32" rx="11" fill="#7cf3ff"/><rect x="150" y="94" width="22" height="32" rx="11" fill="#7cf3ff"/></g>
          <g class="eyes-h" opacity="0"><path d="M86 118 q13 -22 26 0 M148 118 q13 -22 26 0" stroke="#7cf3ff" stroke-width="7" stroke-linecap="round" fill="none"/></g>
          <g class="eyes-a" opacity="0"><path d="M84 96 l28 14 M176 96 l-28 14" stroke="#ff5d73" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="122" r="9" fill="#ff5d73"/><circle cx="160" cy="122" r="9" fill="#ff5d73"/></g>
          <g class="eyes-q" opacity="0"><rect x="88" y="104" width="22" height="18" rx="9" fill="#7cf3ff"/><rect x="150" y="96" width="22" height="30" rx="11" fill="#7cf3ff"/></g>
          <path class="m-n" d="M112 146 h36" stroke="#7cf3ff" stroke-width="6" stroke-linecap="round"/>
          <rect class="m-talk" x="112" y="138" width="36" height="14" rx="7" fill="#7cf3ff" opacity="0"/>
        </g></g>
      </svg>`;
      const KINDS = {
        sam: { svg: () => blob("#7b61ff", "#a594ff", ""), ar: "196 170", al: "44 170", o: "120 275", mo: "120 164" },
        mal: { svg: () => blob("#ff8a3d", "#ffb27d", MASK), ar: "196 170", al: "44 170", o: "120 275", mo: "120 164" },
        guard: { svg: () => blob("#ffc93c", "#ffe28a", SHIELD), ar: "196 170", al: "44 170", o: "120 275", mo: "120 164" },
        byte: { svg: () => BOT, ar: "220 205", al: "40 205", o: "130 312", mo: "130 145" },
      };
      document.querySelectorAll(".char").forEach((el) => {
        const k = KINDS[el.dataset.kind];
        el.innerHTML = k.svg();
        el.dataset.ar = k.ar; el.dataset.al = k.al; el.dataset.o = k.o; el.dataset.mo = k.mo;
      });
      // ---------------- timeline helpers ----------------
      const tl = gsap.timeline({ paused: true });
      const E = "power2.out";
      const POP = "back.out(1.5)";
      const S = (id) => T.scenes[id].start;
      const SE = (id) => T.scenes[id].start + T.scenes[id].dur;
      const L = (id, off = 0) => T.lines[id].start + off;
      const LE = (id, off = 0) => T.lines[id].start + T.lines[id].dur + off;
      const W = (id, i) => T.lines[id].start + T.lines[id].words[i].t;
      const D = (sel) => document.querySelector(sel).dataset;
      const $$ = (sel) => gsap.utils.toArray(sel);

      // Things appear with a slide/scale but at full opacity (no half-transparent frames), and disappear quickly.
      function enter(scene) {
        const sel = "#" + scene + " .eyebrow, #" + scene + " h2";
        tl.fromTo(sel, { y: 26 }, { y: 0, duration: 0.8, stagger: 0.18, ease: E }, S(scene) + 0.25);
        tl.set(sel, { opacity: 0 }, 0); tl.set(sel, { opacity: 1 }, S(scene) + 0.25);
      }
      function leave(scene) { tl.to("#" + scene, { opacity: 0, duration: 0.25, ease: "power2.in" }, SE(scene) - 0.4); }
      function show(sel, t, o = {}) {
        tl.fromTo(sel, { scale: o.s ?? 0.8, y: o.y ?? 24, x: o.x ?? 0 },
          { scale: 1, y: 0, x: 0, duration: o.d ?? 0.8, ease: o.ease ?? POP, transformOrigin: o.origin ?? "50% 50%" }, t);
        tl.set(sel, { opacity: 0 }, 0); tl.set(sel, { opacity: 1 }, t);
      }
      function fade(sel, t, d = 0.6) {
        tl.fromTo(sel, { y: 14 }, { y: 0, duration: d, ease: "power1.out" }, t);
        tl.set(sel, { opacity: 0 }, 0); tl.set(sel, { opacity: 1 }, t);
      }
      function hide(sel, t, d = 0.4) { tl.to(sel, { opacity: 0, duration: Math.min(d, 0.15) }, t); }
      function pulse(sel, t, scale = 1.35) { tl.fromTo(sel, { scale: 1 }, { scale, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 50%", immediateRender: false }, t); }
      function setText(sel, text, t) { tl.set(sel, { textContent: text }, t); pulse(sel, t); }
      function glow(sel, t, color, dur = 1.6) {
        tl.to(sel, { borderColor: color, duration: 0.3 }, t);
        return dur;
      }
      function hl(id, ns, t0, dur, color = "rgba(94,234,212,.30)") {
        const els = ns.map((n) => $$("#" + id + " .cl")[n - 1]);
        tl.to(els, { backgroundColor: color, duration: 0.25 }, t0);
        tl.to(els, { backgroundColor: "rgba(94,234,212,0)", duration: 0.4 }, t0 + dur);
      }
      function reveal(id, ns, t0, stagger = 0.16) {
        const els = ns.map((n) => $$("#" + id + " .cl")[n - 1]);
        tl.fromTo(els, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.5, stagger, ease: E }, t0);
      }
      function codeIn(id, t, hidden = []) {
        fade("#" + id, t, 0.7);
        if (hidden.length) tl.set(hidden.map((n) => $$("#" + id + " .cl")[n - 1]), { opacity: 0 }, 0);
      }
      function out(sel, t) { tl.fromTo(sel, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: E }, t); }
      function countdown(id, t0, step) {
        show("#" + id, t0, { s: 0.5, d: 0.5 });
        const nums = $$("#" + id + " .cdn");
        nums.forEach((n, i) => {
          tl.fromTo(n, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", transformOrigin: "50% 50%" }, t0 + 0.2 + i * step);
          tl.to(n, { opacity: 0, duration: 0.2 }, t0 + 0.2 + (i + 1) * step - 0.2);
        });
        hide("#" + id, t0 + 0.2 + nums.length * step, 0.3);
      }

      // characters ------------------------------------------------------
      function pop(sel, t) { show(sel, t, { s: 0.5, y: 60, d: 1.0, origin: "50% 100%" }); }
      function bob(sel, t0, t1, amp = 6, period = 1.8) {
        const reps = Math.max(1, Math.floor((t1 - t0) / (period / 2)) - 1);
        tl.to(sel + " .inner", { y: -amp, duration: period / 2, yoyo: true, repeat: reps, ease: "sine.inOut" }, t0);
      }
      function breathe(sel, t0, t1) {
        const reps = Math.max(1, Math.floor((t1 - t0) / 1.6) - 1);
        tl.to(sel + " .fx", { scaleY: 1.03, svgOrigin: D(sel).o, duration: 1.6, yoyo: true, repeat: reps, ease: "sine.inOut" }, t0);
      }
      function tilt(sel, t, deg = 6, dur = 0.7) { tl.to(sel + " .fx", { rotation: deg, svgOrigin: D(sel).o, duration: dur, yoyo: true, repeat: 1, ease: "sine.inOut" }, t); }
      function wobble(sel, t, times = 3, deg = 6) { tl.to(sel + " .fx", { rotation: deg, svgOrigin: D(sel).o, duration: 0.45, yoyo: true, repeat: times * 2 - 1, ease: "sine.inOut" }, t); }
      function wave(sel, t, times = 3) { tl.to(sel + " .arm-r", { rotation: -55, svgOrigin: D(sel).ar, duration: 0.45, yoyo: true, repeat: times * 2 - 1, ease: "sine.inOut" }, t); }
      function armUp(sel, side, t, deg, hold) {
        const o = D(sel)[side === "r" ? "ar" : "al"];
        tl.to(sel + " .arm-" + side, { rotation: side === "r" ? -deg : deg, svgOrigin: o, duration: 0.6, ease: "sine.inOut" }, t);
        tl.to(sel + " .arm-" + side, { rotation: 0, svgOrigin: o, duration: 0.6, ease: "sine.inOut" }, t + hold);
      }
      function jump(sel, t, h = 50, n = 2) { tl.to(sel + " .fx", { y: -h, duration: 0.45, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }, t); }
      function cheer(sel, t) { armUp(sel, "r", t, 140, 2.0); armUp(sel, "l", t, 140, 2.0); jump(sel, t + 0.2, 45, 2); }
      function nod(sel, t) { tl.to(sel + " .fx", { y: 10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, t); }
      function blink(sel, t) {
        const g = document.querySelector(sel).querySelector(".eyes") ? ".eyes" : ".eyes-n";
        tl.to(sel + " " + g, { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, t);
      }
      function wiggle(sel, t, n = 2) { tl.to(sel + " .ant", { rotation: 16, svgOrigin: "130 40", duration: 0.3, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }, t); }
      function mood(sel, m, t) {
        tl.set(sel + " .m-happy", { opacity: m === "happy" ? 1 : 0 }, t);
        tl.set(sel + " .m-sad", { opacity: m === "sad" ? 1 : 0 }, t);
      }
      function talk(sel, t0, t1) {
        tl.set(sel + " .m-n", { opacity: 0 }, t0);
        tl.set(sel + " .m-talk", { opacity: 1 }, t0);
        tl.fromTo(sel + " .m-talk", { scaleY: 0.3 }, { scaleY: 1.5, svgOrigin: D(sel).mo, duration: 0.24, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.24) - 1), ease: "sine.inOut", immediateRender: false }, t0);
        tl.set(sel + " .m-talk", { opacity: 0 }, t1);
        tl.set(sel + " .m-n", { opacity: 1 }, t1);
      }
      // works for the robot (Byte) and for the blob characters (Sam, Mallory, Guard)
      function talkAny(sel, t0, t1) {
        if (document.querySelector(sel + " .m-n")) return talk(sel, t0, t1);
        tl.set(sel + " .m-happy", { opacity: 0 }, t0);
        tl.set(sel + " .m-talk", { opacity: 1 }, t0);
        tl.fromTo(sel + " .m-talk", { scaleY: 0.3 }, { scaleY: 1.4, svgOrigin: D(sel).mo, duration: 0.24, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.24) - 1), ease: "sine.inOut", immediateRender: false }, t0);
        tl.set(sel + " .m-talk", { opacity: 0 }, t1);
        tl.set(sel + " .m-happy", { opacity: 1 }, t1);
      }
      function face(sel, f, t) {
        ["n", "h", "a", "q"].forEach((x) => tl.set(sel + " .eyes-" + x, { opacity: x === f ? 1 : 0 }, t));
        tl.set(sel + " .bulb", { fill: { n: "#c2410c", h: "#0a8a5f", a: "#d92d48", q: "#0a7fbf" }[f] }, t);
      }
      function shake(sel, t) { tl.to(sel, { x: "+=12", duration: 0.08, yoyo: true, repeat: 7, ease: "none" }, t); }
      function walkIn(sel, t, fromX, dur = 1.8) {
        tl.fromTo(sel, { opacity: 0, x: fromX }, { opacity: 1, x: 0, duration: dur, ease: "power1.out" }, t);
        tl.to(sel + " .inner", { y: -18, duration: dur / 8, yoyo: true, repeat: 7, ease: "sine.inOut" }, t);
      }

