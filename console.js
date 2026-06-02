/* ===========================================================
   H-M Synced — Live Console logic (vanilla, dependency-free)
   =========================================================== */
(function(){
"use strict";
var SUPPORTED=["en","zh","ko"];
var lang=detectLang();

/* ---- i18n ---- */
function detectLang(){try{var s=localStorage.getItem("hmsync_lang");if(s&&SUPPORTED.indexOf(s)>-1)return s;}catch(e){}var n=(navigator.language||"en").toLowerCase();if(n.indexOf("zh")===0)return "zh";if(n.indexOf("ko")===0)return "ko";return "en";}
function dict(){return window.I18N[lang]||window.I18N.en;}
function t(k){var d=dict();return (k in d)?d[k]:(k in window.I18N.en?window.I18N.en[k]:k);}
function applyStatic(){
  document.documentElement.setAttribute("lang",lang);
  var n=document.querySelectorAll("[data-i18n]");
  for(var i=0;i<n.length;i++){var el=n[i],k=el.getAttribute("data-i18n"),v=t(k);if(v==null)continue;
    if(el.tagName==="TITLE")document.title=v;else el.textContent=v;}
  var b=document.querySelectorAll(".lang-btn");for(var j=0;j<b.length;j++)b[j].classList.toggle("active",b[j].getAttribute("data-lang")===lang);
}
function esc(s){return (''+s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}

/* CCTV scene illustrations (inline SVG, no external assets) */
var CBOX=[{l:16,t:46,w:26,h:24},{l:38,t:24,w:34,h:40},{l:14,t:30,w:28,h:42},{l:30,t:42,w:34,h:26},
          {l:24,t:38,w:42,h:38},{l:60,t:50,w:30,h:26},{l:18,t:48,w:30,h:26},{l:14,t:26,w:30,h:52}];
function sceneSVG(i){
  var WALL='<rect width="160" height="120" fill="#2a4775"/><rect y="80" width="160" height="40" fill="#1d3155"/><rect y="79" width="160" height="2" fill="#3c5d92"/>';
  var P=[
    /*0 line*/ '<rect x="6" y="74" width="148" height="10" rx="3" fill="#5c6f90"/><circle cx="18" cy="88" r="4" fill="#3a4f73"/><circle cx="80" cy="88" r="4" fill="#3a4f73"/><circle cx="142" cy="88" r="4" fill="#3a4f73"/><rect x="26" y="60" width="16" height="14" fill="#c79a5a"/><rect x="72" y="58" width="18" height="16" fill="#b98f50"/><rect x="118" y="60" width="16" height="14" fill="#c79a5a"/>',
    /*1 press*/ '<rect x="44" y="58" width="72" height="34" fill="#566b8e"/><rect x="50" y="20" width="60" height="14" fill="#7e93b5"/><rect x="56" y="34" width="6" height="26" fill="#6a7fa3"/><rect x="98" y="34" width="6" height="26" fill="#6a7fa3"/><rect x="66" y="36" width="28" height="20" fill="#9fb4d4"/>',
    /*2 chemical*/ '<rect x="24" y="38" width="28" height="50" rx="13" fill="#8fa6c8"/><rect x="60" y="46" width="22" height="42" rx="10" fill="#7e93b5"/><rect x="46" y="52" width="74" height="5" fill="#9fb4d4"/><circle cx="118" cy="54" r="7" fill="#6a7fa3"/><rect x="114" y="54" width="8" height="34" fill="#6a7fa3"/>',
    /*3 assembly*/ '<rect x="20" y="66" width="120" height="8" fill="#566b8e"/><rect x="28" y="74" width="6" height="14" fill="#3a4f73"/><rect x="126" y="74" width="6" height="14" fill="#3a4f73"/><circle cx="54" cy="60" r="6" fill="#c79a5a"/><rect x="76" y="54" width="14" height="12" fill="#b98f50"/><rect x="112" y="38" width="6" height="28" fill="#7e93b5"/><rect x="112" y="38" width="22" height="6" fill="#9fb4d4"/>',
    /*4 forklift*/ '<rect x="40" y="54" width="46" height="22" rx="3" fill="#e0a93b"/><rect x="60" y="40" width="20" height="16" fill="#caa24a"/><rect x="86" y="34" width="6" height="44" fill="#566b8e"/><rect x="90" y="70" width="24" height="5" fill="#7e93b5"/><circle cx="50" cy="80" r="7" fill="#22324d"/><circle cx="78" cy="80" r="7" fill="#22324d"/>',
    /*5 dock*/ '<rect x="12" y="46" width="62" height="32" fill="#8fa6c8"/><rect x="74" y="56" width="20" height="22" fill="#7e93b5"/><circle cx="30" cy="80" r="6" fill="#22324d"/><circle cx="58" cy="80" r="6" fill="#22324d"/><circle cx="86" cy="80" r="6" fill="#22324d"/><rect x="104" y="64" width="28" height="14" fill="#c79a5a"/>',
    /*6 gate*/ '<rect x="30" y="40" width="8" height="48" fill="#566b8e"/><rect x="36" y="44" width="76" height="6" rx="3" fill="#e0a93b" transform="rotate(-9 38 47)"/><rect x="20" y="98" width="16" height="4" fill="#e0a93b"/><rect x="58" y="98" width="16" height="4" fill="#e0a93b"/><rect x="96" y="98" width="16" height="4" fill="#e0a93b"/><rect x="118" y="60" width="26" height="20" rx="3" fill="#7e93b5"/>',
    /*7 utility*/ '<rect x="26" y="34" width="40" height="56" fill="#566b8e"/><circle cx="36" cy="46" r="5" fill="#9fb4d4"/><circle cx="52" cy="46" r="5" fill="#9fb4d4"/><rect x="32" y="58" width="28" height="4" fill="#3a4f73"/><rect x="32" y="66" width="28" height="4" fill="#3a4f73"/><rect x="80" y="38" width="6" height="52" fill="#7e93b5"/><rect x="100" y="38" width="6" height="52" fill="#7e93b5"/><rect x="80" y="38" width="46" height="6" fill="#9fb4d4"/>'
  ];
  return '<svg class="cctv-scene" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+WALL+(P[i]||'')+'</svg>';
}

/* ---- timers ---- */
var timers=[],motionRAF=null;
function addI(fn,ms){var id=setInterval(fn,ms);timers.push(['i',id]);return id;}
function addT(fn,ms){var id=setTimeout(fn,ms);timers.push(['t',id]);return id;}
function clearTimers(){timers.forEach(function(x){x[0]==='i'?clearInterval(x[1]):clearTimeout(x[1]);});timers=[];stopMotion();}
function stopMotion(){if(motionRAF){cancelAnimationFrame(motionRAF);motionRAF=null;}}
function el(id){return document.getElementById(id);}
function now(){return Date.now();}
function timeStr(ts){var d=new Date(ts);function p(n){return (n<10?"0":"")+n;}return p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());}

/* ====================== ROUTER ====================== */
var VIEWS={control:initControl,live:initLive,twin:initTwin,agent:initAgent,sim:initSim,motion:initMotion,devices:initDevices,signup:initSignup};
var current="control";
function show(v){
  if(!VIEWS[v])v="control"; current=v;
  clearTimers();
  var vs=document.querySelectorAll(".view");
  for(var i=0;i<vs.length;i++)vs[i].hidden=(vs[i].id!=="view-"+v);
  var na=document.querySelectorAll("#csNav a");
  for(var j=0;j<na.length;j++)na[j].classList.toggle("active",na[j].getAttribute("data-view")===v);
  el("csViewTitle").textContent=t("c.nav."+v);
  el("csViewSub").textContent=(v==="control")?t("c.facility"):"";
  var mg=el("motionGroup");if(mg)mg.classList.toggle("open",v==="motion");
  VIEWS[v]();
  var side=el("csSide");if(side)side.classList.remove("open");
}
function route(){var h=(location.hash||"#control").slice(1);show(h);}

/* ====================== CONTROL CENTER ====================== */
var ccTemps=[22.5,24.0,27.8,23.2,38.4,45.8], ccFeed=[];
function initControl(){
  var d=dict();
  // KPI
  el("kpiRow").innerHTML=d.cKpi.map(function(k){return '<div class="kpi"><div class="kpi-v">'+esc(k.v)+'</div><div class="kpi-k">'+esc(k.k)+'</div><div class="kpi-d">'+esc(k.d)+'</div></div>';}).join('');
  // CCTV (static animated)
  el("ccCctv").innerHTML=d.cCctv.map(function(n,i){
    var det=(d.cCctvDet&&d.cCctvDet[i])||{lab:'',tone:'ok'};
    var p=CBOX[i]||{l:20,t:40,w:30,h:28};
    return '<div class="cctv">'+sceneSVG(i)+'<span class="cctv-shade"></span>'
      +'<span class="rec"></span><b>'+esc(n)+'</b><span class="scan"></span>'
      +'<span class="cbox '+(det.tone==='warn'?'warn':'')+'" style="left:'+p.l+'%;top:'+p.t+'%;width:'+p.w+'%;height:'+p.h+'%"><span class="cbox-lab">'+esc(det.lab)+'</span></span>'
      +'<span class="cai">AI</span></div>';}).join('');
  // chain
  el("ccChain").innerHTML=d.cChain.map(function(c,i){
    return (i?'<span class="chain-arrow">→</span>':'')+'<div class="chain-node"><div class="cn-t">'+esc(c.t)+'</div><div class="cn-s">'+esc(c.s)+'</div></div>';}).join('');
  // health & report
  el("ccHealth").innerHTML=d.cHealth.map(function(h){return '<div class="hcell"><div class="hv">'+esc(h.v)+'</div><div class="hk">'+esc(h.k)+'</div></div>';}).join('');
  el("ccReport").innerHTML=d.cReport.map(function(r){return '<div class="rcell"><div class="rv">'+esc(r.v)+'</div><div class="rk">'+esc(r.k)+'</div></div>';}).join('');
  renderZones();
  // feed seed
  ccFeed=[];for(var i=0;i<5;i++){pushFeed();ccFeed[ccFeed.length-1].ts=now()-(5-i)*9000;}renderFeed();
  addI(function(){for(var z=0;z<ccTemps.length;z++){ccTemps[z]+=(Math.random()-0.5)*1.2;ccTemps[z]=Math.max(18,Math.min(52,ccTemps[z]));}renderZones();},3000);
  addI(function(){pushFeed();renderFeed();},5000);
}
function renderZones(){
  var d=dict(),letters=['A','B','C','D','E','F'];
  el("ccZones").innerHTML=ccTemps.map(function(tp,i){var hot=tp>40;return '<div class="zcell" style="'+(hot?'border-color:#f3c2bd;background:#fdecea':'')+'"><div class="zt" style="color:'+(hot?'#e0483d':'#16213a')+'">'+tp.toFixed(1)+'°</div><div class="zn">'+t("c.cc.zoneWord")+' '+letters[i]+'</div></div>';}).join('');
}
function pushFeed(){var evs=dict().events;ccFeed.unshift({idx:Math.floor(Math.random()*evs.length),ts:now()});if(ccFeed.length>6)ccFeed.pop();}
function renderFeed(){var evs=dict().events;el("ccFeed").innerHTML=ccFeed.map(function(f){var e=evs[f.idx]||evs[0];return '<div class="alert-item"><span class="alert-ic '+e.cls+'">'+e.ic+'</span><div class="alert-body"><div class="alert-title">'+esc(e.ti)+'</div><div class="alert-sub">'+esc(e.su)+'</div></div><span class="alert-time">'+timeStr(f.ts)+'</span></div>';}).join('');}

/* ====================== WORKER LIVE ====================== */
var liveN=40, lwStress=[], lwBase=[], lwId=[], lwZi=[], liveBuilt=false;
function buildLive(){
  // realistic mix: mostly safe, some watch, a few danger
  var pat=[22,30,18,52,26,38,16,68,24,34,20,44,28,16,58,22,30,18,48,26];
  lwBase=[];lwStress=[];lwId=[];lwZi=[];
  for(var i=0;i<liveN;i++){
    var b=pat[i%pat.length];
    lwBase.push(b); lwStress.push(Math.max(8,b+(Math.random()*6-3)));
    lwId.push("W-"+("00"+(i+1)).slice(-3));
    lwZi.push(i%8);
  }
  liveBuilt=true;
}
function initLive(){
  if(!liveBuilt)buildLive();
  el("liveCount").textContent=liveN+" "+t("app.workers");
  renderLive();
  addI(function(){for(var i=0;i<liveN;i++){lwStress[i]+=((lwBase[i]-lwStress[i])*0.18)+(Math.random()-0.5)*9;if(Math.random()<0.03)lwStress[i]+=22;lwStress[i]=Math.max(8,Math.min(94,lwStress[i]));}renderLive();},3000);
}
function renderLive(){
  var zones=dict().cLiveWorkers, h='';
  for(var i=0;i<liveN;i++){
    var sv=lwStress[i]||20, stage=sv>=70?"danger":sv>=45?"watch":"safe";
    var cls=stage==="danger"?"zb-danger":stage==="watch"?"zb-watch":"zb-safe";
    var lbl=stage==="danger"?t("dash.danger"):stage==="watch"?t("dash.watch"):t("dash.safe");
    var bar=stage==="danger"?"#e0483d":stage==="watch"?"#f0a818":"#1faa6b";
    var hrv=Math.round(82-sv*0.55),sleep=(7.2-sv/45).toFixed(1),eda=Math.round(20+sv*0.9);
    var z=(zones[lwZi[i]]||zones[0]).z;
    h+='<div class="lw"><div class="lw-top"><span class="lw-id">'+lwId[i]+'</span><span class="zone-badge '+cls+'">'+lbl+'</span><span class="lw-z">'+esc(z)+'</span></div>'
      +'<div class="lw-metrics"><span>HRV <b>'+hrv+'</b></span><span>'+t("app.vSleep")+' <b>'+sleep+'h</b></span><span>EDA <b>'+eda+'</b></span></div>'
      +'<div class="lw-bar"><i style="width:'+Math.round(sv)+'%;background:'+bar+'"></i></div></div>';
  }
  el("liveWorkers").innerHTML=h;
}

/* ====================== 3D DIGITAL TWIN (iso SVG) ====================== */
var theta=0.6, autoOn=true, twinRisk=[20,28,66,18,40,24], twinBound=false;
var TWM=[{x:-150,y:-70,w:70,d:46,h:55},{x:-40,y:-92,w:64,d:44,h:48},{x:80,y:-58,w:60,d:60,h:66},
         {x:-150,y:62,w:96,d:32,h:28},{x:30,y:70,w:56,d:50,h:50},{x:142,y:48,w:50,d:46,h:60}];
var CX=350,CY=232;
function proj(x,y,z){var c=Math.cos(theta),s=Math.sin(theta);var rx=x*c-y*s,ry=x*s+y*c;return [CX+rx*0.74,CY+ry*0.37-z*0.66];}
function band(r){return r>=72?{t:"#ef8079",s:"#cf4a3f",lab:t("dash.danger")}:r>=46?{t:"#f4cf6a",s:"#d79a16",lab:t("dash.watch")}:{t:"#69cfa0",s:"#2e9d6e",lab:t("dash.safe")};}
function poly(pts){return pts.map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1);}).join(" ");}
function buildTwin(){
  var s='<svg viewBox="118 84 464 272" preserveAspectRatio="xMidYMid meet" role="img" aria-label="3D twin">';
  // floor
  var fc=[proj(-220,-150,0),proj(220,-150,0),proj(220,150,0),proj(-220,150,0)];
  s+='<polygon points="'+poly(fc)+'" fill="#dfe9f8" stroke="#c2d0e6" stroke-width="1.5"/>';
  for(var g=-220;g<=220;g+=55){var a=proj(g,-150,0),b=proj(g,150,0);s+='<line x1="'+a[0].toFixed(1)+'" y1="'+a[1].toFixed(1)+'" x2="'+b[0].toFixed(1)+'" y2="'+b[1].toFixed(1)+'" stroke="#cdd9ec"/>';}
  for(var g2=-150;g2<=150;g2+=50){var a2=proj(-220,g2,0),b2=proj(220,g2,0);s+='<line x1="'+a2[0].toFixed(1)+'" y1="'+a2[1].toFixed(1)+'" x2="'+b2[0].toFixed(1)+'" y2="'+b2[1].toFixed(1)+'" stroke="#cdd9ec"/>';}
  // depth sort machines
  var c=Math.cos(theta),sn=Math.sin(theta);
  var order=TWM.map(function(m,i){return {i:i,d:m.x*sn+m.y*c};}).sort(function(a,b){return a.d-b.d;});
  order.forEach(function(o){
    var m=TWM[o.i],x0=m.x-m.w/2,x1=m.x+m.w/2,y0=m.y-m.d/2,y1=m.y+m.d/2,h=m.h,col=band(twinRisk[o.i]);
    // 4 side faces
    var faces=[
      {p:[proj(x0,y0,0),proj(x1,y0,0),proj(x1,y0,h),proj(x0,y0,h)],dep:(x0+x1)/2*sn+y0*c},
      {p:[proj(x0,y1,0),proj(x1,y1,0),proj(x1,y1,h),proj(x0,y1,h)],dep:(x0+x1)/2*sn+y1*c},
      {p:[proj(x0,y0,0),proj(x0,y1,0),proj(x0,y1,h),proj(x0,y0,h)],dep:x0*sn+(y0+y1)/2*c},
      {p:[proj(x1,y0,0),proj(x1,y1,0),proj(x1,y1,h),proj(x1,y0,h)],dep:x1*sn+(y0+y1)/2*c}
    ].sort(function(a,b){return a.dep-b.dep;});
    s+='<g data-i="'+o.i+'">';
    faces.forEach(function(f){s+='<polygon points="'+poly(f.p)+'" fill="'+col.s+'" stroke="#ffffff" stroke-width="1" opacity="0.96"/>';});
    var top=[proj(x0,y0,h),proj(x1,y0,h),proj(x1,y1,h),proj(x0,y1,h)];
    s+='<polygon points="'+poly(top)+'" fill="'+col.t+'" stroke="#ffffff" stroke-width="1.4"/>';
    var ctr=proj(m.x,m.y,h);
    s+='<text x="'+ctr[0].toFixed(1)+'" y="'+ctr[1].toFixed(1)+'" text-anchor="middle" font-size="11" font-weight="800" fill="#16213a">'+esc(dict().cTwinMachines[o.i].n)+'</text>';
    var rr=twinRisk[o.i];
    if(rr>=46){var mk=proj(m.x,m.y,h+24);
      s+='<circle class="tev" cx="'+mk[0].toFixed(1)+'" cy="'+mk[1].toFixed(1)+'" r="9" fill="'+col.s+'" stroke="#fff" stroke-width="2"/>'
        +'<text x="'+mk[0].toFixed(1)+'" y="'+(mk[1]+4).toFixed(1)+'" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">!</text>';}
    s+='</g>';
  });
  s+='</svg>';
  el("twinScene").innerHTML=s;
}
function setTwinInfo(i){
  var info=el("twinInfo");
  if(i==null){info.innerHTML='<span style="color:var(--muted)">'+t("c.twin.click")+'</span>';return;}
  var r=Math.round(twinRisk[i]),col=band(twinRisk[i]),mname=dict().cTwinMachines[i].n;
  var soft=col.lab===t("dash.danger")?"var(--danger-soft)":col.lab===t("dash.watch")?"var(--watch-soft)":"var(--safe-soft)";
  var ev=r>=72?t("c.twin.evDanger"):r>=46?t("c.twin.evWatch"):t("c.twin.evNone");
  function L(k){return t(k).replace("{m}",mname).replace("{r}",r);}
  info.innerHTML='<div class="ti-head"><b>'+esc(mname)+'</b><span class="ti-pill" style="background:'+soft+';color:'+col.s+'">'+col.lab+' · M-Index '+r+'</span></div>'
    +'<div class="ti-ev"><b>'+esc(t("c.twin.evTitle"))+':</b> '+esc(ev)+'</div>'
    +'<div class="ti-logic"><b>'+esc(t("c.twin.logicTitle"))+'</b><ol><li>'+esc(L("c.twin.l1"))+'</li><li>'+esc(L("c.twin.l2"))+'</li><li>'+esc(L("c.twin.l3"))+'</li><li>'+esc(L("c.twin.l4"))+'</li></ol></div>';
}
function initTwin(){
  buildTwin(); setTwinInfo(null);
  var stage=el("twinStage"),scene=el("twinScene");
  if(!twinBound){
    var drag=false,lastX=0;
    stage.addEventListener("pointerdown",function(e){drag=true;lastX=e.clientX;autoOn=false;el("twinRotate").classList.remove("on");stage.setPointerCapture&&stage.setPointerCapture(e.pointerId);});
    stage.addEventListener("pointermove",function(e){
      if(drag){theta+=(e.clientX-lastX)*0.01;lastX=e.clientX;buildTwin();}
      var g=e.target.closest&&e.target.closest("[data-i]");setTwinInfo(g?parseInt(g.getAttribute("data-i"),10):null);
    });
    window.addEventListener("pointerup",function(){drag=false;});
    el("twinRotate").addEventListener("click",function(){autoOn=!autoOn;this.classList.toggle("on",autoOn);});
    twinBound=true;
  }
  el("twinRotate").classList.toggle("on",autoOn);
  addI(function(){if(autoOn){theta+=0.012;buildTwin();}},60);
  addI(function(){for(var i=0;i<twinRisk.length;i++){var base=(i===2?66:[20,28,66,18,40,24][i]);twinRisk[i]+=(base-twinRisk[i])*0.2+(Math.random()-0.5)*6;if(Math.random()<0.04)twinRisk[i]+=22;twinRisk[i]=Math.max(8,Math.min(92,twinRisk[i]));}},3000);
}

