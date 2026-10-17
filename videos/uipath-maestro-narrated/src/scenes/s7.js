// ===================== 7 · Control =====================
enter("s7");
prep("#s7l");
tl.set("#t7, #r7a, #r7b, #r7c, #r7d, #c7a, #c7b, #c7c, #c7d, #c7e, #c7f, #c7g, #h7, #d7a, #d7b, #d7c, #d7d, #d7e, #l7, #p7a, #p7b, #p7c, #p7d", { opacity: 0 }, 0);
show("#t7", W("s7a", 7) - 0.5, { y: 24, s: 0.96, d: 0.7 });
["a", "b", "c", "d"].forEach((k, i) => show("#r7" + k, W("s7a", 9) + i * 0.15, { y: 12, s: 0.96, d: 0.4 }));
// the controls, one per word
[["a", 0], ["b", 1], ["c", 2], ["d", 3], ["e", 4], ["f", 6]].forEach(([k, w]) => { show("#c7" + k, W("s7b", w), { y: 14, s: 0.7, d: 0.4 }); pulse("#c7" + k, W("s7b", w) + 0.35, 1.1); });
tl.to("#r7c", { backgroundColor: "#ffe9ec", duration: 0.3 }, W("s7b", 10));
tl.set("#r7c .ck i", { opacity: 1 }, W("s7b", 10));
show("#c7g", W("s7b", 10), { y: 14, s: 0.7, d: 0.4 });
["a", "b", "d"].forEach((k, i) => tl.set("#r7" + k + " .ck i", { opacity: 1 }, W("s7b", 16) + i * 0.15));
tl.to("#r7a, #r7b, #r7d", { backgroundColor: "#ffe9ec", duration: 0.3 }, W("s7b", 16));
// every step and variable recorded
show("#h7", W("s7c", 3), { y: 20, s: 0.96, d: 0.6 });
draw("#s7l", W("s7c", 4), 1.6);
["a", "b", "c", "d", "e"].forEach((k, i) => show("#d7" + k, W("s7c", 5) + i * 0.3, { s: 0.3, d: 0.4 }));
fade("#l7", W("s7c", 5) + 0.3, 0.6);
show("#p7a", W("s7cx", 1), { y: 14, s: 0.7, d: 0.4 });
show("#p7b", W("s7cx", 2), { y: 14, s: 0.7, d: 0.4 });
show("#p7c", W("s7cx", 6), { y: 14, s: 0.7, d: 0.4 }); pulse("#p7c", W("s7cx", 8), 1.08);
show("#p7d", W("s7cx", 13), { y: 14, s: 0.7, d: 0.4 });
leave("s7");
