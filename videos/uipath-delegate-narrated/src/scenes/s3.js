// ===================== 3 · How it works: the loop =====================
enter("s3");
prep("#ta3a, #ta3b, #ta3c, #ua3a, #ua3b, #ua3c, #da3a, #da3b");
tl.set("#ws3, #st3a, #st3b, #st3c, #st3d, #lt3, #sf3, #sk3a, #sk3b, #sk3c, #uh3, #uc3a, #uc3b, #uc3c, #dc3a, #dc3b, #cx3, #gs3", { opacity: 0 }, 0);
tl.set("#in3, #lv3, #pb3, #nc3, #lg3a, #lg3b, #lg3c, #cb3a, #cb3b, #cb3c, #fb3, #tr3a, #tr3b, #tr3c, #ex3, #og3, #pl3, #cw3, #ey3, #cs3, #ap3", { opacity: 0 }, 0);
tl.set("#s3 .pr, #s3 .tc, #s3 .rk3", { opacity: 0 }, 0);
tl.set("#pbt3", { textContent: "" }, 0);
function act3(n, t) {
  ["a", "b", "c", "d"].forEach((k, i) => tl.to("#st3" + k, { backgroundColor: i + 1 === n ? "#0b7a85" : "#ffffff", color: i + 1 === n ? "#ffffff" : "#1f2140", duration: 0.3 }, t));
}
function row3(k, t, state) {   // "on" while the step runs, "done" when finished, "bad" while it heads the wrong way
  const c = { on: "#d3f5f8", done: "#d9f7ea", bad: "#ffe1e6" }[state];
  tl.to("#pr3" + k, { backgroundColor: c, duration: 0.25 }, t);
  tl.to("#pr3" + k, { borderColor: state === "bad" ? "#d92d48" : "#1f2140", duration: 0.25 }, t);
  if (state === "done") { fade("#pr3" + k + " .rk3", t, 0.25); pulse("#pr3" + k + " .rk3", t, 1.3); }
}

// the cast, small, at the bottom of the steps column
put("#sam", S("s3") + 0.1, 230, 890, 0.85, 1.2);
put("#dlg", S("s3") + 0.1, 440, 890, 0.85, 1.2);
face("#dlg", "n", S("s3") + 0.1);

// intro: the loop is the same every time
show("#ws3", L("s3a", 0.4), { y: 40, s: 0.95, d: 0.8 }); fade("#in3", L("s3a", 1.0), 0.5);

// 1 · you ask, in plain language, in a session
show("#st3a", L("s3b", 0.0), { x: -40, s: 0.9, d: 0.6 }); act3(1, L("s3b", 0.0));
show("#pb3", L("s3b", 0.5), { y: 20, s: 0.9, d: 0.5 });
typeText("#pbt3", "Update the pipeline report and email it to the team.", L("s3b", 0.8), 2.4);
typing("#sam", L("s3b", 0.8), L("s3b", 3.1));
show("#nc3", W("s3c", 1), { x: -20, s: 0.8, d: 0.5 }); shake("#nc3", W("s3c", 3) + 0.4, 6);
hide("#nc3", L("s3d", 0.0), 0.3);

// 2 · Delegate plans: steps, tools, pieces
show("#st3b", L("s3d", 0.0), { x: -40, s: 0.9, d: 0.6 }); act3(2, L("s3d", 0.0));
face("#dlg", "q", L("s3d", 0.0));
show("#pl3", W("s3e", 3), { y: 20, s: 0.95, d: 0.6 });
["a", "b", "c", "d"].forEach((k, i) => show("#pr3" + k, W("s3e", 4) + i * 0.25, { x: 30, s: 0.95, d: 0.4 }));
["a", "b", "c", "d"].forEach((k, i) => { fade("#pr3" + k + " .tc", W("s3e", 7) + i * 0.2, 0.3); pulse("#pr3" + k + " .tc", W("s3e", 7) + i * 0.2, 1.25); });
typing("#dlg", W("s3e", 3), W("s3e", 9));
show("#cw3", W("s3e", 12), { y: 12, s: 0.8, d: 0.5 });
[["a", -6], ["b", -2], ["c", 4], ["d", 10]].forEach(([k, dy]) => tl.to("#pr3" + k, { y: dy, duration: 0.5, ease: "power2.inOut" }, W("s3e", 13)));
face("#dlg", "h", W("s3e", 13));

