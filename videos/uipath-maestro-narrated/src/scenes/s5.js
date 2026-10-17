// ===================== 5 · Case =====================
enter("s5");
prep("#q5a, #q5b, #q5c");
tl.set("#k5a, #k5b, #k5c, #k5d, #u5a, #u5b, #u5c, #u5d, #o5a, #o5b, #o5c, #m5, #h5", { opacity: 0 }, 0);
tl.set("#s5 .col .fl, #s5 .col .sla, #s5 .col .sm", { opacity: 0 }, 0);
["a", "b", "c", "d"].forEach((k, i) => show("#k5" + k, W("s5a", [11, 12, 13, 15][i]), { y: 16, s: 0.7, d: 0.5 }));
// stages, milestones, SLAs
["a", "b", "c", "d"].forEach((k, i) => show("#u5" + k, W("s5b", 1) + i * 0.3, { y: 30, s: 0.88, d: 0.6 }));
["a", "b", "c", "d"].forEach((k, i) => fade("#u5" + k + " .fl", W("s5b", 3) + i * 0.2, 0.4));
["a", "b", "c", "d"].forEach((k, i) => { fade("#u5" + k + " .sla", W("s5b", 5) + i * 0.2, 0.4); pulse("#u5" + k + " .sla", W("s5b", 5) + 0.3 + i * 0.2, 1.15); });
// events, AI decisions and human judgment decide the order
draw("#q5a", W("s5c", 1), 0.9); show("#o5a", W("s5c", 1), { y: 16, s: 0.7, d: 0.5 });
draw("#q5b", W("s5c", 2), 0.9); show("#o5b", W("s5c", 2), { y: 16, s: 0.7, d: 0.5 });
draw("#q5c", W("s5c", 5), 0.9); show("#o5c", W("s5c", 5), { y: 16, s: 0.7, d: 0.5 });
// Case Manager governs; Stage Managers drive each phase; people stay in the loop
show("#m5", W("s5d", 1), { y: 24, s: 0.95, d: 0.7 });
["a", "b", "c", "d"].forEach((k, i) => { fade("#u5" + k + " .sm", W("s5d", 7) + i * 0.25, 0.4); pulse("#u5" + k + " .sm", W("s5d", 7) + 0.3 + i * 0.25, 1.25); });
show("#h5", W("s5dx", 1), { y: 20, s: 0.7, d: 0.6 }); pulse("#h5", W("s5dx", 7), 1.08);
leave("s5");
