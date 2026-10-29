// ===================== 6 · Tools =====================
enter("s6");
prep("#z60, #z61, #z62, #z63");
tl.set("#wo6, #wt6, #tl6, #lp6, #ls6, #eq6, #ex6, #e6i, #td6, #tn6", { opacity: 0 }, 0);
tl.set("#tr6 .tok, #ls6 .tok, #ls6 .ar, #ex6 .tok, #ex6 .ar, #td6 [id^=d6], #tn6 .tok", { opacity: 0 }, 0);
show("#wo6", W("s6b", 0), { y: 30, s: 0.9, d: 0.7 });
show("#wt6", W("s6c", 0), { y: 30, s: 0.9, d: 0.7 });
fade("#tl6", W("s6d", 0), 0.4);
[[0, "s6d", 5], [1, "s6d", 8], [2, "s6d", 10], [3, "s6dx", 0], [4, "s6dx", 2], [5, "s6dx", 4], [6, "s6dx", 5]].forEach(([i, ln, w]) => show("#t6" + i, W(ln, w), { y: 14, s: 0.7, d: 0.4 }));
// the loop
fade("#lp6", W("s6e", 3), 0.4); tl.set("#ls6", { opacity: 1 }, 0);
[["s6f", 0], ["s6g", 0], ["s6h", 0], ["s6i", 0], ["s6j", 0]].forEach(([ln, w], i) => { show("#l6" + i, W(ln, w), { y: 14, s: 0.7, d: 0.4 }); if (i) draw("#z6" + (i - 1), W(ln, w) - 0.2, 0.3); });
// the example replaces the overview
hide("#wo6, #wt6, #tl6, #tr6, #lp6, #ls6", LE("s6j", 0.2), 0.5);
show("#eq6", W("s6k", 0) + 0.3, { y: 24, s: 0.92, d: 0.7 });
tl.set("#ex6", { opacity: 1 }, 0);
show("#e6a", W("s6l", 0), { y: 14, s: 0.7, d: 0.4 }); fade("#y6a", W("s6l", 7), 0.3);
show("#e6b", W("s6l", 8), { y: 14, s: 0.7, d: 0.4 });
show("#e6i", W("s6m", 3), { y: 14, s: 0.7, d: 0.5 });
fade("#y6b", W("s6n", 0), 0.3); show("#e6c", W("s6n", 0) + 0.3, { y: 14, s: 0.7, d: 0.4 });
fade("#y6c", W("s6o", 0), 0.3); show("#e6d", W("s6o", 0) + 0.3, { y: 14, s: 0.7, d: 0.4 });
// the tool description
show("#td6", W("s6p", 5), { y: 30, s: 0.92, d: 0.7 });
fade("#d6a", W("s6q", 0), 0.4); fade("#d6b", W("s6q", 1), 0.4);
show("#tn6", W("s6q", 0), { y: 14, s: 0.8, d: 0.5 });
tl.set("#tn6 .tok", { opacity: 0 }, 0); show("#n6a", W("s6q", 2), { x: 20, y: 0, s: 0.85, d: 0.5 }); show("#n6b", W("s6r", 0), { x: 20, y: 0, s: 0.85, d: 0.5 });
fade("#d6c", LF("s6s", 0.4), 0.4); fade("#d6d", LF("s6s", 0.6), 0.4);
pulse("#td6", LF("s6s", 0.85), 1.03);
leave("s6");
