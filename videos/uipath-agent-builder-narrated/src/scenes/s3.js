// ===================== 3 · Workspace =====================
enter("s3");
prep("#j3a, #j3b");
tl.set("#f3, #v3, #sy3, #x3, #s3d, #s3t, #w3a, #w3b, #w3c, #w3d, #w3e, #w3f, #bp3, #bl3, #t3a, #t3b, #t3c, #n3a, #n3b, #n3c", { opacity: 0 }, 0);
pop("#f3", K("s3b", "form"), { y: 30, s: 0.9, d: 0.7 });
pop("#v3", K("s3b", "canvas"), { y: 30, s: 0.9, d: 0.7 });
// Form View: a structured configuration, filled in field by field
["a", "b", "c"].forEach((k, i) => grow("#ff3" + k, K("s3c", "structured") + i * 0.45, 0.7));
// Canvas View: a node-based picture of the same agent
pop("#n3a", K("s3d", "visual"), { x: -20, y: 0 }); pop("#n3b", K("s3d", "nodebased"), { x: -20, y: 0 }); pop("#n3c", K("s3d", "agent"), { x: -20, y: 0 });
trail("#d3", [["#n3a", K("s3d", "visual") + 0.4], ["#n3b", K("s3d", "nodebased") + 0.4], ["#n3c", K("s3d", "agent") + 0.4]], 0.5);
// not two agents: one definition
pop("#x3", K("s3e", "two")); shake("#x3", K("s3e", "two") + 0.5, 6); hide("#x3", K("s3f", "same") - 0.1, 0.3);
draw("#j3a", K("s3f", "same"), 0.6); draw("#j3b", K("s3f", "same"), 0.6); pop("#s3d", K("s3f", "same") + 0.2, { s: 0.8, d: 0.6 });
pop("#sy3", K("s3f", "same") + 0.3, { s: 0.4 });
// change one view and the other follows
flash("#fi3b", K("s3g", "change"), "#eef0fa", "#ffc93c");
tl.to("#sy3", { rotation: 360, duration: 1.2, ease: "power2.inOut" }, K("s3g", "synchronized"));
pulse("#n3b", K("s3g", "synchronized") + 0.5, 1.15); flash("#n3b", K("s3g", "synchronized") + 0.5, "#ffffff", "#ffc93c");
pop("#s3t", K("s3g", "synchronized") + 0.6);
// the other areas of the workspace
[["a", "s3h", "project"], ["b", "s3h", "data"], ["c", "s3h", "errors"], ["d", "s3hx", "properties"], ["e", "s3hx", "development"], ["f", "s3hx", "deployment"]].forEach(([k, ln, kw]) => pop("#w3" + k, K(ln, kw), { x: 30, y: 0, s: 0.85 }));
// the bottom panel and its three tabs
pop("#bp3", K("s3i", "bottom"), { y: 24, s: 0.95, d: 0.7 }); fade("#bl3", K("s3i", "bottom") + 0.2, 0.4);
pop("#t3a", K("s3j", "execution")); pop("#t3b", K("s3j", "history")); pop("#t3c", K("s3j", "evaluations"));
leave("s3");
