// ===================== 12 · Debug, evaluate, deploy =====================
enter("s12");
prep("#z120, #z121, #z122, #z123");
tl.set("#tr12, #hi12, #ev12, #qm12, #dp12", { opacity: 0 }, 0);
tl.set("#tr12 .tok, #hi12 .tok, #ev12 .tok, #qm12 .tok, #qm12 .ar, #dp12 .tok, #dp12 .ar", { opacity: 0 }, 0);
tl.set("#qm12, #dp12", { opacity: 1 }, 0);
show("#tr12", W("s12c", 4), { y: 30, s: 0.92, d: 0.7 });
[[0, "s12e", 0], [1, "s12e", 6], [2, "s12e", 11], [3, "s12f", 0], [4, "s12f", 4]].forEach(([i, ln, w]) => show("#x12" + i, W(ln, w), { y: 12, s: 0.8, d: 0.4 }));
shake("#x124", W("s12f", 4) + 0.5, 6);
show("#hi12", W("s12g", 4), { y: 30, s: 0.92, d: 0.7 });
[0, 1, 2, 3].forEach((i) => show("#h12" + i, W("s12g", 5) + 0.3 + i * 0.35, { y: 12, s: 0.8, d: 0.4 }));
show("#ev12", W("s12h", 0), { y: 30, s: 0.92, d: 0.7 });
show("#o12", W("s12i", 6), { y: 12, s: 0.8, d: 0.5 });
fade("#y12", W("s12ix", 0), 0.3); show("#e12", W("s12ix", 0) + 0.3, { y: 12, s: 0.8, d: 0.6 });
[[0, "s12j", 0.15], [1, "s12j", 0.45], [2, "s12j", 0.75]].forEach(([i, ln, f]) => show("#v12" + i, LF(ln, f), { y: 12, s: 0.8, d: 0.4 }));
show("#v123", LF("s12jx", 0.3), { y: 12, s: 0.8, d: 0.4 });
// publish, deploy, observe, collect feedback, keep improving
[["d120", "s12k", 6], ["d121", "s12k", 8], ["d122", "s12k", 11], ["d123", "s12kx", 0], ["d124", "s12kx", 3]].forEach(([id, ln, w], i) => { show("#" + id, W(ln, w), { y: 12, s: 0.8, d: 0.4 }); if (i) draw("#z12" + (i - 1), W(ln, w) - 0.2, 0.3); });
leave("s12");
