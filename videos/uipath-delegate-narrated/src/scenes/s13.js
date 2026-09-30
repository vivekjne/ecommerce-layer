// ===================== 13 · Governed by design =====================
enter("s13");
prep("#in13, #out13");
tl.set("#op13, #ct13, #ctl13, #ap13, #apl13, #m13a, #m13b, #m13c, #m13d, #oc13a, #oc13b, #oc13c, #vt13, #ap13b, #ar13b, #ky13, #nv13, #tp13a, #tp13b, #tp13c, #rd13, #pe13a, #pe13b, #pe13c, #ar13d, #og13, #an13", { opacity: 0 }, 0);
tl.set("#rd13", { scaleX: 0 }, 0);
tl.set("#dlg", { opacity: 1 }, L("s13a", -0.02));
place("#dlg", 2250, 858, 1.3, L("s13a", -0.03));
put("#dlg", L("s13a", 0.0), 300, 858, 1.3, 1.5);
face("#dlg", "h", L("s13a", 1.5));
// governed by design
show("#ct13", W("s13a", 3), { y: 30, s: 0.95, d: 0.9 });
// every operation inherits the controls you already run
show("#op13", W("s13b", 1), { x: -30, s: 0.7, d: 0.5 }); draw("#in13", W("s13b", 1) + 0.3, 0.5);
tl.to("#op13", { x: 60, opacity: 0, duration: 0.7, ease: "power2.in" }, W("s13b", 1) + 1.0);
fade("#ctl13", W("s13b", 3), 0.6);
show("#ap13", W("s13b", 6), { s: 0.5, d: 0.6 }); show("#apl13", W("s13b", 6) + 0.3, { y: 12, d: 0.5 }); draw("#out13", W("s13b", 6) - 0.1, 0.5);
// Orchestrator: scheduling, queues, run management
show("#m13a", W("s13c", 0), { y: 30, s: 0.9, d: 0.7 });
show("#oc13a", W("s13c", 3), { x: -20, s: 0.8, d: 0.5 }); show("#oc13b", W("s13c", 4), { x: -20, s: 0.8, d: 0.5 }); show("#oc13c", W("s13c", 6), { x: -20, s: 0.8, d: 0.5 });
// credential vault: secrets brokered, never exposed to the agent
show("#m13b", W("s13d", 1), { y: 30, s: 0.9, d: 0.7 });
show("#vt13", W("s13d", 3), { s: 0.5, d: 0.5 }); show("#ap13b", W("s13d", 3) + 0.2, { s: 0.5, d: 0.5 }); fade("#ar13b", W("s13d", 3) + 0.3, 0.4);
show("#ky13", W("s13d", 7), { s: 0.5, d: 0.4 }); tl.to("#ky13", { x: 130, duration: 1.0, ease: "power1.inOut" }, W("s13d", 7) + 0.3);
show("#nv13", W("s13d", 9), { y: 14, s: 0.8, d: 0.6 }); shake("#nv13", W("s13d", 9) + 0.7, 6);
// AI Trust Layer: policy, redaction, model governance
show("#m13c", W("s13e", 1), { y: 30, s: 0.9, d: 0.7 });
show("#tp13a", W("s13e", 5), { y: 12, s: 0.8, d: 0.5 }); show("#tp13b", W("s13e", 6), { y: 12, s: 0.8, d: 0.5 }); show("#tp13c", W("s13e", 9), { y: 12, s: 0.8, d: 0.5 });
tl.set("#rd13", { opacity: 1 }, W("s13e", 6) + 0.3); tl.to("#rd13", { scaleX: 1, duration: 0.7, ease: "power2.out" }, W("s13e", 6) + 0.3);
// role-based access, mapped to your existing organization
show("#m13d", W("s13f", 1), { y: 30, s: 0.9, d: 0.7 });
["#pe13a", "#pe13b", "#pe13c"].forEach((sel, i) => show(sel, W("s13f", 6) + i * 0.25, { y: 12, s: 0.6, d: 0.5 }));
fade("#ar13d", W("s13f", 7), 0.4); show("#og13", W("s13f", 9), { x: 20, s: 0.8, d: 0.6 });
// all of it applies to every action, automatically
["#m13a", "#m13b", "#m13c", "#m13d"].forEach((sel, i) => { tl.to(sel, { borderColor: "#0b7a85", duration: 0.3 }, W("s13g", 0) + i * 0.2); pulse(sel, W("s13g", 0) + i * 0.2, 1.03); });
show("#an13", W("s13g", 7), { y: 16, s: 0.7, d: 0.6 });
cheer("#dlg", W("s13g", 4));
leave("s13");
