// ===================== 10 · Way 3: SOPs & automations =====================
enter("s10");
prep("#c10a, #c10b, #c10c, #c10d");
tl.set("#h10a, #h10b, #pc10a, #pc10b, #n10a, #n10b, #n10c, #n10d", { opacity: 0 }, 0);
put("#sam", L("s10a", 0.0), 125, 1043, 1, 1.2);
put("#dlg", L("s10a", 0.0), 960, 850, 1.35, 1.5);
face("#dlg", "n", L("s10a", 0.0));
// attach your SOPs, and invoke automations
show("#h10a", W("s10a", 3), { y: 20, s: 0.8, d: 0.6 }); show("#h10b", W("s10a", 7), { y: 20, s: 0.8, d: 0.6 });
hide("#h10a, #h10b", L("s10b", -0.2), 0.4);
// reference your SOPs directly
draw("#c10a", W("s10b", 0) + 0.2, 0.7); show("#pc10a", W("s10b", 0) + 0.7, { s: 0.4, d: 0.5 }); show("#n10a", W("s10b", 1) + 0.4, { s: 0.6, d: 0.7 });
nod("#dlg", W("s10b", 1));
// link design documents for context
draw("#c10b", W("s10c", 0) + 0.2, 0.7); show("#pc10b", W("s10c", 0) + 0.7, { s: 0.4, d: 0.5 }); show("#n10b", W("s10c", 1) + 0.4, { s: 0.6, d: 0.7 });
nod("#dlg", W("s10c", 1));
// invoke deployed UiPath automations
draw("#c10d", W("s10d", 0) + 0.2, 0.7); show("#n10c", W("s10d", 1) + 0.4, { s: 0.6, d: 0.7 });
tl.to("#gr10", { rotation: 360, duration: 2.0, ease: "power1.inOut", transformOrigin: "50% 50%" }, W("s10d", 1) + 0.8);
face("#dlg", "h", W("s10d", 1));
// view the complete task trail and history
draw("#c10c", W("s10e", 1), 0.7); show("#n10d", W("s10e", 1) + 0.4, { s: 0.6, d: 0.7 });
cheer("#dlg", L("s10e", 0.3));
leave("s10");
