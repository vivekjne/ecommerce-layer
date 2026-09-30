// ---------------- characters ----------------
const INK = "#1f2140";
function blob(body, belly, extra) {
  return `<svg viewBox="0 0 240 290">
    <ellipse cx="120" cy="280" rx="80" ry="10" fill="rgba(31,33,64,.12)"/>
    <g class="fx"><g class="inner">
      <g class="arm-l"><path d="M44 170 q-36 6 -40 44" stroke="${body}" stroke-width="20" stroke-linecap="round" fill="none"/></g>
      <g class="arm-r"><path d="M196 170 q36 6 40 44" stroke="${body}" stroke-width="20" stroke-linecap="round" fill="none"/></g>
      <ellipse cx="88" cy="262" rx="26" ry="14" fill="${body}"/><ellipse cx="152" cy="262" rx="26" ry="14" fill="${body}"/>
      <path d="M112 44 q6 -34 34 -26 q-18 6 -16 28z" fill="${body}"/>
      <rect x="30" y="40" width="180" height="222" rx="90" fill="${body}"/>
      <ellipse cx="120" cy="196" rx="58" ry="46" fill="${belly}"/>
      ${extra}
      <ellipse cx="74" cy="156" rx="14" ry="9" fill="#ff9bb3" opacity=".8"/><ellipse cx="166" cy="156" rx="14" ry="9" fill="#ff9bb3" opacity=".8"/>
      <g class="eyes">
        <ellipse cx="92" cy="122" rx="21" ry="23" fill="#fff"/><ellipse cx="148" cy="122" rx="21" ry="23" fill="#fff"/>
        <circle cx="95" cy="126" r="10" fill="${INK}"/><circle cx="151" cy="126" r="10" fill="${INK}"/>
        <circle cx="99" cy="121" r="3.5" fill="#fff"/><circle cx="155" cy="121" r="3.5" fill="#fff"/>
      </g>
      <path class="m-happy" d="M100 158 q20 24 40 0" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path class="m-sad" d="M102 170 q18 -16 36 0" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0"/>
      <ellipse class="m-talk" cx="120" cy="164" rx="14" ry="11" fill="#7a1f3a" opacity="0"/>
    </g></g>
  </svg>`;
}
// Sam wears a headset in the "day in the life" scene
const HEADSET = `<path d="M44 112 q0 -62 76 -62 q76 0 76 62" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round" class="hs" opacity="0"/><rect x="26" y="104" width="24" height="42" rx="10" fill="${INK}" class="hs" opacity="0"/><rect x="190" y="104" width="24" height="42" rx="10" fill="${INK}" class="hs" opacity="0"/><path d="M200 146 q-6 22 -50 26" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round" class="hs" opacity="0"/><circle cx="148" cy="172" r="7" fill="${INK}" class="hs" opacity="0"/>`;

const BOT = `<svg viewBox="0 0 260 320">
  <ellipse cx="130" cy="312" rx="90" ry="10" fill="rgba(31,33,64,.12)"/>
  <g class="fx"><g class="inner">
    <g class="ant"><line x1="130" y1="40" x2="130" y2="10" stroke="${INK}" stroke-width="6"/><circle class="bulb" cx="130" cy="10" r="12" fill="#c2410c" stroke="${INK}" stroke-width="4"/></g>
    <g class="arm-l"><rect x="22" y="200" width="36" height="80" rx="18" fill="#05b98a"/></g>
    <g class="arm-r"><rect x="202" y="200" width="36" height="80" rx="18" fill="#05b98a"/></g>
    <rect x="66" y="188" width="128" height="110" rx="28" fill="#038a66" stroke="${INK}" stroke-width="5"/>
    <text x="130" y="258" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-weight="800" font-size="30" fill="#fff">BYTE</text>
    <rect class="head" x="30" y="40" width="200" height="150" rx="40" fill="#06d6a0" stroke="${INK}" stroke-width="5"/>
    <rect x="54" y="62" width="152" height="106" rx="26" fill="${INK}"/>
    <g class="eyes-n"><rect x="88" y="94" width="22" height="32" rx="11" fill="#7cf3ff"/><rect x="150" y="94" width="22" height="32" rx="11" fill="#7cf3ff"/></g>
    <g class="eyes-h" opacity="0"><path d="M86 118 q13 -22 26 0 M148 118 q13 -22 26 0" stroke="#7cf3ff" stroke-width="7" stroke-linecap="round" fill="none"/></g>
    <g class="eyes-a" opacity="0"><path d="M84 96 l28 14 M176 96 l-28 14" stroke="#ff5d73" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="122" r="9" fill="#ff5d73"/><circle cx="160" cy="122" r="9" fill="#ff5d73"/></g>
    <g class="eyes-q" opacity="0"><rect x="88" y="104" width="22" height="18" rx="9" fill="#7cf3ff"/><rect x="150" y="96" width="22" height="30" rx="11" fill="#7cf3ff"/></g>
    <path class="m-n" d="M112 146 h36" stroke="#7cf3ff" stroke-width="6" stroke-linecap="round"/>
    <rect class="m-talk" x="112" y="138" width="36" height="14" rx="7" fill="#7cf3ff" opacity="0"/>
  </g></g>
</svg>`;

