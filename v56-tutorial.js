/* AulaFinder V56 — Guida ad alto contrasto, navigazione sottopassaggi e footer con ritorno morbido.
   L'iframe usa il viewport reale, senza trasformazioni o fattori di scala arbitrari. */
(()=>{
 'use strict';
 const params=new URLSearchParams(location.search);
 const nested=params.has('af52guide')||window.frameElement?.id==='af51LiveFrame';
 const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 const HINT='aulafinder-v56-tour-state';
 const CL='af55-guide-target';
 const STEPS=[
  [{selector:'#searchInput',text:'Scrivi il nome di una classe, un’aula o un professore.'},
   {selector:'#searchForm .search-submit',text:'Premi Cerca per visualizzare i risultati.'}],
  [{selector:'#orariPage .orari-category-tabs [data-schedule="classes"]',text:'Apri la scheda Classi.'},
   {selector:'#scheduleQuickSearch',text:'Cerca una classe e selezionala dai suggerimenti.'}],
  [{selector:'#orariPage .orari-category-tabs [data-schedule="freeRooms"]',text:'Apri Aule libere.'},
   {selector:'#orariPage .orari-category-tabs [data-schedule="freeTeachers"]',text:'Apri Professori liberi per vedere chi non ha lezioni previste.'}],
  [{selector:'#navFrom',text:'Inserisci l’aula di partenza.'},
   {selector:'#navTo',text:'Indica l’aula di destinazione.'},
   {selector:'#navigatorForm .navigator-go',text:'Visualizza il percorso.'}],
  [{selector:'#finderLaunch',text:'Tocca l’orb di Finder per aprire l’assistente.'},
   {selector:'#finderQuestion',text:'Scrivi una domanda a Finder.'},
   {selector:'#finderForm .finder-send',text:'Invia la domanda per leggere la risposta.'}],
  [{selector:'#piantinaPage .floor-options input[value="terra"]',text:'Scegli il piano da esplorare.'},
   {selector:'#piantinaPage .plan-card:not([hidden]) svg g.room',text:'Seleziona un’aula sulla piantina.'}],
  [{selector:'#siteFooter .team-list .team-member',text:'Esplora gli autori e i contatti nel footer.'}]
 ];
 const targetFor=(step,phase)=>{
  for(let j=Math.min(phase,STEPS[step].length-1);j>=0;j--){
   const el=document.querySelector(STEPS[step][j].selector);
   if(el && !el.closest('[hidden]'))return el;
  }
  return document.querySelector(STEPS[step][0].selector);
 };
 if(nested){
  document.documentElement.classList.add('af55-inside-tour');
  let step=0,phase=0,active=null,footerTimer=0,footerAnimation=0,internalScroll=false,completed=false;
  const postHint=(message)=>{try{window.parent.postMessage({type:HINT,step,phase,total:STEPS[step].length,message,completed},location.origin==='null'?'*':location.origin);}catch(_){}};
  // Quattro veli lasciano scoperto il comando attivo. Sono solo visivi:
  // non intercettano click, tap, tabulazione o scorrimento.
  const veil=Array.from({length:4},()=>{
   const el=document.createElement('div');el.className='af56-tour-veil';
   el.setAttribute('aria-hidden','true');document.body.appendChild(el);return el;
  });
  const ring=document.createElement('div');ring.className='af56-tour-ring';
  ring.setAttribute('aria-hidden','true');document.body.appendChild(ring);
  let paintRequested=false;
  function paint(){
   paintRequested=false;
   if(!active||!active.isConnected || active.closest('[hidden]')){veil.forEach(el=>el.style.visibility='hidden');ring.style.visibility='hidden';return;}
   const r=active.getBoundingClientRect(),w=innerWidth,h=innerHeight;
   if(r.bottom<0||r.top>h||r.right<0||r.left>w||!r.width||!r.height){veil.forEach(el=>el.style.visibility='hidden');ring.style.visibility='hidden';return;}
   const p=6,l=Math.max(0,r.left-p),t=Math.max(0,r.top-p),right=Math.min(w,r.right+p),bottom=Math.min(h,r.bottom+p);
   const areas=[[0,0,w,t],[0,bottom,w,Math.max(0,h-bottom)],[0,t,l,Math.max(0,bottom-t)],[right,t,Math.max(0,w-right),Math.max(0,bottom-t)]];
   areas.forEach((a,i)=>{const el=veil[i];el.style.cssText=`left:${a[0]}px;top:${a[1]}px;width:${a[2]}px;height:${a[3]}px;visibility:visible;`;});
   ring.style.cssText=`left:${l}px;top:${t}px;width:${Math.max(0,right-l)}px;height:${Math.max(0,bottom-t)}px;visibility:visible;`;
  }
  function schedulePaint(){if(!paintRequested){paintRequested=true;requestAnimationFrame(paint);}}
  window.addEventListener('scroll',schedulePaint,{passive:true});
  window.addEventListener('resize',schedulePaint,{passive:true});
  document.addEventListener('transitionend',schedulePaint,true);

  function clean(){
   if(active){active.classList.remove(CL);active.removeAttribute('data-af55-hint');active=null;}
   schedulePaint();
  }
  function scrollToTarget(el,behaviour='auto'){
   if(!el)return;
   // Non si modifica il layout del sito: si scorre soltanto la vista interna dell'iframe.
   const rect=el.getBoundingClientRect();
   if(el.id==='finderLaunch' || el.closest('#finderPanel'))return;
   const y=Math.max(0,window.scrollY+rect.top-36);
   window.scrollTo({top:y,behavior:behaviour});
  }
  function mark(ensureVisible=true){
   clean();
   const el=targetFor(step,phase);
   if(!el)return;
   active=el;el.classList.add(CL);
   const hint=STEPS[step][Math.min(phase,STEPS[step].length-1)].text;
   el.dataset.af55Hint=hint;
   if(ensureVisible&&step!==6)scrollToTarget(el);
   schedulePaint();setTimeout(schedulePaint,70);
   postHint(hint);
  }
  function advance(){
   if(phase<STEPS[step].length-1){phase++;completed=false;window.setTimeout(()=>mark(true),40);}
   else{completed=true;clean();postHint('Ben fatto! Puoi passare alla tappa successiva oppure tornare ai sottopassaggi.');}
  }
  function setPhase(n){
   const target=Math.max(0,Math.min(STEPS[step].length-1,Number(n)||0));
   phase=target;completed=false;
   // Il tasto Avanti permette di recuperare una fase anche se saltata.
   if(step===4){
    const panel=document.getElementById('finderPanel');
    if(target>0&&panel?.hidden)document.getElementById('finderLaunch')?.click();
    else if(target===0&&panel&&!panel.hidden)document.getElementById('finderClose')?.click();
   }
   window.setTimeout(()=>mark(true),85);
  }
  function footerBottom(){
   const doc=document.scrollingElement||document.documentElement;
   return Math.max(0,doc.scrollHeight-innerHeight);
  }
  function footerReturn(){
   if(step!==6)return;
   cancelAnimationFrame(footerAnimation);
   const start=window.scrollY,dest=footerBottom();
   if(Math.abs(dest-start)<2)return;
   if(reduce()){window.scrollTo(0,dest);return;}
   const begin=performance.now(),duration=1150;
   internalScroll=true;
   const tick=now=>{
    if(step!==6){internalScroll=false;return;}
    const t=Math.min(1,(now-begin)/duration);
    const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    window.scrollTo(0,start+(dest-start)*eased);
    if(t<1)footerAnimation=requestAnimationFrame(tick);
    else internalScroll=false;
   };
   footerAnimation=requestAnimationFrame(tick);
  }
  function scheduleFooterReturn(){
   if(step!==6)return;
   window.clearTimeout(footerTimer);
   footerTimer=window.setTimeout(footerReturn,1100);
  }
  function applyStep(n){
   step=Math.max(0,Math.min(6,Number(n)||0));phase=0;completed=false;
   window.clearTimeout(footerTimer);cancelAnimationFrame(footerAnimation);internalScroll=false;
   // La UI del sito è già stata aggiornata dal controller V52.
   const update=()=>{
    if(step===4){ // Mostra Finder chiuso: l'utente deve toccare l'orb evidenziato.
     const panel=document.getElementById('finderPanel');
     if(panel&&!panel.hidden)document.getElementById('finderClose')?.click();
    }
    if(step===6){
     window.scrollTo(0,footerBottom());
     mark(false);
    } else mark(true);
   };
   requestAnimationFrame(()=>requestAnimationFrame(update));
   window.setTimeout(update,150);
  }
  // Avanza solo dopo un'interazione autentica con il controllo richiesto.
  document.addEventListener('click',event=>{
   if(!event.isTrusted||!active||step===6)return;
   const clicked=event.target.closest('button, input, select, a, svg g.room');
   if(!clicked)return;
   if(!(active===clicked||active.contains(clicked)||clicked.contains(active)))return;
   const current=STEPS[step][phase];
   if(current.selector==='#finderLaunch'){
    window.setTimeout(()=>{
     if(!document.getElementById('finderPanel')?.hidden)advance();
    },90);
   }else if(['#searchInput','#finderQuestion','#navFrom','#navTo','#scheduleQuickSearch'].includes(current.selector)){
    // Il semplice clic dentro una barra non basta per completare il passaggio.
   }else advance();
  },true);
  document.addEventListener('input',event=>{
   if(!event.isTrusted||!active||event.target!==active)return;
   const current=STEPS[step][phase];
   if(['#searchInput','#finderQuestion','#navFrom','#navTo','#scheduleQuickSearch'].includes(current.selector) && String(event.target.value||'').trim().length>=2)advance();
  },true);
  document.addEventListener('change',event=>{
   if(!event.isTrusted||!active||event.target!==active)return;
   if(active.matches('select, input[type="checkbox"]'))advance();
  },true);
  window.addEventListener('message',event=>{
   if(event.origin!==location.origin||event.source!==window.parent)return;
   if(event.data?.type==='aulafinder-v52-guide-step')applyStep(event.data.step);
   if(event.data?.type==='aulafinder-v56-set-phase')setPhase(event.data.phase);
  });
  ['wheel','touchstart','pointerdown','keydown'].forEach(type=>window.addEventListener(type,()=>{
   if(step!==6)return;
   cancelAnimationFrame(footerAnimation);internalScroll=false;
   scheduleFooterReturn();
  },{passive:true}));
  window.addEventListener('scroll',()=>{
   if(step===6&&!internalScroll)scheduleFooterReturn();
  },{passive:true});
  // Anche senza il messaggio iniziale, il frame non può avere il vecchio zoom.
  requestAnimationFrame(()=>applyStep(0));
  return;
 }
 const frame=document.getElementById('af51LiveFrame');
 const holder=frame?.closest('.af51-live-frame');
 const tutorial=document.getElementById('tutorialPage');
 if(!frame||!holder||!tutorial)return;
 holder.classList.add('af55-natural-crop');
 const toolbar=document.createElement('div');
 toolbar.className='af55-guide-toolbar af56-guide-toolbar';
 toolbar.setAttribute('aria-label','Istruzioni del sottopassaggio');
 toolbar.innerHTML=`<div class="af56-guide-copy"><strong class="af56-guide-label">ORA TOCCA A TE</strong>
  <span id="af55GuideHint" role="status" aria-live="polite">Usa il controllo evidenziato nella demo.</span></div>
  <nav class="af56-substep-nav" aria-label="Naviga i sottopassaggi della tappa">
   <button id="af56PhasePrev" type="button" aria-label="Sottopassaggio precedente" title="Sottopassaggio precedente">‹</button>
   <output id="af56PhaseCount" aria-live="off">1 / 2</output>
   <button id="af56PhaseNext" type="button" aria-label="Sottopassaggio successivo" title="Sottopassaggio successivo">›</button>
  </nav>`;
 holder.before(toolbar);
 const hint=toolbar.querySelector('#af55GuideHint');
 const prev=toolbar.querySelector('#af56PhasePrev');
 const next=toolbar.querySelector('#af56PhaseNext');
 const counter=toolbar.querySelector('#af56PhaseCount');
 const activeStep=()=>Number(tutorial.querySelector('[data-tutorial-select][aria-selected="true"]')?.dataset.tutorialSelect||0);
 const counts=[2,2,2,3,3,2,1];
 const intros=['Cerca una classe o un’aula.','Apri una categoria e cerca una classe.','Esplora aule e professori liberi senza scegliere giorno e ora.','Imposta il percorso.','Apri Finder e inviagli una domanda.','Esplora le piantine.','Osserva il footer: puoi scorrere, poi tornerà in basso.'];
 let shownStep=0,phase=0,finished=false;
 function render(){
  const total=counts[shownStep];counter.textContent=(phase+1)+' / '+total;
  prev.disabled=phase===0;next.disabled=phase>=total-1;
  if(shownStep===6){prev.disabled=true;next.disabled=true;}
 }
 function requestPhase(value){
  if(value<0||value>=counts[shownStep])return;
  phase=value;finished=false;render();
  frame.contentWindow?.postMessage({type:'aulafinder-v56-set-phase',phase:value},location.origin==='null'?'*':location.origin);
 }
 prev.addEventListener('click',()=>requestPhase(phase-1));
 next.addEventListener('click',()=>requestPhase(phase+1));
 function resetStep(){
  shownStep=activeStep();phase=0;finished=false;
  hint.textContent=intros[shownStep];render();
 }
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.type!==HINT)return;
  if(event.data.step!==activeStep())return;
  shownStep=event.data.step;
  phase=Math.min(Math.max(0,event.data.phase||0),counts[shownStep]-1);
  finished=!!event.data.completed;
  hint.textContent=event.data.message;render();
 });
 const tabObserver=new MutationObserver(resetStep);
 tutorial.querySelectorAll('[data-tutorial-select]').forEach(tab=>tabObserver.observe(tab,{attributes:true,attributeFilter:['aria-selected']}));
 resetStep();
})();
