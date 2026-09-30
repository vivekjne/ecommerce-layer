// ===================== 5 · The support example =====================
enter("s5");
prep("#a51, #a52, #f55a, #f55b, #f55c, #f55d");
tl.set("#ro5a, #ro5b, #ro5c, #rt5, #rl5, #bb5, #e51, #e52, #e53, #e54, #e55", { opacity: 0 }, 0);
tl.set("#bp5", { textContent: "" }, 0);
tl.set("#s5 .l54", { opacity: 0 }, 0);

put("#sam", S("s5") + 0.1, 250, 885, 1.15, 1.2);
put("#dlg", S("s5") + 0.1, 545, 885, 1.2, 1.2);
face("#dlg", "n", S("s5") + 0.1);

// this pattern shows up across roles
["#ro5a", "#ro5b", "#ro5c"].forEach((sel, i) => show(sel, W("s5a", 3) + i * 0.2, { y: 30, s: 0.6, d: 0.5 }));
show("#rt5", W("s5a", 4), { y: 16, s: 0.8, d: 0.5 });
tl.to("#ro5a, #ro5b, #ro5c", { rotation: 6, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 50%" }, W("s5a", 5) - 0.2);
// in our support example: a Product Support Engineer, starting the day with one prompt
hide("#ro5a, #ro5b, #ro5c, #rt5", W("s5b", 4), 0.4);
show("#rl5", W("s5b", 5), { x: -30, s: 0.9, d: 0.6 });
headset("#sam", true, W("s5b", 5)); wobble("#sam", W("s5b", 6), 2, 4);
show("#bb5", W("s5b", 12), { y: 20, s: 0.9, d: 0.6 });
typeText("#bp5", "Pull my case backlog from Salesforce and prioritize the day.", L("s5c", 0.0), 4.2);
typing("#dlg", L("s5c", 0.6), W("s5d", 17));

// 1 · the backlog sorts itself into a plan for the day
fade("#e51", L("s5c", 0.0), 0.2);
fade("#w51", W("s5c", 3), 0.5);
["a", "b", "c", "d", "e"].forEach((k, i) => show("#r51" + k, W("s5c", 3) + 0.4 + i * 0.15, { x: -30, s: 0.95, d: 0.5 }));
const sortDy = { a: 176, b: 264, c: -176, d: 0, e: -264 };
Object.keys(sortDy).forEach((k) => { if (sortDy[k]) tl.to("#r51" + k, { y: sortDy[k], duration: 0.8, ease: "power2.inOut" }, W("s5c", 6)); });
$$("#w51 .nm").forEach((n, i) => tl.to(n, { opacity: 1, duration: 0.3 }, W("s5c", 7) + 0.3 + i * 0.12));
draw("#a51", W("s5c", 8), 0.5); show("#pl51", W("s5c", 8) + 0.3, { x: 40, s: 0.9, d: 0.7 });
face("#dlg", "h", W("s5c", 8));

// 2 · summarize the case in front of them
hide("#e51, #a51", L("s5d", 0.4), 0.4);
fade("#e52", L("s5d", 0.6), 0.3);
show("#c52", W("s5d", 2), { x: -20, s: 0.8, d: 0.5 });
show("#w52", W("s5d", 2) + 0.2, { x: -30, s: 0.9, d: 0.6 });
draw("#a52", W("s5d", 3), 0.5); show("#pn52", W("s5d", 3) + 0.3, { x: 40, s: 0.9, d: 0.6 });
// 3 · look up licensing data
hide("#e52, #a52", W("s5d", 9) - 0.3, 0.3);
fade("#e53", W("s5d", 9) - 0.2, 0.3);
show("#c53", W("s5d", 9), { x: -20, s: 0.8, d: 0.5 });
show("#w53", W("s5d", 9) + 0.1, { x: -30, s: 0.9, d: 0.6 });
show("#lc53", W("s5d", 11), { y: 30, s: 0.9, d: 0.6 });
// 4 · draft a first response
hide("#e53", W("s5d", 13) - 0.2, 0.3);
fade("#e54", W("s5d", 13) - 0.1, 0.3);
show("#c54", W("s5d", 14), { x: -20, s: 0.8, d: 0.5 });
show("#w54", W("s5d", 14) + 0.1, { x: -30, s: 0.9, d: 0.6 });
show("#pc54", W("s5d", 14) + 0.5, { s: 0.5, d: 0.3 });
$$("#s5 .l54").forEach((r, i) => {
  fade(r, W("s5d", 15) + i * 0.2, 0.2);
  if (i > 0) tl.to("#pc54", { y: "+=" + (i === 1 ? 46 : 32), duration: 0.2, ease: "power2.inOut" }, W("s5d", 15) + i * 0.2);
});
tl.to("#pc54", { rotation: -12, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", transformOrigin: "50% 100%" }, W("s5d", 15));

// all from one conversational surface, without switching tools
hide("#e54", L("s5e", -0.1), 0.3);
fade("#e55", L("s5e", 0.0), 0.2);
show("#ct55", L("s5e", 0.3), { s: 0.5, d: 0.7 }); show("#cl55", W("s5e", 3), { y: 16, d: 0.6 });
["a", "b", "c", "d"].forEach((k, i) => { const t = W("s5e", 3) + 0.2 + i * 0.25; show("#t55" + k, t, { s: 0.6, d: 0.5 }); draw("#f55" + k, t - 0.1, 0.5); });
show("#nt55", W("s5e", 5), { y: 16, s: 0.7, d: 0.5 }); shake("#nt55", W("s5e", 6), 8);
pulse("#ct55", W("s5e", 7), 1.12);
mood("#sam", "happy", L("s5e", 0.0));
cheer("#sam", W("s5e", 6)); cheer("#dlg", W("s5e", 6) + 0.3);
headset("#sam", false, SE("s5") - 0.5);
leave("s5");
