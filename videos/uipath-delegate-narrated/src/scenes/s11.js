// ===================== 11 · Allow and deny lists, permissions, audit trail, your data =====================
enter("s11");
tl.set("#al11, #dn11, #pm11, #au11, #pc11, #dt11, #lk11, #dl11, #s11 .ka11, #s11 .kd11, #s11 .l11", { opacity: 0 }, 0);
tl.set("#dlg", { opacity: 1 }, S("s11") + 0.05);
place("#dlg", 2250, 890, 1.0, S("s11") + 0.04);
put("#dlg", S("s11") + 0.1, 330, 890, 1.0, 1.4);
face("#dlg", "n", S("s11") + 0.1);
// allow and deny lists for apps and URLs
show("#al11", W("s11a", 4), { x: -30, s: 0.9, d: 0.7 }); show("#dn11", W("s11a", 6), { x: 30, s: 0.9, d: 0.7 });
const ka = $$("#s11 .ka11"), kd = $$("#s11 .kd11");
[[0, 9], [1, 11]].forEach(([i, w]) => {
  fade(ka[i], W("s11a", w), 0.3); pulse(ka[i], W("s11a", w), 1.3);
  fade(kd[i], W("s11a", w) + 0.25, 0.3); pulse(kd[i], W("s11a", w) + 0.25, 1.3);
});
nod("#dlg", W("s11a", 9)); shake("#dn11", W("s11a", 11) + 0.6, 8);
// granular permissions by task type
show("#pm11", W("s11a", 13), { y: 30, s: 0.9, d: 0.7 });
[["#kn11a", 70], ["#kn11b", 200], ["#kn11c", 130]].forEach(([sel, x], i) => tl.to(sel, { x: x, duration: 0.7, ease: "power2.inOut" }, W("s11a", 14) + i * 0.25));
// every action lands in an audit trail
show("#au11", L("s11b", 0.2), { y: 30, s: 0.9, d: 0.7 });
show("#pc11", W("s11b", 4), { s: 0.5, d: 0.4 });
$$("#s11 .l11").forEach((r, i) => {
  fade(r, W("s11b", 5) + i * 0.3, 0.3);
  tl.to("#pc11", { y: "+=" + (i ? 44 : 0), duration: 0.3, ease: "power2.inOut" }, W("s11b", 5) + i * 0.3);
});
tl.to("#pc11", { rotation: -12, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", transformOrigin: "50% 100%" }, W("s11b", 5));
// ...and your data stays in your control
show("#dt11", W("s11b", 8), { s: 0.5, d: 0.7 }); show("#lk11", W("s11b", 9), { s: 0.4, d: 0.5 }); show("#dl11", W("s11b", 9), { y: 12, d: 0.5 });
pulse("#dt11", W("s11b", 12), 1.1);
face("#dlg", "h", W("s11b", 9)); cheer("#dlg", W("s11b", 10));
leave("s11");
