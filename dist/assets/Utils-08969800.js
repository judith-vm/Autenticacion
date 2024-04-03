import{_ as O}from"./index-0b1ddc83.js";const R=[0,4,2,1],G=[8,8,4,2];class U{constructor(a){this.pos=0,this.data=new Uint8ClampedArray(a)}getString(a){const s=this.data.slice(this.pos,this.pos+a);return this.pos+=s.length,s.reduce((n,f)=>n+String.fromCharCode(f),"")}nextByte(){return this.data[this.pos++]}nextTwoBytes(){return this.pos+=2,this.data[this.pos-2]+(this.data[this.pos-1]<<8)}readSubBlocks(){let a="",s=0;const n=0,f=0;do{s=this.data[this.pos++];for(let e=s;--e>=n;a+=String.fromCharCode(this.data[this.pos++]));}while(s!==f);return a}readSubBlocksBin(){let a=this.data[this.pos],s=0;const n=0,f=1;for(let o=0;a!==n;o+=a+f,a=this.data[this.pos+o])s+=a;const e=new Uint8Array(s);a=this.data[this.pos++];for(let o=0;a!==n;a=this.data[this.pos++])for(let r=a;--r>=n;e[o++]=this.data[this.pos++]);return e}skipSubBlocks(){for(const a=1,s=0;this.data[this.pos]!==s;this.pos+=this.data[this.pos]+a);this.pos++}}const u={x:0,y:0},N=0,L=.5,$=0,A=0,z=0;function _(t,a){const s=[];for(let n=0;n<a;n++)s.push({r:t.data[t.pos],g:t.data[t.pos+1],b:t.data[t.pos+2]}),t.pos+=3;return s}function Q(t,a,s,n){switch(t.nextByte()){case 249:{const f=a.frames[s(!1)];t.pos++;const e=t.nextByte();f.GCreserved=(e&224)>>>5,f.disposalMethod=(e&28)>>>2,f.userInputDelayFlag=(e&2)===2;const o=(e&1)===1;f.delayTime=t.nextTwoBytes()*10;const r=t.nextByte();o&&n(r),t.pos++;break}case 255:{t.pos++;const f={identifier:t.getString(8),authenticationCode:t.getString(3),data:t.readSubBlocksBin()};a.applicationExtensions.push(f);break}case 254:{a.comments.push([s(!1),t.readSubBlocks()]);break}case 1:{if(a.globalColorTable.length===0)throw new EvalError("plain text extension without global color table");t.pos++,a.frames[s(!1)].plainTextData={left:t.nextTwoBytes(),top:t.nextTwoBytes(),width:t.nextTwoBytes(),height:t.nextTwoBytes(),charSize:{width:t.nextTwoBytes(),height:t.nextTwoBytes()},foregroundColor:t.nextByte(),backgroundColor:t.nextByte(),text:t.readSubBlocks()};break}default:t.skipSubBlocks();break}}async function W(t,a,s,n,f,e){const o=a.frames[n(!0)];o.left=t.nextTwoBytes(),o.top=t.nextTwoBytes(),o.width=t.nextTwoBytes(),o.height=t.nextTwoBytes();const r=t.nextByte(),x=(r&128)===128,d=(r&64)===64;o.sortFlag=(r&32)===32,o.reserved=(r&24)>>>3;const c=1<<(r&7)+1;x&&(o.localColorTable=_(t,c));const m=l=>{const{r:h,g:p,b:i}=(x?o.localColorTable:a.globalColorTable)[l];return l!==f(null)?{r:h,g:p,b:i,a:255}:{r:h,g:p,b:i,a:s?~~((h+p+i)/3):0}},B=(()=>{try{return new ImageData(o.width,o.height,{colorSpace:"srgb"})}catch(l){if(l instanceof DOMException&&l.name==="IndexSizeError")return null;throw l}})();if(B==null)throw new EvalError("GIF frame size is to large");const D=t.nextByte(),b=t.readSubBlocksBin(),w=1<<D,k=(l,h)=>{const p=l>>>3,i=l&7;return(b[p]+(b[p+1]<<8)+(b[p+2]<<16)&(1<<h)-1<<i)>>>i};if(d){for(let l=0,h=D+1,p=0,i=[[0]],I=0;I<4;I++){if(R[I]<o.height){let g=0,y=0,T=!1;for(;!T;){const E=l;if(l=k(p,h),p+=h+1,l===w){h=D+1,i.length=w+2;for(let C=0;C<i.length;C++)i[C]=C<w?[C]:[]}else{l>=i.length?i.push(i[E].concat(i[E][0])):E!==w&&i.push(i[E].concat(i[l][0]));for(const C of i[l]){const{r:v,g:F,b:P,a:M}=m(C);B.data.set([v,F,P,M],R[I]*o.width+G[I]*y+g%(o.width*4)),g+=4}i.length===1<<h&&h<12&&h++}g===o.width*4*(y+1)&&(y++,R[I]+G[I]*y>=o.height&&(T=!0))}}e==null||e(t.pos/(t.data.length-1),n(!1)+1,B,{x:o.left,y:o.top},{width:a.width,height:a.height})}o.image=B,o.bitmap=await createImageBitmap(B)}else{let l=0,h=D+1,p=0,i=-4,I=!1;const g=[[0]];for(;!I;){const y=l;if(l=k(p,h),p+=h,l===w){h=D+1,g.length=w+2;for(let T=0;T<g.length;T++)g[T]=T<w?[T]:[]}else{if(l===w+1){I=!0;break}l>=g.length?g.push(g[y].concat(g[y][0])):y!==w&&g.push(g[y].concat(g[l][0]));for(const T of g[l]){const{r:E,g:C,b:v,a:F}=m(T);B.data.set([E,C,v,F],i+=4)}g.length>=1<<h&&h<12&&h++}}o.image=B,o.bitmap=await createImageBitmap(B),e==null||e((t.pos+1)/t.data.length,n(!1)+1,o.image,{x:o.left,y:o.top},{width:a.width,height:a.height})}}async function j(t,a,s,n,f,e){switch(t.nextByte()){case 59:return!0;case 44:await W(t,a,s,n,f,e);break;case 33:Q(t,a,n,f);break;default:throw new EvalError("undefined block found")}return!1}function q(t){for(const a of t.applicationExtensions)if(a.identifier+a.authenticationCode==="NETSCAPE2.0")return a.data[1]+(a.data[2]<<8);return NaN}async function H(t,a,s){s||(s=!1);const n=await fetch(t);if(!n.ok&&n.status===404)throw new EvalError("file not found");const f=await n.arrayBuffer(),e={width:0,height:0,totalTime:0,colorRes:0,pixelAspectRatio:0,frames:[],sortFlag:!1,globalColorTable:[],backgroundImage:new ImageData(1,1,{colorSpace:"srgb"}),comments:[],applicationExtensions:[]},o=new U(new Uint8ClampedArray(f));if(o.getString(6)!=="GIF89a")throw new Error("not a supported GIF file");e.width=o.nextTwoBytes(),e.height=o.nextTwoBytes();const r=o.nextByte(),x=(r&128)===128;e.colorRes=(r&112)>>>4,e.sortFlag=(r&8)===8;const d=1<<(r&7)+1,c=o.nextByte();e.pixelAspectRatio=o.nextByte(),e.pixelAspectRatio!==0&&(e.pixelAspectRatio=(e.pixelAspectRatio+15)/64),x&&(e.globalColorTable=_(o,d));const m=(()=>{try{return new ImageData(e.width,e.height,{colorSpace:"srgb"})}catch(i){if(i instanceof DOMException&&i.name==="IndexSizeError")return null;throw i}})();if(m==null)throw new Error("GIF frame size is to large");const{r:B,g:D,b}=e.globalColorTable[c];m.data.set(x?[B,D,b,255]:[0,0,0,0]);for(let i=4;i<m.data.length;i*=2)m.data.copyWithin(i,0,i);e.backgroundImage=m;let w=-1,k=!0,l=-1;const h=i=>(i&&(k=!0),w),p=i=>(i!=null&&(l=i),l);try{do k&&(e.frames.push({left:0,top:0,width:0,height:0,disposalMethod:0,image:new ImageData(1,1,{colorSpace:"srgb"}),plainTextData:null,userInputDelayFlag:!1,delayTime:0,sortFlag:!1,localColorTable:[],reserved:0,GCreserved:0}),w++,l=-1,k=!1);while(!await j(o,e,s,h,p,a));e.frames.length--;for(const i of e.frames){if(i.userInputDelayFlag&&i.delayTime===0){e.totalTime=1/0;break}e.totalTime+=i.delayTime}return e}catch(i){throw i instanceof EvalError?new Error(`error while parsing frame ${w} "${i.message}"`):i}}function K(t){const{context:a,radius:s,particle:n,delta:f}=t,e=n.image;if(!(e!=null&&e.gifData)||!e.gif)return;const o=new OffscreenCanvas(e.gifData.width,e.gifData.height),r=o.getContext("2d");if(!r)throw new Error("could not create offscreen canvas context");r.imageSmoothingQuality="low",r.imageSmoothingEnabled=!1,r.clearRect(u.x,u.y,o.width,o.height),n.gifLoopCount===void 0&&(n.gifLoopCount=e.gifLoopCount??z);let x=n.gifFrame??N;const d={x:-e.gifData.width*L,y:-e.gifData.height*L},c=e.gifData.frames[x];if(n.gifTime===void 0&&(n.gifTime=$),!!c.bitmap){switch(a.scale(s/e.gifData.width,s/e.gifData.height),c.disposalMethod){case 4:case 5:case 6:case 7:case 0:r.drawImage(c.bitmap,c.left,c.top),a.drawImage(o,d.x,d.y),r.clearRect(u.x,u.y,o.width,o.height);break;case 1:r.drawImage(c.bitmap,c.left,c.top),a.drawImage(o,d.x,d.y);break;case 2:r.drawImage(c.bitmap,c.left,c.top),a.drawImage(o,d.x,d.y),r.clearRect(u.x,u.y,o.width,o.height),e.gifData.globalColorTable.length?r.putImageData(e.gifData.backgroundImage,d.x,d.y):r.putImageData(e.gifData.frames[A].image,d.x+c.left,d.y+c.top);break;case 3:{const m=r.getImageData(u.x,u.y,o.width,o.height);r.drawImage(c.bitmap,c.left,c.top),a.drawImage(o,d.x,d.y),r.clearRect(u.x,u.y,o.width,o.height),r.putImageData(m,u.x,u.y)}break}if(n.gifTime+=f.value,n.gifTime>c.delayTime){if(n.gifTime-=c.delayTime,++x>=e.gifData.frames.length){if(--n.gifLoopCount<=z)return;x=A,r.clearRect(u.x,u.y,o.width,o.height)}n.gifFrame=x}a.scale(e.gifData.width/s,e.gifData.height/s)}}async function V(t){if(t.type!=="gif"){const{loadImage:a}=await O(()=>import("./index-7752f1b0.js").then(s=>s.U),["assets/index-7752f1b0.js","assets/index-0b1ddc83.js","assets/index-92f6ad8c.css"]);await a(t);return}t.loading=!0;try{t.gifData=await H(t.source),t.gifLoopCount=q(t.gifData)??z,t.gifLoopCount||(t.gifLoopCount=1/0)}catch{t.error=!0}t.loading=!1}export{H as decodeGIF,K as drawGif,q as getGIFLoopAmount,V as loadGifImage};