/* ====================== AGENT HARNESS ====================== */
var agLog=[],agStep=0;
function initAgent(){
  var d=dict();
  el("agentPillars").innerHTML=d.cPillars.map(function(p){return '<div class="pillar"><h4>'+esc(p.t)+'</h4><p>'+esc(p.d)+'</p></div>';}).join('');
  var catColor={SENSE:"#2f6bff",JUDGE:"#7c5cff",ACT:"#e8a200",CONNECT:"#1faa6b"};
  el("agentList").innerHTML=d.cAgents.map(function(a,i){return '<div class="ag" data-ai="'+i+'"><span class="ag-d" style="background:'+(catColor[a.c]||"#888")+'"></span><span class="ag-n">'+esc(a.n)+'</span><span class="ag-c">'+esc(a.c)+'</span></div>';}).join('');
  agLog=[];agStep=0;el("agentLog").innerHTML='';
  addI(function(){
    var lines=dict().cAgentLog;var line=lines[agStep%lines.length];agStep++;
    var lvl=(line.match(/\[(\w+)\]/)||[])[1]||"";
    agLog.unshift('<div class="alog l-'+lvl+'">'+esc(line)+'</div>');if(agLog.length>9)agLog.pop();
    el("agentLog").innerHTML=agLog.join('');
  },1700);
}

