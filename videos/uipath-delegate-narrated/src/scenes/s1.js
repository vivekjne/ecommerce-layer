// ===================== 1 · Cold open =====================
prep("#wv1");
tl.set("#clk1, #w1a, #w1b, #w1c, #w1d, #cl1, #vs1, #nh1, #bw1, #fv1, #ss1, #ti1, #su1, #ch1a, #ch1b, #ch1c, #ap1", { opacity: 0 }, 0);
tl.set("#s1 .cf, #s1 .ap, #s1 .ml, #s1 .ev, #s1 .wn1, #s1 .kt1, #cks1 .ck", { opacity: 0 }, 0);
place("#sam", 190, 905, 0.95, 0);

// 8:55 on a Monday
show("#clk1", L("s1a", 0.0), { y: -30, s: 0.8, d: 0.6 });
pulse("#clk1", W("s1a", 1), 1.1);
mood("#sam", "sad", L("s1a", 0.6)); wobble("#sam", L("s1a", 0.8), 2, 4);

// the inbox fills up, the calendar clashes
show("#w1a", W("s1b", 1) - 0.2, { x: -60, s: 0.9, d: 0.6 });
["a", "b", "c", "d", "e", "f", "g"].forEach((k, i) => show("#m1" + k, W("s1b", 1) + 0.3 + i * 0.26, { y: -40, s: 0.95, d: 0.4 }));
[[0.4, "12"], [0.8, "27"], [1.2, "48"], [1.7, "99+"]].forEach(([o, n]) => { tl.set("#cnt1", { textContent: n }, W("s1b", 1) + o); pulse("#cnt1", W("s1b", 1) + o, 1.25); });
show("#w1b", W("s1b", 4) - 0.15, { y: 40, s: 0.9, d: 0.6 });
["a", "b", "c", "d", "e", "f"].forEach((k, i) => show("#e1" + k, W("s1b", 4) + 0.5 + i * 0.1, { s: 0.8, y: 10, d: 0.4 }));
const wn = $$("#s1 .wn1");
[["#e1a, #e1b", 7, 0], ["#e1c, #e1d", 7, 1], ["#e1e, #e1f", 8, 2]].forEach(([sel, w, i]) => {
  const t = W("s1b", w) + (i === 2 ? 0.05 : 0) + (i === 1 ? 0.3 : 0);
  tl.to(sel, { borderColor: "#d92d48", duration: 0.2 }, t);
  show(wn[i], t, { s: 0.3, d: 0.4 }); pulse(wn[i], t + 0.3, 1.25);
});
show("#cl1", W("s1b", 8), { y: 16, s: 0.7, d: 0.5 }); shake("#cl1", W("s1b", 8) + 0.5, 8);

// last quarter's number, checked against the CRM, before nine
show("#w1c", W("s1c", 3), { x: 60, s: 0.9, d: 0.6 }); pulse("#c1n", W("s1c", 5), 1.2);
show("#vs1", W("s1c", 6), { s: 0.5, d: 0.5 });
show("#w1d", W("s1c", 8) - 0.3, { x: 60, s: 0.9, d: 0.6 });
tl.set("#clkt1", { textContent: "Mon 8:59" }, W("s1c", 10));
tl.to("#clk1", { borderColor: "#d92d48", duration: 0.2 }, W("s1c", 10)); pulse("#clk1", W("s1c", 10), 1.15);
shake("#clk1", W("s1c", 10) + 0.5, 8);

