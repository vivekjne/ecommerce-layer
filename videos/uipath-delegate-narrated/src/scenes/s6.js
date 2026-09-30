// ===================== 6 · Teach it by showing =====================
enter("s6");
prep("#ar6a, #ar6b, #ar6c, #ar6d, #ar6e, #ar6f");
tl.set("#lg6, #cr6, #cd6, #na6, #sc6, #bl6, #tk6, #fm6, #fl6, #ro6, #ks6, #or6, #pb6, #rec6, #rs6a, #rs6b, #rs6c", { opacity: 0 }, 0);
tl.set("#tg6, #dc6, #bk6, #bkl6, #in6, #pe6, #pel6, #lk6, #ul6, #tm6a, #tm6b, #tm6c, #sm6, #rb6, #a6a, #a6b, #a6c, #a6d, #s6 .ck6", { opacity: 0 }, 0);
tl.set("#ha6, #hb6", { opacity: 0 }, 0);

put("#sam", S("s6") + 0.1, 760, 890, 0.95, 1.2);
put("#dlg", S("s6") + 0.1, 2250, 890, 1.0, 0.8);
tl.set("#dlg", { opacity: 0 }, S("s6") + 1.0);

// some work can't be automated the usual way: an older system with no usable API
show("#lg6", W("s6a", 1), { x: -40, s: 0.9, d: 0.7 });
mood("#sam", "sad", W("s6a", 2)); wobble("#sam", W("s6a", 3), 2, 5);
show("#na6", W("s6b", 3), { y: 16, s: 0.7, d: 0.5 }); shake("#na6", W("s6b", 5) + 0.2, 8);
// ...and a full automation would cost more than the task is worth
show("#sc6", W("s6b", 6), { y: 30, s: 0.9, d: 0.7 });
tl.to("#ha6", { opacity: 1, duration: 0.4 }, W("s6b", 9));
tl.fromTo("#ha6", { y: -80 }, { y: 0, duration: 0.5, ease: "bounce.out", immediateRender: false }, W("s6b", 9));
show("#bl6", W("s6b", 10) + 0.3, { y: 16, s: 0.8, d: 0.5 });
tl.to("#bm6", { rotation: -7, svgOrigin: "500 100", duration: 0.9, ease: "power2.inOut" }, W("s6b", 12));
tl.to("#pl6", { y: 44, duration: 0.9, ease: "power2.inOut" }, W("s6b", 12));
tl.to("#pr6", { y: -44, duration: 0.9, ease: "power2.inOut" }, W("s6b", 12));
tl.to("#hb6", { opacity: 1, duration: 0.3 }, W("s6b", 16));
tl.fromTo("#hb6", { y: -60 }, { y: 0, duration: 0.4, ease: "bounce.out", immediateRender: false }, W("s6b", 16));
show("#tk6", W("s6b", 16) + 0.3, { y: 16, s: 0.8, d: 0.5 });
pulse("#bl6", W("s6b", 18), 1.1); pulse("#tk6", W("s6b", 18) + 0.2, 1.1);

// for that, you teach Delegate by showing it
hide("#sc6, #bl6, #tk6, #na6", L("s6c", -0.2), 0.4);
mood("#sam", "happy", W("s6c", 3));
tl.set("#dlg", { opacity: 1 }, W("s6c", 4) - 0.02);
place("#dlg", 2250, 890, 1.3, W("s6c", 4) - 0.03);
put("#dlg", W("s6c", 4), 1560, 890, 1.3, 1.3);
face("#dlg", "h", W("s6c", 4) + 1.2);
show("#fm6", W("s6c", 6), { s: 0.5, d: 0.6 }); show("#fl6", W("s6c", 7), { y: 12, d: 0.5 });
// record yourself doing the task once
fade("#rec6", W("s6d", 0), 0.3); blinkEl("#rec6", W("s6d", 0) + 0.3, LE("s6d", 0.0), 0.5);
show("#cr6", W("s6d", 1) - 0.2, { s: 0.5, d: 0.3 });
[["#fl6a", "#rs6a", 0.35, 80], ["#fl6b", "#rs6b", 0.85, 80], ["#sb6", "#rs6c", 1.35, 0]].forEach(([tgt, mk, o, dx]) => {
  curTo("#cr6", W("s6d", 1) + o - 0.4, tgt, 0.4, dx, 0);
  show(mk, W("s6d", 1) + o, { s: 0.3, d: 0.3 });
  pulse("#cr6", W("s6d", 1) + o, 1.25);
});
// Delegate turns the recording into a routine, or a knowledge skill
hide("#rec6", L("s6e", 0.2), 0.3);
pulse("#fm6", W("s6e", 3), 1.12);
draw("#ar6a", W("s6e", 5), 0.5); show("#ro6", W("s6e", 5) + 0.3, { x: 40, s: 0.9, d: 0.6 });
show("#or6", W("s6e", 7), { s: 0.6, d: 0.4 });
draw("#ar6b", W("s6e", 8), 0.5); show("#ks6", W("s6e", 9) - 0.1, { x: 40, s: 0.9, d: 0.6 });
typing("#dlg", W("s6e", 1), W("s6e", 11));
// ...that it can repeat on your behalf
hide("#cr6, #rs6a, #rs6b, #rs6c", W("s6e", 11), 0.3);
show("#pb6", W("s6e", 11) + 0.1, { x: 30, s: 0.8, d: 0.5 });
show("#cd6", W("s6e", 12), { s: 0.5, d: 0.3 });
[["#fl6a", 0.4], ["#fl6b", 0.9], ["#sb6", 1.4]].forEach(([tgt, o]) => {
  curTo("#cd6", W("s6e", 12) + o - 0.3, tgt, 0.35, tgt === "#sb6" ? 0 : 80, 0);
  if (tgt !== "#sb6") tl.to(tgt, { backgroundColor: "#7cf3b0", duration: 0.25 }, W("s6e", 12) + o);
  pulse("#cd6", W("s6e", 12) + o, 1.25);
});

