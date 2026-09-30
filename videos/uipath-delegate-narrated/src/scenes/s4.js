// ===================== 4 · Four ways to hand it work =====================
enter("s4");
prep("#ar4a, #ar4b, #ar4c, #ar4d");
tl.set("#bw4, #aw4, #cur4b, #cu4, #ba4, #pe4, #er4", { opacity: 0 }, 0);
tl.set("#wv4 i", { scaleY: 0.25 }, 0);
put("#dlg", L("s4a", 0.0), 1540, 850, 1.6, 1.5);
face("#dlg", "n", L("s4a", 0));
["a", "b", "c", "d"].forEach((k, i) => {
  show("#tl4" + k, L("s4a", 1.0 + i * 0.4), { x: -50, d: 0.7 });
  show("#l4" + k, L("s4a", 1.1 + i * 0.4), { x: -50, d: 0.7 });
});
// 1 · type a prompt
tl.set("#ty4", { textContent: "" }, 0);
typeText("#ty4", "Pull my case backlog…", L("s4b", 0.2), 1.1);
draw("#ar4a", L("s4b", 0.8), 0.7); nod("#dlg", L("s4b", 0.9));
pulse("#l4a", L("s4b", 0.0), 1.03);
// 2 · speak a command
wave("#wv4 i", L("s4c", 0.0), LE("s4c", 0.4));
draw("#ar4b", L("s4c", 0.8), 0.7); nod("#dlg", L("s4c", 0.9));
pulse("#l4b", L("s4c", 0.0), 1.03);
// 3 · record your screen
blinkEl("#rec4", L("s4d", 0.0), LE("s4d", 0.5), 0.3);
move("#cur4", L("s4d", 0.1), 120, -4, 1.3);
draw("#ar4c", L("s4d", 0.8), 0.7); nod("#dlg", L("s4d", 0.9));
pulse("#l4c", L("s4d", 0.0), 1.03);
// 4 · start from a template
tl.to("#tp4a", { rotation: -12, duration: 0.6, ease: "back.out(2)", transformOrigin: "50% 100%" }, L("s4e", 0.2));
tl.to("#tp4c", { rotation: 12, duration: 0.6, ease: "back.out(2)", transformOrigin: "50% 100%" }, L("s4e", 0.2));
draw("#ar4d", L("s4e", 0.9), 0.7); nod("#dlg", L("s4e", 1.0));
pulse("#l4d", L("s4e", 0.0), 1.03);
face("#dlg", "h", L("s4e", 1.2));
// general-purpose agent with computer use, across browsers and apps
hide("#ways4, #ar4a, #ar4b, #ar4c, #ar4d", L("s4f", 0.0), 0.6);
show("#bw4", L("s4f", 0.6), { x: -40 }); show("#aw4", L("s4f", 1.1), { x: 40 });
show("#cur4b", L("s4f", 1.6), { s: 0.5, d: 0.4 });
move("#cur4b", L("s4f", 2.0), -425, -30, 1.1);                       // to the Submit button
tl.to("#btn4", { scale: 0.9, duration: 0.15, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, L("s4f", 3.2));
move("#cur4b", L("s4f", 3.6), 745, 30, 1.0);                         // to a cell in the desktop app
tl.to("#cell4", { backgroundColor: "#7cf3b0", duration: 0.3 }, L("s4f", 4.7));
pulse("#cur4b", L("s4f", 4.7), 1.3);
show("#cu4", W("s4f", 10), { s: 0.6, d: 0.6 });
show("#ba4", W("s4f", 14), { y: 20, s: 0.7 });
typing("#dlg", L("s4f", 2.0), L("s4f", 5.0));
// programmatic execution, enterprise-grade reliability
show("#pe4", W("s4g", 2), { x: 40, s: 0.7 });
show("#er4", W("s4g", 4), { x: 40, s: 0.7 });
cheer("#dlg", L("s4g", 2.6));
leave("s4");