// none of that is hard; it's just busywork spread across five apps
hide("#w1a, #w1b, #w1c, #w1d, #cl1, #vs1", L("s1d", -0.2), 0.5);
show("#nh1", L("s1d", 0.3), { y: 20, s: 0.7, d: 0.6 }); pulse("#nh1", W("s1d", 4), 1.1);
hide("#nh1", L("s1e", -0.2), 0.4);
mood("#sam", "happy", L("s1d", 0.4));
show("#bw1", W("s1e", 2), { y: 20, s: 0.7, d: 0.6 });
draw("#wv1", W("s1e", 2) + 0.2, 1.6);
["a", "b", "c", "d", "e"].forEach((k, i) => { show("#ap1" + k, W("s1e", 3) + i * 0.22, { y: 30, s: 0.6, d: 0.5 }); });
show("#fv1", W("s1e", 5), { y: 16, s: 0.7, d: 0.5 });
["a", "b", "c", "d", "e"].forEach((k, i) => tl.to("#ap1" + k, { rotation: i % 2 ? 4 : -4, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut", transformOrigin: "50% 50%" }, W("s1e", 7) + 0.2 + i * 0.05));

// what if you could hand it over in plain language: a Delegate session
hide("#ap1a, #ap1b, #ap1c, #ap1d, #ap1e, #wv1, #bw1, #fv1, #clk1", L("s1f", -0.3), 0.5);
tl.set("#dlg", { opacity: 1 }, L("s1f", -0.31));
place("#dlg", 2250, 890, 1.4, L("s1f", -0.32));
put("#dlg", L("s1f", 0.0), 1530, 890, 1.4, 1.3);
put("#sam", L("s1f", 0.0), 300, 890, 1.4, 1.3);
face("#dlg", "n", L("s1f", 0.0));
show("#ss1", L("s1f", 0.4), { y: 40, s: 0.92, d: 0.7 });
tl.set("#pr1", { textContent: "" }, 0);
typeText("#pr1", "Triage my inbox, fix my calendar, check the CRM.", L("s1f", 1.0), 2.4);
typing("#dlg", L("s1f", 3.4), L("s1f", 5.8));
const kt = $$("#s1 .kt1");
["a", "b", "c"].forEach((k, i) => {
  show("#k1" + k, W("s1f", 10) + i * 0.45, { x: -30, s: 0.95, d: 0.4 });
  fade(kt[i], W("s1f", 10) + 0.4 + i * 0.45, 0.25); pulse(kt[i], W("s1f", 10) + 0.4 + i * 0.45, 1.3);
});
show("#ap1", W("s1f", 15), { y: 16, s: 0.7, d: 0.5 });
armUp("#sam", "r", W("s1f", 15), 130, 1.6);
pulse("#ap1", W("s1f", 18), 1.12);
mood("#sam", "happy", W("s1f", 13)); face("#dlg", "h", W("s1f", 13));

// that's UiPath Delegate: the title card
hide("#ss1", L("s1g", -0.3), 0.5);
put("#sam", L("s1g", 0.0), 700, 900, 1.9, 1.5);
put("#dlg", L("s1g", 0.0), 1230, 900, 1.6, 1.5);
show("#ti1", L("s1g", 0.3), { y: 40, s: 0.9, d: 0.9 });
show("#su1", W("s1g", 4), { y: 20, d: 0.8 });
waveArm("#sam", W("s1g", 2), 3); waveArm("#dlg", W("s1g", 2) + 0.4, 3);
$$("#s1 .cf").forEach((el, i) => {
  show(el, L("s1g", 0.8 + i * 0.25), { s: 0.4, d: 0.7 });
  tl.to(el, { y: "-=26", duration: 2.2 + i * 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, L("s1g", 1.8 + i * 0.25));
});
pulse("#s1 .sub b", W("s1g", 12), 1.2);
cheer("#sam", W("s1g", 13)); cheer("#dlg", W("s1g", 13) + 0.3);

// the plan for the next ten minutes
show("#ch1a", W("s1h", 8), { y: 20, s: 0.7, d: 0.6 });
show("#ch1b", W("s1h", 11), { y: 20, s: 0.7, d: 0.6 });
show("#ch1c", W("s1h", 15), { y: 20, s: 0.7, d: 0.6 });
["#ch1a", "#ch1b", "#ch1c"].forEach((sel, i) => pulse(sel, [W("s1h", 8), W("s1h", 11), W("s1h", 15)][i] + 0.5, 1.1));
leave("s1");
