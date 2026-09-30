import React from 'react';
import { renderToPipeableStream } from 'react-server-dom-webpack/server';
const e=React.createElement;
const Like = function LikeButton(){}; 
Object.defineProperty(Like,'$$typeof',{value:Symbol.for('react.client.reference')});
Like.$$id='./LikeButton.js#default'; Like.$$async=false;
async function Product(){ const p = await Promise.resolve({name:'Sneakers',price:'59 USD'}); return e('article',null,e('h1',null,p.name),e('p',null,p.price),e(Like,{id:7})); }
const manifest={ './LikeButton.js#default': {id:'./LikeButton.js',chunks:['like'],name:'default'} };
const {PassThrough}=await import('stream'); const s=new PassThrough(); let out=''; s.on('data',d=>out+=d); s.on('end',()=>console.log(out));
renderToPipeableStream(e(Product),manifest).pipe(s);
