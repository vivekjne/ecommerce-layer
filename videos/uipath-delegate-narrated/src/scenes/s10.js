// ===================== 10 · Approval modes =====================
enter("s10");
tl.set("#h10, #L10a, #L10b, #L10c, #ap10a, #ok10a, #ap10b, #ok10b, #mp10, #np10, #wn10, #lg10, #sa10, #mj10, #fp10, #cm10, #ch10", { opacity: 0 }, 0);
tl.set("#s10 .act", { opacity: 0 }, 0);
tl.set("#gt10b", { scaleY: 0.12, transformOrigin: "50% 0%" }, 0);
tl.set("#gt10a", { scaleY: 1, transformOrigin: "50% 0%" }, 0);
put("#dlg", S("s10") + 0.1, 2250, 890, 1.0, 1.0);
tl.set("#dlg", { opacity: 0 }, S("s10") + 1.2);
put("#sam", S("s10") + 0.1, 125, 1043, 1, 1.0);
function lanes10(a, b, c, t) { [["#L10a", a], ["#L10b", b], ["#L10c", c]].forEach(([sel, o]) => tl.to(sel, { opacity: o, duration: 0.4 }, t)); }
const X_GATE = 340, X_END = 980;
// an action that flows straight through to done
function pass10(sel, t, dur = 2.3) {
  tl.fromTo(sel, { x: 0, opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
  tl.to(sel, { x: X_END, duration: dur, ease: "none" }, t + 0.1);
  tl.to(sel, { opacity: 0, duration: 0.25 }, t + 0.1 + dur);
}
// an action that stops at the gate, asks, and continues once approved
function stop10(sel, lane, t, closeGate) {
  tl.fromTo(sel, { x: 0, opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
  tl.to(sel, { x: X_GATE, duration: 0.9, ease: "power1.in" }, t + 0.1);
  if (closeGate) tl.to("#gt10" + lane, { scaleY: 1, duration: 0.3, transformOrigin: "50% 0%" }, t + 0.5);
  fade("#ap10" + lane, t + 1.0, 0.25); tl.set("#ap10" + lane, { opacity: 0 }, t + 1.75);
  fade("#ok10" + lane, t + 1.75, 0.2); tl.set("#ok10" + lane, { opacity: 0 }, t + 2.9);
  tl.to("#gt10" + lane, { scaleY: 0.12, duration: 0.3, transformOrigin: "50% 0%" }, t + 1.95);
  tl.to(sel, { x: X_END, duration: 1.1, ease: "power1.out" }, t + 2.0);
  if (!closeGate) tl.to("#gt10" + lane, { scaleY: 1, duration: 0.3, transformOrigin: "50% 0%" }, t + 2.9);
  tl.to(sel, { opacity: 0, duration: 0.25 }, t + 3.1);
}

// how much do I trust it?
fade("#h10", L("s10a", 0.4), 0.5); pulse("#h10", W("s10a", 11), 1.03);
hide("#h10", L("s10b", -0.2), 0.4);
// you decide, with three approval modes
["#L10a", "#L10b", "#L10c"].forEach((sel, i) => tl.fromTo(sel, { opacity: 0, x: -30 }, { opacity: 0.5, x: 0, duration: 0.5, ease: E }, W("s10b", 3) + i * 0.3));
show("#lg10", W("s10b", 5), { y: 12, s: 0.8, d: 0.5 });
// 1 · Cautious: asks before every operation; the safest, with the most approval prompts
lanes10(1, 0.4, 0.4, L("s10c", 0.0));
pulse("#lb10a", L("s10c", 0.0), 1.02);
[0, 1, 2].forEach((i) => stop10("#k10a" + (i + 1), "a", L("s10c", 0.3 + i * 1.9), false));
show("#mp10", W("s10d", 5), { y: 12, s: 0.8, d: 0.5 });
// 2 · Adaptive: auto-approves known safe operations; the recommended setting
lanes10(0.4, 1, 0.4, L("s10e", 0.0));
hide("#mp10", L("s10e", 0.0), 0.3);
pulse("#lb10b", L("s10e", 0.0), 1.02);
pass10("#k10b1", L("s10e", 0.5)); pass10("#k10b2", L("s10e", 1.3));
stop10("#k10b3", "b", L("s10e", 1.9), true);
pulse("#rc10", W("s10e", 8), 1.15);
// 3 · Full access: no approval prompts at all; keep it for trusted environments
lanes10(0.4, 0.4, 1, L("s10f", 0.0));
pulse("#lb10c", L("s10f", 0.0), 1.02);
pass10("#k10c1", L("s10f", 0.3), 2.2); pass10("#k10c2", L("s10f", 0.9), 2.2); pass10("#k10c3", L("s10f", 1.5), 2.2);
show("#np10", W("s10f", 5), { y: 12, s: 0.8, d: 0.5 });
show("#wn10", W("s10f", 12), { y: 12, s: 0.8, d: 0.5 }); shake("#wn10", W("s10f", 12) + 0.6, 8);
// inside Adaptive there's a Smart approvals toggle
hide("#L10a, #L10c, #np10, #wn10, #lg10", L("s10g", -0.1), 0.4);
tl.to("#L10b", { opacity: 1, duration: 0.3 }, L("s10g", -0.1));
show("#sa10", W("s10g", 4) - 0.2, { y: 20, s: 0.92, d: 0.6 });
// turn it on and Delegate also approves what the model judges safe
tl.to("#kb10", { x: 50, duration: 0.3, ease: "power2.inOut" }, W("s10h", 2));
tl.to("#sw10", { backgroundColor: "#06d6a0", duration: 0.3 }, W("s10h", 2));
pulse("#sa10", W("s10h", 2) + 0.3, 1.03);
pass10("#k10b4", W("s10h", 3), 2.2); pass10("#k10b5", W("s10h", 4) + 0.3, 2.2);
show("#mj10", W("s10h", 7), { y: 12, s: 0.7, d: 0.5 });
pass10("#k10b6", W("s10h", 9), 2.2);
pulse("#mj10", W("s10h", 9) + 0.9, 1.15);
// the fewest prompts, but the model can misjudge: a trade-off you choose on purpose
show("#fp10", W("s10i", 3), { y: 12, s: 0.8, d: 0.5 });
pass10("#k10b1", W("s10i", 0.0) + 0.3, 2.2);
pass10("#k10b3", W("s10i", 8), 2.2);
show("#cm10", W("s10i", 9), { y: 12, s: 0.8, d: 0.5 }); shake("#cm10", W("s10i", 9) + 0.6, 8);
pulse("#mj10", W("s10i", 9) + 0.9, 1.15);
show("#ch10", W("s10i", 15), { y: 12, s: 0.8, d: 0.5 }); pulse("#sw10", W("s10i", 15), 1.1);
leave("s10");
