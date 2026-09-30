// ===================== 8 · MCP Apps: real screens inside the conversation =====================
enter("s8");
prep("#sa8");
tl.set("#ch8, #ub8, #rp8, #tw8, #jt8, #zr8, #zt8, #ui8a, #ui8b, #ui8c, #ui8d, #fm8, #cs8, #sy8, #syl8, #nx8, #in8, #lt8, #ok8", { opacity: 0 }, 0);
tl.set("#ut8, #fv8a, #fv8b, #fv8c", { textContent: "" }, 0);

put("#sam", S("s8") + 0.1, 150, 900, 0.7, 1.2);
put("#dlg", S("s8") + 0.1, 340, 900, 0.6, 1.2);
face("#dlg", "n", S("s8") + 0.1);

// chat is great, but sometimes you need the real thing: a proper form or table to work in
show("#ch8", L("s8a", 0.2), { y: 40, s: 0.95, d: 0.7 });
show("#ub8", L("s8a", 0.9), { y: 16, s: 0.9, d: 0.5 });
typeText("#ut8", "Show me my open requests.", L("s8a", 1.0), 2.0);
show("#tw8", W("s8a", 7), { y: 20, s: 0.95, d: 0.6 });
show("#jt8", W("s8a", 14), { y: 16, s: 0.7, d: 0.5 }); shake("#jt8", W("s8a", 16), 8);
mood("#sam", "sad", W("s8a", 14)); face("#dlg", "q", W("s8a", 14));

// when Delegate connects to a system with its own interface...
show("#sy8", W("s8b", 5), { x: 30, s: 0.6, d: 0.6 });
draw("#sa8", W("s8b", 6), 0.5);
fade("#syl8", W("s8b", 8), 0.5);
face("#dlg", "h", W("s8b", 5));
// ...it can show that system's real screens inside the conversation
hide("#tw8, #jt8", L("s8c", 0.3), 0.4);
show("#zr8", W("s8c", 5), { s: 0.98, y: 0, d: 0.6 }); show("#zt8", W("s8c", 5) + 0.2, { y: 8, s: 0.9, d: 0.5 });
mood("#sam", "happy", W("s8c", 5));
// lists, forms, tables and dashboards render inline
show("#ui8a", L("s8d", 0.0), { y: 24, s: 0.85, d: 0.5 });
show("#ui8b", W("s8d", 1), { y: 24, s: 0.85, d: 0.5 });
show("#ui8c", W("s8d", 2), { y: 24, s: 0.85, d: 0.5 });
show("#ui8d", W("s8d", 4), { y: 24, s: 0.85, d: 0.5 });
pulse("#zr8", W("s8d", 6), 1.01);
typing("#dlg", W("s8d", 1), LE("s8d", 0.0));

// forms arrive already filled in with sensible values
hide("#ui8a, #ui8b, #ui8c, #ui8d, #zt8", L("s8e", 0.0), 0.4);
show("#fm8", L("s8e", 0.3), { y: 20, s: 0.92, d: 0.6 });
typeText("#fv8a", "Standard", W("s8e", 3), 0.5);
typeText("#fv8b", "10", W("s8e", 4) + 0.1, 0.3);
typeText("#fv8c", "Open", W("s8e", 5) + 0.1, 0.4);
// ...so you change only what matters, instead of describing every field in chat
show("#cs8", W("s8f", 2), { s: 0.5, d: 0.3 });
curTo("#cs8", W("s8f", 2) + 0.2, "#qb8", 0.7, 60, 0);
tl.set("#fv8b", { textContent: "12" }, W("s8f", 4));
tl.to("#qb8", { backgroundColor: "#ffe28a", duration: 0.3 }, W("s8f", 4)); pulse("#qb8", W("s8f", 4), 1.06);
curTo("#cs8", W("s8f", 6) - 0.3, "#sb8", 0.7);
pulse("#sb8", W("s8f", 6) + 0.5, 1.15);
show("#ok8", W("s8f", 7) + 0.3, { s: 0.3, d: 0.5 });
show("#nx8", W("s8f", 8), { y: 16, s: 0.7, d: 0.5 }); shake("#nx8", W("s8f", 9), 8);
// you keep the precision of the real interface without leaving the conversation
show("#rp8", L("s8g", 0.3), { x: -20, s: 0.9, d: 0.6 });
pulse("#fm8", W("s8g", 3), 1.03);
tl.to("#ch8", { borderColor: "#0b7a85", duration: 0.4 }, W("s8g", 3));
show("#in8", W("s8g", 8), { y: 16, s: 0.7, d: 0.5 });
// this works through MCP Apps
show("#lt8", W("s8h", 1), { y: 30, s: 0.9, d: 0.7 });
cheer("#sam", W("s8h", 3)); cheer("#dlg", W("s8h", 3) + 0.3);
leave("s8");
