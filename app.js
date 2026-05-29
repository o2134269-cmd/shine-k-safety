/* ===========================================================
   Shine-K — application logic
   Vanilla JS · no dependencies · hand-rolled SVG charts
   =========================================================== */
(function(){
"use strict";

var SUPPORTED = ["en","zh","ko"];
var lang = detectLang();

/* ---------- i18n helpers ---------- */
function detectLang(){
  try{
    var saved = localStorage.getItem("shinek_lang");
    if(saved && SUPPORTED.indexOf(saved)>-1) return saved;
  }catch(e){}
  var n = (navigator.language||"en").toLowerCase();
  if(n.indexOf("zh")===0) return "zh";
  if(n.indexOf("ko")===0) return "ko";
  return "en";
}
function dict(){ return window.I18N[lang] || window.I18N.en; }
function t(key){ var d=dict(); return (key in d)? d[key] : (key in window.I18N.en ? window.I18N.en[key] : key); }

function applyStatic(){
  document.documentElement.setAttribute("lang", lang);
  var nodes = document.querySelectorAll("[data-i18n]");
  for(var i=0;i<nodes.length;i++){
    var el=nodes[i], key=el.getAttribute("data-i18n"), val=t(key);
    if(val==null) continue;
    if(el.tagName==="META"){ el.setAttribute("content",val); }
    else if(el.tagName==="TITLE"){ document.title=val; }
    else { el.textContent=val; }
  }
  // active lang button
  var btns=document.querySelectorAll(".lang-btn");
  for(var j=0;j<btns.length;j++){
    btns[j].classList.toggle("active", btns[j].getAttribute("data-lang")===lang);
  }
}

/* ---------- geometry helpers ---------- */
function polar(cx,cy,r,deg){ var a=(deg-90)*Math.PI/180; return [cx+r*Math.cos(a), cy+r*Math.sin(a)]; }
function arc(cx,cy,r,a0,a1){
  var p0=polar(cx,cy,r,a0), p1=polar(cx,cy,r,a1);
  var large=(a1-a0)<=180?0:1;
  return "M"+p0[0].toFixed(2)+" "+p0[1].toFixed(2)+" A"+r+" "+r+" 0 "+large+" 1 "+p1[0].toFixed(2)+" "+p1[1].toFixed(2);
}
function bandColor(idx){ return idx>=78?"#1faa6b":idx>=60?"#f0a818":"#e0483d"; }

/* ---------- gauge ---------- */
function renderGauge(host, idx){
  if(!host) return;
  var cx=100,cy=108,r=78, A0=-125, A1=125, span=A1-A0;
  var val=Math.max(0,Math.min(100,idx));
  var col=bandColor(val);
  var valEnd=A0 + span*(val/100);
  var svg=''
    +'<svg viewBox="0 0 200 168" role="img" aria-label="'+t("app.indexLabel")+' '+Math.round(val)+'">'
    +'<path d="'+arc(cx,cy,r,A0,A1)+'" fill="none" stroke="#e8edf5" stroke-width="15" stroke-linecap="round"/>'
    +'<path d="'+arc(cx,cy,r,A0,valEnd)+'" fill="none" stroke="'+col+'" stroke-width="15" stroke-linecap="round"/>'
    +'<text x="100" y="104" text-anchor="middle" font-size="42" font-weight="800" fill="#16213a">'+Math.round(val)+'</text>'
    +'<text x="100" y="134" text-anchor="middle" font-size="13" font-weight="700" letter-spacing="1.5" fill="'+col+'">'+t("app.indexLabel")+'</text>'
    +'</svg>';
  host.innerHTML=svg;
}

/* ---------- line chart (prediction) ---------- */
function renderPredict(host){
  if(!host) return;
  var W=620,H=270,pad={l:38,r:16,t:18,b:34};
  var n=18, nowIdx=6, thr=70;
  var hist=[], fore=[];
  // smooth-ish series, mildly time-varying
  var ph=(Date.now()/9000);
  for(var i=0;i<n;i++){
    var base=42 + 16*Math.sin(i/3.0+ph) + 9*Math.sin(i/1.3+ph*1.7);
    if(i>nowIdx){ base += (i-nowIdx)*1.9; } // rising forecast
    base=Math.max(8,Math.min(96,base));
    if(i<=nowIdx) hist.push(base); else fore.push(base);
  }
  var plotW=W-pad.l-pad.r, plotH=H-pad.t-pad.b;
  function X(i){ return pad.l + plotW*(i/(n-1)); }
  function Y(v){ return pad.t + plotH*(1 - v/100); }
  var s='';
  // grid + y labels
  for(var g=0;g<=100;g+=25){
    var gy=Y(g);
    s+='<line x1="'+pad.l+'" y1="'+gy.toFixed(1)+'" x2="'+(W-pad.r)+'" y2="'+gy.toFixed(1)+'" stroke="#eef2f8"/>';
    s+='<text x="'+(pad.l-8)+'" y="'+(gy+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="#9aa6bd">'+g+'</text>';
  }
  // threshold
  var ty=Y(thr);
  s+='<line x1="'+pad.l+'" y1="'+ty.toFixed(1)+'" x2="'+(W-pad.r)+'" y2="'+ty.toFixed(1)+'" stroke="#e0483d" stroke-width="1.4" stroke-dasharray="5 5"/>';
  s+='<text x="'+(W-pad.r)+'" y="'+(ty-7).toFixed(1)+'" text-anchor="end" font-size="11" font-weight="700" fill="#e0483d">'+t("app.threshold")+'</text>';
  // forecast band polygon
  var bandTop='', bandBot='';
  for(var f=0;f<fore.length;f++){
    var xi=X(nowIdx+f), d=4+f*0.9;
    bandTop+=(f?' L':'M')+xi.toFixed(1)+' '+Y(Math.min(100,fore[f]+d)).toFixed(1);
  }
  for(var f2=fore.length-1;f2>=0;f2--){
    var xi2=X(nowIdx+f2), d2=4+f2*0.9;
    bandBot+=' L'+xi2.toFixed(1)+' '+Y(Math.max(0,fore[f2]-d2)).toFixed(1);
  }
  s+='<path d="'+bandTop+bandBot+' Z" fill="#2f6bff" opacity="0.10"/>';
  // history path
  var hp='';
  for(var h=0;h<hist.length;h++){ hp+=(h?' L':'M')+X(h).toFixed(1)+' '+Y(hist[h]).toFixed(1); }
  s+='<path d="'+hp+'" fill="none" stroke="#1b2a4a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';
  // forecast path (dashed) - connect from now point
  var fp='M'+X(nowIdx).toFixed(1)+' '+Y(hist[hist.length-1]).toFixed(1);
  for(var ff=0;ff<fore.length;ff++){ fp+=' L'+X(nowIdx+ff).toFixed(1)+' '+Y(fore[ff]).toFixed(1); }
  s+='<path d="'+fp+'" fill="none" stroke="#2f6bff" stroke-width="2.6" stroke-dasharray="6 5" stroke-linecap="round"/>';
  // now marker
  var nx=X(nowIdx);
  s+='<line x1="'+nx.toFixed(1)+'" y1="'+pad.t+'" x2="'+nx.toFixed(1)+'" y2="'+(H-pad.b)+'" stroke="#c2ccdd" stroke-dasharray="3 3"/>';
  s+='<circle cx="'+nx.toFixed(1)+'" cy="'+Y(hist[hist.length-1]).toFixed(1)+'" r="4.5" fill="#1b2a4a"/>';
  s+='<text x="'+nx.toFixed(1)+'" y="'+(H-pad.b+18)+'" text-anchor="middle" font-size="11" font-weight="700" fill="#56627a">'+t("app.now")+'</text>';
  s+='<text x="'+X(n-1).toFixed(1)+'" y="'+(H-pad.b+18)+'" text-anchor="end" font-size="11" fill="#9aa6bd">+12'+t("app.hoursAbbr")+'</text>';
  s+='<text x="'+X(nowIdx+5).toFixed(1)+'" y="'+(pad.t+12)+'" text-anchor="middle" font-size="11" font-weight="700" fill="#2f6bff">'+t("app.predicted")+'</text>';
  host.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="AI risk prediction chart">'+s+'</svg>';
}

/* ---------- impact chart ---------- */
function renderImpact(host){
  if(!host) return;
  var W=620,H=280,pad={l:40,r:20,t:22,b:38};
  var pts=[{y:"2020",v:0.57},{y:"2022",v:0.49},{y:"2024",v:0.39},{y:"2026",v:0.29},{y:"2028",v:0.23},{y:"2030",v:0.18}];
  var oecd=0.29, maxV=0.62;
  var plotW=W-pad.l-pad.r, plotH=H-pad.t-pad.b;
  function X(i){ return pad.l + plotW*(i/(pts.length-1)); }
  function Y(v){ return pad.t + plotH*(1 - v/maxV); }
  var s='';
  for(var g=0;g<=0.6;g+=0.2){
    var gy=Y(g);
    s+='<line x1="'+pad.l+'" y1="'+gy.toFixed(1)+'" x2="'+(W-pad.r)+'" y2="'+gy.toFixed(1)+'" stroke="#eef2f8"/>';
    s+='<text x="'+(pad.l-8)+'" y="'+(gy+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="#9aa6bd">'+g.toFixed(1)+'</text>';
  }
  var oy=Y(oecd);
  s+='<line x1="'+pad.l+'" y1="'+oy.toFixed(1)+'" x2="'+(W-pad.r)+'" y2="'+oy.toFixed(1)+'" stroke="#7c5cff" stroke-width="1.4" stroke-dasharray="5 5"/>';
  s+='<text x="'+(pad.l+6)+'" y="'+(oy-7).toFixed(1)+'" font-size="11" font-weight="700" fill="#7c5cff">OECD 0.29</text>';
  // area
  var area='M'+X(0).toFixed(1)+' '+Y(0).toFixed(1);
  for(var a=0;a<pts.length;a++){ area+=' L'+X(a).toFixed(1)+' '+Y(pts[a].v).toFixed(1); }
  area+=' L'+X(pts.length-1).toFixed(1)+' '+Y(0).toFixed(1)+' Z';
  s+='<path d="'+area+'" fill="#2f6bff" opacity="0.08"/>';
  // line
  var lp='';
  for(var l=0;l<pts.length;l++){ lp+=(l?' L':'M')+X(l).toFixed(1)+' '+Y(pts[l].v).toFixed(1); }
  s+='<path d="'+lp+'" fill="none" stroke="#1b2a4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
  // points + labels + x labels
  for(var p=0;p<pts.length;p++){
    var px=X(p), py=Y(pts[p].v);
    var target=(pts[p].y==="2026"||pts[p].y==="2030");
    s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="'+(target?6:4.5)+'" fill="'+(target?"#ffc629":"#1b2a4a")+'" stroke="#fff" stroke-width="2"/>';
    s+='<text x="'+px.toFixed(1)+'" y="'+(py-12).toFixed(1)+'" text-anchor="middle" font-size="11.5" font-weight="800" fill="#16213a">'+pts[p].v.toFixed(2)+'</text>';
    s+='<text x="'+px.toFixed(1)+'" y="'+(H-pad.b+18)+'" text-anchor="middle" font-size="11" fill="#56627a">'+pts[p].y+'</text>';
  }
  host.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Accident rate trajectory">'+s+'</svg>';
}

/* ---------- donut (health) ---------- */
var healthVals=[62,16,9,8,5];
function renderHealth(donutHost, legendHost){
  var d=dict().health;
  if(donutHost){
    var r=52, cx=80, cy=80, C=2*Math.PI*r, off=0, s='';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#eef2f8" stroke-width="22"/>';
    for(var i=0;i<healthVals.length;i++){
      var frac=healthVals[i]/100, len=C*frac;
      s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+d[i].c+'" stroke-width="22"'
        +' stroke-dasharray="'+len.toFixed(2)+' '+(C-len).toFixed(2)+'" stroke-dashoffset="'+(-off).toFixed(2)+'"'
        +' transform="rotate(-90 '+cx+' '+cy+')"/>';
      off+=len;
    }
    s+='<text x="'+cx+'" y="'+(cy-2)+'" text-anchor="middle" font-size="26" font-weight="800" fill="#16213a">'+healthVals[0]+'%</text>';
    s+='<text x="'+cx+'" y="'+(cy+16)+'" text-anchor="middle" font-size="10.5" fill="#7e8aa1">'+d[0].n+'</text>';
    donutHost.innerHTML='<svg viewBox="0 0 160 160" role="img" aria-label="Workforce health distribution">'+s+'</svg>';
  }
  if(legendHost){
    var h='';
    for(var k=0;k<d.length;k++){
      h+='<li><span class="hl-dot" style="background:'+d[k].c+'"></span>'+d[k].n+'<span class="hl-val">'+healthVals[k]+'%</span></li>';
    }
    legendHost.innerHTML=h;
  }
}

/* ---------- zones ---------- */
var zoneRisk=[11,42,14,10,15,11];
var zoneBase=[10,42,13,9,14,10];
function renderZones(host){
  if(!host) return;
  var z=dict().zones, h='';
  for(var i=0;i<z.length;i++){
    var rv=Math.round(zoneRisk[i]);
    var cls = rv>=70?"zb-danger":rv>=45?"zb-watch":"zb-safe";
    var lbl = rv>=70?t("dash.danger"):rv>=45?t("dash.watch"):t("dash.safe");
    var bar = rv>=70?"#e0483d":rv>=45?"#f0a818":"#1faa6b";
    h+='<div class="zone-row">'
      +'<div><div class="zone-name">'+z[i].n+'</div><div class="zone-meta">'+z[i].t+'</div></div>'
      +'<span class="zone-badge '+cls+'">'+lbl+' · '+rv+'</span>'
      +'<span class="zone-bar"><i style="width:'+rv+'%;background:'+bar+'"></i></span>'
      +'</div>';
  }
  host.innerHTML=h;
}
function stepZones(){
  for(var i=0;i<zoneRisk.length;i++){
    // mean-revert toward a safe baseline + small noise so the site stays mostly green
    zoneRisk[i] += (zoneBase[i]-zoneRisk[i])*0.22 + (Math.random()-0.5)*5;
    if(Math.random()<0.035) zoneRisk[i] += 24; // rare spike that then recovers
    zoneRisk[i]=Math.max(8,Math.min(92,zoneRisk[i]));
  }
}

/* ---------- alert feed (events stored by index so they re-localize) ---------- */
var feedItems=[];
function timeStr(ts){
  var d=new Date(ts);
  function p(n){return (n<10?"0":"")+n;}
  return p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
}
function pushEventIdx(){
  var evs=dict().events;
  var idx=Math.floor(Math.random()*evs.length);
  feedItems.unshift({idx:idx, ts:Date.now()});
  if(feedItems.length>6) feedItems.pop();
}
function renderFeedIdx(host){
  if(!host) return;
  var evs=dict().events, h='';
  for(var i=0;i<feedItems.length;i++){
    var it=feedItems[i], e=evs[it.idx]||evs[0];
    h+='<div class="alert-item">'
      +'<span class="alert-ic '+e.cls+'">'+e.ic+'</span>'
      +'<div class="alert-body"><div class="alert-title">'+e.ti+'</div><div class="alert-sub">'+e.su+'</div></div>'
      +'<span class="alert-time">'+timeStr(it.ts)+'</span>'
      +'</div>';
  }
  host.innerHTML=h;
}

/* ---------- cluster map ---------- */
var clusterData=[
  {x:108,y:158,sites:412,workers:38200,status:"#1faa6b"},
  {x:236,y:182,sites:265,workers:51400,status:"#f0a818"},
  {x:150,y:84, sites:138,workers:9600, status:"#1faa6b"}
];
function renderMap(host){
  if(!host) return;
  var shape='M120 22 C170 14 210 34 230 60 C262 78 286 96 282 130 C300 150 300 196 268 214 C250 252 206 270 172 256 C138 270 96 258 84 224 C44 214 26 176 44 142 C30 112 52 70 92 64 C100 40 100 28 120 22 Z';
  var s='<svg viewBox="0 0 320 290" role="img" aria-label="Gyeongbuk cluster map">';
  s+='<path d="'+shape+'" fill="#eef3fa" stroke="#d6e0ef" stroke-width="2"/>';
  for(var i=0;i<clusterData.length;i++){
    var c=clusterData[i];
    s+='<circle cx="'+c.x+'" cy="'+c.y+'" r="18" fill="'+c.status+'" opacity="0.16"/>';
    s+='<circle cx="'+c.x+'" cy="'+c.y+'" r="9" fill="'+c.status+'" stroke="#fff" stroke-width="2.5"/>';
  }
  s+='</svg>';
  host.innerHTML=s;
}
function renderClusterList(host){
  if(!host) return;
  var cl=dict().clusters, h='';
  for(var i=0;i<cl.length;i++){
    var c=clusterData[i];
    h+='<li class="cluster-item">'
      +'<span class="cluster-pin" style="background:'+c.status+'"></span>'
      +'<div><div class="cluster-name">'+cl[i].n+'</div><div class="cluster-tag">'+cl[i].t+'</div></div>'
      +'<div class="cluster-count">'+c.sites+'<small>'+t("app.sites")+' · '+(c.workers/1000).toFixed(1)+'k '+t("app.workers")+'</small></div>'
      +'</li>';
  }
  host.innerHTML=h;
}

/* ---------- ROI ---------- */
function formatWon(vM){ // vM in millions of KRW
  if(vM<=0) return lang==="en"?"₩0":"0";
  if(lang==="en"){
    if(vM>=1000) return "₩"+(vM/1000).toFixed(2)+"B";
    return "₩"+Math.round(vM)+"M";
  }
  // KO / ZH use 억 / 亿 (1e8 won = vM/100)
  var unit=t("app.unitB");
  if(vM>=100) return "₩"+(vM/100).toFixed(1)+unit;
  return "₩"+Math.round(vM)+t("app.unitM");
}
function calcROI(){
  var W=clampNum("roiWorkers",120,1,100000);
  var I=clampNum("roiIncidents",9,0,10000);
  var C=clampNum("roiCost",42,0,100000);
  var prevented=I*0.45;
  var gross=prevented*C;            // direct incident cost avoided (₩M)
  var saving=gross*1.15;            // + insurance / productivity uplift
  var platformCost=Math.max(6, W*0.18); // ₩M / yr, floor 6M
  var payback = saving>0 ? (platformCost/(saving/12)) : 0;
  var roi = platformCost>0 ? ((saving-platformCost)/platformCost*100) : 0;
  setText("roiSaved", formatWon(saving));
  setText("roiPayback", saving<=0?"—":(payback<1?"<1 ":Math.round(payback)+" ")+t("app.months"));
  setText("roiRoi", (roi>=0?"+":"")+Math.round(roi)+"%");
}
function clampNum(id,def,min,max){
  var el=document.getElementById(id); if(!el) return def;
  var v=parseFloat(el.value); if(isNaN(v)) v=def;
  v=Math.max(min,Math.min(max,v));
  return v;
}
function setText(id,txt){ var el=document.getElementById(id); if(el) el.textContent=txt; }

/* ---------- counters ---------- */
function animateCounters(){
  var counters=document.querySelectorAll("[data-count]");
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ runCount(en.target); io.unobserve(en.target); }
    });
  },{threshold:0.4});
  for(var i=0;i<counters.length;i++) io.observe(counters[i]);
}
function runCount(el){
  var target=parseFloat(el.getAttribute("data-count"));
  var dec=parseInt(el.getAttribute("data-decimals")||"0",10);
  var suf=el.getAttribute("data-suffix")||"";
  var start=performance.now(), dur=1400;
  function frame(now){
    var p=Math.min(1,(now-start)/dur);
    var e=1-Math.pow(1-p,3);
    var val=target*e;
    el.textContent = (dec>0?val.toFixed(dec):Math.round(val).toLocaleString()) + suf;
    if(p<1) requestAnimationFrame(frame);
    else el.textContent=(dec>0?target.toFixed(dec):Math.round(target).toLocaleString())+suf;
  }
  requestAnimationFrame(frame);
}

