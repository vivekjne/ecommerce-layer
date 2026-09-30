// ===================== 13 · Recap, extension of what you have, and the call to action =====================
enter("s13");
prep("#up13, #pl13");
tl.set("#s13 .rc, #am13, #bn13, #dep13, #as13, #asl13, #dg13, #dgl13, #upl13, #pg13, #pgl13, #nt13a, #nt13b, #fin13, #rdy13, #lk13a, #lk13b, #lk13c, #sp13a, #sp13b, #sp13c", { opacity: 0 }, 0);
tl.set("#bn13a, #bn13b", { opacity: 0 }, 0);
tl.set("#dlg", { opacity: 1 }, S("s13") + 0.05);
place("#dlg", 2250, 900, 1.3, S("s13") + 0.04);
put("#sam", S("s13") + 0.1, 1400, 900, 1.3, 1.4);
put("#dlg", S("s13") + 0.1, 1560, 900, 1.3, 1.4);
face("#dlg", "h", S("s13") + 0.5);

// let's recap: the five capabilities, one per sentence
[["#rc13a", "s13b", 0, 4], ["#rc13b", "s13c", 0, 6], ["#rc13c", "s13d", 0, 7], ["#rc13d", "s13e", 0, 6], ["#rc13e", "s13f", 0, 11]].forEach(([sel, line, w0, wp]) => {
  show(sel, W(line, w0), { x: -40, s: 0.92, d: 0.6 });
  pulse(sel, W(line, wp), 1.03);
  tl.to(sel, { borderColor: "#0b7a85", duration: 0.3 }, W(line, w0) + 0.2);
});
cheer("#sam", W("s13b", 3)); nod("#dlg", W("s13c", 2)); nod("#dlg", W("s13d", 3)); nod("#dlg", W("s13e", 3));
show("#am13", W("s13f", 12), { x: -20, s: 0.8, d: 0.6 }); pulse("#am13", W("s13f", 15), 1.08);

// delegate the busywork, keep the judgment
hide("#s13 .rc, #am13, #s13 .eyebrow, #s13 h2", L("s13g", -0.3), 0.5);
put("#sam", L("s13g", -0.3), 760, 900, 1.6, 1.3);
put("#dlg", L("s13g", -0.3), 1160, 900, 1.6, 1.3);
fade("#bn13", L("s13g", 0.0), 0.3);
show("#bn13a", W("s13g", 0), { y: 30, s: 0.85, d: 0.7 });
show("#bn13b", W("s13g", 3), { y: 30, s: 0.85, d: 0.7 });
cheer("#sam", W("s13g", 3) + 0.2); cheer("#dlg", W("s13g", 3) + 0.5);

// if you're already on UiPath, Delegate ships as an extension of what you have
hide("#bn13", L("s13h", -0.2), 0.4);
put("#sam", L("s13h", -0.2), 1290, 900, 0.9, 1.0); put("#dlg", L("s13h", -0.2), 1500, 900, 0.9, 1.0);
show("#dep13", W("s13h", 2), { y: 30, s: 0.95, d: 0.8 });
show("#as13", W("s13h", 4), { s: 0.6, d: 0.7 }); show("#asl13", W("s13h", 4) + 0.3, { y: 12, d: 0.5 });
show("#pg13", W("s13h", 5), { x: 40, s: 0.6, d: 0.6 }); show("#pgl13", W("s13h", 9), { y: 12, d: 0.5 }); draw("#pl13", W("s13h", 8), 0.6);
// the UiPath Assistant upgrades into it, with no new IT approval and no new upgrade process
hide("#pg13, #pgl13, #pl13", L("s13i", 0.0), 0.4);
draw("#up13", W("s13i", 3), 0.7); show("#upl13", W("s13i", 3), { y: 12, d: 0.6 });
show("#dg13", W("s13i", 4), { s: 0.5, d: 0.7 }); show("#dgl13", W("s13i", 4) + 0.3, { y: 12, d: 0.5 }); pulse("#dg13", W("s13i", 4) + 0.7, 1.12);
show("#nt13a", W("s13i", 7), { x: 50, s: 0.9, d: 0.7 }); pulse("#nt13a", W("s13i", 10), 1.05);
show("#nt13b", W("s13i", 12), { x: 50, s: 0.9, d: 0.7 }); pulse("#nt13b", W("s13i", 15), 1.05);

// the end slide: links, and the first small step
hide("#dep13, #as13, #asl13, #dg13, #dgl13, #up13, #upl13, #nt13a, #nt13b", L("s13j", -0.3), 0.5);
put("#sam", L("s13j", -0.3), 230, 900, 1.5, 1.3); put("#dlg", L("s13j", -0.3), 1500, 900, 1.5, 1.3);
show("#fin13", L("s13j", 0.0), { y: 24, s: 0.92, d: 0.7 });
show("#lk13a", W("s13j", 1), { y: 20, s: 0.8, d: 0.6 });
show("#lk13b", W("s13j", 3), { y: 20, s: 0.8, d: 0.6 });
show("#lk13c", W("s13j", 5), { y: 20, s: 0.8, d: 0.6 });
show("#sp13a", W("s13k", 0), { x: -30, s: 0.85, d: 0.6 });
show("#sp13b", W("s13k", 3), { x: -30, s: 0.85, d: 0.6 });
show("#sp13c", W("s13k", 9), { x: -30, s: 0.85, d: 0.6 });
show("#rdy13", W("s13k", 11), { y: 24, s: 0.8, d: 0.9 });
cheer("#sam", W("s13k", 11)); cheer("#dlg", W("s13k", 11) + 0.3);
leave("s13");