/* ====================== SIMULATOR ====================== */
function initSim(){
  var d=dict();
  el("simBtns").innerHTML=d.cSims.map(function(s){return '<button class="sim-btn" data-sim="'+s.id+'">'+esc(s.l)+'</button>';}).join('');
  el("simTimeline").innerHTML='<div class="sim-ev info">'+t("c.sim.note")+'</div>';
  setMeters(18,14);
  el("simBtns").querySelectorAll(".sim-btn").forEach(function(b){
    b.addEventListener("click",function(){
      el("simBtns").querySelectorAll(".sim-btn").forEach(function(x){x.classList.remove("active");});
      b.classList.add("active");runSim(b.getAttribute("data-sim"));
    });
  });
}
function setMeters(m,h){el("simM").style.width=m+"%";el("simMv").textContent=Math.round(m);el("simH").style.width=h+"%";el("simHv").textContent=Math.round(h);}
function runSim(id){
  var steps=dict().cSimSteps[id]||[];
  el("simTimeline").innerHTML='';
  var peak={wear:[74,30],stress:[40,76],fall:[58,64],reset:[18,14]}[id]||[18,14];
  setMeters(id==="reset"?18:Math.min(40,peak[0]*0.5), id==="reset"?14:Math.min(30,peak[1]*0.5));
  steps.forEach(function(st,i){
    addT(function(){
      var div=document.createElement("div");div.className="sim-ev "+(st.x||"info");div.textContent=st.t;
      el("simTimeline").appendChild(div);
      var frac=(i+1)/steps.length;
      if(id!=="reset")setMeters(peak[0]*frac, peak[1]*frac);else setMeters(18,14);
    }, 500+i*850);
  });
}

