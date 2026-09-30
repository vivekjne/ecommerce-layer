// ===================== 2 · Meet Sam =====================
enter("s2");
mood("#sam", "happy", S("s2"));
mood("#sam", "sad", L("s2a", 0.5)); wobble("#sam", L("s2a", 1.0), 2, 5);
// the pile of busywork lands on Sam, one task per phrase
[["#t2a", 4], ["#t2b", 6], ["#t2c", 8], ["#t2d", 11]].forEach(([sel, w], i) => {
  show(sel, W("s2b", w), { y: -110, s: 0.7, d: 0.7 });
  tl.to(sel, { rotation: i % 2 ? 3 : -3, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut", transformOrigin: "50% 50%" }, W("s2b", w) + 0.9);
});
wobble("#sam", L("s2b", 5.0), 3, 6);
// AI can remove it... but real companies have doors
tl.set("#bld2, #lk2, #ul2, #ai2, #q2, #ok2, #hire2", { opacity: 0 }, 0);
show("#bld2", L("s2c", 0.2), { x: 120, s: 0.9, d: 0.9 });
show("#lk2", L("s2c", 0.9), { s: 0.5, d: 0.5 });
show("#ai2", L("s2c", 0.6), { x: -40, s: 0.6, d: 0.6 });
move("#ai2", L("s2c", 1.4), 520, 40, 2.0);
shake("#ai2", L("s2c", 3.5), 10);
show("#q2", L("s2c", 3.7), { s: 0.4, d: 0.5 });
pulse("#lk2", L("s2c", 3.7), 1.25);
// Delegate is designed for this: it can get through
hide("#ai2, #q2", L("s2d", 0.0), 0.4);
place("#dlg", 2250, 860, 1.25, L("s2d", -0.02));
tl.set("#dlg", { opacity: 1 }, L("s2d", -0.01));
put("#dlg", L("s2d", 0.0), 1235, 860, 1.25, 1.7);
face("#dlg", "h", L("s2d", 1.8));
tl.set("#ul2", { opacity: 1 }, L("s2d", 2.2)); tl.set("#lk2", { opacity: 0 }, L("s2d", 2.2));
pulse("#ul2", L("s2d", 2.2), 1.3);
tl.to("#door2", { scaleX: 0.12, svgOrigin: "210 465", duration: 0.7, ease: "power2.inOut" }, L("s2d", 2.4));
show("#ok2", L("s2d", 2.8), { s: 0.6, d: 0.6 });
// so Sam hires an intern
put("#dlg", L("s2e", 0.0), 690, 850, 1.5, 1.7);
hide("#ok2, #bld2, #ul2", L("s2e", 0.2), 0.6);
mood("#sam", "happy", L("s2e", 0.5));
[["#t2a", 0], ["#t2b", 1], ["#t2c", 2], ["#t2d", 3]].forEach(([sel, i]) => {
  tl.to(sel, { x: 300 + i * 20, y: 330 + (i % 2) * 40, scale: 0.4, opacity: 0, duration: 0.7, ease: "power2.in" }, LE("s2e", 0.4 + i * 0.25));
});
show("#hire2", LE("s2e", 1.6), { s: 0.4, d: 0.6 });
cheer("#sam", LE("s2e", 1.6)); cheer("#dlg", LE("s2e", 1.9));
leave("s2");