/* ---------- hero mini stats ---------- */
function heroMini(){
  var z=document.getElementById("heroZones"), a=document.getElementById("heroAlerts");
  if(z) animateTo(z, 6, 0);
  if(a) animateTo(a, 27, 0);
}
function animateTo(el,target){
  var start=performance.now(), dur=1200, from=0;
  function f(now){ var p=Math.min(1,(now-start)/dur); el.textContent=Math.round(from+(target-from)*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(f); }
  requestAnimationFrame(f);
}

/* ---------- dynamic re-render ---------- */
function renderDynamic(){
  renderGauge(document.getElementById("heroGauge"), heroIndex());
  renderGauge(document.getElementById("mainGauge"), heroIndex());
  renderPredict(document.getElementById("predictChart"));
  renderImpact(document.getElementById("impactChart"));
  renderHealth(document.getElementById("healthDonut"), document.getElementById("healthLegend"));
  renderZones(document.getElementById("zoneList"));
  renderFeedIdx(document.getElementById("alertFeed"));
  renderMap(document.getElementById("clusterMap"));
  renderClusterList(document.getElementById("clusterList"));
  calcROI();
}
function heroIndex(){
  // safety index = 100 - avg zone risk, gently
  var sum=0; for(var i=0;i<zoneRisk.length;i++) sum+=zoneRisk[i];
  return Math.round(100 - sum/zoneRisk.length);
}

/* ---------- language switch ---------- */
function setLang(l){
  if(SUPPORTED.indexOf(l)<0) return;
  lang=l;
  try{ localStorage.setItem("shinek_lang",l); }catch(e){}
  applyStatic();
  renderDynamic();
}

/* ---------- header + nav ---------- */
function initChrome(){
  var header=document.getElementById("siteHeader");
  window.addEventListener("scroll",function(){
    if(header) header.classList.toggle("scrolled", window.scrollY>10);
  },{passive:true});
  var toggle=document.getElementById("navToggle"), nav=document.getElementById("mainNav");
  if(toggle && nav){
    toggle.addEventListener("click",function(){
      var open=nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open?"true":"false");
    });
    nav.addEventListener("click",function(e){
      if(e.target.tagName==="A"){ nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); }
    });
  }
  var lbtns=document.querySelectorAll(".lang-btn");
  for(var i=0;i<lbtns.length;i++){
    lbtns[i].addEventListener("click",function(){ setLang(this.getAttribute("data-lang")); });
  }
  ["roiWorkers","roiIncidents","roiCost"].forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.addEventListener("input", calcROI);
  });
}

