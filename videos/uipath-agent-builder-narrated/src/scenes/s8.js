// ===================== 8 · Memory =====================
enter("s8");
tl.set("#r8a, #ep8, #es8, #ms8, #l8", { opacity: 0 }, 0);
tl.set("#r8a .tok, #ep8 .tok, #es8 .tok, #ms8 .tok, #ms8 span", { opacity: 0 }, 0);
tl.set("#r8a", { opacity: 1 }, 0);
show("#a8", W("s8a", 0), { y: 16, s: 0.8, d: 0.5 }); show("#b8", W("s8b", 0), { y: 16, s: 0.8, d: 0.5 });
show("#ep8", W("s8c", 6), { y: 30, s: 0.9, d: 0.7 }); show("#es8", W("s8c", 9) - 0.2, { y: 30, s: 0.9, d: 0.7 });
show("#e80", W("s8d", 0) + 0.5, { y: 12, s: 0.8, d: 0.5 });
show("#e81", W("s8e", 0) + 0.2, { y: 12, s: 0.8, d: 0.5 });
show("#e82", W("s8f", 3), { y: 12, s: 0.8, d: 0.5 });
show("#x80", W("s8h", 4), { y: 12, s: 0.8, d: 0.5 });
show("#x81", W("s8i", 0), { y: 12, s: 0.8, d: 0.5 });
show("#x82", W("s8j", 3), { y: 12, s: 0.8, d: 0.5 });
show("#ms8", W("s8k", 0), { y: 30, s: 0.95, d: 0.7 });
["a", "b", "c"].forEach((k, i) => show("#m8" + k, W("s8k", 6) + i * 0.3, { y: 12, s: 0.7, d: 0.4 }));
fade("#ms8 span", W("s8k", 10), 0.5);
show("#l8", W("s8mx", 3), { y: 16, s: 0.8, d: 0.6 });
leave("s8");