// Delegate: the "AI intern" - navy body, cyan face screen, the deck's bolt on the chest, an INTERN name tag.
const NAVY = "#121a30", CYAN = "#21c7d6";
const DLG = `<svg viewBox="0 0 240 300">
  <ellipse cx="120" cy="290" rx="80" ry="10" fill="rgba(31,33,64,.12)"/>
  <g class="fx"><g class="inner">
    <g class="arm-l"><path d="M56 192 q-38 4 -44 44" stroke="${NAVY}" stroke-width="24" stroke-linecap="round" fill="none"/><circle cx="12" cy="238" r="14" fill="${CYAN}" stroke="${INK}" stroke-width="4"/></g>
    <g class="arm-r"><path d="M184 192 q38 4 44 44" stroke="${NAVY}" stroke-width="24" stroke-linecap="round" fill="none"/><circle cx="228" cy="238" r="14" fill="${CYAN}" stroke="${INK}" stroke-width="4"/></g>
    <rect x="78" y="264" width="34" height="20" rx="10" fill="${NAVY}" stroke="${INK}" stroke-width="4"/><rect x="128" y="264" width="34" height="20" rx="10" fill="${NAVY}" stroke="${INK}" stroke-width="4"/>
    <rect x="52" y="152" width="136" height="122" rx="44" fill="${NAVY}" stroke="${INK}" stroke-width="5"/>
    <circle cx="120" cy="205" r="30" fill="${CYAN}" stroke="${INK}" stroke-width="4"/>
    <path d="M126 184 l-18 26 h15 l-7 22 l22 -30 h-15 z" fill="${NAVY}"/>
    <rect x="80" y="245" width="80" height="25" rx="12" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <text x="120" y="263" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="15" fill="${INK}">INTERN</text>
    <circle cx="34" cy="104" r="16" fill="${CYAN}" stroke="${INK}" stroke-width="4"/><circle cx="206" cy="104" r="16" fill="${CYAN}" stroke="${INK}" stroke-width="4"/>
    <rect x="38" y="42" width="164" height="128" rx="50" fill="${NAVY}" stroke="${INK}" stroke-width="5"/>
    <rect x="58" y="60" width="124" height="92" rx="34" fill="${CYAN}"/>
    <g class="eyes-n"><rect x="86" y="86" width="20" height="34" rx="10" fill="${NAVY}"/><rect x="134" y="86" width="20" height="34" rx="10" fill="${NAVY}"/></g>
    <g class="eyes-h" opacity="0"><path d="M84 110 q12 -22 24 0 M132 110 q12 -22 24 0" stroke="${NAVY}" stroke-width="7" stroke-linecap="round" fill="none"/></g>
    <g class="eyes-a" opacity="0"><path d="M82 88 l26 12 M158 88 l-26 12" stroke="#d92d48" stroke-width="7" stroke-linecap="round"/><circle cx="96" cy="112" r="8" fill="${NAVY}"/><circle cx="144" cy="112" r="8" fill="${NAVY}"/></g>
    <g class="eyes-q" opacity="0"><rect x="86" y="98" width="20" height="20" rx="10" fill="${NAVY}"/><rect x="134" y="86" width="20" height="34" rx="10" fill="${NAVY}"/></g>
    <path class="m-n" d="M104 134 q16 14 32 0" stroke="${NAVY}" stroke-width="6" stroke-linecap="round" fill="none"/>
    <rect class="m-talk" x="106" y="130" width="28" height="12" rx="6" fill="${NAVY}" opacity="0"/>
    <g class="ant"><path d="M120 42 v-16" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><circle class="bulb" cx="120" cy="20" r="11" fill="#ffc93c" stroke="${INK}" stroke-width="4"/></g>
  </g></g>
</svg>`;

const KINDS = {
  sam: { svg: () => blob("#7b61ff", "#a594ff", HEADSET), ar: "196 170", al: "44 170", o: "120 275", mo: "120 164" },
  byte: { svg: () => BOT, ar: "220 205", al: "40 205", o: "130 312", mo: "130 145" },
  dlg: { svg: () => DLG, ar: "184 192", al: "56 192", o: "120 288", mo: "120 136" },
};
document.querySelectorAll(".char").forEach((el) => {
  const k = KINDS[el.dataset.kind];
  el.innerHTML = k.svg();
  el.dataset.ar = k.ar; el.dataset.al = k.al; el.dataset.o = k.o; el.dataset.mo = k.mo;
});
