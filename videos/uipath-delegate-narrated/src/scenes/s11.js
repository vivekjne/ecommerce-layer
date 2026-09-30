// ===================== 11 · Way 4: control access =====================
enter("s11");
tl.set("#al11, #dn11, #pm11, #au11, #pc11, #dt11, #lk11, #dl11, #s11 .ka11, #s11 .kd11, #s11 .l11", { opacity: 0 }, 0);
put("#dlg", L("s11a", 0.0), 330, 858, 1.2, 1.6);
face("#dlg", "n", L("s11a", 0.0));
// allow and deny lists for apps and URLs
show("#al11", W("s11b", 1), { x: -30, s: 0.9, d: 0.7 }); show("#dn11", W("s11b", 3), { x: 30, s: 0.9, d: 0.7 });
const ka = $$("#s11 .ka11"), kd = $$("#s11 .kd11");
[[0, 6], [1, 8]].forEach(([i, w]) => {
  fade(ka[i], W("s11b", w), 0.3); pulse(ka[i], W("s11b", w), 1.3);
  fade(kd[i], W("s11b", w) + 0.25, 0.3); pulse(kd[i], W("s11b", w) + 0.25, 1.3);
});
nod("#dlg", W("s11b", 6)); shake("#dn11", W("s11b", 8) + 0.6, 8);
// granular permissions by task type
show("#pm11", W("s11c", 0), { y: 30, s: 0.9, d: 0.7 });
[["#kn11a", 70], ["#kn11b", 200], ["#kn11c", 130]].forEach(([sel, x], i) => tl.to(sel, { x: x, duration: 0.7, ease: "power2.inOut" }, W("s11c", 2) + i * 0.25));
// every action is recorded in an audit trail
show("#au11", W("s11d", 0), { y: 30, s: 0.9, d: 0.7 });
show("#pc11", W("s11d", 4), { s: 0.5, d: 0.4 });
$$("#s11 .l11").forEach((r, i) => {
  fade(r, W("s11d", 5) + i * 0.4, 0.3);
  tl.to("#pc11", { y: "+=" + (i ? 44 : 0), duration: 0.3, ease: "power2.inOut" }, W("s11d", 5) + i * 0.4);
});
tl.to("#pc11", { rotation: -12, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", transformOrigin: "50% 100%" }, W("s11d", 5));
// your data stays in your control
show("#dt11", W("s11e", 2), { s: 0.5, d: 0.7 }); show("#lk11", W("s11e", 3), { s: 0.4, d: 0.5 }); show("#dl11", W("s11e", 3), { y: 12, d: 0.5 });
pulse("#dt11", W("s11e", 5), 1.1);
face("#dlg", "h", W("s11e", 3)); cheer("#dlg", W("s11e", 3));
leave("s11");
