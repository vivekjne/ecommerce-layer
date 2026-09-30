// ===================== 8 · Way 1: compose & execute =====================
enter("s8");
prep("#h8p, #zp8a, #zp8b, #zp8c, #sp8a, #sp8b, #sp8c, #fa8");
tl.set("#tk8a, #tk8b, #tk8c, #tk8d, #h8a, #h8b, #z8a, #z8b, #z8c, #z8d, #y8a, #y8b, #y8c, #y8d, #bb8, #nc8, #wf8, #st8a, #st8b, #st8c, #fb8, #sk8a, #sk8b, #sk8c, #s8 .tk8", { opacity: 0 }, 0);
put("#sam", L("s8a", 0.0), 230, 858, 1.25, 1.4);
put("#dlg", L("s8a", 0.0), 810, 858, 1.3, 1.6);
face("#dlg", "n", L("s8a", 0.0));
// intro: prompt -> productivity, then the four things
show("#h8a", W("s8a", 8), { x: -30, s: 0.8, d: 0.6 }); draw("#h8p", W("s8a", 9), 0.6); show("#h8b", W("s8a", 10), { x: 30, s: 0.8, d: 0.6 });
hide("#h8a, #h8b, #h8p", L("s8b", -0.2), 0.4);
[["z8a", "y8a", 2], ["z8b", "y8b", 3], ["z8c", "y8c", 4], ["z8d", "y8d", 6]].forEach(([z, y, w], i) => {
  show("#" + z, W("s8b", w), { y: 24, s: 0.7, d: 0.6 }); show("#" + y, W("s8b", w) + 0.2, { y: 12, d: 0.5 });
  if (i > 0) draw(["#zp8a", "#zp8b", "#zp8c"][i - 1], W("s8b", w) - 0.3, 0.4);
});
hide("#z8a, #z8b, #z8c, #z8d, #y8a, #y8b, #y8c, #y8d, #zp8a, #zp8b, #zp8c", L("s8c", -0.2), 0.4);
["#tk8a", "#tk8b", "#tk8c", "#tk8d"].forEach((sel, i) => show(sel, L("s8c", 0.1 + i * 0.12), { y: 12, d: 0.4 }));
// compose: plain language, no code
fade("#bb8", L("s8d", 0.0), 0.4);
tl.set("#bp8", { textContent: "" }, 0);
typeText("#bp8", "Pull my case backlog from Salesforce and prioritize the day.", L("s8d", 0.5), 2.6);
show("#nc8", W("s8d", 6), { s: 0.5, d: 0.5 });
mood("#sam", "happy", L("s8d", 0.0));
// breaks a complex workflow into steps
show("#wf8", W("s8e", 3), { x: -30, s: 0.8, d: 0.7 });
draw("#sp8a, #sp8b, #sp8c", W("s8e", 5), 0.6);
show("#st8a", W("s8e", 6) + 0.1, { x: 40, s: 0.85, d: 0.6 }); show("#st8b", W("s8e", 6) + 0.25, { x: 40, s: 0.85, d: 0.6 }); show("#st8c", W("s8e", 6) + 0.4, { x: 40, s: 0.85, d: 0.6 });
// UI automation, files, API calls: each gets done
typing("#dlg", L("s8f", 0.0), LE("s8f", 0.0));
const tk8 = $$("#s8 .tk8");
[["#st8a", 2, 0], ["#st8b", 4, 1], ["#st8c", 6, 2]].forEach(([sel, w, i]) => {
  pulse(sel, W("s8f", w), 1.06); fade(tk8[i], W("s8f", w) + 0.5, 0.3); pulse(tk8[i], W("s8f", w) + 0.5, 1.3);
});
face("#dlg", "h", LE("s8f", 0.0));
// learns from feedback over time
show("#fb8", W("s8g", 3), { x: 30, s: 0.8, d: 0.6 }); draw("#fa8", W("s8g", 4), 0.6);
["#sk8a", "#sk8b", "#sk8c"].forEach((sel, i) => {
  show(sel, L("s8g", 0.8 + i * 0.25), { s: 0.3, d: 0.5 });
  tl.to(sel, { y: "-=14", rotation: 20, duration: 0.7, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 50%" }, L("s8g", 1.3 + i * 0.25));
});
cheer("#dlg", L("s8g", 1.2));
leave("s8");
