// ===================== 14 · Recap =====================
enter("s14");
tl.set("#rc1, #rc2, #rc3, #fin14, #i14a, #i14b, #i14c, #i14d, #i14e, #g14a, #i14f, #i14g, #i14h, #i14i, #i14j, #i14k, #i14l", { opacity: 0 }, 0);
put("#sam", S("s14") + 0.4, 1370, 832, 1.5, 1.6);
put("#dlg", S("s14") + 0.4, 1610, 832, 1.45, 1.6);
face("#dlg", "h", L("s14a", 0.0)); face("#byte", "h", L("s14a", 0.0));
// hand it work: prompt, voice, screen recording, template
show("#rc1", L("s14b", 0.0), { x: -60, s: 0.95, d: 0.7 });
[["#i14a", 5], ["#i14b", 7], ["#i14c", 9], ["#i14d", 14]].forEach(([sel, w]) => { show(sel, W("s14b", w), { y: 16, s: 0.6, d: 0.5 }); pulse(sel, W("s14b", w) + 0.4, 1.1); });
waveArm("#sam", L("s14b", 1.0), 2);
// teach it once, share the skills
show("#rc2", L("s14c", 0.0), { x: -60, s: 0.95, d: 0.7 });
show("#i14e", W("s14c", 2), { y: 16, s: 0.6, d: 0.5 }); fade("#g14a", W("s14c", 5), 0.4);
[["#i14f", 6], ["#i14g", 8], ["#i14h", 10]].forEach(([sel, w]) => show(sel, W("s14c", w), { y: 16, s: 0.6, d: 0.5 }));
// stay in control: three modes, governance built in
show("#rc3", L("s14d", 0.0), { x: -60, s: 0.95, d: 0.7 });
[["#i14i", 2.0], ["#i14j", 2.3], ["#i14k", 2.6]].forEach(([sel, o]) => show(sel, L("s14d", o), { y: 16, s: 0.6, d: 0.5 }));
show("#i14l", W("s14d", 9), { y: 16, s: 0.6, d: 0.5 });
// the closing line
show("#fin14", L("s14e", 0.2), { s: 0.7, d: 0.7 });
cheer("#sam", L("s14e", 0.6)); cheer("#dlg", L("s14e", 0.9)); cheer("#byte", L("s14e", 1.2));
waveArm("#dlg", L("s14f", 0.2), 3); waveArm("#sam", L("s14f", 0.2), 3);
