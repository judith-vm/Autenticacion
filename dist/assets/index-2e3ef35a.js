import{_ as e}from"./index-0b1ddc83.js";class a{constructor(){this.factor=3,this.radius=200}load(r){r&&(r.factor!==void 0&&(this.factor=r.factor),r.radius!==void 0&&(this.radius=r.radius))}}async function s(t,r=!0){await t.addInteractor("externalSlow",async o=>{const{Slower:i}=await e(()=>import("./Slower-9edada1e.js"),["assets/Slower-9edada1e.js","assets/ExternalInteractorBase-029fb1b6.js","assets/index-0b1ddc83.js","assets/index-92f6ad8c.css"]);return new i(o)},r)}export{a as Slow,s as loadExternalSlowInteraction};