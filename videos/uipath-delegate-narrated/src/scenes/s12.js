// ===================== 12 · Governed by design =====================
enter("s12");
prep("#in13, #out13");
tl.set("#op13, #ct13, #ctl13, #ap13, #apl13, #m13a, #m13b, #m13c, #m13d, #oc13a, #oc13c, #vt13, #ap13b, #ar13b, #ky13, #nv13, #tp13a, #tp13b, #rd13, #pe13a, #pe13b, #pe13c, #ar13d, #og13, #bo12, #bi12", { opacity: 0 }, 0);
tl.set("#rd13", { scaleX: 0 }, 0);
tl.set("#dlg", { opacity: 1 }, S("s12") + 0.05);
place("#dlg", 2250, 858, 1.3, S("s12") + 0.04);
put("#dlg", S("s12") + 0.1, 300, 858, 1.3, 1.4);
face("#dlg", "h", S("s12") + 1.5);
// because Delegate ships on the UiPath platform...
show("#ct13", W("s12a", 5), { y: 30, s: 0.95, d: 0.9 });
fade("#ctl13", W("s12a", 6), 0.6);
// ...every operation inherits the controls you already run
show("#op13", W("s12a", 7), { x: -30, s: 0.7, d: 0.5 }); draw("#in13", W("s12a", 7) + 0.3, 0.5);
tl.to("#op13", { x: 60, opacity: 0, duration: 0.7, ease: "power2.in" }, W("s12a", 8) + 0.6);
show("#ap13", W("s12a", 12), { s: 0.5, d: 0.6 }); show("#apl13", W("s12a", 12) + 0.3, { y: 12, d: 0.5 }); draw("#out13", W("s12a", 12) - 0.1, 0.5);
// Orchestrator: scheduling and run management
show("#m13a", W("s12b", 0), { y: 30, s: 0.9, d: 0.7 });
show("#oc13a", W("s12b", 2), { x: -20, s: 0.8, d: 0.5 }); show("#oc13c", W("s12b", 4), { x: -20, s: 0.8, d: 0.5 });
// a credential vault: secrets never exposed to the agent
show("#m13b", W("s12c", 1), { y: 30, s: 0.9, d: 0.7 });
show("#vt13", W("s12c", 3), { s: 0.5, d: 0.5 }); show("#ap13b", W("s12c", 3) + 0.2, { s: 0.5, d: 0.5 }); fade("#ar13b", W("s12c", 3) + 0.3, 0.4);
show("#ky13", W("s12c", 4), { s: 0.5, d: 0.4 }); tl.to("#ky13", { x: 130, duration: 1.0, ease: "power1.inOut" }, W("s12c", 4) + 0.3);
show("#nv13", W("s12c", 6), { y: 14, s: 0.8, d: 0.6 }); shake("#nv13", W("s12c", 6) + 0.7, 6);
// the AI Trust Layer: policy and redaction
show("#m13c", W("s12d", 1), { y: 30, s: 0.9, d: 0.7 });
show("#tp13a", W("s12d", 5), { y: 12, s: 0.8, d: 0.5 }); show("#tp13b", W("s12d", 7), { y: 12, s: 0.8, d: 0.5 });
tl.set("#rd13", { opacity: 1 }, W("s12d", 7) + 0.3); tl.to("#rd13", { scaleX: 1, duration: 0.7, ease: "power2.out" }, W("s12d", 7) + 0.3);
// role-based access mapped to your organization
show("#m13d", W("s12e", 1), { y: 30, s: 0.9, d: 0.7 });
["#pe13a", "#pe13b", "#pe13c"].forEach((sel, i) => show(sel, W("s12e", 3) + i * 0.25, { y: 12, s: 0.6, d: 0.5 }));
fade("#ar13d", W("s12e", 4), 0.4); show("#og13", W("s12e", 6), { x: 20, s: 0.8, d: 0.6 });
// not bolted on, built in
show("#bo12", W("s12f", 1), { x: -20, s: 0.8, d: 0.5 });
["#m13a", "#m13b", "#m13c", "#m13d"].forEach((sel, i) => { tl.to(sel, { borderColor: "#0b7a85", duration: 0.3 }, W("s12f", 3) + i * 0.15); pulse(sel, W("s12f", 3) + i * 0.15, 1.03); });
show("#bi12", W("s12f", 3), { x: -20, s: 0.8, d: 0.6 });
cheer("#dlg", W("s12f", 3));
leave("s12");
