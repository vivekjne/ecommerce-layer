// ===================== 11 · Model settings =====================
enter("s11");
tl.set("#ms11, #lh11, #r11, #g11", { opacity: 0 }, 0);
tl.set("#ms11 [id^=m11], #lp11 .tok, #lp11 .ar", { opacity: 0 }, 0);
pop("#ms11", K("s11a", "model"), { y: 30, s: 0.92, d: 0.7 });
// the four controls
[[0, "model", 0], [1, "temperature", 0], [2, "maximum", 0], [3, "maximum", 1]].forEach(([i, kw, n]) => { const t = K("s11b", kw, n); fade("#m11" + i, t, 0.5); pulse("#m11" + i, t + 0.3, 1.03); });
// temperature: deterministic <-> creative, and for business processes, low
tl.to("#kn11", { x: -110, duration: 0.9, ease: "power2.inOut" }, K("s11c", "deterministic"));
tl.to("#kn11", { x: 210, duration: 1.1, ease: "power2.inOut" }, K("s11c", "creative"));
tl.to("#kn11", { x: -90, duration: 1.2, ease: "power2.inOut" }, K("s11d", "lower"));
tl.to("#kn11", { backgroundColor: "#0a8a5f", duration: 0.4 }, K("s11dx", "consistent"));
// maximum tokens: the response grows up to the limit
tl.fromTo("#tb11", { scaleX: 0.15 }, { scaleX: 0.9, duration: 1.8, ease: "power1.inOut" }, K("s11e", "generate"));
// maximum iterations: one reasoning loop at a time
tl.to(".dt11", { backgroundColor: "#0b7a85", duration: 0.3, stagger: 0.5 }, K("s11f", "loops"));
// the loop itself, with a dot going round it
fade("#lh11", K("s11g", "loop"), 0.5);
const st = [["#l110", K("s11h", "think", 0)], ["#l111", K("s11h", "use")], ["#l112", K("s11h", "observe")], ["#l113", K("s11h", "think", 1)]];
st.forEach(([sel, t], i) => { pop(sel, t, { y: 12, s: 0.8, d: 0.4 }); if (i) fade("#z11" + (i - 1), t - 0.3, 0.3); });
fade("#z113", K("s11i", "continue") - 0.2, 0.3); pop("#l114", K("s11i", "continue"), { y: 12, s: 0.8, d: 0.5 });
trail("#d11", st.map(([sel, t]) => [sel, t + 0.3]).concat([["#l114", K("s11i", "completed") + 0.3]]), 0.5);
// more is not better: too many loops, then enough room
pop("#r11", K("s11j", "more"), { y: 12, s: 0.8, d: 0.5 }); shake("#r11", K("s11j", "more") + 0.5, 6);
tl.to(".dt11", { backgroundColor: "#d92d48", duration: 0.3, stagger: 0.1 }, K("s11j", "automatically"));
pop("#g11", K("s11k", "enough"), { y: 12, s: 0.8, d: 0.6 });
tl.to(".dt11:nth-child(n+4)", { backgroundColor: "#ffffff", duration: 0.4 }, K("s11k", "enough")); tl.to(".dt11:nth-child(-n+3)", { backgroundColor: "#0b7a85", duration: 0.4 }, K("s11k", "enough"));
leave("s11");
