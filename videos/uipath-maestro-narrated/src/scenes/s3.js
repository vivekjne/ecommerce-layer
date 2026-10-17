// ===================== 3 · Maestro Orchestrate =====================
enter("s3");

tl.set("#a3a, #a3b, #a3c, #a3d, #tr3, #g3a, #g3b, #g3c, #g3d, #g3e, #g3f, #g3g, #w3a, #w3b, #w3c, #n3a, #n3b, #f3a, #a3x, #f3b, #c3a, #c3b, #c3c, #e3", { opacity: 0 }, 0);
mood("#sam", "happy", S("s3") + 0.5);
show("#a3a", W("s3b", 2), { y: 20, s: 0.7, d: 0.5 });
show("#a3b", W("s3b", 4), { y: 20, s: 0.7, d: 0.5 });
show("#a3c", W("s3b", 6), { y: 20, s: 0.7, d: 0.5 });
show("#a3d", W("s3b", 8), { y: 20, s: 0.7, d: 0.5 });
// the long-running instance, with waits
show("#tr3", W("s3c", 2), { y: 24, s: 0.96, d: 0.6 });
show("#g3a", W("s3c", 3), { s: 0.6, d: 0.4 });
show("#g3b", W("s3c", 7), { s: 0.8, d: 0.5, origin: "0% 50%" });
show("#g3c", W("s3c", 8) + 0.3, { s: 0.6, d: 0.4 });
show("#g3d", W("s3c", 8) + 0.5, { s: 0.8, d: 0.5, origin: "0% 50%" });
show("#g3e", W("s3c", 10) + 0.1, { s: 0.6, d: 0.4 });
show("#g3f", W("s3c", 10) + 0.3, { s: 0.8, d: 0.5, origin: "0% 50%" });
show("#w3a", W("s3c", 16), { y: 12, s: 0.8, d: 0.4 });
show("#w3b", W("s3c", 18), { y: 12, s: 0.8, d: 0.4 });
show("#w3c", W("s3c", 21), { y: 12, s: 0.8, d: 0.4 });
// no cap, survives failures
show("#n3a", W("s3d", 3), { y: 20, s: 0.7, d: 0.5 });
show("#n3b", W("s3d", 7), { y: 20, s: 0.7, d: 0.5 });
show("#f3a", W("s3d", 11), { y: 20, s: 0.7, d: 0.5 }); shake("#f3a", W("s3d", 11) + 0.5, 6);
fade("#a3x", W("s3d", 13), 0.4);
show("#f3b", W("s3d", 13) + 0.2, { y: 20, s: 0.7, d: 0.5 });
show("#g3g", W("s3d", 13) + 0.5, { s: 0.6, d: 0.5 });
// pick a canvas
show("#c3a", W("s3e", 4), { y: 30, s: 0.85, d: 0.6 });
show("#c3b", W("s3e", 5), { y: 30, s: 0.85, d: 0.6 });
show("#c3c", W("s3e", 7), { y: 30, s: 0.85, d: 0.6 });
show("#e3", W("s3f", 6), { y: 20, s: 0.95, d: 0.7 });
pulse("#e3", W("s3f", 11), 1.04);
leave("s3");
