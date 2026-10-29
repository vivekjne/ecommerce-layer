// ===================== 6 · Tools =====================
enter("s6");
prep("#z60, #z61, #z62, #z63");
tl.set("#cb6, #wo6, #wt6, #tl6, #lp6, #ls6, #eq6, #ex6, #e6i, #td6, #tn6, #y6x", { opacity: 0 }, 0);
tl.set("#cb6 .tok, #wo6 .tok, #wt6 .tok, #tr6 .tok, #ls6 .tok, #ls6 .ar, #ex6 .tok, #ex6 .ar, #td6 [id^=d6], #tn6 .tok", { opacity: 0 }, 0);
tl.set("#cb6, #ls6, #ex6, #tn6", { opacity: 1 }, 0);
// a chatbot vs an agent that can act
pop("#u6a", K("s6a", "chatbot")); fade("#y6x", K("s6a", "much") - 0.3, 0.3); pop("#u6b", K("s6a", "much"));
hide("#cb6", K("s6b", "without") - 0.3, 0.3);
// without tools / with tools
pop("#wo6", K("s6b", "without"), { y: 30, s: 0.9, d: 0.7 }); pop("#wo6a", K("s6b", "reason")); pop("#wo6b", K("s6b", "generate"));
pop("#wt6", K("s6c", "with"), { y: 30, s: 0.9, d: 0.7 }); pop("#wt6a", K("s6c", "actually"));
tl.to("#wt6a svg", { rotation: 360, duration: 2.0, ease: "power1.inOut", transformOrigin: "50% 50%" }, K("s6c", "actually"));
// what counts as a tool
fade("#tl6", K("s6d", "tools"), 0.4);
[[0, "s6d", "integration"], [1, "s6d", "published"], [2, "s6d", "apis"], [3, "s6dx", "custom"], [4, "s6dx", "other"], [5, "s6dx", "functions"], [6, "s6dx", "mcp"]].forEach(([i, ln, kw]) => pop("#t6" + i, K(ln, kw), { y: 14, d: 0.4 }));
// the execution loop, with a dot going round it
fade("#lp6", K("s6e", "loop"), 0.4);
const lst = [["s6f", "decides"], ["s6g", "prepares"], ["s6h", "executes"], ["s6i", "reads"], ["s6j", "decides"]];
lst.forEach(([ln, kw], i) => { pop("#l6" + i, K(ln, kw), { y: 14, d: 0.4 }); if (i) draw("#z6" + (i - 1), K(ln, kw) - 0.3, 0.3); });
trail("#d6", lst.map(([ln, kw], i) => ["#l6" + i, K(ln, kw) + 0.35]), 0.5);
// the example: an employee asks about a laptop request
hide("#wo6, #wt6, #tl6, #tr6, #lp6, #ls6", LE("s6j", 0.2), 0.5);
pop("#eq6", K("s6k", "employee"), { y: 24, s: 0.92, d: 0.7 });
typeText("#eqt6", "Can you check the status of my laptop request?", K("s6k", "can"), K("s6k", "request") + 0.5 - K("s6k", "can"));
pop("#e6a", K("s6l", "decide")); fade("#y6a", K("s6l", "assetmanagement") - 0.3, 0.3); pop("#e6b", K("s6l", "assetmanagement"));
pop("#e6i", K("s6m", "employee")); trail("#d6", [["#e6a", K("s6m", "passes")], ["#e6i", K("s6m", "employee") + 0.2], ["#e6b", K("s6m", "id") + 0.5]], 0.5);
fade("#y6b", K("s6n", "returns") - 0.3, 0.3); pop("#e6c", K("s6n", "status")); trail("#d6", [["#e6b", K("s6n", "returns") - 0.2], ["#e6c", K("s6n", "status") + 0.3]], 0.5);
fade("#y6c", K("s6o", "interprets") - 0.3, 0.3); pop("#e6d", K("s6o", "responds")); trail("#d6", [["#e6c", K("s6o", "interprets") - 0.2], ["#e6d", K("s6o", "responds") + 0.3]], 0.5);
// the tool description
pop("#td6", K("s6p", "tool"), { y: 30, s: 0.92, d: 0.7 });
fade("#d6a", K("s6p", "description") - 0.1, 0.4); fade("#d6b", K("s6p", "description") + 0.2, 0.4);
pop("#n6a", K("s6q", "documentation"), { x: 20, y: 0, s: 0.85 });
flash("#d6b", K("s6r", "what"), "rgba(255,255,255,0)", "#fff0b8"); pop("#n6b", K("s6r", "when"), { x: 20, y: 0, s: 0.85 });
fade("#d6c", K("s6s", "inputs") - 0.5, 0.4); fade("#d6d", K("s6s", "outputs") - 0.5, 0.4);
[["#d6a", "names"], ["#d6b", "descriptions"], ["#d6c", "inputs"], ["#d6d", "outputs"]].forEach(([sel, kw]) => flash(sel, K("s6s", kw), "rgba(255,255,255,0)", "#bfeff3"));
leave("s6");
