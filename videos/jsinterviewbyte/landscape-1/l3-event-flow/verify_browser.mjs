import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell" });
const p = await b.newPage();
const run = async (html) => { const p = await b.newPage(); await p.setContent(html); return p.evaluate(() => { document.querySelector("button").click(); return window.log; }); };
const base = (extra) => `<div id="outer"><div id="middle"><button id="inner">Go</button></div></div><script>window.log=[];const L=(n)=>()=>window.log.push(n);
const o=document.getElementById("outer"),m=document.getElementById("middle"),b=document.getElementById("inner");${extra}</script>`;
console.log("A bubbling default:", JSON.stringify(await run(base(`o.addEventListener("click",L("outer"));m.addEventListener("click",L("middle"));b.addEventListener("click",L("button"));`))));
console.log("B capture on outer+middle, bubble on button:", JSON.stringify(await run(base(`o.addEventListener("click",L("outer"),true);m.addEventListener("click",L("middle"),true);b.addEventListener("click",L("button"));`))));
console.log("C all both phases:", JSON.stringify(await run(base(`for (const [e,n] of [[o,"outer"],[m,"middle"],[b,"button"]]) { e.addEventListener("click",L(n+" capture"),true); e.addEventListener("click",L(n+" bubble")); }`))));
console.log("D stopPropagation in middle:", JSON.stringify(await run(base(`o.addEventListener("click",L("outer"));m.addEventListener("click",(e)=>{window.log.push("middle");e.stopPropagation();});b.addEventListener("click",L("button"));`))));
// delegation
const p2 = await b.newPage(); await p2.setContent(`<ul id="list"><li>A</li><li>B</li></ul><script>window.log=[];document.getElementById("list").addEventListener("click",(e)=>{ if(e.target.tagName==="LI") window.log.push(e.target.textContent); });</script>`);
console.log("E delegation:", JSON.stringify(await p2.evaluate(() => { const l=document.getElementById("list"); const li=document.createElement("li"); li.textContent="C"; l.appendChild(li); l.children[0].click(); l.children[2].click(); return window.log; })));
console.log("F eventPhase:", JSON.stringify(await run(base(`for (const [e,n] of [[o,"outer"],[b,"button"]]) { e.addEventListener("click",(ev)=>window.log.push(n+":"+ev.eventPhase),true); e.addEventListener("click",(ev)=>window.log.push(n+":"+ev.eventPhase)); }`))));
await b.close();
