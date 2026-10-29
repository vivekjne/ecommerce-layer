// ===================== 8 · Memory =====================
enter("s8");
tl.set("#ep8, #es8, #ms8, #l8, #xh8", { opacity: 0 }, 0);
tl.set("#r8a .tok, #ep8 .tok, #es8 .tok, #ms8 .tok, #ms8 span", { opacity: 0 }, 0);
pop("#a8", K("s8a", "context")); pop("#b8", K("s8b", "memory"));
pop("#ep8", K("s8c", "episodic"), { y: 30, s: 0.9, d: 0.7 }); pop("#es8", K("s8c", "escalation"), { y: 30, s: 0.9, d: 0.7 });
// episodic memory keeps inputs, outputs, outcomes and feedback
[[0, "inputs"], [1, "outputs"], [2, "outcomes"], [3, "feedback"]].forEach(([i, kw]) => pop("#ek8" + i, K("s8dx", kw), { y: 10, d: 0.4 }));
pop("#e80", K("s8e", "previously")); pop("#e81", K("s8f", "similar")); pop("#e82", K("s8f", "guide"));
trail("#d8", [["#e80", K("s8e", "previously") + 0.3], ["#e81", K("s8f", "similar") + 0.4], ["#e82", K("s8f", "guide") + 0.4]], 0.6);
// escalation memory: an uncertain case, a human decision, reused later
pulse("#es8", K("s8g", "escalation"), 1.03); fade("#xh8", K("s8g", "escalation") + 0.2, 0.5);
pop("#x80", K("s8h", "uncertain")); pop("#x81", K("s8i", "human"));
pop("#x82", K("s8j", "similar")); trail("#d8b", [["#x80", K("s8h", "escalated")], ["#x81", K("s8i", "human") + 0.3], ["#x82", K("s8jx", "human") + 0.4]], 0.7);
// Memory Spaces, shared across agents
pop("#ms8", K("s8k", "memories"), { y: 30, s: 0.95, d: 0.7 });
["a", "b", "c"].forEach((k, i) => pop("#m8" + k, K("s8k", "shared") + i * 0.3, { y: 12, d: 0.4 }));
fade("#ms8 span", K("s8k", "agents") - 0.2, 0.5);
trail("#d8", [["#ms8", K("s8k", "shared")], ["#m8a", K("s8k", "shared") + 0.5], ["#m8b", K("s8k", "shared") + 0.9], ["#m8c", K("s8k", "agents") + 0.3]], 0.4);
// the broader idea
pop("#l8", K("s8mx", "learn"), { y: 16, s: 0.8, d: 0.6 }); pulse("#l8", K("s8mx", "experiences"), 1.05);
leave("s8");
