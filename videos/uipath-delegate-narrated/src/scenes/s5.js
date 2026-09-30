// ===================== 5 · Use cases =====================
enter("s5");
prep("#p51a, #p51b, #p51c, #p51d, #p51e, #p53a, #p53b, #p53c, #fa5a, #fa5b, #fa5c, #fb5a, #fb5b, #fb5c");
tl.set("#h52, #h53, #h54, #fl5a, #fl5b, #c5a, #c5b, #c5c, #n51a, #n51b, #n51c, #n51d, #n51e, #n51f, #tg51, #v52, #v53, #v54", { opacity: 0 }, 0);
tl.set("#pA, #pB, #pC, #pD, #tg52, #fn5, #fl5, #i5a, #i5b, #i5c, #L5a, #L5b, #L5c, #tg53, #F5a, #F5b", { opacity: 0 }, 0);
tl.set("#pA .k5, #tk5, #bg5, #fk5a, #fk5b, #fk5c, #ft5a, #fp5a, #fp5b, #fp5c, #fd5, #fg5, #fu5, #mg5, #pc5", { opacity: 0 }, 0);
function chap(n, t) {
  [["#c5a", 1], ["#c5b", 2], ["#c5c", 3]].forEach(([sel, k]) =>
    tl.to(sel, { backgroundColor: k === n ? "#0b7a85" : "#ffffff", color: k === n ? "#ffffff" : "#1f2140", duration: 0.35 }, t));
}
// intro: three use cases
show("#c5a", W("s5a", 7), { y: 20, d: 0.6 }); show("#c5b", W("s5a", 9), { y: 20, d: 0.6 }); show("#c5c", W("s5a", 11), { y: 20, d: 0.6 });

// 1 · PDD & SDD generation: a pipeline ---------------------------------------------------
chap(1, L("s5b", 0.0));
tl.set("#dlg", { opacity: 1 }, L("s5b", -0.02));
place("#dlg", 2250, 852, 1.2, L("s5b", -0.03));
put("#dlg", L("s5b", 0.0), 700, 852, 1.2, 1.6);
show("#tg51", L("s5b", 1.4), { y: 20, d: 0.6 });
[["#n51a", 0], ["#n51b", 2], ["#n51c", 4], ["#n51d", 8]].forEach(([n, w], i) => {
  if (i > 0) draw(["#p51a", "#p51b", "#p51c"][i - 1], W("s5c", w) - 0.35, 0.5);
  show(n, W("s5c", w), { y: 26, s: 0.7, d: 0.6 });
});
typing("#dlg", L("s5c", 0.4), LE("s5d", -0.4));
draw("#p51d", W("s5d", 1), 0.8);
show("#n51e", W("s5d", 4), { y: 26, s: 0.7, d: 0.6 });
draw("#p51e", W("s5d", 8), 0.6);
show("#n51f", W("s5d", 9) + 0.3, { y: 26, s: 0.6, d: 0.7 });
pulse("#n51f", W("s5d", 11), 1.12);
face("#dlg", "h", L("s5d", 4.6));

// 2 · Application testing: four mini demos -----------------------------------------------
hide("#v51, #tg51", L("s5e", -0.4), 0.5);
put("#dlg", L("s5e", -0.4), 2250, 852, 1.2, 1.3);
tl.set("#dlg", { opacity: 0 }, L("s5e", 1.0));
chap(2, L("s5e", 0.0));
tl.set("#v52", { opacity: 1 }, L("s5e", 0.4));
show("#tg52", L("s5e", 1.0), { y: 20, d: 0.6 });
show("#h52", L("s5e", 0.3), { y: 20, s: 0.8, d: 0.7 }); hide("#h52", W("s5f", 0) - 0.5, 0.4);
const k5 = $$("#pA .k5");
show("#pA", W("s5f", 0), { y: 30, s: 0.9, d: 0.7 });
[0.9, 1.4, 1.9, 2.4].forEach((o, i) => { fade(k5[i], L("s5f", o), 0.25); pulse(k5[i], L("s5f", o), 1.3); });
show("#pB", W("s5f", 3), { y: 30, s: 0.9, d: 0.7 });
tl.to("#gr5", { rotation: 720, duration: 6, ease: "none", transformOrigin: "50% 50%" }, W("s5f", 3));
$$("#pB .dt5").forEach((d, i) => tl.to(d, { backgroundColor: "#06d6a0", duration: 0.25 }, W("s5f", 5) + 0.3 + i * 0.4));
show("#pC", W("s5f", 6), { y: 30, s: 0.9, d: 0.7 });
show("#mg5", W("s5f", 6) + 0.6, { s: 0.5, d: 0.4 });
move("#mg5", W("s5f", 6) + 1.0, 150, 0, 0.7); move("#mg5", W("s5f", 6) + 1.9, 150, 0, 0.7);
tl.to("#bl5", { backgroundColor: "#ff8fa0", duration: 0.3 }, W("s5f", 6) + 2.7);
show("#bg5", W("s5f", 6) + 2.7, { s: 0.3, d: 0.5 });
show("#pD", W("s5f", 10), { y: 30, s: 0.9, d: 0.7 });
show("#pc5", W("s5f", 10) + 0.6, { s: 0.5, d: 0.4 });
move("#pc5", W("s5f", 10) + 1.0, 132, 0, 0.7);
show("#tk5", W("s5f", 10) + 1.8, { s: 0.3, d: 0.5 });