// 3 · it acts, and it shows you; you can interrupt, correct or redirect
show("#st3c", L("s3f", 0.0), { x: -40, s: 0.9, d: 0.6 }); act3(3, L("s3f", 0.0));
show("#lv3", L("s3f", 0.3), { s: 0.6, d: 0.4 }); blinkEl("#lv3", L("s3f", 1.0), LE("s3h", 0.0), 0.6);
show("#cs3", W("s3f", 2), { s: 0.5, d: 0.4 });
typing("#dlg", W("s3f", 2), LE("s3g", 0.0));
row3("a", W("s3f", 2) + 0.2, "on"); fade("#lg3a", W("s3f", 2) + 0.3, 0.4);
curTo("#cs3", W("s3f", 2) + 0.3, "#pr3a .tc", 0.7, 6, 6);
row3("a", W("s3g", 0) - 0.3, "done");
hide("#cw3", W("s3g", 0) - 0.2, 0.3);
show("#ey3", W("s3g", 0), { y: 12, s: 0.8, d: 0.5 }); pulse("#ey3", W("s3g", 3), 1.12);
row3("b", W("s3g", 1), "on"); fade("#lg3b", W("s3g", 1) + 0.1, 0.4);
curTo("#cs3", W("s3g", 1), "#pr3b .tc", 0.7, 6, 6);
row3("b", W("s3g", 6) - 0.2, "done");
row3("c", W("s3h", 0) - 0.1, "on"); fade("#lg3c", W("s3h", 0), 0.4);
curTo("#cs3", W("s3h", 0) - 0.1, "#pr3c .tc", 0.7, 6, 6);
row3("c", W("s3h", 4), "bad"); shake("#pr3c", W("s3h", 4) + 0.2, 6);
show("#cb3a", W("s3h", 8), { y: 12, s: 0.7, d: 0.4 }); pulse("#cb3a", W("s3h", 8) + 0.3, 1.12);
show("#cb3b", W("s3h", 9), { y: 12, s: 0.7, d: 0.4 }); pulse("#cb3b", W("s3h", 9) + 0.3, 1.12);
show("#cb3c", W("s3h", 11), { y: 12, s: 0.7, d: 0.4 }); pulse("#cb3c", W("s3h", 11) + 0.3, 1.12);
row3("c", W("s3h", 14), "done");
face("#dlg", "a", W("s3h", 4)); face("#dlg", "h", W("s3h", 14));
armUp("#sam", "r", W("s3h", 8), 120, 1.6);

// ...and it learns from your feedback over time
hide("#ctl3, #cb3a, #cb3b, #cb3c", L("s3i", -0.1), 0.3);
show("#fb3", W("s3i", 4), { x: -20, s: 0.8, d: 0.5 });
["#sk3a", "#sk3b", "#sk3c"].forEach((sel, i) => {
  show(sel, W("s3i", 5) + i * 0.3, { s: 0.3, d: 0.5 });
  tl.to(sel, { y: "-=14", rotation: 20, duration: 0.7, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 50%" }, W("s3i", 5) + 0.6 + i * 0.3);
});
cheer("#dlg", W("s3i", 6));

// 4 · it stops when it should
show("#st3d", L("s3j", 0.0), { x: -40, s: 0.9, d: 0.6 }); act3(4, L("s3j", 0.0));
hide("#lg3a, #lg3b, #lg3c, #fb3, #ey3, #cs3, #sk3a, #sk3b, #sk3c, #pb3, #lv3, #pl3, #in3", L("s3j", 0.0), 0.4);
show("#ap3", L("s3j", 1.0), { y: 30, s: 0.85, d: 0.7 });
face("#dlg", "a", L("s3j", 1.0));
shake("#ap3", L("s3j", 1.8), 8);
[["#tr3a", "#ta3a", 2], ["#tr3b", "#ta3b", 4], ["#tr3c", "#ta3c", 8]].forEach(([tok, arrow, w]) => {
  show(tok, W("s3k", w), { x: -30, s: 0.8, d: 0.5 });
  draw(arrow, W("s3k", w) + 0.3, 0.6);
});
pulse("#ap3", W("s3k", 13), 1.05);
pulse("#al3", W("s3k", 15), 1.2);
armUp("#sam", "r", W("s3k", 15), 130, 1.6);
show("#ex3", W("s3l", 3), { x: -20, s: 0.8, d: 0.5 }); show("#og3", W("s3l", 6), { x: -20, s: 0.8, d: 0.5 });
pulse("#ex3", W("s3l", 4), 1.1); pulse("#og3", W("s3l", 8), 1.1);
show("#lt3", W("s3m", 2), { y: 12, s: 0.8, d: 0.5 });
show("#sf3", W("s3m", 12), { y: 12, s: 0.8, d: 0.5 }); pulse("#sf3", W("s3m", 13), 1.15);
face("#dlg", "h", W("s3m", 12));

// under the hood: UI automation, files, API calls
hide("#ws3, #in3, #st3a, #st3b, #st3c, #st3d, #lt3, #sf3, #ta3a, #ta3b, #ta3c", L("s3n", -0.4), 0.5);
put("#sam", L("s3n", -0.4), 125, 1043, 1, 1.0);
put("#dlg", L("s3n", -0.4), 960, 890, 1.3, 1.3);
show("#uh3", W("s3n", 1), { y: 16, s: 0.7, d: 0.6 });
[["#uc3a", "#ua3a", 5], ["#uc3b", "#ua3b", 7], ["#uc3c", "#ua3c", 9]].forEach(([c, a, w]) => {
  show(c, W("s3n", w), { y: 30, s: 0.85, d: 0.6 }); draw(a, W("s3n", w) + 0.3, 0.5); nod("#dlg", W("s3n", w));
});
// ...and you can attach your own SOPs and design documents, so it works from your context, not a guess
hide("#uh3, #uc3a, #uc3b, #uc3c, #ua3a, #ua3b, #ua3c", L("s3o", -0.2), 0.4);
show("#dc3a", W("s3o", 4), { x: -40, s: 0.85, d: 0.6 }); draw("#da3a", W("s3o", 6), 0.6);
show("#dc3b", W("s3o", 8), { x: 40, s: 0.85, d: 0.6 }); draw("#da3b", W("s3o", 10), 0.6);
show("#cx3", W("s3o", 13), { y: 20, s: 0.7, d: 0.6 }); face("#dlg", "h", W("s3o", 13));
show("#gs3", W("s3o", 17), { y: 16, s: 0.7, d: 0.5 }); shake("#gs3", W("s3o", 18), 8);
cheer("#dlg", W("s3o", 15));
leave("s3");
