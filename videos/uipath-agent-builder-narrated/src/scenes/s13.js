// ===================== 13 · Closing checklist =====================
enter("s13");
tl.set("#gb13, #ch13, #cta13, #th13, #w13", { opacity: 0 }, 0);
tl.set("#cl13a .card, #cl13b .card, #cta13 .tok, #th13 .tok", { opacity: 0 }, 0);
const ck = ["s13b", "s13c", "s13d", "s13e", "s13f", "s13g", "s13h", "s13i", "s13j", "s13k", "s13l", "s13m"];
// each step of the checklist appears as it is read out, then ticks off and fills the progress bar
ck.forEach((ln, i) => {
  pop("#k13" + i, L(ln, -0.05), { x: i < 6 ? -24 : 24, y: 0, s: 0.95, d: 0.5 });
  tl.to("#nb13" + i, { backgroundColor: "#0a8a5f", duration: 0.3 }, LE(ln, -0.15));
  tl.to("#pg13", { scaleX: (i + 1) / 12, duration: 0.5, ease: "power2.out" }, LE(ln, -0.15));
  pulse("#k13" + i, LE(ln, -0.15), 1.03);
});
pop("#w13", K("s13n", "not"), { s: 0.8 }); shake("#w13", K("s13n", "works") + 0.3, 6);
hide("#w13", K("s13o", "good") - 0.1, 0.3);
pop("#gb13", K("s13o", "good"), { y: 24, s: 0.95, d: 0.8 }); pulse("#gb13", K("s13o", "reliably"), 1.02);
// the call to action replaces the checklist
hide("#cl13a, #cl13b, #gb13, #pt13, #s13 .eyebrow, #s13 h2", K("s13p", "save") - 0.5, 0.5);
tl.set("#ch13, #cta13, #th13", { opacity: 1 }, K("s13p", "save") - 0.4);
tl.fromTo("#ch13", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: E }, K("s13p", "save") - 0.3);
pop("#s13a", K("s13p", "save")); pop("#s13b", K("s13px", "share"));
pop("#s13c", K("s13qx", "subscribe")); pulse("#s13c", K("s13qx", "subscribe") + 0.5, 1.12); pulse("#s13c", K("s13qx", "treesa"), 1.12);
pop("#t13", K("s13r", "thanks"), { y: 20, s: 0.8, d: 0.7 }); cheer("#sam", K("s13r", "thanks") + 0.3);
leave("s13");