// 3 · Personal productivity: triage funnel -----------------------------------------------
hide("#v52, #tg52", L("s5g", -0.4), 0.5);
chap(3, L("s5g", 0.0));
tl.set("#v53", { opacity: 1 }, L("s5g", 0.4));
show("#h53", L("s5g", 0.3), { y: 20, s: 0.8, d: 0.7 }); hide("#h53", W("s5h", 0) - 0.6, 0.4);
show("#fn5", W("s5h", 0) - 0.3, { s: 0.6, d: 0.7 }); show("#fl5", W("s5h", 0), { y: 16, d: 0.6 });
show("#tg53", L("s5g", 1.2), { y: 20, d: 0.6 });
[["#i5a", 190], ["#i5b", 80], ["#i5c", -30]].forEach(([sel, dx], i) => {
  tl.fromTo(sel, { opacity: 0, y: -40, x: 0, scale: 1 }, { opacity: 1, y: 0, duration: 0.4 }, W("s5h", 0) + i * 0.35);
  tl.to(sel, { x: dx, y: 150, scale: 0.3, opacity: 0, duration: 0.7, ease: "power2.in" }, W("s5h", 0) + 0.7 + i * 0.35);
});
draw("#p53a", W("s5h", 4), 0.6); show("#L5a", W("s5h", 4) + 0.3, { x: 40, s: 0.9, d: 0.7 });
draw("#p53b", W("s5i", 2), 0.6); show("#L5b", W("s5i", 2) + 0.3, { x: 40, s: 0.9, d: 0.7 });
draw("#p53c", W("s5i", 4), 0.6); show("#L5c", W("s5i", 4) + 0.3, { x: 40, s: 0.9, d: 0.7 });

// future: two dashed "coming later" cards -----------------------------------------------
hide("#v53, #tg53, #chap5", L("s5j", -0.3), 0.5);
tl.set("#v54", { opacity: 1 }, L("s5j", 0.2));
show("#h54", L("s5j", 0.3), { y: 20, s: 0.8, d: 0.7 }); hide("#h54", W("s5j", 6) - 0.4, 0.4);
show("#F5a", W("s5j", 6), { y: 30, s: 0.9, d: 0.8 });
show("#F5b", W("s5j", 9), { y: 30, s: 0.9, d: 0.8 });
show("#ft5a", W("s5k", 3), { s: 0.5, d: 0.6 }); show("#fl5a", W("s5k", 3) + 0.3, { y: 12, d: 0.5 });
[["#fk5a", "#fa5a", 9], ["#fk5b", "#fa5b", 10], ["#fk5c", "#fa5c", 12]].forEach(([chip, arrow, w]) => {
  show(chip, W("s5k", w), { x: -30, s: 0.8, d: 0.6 }); draw(arrow, W("s5k", w) + 0.2, 0.6);
});
pulse("#ft5a", W("s5k", 12) + 0.8, 1.12);
[["#fp5a", 3], ["#fp5b", 4], ["#fp5c", 5]].forEach(([sel, w]) => show(sel, W("s5l", w), { x: -30, s: 0.8, d: 0.6 }));
draw("#fb5a, #fb5b, #fb5c", W("s5l", 5) + 0.3, 0.7);
show("#fd5", W("s5l", 5) + 0.8, { s: 0.5, d: 0.7 }); show("#fl5b", W("s5l", 5) + 1.1, { y: 12, d: 0.5 });
show("#fg5", W("s5l", 7), { y: 20, s: 0.8, d: 0.7 });
show("#fu5", W("s5l", 12), { s: 0.3, d: 0.6 }); tl.to("#fu5", { y: -16, duration: 0.9, yoyo: true, repeat: 3, ease: "sine.inOut" }, W("s5l", 12) + 0.7);
leave("s5");