/* ====================== MOTION / FALL (canvas) ====================== */
var BONES=[[0,1],[1,2],[1,3],[2,4],[4,6],[3,5],[5,7],[1,8],[8,9],[8,10],[9,11],[11,13],[10,12],[12,14]];
var STAND=[[180,58],[180,92],[152,100],[208,100],[142,140],[218,140],[136,180],[224,180],[180,182],[166,186],[194,186],[160,238],[200,238],[158,288],[202,288]];
var motionMode="idle",fallP=0,pinchP=0,motionT=0,motionBound=false,fallChainRun=false,pinchChainRun=false,pendingScn=null;
function rot(pt,cx,cy,a){var dx=pt[0]-cx,dy=pt[1]-cy,c=Math.cos(a),s=Math.sin(a);return [cx+dx*c-dy*s, cy+dx*s+dy*c];}
function lerp(a,b,t){return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];}
function clearMotionChain(){var m=el("motionChain");if(m)m.innerHTML='';}
function triggerFall(){motionMode="falling";fallP=0;fallChainRun=false;clearMotionChain();renderReba(false);setStatus("ok");if(!motionRAF)loopMotion();}
function triggerPinch(){motionMode="pinching";pinchP=0;pinchChainRun=false;clearMotionChain();renderReba(false);setStatus("ok");if(!motionRAF)loopMotion();}
function initMotion(){
  motionMode="idle";fallP=0;pinchP=0;motionT=0;fallChainRun=false;pinchChainRun=false;
  clearMotionChain();
  if(!motionBound){
    el("motionPlay").addEventListener("click",function(){motionMode=(motionMode==="paused")?"idle":(motionMode==="idle"?"paused":"idle");this.textContent=(motionMode==="paused")?"▶ "+t("c.motion.play").replace(/[▶\s]/g,''):t("c.motion.play");if(motionMode!=="paused"&&!motionRAF)loopMotion();});
    el("motionFall").addEventListener("click",triggerFall);
    var pb=el("motionPinch");if(pb)pb.addEventListener("click",triggerPinch);
    motionBound=true;
  }
  el("motionPlay").textContent=t("c.motion.play");
  renderReba(false); setStatus("ok"); loopMotion();
  if(pendingScn){var sc=pendingScn;pendingScn=null;addT(function(){sc==="pinch"?triggerPinch():triggerFall();},250);}
}
function drawMachineZone(ctx){
  ctx.fillStyle="#33476e";ctx.fillRect(286,118,52,94);
  ctx.fillStyle="#46618f";ctx.fillRect(286,118,52,12);
  ctx.fillStyle="#2a3a59";ctx.fillRect(300,150,26,18);
  var on=(motionMode==="pinched");
  ctx.strokeStyle=on?"#ff5a4d":"#ffb24d";ctx.lineWidth=2;ctx.setLineDash([5,4]);
  ctx.strokeRect(286,132,48,44);ctx.setLineDash([]);
}
function runPinchChain(){
  var chain=dict().cPinchChain||[], desc=dict().cPinchDesc||[], host=el("motionChain"); if(!host)return;
  host.innerHTML='<div class="mc-title">'+esc(t("c.motion.pinchChainTitle"))+'</div>';
  chain.forEach(function(c,i){ addT(function(){
    var div=document.createElement('div');div.className='mc-step';
    div.innerHTML='<span class="mc-n">'+(i+1)+'</span><div class="mc-mid"><div class="mc-t">'+esc(c.t)+'</div><div class="mc-d">'+esc(desc[i]||'')+'</div></div><span class="mc-s">'+esc(c.s)+'</span>';
    host.appendChild(div);
    var steps=host.querySelectorAll('.mc-step'); if(steps[i-1])steps[i-1].classList.add('done');
    if(i===chain.length-1)addT(function(){div.classList.add('done');},800);
  }, 400+i*900); });
}
function runFallChain(){
  var chain=dict().cChain, desc=dict().cChainDesc||[], host=el("motionChain"); if(!host)return;
  host.innerHTML='<div class="mc-title">'+esc(t("c.motion.chainTitle"))+'</div>';
  chain.forEach(function(c,i){
    addT(function(){
      var div=document.createElement('div');div.className='mc-step';
      div.innerHTML='<span class="mc-n">'+(i+1)+'</span><div class="mc-mid"><div class="mc-t">'+esc(c.t)+'</div><div class="mc-d">'+esc(desc[i]||'')+'</div></div><span class="mc-s">'+esc(c.s)+'</span>';
      host.appendChild(div);
      var steps=host.querySelectorAll('.mc-step'); if(steps[i-1])steps[i-1].classList.add('done');
      if(i===chain.length-1)addT(function(){div.classList.add('done');},800);
    }, 400+i*950);
  });
}
function setStatus(kind){
  var s=el("motionStatus");if(!s)return;
  if(kind==="fall"){s.className="motion-status fall";s.style.background="";s.style.color="";s.textContent=t("c.motion.sFall");}
  else if(kind==="pinch"){s.className="motion-status fall";s.style.background="";s.style.color="";s.textContent=t("c.motion.sPinch");}
  else if(kind==="analyze"){s.className="motion-status";s.style.background="var(--watch-soft)";s.style.color="var(--yellow-d)";s.textContent=t("c.motion.sAnalyze");}
  else{s.className="motion-status";s.style.background="";s.style.color="";s.textContent=t("c.motion.sOk");}
}
function renderReba(high){
  var seg=dict().cRebaSeg, base=high?[3,4,3,3,3,2]:[1,2,1,1,1,1];
  el("motionReba").innerHTML=seg.map(function(n,i){return '<div class="reba"><div class="rs">'+base[i]+'</div><div class="rl">'+esc(n)+'</div></div>';}).join('');
}
function loopMotion(){
  var cv=el("poseCanvas");if(!cv){return;}var ctx=cv.getContext("2d");
  function frame(){
    motionT+=0.05;
    ctx.clearRect(0,0,cv.width,cv.height);
    // floor line
    ctx.strokeStyle="#23304f";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(20,300);ctx.lineTo(340,300);ctx.stroke();
    var pinch=(motionMode==="pinching"||motionMode==="pinched");
    if(pinch)drawMachineZone(ctx);
    var pts=STAND.map(function(p){return [p[0],p[1]];});
    if(motionMode==="falling"){fallP=Math.min(1,fallP+0.018);}
    var ease=motionMode==="falling"||motionMode==="fallen"?fallP:0;
    if(ease>=1&&motionMode==="falling"){motionMode="fallen";setStatus("fall");renderReba(true);if(!fallChainRun){fallChainRun=true;runFallChain();}}
    if(motionMode==="idle"){var sway=Math.sin(motionT)*3;pts=pts.map(function(p,i){return [p[0]+(i<8?sway*0.4:0), p[1]+Math.sin(motionT+i)*0.8];});}
    if(ease>0){var ang=ease*1.5;pts=pts.map(function(p){var r=rot(p,180,182,ang);return [r[0], r[1]+ease*70];});}
    if(pinch){pinchP=Math.min(1,pinchP+0.014);pts[5]=lerp(STAND[5],[262,150],pinchP);pts[7]=lerp(STAND[7],[300,150],pinchP);
      if(pinchP>=0.96&&motionMode==="pinching"){motionMode="pinched";setStatus("pinch");renderReba(true);if(!pinchChainRun){pinchChainRun=true;runPinchChain();}}}
    var alarm=(motionMode==="fallen"||motionMode==="pinched");
    // bbox
    var xs=pts.map(function(p){return p[0];}),ys=pts.map(function(p){return p[1];});
    var bx=Math.min.apply(null,xs)-12,by=Math.min.apply(null,ys)-12,bw=Math.max.apply(null,xs)-bx+12,bh=Math.max.apply(null,ys)-by+12;
    ctx.strokeStyle=alarm?"#ff5a4d":"#62ff9a";ctx.lineWidth=1.5;ctx.setLineDash([6,4]);ctx.strokeRect(bx,by,bw,bh);ctx.setLineDash([]);
    // bones
    var col=alarm?"#ff7a70":"#62ff9a";
    ctx.strokeStyle=col;ctx.lineWidth=3;ctx.lineCap="round";
    BONES.forEach(function(b){ctx.beginPath();ctx.moveTo(pts[b[0]][0],pts[b[0]][1]);ctx.lineTo(pts[b[1]][0],pts[b[1]][1]);ctx.stroke();});
    // joints
    ctx.fillStyle="#eafff2";pts.forEach(function(p){ctx.beginPath();ctx.arc(p[0],p[1],3.2,0,7);ctx.fill();});
    if(motionMode!=="paused")motionRAF=requestAnimationFrame(frame);else motionRAF=null;
  }
  stopMotion();motionRAF=requestAnimationFrame(frame);
}

