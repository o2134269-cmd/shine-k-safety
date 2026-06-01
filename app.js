/* ===========================================================
   H-M Synced — application logic
   Vanilla JS · no dependencies · hand-rolled SVG
   =========================================================== */
(function(){
"use strict";

var SUPPORTED=["en","zh","ko"];
var lang=detectLang();

/* ---------- i18n ---------- */
function detectLang(){
  try{var s=localStorage.getItem("hmsync_lang");if(s&&SUPPORTED.indexOf(s)>-1)return s;}catch(e){}
  var n=(navigator.language||"en").toLowerCase();
  if(n.indexOf("zh")===0)return "zh";
  if(n.indexOf("ko")===0)return "ko";
  return "en";
}
function dict(){return window.I18N[lang]||window.I18N.en;}
function t(k){var d=dict();return (k in d)?d[k]:(k in window.I18N.en?window.I18N.en[k]:k);}

function applyStatic(){
  document.documentElement.setAttribute("lang",lang);
  var nodes=document.querySelectorAll("[data-i18n]");
  for(var i=0;i<nodes.length;i++){
    var el=nodes[i],key=el.getAttribute("data-i18n"),val=t(key);
    if(val==null)continue;
    if(el.tagName==="META")el.setAttribute("content",val);
    else if(el.tagName==="TITLE")document.title=val;
    else el.textContent=val;
  }
  var b=document.querySelectorAll(".lang-btn");
  for(var j=0;j<b.length;j++)b[j].classList.toggle("active",b[j].getAttribute("data-lang")===lang);
}

/* ---------- geometry ---------- */
function polar(cx,cy,r,deg){var a=(deg-90)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
function arc(cx,cy,r,a0,a1){var p0=polar(cx,cy,r,a0),p1=polar(cx,cy,r,a1);var lg=(a1-a0)<=180?0:1;
  return "M"+p0[0].toFixed(2)+" "+p0[1].toFixed(2)+" A"+r+" "+r+" 0 "+lg+" 1 "+p1[0].toFixed(2)+" "+p1[1].toFixed(2);}
function bandColor(idx){return idx>=78?"#1faa6b":idx>=60?"#f0a818":"#e0483d";}

/* ---------- gauge ---------- */
function renderGauge(host,idx){
  if(!host)return;
  var cx=100,cy=108,r=78,A0=-125,A1=125,span=A1-A0;
  var val=Math.max(0,Math.min(100,idx)),col=bandColor(val),ve=A0+span*(val/100);
  host.innerHTML='<svg viewBox="0 0 200 168" role="img" aria-label="'+t("app.indexLabel")+' '+Math.round(val)+'">'
    +'<path d="'+arc(cx,cy,r,A0,A1)+'" fill="none" stroke="#e8edf5" stroke-width="15" stroke-linecap="round"/>'
    +'<path d="'+arc(cx,cy,r,A0,ve)+'" fill="none" stroke="'+col+'" stroke-width="15" stroke-linecap="round"/>'
    +'<text x="100" y="104" text-anchor="middle" font-size="42" font-weight="800" fill="#16213a">'+Math.round(val)+'</text>'
    +'<text x="100" y="134" text-anchor="middle" font-size="13" font-weight="700" letter-spacing="1.2" fill="'+col+'">'+t("app.indexLabel")+'</text>'
    +'</svg>';
}

/* ---------- dual M/H index chart ---------- */
function renderDual(host){
  if(!host)return;
  var W=620,H=270,pad={l:38,r:16,t:18,b:34},n=18;
  var ph=Date.now()/3200, M=[],Hh=[];
  for(var i=0;i<n;i++){
    var m=38+20*Math.sin(i/3.1+ph)+8*Math.sin(i/1.4+ph*1.6);
    m=Math.max(8,Math.min(96,m));M.push(m);
  }
  for(var k=0;k<n;k++){
    var src=M[Math.max(0,k-2)]; // human follows machine by ~2 steps (~30-40 min)
    var h=14+0.62*src+6*Math.sin(k/2.2+ph*0.9);
    Hh.push(Math.max(6,Math.min(94,h)));
  }
  var pw=W-pad.l-pad.r,ph2=H-pad.t-pad.b;
  function X(i){return pad.l+pw*(i/(n-1));}
  function Y(v){return pad.t+ph2*(1-v/100);}
  var s='';
  for(var g=0;g<=100;g+=25){var gy=Y(g);
    s+='<line x1="'+pad.l+'" y1="'+gy.toFixed(1)+'" x2="'+(W-pad.r)+'" y2="'+gy.toFixed(1)+'" stroke="#eef2f8"/>';
    s+='<text x="'+(pad.l-8)+'" y="'+(gy+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="#9aa6bd">'+g+'</text>';}
  // sync window highlight where both high near the end
  for(var w=2;w<n;w++){
    if(M[w-1]>62&&Hh[w]>58){
      s+='<rect x="'+X(w-1).toFixed(1)+'" y="'+pad.t+'" width="'+(X(w)-X(w-1)).toFixed(1)+'" height="'+ph2+'" fill="#e0483d" opacity="0.06"/>';
    }
  }
  function path(arr){var p='';for(var i=0;i<arr.length;i++)p+=(i?' L':'M')+X(i).toFixed(1)+' '+Y(arr[i]).toFixed(1);return p;}
  s+='<path d="'+path(M)+'" fill="none" stroke="#e8870f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';
  s+='<path d="'+path(Hh)+'" fill="none" stroke="#2f6bff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';
  s+='<circle cx="'+X(n-1).toFixed(1)+'" cy="'+Y(M[n-1]).toFixed(1)+'" r="4" fill="#e8870f"/>';
  s+='<circle cx="'+X(n-1).toFixed(1)+'" cy="'+Y(Hh[n-1]).toFixed(1)+'" r="4" fill="#2f6bff"/>';
  s+='<text x="'+pad.l+'" y="'+(H-pad.b+18)+'" font-size="11" fill="#9aa6bd">−6'+t("app.hoursAbbr")+'</text>';
  s+='<text x="'+X(n-1).toFixed(1)+'" y="'+(H-pad.b+18)+'" text-anchor="end" font-size="11" font-weight="700" fill="#56627a">'+t("app.now")+'</text>';
  host.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="M-Index vs H-Index">'+s+'</svg>';
}

/* ---------- impact chart ---------- */
function renderImpact(host){
  if(!host)return;
  var W=620,H=280,pad={l:40,r:20,t:22,b:38};
  var pts=[{y:"2020",v:0.57},{y:"2022",v:0.49},{y:"2024",v:0.39},{y:"2026",v:0.29},{y:"2028",v:0.23},{y:"2030",v:0.18}];
  var oecd=0.29,maxV=0.62,pw=W-pad.l-pad.r,ph=H-pad.t-pad.b;
  function X(i){return pad.l+pw*(i/(pts.length-1));}
  function Y(v){return pad.t+ph*(1-v/maxV);}
  var s='';
  for(var g=0;g<=0.6;g+=0.2){var gy=Y(g);
    s+='<line x1="'+pad.l+'" y1="'+gy.toFixed(1)+'" x2="'+(W-pad.r)+'" y2="'+gy.toFixed(1)+'" stroke="#eef2f8"/>';
    s+='<text x="'+(pad.l-8)+'" y="'+(gy+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="#9aa6bd">'+g.toFixed(1)+'</text>';}
  var oy=Y(oecd);
  s+='<line x1="'+pad.l+'" y1="'+oy.toFixed(1)+'" x2="'+(W-pad.r)+'" y2="'+oy.toFixed(1)+'" stroke="#7c5cff" stroke-width="1.4" stroke-dasharray="5 5"/>';
  s+='<text x="'+(pad.l+6)+'" y="'+(oy-7).toFixed(1)+'" font-size="11" font-weight="700" fill="#7c5cff">OECD 0.29</text>';
  var area='M'+X(0).toFixed(1)+' '+Y(0).toFixed(1);
  for(var a=0;a<pts.length;a++)area+=' L'+X(a).toFixed(1)+' '+Y(pts[a].v).toFixed(1);
  area+=' L'+X(pts.length-1).toFixed(1)+' '+Y(0).toFixed(1)+' Z';
  s+='<path d="'+area+'" fill="#2f6bff" opacity="0.08"/>';
  var lp='';for(var l=0;l<pts.length;l++)lp+=(l?' L':'M')+X(l).toFixed(1)+' '+Y(pts[l].v).toFixed(1);
  s+='<path d="'+lp+'" fill="none" stroke="#1b2a4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
  for(var p=0;p<pts.length;p++){var px=X(p),py=Y(pts[p].v),tg=(pts[p].y==="2026"||pts[p].y==="2030");
    s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="'+(tg?6:4.5)+'" fill="'+(tg?"#ffc629":"#1b2a4a")+'" stroke="#fff" stroke-width="2"/>';
    s+='<text x="'+px.toFixed(1)+'" y="'+(py-12).toFixed(1)+'" text-anchor="middle" font-size="11.5" font-weight="800" fill="#16213a">'+pts[p].v.toFixed(2)+'</text>';
    s+='<text x="'+px.toFixed(1)+'" y="'+(H-pad.b+18)+'" text-anchor="middle" font-size="11" fill="#56627a">'+pts[p].y+'</text>';}
  host.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Accident rate trajectory">'+s+'</svg>';
}

/* ---------- donut ---------- */
var healthVals=[58,16,11,9,6];
function renderHealth(donutHost,legendHost){
  var d=dict().health;
  if(donutHost){
    var r=52,cx=80,cy=80,C=2*Math.PI*r,off=0,s='';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#eef2f8" stroke-width="22"/>';
    for(var i=0;i<healthVals.length;i++){var ln=C*healthVals[i]/100;
      s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+d[i].c+'" stroke-width="22" stroke-dasharray="'+ln.toFixed(2)+' '+(C-ln).toFixed(2)+'" stroke-dashoffset="'+(-off).toFixed(2)+'" transform="rotate(-90 '+cx+' '+cy+')"/>';
      off+=ln;}
    s+='<text x="'+cx+'" y="'+(cy-2)+'" text-anchor="middle" font-size="26" font-weight="800" fill="#16213a">'+healthVals[0]+'%</text>';
    s+='<text x="'+cx+'" y="'+(cy+16)+'" text-anchor="middle" font-size="10.5" fill="#7e8aa1">'+d[0].n+'</text>';
    donutHost.innerHTML='<svg viewBox="0 0 160 160" role="img" aria-label="Workforce condition mix">'+s+'</svg>';
  }
  if(legendHost){var h='';for(var k=0;k<d.length;k++)
    h+='<li><span class="hl-dot" style="background:'+d[k].c+'"></span>'+d[k].n+'<span class="hl-val">'+healthVals[k]+'%</span></li>';
    legendHost.innerHTML=h;}
}

/* ---------- equipment PdM ---------- */
var wear=[24,32,68,18,28];
var wearBase=[22,30,66,16,26];
function renderEquip(host){
  if(!host)return;
  var eq=dict().equipment,note=dict().eqNote,h='';
  for(var i=0;i<eq.length;i++){
    var w=Math.round(wear[i]);
    var stage=w>=80?"critical":w>=55?"due":"normal";
    var cls=stage==="critical"?"zb-danger":stage==="due"?"zb-watch":"zb-safe";
    var lbl=stage==="critical"?t("dash.pdmCritical"):stage==="due"?t("dash.pdmDue"):t("dash.pdmNormal");
    var bar=stage==="critical"?"#e0483d":stage==="due"?"#f0a818":"#1faa6b";
    h+='<div class="zone-row">'
      +'<div><div class="zone-name">'+eq[i].n+'</div><div class="zone-meta">'+note[stage]+'</div></div>'
      +'<span class="zone-badge '+cls+'">'+lbl+' · '+w+'%</span>'
      +'<span class="zone-bar"><i style="width:'+w+'%;background:'+bar+'"></i></span>'
      +'</div>';
  }
  host.innerHTML=h;
}
function stepEquip(){
  for(var i=0;i<wear.length;i++){
    wear[i]+=Math.random()*1.4-0.2; // creeps up slowly
    if(wear[i]>=88){ wear[i]=wearBase[i]; } // part replaced -> reset
    wear[i]=Math.max(8,Math.min(94,wear[i]));
  }
}

/* ---------- worker vitals ---------- */
var wStress=[28,34,52,30,24];
var wBase=[26,32,46,28,22];
function renderVitals(host){
  if(!host)return;
  var wk=dict().workers,h='';
  for(var i=0;i<wk.length;i++){
    var sv=wStress[i];
    var stage=sv>=70?"danger":sv>=45?"watch":"safe";
    var cls=stage==="danger"?"zb-danger":stage==="watch"?"zb-watch":"zb-safe";
    var lbl=stage==="danger"?t("dash.danger"):stage==="watch"?t("dash.watch"):t("dash.safe");
    var hrv=Math.round(82-sv*0.55), sleep=(7.2-sv/45).toFixed(1), eda=Math.round(20+sv*0.9);
    h+='<div class="vital-row">'
      +'<div class="vital-id"><b>'+wk[i].id+'</b><span>'+wk[i].ln+'</span></div>'
      +'<div class="vital-metrics"><span>HRV <b>'+hrv+'</b></span><span>'+t("app.vSleep")+' <b>'+sleep+'h</b></span><span>EDA <b>'+eda+'</b></span></div>'
      +'<span class="zone-badge '+cls+'">'+lbl+'</span>'
      +'</div>';
  }
  host.innerHTML=h;
}
function stepVitals(){
  for(var i=0;i<wStress.length;i++){
    wStress[i]+=(wBase[i]-wStress[i])*0.2+(Math.random()-0.5)*8;
    if(Math.random()<0.03)wStress[i]+=26;
    wStress[i]=Math.max(8,Math.min(94,wStress[i]));
  }
}

/* ---------- intervention feed ---------- */
var feedItems=[];
function timeStr(ts){var d=new Date(ts);function p(n){return (n<10?"0":"")+n;}return p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());}
function pushEventIdx(){var evs=dict().events;feedItems.unshift({idx:Math.floor(Math.random()*evs.length),ts:Date.now()});if(feedItems.length>6)feedItems.pop();}
function renderFeed(host){
  if(!host)return;
  var evs=dict().events,h='';
  for(var i=0;i<feedItems.length;i++){var e=evs[feedItems[i].idx]||evs[0];
    h+='<div class="alert-item"><span class="alert-ic '+e.cls+'">'+e.ic+'</span>'
      +'<div class="alert-body"><div class="alert-title">'+e.ti+'</div><div class="alert-sub">'+e.su+'</div></div>'
      +'<span class="alert-time">'+timeStr(feedItems[i].ts)+'</span></div>';}
  host.innerHTML=h;
}

/* ---------- Fair Coin leaderboard ---------- */
var fcCoins=[1240,1110,980,870,760];
function tierName(c){return c>=1000?t("fc.t3n"):c>=600?t("fc.t2n"):t("fc.t1n");}
function tierCls(c){return c>=1000?"tci-best":c>=600?"tci-good":"tci-first";}
function renderBoard(host){
  if(!host)return;
  var teams=dict().fcTeams;
  var arr=[];for(var i=0;i<teams.length;i++)arr.push({n:teams[i].n,c:Math.round(fcCoins[i])});
  arr.sort(function(a,b){return b.c-a.c;});
  var max=arr[0].c||1,h='';
  for(var r=0;r<arr.length;r++){
    h+='<li class="fc-row">'
      +'<span class="fc-rank">'+(r+1)+'</span>'
      +'<div class="fc-team"><div class="fc-tn">'+arr[r].n+'</div>'
      +'<span class="fc-bar"><i style="width:'+Math.round(arr[r].c/max*100)+'%"></i></span></div>'
      +'<div class="fc-amt"><b>'+arr[r].c.toLocaleString()+'</b> '+t("app.fcUnit")+'<span class="tci '+tierCls(arr[r].c)+'">'+tierName(arr[r].c)+'</span></div>'
      +'</li>';
  }
  host.innerHTML=h;
}
function stepBoard(){for(var i=0;i<fcCoins.length;i++)fcCoins[i]+=Math.random()*14;}

/* ---------- cluster map ---------- */
var clusterData=[
  {x:108,y:158,sites:412,workers:38200,status:"#1faa6b"},
  {x:236,y:182,sites:265,workers:51400,status:"#f0a818"},
  {x:150,y:84, sites:198,workers:14300,status:"#1faa6b"}
];
function renderMap(host){
  if(!host)return;
  var shape='M120 22 C170 14 210 34 230 60 C262 78 286 96 282 130 C300 150 300 196 268 214 C250 252 206 270 172 256 C138 270 96 258 84 224 C44 214 26 176 44 142 C30 112 52 70 92 64 C100 40 100 28 120 22 Z';
  var s='<svg viewBox="0 0 320 290" role="img" aria-label="cluster map"><path d="'+shape+'" fill="#eef3fa" stroke="#d6e0ef" stroke-width="2"/>';
  for(var i=0;i<clusterData.length;i++){var c=clusterData[i];
    s+='<circle cx="'+c.x+'" cy="'+c.y+'" r="18" fill="'+c.status+'" opacity="0.16"/>';
    s+='<circle cx="'+c.x+'" cy="'+c.y+'" r="9" fill="'+c.status+'" stroke="#fff" stroke-width="2.5"/>';}
  host.innerHTML=s+'</svg>';
}
function renderClusterList(host){
  if(!host)return;
  var cl=dict().clusters,h='';
  var ex=dict().clustersExtra||[];
  for(var i=0;i<cl.length;i++){var c=clusterData[i],e=ex[i]||{};
    h+='<li class="cluster-item" tabindex="0"><div class="ci-top"><span class="cluster-pin" style="background:'+c.status+'"></span>'
      +'<div><div class="cluster-name">'+cl[i].n+'</div><div class="cluster-tag">'+cl[i].t+'</div></div>'
      +'<div class="cluster-count">'+c.sites+'<small>'+t("app.sites")+' · '+(c.workers/1000).toFixed(1)+'k '+t("app.workers")+'</small></div></div>'
      +'<div class="cluster-extra"><span class="cx"><b>'+(e.u||'—')+'</b>'+t("lx.uptime")+'</span><span class="cx"><b>'+(e.a||'0')+'</b>'+t("lx.alerts")+'</span><span class="cx"><b>'+(e.p||'0')+'</b>'+t("lx.prevented")+'</span></div></li>';}
  host.innerHTML=h;
}

/* ---------- ROI ---------- */
function formatWon(vM){
  if(vM<=0)return lang==="en"?"₩0":"0";
  if(lang==="en"){if(vM>=1000)return "₩"+(vM/1000).toFixed(2)+"B";return "₩"+Math.round(vM)+"M";}
  var u=t("app.unitB");
  if(vM>=100)return "₩"+(vM/100).toFixed(1)+u;
  return "₩"+Math.round(vM)+t("app.unitM");
}
function clampNum(id,def,min,max){var el=document.getElementById(id);if(!el)return def;var v=parseFloat(el.value);if(isNaN(v))v=def;return Math.max(min,Math.min(max,v));}
function setText(id,x){var el=document.getElementById(id);if(el)el.textContent=x;}
function calcROI(){
  var W=clampNum("roiWorkers",120,1,100000),I=clampNum("roiIncidents",9,0,10000),C=clampNum("roiCost",42,0,100000);
  var prevented=I*0.50;
  var saving=prevented*C*1.15 + W*0.6; // accident avoidance + uptime/productivity
  var cost=Math.max(6,W*0.18);
  var pay=saving>0?cost/(saving/12):0;
  var roi=cost>0?((saving-cost)/cost*100):0;
  setText("roiSaved",formatWon(saving));
  setText("roiPayback",saving<=0?"—":(pay<1?"<1 ":Math.round(pay)+" ")+t("app.months"));
  setText("roiRoi",(roi>=0?"+":"")+Math.round(roi)+"%");
}

/* ---------- counters ---------- */
function animateCounters(){
  var c=document.querySelectorAll("[data-count]");
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){runCount(e.target);io.unobserve(e.target);}});},{threshold:0.4});
  for(var i=0;i<c.length;i++)io.observe(c[i]);
}
function runCount(el){
  var target=parseFloat(el.getAttribute("data-count")),dec=parseInt(el.getAttribute("data-decimals")||"0",10),suf=el.getAttribute("data-suffix")||"";
  var st=performance.now(),dur=1400;
  function f(now){var p=Math.min(1,(now-st)/dur),e=1-Math.pow(1-p,3),v=target*e;
    el.textContent=(dec>0?v.toFixed(dec):Math.round(v).toLocaleString())+suf;
    if(p<1)requestAnimationFrame(f);else el.textContent=(dec>0?target.toFixed(dec):Math.round(target).toLocaleString())+suf;}
  requestAnimationFrame(f);
}
function heroMini(){var z=document.getElementById("heroZones"),a=document.getElementById("heroAlerts");if(z)animTo(z,dict().equipment.length);if(a)animTo(a,31);}
function animTo(el,target){var st=performance.now(),dur=1200;function f(now){var p=Math.min(1,(now-st)/dur);el.textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f);}requestAnimationFrame(f);}

