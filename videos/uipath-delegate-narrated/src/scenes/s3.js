// ===================== 3 · What it is =====================
enter("s3");
// A: "suggests" vs "completes" -----------------------------------------------------------
tl.set("#a3l, #a3b, #a3s, #a3r, #a3c, #cur3, #done3, #a3c .ck", { opacity: 0 }, 0);
put("#sam", L("s3a", 0.0), 330, 850, 1.3, 1.4);
put("#dlg", L("s3a", 0.0), 1130, 850, 1.5, 1.4);
face("#dlg", "n", L("s3a", 0));
show("#a3b", L("s3b", 0.3), { x: -40, s: 0.9 }); show("#a3l", L("s3b", 0.3), { y: 10 });
mood("#sam", "sad", L("s3b", 0.4));
show("#a3s", L("s3b", 1.5), { y: 12, d: 0.6 });
show("#a3r", L("s3b", 2.6), { y: 10 }); show("#a3c", L("s3b", 2.6), { x: 40, s: 0.9 });
typing("#dlg", L("s3b", 2.7), L("s3b", 5.4));
show("#cur3", L("s3b", 2.9), { s: 0.5, d: 0.4 });
const ck = $$("#a3c .ck");
move("#cur3", L("s3b", 3.0), 96, -40, 0.35);  fade(ck[0], L("s3b", 3.4), 0.25); pulse(ck[0], L("s3b", 3.4), 1.3);
move("#cur3", L("s3b", 3.9), 0, 62, 0.35);   fade(ck[1], L("s3b", 4.3), 0.25); pulse(ck[1], L("s3b", 4.3), 1.3);
move("#cur3", L("s3b", 4.6), 0, 62, 0.35);   fade(ck[2], L("s3b", 5.0), 0.25); pulse(ck[2], L("s3b", 5.0), 1.3);
show("#done3", L("s3b", 5.4), { s: 0.3, d: 0.5 });
mood("#sam", "happy", L("s3b", 5.4)); face("#dlg", "h", L("s3b", 5.4));
// B: hub and spokes ---------------------------------------------------------------------
tl.set("#n3a, #n3b, #n3c, #n3d", { opacity: 0 }, 0);
prep("#hb1, #hb2, #hb3, #hb4");
hide("#a3l, #a3b, #a3s, #a3r, #a3c, #cur3, #done3", L("s3c", 0.0), 0.5);
put("#sam", L("s3c", 0.0), 125, 1043, 1, 1.3);
put("#dlg", L("s3c", 0.0), 960, 780, 1.7, 1.4);
[["#n3a", "#hb1", "s3c", 2], ["#n3b", "#hb2", "s3d", 1], ["#n3c", "#hb3", "s3e", 4], ["#n3d", "#hb4", "s3f", 3]].forEach(([node, arrow, line, w], i) => {
  draw(arrow, W(line, w), 0.7);
  show(node, W(line, w) + 0.5, { s: 0.6, d: 0.7 });
  nod("#dlg", W(line, w));
});
face("#dlg", "h", L("s3c", 1.0));
cheer("#dlg", L("s3f", 4.0));
leave("s3");