/* ====================== DEVICES ====================== */
function initDevices(){
  var d=dict();
  el("devKpi").innerHTML=d.cDevKpi.map(function(k){return '<div class="kpi"><div class="kpi-v">'+esc(k.v)+'</div><div class="kpi-k">'+esc(k.k)+'</div><div class="kpi-d">100%</div></div>';}).join('');
  var head='<div class="dev-row head"><span>'+t("c.signup.industry").slice(0,0)+t("c.nav.devices").split(' ')[0]+'</span><span>Model</span><span class="dev-zone">'+t("c.cc.zoneWord")+'</span><span>Batt</span><span>Status</span></div>';
  el("devTable").innerHTML=head+d.cDevices.map(function(dv){
    var batt=dv.b, low=/^\d+%$/.test(batt)&&parseInt(batt)<45;
    return '<div class="dev-row"><span class="dev-type">'+esc(dv.ty)+'</span><span>'+esc(dv.m)+'</span><span class="dev-zone">'+esc(dv.z)+'</span><span class="dev-batt" style="color:'+(low?"#e0483d":"#46506a")+'">'+esc(batt)+'</span><span class="dev-on">on</span></div>';
  }).join('');
  el("devOnline").textContent=d.cDevices.length+" / "+d.cDevices.length+" online";
}

