// ===================== 6 · Why Delegate =====================
enter("s6");
prep("#pu6, #up6, #pl6, #cq6a, #cq6b, #cq6c");
tl.set("#g60, #g61, #g62, #g63, #g64", { opacity: 0 }, 0);
tl.set("#tk6a, #tk6b, #tk6c, #tk6d, #h61, #pr6, #pt6, #r1top, #r1base, #c61a, #c61b, #c61c, #r1cmp, #r1la, #r1eye, #r1wa, #r1ca, #r1xa, #r1lb, #r1gear, #r1wb, #r1cb, #r1kb", { opacity: 0 }, 0);
tl.set("#dep6, #as6, #asl6, #dg6, #dgl6, #upl6, #pg6, #pgl6, #nt6a, #nt6b, #pipe6, #gt6a, #gt6b, #gt6c, #gt6d, #gi6a, #gi6b, #gi6c, #gi6d, #gn6a, #gn6b, #gn6c, #gn6d, #op6, #dn6, #bo6, #bi6", { opacity: 0 }, 0);
tl.set("#cp6a, #cp6b, #cp6c, #cp6d, #cp6e", { opacity: 0 }, 0);
function trk(n, t) {
  ["#tk6a", "#tk6b", "#tk6c", "#tk6d"].forEach((sel, i) =>
    tl.to(sel, { backgroundColor: i + 1 === n ? "#0b7a85" : "#ffffff", color: i + 1 === n ? "#ffffff" : "#1f2140", duration: 0.35 }, t));
}
const on = (g, t) => tl.set(g, { opacity: 1 }, t);

// intro: why would a company choose it? productivity goes up ---------------------------------
on("#g60", L("s6a", 0.0));
show("#pr6", W("s6a", 7), { s: 0.5, d: 0.7 }); draw("#pu6", W("s6a", 8), 0.8); show("#pt6", W("s6a", 8), { y: 20, d: 0.7 });
hide("#g60", L("s6b", -0.2), 0.5);
[["#tk6a", 0.9], ["#tk6b", 1.3], ["#tk6c", 1.7], ["#tk6d", 2.1]].forEach(([sel, o]) => show(sel, L("s6b", o), { y: 16, d: 0.5 }));

// 1 · best-in-class UI automation -------------------------------------------------------
trk(1, L("s6c", 0.0));
show("#h61", L("s6c", 0.2), { y: 20, s: 0.8, d: 0.7 }); hide("#h61", W("s6d", 5) - 0.2, 0.4);
on("#g61", L("s6d", 0.0));
show("#r1base", W("s6d", 6), { y: 30, s: 0.9, d: 0.8 });
pulse("#r1base", W("s6d", 10), 1.04);
show("#r1cmp", W("s6e", 3), { y: 12, d: 0.6 });
// UIA hits the target, screen-only vision misses
show("#r1lb", W("s6e", 4), { x: 20, d: 0.6 }); show("#r1gear", W("s6e", 4), { s: 0.5, d: 0.6 });
show("#r1wb", W("s6e", 4) + 0.2, { x: 40, s: 0.9, d: 0.7 }); show("#r1cb", W("s6e", 4) + 0.6, { s: 0.5, d: 0.4 });
move("#r1cb", W("s6e", 6), 340, 40, 0.9);
show("#r1kb", W("s6e", 6) + 1.0, { s: 0.3, d: 0.5 });
show("#r1la", W("s6e", 10), { x: 20, d: 0.6 }); show("#r1eye", W("s6e", 10), { s: 0.5, d: 0.6 });
show("#r1wa", W("s6e", 10) + 0.2, { x: 40, s: 0.9, d: 0.7 }); show("#r1ca", W("s6e", 10) + 0.6, { s: 0.5, d: 0.4 });
move("#r1ca", W("s6e", 13), 450, 80, 1.1);
show("#r1xa", W("s6e", 13) + 1.3, { s: 0.3, d: 0.5 });
shake("#r1wa", W("s6e", 13) + 1.3, 6);
// skills, steering and multi-app orchestration on top
show("#r1top", L("s6f", 0.0), { y: -30, s: 0.9, d: 0.8 });
show("#c61a", W("s6f", 3), { x: -20, s: 0.8, d: 0.5 }); show("#c61b", W("s6f", 4), { x: -20, s: 0.8, d: 0.5 }); show("#c61c", W("s6f", 6), { x: -20, s: 0.8, d: 0.5 });

