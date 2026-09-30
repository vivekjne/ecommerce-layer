// ===================== 12 · Three modes =====================
enter("s12");
tl.set("#h12, #L12a, #L12b, #L12c, #an12, #hv12, #ht12, #ap12a, #ok12a, #ap12b, #ok12b, #wn12", { opacity: 0 }, 0);
tl.set("#s12 .act", { opacity: 0 }, 0);
tl.set("#gt12b", { scaleY: 0.12, transformOrigin: "50% 0%" }, 0);
put("#dlg", L("s12a", 0.0), 2250, 858, 1.3, 1.2);
tl.set("#dlg", { opacity: 0 }, L("s12a", 1.3));
function lanes12(a, b, c, t) { [["#L12a", a], ["#L12b", b], ["#L12c", c]].forEach(([sel, o]) => tl.to(sel, { opacity: o, duration: 0.4 }, t)); }
const X_GATE = 340, X_END = 980;
// a green/red action that flows straight through to done
function pass12(sel, t, dur = 2.3) {
  tl.fromTo(sel, { x: 0, opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
  tl.to(sel, { x: X_END, duration: dur, ease: "none" }, t + 0.1);
  tl.to(sel, { opacity: 0, duration: 0.25 }, t + 0.1 + dur);
}
// an action that stops at the gate, asks, and continues once approved
function stop12(sel, lane, t, lowerAfter) {
  tl.fromTo(sel, { x: 0, opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
  tl.to(sel, { x: X_GATE, duration: 0.9, ease: "power1.in" }, t + 0.1);
  fade("#ap12" + lane, t + 1.0, 0.25); tl.set("#ap12" + lane, { opacity: 0 }, t + 1.75);
  fade("#ok12" + lane, t + 1.75, 0.2); tl.set("#ok12" + lane, { opacity: 0 }, t + 2.9);
  tl.to("#gt12" + lane, { scaleY: 0.12, duration: 0.3, transformOrigin: "50% 0%" }, t + 1.95);
  tl.to(sel, { x: X_END, duration: 1.1, ease: "power1.out" }, t + 2.0);
  if (lowerAfter) tl.to("#gt12" + lane, { scaleY: 1, duration: 0.3, transformOrigin: "50% 0%" }, t + 2.9);
  tl.to(sel, { opacity: 0, duration: 0.25 }, t + 3.1);
}
// how much freedom? per environment and per task
fade("#h12", L("s12a", 0.6), 0.5);
show("#hv12", W("s12a", 9), { y: 16, s: 0.7, d: 0.5 }); show("#ht12", W("s12a", 12), { y: 16, s: 0.7, d: 0.5 });
hide("#h12, #hv12, #ht12", L("s12b", -0.2), 0.4);
// the three modes appear
lanes12(0.5, 0.5, 0.5, L("s12b", 0.2));
["#L12a", "#L12b", "#L12c"].forEach((sel, i) => tl.fromTo(sel, { opacity: 0, x: -30 }, { opacity: 0.5, x: 0, duration: 0.5, ease: E }, L("s12b", 0.15 + i * 0.25)));
// 1 · Always ask: every action waits for a yes
lanes12(1, 0.4, 0.4, L("s12c", 0.0));
pulse("#lb12a", L("s12c", 0.0), 1.02);
[0, 1, 2].forEach((i) => stop12("#k12a" + (i + 1), "a", L("s12d", 0.3 + i * 2.1), true));
tl.set("#gt12a", { scaleY: 1, transformOrigin: "50% 0%" }, 0);
// 2 · Smart: low-risk flows, risky asks
lanes12(0.4, 1, 0.4, L("s12e", 0.0));
pulse("#lb12b", L("s12e", 0.0), 1.02);
pass12("#k12b1", L("s12f", 0.4)); pass12("#k12b2", L("s12f", 1.2));
tl.to("#gt12b", { scaleY: 1, duration: 0.3, transformOrigin: "50% 0%" }, L("s12f", 2.4));
stop12("#k12b3", "b", L("s12f", 2.0), false);
// 3 · Unrestricted: everything flows, only in trusted environments
lanes12(0.4, 0.4, 1, L("s12g", 0.0));
pulse("#lb12c", L("s12g", 0.0), 1.02);
pass12("#k12c1", L("s12g", 0.6), 2.2); pass12("#k12c2", L("s12g", 1.2), 2.2); pass12("#k12c3", L("s12g", 1.8), 2.2);
show("#wn12", W("s12h", 4), { y: 12, s: 0.7, d: 0.6 }); shake("#wn12", W("s12h", 4) + 0.6, 8);
// quick check
lanes12(1, 1, 1, L("s12i", 0.0));
face("#byte", "q", L("s12i", 0.0));
countdown12("cd12", LE("s12i", 0.15), 1.25);
function countdown12(id, t0, step) {
  show("#" + id, t0, { s: 0.5, d: 0.5 });
  const nums = $$("#" + id + " .cdn");
  nums.forEach((n, i) => {
    tl.fromTo(n, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", transformOrigin: "50% 50%" }, t0 + 0.2 + i * step);
    tl.to(n, { opacity: 0, duration: 0.2 }, t0 + 0.2 + (i + 1) * step - 0.2);
  });
  hide("#" + id, t0 + 0.2 + nums.length * step, 0.3);
}
tl.set("#cd12", { opacity: 0 }, 0);
lanes12(1, 0.35, 0.35, L("s12j", 0.0));
pulse("#lb12a", L("s12j", 0.0), 1.03);
show("#an12", L("s12j", 0.1), { s: 0.5, d: 0.5 });
face("#byte", "h", L("s12j", 0.0)); cheer("#sam", L("s12j", 0.2));
leave("s12");
