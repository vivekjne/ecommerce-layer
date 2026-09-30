// ===================== 4 · Demo: tasks that cross systems =====================
enter("s4");
prep("#sy4a, #sy4b, #a41, #a42, #ch4, #m41, #m42, #m43, #m44, #df4a, #df4b, #df4c");
tl.set("#g41, #g42, #g43", { opacity: 0 }, 0);
tl.set("#pt41, #pt42, #pt43", { textContent: "" }, 0);
tl.set("#tk4", { opacity: 0 }, 0);
tl.set("#nm4 .rowi, #cw4 .rowi", { opacity: 0 }, 0);
tl.set("#s4 .l43", { opacity: 0 }, 0);
function bub4(n, t) {   // the active prompt is outlined in teal
  [1, 2, 3].forEach((k) => tl.to("#pb4" + k, { borderColor: k === n ? "#0b7a85" : "#1f2140", duration: 0.3 }, t));
}

put("#sam", S("s4") + 0.1, 230, 890, 0.9, 1.2);
put("#dlg", S("s4") + 0.1, 450, 890, 0.9, 1.2);
face("#dlg", "h", S("s4") + 0.1);
show("#cv4", L("s4a", 0.3), { y: 30, s: 0.95, d: 0.7 });

// tasks that cross systems
show("#cs40", W("s4b", 8), { y: 16, s: 0.8, d: 0.5 });
[["#sx4a", "", 9], ["#sx4b", "#sy4a", 10], ["#sx4c", "#sy4b", 11]].forEach(([n, a, w], i) => {
  show(n, W("s4b", w) - 0.2 + i * 0.1, { y: 26, s: 0.6, d: 0.6 });
  if (a) draw(a, W("s4b", w) - 0.3 + i * 0.1, 0.5);
});
hide("#g40, #sy4a, #sy4b", L("s4c", -0.2), 0.4);

// 1 · pull a figure from a report, check the related CRM record: the whole chain
fade("#g41", L("s4c", -0.1), 0.2);
show("#pb41", L("s4c", 0.0), { y: 16, s: 0.9, d: 0.5 }); bub4(1, L("s4c", 0.0));
typeText("#pt41", "Pull a figure from the report and check the CRM record.", L("s4c", 0.3), 4.2);
typing("#dlg", L("s4c", 1.0), LE("s4e", 0.0));
show("#rp4", W("s4c", 6) - 0.1, { x: -30, s: 0.9, d: 0.6 });
show("#s41", W("s4c", 8), { y: 12, s: 0.8, d: 0.5 }); pulse("#fg4", W("s4c", 7) + 0.3, 1.12);
show("#cr4", W("s4c", 11) - 0.1, { x: -30, s: 0.9, d: 0.6 });
show("#s42", W("s4c", 13), { y: 12, s: 0.8, d: 0.5 });
draw("#a41", W("s4c", 12), 0.5);
show("#fl4", W("s4c", 13) - 0.2, { s: 0.6, d: 0.4 });
route("#fl4", W("s4c", 13) + 0.2, [[1148, 470]], 1.0);
tl.to("#fc4", { backgroundColor: "#7cf3b0", duration: 0.3 }, W("s4c", 15));
fade("#tk4", W("s4c", 15), 0.3); pulse("#tk4", W("s4c", 15), 1.3);
hide("#fl4", W("s4c", 15) + 0.1, 0.3);
show("#ns4", W("s4d", 2), { x: -20, s: 0.8, d: 0.5 }); shake("#ns4", W("s4d", 3) + 0.2, 6);
draw("#ch4", W("s4e", 1), 0.9);
show("#wc4", W("s4e", 3), { y: 16, s: 0.8, d: 0.5 });
draw("#a42", W("s4e", 4), 0.5);
show("#an4", W("s4e", 8) - 0.1, { x: 40, s: 0.9, d: 0.7 }); pulse("#an4", W("s4e", 10), 1.05);
show("#pz4", W("s4e", 12), { y: 12, s: 0.8, d: 0.5 }); shake("#pz4", W("s4e", 13) + 0.2, 6);
face("#dlg", "h", W("s4e", 8));