// 2 · built as an extension ------------------------------------------------------------
hide("#g61", L("s6g", -0.3), 0.5);
trk(2, L("s6g", 0.0));
on("#g62", L("s6g", 0.0));
show("#dep6", L("s6g", 0.4), { y: 30, s: 0.95, d: 0.8 });
show("#pg6", W("s6g", 6), { s: 0.5, d: 0.6 }); show("#pgl6", W("s6g", 6) + 0.3, { y: 12, d: 0.5 }); draw("#pl6", W("s6g", 6) + 0.4, 0.6);
show("#as6", W("s6g", 10), { s: 0.6, d: 0.7 }); show("#asl6", W("s6g", 10) + 0.3, { y: 12, d: 0.5 });
hide("#pg6, #pgl6, #pl6", L("s6h", 0.0), 0.4);
show("#nt6a", W("s6h", 5), { x: 50, s: 0.9, d: 0.7 }); pulse("#nt6a", W("s6h", 7), 1.05);
show("#nt6b", W("s6h", 9), { x: 50, s: 0.9, d: 0.7 }); pulse("#nt6b", W("s6h", 12), 1.05);
draw("#up6", W("s6i", 4), 0.7); show("#upl6", W("s6i", 4), { y: 12, d: 0.6 });
show("#dg6", W("s6i", 6), { s: 0.5, d: 0.7 }); show("#dgl6", W("s6i", 6) + 0.3, { y: 12, d: 0.5 }); pulse("#dg6", W("s6i", 6) + 0.7, 1.12);

// 3 · structural governance: an operation passes four built-in gates ---------------------------
hide("#g62", L("s6j", -0.3), 0.5);
trk(3, L("s6j", 0.0));
on("#g63", L("s6j", 0.0));
show("#pipe6", L("s6j", 0.3), { x: -40, s: 0.95, d: 0.8 });
show("#op6", L("s6j", 1.0), { x: -30, s: 0.7, d: 0.6 }); show("#dn6", L("s6j", 1.2), { x: 30, s: 0.7, d: 0.6 });
const gates = [["a", 6, 380], ["b", 8, 300], ["c", 10, 300], ["d", 13, 300]];
let acc = 0;
gates.forEach(([k, w, dx], i) => {
  const t = W("s6k", w);
  show("#gt6" + k, t - 0.4, { y: 30, s: 0.8, d: 0.6 }); show("#gi6" + k, t - 0.3, { y: -20, s: 0.7, d: 0.6 }); show("#gn6" + k, t - 0.2, { y: 12, d: 0.5 });
  move("#op6", t - 0.2, dx, 0, 0.9, "power1.inOut");
  tl.to("#gt6" + k, { backgroundColor: "#7cf3b0", duration: 0.25, yoyo: true, repeat: 1 }, t + 0.5);
  pulse("#gi6" + k, t + 0.5, 1.15);
});
hide("#op6", W("s6k", 15) + 0.8, 0.4);
pulse("#dn6", W("s6k", 15) + 1.0, 1.3);
show("#bi6", W("s6l", 2), { y: 20, s: 0.7, d: 0.6 });
show("#bo6", W("s6l", 5), { y: 20, s: 0.7, d: 0.6 }); shake("#bo6", W("s6l", 5) + 0.7, 8);

// 4 · more capacity ---------------------------------------------------------------------
hide("#g63", L("s6m", -0.3), 0.5);
trk(4, L("s6m", 0.0));
on("#g64", L("s6m", 0.0));
place("#dlg", 2250, 850, 1.3, L("s6m", -0.02));
tl.set("#dlg", { opacity: 1 }, L("s6m", -0.01));
put("#dlg", L("s6m", 0.0), 990, 850, 1.3, 1.6);
face("#dlg", "h", L("s6m", 1.6));
show("#cp6a", W("s6n", 0), { x: -40, s: 0.8, d: 0.6 }); draw("#cq6a", W("s6n", 0) + 0.4, 0.6);
show("#cp6b", W("s6n", 4), { x: -40, s: 0.8, d: 0.6 }); draw("#cq6b", W("s6n", 4) + 0.4, 0.6);
typing("#dlg", W("s6n", 0), W("s6n", 8));
put("#sam", W("s6n", 8) - 0.3, 1400, 850, 1.4, 1.3);
draw("#cq6c", W("s6n", 8), 0.6);
show("#cp6e", W("s6n", 9), { y: 20, s: 0.7, d: 0.6 });
show("#cp6c", W("s6n", 11), { s: 0.5, d: 0.7 }); show("#cp6d", W("s6n", 11) + 0.3, { y: 12, d: 0.6 });
cheer("#sam", W("s6n", 12));
leave("s6");
