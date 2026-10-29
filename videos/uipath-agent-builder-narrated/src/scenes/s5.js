// ===================== 5 · Prompts =====================
enter("s5");
tl.set("#sp5, #up5, #rf5, #a5, #b5, #y5", { opacity: 0 }, 0);
tl.set("#sp5 [id^=q5], #rf5 .tok", { opacity: 0 }, 0);
pop("#sp5", K("s5b", "system"), { y: 30, s: 0.92, d: 0.7 });
// what the system prompt should explain, one question at a time
[[0, "s5d", "who", 0], [1, "s5d", "what", 0], [2, "s5d", "constraints", 0], [3, "s5e", "when", 0], [4, "s5e", "when", 1], [5, "s5e", "when", 2], [6, "s5f", "final", 0]].forEach(([i, ln, kw, n]) => {
  const t = K(ln, kw, n); pop("#q5" + i, t, { x: -20, y: 0, s: 0.95, d: 0.5 }); flash("#q5" + i, t + 0.1, "rgba(255,255,255,0)", "#fff0b8", 0.25);
});
// the user prompt: the task for this run, typed as it is read out
pop("#up5", K("s5g", "user"), { y: 30, s: 0.92, d: 0.7 });
typeText("#pt5", "Analyse this incident and recommend the next action.", K("s5h", "analyse"), K("s5h", "action") + 0.5 - K("s5h", "analyse"));
// capabilities referenced from the prompt: each chip sends a dot to the system prompt
pop("#rf5", K("s5i", "reference"), { y: 30, s: 0.92, d: 0.7 });
[[0, "s5j", "inputs"], [1, "s5jx", "tools"], [2, "s5jx", "context"], [3, "s5jx", "memory"], [4, "s5jx", "escalations"], [5, "s5jx", "outputs"]].forEach(([i, ln, kw]) => {
  const t = K(ln, kw); pop("#x5" + i, t, { y: 12, d: 0.4 }); trail("#d5", [["#x5" + i, t + 0.1], ["#sp5", t + 0.6]], 0.5);
});
// the principle
pop("#a5", K("s5l", "only")); fade("#y5", K("s5m", "tell") - 0.2, 0.3);
pop("#b5", K("s5m", "tell"), { s: 0.8, d: 0.6 }); pulse("#b5", K("s5m", "capabilities"), 1.04);
leave("s5");
