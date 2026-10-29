// ===================== 4 · Data Manager =====================
enter("s4");
tl.set("#c4, #e4, #in4, #out4, #r4, #g4, #y4e", { opacity: 0 }, 0);
tl.set("#in4 .tok, #out4 .tok, #fl4 .tok, #fl4 .ar", { opacity: 0 }, 0);
pop("#c4", K("s4a", "contract"));
// what goes in, what comes out
pop("#in4", K("s4b", "receive"), { y: 30, s: 0.9, d: 0.7 });
pop("#out4", K("s4c", "return"), { y: 30, s: 0.9, d: 0.7 });
pulse("#in4", K("s4d", "data"), 1.03); pulse("#out4", K("s4d", "data") + 0.5, 1.03);
hide("#c4", K("s4e", "imagine") - 0.1, 0.3); pop("#e4", K("s4e", "imagine"));
[[0, "customer"], [1, "ticket"], [2, "priority"], [3, "document"]].forEach(([i, kw]) => pop("#ia" + i, K("s4f", kw), { y: 14, s: 0.7, d: 0.4 }));
[[0, "classification"], [1, "summary"], [2, "recommended"], [3, "final"]].forEach(([i, kw]) => pop("#oa" + i, K("s4g", kw), { y: 14, s: 0.7, d: 0.4 }));
// the flow: application -> input arguments -> agent -> output arguments -> next application; a dot carries the data
pop("#f4a", K("s4h", "application"), { y: 14 }); fade("#y4a", K("s4h", "input") - 0.3, 0.3);
pop("#f4b", K("s4h", "input"), { y: 14 }); fade("#y4b", K("s4h", "agent") - 0.3, 0.3);
pop("#f4c", K("s4h", "agent"), { y: 14 }); fade("#y4c", K("s4hx", "output") - 0.3, 0.3);
pop("#f4d", K("s4hx", "output"), { y: 14 }); fade("#y4d", K("s4hx", "next") - 0.3, 0.3);
pop("#f4e", K("s4hx", "next"), { y: 14 });
trail("#d4", [["#f4a", K("s4h", "application") + 0.3], ["#f4b", K("s4h", "input") + 0.4], ["#f4c", K("s4h", "agent") + 0.4], ["#f4d", K("s4hx", "output") + 0.4], ["#f4e", K("s4hx", "next") + 0.4]], 0.6);
// free-form text vs a clear contract
pop("#r4", K("s4i", "random")); shake("#r4", K("s4i", "random") + 0.5, 6);
fade("#y4e", K("s4j", "clearly") - 0.2, 0.3); pop("#g4", K("s4j", "clearly"), { s: 0.8, d: 0.6 });
leave("s4");
