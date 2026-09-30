// ===================== 9 · Save and reuse work with Routines =====================
enter("s9");
prep("#ar9, #sh9a, #sh9b, #sh9c, #iv9a");
tl.set("#ss9, #rl9, #ok9, #sv9, #da9, #cs9, #sc9, #dn9, #tk9, #bn9, #tp9a, #tp9b, #tp9c, #rb9, #r9a, #r9b", { opacity: 0 }, 0);
tl.set("#rt9a, #rt9b", { textContent: "" }, 0);

put("#sam", S("s9") + 0.1, 230, 890, 1.0, 1.2);
put("#dlg", S("s9") + 0.1, 450, 890, 0.9, 1.2);
face("#dlg", "n", S("s9") + 0.1);

// everything so far has one more trick: when a session goes well, you don't have to do it again
show("#ss9", L("s9a", 0.3), { y: 30, s: 0.95, d: 0.7 });
show("#ok9", W("s9b", 3), { x: -20, s: 0.8, d: 0.5 }); pulse("#ok9", W("s9b", 4), 1.1);
face("#dlg", "h", W("s9b", 3)); cheer("#dlg", W("s9b", 4));
show("#da9", W("s9b", 9), { y: 16, s: 0.7, d: 0.5 }); shake("#da9", W("s9b", 10), 8);
// save any successful session as a reusable routine
show("#sv9", L("s9c", 0.0), { y: 16, s: 0.8, d: 0.5 });
show("#cs9", W("s9c", 1), { s: 0.5, d: 0.3 });
curTo("#cs9", W("s9c", 1) + 0.2, "#sv9", 0.8, 40, 6);
pulse("#sv9", W("s9c", 4), 1.15); pulse("#cs9", W("s9c", 4), 1.25);
draw("#ar9", W("s9c", 5), 0.4);
show("#rl9", W("s9c", 7) - 0.2, { x: 40, s: 0.95, d: 0.7 });
// build it once: a weekly sales pipeline report, a monthly expense categorization
show("#r9a", W("s9d", 3) - 0.1, { x: 30, s: 0.95, d: 0.5 });
typeText("#rt9a", "Weekly sales pipeline report", W("s9d", 5), 1.5);
show("#r9b", W("s9d", 9) - 0.1, { x: 30, s: 0.95, d: 0.5 });
typeText("#rt9b", "Monthly expense categorization", W("s9d", 11), 1.6);
// run it on demand with a single click, or schedule it to run automatically
curTo("#cs9", W("s9e", 4), "#run9a", 0.7, 8, 8);
pulse("#run9a", W("s9e", 12), 1.2); pulse("#cs9", W("s9e", 12), 1.25);
tl.to("#pb9", { width: "100%", duration: 1.3, ease: "none" }, W("s9e", 12));
show("#dn9", W("s9e", 14) - 0.2, { x: 20, s: 0.7, d: 0.5 });
curTo("#cs9", W("s9e", 13) + 0.2, "#sch9a", 0.6, 8, 8);
pulse("#sch9a", W("s9e", 15), 1.2); pulse("#cs9", W("s9e", 15), 1.25);
show("#sc9", W("s9e", 15) + 0.3, { y: 20, s: 0.9, d: 0.6 });
face("#dlg", "h", W("s9e", 12));

// invest once to teach a workflow, then benefit every time after
hide("#ss9, #ar9, #da9, #cs9, #sc9, #dn9", L("s9f", -0.3), 0.5);
show("#tk9", W("s9f", 1), { x: -20, s: 0.8, d: 0.5 });
draw("#iv9a", W("s9f", 4), 0.4);
$$("#s9 .rn").forEach((r, i) => show(r, W("s9f", 10) + i * 0.3, { s: 0.3, d: 0.4 }));
show("#bn9", W("s9f", 12), { y: 16, s: 0.7, d: 0.5 });
cheer("#sam", W("s9f", 13));
// and it isn't just for you: share a routine with the team, so nobody rebuilds it
hide("#tk9, #iv9a, #bn9, #s9 .rn", L("s9g", 0.0), 0.4);
pulse("#shr9a", W("s9g", 3), 1.2);
pulse("#shr9a", W("s9h", 2), 1.25);
[["#sh9a", "#tp9a", 0], ["#sh9b", "#tp9b", 1], ["#sh9c", "#tp9c", 2]].forEach(([arrow, card, i]) => {
  draw(arrow, W("s9h", 4) + i * 0.35, 0.4); show(card, W("s9h", 4) + 0.3 + i * 0.35, { y: 20, s: 0.85, d: 0.5 });
});
show("#rb9", W("s9h", 12), { y: 16, s: 0.7, d: 0.5 }); shake("#rb9", W("s9h", 13), 8);
cheer("#sam", W("s9h", 15)); cheer("#dlg", W("s9h", 15) + 0.3);
leave("s9");
