// ===================== 1 · The in-between =====================
enter("s1");
prep("#a1a, #a1b, #a1c");
tl.set("#k1a, #k1b, #k1c, #k1d, #g1a, #g1b, #g1c, #mb1, #c1a, #c1b, #c1c", { opacity: 0 }, 0);
tl.set("#s1 i.ck", { opacity: 0 }, 0);
place("#sam", 190, 895, 0.95, 0);
mood("#sam", "sad", L("s1b", 3.8));
["a", "b", "c", "d"].forEach((k, i) => {
  show("#k1" + k, W("s1a", 3) + i * 0.25, { y: 30, s: 0.8, d: 0.5 });
  fade("#k1" + k + " i.ck", W("s1a", 4) + 0.3 + i * 0.25, 0.25); pulse("#k1" + k + " i.ck", W("s1a", 4) + 0.3 + i * 0.25, 1.3);
});
// the expensive part happens between the tasks
[["#g1a", "#a1a", "s1b", 9], ["#g1b", "#a1b", "s1bx", 1], ["#g1c", "#a1c", "s1bx", 7]].forEach(([g, a, ln, w]) => { draw(a, W(ln, w) - 0.2, 0.5); show(g, W(ln, w), { y: 20, s: 0.7, d: 0.5 }); shake(g, W(ln, w) + 0.6, 6); });
// Maestro is built for that in-between
show("#mb1", W("s1c", 1), { y: 24, s: 0.92, d: 0.7 });
mood("#sam", "happy", W("s1c", 3));
["#c1a", "#c1b", "#c1c"].forEach((s, i) => { show(s, W("s1d", [3, 5, 8][i]), { y: 16, s: 0.7, d: 0.5 }); pulse(s, W("s1d", [3, 5, 8][i]) + 0.4, 1.1); });
cheer("#sam", W("s1d", 8));
leave("s1");
