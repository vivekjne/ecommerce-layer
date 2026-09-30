// ---------------- captions (word-by-word, timed from the voice) ----------------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const capEl = document.getElementById("captions");
Object.keys(T.lines).forEach((id) => {
  const ln = T.lines[id];
  const div = document.createElement("div");
  div.className = "cline";
  div.id = "cap-" + id;
  div.innerHTML = "<span>" + ln.words.map((w, i) => '<span class="cw" id="cw-' + id + "-" + i + '">' + esc(w.w) + "</span>").join(" ") + "</span>";
  capEl.appendChild(div);
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

function enter(scene) {
  tl.fromTo("#" + scene + " .eyebrow, #" + scene + " h2", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: E }, S(scene) + 0.25);
}
function leave(scene) { tl.to("#" + scene, { opacity: 0, duration: 0.5, ease: "power2.in" }, SE(scene) - 0.55); }
function show(sel, t, o = {}) {
  tl.fromTo(sel, { opacity: 0, scale: o.s ?? 0.8, y: o.y ?? 24, x: o.x ?? 0 },
    { opacity: 1, scale: 1, y: 0, x: 0, duration: o.d ?? 0.8, ease: o.ease ?? POP, transformOrigin: o.origin ?? "50% 50%" }, t);
}
function fade(sel, t, d = 0.6) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: "power1.out" }, t); }
function hide(sel, t, d = 0.4) { tl.to(sel, { opacity: 0, duration: d }, t); }
function pulse(sel, t, scale = 1.08) { tl.fromTo(sel, { scale: 1 }, { scale, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 50%", immediateRender: false }, t); }
function shake(sel, t, amp = 12) { tl.to(sel, { x: "+=" + amp, duration: 0.08, yoyo: true, repeat: 7, ease: "none" }, t); }
function move(sel, t, dx, dy, d = 0.9, ease = "power2.inOut") { tl.to(sel, { x: "+=" + dx, y: "+=" + dy, duration: d, ease }, t); }
function typeText(sel, text, t0, dur) {
  const n = text.length;
  for (let i = 1; i <= n; i++) tl.set(sel, { textContent: text.slice(0, i) }, t0 + (dur * i) / n);
}
// stroke-draw an svg path (arrow) from start to end. The path is fully hidden until drawn (an SVG marker
// ignores the dash trick and would otherwise show its arrowhead early); the head appears as the stroke ends.
function prep(sel) {
  $$(sel).forEach((p) => {
    const len = p.getTotalLength ? p.getTotalLength() : 0;
    tl.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 }, 0);
  });
}
function draw(sel, t, d = 0.8) {
  $$(sel).forEach((p) => {
    tl.set(p, { opacity: 1 }, t + d * 0.7);
    tl.to(p, { strokeDashoffset: 0, duration: d, ease: "power1.inOut" }, t);
  });
}
// a token that flies between two absolute page positions (dx, dy are offsets from its own left/top)
function fly(sel, t, fx, fy, tx, ty, d = 0.9, ease = "power2.inOut") {
  tl.fromTo(sel, { x: fx, y: fy, opacity: 0, scale: 0.7 }, { x: tx, y: ty, opacity: 1, scale: 1, duration: d, ease, immediateRender: true }, t);
}
// sound-wave bars: each bar bounces at its own rate between t0 and t1
function wave(sel, t0, t1) {
  $$(sel).forEach((b, i) => {
    const per = 0.28 + (i % 4) * 0.07;
    const reps = Math.max(1, Math.floor((t1 - t0) / per) - 1);
    tl.fromTo(b, { scaleY: 0.25 }, { scaleY: 1, duration: per, yoyo: true, repeat: reps, ease: "sine.inOut", transformOrigin: "50% 50%", immediateRender: false }, t0 + i * 0.03);
  });
}
function blinkEl(sel, t0, t1, per = 0.5) {
  const reps = Math.max(1, Math.floor((t1 - t0) / per) - 1);
  tl.fromTo(sel, { opacity: 1 }, { opacity: 0.15, duration: per, yoyo: true, repeat: reps, ease: "steps(1)", immediateRender: false }, t0);
}


// page-space centre of an element (from offset boxes, so it ignores any running transforms)
function ctr(sel) {
  let el = document.querySelector(sel);
  let x = el.offsetWidth / 2, y = el.offsetHeight / 2;
  while (el && el.id !== "root") { x += el.offsetLeft + (el.offsetParent && el.offsetParent.id !== "root" ? el.offsetParent.clientLeft : 0); y += el.offsetTop + (el.offsetParent && el.offsetParent.id !== "root" ? el.offsetParent.clientTop : 0); el = el.offsetParent; }
  return { x, y };
}
// move a cursor icon (arrow tip at ~ (0.27*size, 0.15*size) of its box) so its tip lands on the target element
function curTo(cur, t, target, d = 0.9, dx = 0, dy = 0) {
  const c = document.querySelector(cur), p = ctr(target), cp = ctr(cur);
  const sz = c.offsetWidth || 54;
  tl.to(cur, { x: p.x + dx - cp.x + 0.23 * sz, y: p.y + dy - cp.y + 0.35 * sz, duration: d, ease: "power2.inOut" }, t);
}

// move an absolutely positioned element (child of a scene section) through page points (top-left corners), one hop each
function route(sel, t, pts, per = 0.5, ease = "power1.inOut") {
  const el = document.querySelector(sel);
  const bx = el.offsetLeft, by = el.offsetTop;
  pts.forEach(([px, py], i) => tl.to(sel, { x: px - bx, y: py - by, duration: per, ease }, t + i * per));
}

// characters ------------------------------------------------------
// put a character's bottom-centre at (cx, by) at scale s (works for any .char, whatever its base position)
function stage(sel, cx, by, s = 1) {
  const el = document.querySelector(sel);
  const bx = el.offsetLeft + el.offsetWidth / 2, bby = el.offsetTop + el.offsetHeight;
  return { x: cx - bx, y: by - bby, scale: s };
}
function put(sel, t, cx, by, s, d = 1.4, ease = "power2.inOut") {
  tl.to(sel, Object.assign(stage(sel, cx, by, s), { duration: d, ease, transformOrigin: "50% 100%" }), t);
}
// (state must be set at the moment it is needed, in time order, or a later scene overwrites an earlier scene's start values)
function place(sel, cx, by, s, t = 0) { tl.set(sel, Object.assign(stage(sel, cx, by, s), { transformOrigin: "50% 100%" }), t); }
function bob(sel, t0, t1, amp = 6, period = 1.8) {
  const reps = Math.max(1, Math.floor((t1 - t0) / (period / 2)) - 1);
  tl.to(sel + " .inner", { y: -amp, duration: period / 2, yoyo: true, repeat: reps, ease: "sine.inOut" }, t0);
}
function breathe(sel, t0, t1) {
  const reps = Math.max(1, Math.floor((t1 - t0) / 1.6) - 1);
  tl.to(sel + " .fx", { scaleY: 1.03, svgOrigin: D(sel).o, duration: 1.6, yoyo: true, repeat: reps, ease: "sine.inOut" }, t0);
}
function wobble(sel, t, times = 3, deg = 6) { tl.to(sel + " .fx", { rotation: deg, svgOrigin: D(sel).o, duration: 0.45, yoyo: true, repeat: times * 2 - 1, ease: "sine.inOut" }, t); }
function waveArm(sel, t, times = 3) { tl.to(sel + " .arm-r", { rotation: -55, svgOrigin: D(sel).ar, duration: 0.45, yoyo: true, repeat: times * 2 - 1, ease: "sine.inOut" }, t); }
function armUp(sel, side, t, deg, hold) {
  const o = D(sel)[side === "r" ? "ar" : "al"];
  tl.to(sel + " .arm-" + side, { rotation: side === "r" ? -deg : deg, svgOrigin: o, duration: 0.6, ease: "sine.inOut" }, t);
  tl.to(sel + " .arm-" + side, { rotation: 0, svgOrigin: o, duration: 0.6, ease: "sine.inOut" }, t + hold);
}
function jump(sel, t, h = 50, n = 2) { tl.to(sel + " .fx", { y: -h, duration: 0.45, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }, t); }
function cheer(sel, t) { armUp(sel, "r", t, 140, 2.0); armUp(sel, "l", t, 140, 2.0); jump(sel, t + 0.2, 45, 2); }
function nod(sel, t) { tl.to(sel + " .fx", { y: 10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, t); }
function typing(sel, t0, t1) {           // both arms tap while a task is being done
  const reps = Math.max(1, Math.floor((t1 - t0) / 0.3) - 1);
  tl.to(sel + " .arm-r", { rotation: -20, svgOrigin: D(sel).ar, duration: 0.3, yoyo: true, repeat: reps, ease: "sine.inOut" }, t0);
  tl.to(sel + " .arm-l", { rotation: 20, svgOrigin: D(sel).al, duration: 0.3, yoyo: true, repeat: reps, ease: "sine.inOut" }, t0 + 0.15);
}
function blink(sel, t) {
  const g = document.querySelector(sel).querySelector(".eyes") ? ".eyes" : ".eyes-n";
  tl.to(sel + " " + g, { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, t);
}
function wiggle(sel, t, n = 2) { tl.to(sel + " .ant", { rotation: 16, svgOrigin: "120 40", duration: 0.3, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }, t); }
function mood(sel, m, t) {
  tl.set(sel + " .m-happy", { opacity: m === "happy" ? 1 : 0 }, t);
  tl.set(sel + " .m-sad", { opacity: m === "sad" ? 1 : 0 }, t);
}
function headset(sel, on, t) { tl.set(sel + " .hs", { opacity: on ? 1 : 0 }, t); }
function talk(sel, t0, t1) {
  tl.set(sel + " .m-n", { opacity: 0 }, t0);
  tl.set(sel + " .m-talk", { opacity: 1 }, t0);
  tl.fromTo(sel + " .m-talk", { scaleY: 0.3 }, { scaleY: 1.5, svgOrigin: D(sel).mo, duration: 0.24, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.24) - 1), ease: "sine.inOut", immediateRender: false }, t0);
  tl.set(sel + " .m-talk", { opacity: 0 }, t1);
  tl.set(sel + " .m-n", { opacity: 1 }, t1);
}
function face(sel, f, t) {
  ["n", "h", "a", "q"].forEach((x) => tl.set(sel + " .eyes-" + x, { opacity: x === f ? 1 : 0 }, t));
  tl.set(sel + " .bulb", { fill: { n: "#c2410c", h: "#0a8a5f", a: "#d92d48", q: "#0a7fbf" }[f] }, t);
}

// ===================== captions timeline + idle life =====================
const capIds = Object.keys(T.lines);
capIds.forEach((id, n) => {
  const ln = T.lines[id];
  const t0 = ln.start, t1 = ln.start + ln.dur;
  const nextStart = n + 1 < capIds.length ? T.lines[capIds[n + 1]].start : Infinity;
  tl.fromTo("#cap-" + id, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" }, t0 - 0.05);
  // the caption leaves 0.3 s after its line, but never later than the next caption arrives (short gaps inside one sentence)
  const hideAt = Math.max(t1, Math.min(t1 + 0.3, nextStart - 0.17));
  tl.to("#cap-" + id, { opacity: 0, duration: Math.min(0.2, Math.max(0.08, nextStart - 0.05 - hideAt)) }, hideAt);
  ln.words.forEach((w, i) => {
    const a = t0 + w.t;
    const b = i + 1 < ln.words.length ? t0 + ln.words[i + 1].t : t1;
    const sel = "#cw-" + id + "-" + i;
    tl.to(sel, { color: "#1f2140", backgroundColor: "rgba(255,201,60,0.75)", duration: 0.08 }, a);
    tl.to(sel, { backgroundColor: "rgba(255,201,60,0)", duration: 0.15 }, Math.max(a + 0.09, b - 0.05));
  });
  talk("#byte", t0 + 0.02, t1 - 0.02);   // Byte narrates: his mouth moves with the voice
});
bob("#sam", 0.5, T.total - 1, 5, 2.0);
bob("#byte", 0.8, T.total - 1, 5, 2.2);
bob("#dlg", 0.6, T.total - 1, 6, 1.9);
breathe("#sam", 0.5, T.total - 1);
for (let t = 4; t < T.total - 2; t += 4.7) { blink("#sam", t); blink("#byte", t + 1.1); blink("#dlg", t + 2.3); }
tl.set("#dlg", { opacity: 0 }, 0);
fade("#badge", S("s2"), 0.8);
