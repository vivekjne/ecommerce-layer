// ===================== 2 · What Delegate is =====================
enter("s2");
prep("#ar2a, #ar2b, #ar2c, #ar2d, #hb1, #hb2, #hb3, #hb4");
tl.set("#gp2, #cu2, #sb2, #bw2, #aw2, #cr2, #dn2, #fi2, #n2a, #n2b, #n2c, #n2d, #bc2a, #bc2b, #bld2, #lk2, #ul2, #ai2, #q2, #ok2", { opacity: 0 }, 0);
tl.set("#tl2a, #tl2b, #tl2c, #tl2d, #l2a, #l2b, #l2c, #l2d, #sb2a, #sb2b, #sb2c, #sb2d", { opacity: 0 }, 0);
tl.set("#wv2 i", { scaleY: 0.25 }, 0);
tl.set("#sbt2, #ty2", { textContent: "" }, 0);

// 1 · a general-purpose agent with computer use: you ask, it works across your browser and applications
put("#sam", S("s2") + 0.1, 190, 890, 1.0, 1.2);
put("#dlg", S("s2") + 0.1, 500, 890, 1.5, 1.2);
face("#dlg", "n", S("s2") + 0.1);
show("#gp2", W("s2a", 3), { x: -30, s: 0.8, d: 0.6 });
show("#cu2", W("s2a", 6), { x: -30, s: 0.8, d: 0.6 });
show("#sb2", L("s2b", 0.0), { y: 20, s: 0.9, d: 0.5 });
typeText("#sbt2", "Update the report and tell my team.", L("s2b", 0.2), 2.0);
nod("#dlg", W("s2b", 5));
show("#bw2", W("s2c", 4) - 0.2, { x: 40, s: 0.9, d: 0.6 });
show("#aw2", W("s2c", 7) - 0.2, { x: 40, s: 0.9, d: 0.6 });
show("#cr2", W("s2c", 2), { s: 0.5, d: 0.4 });
curTo("#cr2", W("s2c", 4), "#bt2", 0.8);
tl.to("#bt2", { scale: 0.9, duration: 0.15, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, W("s2c", 4) + 0.85);
curTo("#cr2", W("s2c", 7) + 0.2, "#cl2", 0.9);
tl.to("#cl2", { backgroundColor: "#7cf3b0", duration: 0.3 }, W("s2c", 10) - 0.1);
pulse("#cr2", W("s2c", 10) - 0.1, 1.3);
typing("#dlg", W("s2c", 2), W("s2c", 11));
show("#dn2", W("s2c", 12), { s: 0.3, d: 0.5 });
mood("#sam", "happy", W("s2c", 12)); face("#dlg", "h", W("s2c", 12));

// 2 · four ways to start
hide("#gp2, #cu2, #sb2, #bw2, #aw2, #cr2, #dn2", L("s2d", -0.3), 0.5);
put("#dlg", L("s2d", -0.3), 1540, 850, 1.6, 1.4);
put("#sam", L("s2d", -0.3), 125, 1043, 1, 1.0);
face("#dlg", "n", L("s2d", -0.3));
[["a", 5], ["b", 8], ["c", 11], ["d", 14]].forEach(([k, w]) => {
  show("#tl2" + k, W("s2d", w) - 0.1, { x: -50, d: 0.6 });
  show("#l2" + k, W("s2d", w), { x: -50, d: 0.6 });
  pulse("#l2" + k, W("s2d", w) + 0.3, 1.03);
});
typeText("#ty2", "Update the report…", W("s2d", 5) + 0.3, 1.1);
draw("#ar2a", W("s2d", 7) + 0.2, 0.6); nod("#dlg", W("s2d", 7) + 0.4);
wave("#wv2 i", W("s2d", 8), W("s2d", 10) + 0.6);
draw("#ar2b", W("s2d", 10) + 0.2, 0.6); nod("#dlg", W("s2d", 10) + 0.4);
blinkEl("#rec2", W("s2d", 11), W("s2d", 13) + 0.4, 0.3);
move("#cm2", W("s2d", 11) + 0.1, 120, -4, 1.3);
draw("#ar2c", W("s2d", 13) + 0.2, 0.6); nod("#dlg", W("s2d", 13) + 0.4);
tl.to("#tp2a", { rotation: -12, duration: 0.6, ease: "back.out(2)", transformOrigin: "50% 100%" }, W("s2d", 15));
tl.to("#tp2c", { rotation: 12, duration: 0.6, ease: "back.out(2)", transformOrigin: "50% 100%" }, W("s2d", 15));
draw("#ar2d", W("s2d", 18) + 0.1, 0.6); nod("#dlg", W("s2d", 18) + 0.3);

// 3 · four ideas sit behind it
hide("#tl2a, #tl2b, #tl2c, #tl2d, #l2a, #l2b, #l2c, #l2d, #ar2a, #ar2b, #ar2c, #ar2d", L("s2e", -0.2), 0.5);
put("#dlg", L("s2e", 0.0), 960, 780, 1.7, 1.4);
show("#fi2", L("s2e", 0.5), { s: 0.6, d: 0.6 });
[["#n2a", "#hb1", "s2f", 1, 4, "#sb2a"], ["#n2b", "#hb2", "s2g", 1, 4, "#sb2b"], ["#n2c", "#hb3", "s2h", 1, 3, "#sb2c"], ["#n2d", "#hb4", "s2i", 2, 4, "#sb2d"]].forEach(([node, arrow, line, w, ws, sb]) => {
  draw(arrow, W(line, w), 0.7);
  show(node, W(line, w) + 0.5, { s: 0.6, d: 0.7 });
  fade(sb, W(line, ws), 0.5);
  nod("#dlg", W(line, w));
});
face("#dlg", "h", L("s2f", 0.0));
cheer("#dlg", W("s2i", 8));

// 4 · AI can remove busywork, but only if it knows how to work inside the enterprise
hide("#fi2, #n2a, #n2b, #n2c, #n2d, #hb1, #hb2, #hb3, #hb4", L("s2j", -0.2), 0.5);
put("#dlg", L("s2j", -0.2), 2200, 880, 1.25, 0.9);
tl.set("#dlg", { opacity: 0 }, L("s2j", 0.8));
put("#sam", L("s2j", -0.2), 190, 890, 1.0, 1.0);
mood("#sam", "sad", L("s2j", 0.4));
show("#ai2", L("s2j", 0.0), { x: -40, s: 0.6, d: 0.6 });
show("#bc2a", L("s2j", 0.2), { y: -30, s: 0.7, d: 0.5 }); show("#bc2b", L("s2j", 0.4), { y: -30, s: 0.7, d: 0.5 });
tl.to("#bc2a", { x: 140, y: 160, scale: 0.3, opacity: 0, duration: 0.6, ease: "power2.in" }, W("s2j", 2));
tl.to("#bc2b", { x: 60, y: 80, scale: 0.3, opacity: 0, duration: 0.6, ease: "power2.in" }, W("s2j", 3));
pulse("#ai2", W("s2j", 3) + 0.6, 1.2);
show("#bld2", W("s2j", 4), { x: 120, s: 0.9, d: 0.9 });
move("#ai2", W("s2j", 6), 520, 40, 1.7);
show("#lk2", W("s2j", 7), { s: 0.5, d: 0.5 });
shake("#ai2", W("s2j", 11), 10);
show("#q2", W("s2j", 12), { s: 0.4, d: 0.5 }); pulse("#lk2", W("s2j", 12), 1.25);
// that's the gap Delegate is built for: it gets through
tl.set("#dlg", { opacity: 1 }, L("s2j", 5.25));
place("#dlg", 2250, 860, 1.25, L("s2j", 5.24));
put("#dlg", L("s2j", 5.3), 1235, 860, 1.25, 1.5);
hide("#ai2, #q2", L("s2k", 0.0), 0.4);
face("#dlg", "h", L("s2k", 0.4));
tl.set("#ul2", { opacity: 1 }, L("s2k", 0.7)); tl.set("#lk2", { opacity: 0 }, L("s2k", 0.7)); pulse("#ul2", L("s2k", 0.7), 1.3);
tl.to("#door2", { scaleX: 0.12, svgOrigin: "210 465", duration: 0.7, ease: "power2.inOut" }, L("s2k", 0.9));
show("#ok2", L("s2k", 1.5), { s: 0.6, d: 0.6 });
mood("#sam", "happy", L("s2k", 1.5));
cheer("#sam", L("s2k", 1.7)); cheer("#dlg", L("s2k", 1.9));
leave("s2");