/* ---------- live loop ---------- */
function startLive(){
  // seed feed
  for(var i=0;i<5;i++){ pushEventIdx(); feedItems[feedItems.length-1].ts=Date.now()-(5-i)*9000; }
  renderFeedIdx(document.getElementById("alertFeed"));
  // zone + gauge + predict refresh
  setInterval(function(){
    stepZones();
    renderZones(document.getElementById("zoneList"));
    renderGauge(document.getElementById("heroGauge"), heroIndex());
    renderGauge(document.getElementById("mainGauge"), heroIndex());
    renderMap(document.getElementById("clusterMap"));
  },3500);
  setInterval(function(){ renderPredict(document.getElementById("predictChart")); },6000);
  setInterval(function(){
    pushEventIdx();
    renderFeedIdx(document.getElementById("alertFeed"));
  },5000);
  // small health drift
  setInterval(function(){
    var i=1+Math.floor(Math.random()*(healthVals.length-1));
    var delta=(Math.random()<0.5?-1:1);
    if(healthVals[i]+delta>=2 && healthVals[i]+delta<=24){ healthVals[i]+=delta; healthVals[0]-=delta; }
    renderHealth(document.getElementById("healthDonut"), document.getElementById("healthLegend"));
  },7000);
}

/* ---------- init ---------- */
function init(){
  applyStatic();
  renderDynamic();
  initChrome();
  animateCounters();
  heroMini();
  startLive();
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
else init();

})();