/* ====================== SIGNUP ====================== */
function initSignup(){
  var d=dict();
  el("suIndustry").innerHTML=d.cIndustries.map(function(x){return '<option>'+esc(x)+'</option>';}).join('');
  el("suSize").innerHTML=d.cSizes.map(function(x){return '<option>'+esc(x)+'</option>';}).join('');
  var form=el("signupForm"),done=el("signupDone");
  form.hidden=false;done.hidden=true;
  if(!form._bound){
    form.addEventListener("submit",function(e){
      e.preventDefault();var ok=true;
      ["company","contact","email"].forEach(function(nm){var f=form.elements[nm];if(!f.value.trim()||(nm==="email"&&!/.+@.+\..+/.test(f.value))){f.classList.add("err");ok=false;}else f.classList.remove("err");});
      if(!ok)return;
      var company=form.elements["company"].value.trim();
      done.innerHTML='<div class="sd-ic">✅</div><h3>'+esc(t("c.signup.doneTitle"))+'</h3><p>'+esc(t("c.signup.doneMsg"))+'</p><p style="font-weight:800;color:var(--navy)">'+esc(company)+'</p><button class="twin-btn" id="suAgain">'+esc(t("c.signup.another"))+'</button>';
      form.hidden=true;done.hidden=false;
      el("suAgain").addEventListener("click",function(){form.reset();form.hidden=false;done.hidden=true;});
    });
    form._bound=true;
  }
}

