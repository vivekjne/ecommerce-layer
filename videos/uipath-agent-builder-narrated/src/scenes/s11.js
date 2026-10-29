// ===================== 11 · Model settings =====================
enter("s11");
tl.set("#ms11, #lh11, #r11, #g11", { opacity: 0 }, 0);
tl.set("#ms11 [id^=m11], #lp11 .tok, #lp11 .ar", { opacity: 0 }, 0);
show("#ms11", W("s11b", 0), { y: 30, s: 0.92, d: 0.7 });
[[0, 8], [1, 10], [2, 12], [3, 15]].forEach(([i, w]) => { fade("#m11" + i, W("s11b", w), 0.5); });
tl.to("#kn11", { x: -110, duration: 1.4, ease: "power2.inOut" }, W("s11d", 5));
pulse("#m111", W("s11c", 1), 1.04); pulse("#m112", W("s11e", 0) + 0.3, 1.04); pulse("#m113", W("s11f", 0) + 0.3, 1.04);
tl.to("#tb11", { scaleX: 0.35, duration: 1.0, ease: "power2.inOut" }, W("s11e", 3));
tl.to(".dt11:nth-child(4), .dt11:nth-child(5)", { backgroundColor: "#0b7a85", duration: 0.4, stagger: 0.3 }, W("s11f", 4));
fade("#lh11", W("s11g", 0), 0.5);
[["l110", 0], ["l111", 1], ["l112", 7], ["l113", 10]].forEach(([id, w], i) => { show("#" + id, W("s11h", w), { y: 12, s: 0.8, d: 0.4 }); if (i) fade("#z11" + (i - 1), W("s11h", w) - 0.2, 0.3); });
fade("#z113", W("s11i", 0), 0.3); show("#l114", W("s11i", 0) + 0.2, { y: 12, s: 0.8, d: 0.5 });
show("#r11", W("s11j", 2), { y: 12, s: 0.8, d: 0.5 }); shake("#r11", W("s11j", 2) + 0.5, 6);
show("#g11", W("s11k", 0) + 0.2, { y: 12, s: 0.8, d: 0.6 });
leave("s11");
