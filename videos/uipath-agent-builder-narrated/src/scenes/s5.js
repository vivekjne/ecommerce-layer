// ===================== 5 · Prompts =====================
enter("s5");
tl.set("#sp5, #up5, #rf5, #a5, #b5, #y5", { opacity: 0 }, 0);
tl.set("#sp5 [id^=q5], #rf5 .tok", { opacity: 0 }, 0);
show("#sp5", W("s5b", 3), { y: 30, s: 0.92, d: 0.7 });
[[0, "s5d", 0], [1, "s5d", 3], [2, "s5d", 9], [3, "s5e", 0], [4, "s5e", 6], [5, "s5e", 11], [6, "s5f", 0]].forEach(([i, ln, w]) => { show("#q5" + i, W(ln, w), { x: -20, y: 0, s: 0.95, d: 0.5 }); });
show("#up5", W("s5g", 2), { y: 30, s: 0.92, d: 0.7 });
typeText("#pt5", "Analyse this incident and recommend the next action.", W("s5h", 2), 2.4);
show("#rf5", W("s5i", 3), { y: 30, s: 0.92, d: 0.7 });
[[0, "s5j", 12], [1, "s5jx", 0], [2, "s5jx", 1], [3, "s5jx", 2], [4, "s5jx", 3], [5, "s5jx", 5]].forEach(([i, ln, w]) => show("#x5" + i, W(ln, w), { y: 12, s: 0.7, d: 0.4 }));
show("#a5", W("s5l", 3), { y: 16, s: 0.8, d: 0.5 });
fade("#y5", W("s5m", 0), 0.3); show("#b5", W("s5m", 0) + 0.2, { y: 16, s: 0.8, d: 0.6 }); pulse("#b5", W("s5m", 4), 1.04);
leave("s5");
