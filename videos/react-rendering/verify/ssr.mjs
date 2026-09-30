import React from 'react';
import { renderToString } from 'react-dom/server';
const e = React.createElement;
function Counter(){ const [n,setN]=React.useState(0); return e('button',{onClick:()=>setN(n+1)},'Clicked ',n,' times'); }
function App(){ return e('main',null,e('h1',null,'Hello SSR'),e(Counter)); }
console.log('CSR shell: <div id="root"></div><script src="/bundle.js"></script>');
console.log('SSR html :', renderToString(e(App)));
