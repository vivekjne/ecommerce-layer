// ===================== 6 · Flow =====================
enter("s6");
prep("#m6a, #m6b, #m6c, #m6d, #m6e, #z6a, #z6b");
tl.set("#w6, #n6a, #n6b, #n6c, #n6d, #n6e, #p6, #ca6, #rf6, #cc6, #fl6, #vs6, #gt6", { opacity: 0 }, 0);
show("#w6", W("s6a", 0) + 0.2, { y: 30, s: 0.95, d: 0.8 });
// agents, APIs, data, documents, human steps: all nodes on one canvas
[["a", 0], ["b", 1], ["c", 2], ["d", 3], ["e", 5]].forEach(([k, w]) => show("#n6" + k, W("s6b", w), { y: 18, s: 0.7, d: 0.5 }));
draw("#m6a", W("s6b", 1) - 0.3, 0.4); draw("#m6b", W("s6b", 2) - 0.3, 0.4); draw("#m6c", W("s6b", 3) - 0.3, 0.6); draw("#m6d", W("s6b", 5) - 0.3, 0.4);
// describe it and a coding agent builds it
show("#p6", W("s6c", 0), { y: 24, s: 0.92, d: 0.6 });
typeText("#pt6", "Build a refund flow. An agent checks the order, calls the payments API, a person approves.", W("s6c", 0) + 0.3, 3.0);
draw("#m6e", W("s6c", 6), 0.5);
show("#ca6", W("s6c", 6), { y: 18, s: 0.7, d: 0.5 }); pulse("#w6", W("s6c", 7) + 0.4, 1.02);
show("#rf6", W("s6c", 11), { y: 18, s: 0.7, d: 0.5 });
// same flow file: cloud canvas or VS Code, lives in Git
show("#fl6", W("s6d", 4), { y: 24, s: 0.85, d: 0.6 });
show("#cc6", W("s6d", 7), { y: 18, s: 0.7, d: 0.5 }); draw("#z6a", W("s6d", 7) + 0.2, 0.5);
show("#vs6", W("s6d", 11), { y: 18, s: 0.7, d: 0.5 }); draw("#z6b", W("s6d", 11) + 0.2, 0.5);
show("#gt6", W("s6d", 15), { y: 18, s: 0.7, d: 0.5 });
leave("s6");
