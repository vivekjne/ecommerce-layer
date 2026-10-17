// ===================== 2 · Two products on one engine =====================
enter("s2");
prep("#s2l, #s2r");
tl.set("#au2, #or2, #en2, #d2a, #d2b", { opacity: 0 }, 0);
put("#sam", S("s2") + 0.1, 125, 1043, 1, 1.0);
show("#en2", W("s2a", 5), { y: 30, s: 0.95, d: 0.8 });
show("#d2a", W("s2a", 8), { s: 0.5, d: 0.5 }); show("#d2b", W("s2a", 9), { s: 0.5, d: 0.5 });
tl.to("#en2 svg", { rotation: 360, duration: 3, ease: "power1.inOut", transformOrigin: "50% 50%" }, W("s2a", 7));
show("#au2", W("s2b", 0), { y: 30, s: 0.9, d: 0.7 }); draw("#s2l", W("s2b", 1), 0.5);
show("#au2a", W("s2b", 7), { s: 0.6, d: 0.4 }); show("#au2b", W("s2b", 9), { s: 0.6, d: 0.4 });
pulse("#au2", W("s2b", 13), 1.03);
show("#or2", W("s2c", 0), { y: 30, s: 0.9, d: 0.7 }); draw("#s2r", W("s2c", 1), 0.5);
show("#or2a", W("s2c", 9), { s: 0.6, d: 0.4 }); show("#or2b", W("s2c", 10), { s: 0.6, d: 0.4 }); show("#or2c", W("s2c", 12), { s: 0.6, d: 0.4 });
pulse("#or2", W("s2c", 4), 1.03);
leave("s2");
