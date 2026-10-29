// ===================== 2 · What makes an agent =====================
enter("s2");
prep("#q2a, #q2b, #q2c, #q2d, #q2e");
tl.set("#h2, #b2a, #b2b, #b2c, #b2d, #b2e, #n2a, #n2b, #n2c, #n2d, .mi", { opacity: 0 }, 0);
put("#sam", S("s2") + 0.1, 125, 1043, 1, 1.0);
pop("#h2", K("s2b", "agent"), { y: 24, s: 0.9, d: 0.7 });
// what an agent needs
[["a", "instructions"], ["b", "knowledge"], ["c", "capabilities"], ["d", "humans"]].forEach(([k, kw]) => pop("#n2" + k, K("s2b", kw)));
hide("#n2a, #n2b, #n2c, #n2d", K("s2c", "first") - 0.1, 0.4);
// one card per building block; a dot carries the agent's attention to each
const blk = [["a", "s2c", "prompt"], ["b", "s2e", "tools"], ["c", "s2h", "context"], ["d", "s2j", "escalations"], ["e", "s2k", "memory"]];
blk.forEach(([k, ln, kw]) => {
  const t = K(ln, kw);
  draw("#q2" + k, t - 0.3, 0.5); pop("#b2" + k, t, { y: 30, s: 0.85, d: 0.7 });
  trail("#d2", [["#h2", t - 0.45], ["#b2" + k, t + 0.1]], 0.55);
});
// the details inside each card, as they are spoken
[["a", 0, "s2d", "role"], ["a", 1, "s2d", "goal"], ["a", 2, "s2d", "instructions"], ["a", 3, "s2d", "constraints"], ["a", 4, "s2d", "expected"],
 ["b", 0, "s2g", "api"], ["b", 1, "s2g", "automation"], ["b", 2, "s2gx", "activity"], ["b", 3, "s2gx", "agent"], ["b", 4, "s2gx", "mcp"],
 ["c", 0, "s2i", "knowledge"], ["c", 1, "s2i", "reasoning"],
 ["d", 0, "s2jx", "approval"], ["d", 1, "s2jx", "review"], ["d", 2, "s2jx", "assistance"],
 ["e", 0, "s2l", "previous"], ["e", 1, "s2l", "past"], ["e", 2, "s2l", "future"]].forEach(([k, i, ln, kw]) => pop("#m2" + k + i, K(ln, kw), { y: 8, s: 0.9, d: 0.4 }));
// the mental model: each block lights up when it is named
[["a", "s2n", "prompt"], ["c", "s2o", "context"], ["b", "s2p", "tools"], ["e", "s2q", "memory"], ["d", "s2r", "escalations"]].forEach(([k, ln, kw]) => {
  const t = K(ln, kw); pulse("#b2" + k, t, 1.07); tl.to("#b2" + k, { borderColor: "#0b7a85", duration: 0.2 }, t); tl.to("#b2" + k, { borderColor: "#1f2140", duration: 0.4 }, t + 1.6);
});
leave("s2");
