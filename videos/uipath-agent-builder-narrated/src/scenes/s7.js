// ===================== 7 · Context =====================
enter("s7");
tl.set("#r7a, #hr7, #k7, #p7, #cg7, #fl7, #z7", { opacity: 0 }, 0);
tl.set("#r7a .tok, #cg7 .tok, #fl7 .tok, #fl7 .ar", { opacity: 0 }, 0);
tl.set("#r7a, #cg7, #fl7", { opacity: 1 }, 0);
show("#a7", W("s7a", 0), { y: 16, s: 0.8, d: 0.5 });
show("#b7", W("s7b", 0), { y: 16, s: 0.8, d: 0.5 });
show("#hr7", W("s7c", 2), { y: 16, s: 0.8, d: 0.5 });
show("#k7", W("s7d", 5), { y: 24, s: 0.9, d: 0.6 });
show("#p7", W("s7e", 3), { y: 24, s: 0.9, d: 0.6 });
show("#g7", W("s7f", 1), { y: 14, s: 0.8, d: 0.5 }); pulse("#g7", W("s7f", 4), 1.06);
[[0, "s7g", 5], [1, "s7g", 6], [2, "s7gx", 0], [3, "s7gx", 2], [4, "s7gx", 6]].forEach(([i, ln, w]) => show("#s7" + i, W(ln, w), { y: 12, s: 0.7, d: 0.4 }));
show("#f70", W("s7h", 4), { y: 12, s: 0.7, d: 0.4 }); fade("#y70", W("s7h", 6) - 0.3, 0.3);
show("#f71", W("s7h", 6), { y: 12, s: 0.7, d: 0.4 }); fade("#y71", W("s7hx", 0) - 0.3, 0.3);
show("#f72", W("s7hx", 0), { y: 12, s: 0.7, d: 0.4 }); fade("#y72", W("s7hx", 6) - 0.3, 0.3);
show("#f73", W("s7hx", 7), { y: 12, s: 0.7, d: 0.4 });
show("#z7", W("s7j", 0), { y: 20, s: 0.8, d: 0.7 }); pulse("#z7", W("s7j", 3), 1.05);
leave("s7");