/* ---------- index ---------- */
var syncRisk=17;
function heroIndex(){return Math.round(100-syncRisk);}
function stepSync(){syncRisk+=(17-syncRisk)*0.25+(Math.random()-0.5)*5;if(Math.random()<0.04)syncRisk+=18;syncRisk=Math.max(6,Math.min(60,syncRisk));}

/* ---------- render all ---------- */
function renderDynamic(){
  renderGauge(document.getElementById("heroGauge"),heroIndex());
  renderGauge(document.getElementById("mainGauge"),heroIndex());
  renderDual(document.getElementById("dualChart"));
  renderImpact(document.getElementById("impactChart"));
  renderHealth(document.getElementById("healthDonut"),document.getElementById("healthLegend"));
  renderEquip(document.getElementById("equipList"));
  renderVitals(document.getElementById("vitalsList"));
  renderFeed(document.getElementById("alertFeed"));
  renderBoard(document.getElementById("fcBoard"));
  renderMap(document.getElementById("clusterMap"));
  renderClusterList(document.getElementById("clusterList"));
  calcROI();
}

/* ---------- language ---------- */
function setLang(l){if(SUPPORTED.indexOf(l)<0)return;lang=l;try{localStorage.setItem("hmsync_lang",l);}catch(e){}applyStatic();renderDynamic();}

