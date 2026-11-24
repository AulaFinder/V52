/* AulaFinder V55 — Tutorial a ritaglio naturale, evidenziazione interattiva e footer con ritorno morbido.
   L'iframe usa il viewport reale, senza trasformazioni o fattori di scala arbitrari. */
(()=>{
 'use strict';
 const params=new URLSearchParams(location.search);
 const nested=params.has('af52guide')||window.frameElement?.id==='af51LiveFrame';
 const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 const HINT='aulafinder-v55-tour-hint';
 const CL='af55-guide-target';
 const STEPS=[
  [{selector:'#searchInput',text:'Scrivi il nome di una classe, un’aula o un professore.'},
   {selector:'#searchForm .search-submit',text:'Premi Cerca per visualizzare i risultati.'}],
  [{selector:'#orariPage .orari-category-tabs [data-schedule="classes"]',text:'Scegli la categoria Classi.'},
   {selector:'#scheduleQuickSearch',text:'Cerca una classe e selezionala dai suggerimenti.'}],
  [{selector:'#orariPage .orari-category-tabs [data-schedule="freeRooms"]',text:'Apri Aule libere.'},
   {selector:'#daySelect',text:'Scegli il giorno.'},
   {selector:'#hourSelect',text:'Scegli l’ora per consultare la disponibilità.'}],
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
  let step=0,phase=0,active=null,footerTimer=0,footerAnimation=0,footerListening=false,internalScroll=false;
  const postHint=(message)=>{try{window.parent.postMessage({type:HINT,step,message},location.origin==='null'?'*':location.origin);}catch(_){}};
  function clean(){
   if(active){active.classList.remove(CL);active.removeAttribute('data-af55-hint');active=null;}
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
   postHint(hint);
  }
  function advance(){
   if(phase<STEPS[step].length-1){phase++;window.setTimeout(()=>mark(true),40);}
   else{clean();postHint('Ben fatto! Puoi esplorare la funzione oppure passare alla tappa successiva.');}
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
   step=Math.max(0,Math.min(6,Number(n)||0));phase=0;
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
   if(event.data?.type==='aulafinder-v55-refocus'){
    if(step===6)footerReturn();else mark(true);
   }
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
 // La cornice è davvero responsive: non impone più 1024 px da scalare al 35-60%.
 holder.classList.add('af55-natural-crop');
 const toolbar=document.createElement('div');
 toolbar.className='af55-guide-toolbar';
 toolbar.innerHTML='<span class="af55-guide-icon" aria-hidden="true">◎</span><span id="af55GuideHint" role="status" aria-live="polite">Usa il controllo evidenziato nella demo.</span><button id="af55GuideRefocus" type="button" aria-label="Riporta la demo sulla funzione di questo passaggio">Rimetti a fuoco</button>';
 holder.before(toolbar);
 const hint=toolbar.querySelector('#af55GuideHint');
 const hintBtn=toolbar.querySelector('#af55GuideRefocus');
 const activeStep=()=>Number(tutorial.querySelector('[data-tutorial-select][aria-selected="true"]')?.dataset.tutorialSelect||0);
 function requestFocus(){
  frame.contentWindow?.postMessage({type:'aulafinder-v55-refocus'},location.origin==='null'?'*':location.origin);
 }
 hintBtn.addEventListener('click',requestFocus);
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.type!==HINT)return;
  if(event.data.step!==activeStep())return;
  hint.textContent=event.data.message;
 });
 const tabObserver=new MutationObserver(()=>{
  hint.textContent=activeStep()===6?'Scorri liberamente: la demo torna con calma al footer.':'Segui il controllo evidenziato nella demo.';
 });
 tutorial.querySelectorAll('[data-tutorial-select]').forEach(tab=>tabObserver.observe(tab,{attributes:true,attributeFilter:['aria-selected']}));
})();