// 2 · the morning routine: triage email and calendar
hide("#g41, #ch4, #a41, #a42", L("s4f", -0.3), 0.4);
fade("#g42", L("s4f", -0.1), 0.3);
show("#pb42", L("s4g", 0.0), { y: 16, s: 0.9, d: 0.5 }); bub4(2, L("s4g", 0.0));
typeText("#pt42", "Triage my email and calendar first thing.", L("s4g", 0.2), 3.0);
show("#am4", W("s4f", 2), { x: -20, s: 0.8, d: 0.5 });
show("#ml4", W("s4g", 6) - 0.1, { x: -30, s: 0.9, d: 0.6 });
show("#cd4", W("s4g", 8) - 0.1, { x: -30, s: 0.9, d: 0.6 });
typing("#dlg", W("s4g", 4), LE("s4h", 0.0));
show("#fn4", W("s4h", 1) - 0.1, { s: 0.5, d: 0.6 });
draw("#m41, #m42", W("s4h", 1) + 0.1, 0.5);
["f4a", "f4b", "f4e", "f4c", "f4d"].forEach((id, i) => {
  show("#" + id, W("s4h", 1) + 0.2 + i * 0.1, { s: 0.5, d: 0.3 });
  route("#" + id, W("s4h", 1) + 0.6 + i * 0.1, [[1162, 512]], 0.6);
  tl.to("#" + id, { opacity: 0, duration: 0.15 }, W("s4h", 1) + 1.2 + i * 0.1);
});
show("#nm4", W("s4h", 6), { x: 40, s: 0.9, d: 0.6 }); draw("#m43", W("s4h", 6), 0.5);
show("#cw4", W("s4h", 9), { x: 40, s: 0.9, d: 0.6 }); draw("#m44", W("s4h", 9), 0.5);
$$("#nm4 .rowi").forEach((r, i) => { fade(r, W("s4h", 7) + 0.3 + i * 0.3, 0.3); pulse(r, W("s4h", 7) + 0.3 + i * 0.3, 1.05); });
$$("#cw4 .rowi").forEach((r, i) => { fade(r, W("s4h", 10) + 0.3 + i * 0.3, 0.3); pulse(r, W("s4h", 10) + 0.3 + i * 0.3, 1.05); });
face("#dlg", "h", W("s4h", 12));

// 3 · draft a follow-up from what it found; you review, adjust the tone, and only then does anything get sent
hide("#g42, #m41, #m42, #m43, #m44", L("s4i", -0.3), 0.4);
fade("#g43", L("s4i", -0.1), 0.3);
show("#pb43", W("s4i", 6), { y: 16, s: 0.9, d: 0.5 }); bub4(3, W("s4i", 6));
typeText("#pt43", "Draft a follow-up message.", W("s4i", 7), 2.0);
["#fd4a", "#fd4b", "#fd4c"].forEach((sel, i) => show(sel, W("s4i", 3) + i * 0.3, { x: -20, s: 0.8, d: 0.5 }));
show("#dr4", W("s4i", 12), { x: 40, s: 0.9, d: 0.7 });
typing("#dlg", W("s4i", 10), LE("s4j", 0.0));
draw("#df4a, #df4b, #df4c", W("s4j", 4), 0.5);
show("#pc4", W("s4j", 1) + 0.2, { s: 0.5, d: 0.4 });
$$("#s4 .l43").forEach((r, i) => {
  fade(r, W("s4j", 1) + 0.3 + i * 0.4, 0.3);
  tl.to("#pc4", { y: "+=" + (i === 0 ? 50 : 27), duration: 0.35, ease: "power2.inOut" }, W("s4j", 1) + 0.3 + i * 0.4);
});
tl.to("#pc4", { rotation: -12, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", transformOrigin: "50% 100%" }, W("s4j", 1) + 0.3);
["#fd4a", "#fd4b", "#fd4c"].forEach((sel, i) => pulse(sel, W("s4j", 5) + i * 0.2, 1.1));
hide("#pc4", W("s4k", 0) - 0.1, 0.3);
show("#rv4", W("s4k", 1), { x: 30, s: 0.8, d: 0.5 });
tl.to("#kn4", { x: 150, duration: 1.1, ease: "power2.inOut" }, W("s4k", 3));
pulse("#dr4", W("s4k", 5) + 0.3, 1.02);
show("#sd4", W("s4k", 7), { y: 16, s: 0.8, d: 0.5 });
show("#gt4", W("s4k", 9), { x: -20, s: 0.8, d: 0.5 }); armUp("#sam", "r", W("s4k", 9), 130, 1.6); shake("#gt4", W("s4k", 10), 6);
show("#pl4", W("s4k", 11), { s: 0.5, d: 0.3 });
tl.to("#pl4", { x: 470, y: -110, scale: 0.8, duration: 1.0, ease: "power2.inOut" }, W("s4k", 11) + 0.3);
tl.to("#pl4", { opacity: 0, duration: 0.2 }, W("s4k", 11) + 1.3);
show("#st4", W("s4k", 12), { y: 12, s: 0.8, d: 0.5 });
cheer("#dlg", W("s4k", 12) + 0.3);
leave("s4");
