// ===================== 4 · Data Manager =====================
enter("s4");
tl.set("#e4, #in4, #out4, #fl4, #r4, #g4, #y4e", { opacity: 0 }, 0);
tl.set("#in4 .tok, #out4 .tok, #fl4 .tok, #fl4 .ar", { opacity: 0 }, 0);
show("#in4", W("s4b", 0), { y: 30, s: 0.9, d: 0.7 });
show("#out4", W("s4c", 0) + 0.2, { y: 30, s: 0.9, d: 0.7 });
pulse("#in4", W("s4d", 0) + 0.5, 1.03); pulse("#out4", W("s4d", 0) + 1.0, 1.03);
show("#e4", W("s4e", 2), { y: 16, s: 0.8, d: 0.5 });
tl.set("#fl4", { opacity: 1 }, 0);
[[0, 4], [1, 7], [2, 10], [3, 12]].forEach(([i, w]) => show("#ia" + i, W("s4f", w), { y: 14, s: 0.7, d: 0.4 }));
[[0, 5], [1, 7], [2, 9], [3, 13]].forEach(([i, w]) => show("#oa" + i, W("s4g", w), { y: 14, s: 0.7, d: 0.4 }));
// the flow: application -> input arguments -> agent -> output arguments -> next application
show("#f4a", W("s4h", 4), { y: 14, s: 0.7, d: 0.4 }); fade("#y4a", W("s4h", 7) - 0.3, 0.3);
show("#f4b", W("s4h", 8), { y: 14, s: 0.7, d: 0.4 }); fade("#y4b", W("s4h", 10) - 0.3, 0.3);
show("#f4c", W("s4h", 11), { y: 14, s: 0.7, d: 0.4 }); fade("#y4c", W("s4hx", 0) - 0.2, 0.3);
show("#f4d", W("s4hx", 1), { y: 14, s: 0.7, d: 0.4 }); fade("#y4d", W("s4hx", 5) - 0.3, 0.3);
show("#f4e", W("s4hx", 7), { y: 14, s: 0.7, d: 0.4 });
show("#r4", W("s4i", 6), { y: 14, s: 0.7, d: 0.5 }); shake("#r4", W("s4i", 6) + 0.5, 6);
fade("#y4e", W("s4j", 0), 0.4); show("#g4", W("s4j", 0) + 0.3, { y: 14, s: 0.7, d: 0.6 });
leave("s4");
