// ===================== 2 · What makes an agent =====================
enter("s2");
prep("#q2a, #q2b, #q2c, #q2d, #q2e");
tl.set("#h2, #b2a, #b2b, #b2c, #b2d, #b2e, #i2", { opacity: 0 }, 0);
put("#sam", S("s2") + 0.1, 125, 1043, 1, 1.0);
show("#h2", W("s2b", 1), { y: 24, s: 0.9, d: 0.7 });
show("#i2", W("s2b", 3), { y: 16, s: 0.8, d: 0.6 });
[["a", "s2c"], ["b", "s2e"], ["c", "s2h"], ["d", "s2j"], ["e", "s2k"]].forEach(([k, ln], i) => {
  draw("#q2" + k, W(ln, 0), 0.6); show("#b2" + k, W(ln, 0) + 0.3, { y: 30, s: 0.85, d: 0.7 });
});
hide("#i2", LE("s2e", 0), 0.4);
// the simple mental model: highlight each block as it is named
[["a", "s2n"], ["c", "s2o"], ["b", "s2p"], ["e", "s2q"], ["d", "s2r"]].forEach(([k, ln]) => pulse("#b2" + k, W(ln, 0), 1.08));
leave("s2");
