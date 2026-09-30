var pipe;
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
const e=React.createElement;
let done=false; const p=new Promise(r=>setTimeout(r,50));
function Slow(){ if(!done){ throw p.then(()=>{done=true}); } return e('p',null,'Reviews loaded'); }
const {PassThrough}=await import('stream'); const s=new PassThrough(); let out='';
s.on('data',d=>out+=d); s.on('end',()=>console.log(out));
pipe=renderToPipeableStream(e('main',null,e('h1',null,'Shop'),e(React.Suspense,{fallback:e('p',null,'Loading reviews...')},e(Slow))),{onShellReady(){pipe.pipe(s)}});
 