/* ====================== CHROME ====================== */
function setLang(l){if(SUPPORTED.indexOf(l)<0)return;lang=l;try{localStorage.setItem("hmsync_lang",l);}catch(e){}applyStatic();show(current);}
function initChrome(){
  var burger=el("csBurger"),side=el("csSide");
  if(burger)burger.addEventListener("click",function(){side.classList.toggle("open");});
  document.querySelectorAll(".lang-btn").forEach(function(b){b.addEventListener("click",function(){setLang(this.getAttribute("data-lang"));});});
  document.querySelectorAll("#csNav a").forEach(function(a){a.addEventListener("click",function(){var side=el("csSide");if(side)side.classList.remove("open");});});
  document.querySelectorAll('.cs-subnav a[data-scn]').forEach(function(a){a.addEventListener("click",function(){
    var scn=this.getAttribute("data-scn");
    document.querySelectorAll('.cs-subnav a').forEach(function(x){x.classList.remove("scn-active");});
    this.classList.add("scn-active");
    if(current==="motion"){scn==="pinch"?triggerPinch():triggerFall();}else pendingScn=scn;
  });});
  window.addEventListener("hashchange",route);
  // clock
  setInterval(function(){var c=el("csClock");if(c)c.textContent=timeStr(now());},1000);
}

function init(){applyStatic();initChrome();route();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
