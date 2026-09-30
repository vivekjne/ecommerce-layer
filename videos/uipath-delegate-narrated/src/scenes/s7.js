// ===================== 7 · Turn data into a deliverable =====================
enter("s7");
prep("#b7a, #b7b, #pa7, #pb7, #pc7, #qa7, #qb7, #qc7, #sp7a, #sp7b");
tl.set("#rw7, #rwl7, #hg7, #hl7, #dv7, #dvl7, #sa7, #sb7, #sc7, #oa7, #ob7, #oc7, #rp7, #sl7, #ps7, #sr7, #ap7, #cp7a, #cp7b, #cp7c", { opacity: 0 }, 0);
tl.set("#hr7, #mn7, #bs7, #eye7, #x7, #fd7, #pe7, #bg7, #u7a, #u7b, #u7c, #cl7, #s7 .ok7, #s7 .tx7, #st7, #fm7, #o7a, #o7b, #o7c", { opacity: 0 }, 0);
tl.set("#s7 .bb7", { scaleY: 0, transformOrigin: "50% 100%" }, 0);

put("#sam", S("s7") + 0.1, 230, 890, 0.95, 1.2);
put("#dlg", S("s7") + 0.1, 450, 890, 1.0, 1.2);
face("#dlg", "n", S("s7") + 0.1);

// here's where the hours disappear: turning raw data into something you can send
show("#hg7", W("s7a", 3), { s: 0.5, d: 0.6 }); show("#hl7", W("s7a", 3) + 0.3, { y: 12, d: 0.5 });
tl.to("#hg7 svg", { rotation: 180, duration: 0.8, ease: "power2.inOut", transformOrigin: "50% 50%" }, W("s7a", 4));
show("#rw7", W("s7a", 6), { x: -30, s: 0.6, d: 0.6 }); show("#rwl7", W("s7a", 6) + 0.2, { y: 12, d: 0.5 });
draw("#b7a", W("s7a", 7), 0.5);
draw("#b7b", W("s7a", 9) - 0.3, 0.5);
show("#dv7", W("s7a", 9), { x: 30, s: 0.6, d: 0.6 }); show("#dvl7", W("s7a", 9) + 0.2, { y: 12, d: 0.5 });
mood("#sam", "sad", L("s7a", 0.5));

// point Delegate at a spreadsheet, a database export, or a folder of files
hide("#rw7, #rwl7, #hg7, #hl7, #dv7, #dvl7, #b7a, #b7b", L("s7b", -0.2), 0.4);
put("#dlg", L("s7b", -0.2), 960, 890, 1.3, 1.2);
mood("#sam", "happy", L("s7b", 0.5));
[["#sa7", "#pa7", 4], ["#sb7", "#pb7", 6], ["#sc7", "#pc7", 10]].forEach(([card, arrow, w]) => {
  show(card, W("s7b", w) - 0.1, { x: -40, s: 0.9, d: 0.6 }); draw(arrow, W("s7b", w) + 0.3, 0.6); nod("#dlg", W("s7b", w) + 0.5);
});
// ...and ask for a presentation, a proposal, or a report
[["#oa7", "#qa7", 4], ["#ob7", "#qb7", 6], ["#oc7", "#qc7", 9]].forEach(([card, arrow, w]) => {
  draw(arrow, W("s7c", w) - 0.3, 0.6); show(card, W("s7c", w), { x: 40, s: 0.9, d: 0.6 });
});
armUp("#sam", "r", L("s7c", 0.3), 120, 1.6);

