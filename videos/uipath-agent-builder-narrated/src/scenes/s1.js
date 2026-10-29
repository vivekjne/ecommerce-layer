// ===================== 1 · Intro =====================
const LF = (id, f) => T.lines[id].start + f * T.lines[id].dur;   // a point f of the way through a line
enter("s1");
tl.set("#c1a, #c1b, #c1c, #c1d, #c1e, #c1f, #c1g, #c1h, #p1a, #p1b, #p1c, #p1x, #p1y, #m1", { opacity: 0 }, 0);
place("#sam", 190, 895, 0.95, 0);
cheer("#sam", S("s1") + 0.6);
[["a", "s1b", 10], ["b", "s1b", 11], ["c", "s1b", 12], ["d", "s1b", 13], ["e", "s1bx", 0], ["f", "s1bx", 1], ["g", "s1bx", 3]].forEach(([k, ln, w]) => show("#c1" + k, W(ln, w), { y: 18, s: 0.6, d: 0.5 }));
show("#c1h", W("s1bx", 4), { y: 18, s: 0.7, d: 0.5 }); shake("#c1h", W("s1bx", 4) + 0.5, 6);
mood("#sam", "sad", W("s1bx", 4));
// simplify: the jumble straightens out
tl.to("#c1a, #c1b, #c1c, #c1d, #c1e, #c1f, #c1g", { rotation: 0, duration: 0.8, ease: "power2.inOut" }, W("s1c", 3));
hide("#c1h", W("s1c", 3), 0.4);
mood("#sam", "happy", W("s1c", 3));
show("#p1a", W("s1d", 6), { y: 16, s: 0.7, d: 0.5 }); fade("#p1x", W("s1d", 12), 0.4);
show("#p1b", W("s1dx", 0), { y: 16, s: 0.7, d: 0.5 }); fade("#p1y", W("s1dx", 6), 0.4);
show("#p1c", W("s1dx", 8), { y: 16, s: 0.7, d: 0.5 });
show("#m1", W("s1e", 6), { y: 20, s: 0.8, d: 0.7 }); pulse("#m1", W("s1e", 8), 1.05);
leave("s1");