/* ---------- chrome ---------- */
function initChrome(){
  var header=document.getElementById("siteHeader");
  window.addEventListener("scroll",function(){if(header)header.classList.toggle("scrolled",window.scrollY>10);},{passive:true});
  var tg=document.getElementById("navToggle"),nav=document.getElementById("mainNav");
  if(tg&&nav){tg.addEventListener("click",function(){var o=nav.classList.toggle("open");tg.setAttribute("aria-expanded",o?"true":"false");});
    nav.addEventListener("click",function(e){if(e.target.tagName==="A"){nav.classList.remove("open");tg.setAttribute("aria-expanded","false");}});}
  var lb=document.querySelectorAll(".lang-btn");
  for(var i=0;i<lb.length;i++)lb[i].addEventListener("click",function(){setLang(this.getAttribute("data-lang"));});
  ["roiWorkers","roiIncidents","roiCost"].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener("input",calcROI);});
}

/* ---------- live loop ---------- */
function startLive(){
  for(var i=0;i<5;i++){pushEventIdx();feedItems[feedItems.length-1].ts=Date.now()-(5-i)*9000;}
  renderFeed(document.getElementById("alertFeed"));
  setInterval(function(){
    stepSync();stepEquip();stepVitals();
    renderGauge(document.getElementById("heroGauge"),heroIndex());
    renderGauge(document.getElementById("mainGauge"),heroIndex());
    renderEquip(document.getElementById("equipList"));
    renderVitals(document.getElementById("vitalsList"));
    renderMap(document.getElementById("clusterMap"));
  },3500);
  var dashV=true;
  if("IntersectionObserver" in window){var dEl=document.getElementById("dashboard");if(dEl){var dio=new IntersectionObserver(function(es){dashV=es[0].isIntersecting;},{threshold:0.01});dio.observe(dEl);}}
  setInterval(function(){if(dashV)renderDual(document.getElementById("dualChart"));},90);
  setInterval(function(){pushEventIdx();renderFeed(document.getElementById("alertFeed"));},5000);
  setInterval(function(){stepBoard();renderBoard(document.getElementById("fcBoard"));},6000);
  setInterval(function(){var i=1+Math.floor(Math.random()*(healthVals.length-1)),d=(Math.random()<0.5?-1:1);
    if(healthVals[i]+d>=2&&healthVals[i]+d<=24){healthVals[i]+=d;healthVals[0]-=d;}
    renderHealth(document.getElementById("healthDonut"),document.getElementById("healthLegend"));},7000);
}