// it pulls the relevant data, structures it, and applies your formatting
hide("#sa7, #sb7, #sc7, #oa7, #ob7, #oc7, #pa7, #pb7, #pc7, #qa7, #qb7, #qc7", L("s7d", -0.3), 0.4);
show("#rp7", L("s7d", -0.1), { x: -40, s: 0.95, d: 0.6 }); show("#sl7", L("s7d", -0.1), { x: 40, s: 0.95, d: 0.6 });
show("#ps7", W("s7d", 1), { y: 12, s: 0.8, d: 0.5 });
draw("#sp7a", W("s7d", 1) + 0.2, 0.6);
["#h7a", "#h7b", "#h7c"].forEach((sel, i) => tl.to(sel + " .skel", { backgroundColor: "#ffe28a", duration: 0.25 }, W("s7d", 3) + i * 0.25));
["#cp7a", "#cp7b", "#cp7c"].forEach((sel, i) => {
  show(sel, W("s7d", 3) + 0.4 + i * 0.2, { s: 0.5, d: 0.3 });
  route(sel, W("s7d", 3) + 0.8 + i * 0.2, [[1250, 500]], 0.7);
  tl.to(sel, { opacity: 0, scale: 0.4, duration: 0.2 }, W("s7d", 3) + 1.5 + i * 0.2);
});
$$("#s7 .bb7").forEach((b, i) => tl.to(b, { scaleY: 1, duration: 0.5, ease: "back.out(1.6)" }, W("s7d", 3) + 1.5 + i * 0.2));
show("#sr7", W("s7d", 5), { y: 12, s: 0.8, d: 0.5 });
draw("#sp7b", W("s7d", 5), 0.6);
fade("#st7", W("s7d", 5) + 0.2, 0.3);
$$("#s7 .tx7").forEach((t, i) => fade(t, W("s7d", 5) + 0.4 + i * 0.2, 0.3));
show("#ap7", W("s7d", 8), { y: 12, s: 0.8, d: 0.5 }); show("#fm7", W("s7d", 8), { y: 16, s: 0.8, d: 0.5 });
tl.to("#sh7", { backgroundColor: "#0b7a85", duration: 0.5 }, W("s7d", 10));
tl.to("#st7", { backgroundColor: "#ffffff", duration: 0.5 }, W("s7d", 10));
[["#sld7 .bb7:nth-child(1)", "#0b7a85"], ["#sld7 .bb7:nth-child(2)", "#ffc93c"], ["#sld7 .bb7:nth-child(3)", "#121a30"]].forEach(([sel, c]) => tl.to(sel, { backgroundColor: c, duration: 0.5 }, W("s7d", 10)));
pulse("#sl7", W("s7d", 10) + 0.3, 1.03);
typing("#dlg", W("s7d", 1), LE("s7d", 0.0));
face("#dlg", "h", W("s7d", 10));

// what used to take hours takes minutes
hide("#ps7, #sr7, #ap7, #sp7a, #sp7b", L("s7e", -0.2), 0.3);
show("#hr7", W("s7e", 4), { x: -20, s: 0.8, d: 0.5 });
show("#mn7", W("s7e", 6), { x: 20, s: 0.8, d: 0.5 }); pulse("#mn7", W("s7e", 6) + 0.4, 1.12);
// ...and you're editing a finished draft instead of staring at a blank slide
show("#pe7", W("s7f", 2), { s: 0.5, d: 0.4 });
tl.to("#pe7", { x: -120, y: 90, rotation: -10, duration: 0.9, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 100%" }, W("s7f", 2) + 0.4);
show("#fd7", W("s7f", 4), { y: 12, s: 0.8, d: 0.5 });
hide("#rp7, #hr7, #mn7", W("s7f", 6) - 0.2, 0.4);
show("#bs7", W("s7f", 6), { x: -40, s: 0.9, d: 0.6 }); blinkEl("#cr7", W("s7f", 6) + 0.6, W("s7f", 12), 0.5);
show("#eye7", W("s7f", 8), { y: 12, s: 0.8, d: 0.5 });
show("#x7", W("s7f", 11), { s: 0.3, d: 0.5 });
mood("#sam", "sad", W("s7f", 8)); mood("#sam", "happy", W("s7f", 12));

// the same idea powers the bigger enterprise use cases
hide("#sl7, #bs7, #x7, #eye7, #fd7, #pe7", L("s7g", -0.3), 0.4);
put("#dlg", L("s7g", -0.3), 960, 895, 0.75, 1.0); put("#sam", L("s7g", -0.3), 230, 890, 0.85, 1.0);
show("#bg7", W("s7g", 7), { y: 16, s: 0.8, d: 0.5 });
// 1 · generating process and solution design documents
show("#u7a", W("s7h", 0) - 0.1, { y: 30, s: 0.9, d: 0.7 });
show("#pg7a", W("s7h", 1), { y: 24, s: 0.6, d: 0.5 }); show("#pg7b", W("s7h", 3), { y: 24, s: 0.6, d: 0.5 });
// 2 · running application test cases
show("#u7b", W("s7h", 6) - 0.1, { y: 30, s: 0.9, d: 0.7 });
["a", "b", "c"].forEach((k, i) => {
  const t = W("s7h", 7) + i * 0.7;
  tl.to("#t7" + k + " .dt", { backgroundColor: "#06d6a0", duration: 0.25 }, t);
  fade("#t7" + k + " .ok7", t, 0.25); pulse("#t7" + k + " .ok7", t, 1.3);
});
// 3 · taking intake and triage off a clerical team's plate
show("#u7c", W("s7i", 1) - 0.1, { y: 30, s: 0.9, d: 0.7 });
["a", "b", "c"].forEach((k, i) => {
  tl.to("#i7" + k, { y: 40, scale: 0.4, opacity: 0, duration: 0.5, ease: "power2.in" }, W("s7i", 2) + i * 0.35);
  show("#o7" + k, W("s7i", 2) + 0.6 + i * 0.35, { y: -16, s: 0.6, d: 0.4 });
});
show("#cl7", W("s7i", 5), { y: 16, s: 0.8, d: 0.6 });
cheer("#sam", W("s7i", 7)); cheer("#dlg", W("s7i", 7) + 0.3);
leave("s7");
