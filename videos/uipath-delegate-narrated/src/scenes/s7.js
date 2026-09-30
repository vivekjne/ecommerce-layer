// ===================== 7 · A day with Delegate =====================
enter("s7");
tl.set("#e71, #e72, #e73, #e74, #e75, #e76, #e77, #e78, #tm7", { opacity: 0 }, 0);
tl.set("#bb7", { opacity: 0 }, 0);
tl.set("#w71, #pl71, #r71a, #r71b, #r71c, #r71d, #r71e, #w72, #pn72, #s72a, #s72b, #s72c, #pc72, #w73, #lc73, #tb73, #w74, #tn74, #mz74, #x74, #nz74", { opacity: 0 }, 0);
tl.set("#qs75, #sr75a, #sr75b, #sr75c, #sr75d, #sr75e, #an75, #d75a, #d75b, #d75c, #d75d, #d75e, #w76, #pc76, #sd76, #pl76, #sf76, #sk76, #wf77, #jb77, #rs77", { opacity: 0 }, 0);
tl.set("#ct78, #cl78, #t78a, #t78b, #t78c, #t78d, #t78e, #t78f", { opacity: 0 }, 0);
tl.set("#x73, #nt73", { opacity: 0 }, 0);
prep("#a71, #q75a, #q75b, #q75c, #q75d, #q75e, #a77, #f78a, #f78b, #f78c, #f78d, #f78e, #f78f");
tl.set("#w74 .lg, #w76 .l76, #r71a .nm, #r71b .nm, #r71c .nm, #r71d .nm, #r71e .nm", { opacity: 0 }, 0);
tl.set("#p77a, #p77b, #p77c", { scaleX: 0, transformOrigin: "0% 50%" }, 0);

// the cast: Sam (in his headset) and Delegate, side by side for the whole scene
headset("#sam", true, L("s7a", 0.2));
put("#sam", L("s7a", 0.0), 250, 858, 1.25, 1.5);
put("#dlg", L("s7a", 0.0), 545, 858, 1.3, 1.5);
face("#dlg", "h", L("s7a", 1.5));
wobble("#sam", L("s7a", 4.9), 2, 4);

// the day: sun -> moon, eight dots
fade("#tm7", L("s7b", 0.2), 0.6);
function day(i, t) {
  for (let k = 1; k <= 8; k++) {
    tl.to("#td" + k, { backgroundColor: k <= i ? "#0b7a85" : "#ffffff", scale: k === i ? 1.5 : 1, duration: 0.3, transformOrigin: "50% 50%" }, t);
  }
  tl.to("#tmf", { width: (i - 1) * 96.86, duration: 0.6, ease: "power1.inOut" }, t);
}
// Sam's prompt, typed into his speech bubble
function say(title, text, t, dur) {
  tl.set("#bt7", { textContent: title }, t);
  tl.set("#bp7", { textContent: "" }, t);
  typeText("#bp7", text, t + 0.2, dur);
}
fade("#bb7", L("s7c", 0.0), 0.5);

// 1 · Morning planning: the backlog sorts itself ------------------------------------------------------------
day(1, L("s7c", 0.0));
say("Morning planning", "Pull my case backlog from Salesforce and prioritize the day.", L("s7c", 0.0), 4.2);
fade("#e71", L("s7c", 0.1), 0.3);
fade("#w71", W("s7c", 4), 0.5);
["a", "b", "c", "d", "e"].forEach((k, i) => show("#r71" + k, W("s7c", 5) + i * 0.18, { x: -30, s: 0.95, d: 0.5 }));
const sortDy = { a: 176, b: 264, c: -176, d: 0, e: -264 };
Object.keys(sortDy).forEach((k) => { if (sortDy[k]) tl.to("#r71" + k, { y: sortDy[k], duration: 0.9, ease: "power2.inOut" }, W("s7c", 9)); });
typing("#dlg", W("s7c", 2), LE("s7c", 0.0));
draw("#a71", W("s7d", 1), 0.5); show("#pl71", W("s7d", 1) + 0.3, { x: 40, s: 0.9, d: 0.7 });
$$("#w71 .nm").forEach((n, i) => tl.to(n, { opacity: 1, duration: 0.3 }, W("s7d", 8) + i * 0.12));
face("#dlg", "h", L("s7d", 0.0));

