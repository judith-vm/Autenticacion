import{Push as u}from"./index-54fb22b5.js";import{I as p,aa as c}from"./index-0b1ddc83.js";import{E as d}from"./ExternalInteractorBase-029fb1b6.js";const h="push",l=0;class O extends d{constructor(e){super(e),this.handleClickMode=n=>{if(n!==h)return;const t=this.container,o=t.actualOptions,r=o.interactivity.modes.push;if(!r)return;const i=p(r.quantity);if(i<=l)return;const s=c([void 0,...r.groups]),a=s!==void 0?t.actualOptions.particles.groups[s]:void 0;t.particles.push(i,t.interactivity.mouse,a,s)}}clear(){}init(){}interact(){}isEnabled(){return!0}loadModeOptions(e,...n){e.push||(e.push=new u);for(const t of n)e.push.load(t==null?void 0:t.push)}reset(){}}export{O as Pusher};