/* ---------- dynamic FX (reveal · tilt · parallax) ---------- */
function initFx(){
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  // scroll reveal
  var sel=".section-head,.hazard-card,.prob3-card,.chain,.pstat,.source,.pipe-step,.engine-card,.sync-index,.dual-card,.dash-card,.how-step,.feature,.fc-score,.tier,.fc-board,.fc-track,.ikpi,.eco-card,.stat";
  var nodes=document.querySelectorAll(sel);
  for(var i=0;i<nodes.length;i++)nodes[i].classList.add("reveal");
  if("IntersectionObserver" in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:0.08,rootMargin:"0px 0px -6% 0px"});
    for(var j=0;j<nodes.length;j++)io.observe(nodes[j]);
  } else { for(var k=0;k<nodes.length;k++)nodes[k].classList.add("in"); }
  if(reduce)return;
  var canHover=!window.matchMedia||window.matchMedia("(hover:hover)").matches;
  // hover tilt
  if(canHover){
    var tnodes=document.querySelectorAll(".feature,.eco-card,.engine-card,.fc-score,.how-step,.prob3-card");
    tnodes.forEach(function(elm){
      elm.classList.add("tilt");
      elm.addEventListener("pointermove",function(e){
        var r=elm.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-0.5,py=(e.clientY-r.top)/r.height-0.5;
        elm.style.transform="perspective(720px) rotateX("+(-py*5).toFixed(2)+"deg) rotateY("+(px*5).toFixed(2)+"deg) translateY(-4px)";
      });
      elm.addEventListener("pointerleave",function(){elm.style.transform="";});
    });
    // hero parallax
    var hero=document.getElementById("hero"),card=document.querySelector(".hero-card"),bg=document.querySelector(".hero-bg");
    if(hero&&card){
      hero.addEventListener("pointermove",function(e){
        var px=e.clientX/window.innerWidth-0.5,py=e.clientY/window.innerHeight-0.5;
        card.style.transform="translate3d("+(-px*14).toFixed(1)+"px,"+(-py*10).toFixed(1)+"px,0)";
        if(bg)bg.style.transform="translate3d("+(px*18).toFixed(1)+"px,"+(py*12).toFixed(1)+"px,0)";
      });
      hero.addEventListener("pointerleave",function(){card.style.transform="";if(bg)bg.style.transform="";});
    }
  }
}

/* ---------- init ---------- */
function init(){document.body.classList.add("js");applyStatic();renderDynamic();initChrome();animateCounters();heroMini();startLive();initFx();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();

})();