// that's the idea behind a trainable sidekick: capture your expertise as a reusable playbook
hide("#lg6, #cd6, #fm6, #fl6, #ro6, #ks6, #or6, #pb6, #ar6a, #ar6b", L("s6f", -0.3), 0.5);
put("#dlg", L("s6f", -0.3), 450, 890, 1.0, 1.2);
put("#sam", L("s6f", -0.3), 230, 890, 1.0, 1.2);
show("#tg6", W("s6f", 5), { x: -20, s: 0.8, d: 0.5 });
show("#dc6", W("s6f", 8), { y: 30, s: 0.9, d: 0.7 });
["#a6a", "#a6b", "#a6c", "#a6d"].forEach((sel, i) => fade(sel, W("s6f", 9) + 0.2 + i * 0.35, 0.3));
draw("#ar6c", W("s6f", 12), 0.5); show("#bk6", W("s6f", 12) + 0.3, { s: 0.4, d: 0.7 }); show("#bkl6", W("s6f", 13), { y: 12, d: 0.5 });
face("#dlg", "h", W("s6f", 12));
// document a workflow once, and invoke it whenever you need it
pulse("#on6", W("s6g", 2), 1.25);
show("#in6", W("s6g", 5), { x: -20, s: 0.7, d: 0.6 }); tl.to("#in6 svg", { rotation: 360, duration: 1.2, ease: "power2.inOut", transformOrigin: "50% 50%" }, W("s6g", 5) + 0.4);
pulse("#bk6", W("s6g", 7), 1.1);

// skills aren't stuck with one person: share them across the team
hide("#dc6, #tg6, #in6, #ar6c", L("s6h", 0.0), 0.4);
show("#pe6", L("s6h", 0.2), { x: -20, s: 0.6, d: 0.5 }); show("#pel6", L("s6h", 0.4), { y: 12, d: 0.5 });
show("#lk6", W("s6h", 3), { s: 0.4, d: 0.5 }); shake("#lk6", W("s6h", 4), 6);
hide("#pe6, #pel6", W("s6i", 1), 0.4);
tl.set("#ul6", { opacity: 1 }, W("s6i", 2)); tl.set("#lk6", { opacity: 0 }, W("s6i", 2)); pulse("#ul6", W("s6i", 2), 1.3);
[["#tm6a", "#ar6d", 0], ["#tm6b", "#ar6e", 1], ["#tm6c", "#ar6f", 2]].forEach(([card, arrow, i]) => {
  draw(arrow, W("s6i", 3) + i * 0.4, 0.6); show(card, W("s6i", 3) + 0.3 + i * 0.4, { x: 40, s: 0.9, d: 0.6 });
});
$$("#s6 .ck6").forEach((c, i) => { fade(c, W("s6i", 9) + i * 0.25, 0.3); pulse(c, W("s6i", 9) + i * 0.25, 1.3); });
show("#sm6", W("s6i", 10), { y: 16, s: 0.7, d: 0.6 });
// nobody rebuilds what a colleague already taught it
hide("#ul6", W("s6j", 0), 0.3);
show("#rb6", W("s6j", 2), { y: 16, s: 0.8, d: 0.5 }); shake("#rb6", W("s6j", 3) + 0.3, 8);
cheer("#sam", W("s6j", 5)); cheer("#dlg", W("s6j", 5) + 0.3);
leave("s6");
