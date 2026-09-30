// ===================== 9 · Way 2: Routines =====================
enter("s9");
prep("#r9a, #r9b, #r9c, #r9d");
tl.set("#dc9, #bk9, #bl9, #bs9, #in9, #tm9a, #tm9b, #tm9c, #sm9, #tp9, #a9a, #a9b, #a9c, #a9d, #s9 .ck9", { opacity: 0 }, 0);
put("#sam", L("s9a", 0.0), 230, 858, 1.25, 1.2);
put("#dlg", L("s9a", 0.0), 520, 858, 1.2, 1.2);
face("#dlg", "q", L("s9a", 0.0));
// teach it skills, with Routines: Sam documents a workflow once
show("#dc9", W("s9a", 4), { y: 30, s: 0.9, d: 0.7 });
blinkEl("#rec9", W("s9a", 4) + 0.6, LE("s9b", 0.0), 0.5);
["#a9a", "#a9b", "#a9c", "#a9d"].forEach((sel, i) => fade(sel, L("s9b", 0.2 + i * 0.6), 0.4));
wobble("#sam", L("s9a", 2.0), 2, 4);
draw("#r9a", W("s9b", 7), 0.5);
show("#bk9", W("s9b", 7) + 0.4, { s: 0.4, d: 0.7 }); show("#bl9", W("s9b", 8), { y: 12, d: 0.5 }); show("#bs9", W("s9b", 8) + 0.2, { y: 12, d: 0.5 });
face("#dlg", "h", W("s9b", 8));
// document once, invoke it forever
pulse("#dc9", W("s9c", 3), 1.03);
show("#in9", W("s9c", 6), { x: -20, s: 0.7, d: 0.6 }); tl.to("#in9 svg", { rotation: 360, duration: 1.2, ease: "power2.inOut", transformOrigin: "50% 50%" }, W("s9c", 6) + 0.4);
// share skills across the team, for consistency
[["#tm9a", "#r9b", 0], ["#tm9b", "#r9c", 1], ["#tm9c", "#r9d", 2]].forEach(([card, arrow, i]) => {
  draw(arrow, W("s9d", 0) + i * 0.4, 0.6); show(card, W("s9d", 0) + 0.3 + i * 0.4, { x: 40, s: 0.9, d: 0.6 });
});
const ck9 = $$("#s9 .ck9");
ck9.forEach((c, i) => { fade(c, W("s9d", 5) + i * 0.25, 0.3); pulse(c, W("s9d", 5) + i * 0.25, 1.3); });
show("#sm9", W("s9d", 6), { y: 16, s: 0.7, d: 0.6 });
// custom skills always on tap
show("#tp9", W("s9e", 3), { y: 16, s: 0.7, d: 0.6 }); pulse("#tp9", W("s9e", 5), 1.1);
cheer("#sam", L("s9e", 0.3)); cheer("#dlg", L("s9e", 0.6));
leave("s9");
