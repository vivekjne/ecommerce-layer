// ---------------- icon set (48x48, ink outline, flat fills) ----------------
const IC = {
  mail: '<rect x="5" y="11" width="38" height="27" rx="6" fill="#fff"/><path d="M7 14 L24 28 L41 14"/>',
  chart: '<rect x="5" y="7" width="38" height="34" rx="6" fill="#fff"/><rect x="12" y="24" width="6" height="11" fill="#21c7d6"/><rect x="21" y="16" width="6" height="19" fill="#ffc93c"/><rect x="30" y="20" width="6" height="15" fill="#7b61ff"/>',
  image: '<rect x="5" y="8" width="38" height="32" rx="6" fill="#fff"/><circle cx="16" cy="19" r="4" fill="#ffc93c"/><path d="M7 36 L19 25 L28 33 L34 27 L41 35"/>',
  crm: '<rect x="5" y="9" width="38" height="30" rx="6" fill="#fff"/><circle cx="17" cy="21" r="5" fill="#21c7d6"/><path d="M9 34 q8 -10 16 0"/><path d="M28 20 H38 M28 27 H36"/>',
  cursor: '<path d="M13 6 L13 37 L21 30 L26 42 L32 39 L27 28 L38 27 Z" fill="#fff"/>',
  search: '<circle cx="20" cy="20" r="12" fill="#fff"/><path d="M29 29 L41 41" stroke-width="6"/>',
  db: '<ellipse cx="24" cy="12" rx="15" ry="6" fill="#fff"/><path d="M9 12 V34 q0 6 15 6 q15 0 15 -6 V12" fill="#fff"/><path d="M9 23 q0 6 15 6 q15 0 15 -6"/>',
  key: '<circle cx="15" cy="24" r="9" fill="#ffc93c"/><path d="M24 24 H42 M36 24 V31 M42 24 V30"/>',
  gear: '<circle cx="24" cy="24" r="14" stroke-width="7" stroke-dasharray="4.4 4.4"/><circle cx="24" cy="24" r="10" fill="#fff"/><circle cx="24" cy="24" r="4" fill="#21c7d6"/>',
  clock: '<circle cx="24" cy="24" r="18" fill="#fff"/><path d="M24 12 V24 L32 29"/>',
  sun: '<circle cx="24" cy="24" r="9" fill="#ffc93c"/><path d="M24 5 V10 M24 38 V43 M5 24 H10 M38 24 H43 M10 10 L14 14 M34 34 L38 38 M38 10 L34 14 M14 34 L10 38"/>',
  moon: '<path d="M34 8 a17 17 0 1 0 8 25 a14 14 0 0 1 -8 -25 z" fill="#ffe28a"/>',
  pencil: '<path d="M8 40 L10 30 L32 8 L40 16 L18 38 Z" fill="#ffc93c"/><path d="M28 12 L36 20"/>',
  send: '<path d="M6 22 L42 7 L34 41 L24 30 Z" fill="#fff"/><path d="M42 7 L24 30"/>',
  folder: '<path d="M5 13 q0 -4 4 -4 h10 l5 5 h15 q4 0 4 4 v18 q0 4 -4 4 H9 q-4 0 -4 -4 Z" fill="#fff"/>',
  logs: '<rect x="5" y="7" width="38" height="34" rx="6" fill="#1f2140"/><path d="M11 16 H30 M11 23 H36 M11 30 H26" stroke="#7cf3b0"/>',
  funnel: '<path d="M5 9 H43 L29 25 V39 L19 34 V25 Z" fill="#fff"/>',
  eye: '<path d="M4 24 q20 -20 40 0 q-20 20 -40 0 Z" fill="#fff"/><circle cx="24" cy="24" r="6" fill="#21c7d6"/>',
  person: '<circle cx="24" cy="15" r="8" fill="#fff"/><path d="M8 42 q0 -14 16 -14 q16 0 16 14 Z" fill="#fff"/>',
  warn: '<path d="M24 6 L44 40 H4 Z" fill="#ffc93c"/><path d="M24 18 V29 M24 34 V35"/>',
  flag: '<path d="M12 6 V42"/><path d="M12 8 H38 L32 16 L38 24 H12 Z" fill="#ff8fa0"/>',
  bug: '<ellipse cx="24" cy="27" rx="10" ry="13" fill="#ff8fa0"/><circle cx="24" cy="12" r="5" fill="#fff"/><path d="M14 22 L6 18 M34 22 L42 18 M14 30 L5 30 M34 30 L43 30 M15 38 L8 43 M33 38 L40 43 M24 16 V40"/>',
  stack: '<rect x="6" y="8" width="36" height="10" rx="4" fill="#fff"/><rect x="6" y="20" width="36" height="10" rx="4" fill="#fff"/><rect x="6" y="32" width="36" height="10" rx="4" fill="#fff"/><circle cx="13" cy="13" r="2" fill="#0a8a5f" stroke="none"/><circle cx="13" cy="25" r="2" fill="#0a8a5f" stroke="none"/><circle cx="13" cy="37" r="2" fill="#0a8a5f" stroke="none"/>',
  spark: '<path d="M24 4 Q26 22 44 24 Q26 26 24 44 Q22 26 4 24 Q22 22 24 4 Z" fill="#ffc93c"/>',
  x: '<path d="M12 12 L36 36 M36 12 L12 36" stroke="#d92d48" stroke-width="6"/>',
  tick: '<path d="M10 25 L21 36 L39 12" stroke="#0a8a5f" stroke-width="7"/>',
  bulb: '<path d="M24 5 a13 13 0 0 1 7 24 v5 h-14 v-5 a13 13 0 0 1 7 -24 z" fill="#ffe28a"/><path d="M18 40 H30 M20 44 H28"/>',
  chat: '<path d="M6 10 q0 -4 4 -4 h28 q4 0 4 4 v18 q0 4 -4 4 H22 L12 42 V32 h-2 q-4 0 -4 -4 Z" fill="#fff"/><circle cx="16" cy="19" r="2.2" fill="#1f2140" stroke="none"/><circle cx="24" cy="19" r="2.2" fill="#1f2140" stroke="none"/><circle cx="32" cy="19" r="2.2" fill="#1f2140" stroke="none"/>',
  loop: '<path d="M9 24 a15 15 0 0 1 27 -9 M39 24 a15 15 0 0 1 -27 9"/><path d="M36 6 V16 H26 M12 42 V32 H22"/>',
  ticket: '<path d="M5 14 q0 -4 4 -4 H39 q4 0 4 4 v5 a5 5 0 0 0 0 10 v5 q0 4 -4 4 H9 q-4 0 -4 -4 v-5 a5 5 0 0 0 0 -10 Z" fill="#fff"/><path d="M17 12 V36" stroke-dasharray="3 4"/>',
  doc: '<path d="M10 5 H29 L39 15 V41 q0 2 -2 2 H10 q-2 0 -2 -2 V7 q0 -2 2 -2 Z" fill="#fff"/><path d="M29 5 V15 H39"/><path d="M14 24 H32 M14 31 H32"/>',
  bot: '<rect x="8" y="14" width="32" height="26" rx="9" fill="#fff"/><path d="M24 14 V8"/><circle cx="24" cy="6" r="3" fill="#d92d48"/><circle cx="17" cy="26" r="3.5" fill="#1f2140" stroke="none"/><circle cx="31" cy="26" r="3.5" fill="#1f2140" stroke="none"/><path d="M18 34 H30"/>',
  lock: '<rect x="9" y="21" width="30" height="21" rx="5" fill="#ffc93c"/><path d="M15 21 V15 a9 9 0 0 1 18 0 V21"/><circle cx="24" cy="31" r="3" fill="#1f2140" stroke="none"/>',
  unlock: '<rect x="9" y="21" width="30" height="21" rx="5" fill="#06d6a0"/><path d="M15 21 V15 a9 9 0 0 1 17 -3"/><circle cx="24" cy="31" r="3" fill="#1f2140" stroke="none"/>',
  infinity: '<path d="M24 24 C18 12 6 12 6 24 C6 36 18 36 24 24 C30 12 42 12 42 24 C42 36 30 36 24 24 Z"/>',
  flow: '<rect x="4" y="6" width="14" height="10" rx="3" fill="#fff"/><rect x="30" y="6" width="14" height="10" rx="3" fill="#fff"/><rect x="17" y="32" width="14" height="10" rx="3" fill="#21c7d6"/><path d="M11 16 V24 H24 V32 M37 16 V24 H24"/>',
  book: '<path d="M6 10 q9 -3 18 3 q9 -6 18 -3 V37 q-9 -3 -18 3 q-9 -6 -18 -3 Z" fill="#fff"/><path d="M24 13 V40"/>',
  target: '<circle cx="24" cy="24" r="17" fill="#fff"/><circle cx="24" cy="24" r="10" fill="#ff8fa0"/><circle cx="24" cy="24" r="3.5" fill="#1f2140" stroke="none"/>',
  gauge: '<path d="M6 34 a18 18 0 0 1 36 0 Z" fill="#fff"/><path d="M24 34 L34 20"/><circle cx="24" cy="34" r="3" fill="#1f2140" stroke="none"/>',
  globe: '<circle cx="24" cy="24" r="17" fill="#fff"/><path d="M7 24 H41 M24 7 q-12 17 0 34 M24 7 q12 17 0 34"/>',
  hand: '<path d="M14 26 V12 q0 -3 3 -3 t3 3 V22 V8 q0 -3 3 -3 t3 3 V22 V10 q0 -3 3 -3 t3 3 V24 V16 q0 -3 3 -3 t3 3 V30 q0 12 -12 12 q-8 0 -12 -8 L8 26 q-1 -3 2 -4 q3 -1 4 4 Z" fill="#fff"/>',
};

function ic(name, size) {
  return '<svg class="ic" viewBox="0 0 48 48" width="' + size + '" height="' + size + '" fill="none" stroke="#1f2140" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">' + IC[name] + "</svg>";
}
// <i data-ic="mail" data-s="56"></i>  ->  inline svg (done once, before the timeline is built)
document.querySelectorAll("i[data-ic]").forEach((el) => {
  el.innerHTML = ic(el.dataset.ic, +(el.dataset.s || 48));
});
