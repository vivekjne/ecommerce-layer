// ===================== 4 · BPMN =====================
enter("s4");
prep("#p4a, #p4b, #p4c, #p4d, #p4e, #p4f, #p4g");
tl.set("#e4s, #t4a, #g4, #t4b, #t4c, #t4d, #e4e, #d4, #v4, #b4, #i4, #u4, #x4, #y4, #r4", { opacity: 0 }, 0);
// the diagram builds while it is being signed off
show("#e4s", S("s4") + 0.8, { s: 0.5, d: 0.5 });
show("#t4a", W("s4a", 2), { y: 20, s: 0.8, d: 0.5 }); draw("#p4a", W("s4a", 2) - 0.1, 0.4);
show("#g4", W("s4a", 4), { s: 0.5, d: 0.5 }); draw("#p4b", W("s4a", 4) - 0.1, 0.4);
show("#t4b", W("s4a", 5), { y: 20, s: 0.8, d: 0.5 }); draw("#p4c", W("s4a", 5) - 0.1, 0.5);
show("#t4c", W("s4a", 6), { y: 20, s: 0.8, d: 0.5 }); draw("#p4d", W("s4a", 6) - 0.1, 0.5);
show("#b4", W("s4a", 7), { y: 20, s: 0.7, d: 0.5 }); pulse("#b4", W("s4a", 7) + 0.6, 1.08);
show("#i4", W("s4a", 9), { y: 20, s: 0.7, d: 0.5 }); pulse("#i4", W("s4a", 9) + 0.6, 1.08);
// BPMN 2.0 extended with UiPath tasks
show("#u4", W("s4b", 4), { y: 20, s: 0.7, d: 0.5 });
pulse("#t4b", W("s4b", 11), 1.08); pulse("#t4a", W("s4b", 12), 1.08);
show("#t4d", W("s4b", 14), { y: 20, s: 0.8, d: 0.5 }); draw("#p4e", W("s4b", 14) - 0.2, 0.5); draw("#p4f", W("s4b", 14) - 0.2, 0.5);
show("#e4e", W("s4b", 14) + 0.9, { s: 0.5, d: 0.5 }); draw("#p4g", W("s4b", 14) + 0.7, 0.4);
// DMN decision tables
show("#d4", W("s4c", 4), { y: 30, s: 0.85, d: 0.7 });
show("#v4", W("s4c", 7), { y: 16, s: 0.7, d: 0.5 }); pulse("#v4", W("s4c", 7) + 0.6, 1.08);
// the signed-off diagram is the one that runs
show("#x4", W("s4d", 7), { y: 16, s: 0.8, d: 0.5 });
const rp = [[193, 417], [375, 417], [573, 417], [805, 331], [1100, 331], [1100, 417], [1322, 417]];
tl.set("#r4", { x: rp[0][0], y: rp[0][1], opacity: 1 }, W("s4d", 11));
for (let i = 1; i < rp.length; i++) tl.to("#r4", { x: rp[i][0], y: rp[i][1], duration: 0.45, ease: "power1.inOut" }, W("s4d", 11) + 0.1 + (i - 1) * 0.5);
tl.to("#r4", { opacity: 0, duration: 0.3 }, W("s4d", 11) + 3.3);
show("#y4", W("s4d", 12), { y: 16, s: 0.8, d: 0.5 }); shake("#y4", W("s4d", 12) + 0.6, 6);
leave("s4");
