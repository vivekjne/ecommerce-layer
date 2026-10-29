// ===================== 1 · Intro =====================
enter("s1");
tl.set("#c1a, #c1b, #c1c, #c1d, #c1e, #c1f, #c1g, #c1h, #p1a, #p1b, #p1c, #p1x, #p1y, #m1", { opacity: 0 }, 0);
place("#sam", 190, 895, 0.95, 0);
cheer("#sam", K("s1a", "welcome"));
// the concepts that feel like a lot: each pops as it is named, then drifts
[["a", "s1b", "prompts"], ["b", "s1b", "tools"], ["c", "s1b", "context"], ["d", "s1b", "memory"], ["e", "s1bx", "escalations"], ["f", "s1bx", "guardrails"], ["g", "s1bx", "evaluations"]].forEach(([k, ln, kw], i) => {
  pop("#c1" + k, K(ln, kw), { y: 18, s: 0.6 });
  tl.to("#c1" + k, { y: "+=8", duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K(ln, kw) + 0.7);
});
pop("#c1h", K("s1bx", "lot")); shake("#c1h", K("s1bx", "lot") + 0.5, 6);
mood("#sam", "sad", K("s1bx", "lot"));
// simplify: the jumble straightens out
tl.to("#c1a, #c1b, #c1c, #c1d, #c1e, #c1f, #c1g", { rotation: 0, duration: 0.8, ease: "power2.inOut" }, K("s1c", "simplify"));
hide("#c1h", K("s1c", "simplify"), 0.4);
mood("#sam", "happy", K("s1c", "simplify"));
// the journey: building blocks -> data, instructions, knowledge, tools -> debug, evaluate, deploy
pop("#p1a", K("s1d", "basic"));
pop("#p1b", K("s1d", "data")); fade("#p1x", K("s1d", "data") - 0.2, 0.3);
pop("#p1c", K("s1dx", "debug")); fade("#p1y", K("s1dx", "finally"), 0.3);
trail("#d1", [["#p1a", K("s1d", "basic") + 0.4], ["#p1b", K("s1d", "data") + 0.5], ["#p1c", K("s1dx", "debug") + 0.5]], 0.7);
pop("#m1", K("s1e", "clear"), { s: 0.8, d: 0.7 }); pulse("#m1", K("s1e", "mental"), 1.05);
leave("s1");
