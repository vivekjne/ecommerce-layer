// ===================== 9 · Escalations =====================
enter("s9");
prep("#a9a, #a9b, #a9c, #a9d, #a9e");
tl.set("#q9, #g9, #t9, #h9, #n9, #x9, #y9, #mt9", { opacity: 0 }, 0);
tl.set("#r9a .tok", { opacity: 0 }, 0);
// not every decision should be autonomous
pop("#o9", K("s9a", "autonomously")); shake("#o9", K("s9a", "autonomously") + 0.4, 6);
pop("#q9b", K("s9b", "human"));
hide("#o9, #q9b", K("s9c", "escalations") - 0.1, 0.3);
pop("#l9", K("s9d", "escalate"));
[["a", "approval"], ["b", "review"], ["c", "correction"], ["d", "exception"]].forEach(([k, kw]) => pop("#c9" + k, K("s9d", kw), { y: 12, d: 0.4 }));
// the refund example
pop("#q9", K("s9e", "refund")); draw("#a9a", K("s9e", "requests") - 0.2, 0.4); pop("#g9", K("s9e", "requests"), { s: 0.5 });
fade("#mt9", K("s9e", "requests"), 0.5);
// a small amount: through the top branch
tl.to("#mk9", { x: 100, duration: 1.2, ease: "power2.inOut" }, K("s9f", "below") - 0.6);
draw("#a9b", K("s9f", "below") - 0.3, 0.5); pop("#t9", K("s9f", "below"), { y: 14, s: 0.8, d: 0.6 });
trail("#d9", [["#q9", K("s9f", "below") - 0.5], ["#g9", K("s9f", "below") + 0.2], ["#t9", K("s9f", "automatically") + 0.2]], 0.5);
// a high amount: through the bottom branch, to a human first
tl.to("#mk9", { x: 300, duration: 1.2, ease: "power2.inOut" }, K("s9g", "high") - 0.6);
draw("#a9c", K("s9g", "high") - 0.3, 0.5); pop("#h9", K("s9g", "high"), { y: 14, s: 0.8, d: 0.6 }); pulse("#h9", K("s9g", "approve"), 1.06);
trail("#d9", [["#q9", K("s9g", "high") - 0.6], ["#g9", K("s9g", "high") + 0.1], ["#h9", K("s9g", "approve") + 0.2]], 0.5);
pop("#n9", K("s9g", "next")); draw("#a9d", K("s9g", "next") - 0.2, 0.6); draw("#a9e", K("s9g", "next") - 0.2, 0.6);
trail("#d9", [["#h9", K("s9g", "next") - 0.3], ["#n9", K("s9g", "happens")]], 0.6);
// human in the loop is not a failure
pop("#x9", K("s9i", "doesn't")); shake("#x9", K("s9i", "doesn't") + 0.5, 6);
pop("#y9", K("s9j", "intentionally"), { s: 0.8, d: 0.7 }); pulse("#y9", K("s9jx", "humans"), 1.04);
leave("s9");
