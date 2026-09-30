#!/usr/bin/env python3
"""One-time helper: builds src/template.html for this episode.

Reuses the shared framework from the closures video (styles, character drawings,
captions, animation helpers) and adds this episode's scenes. After it has run,
src/template.html is the source of truth; edit that directly.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = Path("/tmp/claude-0/closures-src/src/template.html").read_text()
L = BASE.split("\n")

def find(prefix, start=0):
    for i in range(start, len(L)):
        if L[i].startswith(prefix):
            return i
    raise KeyError(prefix)

i_style_end = find("    </style>")
i_body = find("  <body>")
i_badge = find('      <div id="badge">')
i_captions = find('      <div id="captions">')
i_script = find("    <script>")
i_hl = find("      // ---------------- code highlighting")
i_t1 = find("      // ===================== 1 · Title")

head_css = "\n".join(L[:i_style_end])
pre_root = "\n".join(L[i_body:i_badge])            # <body>, svg defs, <div id=root>, audio tags
pre_root = pre_root.replace("</audio>\n", "</audio>\n")
tail_dom = "\n".join(L[i_captions:i_script])        # captions + chars + closing root
framework_js = "\n".join(L[i_hl:i_t1])              # highlight, chars, captions, helpers, caption timeline

# code words (this, any, ...) are shown as highlighted code and pulse when spoken
_a = "'<span class=\"cw\" id=\"cw-' + id + \"-\" + i + '\">'"
assert _a in framework_js, "caption span markup changed"
framework_js = framework_js.replace(_a, "'<span class=\"cw' + (w.code ? ' code' : '') + '\" id=\"cw-' + id + \"-\" + i + '\">'")
_b = '          tl.to(sel, { color: "#1f2140", backgroundColor: "rgba(255,201,60,0.75)", duration: 0.08 }, a);\n          tl.to(sel, { backgroundColor: "rgba(255,201,60,0)", duration: 0.15 }, Math.max(a + 0.09, b - 0.05));'
assert _b in framework_js, "caption timeline changed"
framework_js = framework_js.replace(_b, """          const rest = w.code ? "rgba(106,77,240,0.14)" : "rgba(255,201,60,0)";
          tl.to(sel, { color: w.code ? "#3b2bb5" : "#1f2140", backgroundColor: "rgba(255,201,60,0.75)", duration: 0.08 }, a);
          tl.to(sel, { backgroundColor: rest, duration: 0.15 }, Math.max(a + 0.09, b - 0.05));
          if (w.code) tl.fromTo(sel, { scale: 1 }, { scale: 1.3, duration: 0.22, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 60%", immediateRender: false }, a);""")

EXTRA_CSS = r"""
      /* never merge === into a single glyph: this episode is about == vs === */
      #root, #root * { font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
      .cw.code { display: inline-block; font-family: var(--mono); font-weight: 800; color: #6a4df0; background-color: rgba(106, 77, 240, 0.14); padding: 0 0.3em; margin: 0 0.06em; }
      .step2 { position: absolute; font-size: 30px; font-weight: 700; background: #f4f5ff; border: 3px solid var(--ink); border-radius: 999px; padding: 6px 22px; white-space: nowrap; }
      .pillv { position: absolute; font-family: var(--mono); font-weight: 800; font-size: 30px; padding: 4px 22px; border-radius: 999px; border: 4px solid; white-space: nowrap; }
      .pillv.t { background: #d5f5e6; color: #0a8a5f; border-color: #0a8a5f; }
      .pillv.f { background: #ffd0d6; color: #d92d48; border-color: #d92d48; }
      .trow { position: absolute; left: 140px; width: 1000px; height: 70px; }
      .trow .ex { position: absolute; left: 24px; top: 12px; font-family: var(--mono); font-weight: 700; font-size: 30px; }
      .trow .pillv { top: 9px; }
      .th { position: absolute; top: 296px; font-family: var(--mono); font-weight: 800; font-size: 34px; }
      .tp { display: inline-block; font-size: 30px; font-weight: 800; background: #fff; border: 4px solid var(--ink); border-radius: 999px; padding: 8px 26px; box-shadow: 0 6px 0 rgba(31,33,64,.14); }
      #s1 h1 { font-size: 140px; }
      .gcell { position: absolute; padding: 14px 24px; font-size: 30px; font-weight: 700; line-height: 1.3; }
      .lbl { position: absolute; font-size: 32px; font-weight: 800; }
      .zone { position: absolute; }
      .kc .body { position: absolute; left: 30px; right: 30px; }
      .rcp { position: absolute; left: 140px; width: 1120px; height: 118px; display: flex; align-items: center; gap: 26px; padding: 0 32px; font-size: 34px; font-weight: 800; line-height: 1.25; }
      .rcp .ic { font-size: 60px; font-family: var(--mono); }
      .rcp small { display: block; font-size: 24px; font-weight: 600; color: var(--muted); margin-top: 2px; }
"""

SECTIONS = r"""
      <!-- 1 · Intro -->
      <section id="s1" class="clip" data-start="{{s1.start}}" data-duration="{{s1.dur}}" data-track-index="0">
        <div class="kick">JavaScript Demystified</div>
        <h1>Interview Questions</h1>
        <p>4 questions you will be asked, answered clearly</p>
        <div id="tps" style="position: absolute; left: 0; right: 0; top: 440px; display: flex; justify-content: center; gap: 22px">
          <span class="tp" id="tp1">== vs ===</span><span class="tp" id="tp2">var vs let</span><span class="tp" id="tp3">call · apply · bind</span><span class="tp" id="tp4">Promise.all vs race</span>
        </div>
      </section>

      <!-- 2 · Q1 concept -->
      <section id="s2" class="clip" data-start="{{s2.start}}" data-duration="{{s2.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #d92d48">Question 1 of 4</div>
        <h2>What is the difference between == and ===?</h2>
        <div class="card" id="cA2" style="left: 140px; top: 300px; width: 780px; height: 440px; border-color: #0a8a5f">
          <div class="hd" style="background: #0a8a5f">=== strict equality</div>
          <div id="eA2" style="position: absolute; left: 36px; top: 84px; font-family: var(--mono); font-weight: 800; font-size: 56px">1 === "1"</div>
          <div class="step2" id="stA1" style="left: 36px; top: 190px">① same type?  <b style="color: #d92d48">no</b></div>
          <div class="step2" id="stA2" style="left: 36px; top: 254px">② same value?  <b style="color: var(--muted)">not needed</b></div>
          <div class="pillv f" id="rA2" style="left: 36px; top: 336px; font-size: 44px">false</div>
        </div>
        <div class="card" id="cB2" style="left: 1000px; top: 300px; width: 780px; height: 440px; border-color: #d92d48">
          <div class="hd" style="background: #d92d48">== loose equality</div>
          <div id="eB2" style="position: absolute; left: 36px; top: 84px; font-family: var(--mono); font-weight: 800; font-size: 56px">1 == "1"</div>
          <div id="convB" style="position: absolute; left: 36px; top: 178px; display: flex; align-items: center; gap: 16px; font-family: var(--mono); font-weight: 800; font-size: 34px">
            <span style="background: #f4f5ff; border: 3px solid var(--ink); border-radius: 14px; padding: 2px 16px">"1"</span><span>⚙️ →</span><span id="cvto" style="background: #ffe9a8; border: 3px solid var(--ink); border-radius: 14px; padding: 2px 16px">1</span><span style="font-family: Inter, sans-serif; font-size: 24px; color: var(--muted)">string → number</span>
          </div>
          <div class="step2" id="stB2" style="left: 36px; top: 262px">② compare  1 and 1</div>
          <div class="pillv t" id="rB2" style="left: 36px; top: 344px; font-size: 44px">true</div>
        </div>
        <div class="tag" id="tagB2" style="left: 1090px; top: 770px; font-size: 30px; background: #ffe9a8">type coercion 🎭</div>
        <div class="tag" id="same2" style="left: 140px; top: 770px; font-size: 28px; background: #d5f5e6; color: #0a8a5f">same type on both sides? <span class="mono">==</span> acts exactly like <span class="mono">===</span></div>
      </section>

      <!-- 3 · Q1 proof table -->
      <section id="s3" class="clip" data-start="{{s3.start}}" data-duration="{{s3.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #d92d48">Question 1 of 4</div>
        <h2>== vs === in practice</h2>
        <div class="th" id="th3a" style="left: 620px; color: #d92d48">==</div>
        <div class="th" id="th3b" style="left: 870px; color: #0a8a5f">===</div>
        __TABLE3__
        <div class="card" id="rule3" style="left: 1200px; top: 290px; width: 580px; height: 180px; background: #d5f5e6; border-color: #0a8a5f; padding: 20px 28px">
          <div style="font-size: 26px; font-weight: 800; color: #0a8a5f; letter-spacing: 0.08em; text-transform: uppercase">Say this</div>
          <div style="font-size: 40px; font-weight: 900; margin-top: 8px; line-height: 1.15">Use <span class="mono">===</span> by default</div>
        </div>
        <div class="card" id="null3" style="left: 1200px; top: 490px; width: 580px; height: 170px; padding: 18px 28px">
          <div style="font-size: 24px; font-weight: 800; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase">Common exception</div>
          <div class="mono" style="font-size: 38px; font-weight: 800; margin-top: 6px">x == null</div>
          <div style="font-size: 24px; margin-top: 4px; color: var(--muted)">true for null and undefined only</div>
        </div>
        <div class="card" id="nan3" style="left: 1200px; top: 680px; width: 580px; height: 150px; padding: 18px 28px">
          <div style="font-size: 24px; font-weight: 800; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase">To check for NaN</div>
          <div class="mono" style="font-size: 38px; font-weight: 800; margin-top: 8px">Number.isNaN(x)</div>
        </div>
      </section>

      <!-- 4 · Q2 concept -->
      <section id="s4" class="clip" data-start="{{s4.start}}" data-duration="{{s4.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #0a7fbf">Question 2 of 4</div>
        <h2>What is the difference between var and let?</h2>
        <div class="lbl mono" id="hv4" style="left: 490px; top: 292px; color: #c2410c">var</div>
        <div class="lbl mono" id="hl4" style="left: 1140px; top: 292px; color: #0a7fbf">let</div>
        <div class="lbl" id="l41" style="left: 150px; top: 390px; color: var(--muted)">Scope</div>
        <div class="card" id="c41v" style="left: 470px; top: 350px; width: 620px; height: 120px"><div class="gcell">🏠 <b>function</b> scoped</div></div>
        <div class="card" id="c41l" style="left: 1120px; top: 350px; width: 660px; height: 120px"><div class="gcell">🧱 <b>block</b> scoped</div></div>
        <div class="lbl" id="l42" style="left: 150px; top: 540px; color: var(--muted)">Hoisting</div>
        <div class="card" id="c42v" style="left: 470px; top: 490px; width: 620px; height: 140px"><div class="gcell">Hoisted, and starts as <b class="mono" style="color: #c2410c">undefined</b></div></div>
        <div class="card" id="c42l" style="left: 1120px; top: 490px; width: 660px; height: 140px"><div class="gcell">Hoisted, but <b>uninitialized</b> until its declaration line</div></div>
        <div class="zone card" id="tdz4" style="left: 140px; top: 660px; width: 1640px; height: 170px; padding: 0; overflow: hidden">
          <div style="position: absolute; left: 0; top: 0; width: 900px; height: 100%; background: repeating-linear-gradient(135deg, #ffd0d6 0 18px, #ffe6ea 18px 36px)"></div>
          <div style="position: absolute; left: 24px; top: 14px; font-size: 26px; font-weight: 800; color: #d92d48">☠️ temporal dead zone: b exists, but touching it throws</div>
          <div class="mono" style="position: absolute; left: 24px; top: 78px; font-size: 26px; font-weight: 700">{ &nbsp; // block starts</div>
          <div style="position: absolute; left: 900px; top: 0; width: 6px; height: 100%; background: var(--ink)"></div>
          <div class="mono" style="position: absolute; left: 926px; top: 20px; font-size: 32px; font-weight: 800">let b = 2;</div>
          <div style="position: absolute; left: 926px; top: 92px; font-size: 26px; font-weight: 800; color: #0a8a5f">✓ from here on, b is usable</div>
        </div>
      </section>

      <!-- 5 · Q2 demo -->
      <section id="s5" class="clip" data-start="{{s5.start}}" data-duration="{{s5.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #0a7fbf">Question 2 of 4</div>
        <h2>var vs let in code</h2>
        <div class="code" id="code5a" style="left: 140px; top: 280px; width: 830px; font-size: 32px; line-height: 50px"></div>
        <div class="code" id="code5b" style="left: 140px; top: 280px; width: 830px; font-size: 32px; line-height: 50px"></div>
        <div class="code" id="code5c" style="left: 140px; top: 280px; width: 830px; font-size: 32px; line-height: 50px"></div>
        <div class="code" id="code5d" style="left: 140px; top: 280px; width: 830px; font-size: 32px; line-height: 50px"></div>
        <div class="code" id="code5e" style="left: 140px; top: 280px; width: 830px; font-size: 32px; line-height: 50px"></div>
        <div class="cons" id="cons5" style="left: 1030px; top: 280px; width: 750px; height: 270px">
          <div class="ct">console</div>
          <span class="out" id="o5a" style="position: absolute; left: 28px; top: 58px; font-size: 30px">undefined</span>
          <span class="out err" id="o5b" style="position: absolute; left: 28px; top: 106px; right: 28px; font-size: 26px; line-height: 1.3">ReferenceError: Cannot access 'b' before initialization</span>
          <span class="out" id="o5c" style="position: absolute; left: 28px; top: 58px; font-size: 30px">1</span>
          <span class="out err" id="o5d" style="position: absolute; left: 28px; top: 106px; right: 28px; font-size: 26px; line-height: 1.3">ReferenceError: y is not defined</span>
          <span class="out err" id="o5e" style="position: absolute; left: 28px; top: 58px; right: 28px; font-size: 26px; line-height: 1.3">SyntaxError: Identifier 'e' has already been declared</span>
          <span class="out" id="o5g" style="position: absolute; left: 28px; top: 58px; font-size: 30px">1</span>
          <span class="out" id="o5h" style="position: absolute; left: 28px; top: 106px; font-size: 30px">undefined</span>
          <span class="out err" id="o5f" style="position: absolute; left: 28px; top: 58px; right: 28px; font-size: 26px; line-height: 1.3">TypeError: Assignment to constant variable.</span>
        </div>
                <div class="cd" id="cd5" style="left: 1290px; top: 610px"><span class="cdn">3</span><span class="cdn">2</span><span class="cdn">1</span><div class="cdl">Think!</div></div>
        <div class="tag" id="tdz5" style="left: 1030px; top: 600px; background: #ffd0d6; color: #d92d48; font-size: 28px">☠️ temporal dead zone</div>
        <div class="tag" id="win5" style="left: 1030px; top: 600px; background: #ffe9a8; font-size: 28px">🌐 in a browser script</div>
        <div class="tag" id="leak5" style="left: 1030px; top: 600px; background: #ffe9a8; font-size: 28px">var x leaks out of the block</div>
        <div class="tag" id="stay5" style="left: 1030px; top: 600px; background: #d5f5e6; color: #0a8a5f; font-size: 28px">let y stays inside the block</div>
        <div class="card" id="rec5" style="left: 1030px; top: 600px; width: 750px; height: 200px; padding: 22px 30px; background: #d5f5e6; border-color: #0a8a5f">
          <div style="font-size: 26px; font-weight: 800; color: #0a8a5f; letter-spacing: 0.08em; text-transform: uppercase">Modern code</div>
          <div class="mono" style="font-size: 44px; font-weight: 800; margin-top: 10px">const → let</div>
          <div style="font-size: 30px; font-weight: 700; margin-top: 8px; color: #d92d48">avoid var</div>
        </div>
      </section>

      <!-- 6 · Q3 concept -->
      <section id="s6" class="clip" data-start="{{s6.start}}" data-duration="{{s6.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #6a4df0">Question 3 of 4</div>
        <h2>What is the difference between call, apply, and bind?</h2>
        <div class="card" id="ban6" style="left: 140px; top: 290px; width: 1640px; height: 84px; display: flex; align-items: center; padding: 0 34px; font-size: 34px; font-weight: 800; background: #efeaff">All three control what <span class="mono" style="color: #6a4df0; margin: 0 12px">this</span> points to inside a function</div>
        <div class="card fnc" id="kc6" style="left: 140px; top: 404px; width: 520px; height: 330px">
          <div class="hd">call</div>
          <div class="step2" style="left: 30px; top: 76px; background: #d5f5e6">▶ runs now</div>
          <div class="mono" style="position: absolute; left: 30px; top: 148px; font-size: 26px; font-weight: 700">fn.call(obj, a, b)</div>
          <div class="step2" id="ag6c" style="left: 30px; top: 220px; background: #ffe9a8">args: comma separated</div>
        </div>
        <div class="card fnc" id="ka6" style="left: 700px; top: 404px; width: 520px; height: 330px">
          <div class="hd">apply</div>
          <div class="step2" style="left: 30px; top: 76px; background: #d5f5e6">▶ runs now</div>
          <div class="mono" style="position: absolute; left: 30px; top: 148px; font-size: 26px; font-weight: 700">fn.apply(obj, [a, b])</div>
          <div class="step2" id="ag6a" style="left: 30px; top: 220px; background: #ffe9a8">args: an array</div>
        </div>
        <div class="card fnc" id="kb6" style="left: 1260px; top: 404px; width: 520px; height: 330px">
          <div class="hd">bind</div>
          <div class="step2" style="left: 30px; top: 76px; background: #ffe9a8">🎁 returns a new function</div>
          <div class="mono" style="position: absolute; left: 30px; top: 148px; font-size: 26px; font-weight: 700">const g = fn.bind(obj)</div>
          <div class="step2" style="left: 30px; top: 220px; background: #f4f5ff">runs later: g(a, b)</div>
        </div>
        <div class="tag" id="mn6" style="left: 140px; top: 764px; font-size: 34px; padding: 8px 28px"><b id="mnc" style="color: #d92d48">C</b>all = <b style="color: #d92d48">C</b>omma  ·  <b id="mna" style="color: #0a7fbf">A</b>pply = <b style="color: #0a7fbf">A</b>rray</div>
      </section>

      <!-- 7 · Q3 demo -->
      <section id="s7" class="clip" data-start="{{s7.start}}" data-duration="{{s7.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #6a4df0">Question 3 of 4</div>
        <h2>call, apply, and bind in code</h2>
        <div class="code" id="code7" style="left: 140px; top: 280px; width: 840px; font-size: 26px; line-height: 40px"></div>
        <div class="card fnc" id="fn7" style="left: 1010px; top: 290px; width: 770px; height: 190px">
          <div class="hd">function greet(greeting, punct)</div>
          <div class="chip" id="this7" style="left: 26px; top: 84px; position: absolute; font-size: 28px; border-color: #6a4df0">this = ?</div>
          <div class="chip" id="res7" style="left: 300px; top: 84px; position: absolute; font-size: 28px; border-color: #0a8a5f; background: #d5f5e6">→ "Hi, Ava!"</div>
        </div>
        <div class="card" id="ava7" style="left: 1010px; top: 550px; width: 360px; height: 110px"><div class="hd" style="background: var(--ink); font-size: 22px; padding: 4px 18px">Ava</div><div class="mono" style="padding: 10px 20px; font-size: 26px; font-weight: 700">{ name: <span class="st">"Ava"</span> }</div></div>
        <div class="card" id="ben7" style="left: 1420px; top: 550px; width: 360px; height: 110px"><div class="hd" style="background: var(--ink); font-size: 22px; padding: 4px 18px">Ben</div><div class="mono" style="padding: 10px 20px; font-size: 26px; font-weight: 700">{ name: <span class="st">"Ben"</span> }</div></div>
        <svg class="ov">
          <line id="arA7" x1="1190" y1="546" x2="1190" y2="486" stroke="#6a4df0" marker-end="url(#ahGrape)" />
          <line id="arB7" x1="1600" y1="546" x2="1300" y2="486" stroke="#6a4df0" marker-end="url(#ahGrape)" />
        </svg>
        <div class="card fnc" id="bound7" style="left: 1010px; top: 700px; width: 770px; height: 130px"><div class="hd">greetAva  (a new function)</div><div style="padding: 12px 26px; font-size: 28px; font-weight: 800">🔒 this is locked to <span class="mono" style="color: #6a4df0">Ava</span></div><div class="chip" id="res7b" style="left: 470px; top: 62px; position: absolute; font-size: 26px; border-color: #0a8a5f; background: #d5f5e6">→ "Hey, Ava."</div></div>
      </section>

      <!-- 7x · Q3 bonus facts -->
      <section id="s7x" class="clip" data-start="{{s7x.start}}" data-duration="{{s7x.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #6a4df0">Question 3 of 4 · bonus</div>
        <h2>Three bonus facts interviewers love</h2>
        <div class="card fnc" id="bn1" style="left: 140px; top: 300px; width: 520px; height: 340px">
          <div class="hd">1 · Partial application</div>
          <div class="mono" style="position: absolute; left: 28px; top: 78px; font-size: 24px; font-weight: 700; line-height: 1.5">const hiAva =<br />&nbsp; greet.bind(ava, "Hi");</div>
          <div class="mono" style="position: absolute; left: 28px; top: 186px; font-size: 26px; font-weight: 700">hiAva("!")</div>
          <div class="chip" id="bn1r" style="left: 28px; top: 240px; position: absolute; font-size: 26px; border-color: #0a8a5f; background: #d5f5e6">→ "Hi, Ava!"</div>
        </div>
        <div class="card fnc" id="bn2" style="left: 700px; top: 300px; width: 520px; height: 340px">
          <div class="hd">2 · Bound is permanent</div>
          <div class="mono" style="position: absolute; left: 28px; top: 78px; font-size: 24px; font-weight: 700; line-height: 1.5">greetAva.call(ben,<br />&nbsp; "Hey", ".")</div>
          <div class="chip" id="bn2r" style="left: 28px; top: 200px; position: absolute; font-size: 26px; border-color: #0a8a5f; background: #d5f5e6">→ "Hey, Ava."</div>
          <div style="position: absolute; left: 28px; top: 268px; font-size: 24px; font-weight: 700; color: var(--muted)">🔒 still Ava, not Ben</div>
        </div>
        <div class="card fnc" id="bn3" style="left: 1260px; top: 300px; width: 520px; height: 340px">
          <div class="hd">3 · Arrow functions</div>
          <div class="mono" style="position: absolute; left: 28px; top: 78px; font-size: 24px; font-weight: 700; line-height: 1.5">const f = () =&gt; this;<br />f.call(ava) === ava</div>
          <div class="chip" id="bn3r" style="left: 28px; top: 200px; position: absolute; font-size: 26px; border-color: #d92d48; background: #ffd0d6">→ false</div>
          <div style="position: absolute; left: 28px; top: 268px; font-size: 24px; font-weight: 700; color: var(--muted)">this comes from where it was written</div>
        </div>
        <div class="card" id="bn4" style="left: 140px; top: 676px; width: 1640px; height: 112px; display: flex; align-items: center; gap: 28px; padding: 0 34px; background: #fff7d6">
          <span style="font-size: 26px; font-weight: 800; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase">Modern tip</span>
          <span class="mono" style="font-size: 30px; font-weight: 700">Math.max.apply(null, nums)</span><span style="font-size: 36px; font-weight: 900">→</span><span class="mono" style="font-size: 30px; font-weight: 800; color: #0a8a5f">Math.max(...nums)</span>
        </div>
      </section>

      <!-- 8 · Q4 concept -->
      <section id="s8" class="clip" data-start="{{s8.start}}" data-duration="{{s8.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #0a8a5f">Question 4 of 4</div>
        <h2>What is the difference between Promise.all and Promise.race?</h2>
        <div class="card" id="cAll8" style="left: 140px; top: 320px; width: 790px; height: 430px; border-color: #0a7fbf">
          <div class="hd" style="background: #0a7fbf; font-size: 30px">Promise.all</div>
          <div style="position: absolute; left: 34px; top: 84px; font-size: 40px; font-weight: 900">🏁 waits for <u>every</u> promise</div>
          <div class="step2" id="allB1" style="left: 34px; top: 190px">→ an array, in <b>input</b> order</div>
          <div class="step2" id="allB2" style="left: 34px; top: 262px; background: #ffd0d6">✗ any rejection rejects it at once</div>
          <div class="mono" id="allB3" style="position: absolute; left: 34px; top: 350px; font-size: 30px; font-weight: 700; color: var(--muted)">[ result1, result2, result3 ]</div>
        </div>
        <div class="card" id="cRace8" style="left: 990px; top: 320px; width: 790px; height: 430px; border-color: #c2410c">
          <div class="hd" style="background: #c2410c; font-size: 30px">Promise.race</div>
          <div style="position: absolute; left: 34px; top: 84px; font-size: 40px; font-weight: 900">🥇 the <u>first</u> to settle wins</div>
          <div class="step2" id="raceB1" style="left: 34px; top: 190px">→ just that one result</div>
          </div>
      </section>

      <!-- 9 · Q4 demo -->
      <section id="s9" class="clip" data-start="{{s9.start}}" data-duration="{{s9.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #0a8a5f">Question 4 of 4</div>
        <h2>all vs race in code</h2>
        <div class="code" id="code9" style="left: 140px; top: 280px; width: 930px; font-size: 23px; line-height: 38px"></div>
        <div class="card" id="trk9" style="left: 1110px; top: 280px; width: 670px; height: 380px">
          <div class="hd" style="background: var(--ink); font-size: 22px; display: flex; justify-content: space-between"><span>timeline</span><span class="mono" id="clk9">0 ms</span></div>
          <div class="mono" style="position: absolute; left: 24px; top: 66px; font-size: 24px; font-weight: 700">slow  500 ms</div>
          <div style="position: absolute; left: 24px; top: 100px; width: 620px; height: 34px; border: 3px solid var(--ink); border-radius: 17px; background: #f4f5ff; overflow: hidden"><div id="bs9" style="width: 100%; height: 100%; background: #6a4df0; transform-origin: left center"></div></div>
          <div class="mono" style="position: absolute; left: 24px; top: 158px; font-size: 24px; font-weight: 700">fast  100 ms</div>
          <div style="position: absolute; left: 24px; top: 192px; width: 620px; height: 34px; border: 3px solid var(--ink); border-radius: 17px; background: #f4f5ff; overflow: hidden"><div id="bf9" style="width: 20%; height: 100%; background: #0a8a5f; transform-origin: left center"></div></div>
          <div class="chip" id="rall9" style="left: 24px; top: 258px; font-size: 24px; border-color: #0a7fbf; background: #dff1ff">Promise.all → ["slow", "fast"]</div>
          <div class="chip" id="rrace9" style="left: 24px; top: 316px; font-size: 24px; border-color: #c2410c; background: #ffe9d6">Promise.race → "fast"</div>
        </div>
        <div class="card" id="q9" style="left: 1110px; top: 690px; width: 590px; height: 110px; display: flex; align-items: center; padding: 0 26px; font-size: 30px; font-weight: 800; line-height: 1.25; background: #fff7d6">Does Promise.all cancel the other promises?</div>
        <div class="card" id="no9" style="left: 1110px; top: 690px; width: 590px; height: 110px; display: flex; align-items: center; padding: 0 26px; font-size: 30px; font-weight: 800; line-height: 1.25; background: #ffd0d6; border-color: #d92d48">❌ No. The others keep running.</div>
        <div class="code" id="code9b" style="left: 1110px; top: 690px; width: 590px; font-size: 21px; line-height: 34px; padding: 14px 22px"></div>
        <div class="tag" id="first9" style="left: 1110px; top: 700px; font-size: 26px; background: #ffe9a8; padding: 8px 22px">first to settle wins: success <u>or</u> failure</div>
        <div class="tag" id="still9" style="left: 1450px; top: 330px; font-size: 22px; padding: 4px 14px; background: #d5f5e6; color: #0a8a5f">✓ still finished</div>
      </section>

      <!-- 9x · Q4 the other combinators -->
      <section id="s9x" class="clip" data-start="{{s9x.start}}" data-duration="{{s9x.dur}}" data-track-index="0">
        <div class="eyebrow" style="background: #0a8a5f">Question 4 of 4 · bonus</div>
        <h2>The four promise combinators</h2>
        <div class="card" id="pa9" style="left: 140px; top: 300px; width: 790px; height: 240px; border-color: #0a7fbf">
          <div class="hd mono" style="background: #0a7fbf; font-size: 28px">Promise.all</div>
          <div style="padding: 16px 28px; font-size: 28px; line-height: 1.5"><b>Waits for</b> every promise to fulfill<br /><b>Rejects</b> on the first rejection</div>
        </div>
        <div class="card" id="ps9" style="left: 990px; top: 300px; width: 790px; height: 240px; border-color: #6a4df0">
          <div class="hd mono" style="background: #6a4df0; font-size: 28px">Promise.allSettled</div>
          <div style="padding: 16px 28px; font-size: 28px; line-height: 1.5"><b>Waits for</b> every promise to settle<br /><b>Never rejects</b>: a status for each</div>
        </div>
        <div class="card" id="pr9" style="left: 140px; top: 570px; width: 790px; height: 240px; border-color: #c2410c">
          <div class="hd mono" style="background: #c2410c; font-size: 28px">Promise.race</div>
          <div style="padding: 16px 28px; font-size: 28px; line-height: 1.5"><b>Waits for</b> the first to settle<br /><b>Result</b>: success or failure</div>
          <div class="chip" id="trap9" style="left: 28px; top: 158px; position: absolute; font-size: 22px; border-color: #d92d48; background: #ffd0d6; padding: 3px 14px">⚠ race([]) never settles</div>
        </div>
        <div class="card" id="pn9" style="left: 990px; top: 570px; width: 790px; height: 240px; border-color: #0a8a5f">
          <div class="hd mono" style="background: #0a8a5f; font-size: 28px">Promise.any</div>
          <div style="padding: 16px 28px; font-size: 28px; line-height: 1.5"><b>Waits for</b> the first to fulfill<br /><b>Rejects</b> only if all reject: <b class="mono" id="agg9" style="display: inline-block; color: #d92d48; font-size: 24px">AggregateError</b></div>
        </div>
      </section>

      <!-- 10 · Recap -->
      <section id="s10" class="clip" data-start="{{s10.start}}" data-duration="{{s10.dur}}" data-track-index="0">
        <div class="eyebrow">Recap</div>
        <h2>Four answers to remember</h2>
        <div class="card rcp" id="rc1" style="top: 290px"><span class="ic" style="color: #d92d48">===</span><div><span class="mono">===</span> compares value and type<small><span class="mono">==</span> converts types first</small></div></div>
        <div class="card rcp" id="rc2" style="top: 428px"><span class="ic" style="color: #0a7fbf">let</span><div>var: function scope · let: block scope<small>let has a temporal dead zone</small></div></div>
        <div class="card rcp" id="rc3" style="top: 566px"><span class="ic" style="color: #6a4df0">this</span><div>call and apply run now<small>bind returns a new function</small></div></div>
        <div class="card rcp" id="rc4" style="top: 704px"><span class="ic" style="color: #0a8a5f">⏱</span><div>all waits for everyone · race takes the first<small>neither cancels anything</small></div></div>
        <div class="tag" id="next10" style="right: 140px; top: 200px; font-size: 30px; background: var(--sun)">More interview questions soon</div>
      </section>
"""

# ---- table for scene 3 ----
rows = [
    ('0 <span style="color:var(--muted)">vs</span> false', "true", "false"),
    ('"1" <span style="color:var(--muted)">vs</span> 1', "true", "false"),
    ("null <span style=\"color:var(--muted)\">vs</span> undefined", "true", "false"),
    ("NaN <span style=\"color:var(--muted)\">vs</span> NaN", "false", "false"),
    ("[] <span style=\"color:var(--muted)\">vs</span> []", "false", "false"),
]
table = []
for i, (ex, a, b) in enumerate(rows, 1):
    top = 340 + (i - 1) * 84
    table.append(
        f'<div class="card trow" id="r3_{i}" style="top: {top}px"><div class="ex">{ex}</div>'
        f'<span class="pillv {"t" if a == "true" else "f"}" id="c3_{i}_1" style="left: 480px">{a}</span>'
        f'<span class="pillv {"t" if b == "true" else "f"}" id="c3_{i}_2" style="left: 730px">{b}</span></div>'
    )
SECTIONS = SECTIONS.replace("__TABLE3__", "\n        ".join(table))

CODE_JS = r'''      const T = /*__TIMING__*/ null;
      const CODE = {
        code5a: `console.log(a);
var a = 1;
console.log(b);
let b = 2;`,
        code5b: `if (true) {
  var x = 1;
  let y = 2;
}
console.log(x);  // 1
console.log(y);  // ReferenceError`,
        code5c: `var d = 1;
var d = 2;     // OK

let e = 1;
let e = 2;     // SyntaxError`,
        code5d: `const c = 1;
c = 2;         // TypeError

const user = { n: 1 };
user.n = 2;    // OK: object changed`,
        code5e: `var a = 1;
let b = 2;

window.a;   // 1
window.b;   // undefined`,
        code7: `const ava = { name: "Ava" };
const ben = { name: "Ben" };

function greet(greeting, punct) {
  return greeting + ", " + this.name + punct;
}

greet.call(ava, "Hi", "!");
greet.apply(ben, ["Hello", "?"]);
const greetAva = greet.bind(ava);
greetAva("Hey", ".");`,
        code9: `const slow = new Promise(r => setTimeout(r, 500, "slow"));
const fast = new Promise(r => setTimeout(r, 100, "fast"));

Promise.all([slow, fast]).then(console.log);
// ["slow", "fast"]   after 500 ms

Promise.race([slow, fast]).then(console.log);
// "fast"             after 100 ms`,
        code9b: `const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();   // stops the fetch`,
      };
'''

TIMELINE_JS = (Path(__file__).resolve().parent / "timeline_scenes.js").read_text()

out = head_css.replace("</style>", "") + EXTRA_CSS + "    </style>\n  </head>\n" + pre_root + "\n"
out += '      <div id="badge">JavaScript Demystified · Interview Q&amp;A</div>\n' + SECTIONS + "\n" + tail_dom + "\n"
out += "    <script>\n" + CODE_JS + "\n" + framework_js + "\n" + TIMELINE_JS + "\n    </script>\n  </body>\n</html>\n"
(ROOT / "src" / "template.html").write_text(out)
print("wrote src/template.html", len(out))
