// ===================== 10 · Guardrails =====================
enter("s10");
prep("#bd10");
tl.set("#fl10 .tok, #fl10 .ar, #fl10 #o10, #cl10, #ck10 .tok, #cm10, #ac10 .tok, #u10, #y10c, #b10", { opacity: 0 }, 0);
// agents that can act need boundaries: the guardrail sits between the agent and the tool
pop("#a10", K("s10a", "agents"));
fade("#y10a", K("s10b", "guardrails") - 0.3, 0.3); pop("#g10", K("s10b", "guardrails")); pulse("#g10", K("s10b", "important"), 1.08);
tl.set("#o10", { opacity: 1 }, 0);
// what to check before a tool runs
fade("#cl10", K("s10c", "check"), 0.5);
[[0, "s10d", "is", 0], [1, "s10d", "are", 0], [2, "s10d", "is", 1], [3, "s10e", "does", 0], [4, "s10e", "should", 0]].forEach(([i, ln, kw, n]) => {
  const t = K(ln, kw, n); pop("#k10" + i, t, { y: 12, d: 0.4 }); trail("#d10", [["#k10" + i, t + 0.1], ["#g10", t + 0.7]], 0.55);
});
// a request that passes goes through to the tool
fade("#y10b", K("s10f", "passes") - 0.3, 0.3);
trail("#d10", [["#a10", K("s10f", "request")], ["#g10", K("s10f", "guardrail") + 0.2], ["#p10", K("s10f", "execute") + 0.2]], 0.55);
pop("#p10", K("s10f", "passes"), { y: 14, s: 0.8 });
// one that does not is blocked or escalated
trail("#d10b", [["#a10", K("s10g", "doesn't") - 0.1], ["#g10", K("s10g", "doesn't") + 0.5], ["#f10", K("s10g", "block") + 0.3]], 0.55);
pop("#f10", K("s10g", "block"), { y: 14, s: 0.8 }); shake("#f10", K("s10g", "block") + 0.5, 6);
// where it matters most
fade("#cm10", K("s10h", "important"), 0.5);
[[0, "s10h", "update"], [1, "s10h", "send"], [2, "s10hx", "change"], [3, "s10hx", "trigger"]].forEach(([i, ln, kw]) => pop("#r10" + i, K(ln, kw), { y: 12, d: 0.4 }));
// autonomy is not unlimited access: it lives inside a boundary
pop("#u10", K("s10i", "unlimited")); shake("#u10", K("s10i", "unlimited") + 0.5, 6);
draw("#bd10", K("s10j", "inside") - 0.2, 1.6);
fade("#y10c", K("s10j", "clearly") - 0.2, 0.3); pop("#b10", K("s10j", "clearly"), { s: 0.8, d: 0.6 }); pulse("#b10", K("s10j", "boundaries"), 1.04);
leave("s10");