// 2 · Context awareness: summary + related articles + similar cases -----------------------------------------
hide("#e71", L("s7e", -0.3), 0.4);
day(2, L("s7e", 0.0));
say("Context awareness", "Summarize the case I'm viewing with related KB articles and similar past cases.", L("s7e", 0.0), 6.2);
fade("#e72", L("s7e", 0.0), 0.2);
fade("#w72", W("s7e", 2), 0.5);
fade("#pn72", W("s7e", 4), 0.4);
fade("#s72a", W("s7e", 5), 0.5); fade("#s72b", W("s7e", 8), 0.5); fade("#s72c", W("s7e", 11), 0.5);
typing("#dlg", W("s7e", 2), LE("s7e", 0.0));
show("#pc72", W("s7f", 3), { s: 0.4, d: 0.5 });
tl.to("#pc72", { rotation: 14, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 50%" }, W("s7f", 3) + 0.5);
pulse("#pn72", W("s7f", 3), 1.03);

// 3 · License lookup: the answer arrives in the chat, no tab hopping -------------------------------------
hide("#e72", L("s7g", -0.3), 0.4);
day(3, L("s7g", 0.0));
say("License lookup", "Look up a customer's licensing data without switching tools.", L("s7g", 0.0), 4.4);
fade("#e73", L("s7g", 0.0), 0.2);
fade("#w73", W("s7g", 2), 0.5);
show("#lc73", W("s7g", 6), { y: 30, s: 0.9, d: 0.7 });
typing("#dlg", W("s7g", 2), LE("s7g", 0.0));
pulse("#lc73", W("s7h", 2), 1.04);
fade("#tb73", W("s7h", 6), 0.5);
show("#x73", W("s7h", 7), { s: 0.3, d: 0.5 }); show("#nt73", W("s7h", 7), { y: 16, s: 0.7, d: 0.5 });

// 4 · Log analysis: the logs come to you, no digging through Azure ------------------------------------
hide("#e73", L("s7i", -0.3), 0.4);
day(4, L("s7i", 0.0));
say("Log analysis", "Pull recent App Insights logs for a tenant without navigating Azure.", L("s7i", 0.0), 5.0);
fade("#e74", L("s7i", 0.0), 0.2);
fade("#w74", W("s7i", 2), 0.5);
$$("#w74 .lg").forEach((r, i) => fade(r, W("s7i", 3) + i * 0.3, 0.25));
show("#tn74", W("s7i", 9), { y: 16, s: 0.7, d: 0.6 });
typing("#dlg", W("s7i", 2), LE("s7i", 0.0));
fade("#mz74", W("s7j", 4), 0.5);
show("#x74", W("s7j", 6), { s: 0.3, d: 0.5 }); show("#nz74", W("s7j", 6), { y: 16, s: 0.7, d: 0.5 });

// 5 · Troubleshooting research: one question, five places, one answer -------------------------------
hide("#e74", L("s7k", -0.3), 0.4);
day(5, L("s7k", 0.0));
say("Troubleshooting research", "Search Product Docs, KB, Slack, Confluence and past cases at once.", L("s7k", 0.0), 5.6);
fade("#e75", L("s7k", 0.0), 0.2);
show("#qs75", W("s7k", 2), { x: -30, s: 0.8, d: 0.6 });
[["a", 3], ["b", 6], ["c", 8], ["d", 9], ["e", 11]].forEach(([k, w]) => { show("#sr75" + k, W("s7k", w), { x: 40, s: 0.85, d: 0.5 }); draw("#q75" + k, W("s7k", w) - 0.1, 0.6); });
typing("#dlg", W("s7k", 2), LE("s7l", 0.0));
["a", "b", "c", "d", "e"].forEach((k) => pulse("#sr75" + k, W("s7l", 3), 1.08));
[["a", 304], ["b", 414], ["c", 524], ["d", 634], ["e", 744]].forEach(([k, top], i) => {
  const t = W("s7l", 5) + i * 0.08;
  tl.to("#d75" + k, { opacity: 1, duration: 0.1 }, t);
  tl.to("#d75" + k, { x: -470, y: 706 - top, duration: 0.9, ease: "power2.inOut" }, t);
  tl.to("#d75" + k, { opacity: 0, duration: 0.2 }, t + 0.9);
});
show("#an75", W("s7l", 7), { y: 20, s: 0.7, d: 0.6 });

// 6 · First response drafting: draft, edit, send -----------------------------------------------------
hide("#e75", L("s7m", -0.3), 0.4);
day(6, L("s7m", 0.0));
say("First-response drafting", "Generate a reply from case context to iterate on and send to Salesforce.", L("s7m", 0.0), 6.0);
fade("#e76", L("s7m", 0.0), 0.2);
fade("#w76", W("s7m", 3), 0.5);
show("#pc76", W("s7m", 4) + 0.3, { s: 0.5, d: 0.4 });
$$("#w76 .l76").forEach((r, i) => {
  fade(r, W("s7m", 5) + i * 0.4, 0.3);
  if (i > 0) tl.to("#pc76", { y: "+=" + (i === 1 ? 46 : 32), duration: 0.35, ease: "power2.inOut" }, W("s7m", 5) + i * 0.4);
});
tl.to("#pc76", { rotation: -12, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", transformOrigin: "50% 100%" }, W("s7m", 11));
typing("#dlg", W("s7m", 3), W("s7m", 12));
show("#sd76", W("s7m", 13), { s: 0.6, d: 0.4 }); pulse("#sd76", W("s7m", 13) + 0.4, 1.15);
show("#pl76", W("s7m", 14), { s: 0.5, d: 0.3 });
tl.to("#pl76", { x: 190, y: -140, scale: 0.8, duration: 0.9, ease: "power2.inOut" }, W("s7m", 14) + 0.3);
tl.to("#pl76", { opacity: 0, duration: 0.2 }, W("s7m", 14) + 1.2);
show("#sf76", W("s7m", 15), { x: 40, s: 0.9, d: 0.6 }); fade("#sk76", W("s7m", 15) + 0.6, 0.3);
pulse("#sf76", W("s7n", 1), 1.05);

// 7 · RunDeck jobs: run a predefined job without leaving the workflow -------------------------------
hide("#e76", L("s7o", -0.3), 0.4);
day(7, L("s7o", 0.0));
say("RunDeck jobs", "Run a predefined job with parameters without leaving the workflow.", L("s7o", 0.0), 4.6);
fade("#e77", L("s7o", 0.0), 0.2);
show("#jb77", W("s7o", 4), { y: 30, s: 0.9, d: 0.7 });
fade("#wf77", W("s7o", 8), 0.6);
[["a", 0.0], ["b", 0.4], ["c", 0.8]].forEach(([k, o]) => tl.to("#p77" + k, { scaleX: 1, duration: 0.4, ease: "power2.out" }, W("s7p", 2) + o));
pulse("#pb77", W("s7p", 3) + 0.4, 1.06);
typing("#dlg", W("s7p", 3), W("s7p", 8));
draw("#a77", W("s7p", 5), 0.4); show("#rs77", W("s7p", 5) + 0.3, { x: 40, s: 0.9, d: 0.6 });
tl.to("#pg77", { width: "100%", duration: 1.6, ease: "power1.inOut" }, W("s7p", 6));

// 8 · Stay in flow: one chat, every tool ---------------------------------------------------------------------
hide("#e77", L("s7q", -0.3), 0.4);
day(8, L("s7q", 0.0));
say("Stay in flow", "One conversational surface across every tool the PSE touches.", L("s7q", 0.0), 3.4);
fade("#e78", L("s7q", 0.0), 0.2);
show("#ct78", L("s7q", 0.4), { s: 0.5, d: 0.7 }); show("#cl78", W("s7r", 1), { y: 16, d: 0.6 });
["a", "b", "c", "d", "e", "f"].forEach((k, i) => {
  const t = W("s7r", 3) + i * 0.4;
  show("#t78" + k, t, { s: 0.6, d: 0.5 }); draw("#f78" + k, t - 0.1, 0.5);
});
["a", "b", "c", "d", "e", "f"].forEach((k) => pulse("#t78" + k, W("s7r", 7), 1.1));
pulse("#ct78", W("s7r", 7), 1.12);
cheer("#sam", W("s7r", 6)); cheer("#dlg", W("s7r", 6) + 0.3);
mood("#sam", "happy", L("s7q", 0.0));
headset("#sam", false, SE("s7") - 0.5);
leave("s7");
