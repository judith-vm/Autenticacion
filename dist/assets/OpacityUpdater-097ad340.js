import{S as a,I as s,af as e,K as y,ac as c}from"./index-0b1ddc83.js";class d{constructor(o){this.container=o}init(o){const n=o.options.opacity,i=1;o.opacity=a(n,i);const t=n.animation;t.enable&&(o.opacity.velocity=s(t.speed)/e*this.container.retina.reduceFactor,t.sync||(o.opacity.velocity*=y()))}isEnabled(o){return!o.destroyed&&!o.spawning&&!!o.opacity&&o.opacity.enable&&((o.opacity.maxLoops??0)<=0||(o.opacity.maxLoops??0)>0&&(o.opacity.loops??0)<(o.opacity.maxLoops??0))}reset(o){o.opacity&&(o.opacity.time=0,o.opacity.loops=0)}update(o,n){!this.isEnabled(o)||!o.opacity||c(o,o.opacity,!0,o.options.opacity.animation.destroy,n)}}export{d as OpacityUpdater};
