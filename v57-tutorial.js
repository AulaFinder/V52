/* AulaFinder V57 · Unica guida interattiva, otto tappe, demo del sito reale. */
(()=>{
 'use strict';
 const nested=new URLSearchParams(location.search).has('af52guide')||window.frameElement?.id==='af51LiveFrame';
 const HINT='aulafinder-v57-guide-state';
 const STEPS=[
  [{selector:'#searchInput',text:'Cerca una classe (es. 4AS), un’aula (es. T.08) o la sigla di un docente (es. RO MA per Mario Rossi).'},
   {selector:'#searchForm .search-submit',text:'Premi Cerca: il tutorial ti mostrerà i risultati reali.'},
   {selector:'#searchResults button, #resultsPage button, #searchSuggestions button',text:'Apri un risultato. Puoi poi tornare alla Home nella demo.'}],
  [{selector:'#orariPage .orari-category-tabs [data-schedule="classes"]',text:'Seleziona Classi.'},
   {selector:'#scheduleQuickSearch',text:'Cerca una classe, per esempio 4AS.'},
   {selector:'#orariPage .orari-category-tabs [data-schedule="rooms"]',text:'Seleziona Aule.'},
   {selector:'#scheduleQuickSearch',text:'Cerca un’aula, per esempio 1.07.'},
   {selector:'#orariPage .orari-category-tabs [data-schedule="teachers"]',text:'Seleziona Professori. La sigla RO MA indica Rossi Mario: cognome, poi nome.'},
   {selector:'#scheduleQuickSearch',text:'Prova la sigla del docente (esempio RO MA) e seleziona un suggerimento.'}],
  [{selector:'#orariPage .orari-category-tabs [data-schedule="freeRooms"]',text:'Apri Aule libere: visualizzi le aule senza lezioni previste.'},
   {selector:'#orariPage .orari-category-tabs [data-schedule="freeTeachers"]',text:'Apri Professori liberi: non hanno lezioni previste nell’ora selezionata.'}],
  [{selector:'#navFrom',text:'Scrivi o seleziona l’aula di partenza.'},
   {selector:'#navTo',text:'Scrivi o seleziona l’aula di arrivo, anche Palestra.'},
   {selector:'#navigatorForm .navigator-go',text:'Mostra il percorso tra le aule lungo i corridoi.'}],
  [{selector:'#finderLaunch',text:'Trascina l’orb dove preferisci, poi toccalo per aprire Finder.'},
   {selector:'#finderQuestion',text:'Sposta la finestra se copre qualcosa, scegli una classe e scrivi la tua domanda.'},
   {selector:'#finderForm .finder-send',text:'Premi Invio: Finder risponde usando i dati scolastici disponibili.'}],
  [{selector:'#piantinaPage .floor-options input[value="terra"]',text:'Scegli un piano da esplorare.'},
   {selector:'#piantinaPage .plan-card:not([hidden]) svg g.room',text:'Tocca un’aula: trovi orario, navigazione e ingrandimento anche nel fullscreen.'}],
  [{selector:'#versioniSearch',text:'Cerca una versione (esempio V40) o una funzione come Finder.'},
   {selector:'#versioniList summary',text:'Apri una versione per leggere novità e visualizzare la sua Home.'}],
  [{selector:'#siteFooter .team-member',text:'Seleziona un ritratto per conoscere gli autori e le animazioni dei loro profili.'},
   {selector:'#themeToggle',text:'Usa il pulsante sole/luna per scegliere il tema chiaro o scuro; trovi Giorno e Ora accanto.'},
   {selector:'.site-header .brand-title',text:'Prova il titolo AulaFinder animato: l’orbita resta allineata al marchio.'},
   {selector:'#siteFooter .footer-brand',text:'Il logo si può ingrandire dalla testata. Preferiti e Cronologia sono strumenti del menu principale: nel tutorial sono soltanto spiegati per evitare modifiche ai tuoi dati.'}]
 ];
 const max=STEPS.length;
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(nested){
  document.documentElement.classList.add('af57-demo','af55-inside-tour','af58-tour-slice');
  let step=0,phase=0,active=null,paintPending=false,footerTimer,footerFrame,internalScroll=false;
  const veils=Array.from({length:4},()=>{const v=document.createElement('div');v.className='af56-tour-veil';v.setAttribute('aria-hidden','true');document.body.append(v);return v;});
  const ring=document.createElement('div');ring.className='af56-tour-ring';ring.setAttribute('aria-hidden','true');document.body.append(ring);
  function post(message,completed=false){try{parent.postMessage({type:HINT,step,phase,total:STEPS[step].length,message,completed},location.origin==='null'?'*':location.origin);}catch(_){}}
  function paint(){paintPending=false;
   if(!active?.isConnected||active?.closest('[hidden]')){veils.forEach(v=>v.style.visibility='hidden');ring.style.visibility='hidden';return;}
   const r=active.getBoundingClientRect(),w=innerWidth,h=innerHeight;
   if(!r.width||!r.height||r.bottom<0||r.top>h){veils.forEach(v=>v.style.visibility='hidden');ring.style.visibility='hidden';return;}
   const pad=4,l=Math.max(0,r.left-pad),t=Math.max(0,r.top-pad),right=Math.min(w,r.right+pad),bottom=Math.min(h,r.bottom+pad);
   [[0,0,w,t],[0,bottom,w,Math.max(0,h-bottom)],[0,t,l,Math.max(0,bottom-t)],[right,t,Math.max(0,w-right),Math.max(0,bottom-t)]].forEach((a,i)=>{const v=veils[i];v.style.cssText=`left:${a[0]}px;top:${a[1]}px;width:${a[2]}px;height:${a[3]}px;visibility:visible`});
   ring.style.cssText=`left:${l}px;top:${t}px;width:${Math.max(1,right-l)}px;height:${Math.max(1,bottom-t)}px;visibility:visible`;
  }
  function requestPaint(){if(!paintPending){paintPending=true;requestAnimationFrame(paint);}}
  addEventListener('scroll',requestPaint,{passive:true});addEventListener('resize',requestPaint,{passive:true});
  document.addEventListener('transitionend',requestPaint,true);
  function clear(){if(active){active.classList.remove('af55-guide-target');active.removeAttribute('data-af55-hint');}active=null;requestPaint();}
  function selectTarget(){const current=STEPS[step][phase];let el=document.querySelector(current.selector);
   if(el?.closest('[hidden]'))el=null;
   if(!el && step===0&&phase===2)el=document.querySelector('#searchResults,#resultsPage');
   return el;
  }
  function reveal(el){if(!el)return;
   if(el.id==='finderLaunch'||el.closest('#finderPanel'))return;
   const r=el.getBoundingClientRect();const top=scrollY+r.top-Math.min(95,innerHeight*.19);
   window.scrollTo({top:Math.max(0,top),behavior:'instant'});
  }
  function activate(){clear();
   const current=STEPS[step][phase];
   if(step===1){const category=['classes','classes','rooms','rooms','teachers','teachers'][phase];
    const chosen=document.querySelector('#orariPage .orari-category-tabs [aria-selected="true"]');
    if(chosen?.dataset.schedule!==category)document.querySelector(`#orariPage [data-schedule="${category}"]`)?.click();
   }
   active=selectTarget();if(active){active.classList.add('af55-guide-target');active.dataset.af55Hint=current.text;if(step!==7)reveal(active);}
   if(step===7){reveal(active);}
   requestPaint();setTimeout(requestPaint,100);post(current.text);
  }
  function advance(){if(phase<STEPS[step].length-1){phase++;setTimeout(activate,90);}else{post('Ben fatto! Puoi passare alla tappa successiva.',true);}}
  function changePhase(n){phase=Math.max(0,Math.min(STEPS[step].length-1,Number(n)||0));
   if(step===4){const finder=document.getElementById('finderPanel');if(phase>0&&finder?.hidden)document.getElementById('finderLaunch')?.click();}
   requestAnimationFrame(()=>setTimeout(activate,105));
  }
  function footerBottom(){return Math.max(0,document.documentElement.scrollHeight-innerHeight);}
  function scheduleFooterReturn(){if(step!==7)return;clearTimeout(footerTimer);footerTimer=setTimeout(()=>{
   if(step!==7||phase===1||phase===2||internalScroll)return;cancelAnimationFrame(footerFrame);
   const start=scrollY,dest=footerBottom();if(Math.abs(start-dest)<2)return;
   if(reduced()){window.scrollTo(0,dest);return;}
   const begin=performance.now();internalScroll=true;const tick=now=>{const t=Math.min(1,(now-begin)/1100),ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    window.scrollTo(0,start+(dest-start)*ease);if(t<1&&step===7)footerFrame=requestAnimationFrame(tick);else internalScroll=false;};footerFrame=requestAnimationFrame(tick);
  },1250);}
  addEventListener('scroll',()=>{if(!internalScroll)scheduleFooterReturn();},{passive:true});
  document.addEventListener('click',e=>{
   if(!e.isTrusted)return;
   // La guida è una demo: niente favoriti, cronologia, uscite da navigazione o Admin.
   const unsafe=e.target.closest('.favorite-toggle,[data-fav-open],[data-fav-remove],#clearHistoryButton,#clearFavoritesButton,.room-actions [data-map-action],#af54MapNavigate,#af54MapSchedule,[data-page="admin"]');
   if(unsafe){e.preventDefault();e.stopImmediatePropagation();return;}
   // Piantine: la stanza può essere selezionata, ma i link a Orari/Navigatore sono bloccati.
   if(step===5&&e.target.closest('[data-map-action],#af54MapNavigate,#af54MapSchedule')){e.preventDefault();e.stopImmediatePropagation();return;}
   const clicked=e.target.closest('button,input,select,summary,svg g.room');
   if(!clicked||!active||step===7)return;
   const match=clicked===active||active.contains(clicked)||clicked.contains(active);
   if(!match)return;
   if(['#searchInput','#scheduleQuickSearch','#navFrom','#navTo','#finderQuestion','#versioniSearch'].includes(STEPS[step][phase].selector))return;
   if(step===4&&phase===0)setTimeout(()=>{if(!document.getElementById('finderPanel')?.hidden)advance();},80);
   else if(step===0&&phase===1)setTimeout(()=>advance(),120);
   else advance();
  },true);
  document.addEventListener('input',e=>{
   if(!e.isTrusted||e.target!==active)return;
   const sel=STEPS[step][phase].selector;
   if(['#searchInput','#scheduleQuickSearch','#navFrom','#navTo','#finderQuestion','#versioniSearch'].includes(sel)&&String(e.target.value||'').trim().length>=2){
    // Non avanzare troppo presto durante la digitazione: il testo resta leggibile.
    if(step!==0||phase!==0)advance();
   }
  },true);
  document.addEventListener('submit',e=>{if(!e.isTrusted)return;if(step===0&&phase<=1&&e.target.id==='searchForm')setTimeout(()=>{phase=2;activate();},150);},true);
  document.addEventListener('change',e=>{if(e.isTrusted&&e.target===active&&e.target.matches('select,input[type="checkbox"]'))advance();},true);
  addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent)return;
   if(e.data?.type==='aulafinder-v57-guide-step'){
    step=Math.max(0,Math.min(max-1,Number(e.data.step)||0));phase=0;clearTimeout(footerTimer);cancelAnimationFrame(footerFrame);
    if(step===4&&!document.getElementById('finderPanel')?.hidden)document.getElementById('finderClose')?.click();
    setTimeout(activate,145);
   }
   if(e.data?.type==='aulafinder-v57-set-phase')changePhase(e.data.phase);
  });
  requestAnimationFrame(()=>activate());
  return;
 }
 const page=document.getElementById('tutorialPage'),frame=document.getElementById('af51LiveFrame');
 if(!page||!frame)return;
 const tabs=[...page.querySelectorAll('[data-tutorial-select]')],prev=document.getElementById('tutorialPrev'),next=document.getElementById('tutorialNext');
 const head=document.getElementById('af51LiveGuideTitle'),desc=document.getElementById('af52GuideDescription'),progress=document.getElementById('tutorialProgressBar'),fill=document.getElementById('tutorialProgressFill');
 const counter=document.getElementById('tutorialProgressCount'),no=document.getElementById('af52GuideStepNumber');
 const names=['Ricerca','Orari','Disponibilità','Navigatore','Finder','Piantine','Versioni','Altre funzioni'];
 const descriptions=[
  'Cerca una classe, un’aula o un docente tramite la sua sigla. Per esempio RO MA indica Rossi Mario (cognome, poi nome). Apri il risultato e prova a tornare alla Home.',
  'Scopri gli orari delle Classi, delle Aule e dei Professori. Per ogni categoria usa la ricerca senza perdere il contesto.',
  'Confronta Aule libere e Professori liberi senza cambiare per forza giorno o ora.',
  'Indica la partenza e la destinazione: il navigatore mostra il percorso schematico.',
  'Puoi trascinare Finder e la sua finestra, ridimensionarla e fissare l’orb nella posizione scelta.',
  'Scegli il piano, seleziona un’aula e prova l’ingrandimento. Non puoi uscire dalla guida andando ad altre sezioni.',
  'Cerca una versione, aprila ed esplora la sua anteprima storica.',
  'Scopri l’animazione del marchio e l’ingrandimento del logo. Usa l’interruttore chiaro/scuro e conosci gli autori. Nel sito completo, il menu raccoglie Preferiti e Cronologia delle ricerche; qui sono spiegati senza modificare i tuoi dati.'
 ];
 const guide=document.getElementById('af52LiveGuide'),holder=frame.closest('.af51-live-frame');
 holder?.classList.add('af55-natural-crop');
 const toolbar=document.createElement('div');toolbar.className='af55-guide-toolbar af56-guide-toolbar';toolbar.setAttribute('aria-label','Istruzioni del sottopassaggio');
 toolbar.innerHTML='<div class="af56-guide-copy"><strong class="af56-guide-label">ORA TOCCA A TE</strong><span id="af55GuideHint" role="status" aria-live="polite">Usa il controllo evidenziato nella demo.</span></div><nav class="af56-substep-nav" aria-label="Sottopassaggi"><button id="af56PhasePrev" type="button" aria-label="Indietro di un sottopassaggio">‹</button><output id="af56PhaseCount">1 / 3</output><button id="af56PhaseNext" type="button" aria-label="Avanti di un sottopassaggio">›</button></nav>';
 holder?.before(toolbar);
 const hint=toolbar.querySelector('#af55GuideHint'),pp=toolbar.querySelector('#af56PhasePrev'),pn=toolbar.querySelector('#af56PhaseNext'),pnCount=toolbar.querySelector('#af56PhaseCount');
 let step=0,phase=0;
 function paintParent(){tabs.forEach((b,i)=>{b.classList.toggle('is-active',i===step);b.setAttribute('aria-selected',String(i===step));b.tabIndex=i===step?0:-1;});
  head.textContent=names[step];desc.textContent=descriptions[step];no.textContent=String(step+1).padStart(2,'0')+' / 08';counter.textContent=(step+1)+' / 8';
  progress?.setAttribute('aria-valuenow',String(step+1));if(fill)fill.style.width=((step+1)/max*100)+'%';
  prev.disabled=step===0;next.textContent=step===max-1?'Ricomincia ↻':'Avanti →';
  pp.disabled=phase===0;pn.disabled=phase===STEPS[step].length-1;
  pnCount.textContent=(phase+1)+' / '+STEPS[step].length;
 }
 const send=()=>frame.contentWindow?.postMessage({type:'aulafinder-v57-guide-step',step},location.origin==='null'?'*':location.origin);
 function place(){
  if(page.hidden)return;
  const rect=guide?.getBoundingClientRect();if(!rect)return;
  // Il tutorial deve rimanere visibile dopo Avanti/Indietro anche su mobile.
  const y=Math.max(0,scrollY+rect.top-10);
  if(rect.top<0||rect.top>innerHeight*.55)window.scrollTo({top:y,behavior:reduced()?'instant':'smooth'});
 }
 function show(n){step=Math.max(0,Math.min(max-1,n));phase=0;paintParent();send();requestAnimationFrame(place);setTimeout(send,170);}
 tabs.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.tutorialSelect))));
 prev.addEventListener('click',()=>show(step-1));next.addEventListener('click',()=>show(step===max-1?0:step+1));
 function setPhase(n){phase=Math.max(0,Math.min(STEPS[step].length-1,n));paintParent();frame.contentWindow?.postMessage({type:'aulafinder-v57-set-phase',phase},location.origin==='null'?'*':location.origin);place();}
 pp.addEventListener('click',()=>setPhase(phase-1));pn.addEventListener('click',()=>setPhase(phase+1));
 addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==frame.contentWindow||e.data?.type!==HINT||e.data.step!==step)return;
  phase=Math.max(0,Math.min(STEPS[step].length-1,Number(e.data.phase)||0));hint.textContent=e.data.message;paintParent();});
 frame.addEventListener('load',send);
 new MutationObserver(()=>{if(!page.hidden){send();place();}}).observe(page,{attributes:true,attributeFilter:['hidden']});
 paintParent();
})();
