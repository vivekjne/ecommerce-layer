// ===================== 1 · Title =====================
tl.set("#s1 .kick, #s1 h1, #s1 p", { opacity: 0 }, 0);
tl.fromTo("#s1 .kick", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: E }, 0.3);
tl.fromTo("#s1 h1", { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: POP }, 0.6);
tl.fromTo("#s1 p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: E }, L("s1b", 1.2));
// the two actors walk in: Sam from his corner, Delegate from the right
place("#dlg", 2250, 900, 1.7);
tl.to("#dlg", { opacity: 1, duration: 0.3 }, 0.6);
put("#sam", 0.4, 700, 900, 2.0, 2.0);
put("#dlg", 0.8, 1230, 900, 1.7, 2.0);
waveArm("#sam", L("s1a"), 3); waveArm("#dlg", L("s1a", 0.5), 3);
face("#dlg", "h", L("s1a"));
pulse("#s1 p b", L("s1b", 5.3), 1.25);
wiggle("#dlg", L("s1b", 5.2), 2);
cheer("#sam", L("s1d", 1.5)); cheer("#dlg", L("s1d", 1.9));
// confetti: the deck's icons drift up and down around the title
$$("#s1 .cf").forEach((el, i) => {
  show(el, 1.4 + i * 0.25, { s: 0.4, d: 0.7 });
  tl.to(el, { y: "-=26", duration: 2.2 + i * 0.15, yoyo: true, repeat: 7, ease: "sine.inOut" }, 2.4 + i * 0.25);
});
const s1out = LE("s1d", 0.8);
tl.to("#s1", { opacity: 0, duration: 0.6 }, s1out);
put("#sam", s1out, 360, 840, 1.7, 1.6);
put("#dlg", s1out, 2250, 900, 1.7, 1.2);
tl.to("#dlg", { opacity: 0, duration: 0.1 }, s1out + 1.3);
