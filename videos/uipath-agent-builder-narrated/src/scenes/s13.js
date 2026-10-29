// ===================== 13 · Closing checklist =====================
enter("s13");
tl.set("#gb13, #ch13, #cta13, #th13", { opacity: 0 }, 0);
tl.set("#cl13a .card, #cl13b .card, #cta13 .tok, #th13 .tok", { opacity: 0 }, 0);
const ck = ["s13b", "s13c", "s13d", "s13e", "s13f", "s13g", "s13h", "s13i", "s13j", "s13k", "s13l", "s13m"];
ck.forEach((ln, i) => { show("#k13" + i, W(ln, 0), { x: i < 6 ? -24 : 24, y: 0, s: 0.95, d: 0.5 }); pulse("#k13" + i, W(ln, 0) + 0.4, 1.03); });
show("#gb13", W("s13o", 2), { y: 24, s: 0.95, d: 0.8 });
// the call to action replaces the checklist
hide("#cl13a, #cl13b, #gb13, #s13 .eyebrow, #s13 h2", W("s13p", 0) - 0.3, 0.5);
tl.set("#ch13, #cta13, #th13", { opacity: 1 }, W("s13p", 0));
tl.fromTo("#ch13", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: E }, W("s13p", 0) + 0.2);
show("#s13a", W("s13p", 5), { y: 16, s: 0.8, d: 0.5 }); show("#s13b", W("s13px", 0), { y: 16, s: 0.8, d: 0.5 });
show("#s13c", W("s13qx", 0), { y: 16, s: 0.8, d: 0.5 }); pulse("#s13c", W("s13qx", 2), 1.08);
show("#t13", W("s13r", 0), { y: 20, s: 0.8, d: 0.7 }); cheer("#sam", W("s13r", 0) + 0.3);
leave("s13");
