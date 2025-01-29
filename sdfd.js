!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.$=e():t.$=e()}(self,(()=>(()=>{"use strict";class t{static getUserData(t){try{const e=JSON.parse(atob(t.split(".")[1]));return{profileId:e.profileId,name:e.name}}catch(t){return null}}static getToken(){return window.localStorage.getItem("msp2_auth_token")}static saveToken(t){window.localStorage.setItem("msp2_auth_token",t)}static isValidToken(t){return Boolean(t&&t.length>0)}}function e(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var n=new WeakMap;class i{constructor(){var t;(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(this,t=n),t.set(this,false),this.initialize()}static getInstance(){return s.t||(s.t=new i),s.t}initialize(){if((t=n).get(e(t,this)))return;var t;const i=document.createElement("script");i.src="https://umami.msp2.lol/script.js",i.defer=!0,i.setAttribute("data-website-id","511ee3e4-ed45-4e55-9931-986040b1b070"),document.head.appendChild(i),function(t,n){t.set(e(t,n),!0)}(n,this)}track(t,e){window.umami&&window.umami.track(t,e)}}var s={t:void 0};function o(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function r(t,e){return t.get(function(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}(t,e))}var a=new WeakMap,c=new WeakMap,h=new WeakMap;class u{constructor(){if(o(this,a,new Set(["google-analytics.com"])),o(this,c,new Map),o(this,h,new Map),p.t)return p.t;p.t=this,this.initialize()}static getInstance(){return p.t??new u}initialize(){this.interceptXHR(),this.interceptFetch()}isBlocked(t){if(r(c,this).has(t))return r(c,this).get(t);try{const e=new URL(t),n=r(a,this).has(e.hostname);return r(c,this).set(t,n),n}catch{return!1}}getHeaders(t){const e=t||"";if(r(h,this).has(e))return r(h,this).get(e);const n={authorization:t?`Bearer ${t}`:"","content-type":"application/json","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",accept:"application/json, text/plain, */*","accept-language":"en-US,en;q=0.9",origin:"https://www.moviestarplanet.com",referer:"https://www.moviestarplanet.com/","sec-ch-ua":'"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"};return Object.freeze(n),r(h,this).set(e,n),n}async delay(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500;const n=Math.floor(Math.random()*(e-t+1))+t;return new Promise((t=>setTimeout(t,n)))}interceptXHR(){const t=XMLHttpRequest.prototype.open,e=this;XMLHttpRequest.prototype.open=function(n,i){if(!e.isBlocked(i)){for(var s=arguments.length,o=new Array(s>2?s-2:0),r=2;r<s;r++)o[r-2]=arguments[r];return t.apply(this,[n,i,...o])}this.abort()}}interceptFetch(){const t=window.fetch,e=this;window.fetch=function(n,i){const s=n instanceof Request?n.url:n;return e.isBlocked(s)?Promise.resolve(new Response(null,{status:403})):t.apply(this,arguments)}}}var p={t:void 0};function d(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function l(t,e){return t.get(f(t,e))}function w(t,e,n){return t.set(f(t,e),n),n}function f(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var m=new WeakMap,g=new WeakMap,y=new WeakMap,b=new WeakMap;function v(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function k(t,e){return t.get(S(t,e))}function j(t,e,n){return t.set(S(t,e),n),n}function S(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var x=new WeakMap,T=new WeakMap,_=new WeakMap,z=new WeakMap;function O(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function M(t,e){return t.get(C(t,e))}function W(t,e,n){return t.set(C(t,e),n),n}function C(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var P=new WeakMap,A=new WeakMap;function E(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function N(t,e){return t.get(q(t,e))}function R(t,e,n){return t.set(q(t,e),n),n}function q(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var J=new WeakMap,I=new WeakMap,Q=new WeakMap;function U(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function $(t,e){return t.get(B(t,e))}function L(t,e,n){return t.set(B(t,e),n),n}function B(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var F=new WeakMap,D=new WeakMap,H=new WeakMap;function G(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function K(t,e){return t.get(X(t,e))}function Y(t,e,n){return t.set(X(t,e),n),n}function X(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var V=new WeakMap,Z=new WeakMap,tt=new WeakMap,et=new WeakMap,nt=new WeakMap,it=new WeakMap;class st{constructor(){if(G(this,V,!0),G(this,Z,localStorage.getItem("selectedEmote")||"shimm_2024_fireworkswalk_lsz"),G(this,tt,void 0),G(this,et,!1),G(this,nt,JSON.parse(localStorage.getItem("emotePosition")||'{"x": 10, "y": 10}')),G(this,it,new Set(["noshoes_skating","swim_new","bunny_hold","2023_spidercrawl_lsz","bad_2022_teenwalk_dg","xmas_2022_frosty_dg","xmas_2022_freezing_lsz","2022_turkeywalk_lsz","2022_easter_sackjump_dg","cool_slide","very_2022_froglike_lsz","2023_bended_lz","shimm_2024_fireworkswalk_lsz"])),ot.t)return ot.t;ot.t=this,Y(tt,this,window.WebSocket),this.initialize()}static getInstance(){return ot.t??new st}initialize(){this.createGUI(),this.interceptWebSocket()}createGUI(){const t=document.createElement("div");Object.assign(t.style,{position:"fixed",top:`${K(nt,this).y}px`,left:`${K(nt,this).x}px`,backgroundColor:"rgba(30, 30, 46, 0.95)",padding:"20px",zoom:"80%",borderRadius:"16px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.2)",zIndex:"10000",width:"320px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",fontFamily:'"Inter", system-ui, -apple-system, sans-serif',color:"#fff",backdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.1)"});const e=document.createElement("link");e.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",e.rel="stylesheet",document.head.appendChild(e);const n=document.createElement("div");Object.assign(n.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",cursor:"move",padding:"4px",userSelect:"none"});const i=document.createElement("div");i.innerHTML="🎭 Emote Selector",Object.assign(i.style,{fontSize:"20px",fontWeight:"600",color:"#cdd6f4",letterSpacing:"-0.5px"});const s=document.createElement("div");Object.assign(s.style,{display:"flex",gap:"8px"});const o=document.createElement("button");o.innerHTML="−",Object.assign(o.style,{backgroundColor:"rgba(69, 71, 90, 0.5)",border:"none",color:"#cdd6f4",width:"28px",height:"28px",borderRadius:"8px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",transition:"all 0.2s ease",backdropFilter:"blur(4px)",outline:"none"}),o.addEventListener("click",(()=>this.toggleMinimize())),o.addEventListener("mouseover",(()=>o.style.backgroundColor="rgba(88, 91, 112, 0.5)")),o.addEventListener("mouseout",(()=>o.style.backgroundColor="rgba(69, 71, 90, 0.5)")),s.appendChild(o),n.appendChild(i),n.appendChild(s),t.appendChild(n);const r=document.createElement("div");Object.assign(r.style,{position:"relative",marginBottom:"16px"});const a=document.createElement("select");Object.assign(a.style,{width:"100%",padding:"12px 16px",backgroundColor:"rgba(49, 50, 68, 0.6)",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"12px",color:"#cdd6f4",fontSize:"14px",appearance:"none",cursor:"pointer",transition:"all 0.2s ease",fontFamily:"inherit",outline:"none"});const c=document.createElement("style");c.textContent="\n            select:focus {\n                outline: none;\n                border-color: rgba(255, 255, 255, 0.2);\n                box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.05);\n            }\n            select option {\n                background-color: #1e1e2e;\n                color: #cdd6f4;\n                padding: 12px;\n            }\n            select option:hover {\n                background-color: #313244;\n            }\n        ",document.head.appendChild(c),Array.from(K(it,this)).forEach((t=>{const e=document.createElement("option");e.value=t,e.textContent=t,e.selected=t===K(Z,this),a.appendChild(e)})),a.addEventListener("change",(t=>{Y(Z,this,t.target.value),localStorage.setItem("selectedEmote",K(Z,this))}));const h=document.createElement("div");Object.assign(h.style,{position:"absolute",right:"16px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none",width:"0",height:"0",borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"5px solid #cdd6f4"}),r.appendChild(a),r.appendChild(h),t.appendChild(r);const u=document.createElement("button");this.updateToggleButton(u),Object.assign(u.style,{width:"100%",backgroundColor:K(V,this)?"rgba(166, 227, 161, 0.9)":"rgba(243, 139, 168, 0.9)",border:"none",color:"#1e1e2e",padding:"14px",borderRadius:"12px",cursor:"pointer",fontWeight:"600",transition:"all 0.2s ease",fontSize:"14px",letterSpacing:"0.3px",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.1)",outline:"none"}),u.addEventListener("click",(()=>{Y(V,this,!K(V,this)),this.updateToggleButton(u)})),t.appendChild(u);let p,d,l,w,f=!1;n.addEventListener("mousedown",(t=>{f=!0,l=t.clientX-K(nt,this).x,w=t.clientY-K(nt,this).y})),document.addEventListener("mousemove",(e=>{f&&(e.preventDefault(),p=e.clientX-l,d=e.clientY-w,K(nt,this).x=p,K(nt,this).y=d,t.style.left=`${p}px`,t.style.top=`${d}px`,localStorage.setItem("emotePosition",JSON.stringify(K(nt,this))))})),document.addEventListener("mouseup",(()=>{f=!1})),document.body.appendChild(t),this.container=t,this.select=a}updateToggleButton(t){t.textContent="Emote Service: "+(K(V,this)?"ON":"OFF"),t.style.backgroundColor=K(V,this)?"rgba(166, 227, 161, 0.9)":"rgba(243, 139, 168, 0.9)"}toggleMinimize(){Y(et,this,!K(et,this)),K(et,this)?(this.select.style.display="none",this.container.style.height="auto"):(this.select.style.display="block",this.container.style.height="auto")}interceptWebSocket(){const t=this;window.WebSocket=function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];const s=new(K(tt,t))(...n),o=s.send;return s.send=function(e){if(K(V,t)&&"string"==typeof e&&e.startsWith('42["7001"'))try{const n=JSON.parse(e.slice(2));Array.isArray(n)&&n[1]?.mood&&(n[1].mood=K(Z,t),e="42"+JSON.stringify(n))}catch(t){}return o.call(this,e)},s},Object.assign(window.WebSocket,K(tt,this))}restore(){window.WebSocket=K(tt,this),this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}var ot={t:void 0};const rt=i.getInstance(),at=u.getInstance(),ct=new class{constructor(){d(this,m,!0),d(this,g,void 0),d(this,y,void 0),d(this,b,["cf0589ffe9ed45369d70dcaaa9aa1db2","6ca07ffa53e3468598e6f2a2e0d20ded","cf42a511688e49f795e387d43a78c758","d92645e7672142028f2731aeda6e8e6f","39e585c334834622ab69fa636068d278","7e4f2d790d5c4b3e808f3737b30f6458","c568275ccfbb482486d54942542fe22f","e79da67391154e56ad381960ca344b54","3924865e60fe426eb2862fd9a7a813b5","d2d9a0623b24dde83142b8951ea3a79","8a05904fe4c042009f60ea0e3958832e"]),w(g,this,i.getInstance()),w(y,this,u.getInstance()),this.initialize()}initialize(){this.interceptFetchRequests(),this.interceptWebSocket()}interceptFetchRequests(){var e=this;const n=window.fetch;window.fetch=async function(){for(var i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];const[r,a]=s;try{if(a?.headers){const n=Object.entries(a.headers).find((t=>{let[e]=t;return"authorization"===e.toLowerCase()}))?.[1];if(n&&n.startsWith("Bearer ")){const i=e.extractBearerToken(n);t.isValidToken(i)&&t.saveToken(i)}}if(r.includes("games/j68d/definitions?questType=EventQuest&questType=StaticDailyQuest&questType=RandomDailyQuest")){l(g,e).track("All Quests Completed");const t=await n.apply(window,s),i=await t.clone().json();return i.questDefinitions&&await e.processQuestDefinitions(i.questDefinitions),t}if(r.includes("games/j68d/quests?questType=EventQuest&questType=StaticDailyQuest&questType=RandomDailyQuest")){l(g,e).track("All Quests Completed");const t=await n.apply(window,s),i=await t.clone().json();return i.questDefinitions&&await e.processQuestDefinitions(i.quests),t}}catch(t){}return n.apply(window,s)}}extractBearerToken(t){return t.replace("Bearer ","").trim()}getToken(){return t.getToken()||null}async resetAvatar(){try{const t=this.getToken(),e=this.getProfileId();if(!t||!e)throw new Error("Missing authentication");const n=await fetch(`https://eu.mspapis.com/profileattributes/v1/profiles/${e}/games/j68d/attributes`,{headers:l(y,this).getHeaders(t)}),i=await n.json();if(!i?.avatarId)throw new Error("No avatar ID found");const s=await fetch("https://api.allorigins.win/raw?url="+encodeURIComponent("https://github.com/mwarcc/msp2guis/raw/refs/heads/main/default.bson"));if(!s.ok)throw new Error("Failed to get default avatar");const o=await s.arrayBuffer(),r=await fetch(`https://eu.mspapis.com/profilegeneratedcontent/v2/profiles/${e}/games/j68d/avatars/${i.avatarId}`,{method:"PUT",headers:{...l(y,this).getHeaders(t),"content-type":"application/bson",signature:"2eA/CteuR/k2YUipj3YflkjpxJLRoUlSbNNY8xpwo6S8="},body:o});if(!r.ok)throw new Error(`Avatar update failed: ${r.status}`)}catch(t){}}async processQuestDefinitions(t){const e=this.getToken(),n=this.getProfileId();if(!e||!n)return;const i=async t=>{const s=t.definitionId;if(!s)return;const o=async()=>{try{await fetch(`https://eu.mspapis.com/quests/v2/profiles/${n}/games/j68d/quests/${s}/progress`,{method:"PUT",headers:l(y,this).getHeaders(e),body:JSON.stringify({progress:1})})}catch(t){}},r=s.toLowerCase().includes("gift")?4:1;for(let t=0;t<r;t++)await o();if(t.children&&Array.isArray(t.children))for(const e of t.children)await i(e)};for(const e of t)await i(e);await this.updateSpecificQuests(n,e),await this.processPetInteractions(n,e)}async updateSpecificQuests(t,e){try{await fetch(`https://eu.mspapis.com/quests/v2/profiles/${t}/games/j68d/quests/random_daily_change_profile_bg/state`,{method:"PUT",headers:l(y,this).getHeaders(e),body:JSON.stringify({state:"Complete"})});for(let n=0;n<10;n++)await fetch(`https://eu.mspapis.com/quests/v2/profiles/${t}/games/j68d/quests/daily_pet_pets/state`,{method:"PUT",headers:l(y,this).getHeaders(e),body:JSON.stringify({state:"Complete"})});for(let n=0;n<4;n++)await fetch(`https://eu.mspapis.com/timelimitedrewards/v2/profiles/${t}/games/j68d/rewards/daily_pickup`,{method:"PUT",headers:l(y,this).getHeaders(e),body:JSON.stringify({state:"Claimed"})})}catch(t){}}async processPetInteractions(t,e){for(const n of l(b,this))try{await fetch(`https://eu.mspapis.com/pets/v1/pets/${n}/interactions`,{method:"POST",headers:l(y,this).getHeaders(e),body:JSON.stringify({profileId:t,gameId:"j68d"})})}catch(t){}}getProfileId(){const t=this.getToken();if(!t)return null;try{return JSON.parse(atob(t.split(".")[1])).profileId}catch(t){return null}}interceptWebSocket(){const t=window.WebSocket,e=this;window.WebSocket=function(){for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];const o=new t(...i);o.addEventListener("message",(t=>{l(m,e)&&e.handleQuizMessage(o,t.data)}));const r=o.send;return o.send=function(t){return l(m,e)&&"string"==typeof t&&e.handleOutgoingMessage(t,o),r.apply(this,arguments)},o},Object.assign(window.WebSocket,t)}handleOutgoingMessage(t,e){'42["chatv2:send",{"message":"avreset"}]'!==t&&'42["chatv2:send",{"message":"a­v­r­e­s­e­t"}]'!==t||(l(g,this).track("Avatar Reset"),this.resetAvatar())}toggle(){w(m,this,!l(m,this))}},ht=new class{constructor(){v(this,x,!0),v(this,T,new Map),v(this,_,null),v(this,z,void 0),j(z,this,i.getInstance()),this.initialize()}async initialize(){try{const t=await fetch("https://raw.githubusercontent.com/mwarcc/ss/refs/heads/main/quiz.json");if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const e=await t.json();Object.entries(e).forEach((t=>{let[e,n]=t;k(T,this).set(e,n)})),this.interceptWebSocket()}catch(t){}}interceptWebSocket(){const t=window.WebSocket,e=this;window.WebSocket=function(){for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];const o=new t(...i);return o.addEventListener("message",(t=>{k(x,e)&&e.handleMessage(o,t.data)})),o},Object.assign(window.WebSocket,t)}handleMessage(t,e){if(e.startsWith('40{"jwt":"')||e.match(/^\d+$/))return;const n=e.startsWith("42[")?e.substring(2):e;try{const[e,i]=JSON.parse(n);this.processPayload(t,i)}catch(t){}}processPayload(t,e){const{messageType:n,messageContent:i}=e;switch(n){case"game:state":k(z,this).track("Quiz State"),this.handleGameState(t,i);break;case"quiz:chal":k(z,this).track("Quiz Challenge"),this.handleQuizChallenge(i);break;case"quiz:reveal":k(z,this).track("Quiz Reveal"),this.handleQuizReveal(i)}}handleGameState(t,e){if("waiting_for_answer"===e.newState){k(z,this).track("Waiting For Quiz Answer");const e=k(_,this)&&k(T,this).get(k(_,this))?.correctAnswer?k(T,this).get(k(_,this)).correctAnswer:Math.floor(3*Math.random())+1;t.send(`42${JSON.stringify(["quiz:answer",{answer:e}])}`)}}handleQuizChallenge(t){let{question:e,answers:n}=t;e&&n&&(j(_,this,e),k(T,this).has(e)||k(T,this).set(e,{answers:n,correctAnswer:null}))}handleQuizReveal(t){let{correctAnswer:e}=t;if(k(_,this)){const t=k(T,this).get(k(_,this));t&&k(T,this).set(k(_,this),{...t,correctAnswer:e})}}toggle(){j(x,this,!k(x,this)),k(z,this).track("Auto Quiz Toggle")}},ut=(new class{constructor(){O(this,P,!1),O(this,A,void 0),W(A,this,i.getInstance()),this.initialize(),this.setupToggleListener()}initialize(){this.interceptFetch()}interceptFetch(){var t=this;const e=window.fetch;window.fetch=async function(){for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];const[o]=i;return M(P,t)&&t.isItemTemplateUrl(o)?(M(A,t).track("ItemLayeringService Called"),t.handleItemTemplateRequest(e,...i)):e.apply(window,i)}}isItemTemplateUrl(t){return/curatedcontentitemtemplates\/v2\/item-templates\//.test(t)}async handleItemTemplateRequest(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];try{const e=await t.apply(window,n),i=await e.clone().json();return this.processItemTemplates(i),new Response(JSON.stringify(i),{status:200,statusText:"OK",headers:{"Content-Type":"application/json"}})}catch(e){return t.apply(window,n)}}processItemTemplates(t){t.forEach((t=>{t.tags?.forEach((t=>{t.resourceIdentifiers?.forEach((t=>{t.key=this.generateRandomString()}))})),t.additionalData?.MSP2Data&&(t.additionalData.MSP2Data.Type=this.generateRandomString())}))}generateRandomString(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return Array.from({length:t},(()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random())))).join("")}setupToggleListener(){window.addEventListener("keydown",(t=>{!t.shiftKey||"a"!==t.key&&"A"!==t.key||(W(P,this,!M(P,this)),M(A,this).track("ItemLayeringService "+(M(P,this)?"enabled":"disabled")))}))}},new class{constructor(){E(this,J,{diamondPacks:!1}),E(this,I,void 0),E(this,Q,void 0),R(I,this,i.getInstance()),R(Q,this,window.fetch),this.initialize()}initialize(){this.interceptFetch()}shouldTransformUrl(t){return(!t.includes("/tags")||!t.includes("/shops/6/tags")&&!t.includes("/shops/13/tags"))&&(t.includes("eu.mspapis.com/shopinventory/v1/shops/")||t.includes("us.mspapis.com/shopinventory/v1/shops/")||t.includes("eu.mspapis.com/shoppurchase/v1/games/j68d/profiles/")||t.includes("us.mspapis.com/shoppurchase/v1/games/j68d/profiles/")||"https://api.msp2cheats.eu/purchase"===t)}transformUrl(t){try{const e=new URL(t);if(e.pathname.includes("/items/purchase"))return"https://api.msp2cheats.eu/purchase";if(N(J,this).diamondPacks){const t=new URLSearchParams(e.search),n=new URL("https://api.xerus.lol/listings");return t.forEach(((t,e)=>{e.toLowerCase().includes("auth")||n.searchParams.append(e,t)})),n.searchParams.append("diamondPack","True"),n.toString()}return t}catch(e){return t}}interceptFetch(){const t=this;window.fetch=async function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];const[s,o]=n;if("string"==typeof s&&t.shouldTransformUrl(s)){const e=t.transformUrl(s),n=o?{...o}:{};return"https://api.msp2cheats.eu/purchase"===e?t.handlePurchase(e,n):N(Q,t).call(t,e,n)}return N(Q,t).apply(window,n)}}async handlePurchase(e,n){const i=await N(Q,this).call(this,e,n),s=await i.json();let o=JSON.parse(localStorage.getItem("purchaseList"))||[];return o.push(...s),o.length>100&&(o=o.slice(0,100)),localStorage.setItem("purchaseList",JSON.stringify(o)),N(I,this).track("Bought items from shop",t.getUserData(window.msp2Client.getToken())),new Response(JSON.stringify(s),{status:200,statusText:"OK",headers:{"Content-Type":"application/json"}})}setEnabled(t){let{diamondPacks:e}=t;R(J,this,{diamondPacks:e})}restore(){window.fetch=N(Q,this)}}),pt=(new class{constructor(){U(this,F,void 0),U(this,D,void 0),U(this,H,void 0),L(F,this,i.getInstance()),L(D,this,window.fetch),L(H,this,window.WebSocket),this.initialize()}initialize(){this.interceptFetch(),this.interceptWebSocket()}interceptFetch(){const e=this;window.fetch=async function(n,i){if(n.includes("/history")&&i&&i.body){const n=i.headers?.["Content-Type"]||i.headers?.get?.("Content-Type");if(n&&n.includes("application/json"))try{const n="string"==typeof i.body?i.body:await(i.body.text?.());if(n){const s=JSON.parse(n);s.MessageBody&&($(F,e).track("Bypassed chat filtering",t.getUserData(window.msp2Client.getToken())),s.MessageBody=s.MessageBody.split("").join("­"),i.body=JSON.stringify(s))}}catch(t){}}return $(D,e).call(this,n,i)}}interceptWebSocket(){const e=this;window.WebSocket=function(){for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];const o=new($(H,e))(...i),r=o.send;return o.send=function(n){try{if("string"==typeof n&&n.startsWith("42[")){const i=JSON.parse(n.slice(2));if(Array.isArray(i)&&"chatv2:send"===i[0]&&i[1]?.message){const s=i[1].message;i[1].message=s.split("").join("­"),n="42"+JSON.stringify(i),$(F,e).track("Bypassed chat filtering in chatroom",t.getUserData(window.msp2Client.getToken()))}}}catch(t){}r.call(this,n)},o},Object.assign(window.WebSocket,$(H,this))}restore(){window.fetch=$(D,this),window.WebSocket=$(H,this)}},st.getInstance());setTimeout((()=>{Object.defineProperties(window,{emoteService:{value:pt,configurable:!1,writable:!1}})}),7e3),ut.setEnabled({diamondPacks:!0}),Object.defineProperties(window,{msp2Client:{value:ct,configurable:!1,writable:!1},autoStarQuiz:{value:ht,configurable:!1,writable:!1}}),rt.track("Client Started");const dt=new WeakMap,lt=window.fetch;return window.fetch=async function(t,e){if("string"!=typeof t||!t.includes("/games/j68d/rewards/daily_pickup"))return lt.call(this,t,e);const n={url:t,options:e};if(dt.has(n))return dt.get(n);try{const i=[],s=at.getHeaders(e?.headers?.authorization),o=Array(4).fill().map((()=>lt(t,{...e,headers:s}).then((t=>i.push(t)))));await Promise.all(o);const r=i[i.length-1].clone();return dt.set(n,r),r}catch(n){return lt.call(this,t,e)}},{}})()));
