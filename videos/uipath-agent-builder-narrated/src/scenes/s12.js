// ===================== 12 · Debug, evaluate, deploy =====================
enter("s12");
prep("#z120, #z121, #z122, #z123");
tl.set("#tr12, #hi12, #ev12, #pl12, #pb12", { opacity: 0 }, 0);
tl.set("#tr12 .tok, #hi12 .tok, #ev12 .tok, #qm12 .tok, #qm12 .ar, #dp12 .tok, #dp12 .ar", { opacity: 0 }, 0);
// the Execution Trail: what happened during the run, step by step
pop("#tr12", K("s12c", "execution"), { y: 30, s: 0.92, d: 0.7 });
const ex = [[0, "s12e", "tool", "#ffffff"], [1, "s12e", "inputs", "#ffffff"], [2, "s12e", "context", "#ffffff"], [3, "s12f", "output", "#ffffff"], [4, "s12f", "error", "#ffe1e6"]];
ex.forEach(([i, ln, kw, base]) => { const t = K(ln, kw); pop("#x12" + i, t, { y: 12, d: 0.4 }); flash("#x12" + i, t + 0.1, base, "#ffc93c", 0.25); });
shake("#x124", K("s12f", "error") + 0.5, 6);
// History: earlier runs; the failed one is opened in the trail
pop("#hi12", K("s12g", "history"), { y: 30, s: 0.92, d: 0.7 });
[0, 1, 2, 3].forEach((i) => pop("#h12" + i, K("s12g", "previous") + 0.2 + i * 0.35, { y: 12, d: 0.4 }));
trail("#d12", [["#h122", K("s12g", "executions") - 0.3], ["#tr12", K("s12g", "executions") + 0.5]], 0.6);
// Evaluations
pop("#ev12", K("s12h", "evaluations"), { y: 30, s: 0.92, d: 0.7 });
pop("#o12", K("s12i", "worked")); fade("#y12", K("s12ix", "evidence") - 0.3, 0.3); pop("#e12", K("s12ix", "evidence"), { s: 0.8, d: 0.6 });
[[0, "s12j", "evaluation"], [1, "s12j", "expected"], [2, "s12j", "multiple"], [3, "s12jx", "improve"]].forEach(([i, ln, kw]) => pop("#v12" + i, K(ln, kw), { y: 12, d: 0.4 }));
fade("#pl12, #pb12", K("s12j", "multiple"), 0.4);
tl.fromTo("#pf12", { scaleX: 0.2 }, { scaleX: 0.7, duration: 2.2, ease: "power1.inOut" }, K("s12j", "multiple"));
tl.to("#pf12", { scaleX: 1, duration: 1.5, ease: "power1.inOut" }, K("s12jx", "improve"));
// publish -> deploy -> observe -> collect feedback -> keep improving
const dp = [["#d120", "s12k", "publish"], ["#d121", "s12k", "deploy"], ["#d122", "s12k", "observe"], ["#d123", "s12kx", "feedback"], ["#d124", "s12kx", "improving"]];
dp.forEach(([sel, ln, kw], i) => { const t = K(ln, kw); pop(sel, t, { y: 12, d: 0.4 }); if (i) draw("#z12" + (i - 1), t - 0.3, 0.3); });
trail("#d12", dp.map(([sel, ln, kw]) => [sel, K(ln, kw) + 0.35]), 0.5);
pulse("#d124", K("s12kx", "improving") + 0.4, 1.12);
leave("s12");
