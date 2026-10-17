// ===================== 8 · Maestro Automate =====================
enter("s8");
prep("#a8");
tl.set("#gn8a, #gn8b, #gn8c, #gn8d, #gy8a, #gy8b, #gy8c, #x8a, #x8b, #x8c, #x8d, #x8e, #y8a, #y8b, #y8c, #y8d, #m8, #ed8, #cl8a, #cl8b, #cl8c, #tp8, #tb8, #ea8, #lv8, #ex8a, #ex8b, #ex8c, #ex8d", { opacity: 0 }, 0);
tl.set("#pr8, #bk8", { opacity: 0 }, 0);
// the idea: an event comes in, agents reason, APIs act, it finishes within minutes or hours
show("#gn8a", W("s8b", 1), { y: 16, s: 0.7, d: 0.5 }); fade("#gy8a", W("s8b", 3), 0.4);
show("#gn8b", W("s8b", 4), { y: 16, s: 0.7, d: 0.5 }); fade("#gy8b", W("s8b", 5), 0.4);
show("#gn8c", W("s8b", 6), { y: 16, s: 0.7, d: 0.5 }); fade("#gy8c", W("s8b", 9), 0.4);
show("#gn8d", W("s8b", 11), { y: 16, s: 0.7, d: 0.5 }); pulse("#gn8d", W("s8b", 13), 1.08);
hide("#gn8a, #gn8b, #gn8c, #gn8d, #gy8a, #gy8b, #gy8c", LE("s8b", 0.4), 0.5);
// order intake end to end
show("#x8a", W("s8c", 4), { y: 16, s: 0.7, d: 0.5 }); fade("#y8a", W("s8c", 8), 0.4);
show("#x8b", W("s8c", 9), { y: 16, s: 0.7, d: 0.5 }); fade("#y8b", W("s8cx", 0), 0.4);
show("#x8c", W("s8cx", 1), { y: 16, s: 0.7, d: 0.5 }); fade("#y8c", W("s8cx", 2), 0.4);
show("#x8d", W("s8cx", 3), { y: 16, s: 0.7, d: 0.5 }); fade("#y8d", W("s8cx", 6), 0.4);
show("#x8e", W("s8cx", 7), { y: 16, s: 0.7, d: 0.5 });
show("#m8", W("s8cx", 12), { y: 16, s: 0.7, d: 0.5 }); pulse("#m8", W("s8cx", 12) + 0.6, 1.1);
// build in your editor with a coding agent
show("#ed8", W("s8d", 4), { y: 30, s: 0.92, d: 0.7 });
draw("#a8", W("s8d", 10) - 0.2, 0.5);
show("#cl8a", W("s8d", 10), { y: 14, s: 0.7, d: 0.4 });
show("#cl8b", W("s8d", 12), { y: 14, s: 0.7, d: 0.4 });
show("#cl8c", W("s8d", 14), { y: 14, s: 0.7, d: 0.4 });
// probes, breakpoints, evaluation
fade("#pr8", W("s8e", 3), 0.4); show("#tp8", W("s8e", 3), { s: 0.6, d: 0.4 });
fade("#bk8", W("s8e", 5), 0.4); show("#tb8", W("s8e", 5), { s: 0.6, d: 0.4 });
show("#ea8", W("s8e", 7), { y: 14, s: 0.7, d: 0.5 });
show("#lv8", W("s8e", 12), { y: 14, s: 0.7, d: 0.5 }); pulse("#lv8", W("s8e", 12) + 0.5, 1.1);
// existing automation as nodes
show("#ex8a", W("s8f", 2), { y: 14, s: 0.7, d: 0.4 });
show("#ex8b", W("s8f", 3), { y: 14, s: 0.7, d: 0.4 });
show("#ex8c", W("s8f", 6), { y: 14, s: 0.7, d: 0.4 });
show("#ex8d", W("s8f", 10), { y: 14, s: 0.7, d: 0.5 }); pulse("#ex8d", W("s8f", 12), 1.06);
leave("s8");
