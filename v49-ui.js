/* AulaFinder V49: interazioni di presentazione. Non modifica orari o geometrie SVG originali. */
(()=>{
 'use strict';
 const reduce=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
 const isMobile=()=>matchMedia('(max-width:680px)').matches;
 const prefers=()=>reduce()?'instant':'smooth';

 // V50 gestisce marchi e finestra logo in modo unificato su tutti i dispositivi.
 // Le piantine esistenti vengono CLONATE: stessi SVG, stessa geometria e stessi testi.
 const cards=[...document.querySelectorAll('#piantinaPage .plan-card')];
 const viewer=document.createElement('div');viewer.id='af49MapViewer';viewer.className='af49-map-viewer';viewer.hidden=true;
 viewer.setAttribute('role','dialog');viewer.setAttribute('aria-modal','true');viewer.setAttribute('aria-label','Piantina a schermo intero');
 viewer.innerHTML=`<div class="af49-map-viewer-bar"><div class="af54-map-header"><strong id="af49ViewerTitle">Piantina</strong><div id="af54MapSelection" class="af54-map-selection" hidden role="group" aria-label="Azioni per l’aula selezionata"><span id="af54MapRoomName" aria-live="polite"></span><button type="button" id="af54MapNavigate">Portami qui</button><button type="button" id="af54MapSchedule">Vedi orario</button></div></div><div class="af49-viewer-buttons"><button type="button" id="af49ZoomOut" aria-label="Riduci ingrandimento">−</button><span id="af49ZoomLabel" aria-live="polite">100%</span><button type="button" id="af49ZoomIn" aria-label="Ingrandisci mappa">+</button><button type="button" id="af49ViewerClose" aria-label="Chiudi la piantina a schermo intero">✕</button></div></div><div class="af49-map-viewer-scene" tabindex="0" aria-label="Piantina: trascina per spostarti, usa due dita per ingrandire o ridurre"><div class="af49-map-viewer-stage" id="af49ViewerStage"></div></div><div class="af49-map-viewer-note" id="af49ViewerNote" aria-live="polite">Tocca un'aula per selezionarla. Due dita per ingrandire.</div>`;
 document.body.append(viewer);
 const stage=viewer.querySelector('#af49ViewerStage');
 const scene=viewer.querySelector('.af49-map-viewer-scene');
 let opener=null,zoom=1,fitWidth=900,fitHeight=600,selectedRoom='';
 const selection=viewer.querySelector('#af54MapSelection');
 const roomName=viewer.querySelector('#af54MapRoomName');
 const navigate=viewer.querySelector('#af54MapNavigate');
 const schedule=viewer.querySelector('#af54MapSchedule');
 function clearSelection(){selectedRoom='';selection.hidden=true;stage.querySelectorAll('.af49-room-highlight').forEach(el=>el.classList.remove('af49-room-highlight'));stage.querySelectorAll('.af58-viewer-selection').forEach(el=>el.remove());}
 function selectRoom(g){
  const name=(g.dataset.t||'').split('·')[0].trim();
  const actions=window.AFPiantina?.getRoomActions?.(name);
  clearSelection();
  if(!actions?.navigable){viewer.querySelector('#af49ViewerNote').textContent=name||'Ambiente selezionato';return;}
  selectedRoom=actions.room;
  roomName.textContent=selectedRoom;
  selection.hidden=false;schedule.hidden=!actions.hasSchedule;
  // La classe della stanza originale resta invariata: la selezione si vede nel clone come nella mappa principale.
  // Stessa selezione SVG della mappa normale, comprese dimensioni e colorazione.
  const cx=Number(g.dataset.cx),cy=Number(g.dataset.cy),scale=Number(g.dataset.s)||1;
  if(Number.isFinite(cx)&&Number.isFinite(cy)){
    const clone=g.cloneNode(true);clone.classList.remove('room','af49-room-highlight');clone.classList.add('sel-clone','af58-viewer-selection');
    clone.removeAttribute('tabindex');clone.setAttribute('aria-hidden','true');
    clone.setAttribute('transform',`translate(${cx} ${cy}) scale(${scale}) rotate(180) translate(${-cx} ${-cy})`);
    (stage.querySelector('svg.plan .top')||stage.querySelector('svg.plan')).append(clone);
  }
  viewer.querySelector('#af49ViewerNote').textContent='Aula '+selectedRoom+' selezionata';
 }
 function executeSelection(kind){
  const room=selectedRoom;if(!room)return;
  closeViewer();window.AFPiantina?.runRoomAction?.(room,kind);
 }
 navigate.addEventListener('click',()=>executeSelection('navigate'));
 schedule.addEventListener('click',()=>executeSelection('schedule'));

 function setZoom(value){
  zoom=Math.min(3.2,Math.max(.65,value));
  stage.style.width=Math.round(fitWidth*zoom)+'px';stage.style.height=Math.round(fitHeight*zoom)+'px';
  const svg=stage.querySelector('svg.plan');if(svg){svg.style.width='100%';svg.style.height='100%';}
  stage.style.transform='none';
  viewer.querySelector('#af49ZoomLabel').textContent=Math.round(zoom*100)+'%';
 }
 function showFloor(card){
  const svg=card.querySelector('svg.plan');if(!svg)return;
  opener=document.activeElement;
  const selectedOriginal=card.querySelector('.sel-clone,[data-af-map-selected]');
  const selectedCode=selectedOriginal?.dataset?.t?.split('·')[0]?.trim()||'';
  stage.replaceChildren();selection.hidden=true;selectedRoom='';
  const copy=svg.cloneNode(true);copy.classList.add('af49-viewer-plan');copy.removeAttribute('id');
  copy.querySelectorAll('.sel-clone').forEach(el=>el.remove());
  copy.querySelectorAll('g.room').forEach(g=>{g.setAttribute('tabindex','0');g.setAttribute('role','button');g.setAttribute('aria-label','Seleziona aula '+(g.dataset.t||''));});
  stage.append(copy);
  if(selectedCode){const found=[...copy.querySelectorAll('g.room')].find(g=>(g.dataset.t||'').split('·')[0].trim()===selectedCode);if(found)selectRoom(found);}
  viewer.querySelector('#af49ViewerTitle').textContent=card.querySelector('.plan-banner h2')?.textContent||'Piantina';
  viewer.dataset.theme=document.documentElement.dataset.theme||'light';
  viewer.hidden=false;document.body.classList.add('af49-map-fullscreen-open');
  const vb=copy.viewBox.baseVal;const sceneWidth=scene.clientWidth||innerWidth,sceneHeight=scene.clientHeight||innerHeight-100;
  const ratio=vb.width&&vb.height?vb.width/vb.height:1.5;fitWidth=Math.min(sceneWidth,sceneHeight*ratio);fitHeight=fitWidth/ratio;
  setZoom(1);
  // Scroll to the central area only after layout, leaving the whole original SVG intact.
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   scene.scrollLeft=Math.max(0,(scene.scrollWidth-scene.clientWidth)/2);
   scene.scrollTop=Math.max(0,(scene.scrollHeight-scene.clientHeight)/2);
  }));
  viewer.querySelector('#af49ViewerClose').focus({preventScroll:true});
  if(!selectedRoom)viewer.querySelector('#af49ViewerNote').textContent="Seleziona un'aula. Trascina per esplorare e usa due dita per ingrandire.";
  // Fullscreen API opzionale: l'overlay funziona anche su Safari senza supporto alla API.
  if(viewer.requestFullscreen){
   try {
    const p=viewer.requestFullscreen();
    p?.then?.(()=>{
     try {screen.orientation?.lock?.('landscape')?.catch?.(()=>{});}catch(_){}
    })?.catch?.(()=>{});
   }catch(_){}
  }
 }
 function closeViewer(){
  if(viewer.hidden)return;
  clearSelection();viewer.hidden=true;stage.replaceChildren();document.body.classList.remove('af49-map-fullscreen-open');
  if(document.fullscreenElement===viewer)document.exitFullscreen?.().catch?.(()=>{});
  opener?.focus?.({preventScroll:true});
 }
 cards.forEach(card=>{
  const banner=card.querySelector('.plan-banner');if(!banner)return;
  const button=document.createElement('button');button.type='button';button.className='af49-plan-expand';
  button.setAttribute('aria-label','Apri '+(banner.querySelector('h2')?.textContent||'piantina')+' a schermo intero orizzontale');
  button.title='Visualizza a schermo intero';
  button.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></svg><span class="sr-only">Schermo intero</span>';
  banner.append(button);
  button.addEventListener('click',()=>showFloor(card));
 });
 function zoomAt(value,px=.5,py=.5){
  const before=zoom;const left=scene.scrollLeft,top=scene.scrollTop;
  setZoom(value);
  const ratio=zoom/before;
  scene.scrollLeft=(left+scene.clientWidth*px)*ratio-scene.clientWidth*px;
  scene.scrollTop=(top+scene.clientHeight*py)*ratio-scene.clientHeight*py;
 }
 // Un singolo dito trascina; due dita effettuano pinch-to-zoom senza alterare lo zoom del browser.
 // Calcolo ancorato al punto centrale delle dita per mantenere stabile il punto osservato.
 const activePointers=new Map();
 let pan=null,pinch=null,lastGestureTime=-Infinity;
 const pairInfo=()=>{
  const a=[...activePointers.values()];if(a.length<2)return null;
  return {distance:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2};
 };
 scene.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'&&e.button!==0)return;
  activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  try{scene.setPointerCapture(e.pointerId);}catch(_){}
  if(activePointers.size===1){pan={id:e.pointerId,x:e.clientX,y:e.clientY,left:scene.scrollLeft,top:scene.scrollTop,moved:false};pinch=null;}
  else if(activePointers.size===2){const info=pairInfo();pinch={...info,zoom};pan=null;lastGestureTime=performance.now();}
 });
 scene.addEventListener('pointermove',e=>{
  if(!activePointers.has(e.pointerId))return;
  activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(activePointers.size>=2&&pinch){
   const info=pairInfo(),rect=scene.getBoundingClientRect();
   if(info.distance>0&&pinch.distance>0){
    zoomAt(pinch.zoom*info.distance/pinch.distance,(info.x-rect.left)/rect.width,(info.y-rect.top)/rect.height);
    pinch={...info,zoom};
    lastGestureTime=performance.now();
   }
   e.preventDefault();return;
  }
  if(pan&&pan.id===e.pointerId){
   const dx=e.clientX-pan.x,dy=e.clientY-pan.y;
   if(Math.hypot(dx,dy)>7)pan.moved=true;
   if(pan.moved){scene.scrollLeft=pan.left-dx;scene.scrollTop=pan.top-dy;lastGestureTime=performance.now();e.preventDefault();}
  }
 });
 function pointerFinish(e){
  const wasPinching=activePointers.size>=2;
  activePointers.delete(e.pointerId);
  if(wasPinching||pan?.moved)lastGestureTime=performance.now();
  pinch=null;
  if(activePointers.size===1){const [id,pt]=activePointers.entries().next().value;pan={id,x:pt.x,y:pt.y,left:scene.scrollLeft,top:scene.scrollTop,moved:false};}
  else pan=null;
 }
 scene.addEventListener('pointerup',pointerFinish);
 scene.addEventListener('pointercancel',pointerFinish);
 scene.addEventListener('lostpointercapture',e=>{if(activePointers.has(e.pointerId))pointerFinish(e);});
 scene.addEventListener('wheel',e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();const r=scene.getBoundingClientRect();zoomAt(zoom+(e.deltaY<0?.15:-.15),(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);},{passive:false});
 viewer.querySelector('#af49ViewerClose').addEventListener('click',closeViewer);
 viewer.querySelector('#af49ZoomIn').addEventListener('click',()=>zoomAt(zoom+.25));
 viewer.querySelector('#af49ZoomOut').addEventListener('click',()=>zoomAt(zoom-.25));
 viewer.addEventListener('keydown',e=>{
  if(e.key==='Escape'){e.preventDefault();closeViewer();}
  if(e.key==='Tab'){
   const buttons=[...viewer.querySelectorAll('button:not([disabled])')];
   const first=buttons[0],last=buttons.at(-1);
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
 });
 scene.addEventListener('click',e=>{
  if(performance.now()-lastGestureTime<280){e.preventDefault();return;}
  const g=e.target.closest('g.room');if(g)selectRoom(g);
 });
 scene.addEventListener('keydown',e=>{
  if(!['Enter',' '].includes(e.key))return;
  const g=e.target.closest('g.room');if(!g)return;
  e.preventDefault();selectRoom(g);
 });
 document.addEventListener('fullscreenchange',()=>{
  if(!document.fullscreenElement&&!viewer.hidden){
   // Se il sistema esce dal fullscreen, resta il visualizzatore accessibile.
   viewer.classList.add('af49-viewer-fallback');
  }
 });

 // Feedback visivo su touch senza eliminare il focus visibile per chi usa tastiera.
 document.addEventListener('pointerdown',e=>{
  const target=e.target.closest('button,.floor-option,summary');
  if(!target||target.matches('.team-member')||target.closest('#af49MapViewer')&&target.disabled)return;
  target.classList.remove('af49-tap-glow');void target.offsetWidth;target.classList.add('af49-tap-glow');
  setTimeout(()=>target.classList.remove('af49-tap-glow'),480);
 },{passive:true});
})();
