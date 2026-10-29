// ===================== 3 · Workspace =====================
enter("s3");
tl.set("#f3, #v3, #sy3, #s3t, #w3a, #w3b, #w3c, #w3d, #w3e, #w3f, #bp3, #bl3, #t3a, #t3b, #t3c", { opacity: 0 }, 0);
tl.set("#n3a, #n3b, #n3c", { opacity: 0 }, 0);
show("#f3", W("s3b", 11), { y: 30, s: 0.9, d: 0.7 }); pulse("#f3", W("s3c", 0) + 0.2, 1.03);
show("#v3", W("s3b", 13), { y: 30, s: 0.9, d: 0.7 });
["a", "b", "c"].forEach((k, i) => show("#n3" + k, W("s3d", 0) + 0.4 + i * 0.4, { x: -20, y: 0, s: 0.7, d: 0.5 }));
show("#sy3", W("s3e", 6), { s: 0.4, d: 0.5 }); tl.to("#sy3", { rotation: 360, duration: 1.2, ease: "power2.inOut" }, W("s3f", 0));
show("#s3t", W("s3f", 4), { y: 16, s: 0.85, d: 0.6 });
pulse("#v3", W("s3g", 3), 1.04); pulse("#f3", W("s3g", 7), 1.04);
// the other areas of the workspace
[["a", "s3h", 9], ["b", "s3h", 11], ["c", "s3h", 13], ["d", "s3hx", 0], ["e", "s3hx", 1], ["f", "s3hx", 4]].forEach(([k, ln, w]) => show("#w3" + k, W(ln, w), { x: 30, y: 0, s: 0.85, d: 0.5 }));
// the bottom panel
show("#bp3", W("s3i", 2), { y: 24, s: 0.95, d: 0.7 }); fade("#bl3", W("s3i", 3), 0.4);
show("#t3a", W("s3j", 0), { y: 14, s: 0.7, d: 0.5 }); show("#t3b", W("s3j", 2), { y: 14, s: 0.7, d: 0.5 }); show("#t3c", W("s3j", 4), { y: 14, s: 0.7, d: 0.5 });
leave("s3");
