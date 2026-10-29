// ===================== 7 · Context =====================
enter("s7");
tl.set("#hr7, #qb7, #k7, #p7, #z7", { opacity: 0 }, 0);
tl.set("#r7a .tok, #cg7 .tok, #fl7 .tok, #fl7 .ar", { opacity: 0 }, 0);
pop("#a7", K("s7a", "tools")); pop("#b7", K("s7b", "context"));
// an HR agent asked about leave
pop("#hr7", K("s7c", "hr")); pop("#qb7", K("s7c", "leave"), { x: -20, y: 0, d: 0.5 });
// not only what the LLM knows ...
pop("#k7", K("s7d", "llm"), { y: 24, s: 0.9, d: 0.6 }); shake("#k7", K("s7d", "knows"), 6);
// ... but our actual policy
pop("#p7", K("s7e", "company"), { y: 24, s: 0.9, d: 0.6 }); trail("#d7", [["#hr7", K("s7e", "use")], ["#p7", K("s7e", "policy") + 0.2]], 0.7);
// Context Grounding: the knowledge sources flow in
pop("#g7", K("s7f", "context")); pulse("#g7", K("s7f", "retrieve"), 1.06);
[[0, "s7g", "policies"], [1, "s7g", "product"], [2, "s7gx", "process"], [3, "s7gx", "internal"], [4, "s7gx", "business"]].forEach(([i, ln, kw]) => {
  const t = K(ln, kw); pop("#s7" + i, t, { y: 12, d: 0.4 }); trail("#d7", [["#s7" + i, t + 0.1], ["#g7", t + 0.7]], 0.6);
});
// the flow: request -> retrieve context -> enterprise knowledge -> grounded decision
pop("#f70", K("s7h", "user")); fade("#y70", K("s7h", "retrieve") - 0.3, 0.3);
pop("#f71", K("s7h", "retrieve")); fade("#y71", K("s7hx", "enterprise") - 0.3, 0.3);
pop("#f72", K("s7hx", "enterprise")); fade("#y72", K("s7hx", "grounded") - 0.3, 0.3);
pop("#f73", K("s7hx", "grounded"));
trail("#d7", [["#f70", K("s7h", "user") + 0.3], ["#f71", K("s7h", "retrieve") + 0.4], ["#f72", K("s7hx", "enterprise") + 0.4], ["#f73", K("s7hx", "grounded") + 0.4]], 0.6);
pop("#z7", K("s7j", "better"), { y: 20, s: 0.8, d: 0.7 }); pulse("#z7", K("s7j", "decisions"), 1.05);
leave("s7");
