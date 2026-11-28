/* AulaFinder V52 · enhancements only, no server or AI capabilities invented. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const nested=new URLSearchParams(location.search).has('af52guide')||window.frameElement?.id==='af51LiveFrame';
 const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;

 // One live guided site: expose only the current tutorial function in the embedded UI.
 if(nested){
  document.documentElement.classList.add('af52-in-demo');
  const pages=['home','orari','orari','navigator','home','piantina','versioni','home'];
  let activeStep=0;
  document.addEventListener('click',event=>{
   if(!event.isTrusted)return; // The guide itself may programmatically change sections.
   const el=event.target.closest('a[href], [data-page], [data-schedule], #menuButton, #sidebarClose, #finderLaunch, #finderClose, #logoButton, #themeToggle');
   if(!el)return;
   const allowedFinder=activeStep===4&&(el.matches('#finderLaunch, #finderClose'));
   const allowedSchedule=el.matches('[data-schedule]')&&el.closest('#orariPage')&&
     ((activeStep===1&&['classes','rooms','teachers'].includes(el.dataset.schedule))||
      (activeStep===2&&['freeRooms','freeTeachers'].includes(el.dataset.schedule)));
   if(allowedFinder||allowedSchedule||el.matches('#themeToggle,#logoButton,.brand-title') || activeStep===0&&el.matches('[data-page="home"]'))return;
   event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  },true);
  function selectStep(n){
   activeStep=Math.max(0,Math.min(7,Number(n)||0));
   document.documentElement.dataset.af52DemoStep=String(activeStep);
   const page=pages[activeStep];
   // Try native app navigation; without replacing the app with a fake iframe document.
   const nav=document.querySelector(`.side-link[data-page="${page}"]`);
   nav?.click();
   if(activeStep===1||activeStep===2){
    const category=activeStep===1?'classes':'freeRooms';
    document.querySelector(`#orariPage [data-schedule="${category}"]`)?.click();
   }
   if(activeStep!==4 && $('finderPanel') && !$('finderPanel').hidden){$('finderClose')?.click();}
   // V55: Finder parte chiuso; l'orb viene evidenziato e aperto dall'utente.
   if(activeStep===7){
    requestAnimationFrame(()=>document.querySelector('#siteFooter')?.scrollIntoView({block:'start',behavior:'instant'}));
   }else{
    requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}));
   }
  }
  window.addEventListener('message',event=>{
   if(event.origin!==location.origin||event.source!==window.parent)return;
   if(event.data?.type==='aulafinder-v52-guide-step'||event.data?.type==='aulafinder-v57-guide-step')selectStep(event.data.step);
  });
  // Even on refresh, embedded mode never starts on a privileged Admin screen.
  requestAnimationFrame(()=>selectStep(0));
  // La demo riceve lo stesso controllo Finder del sito, senza una versione separata.
 }

 // Finder: physically pin the freely placed orb at the exact position chosen by the visitor.
 const launch=$('finderLaunch'),panel=$('finderPanel'),controls=panel?.querySelector('.finder-window-controls');
 if(launch&&controls){
  const pin=document.createElement('button');
  pin.type='button';pin.id='af52FinderPin';pin.className='finder-window-btn af52-finder-pin';
  pin.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="m16 3 5 5-4 1-3 3-2 5-2-2-5 5-1-1 5-5-2-2 5-2 3-3z"/></svg>';
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  const keyV58=nested?'aulafinder.finder.pinned.v58.demo':'aulafinder.finder.pinned.v58';
  const docKeyV58=nested?'aulafinder.finder.anchor.v58.demo':'aulafinder.finder.anchor.v58';
  let pinned=false,anchor=null;
  try {pinned=localStorage.getItem(keyV58)==='true';anchor=JSON.parse(localStorage.getItem(docKeyV58)||'null');}catch(_){}
  function area(){return document.querySelector('#mainContent>.page:not([hidden])')||document.getElementById('mainContent');}
  // La porzione della sezione è estesa almeno all'area visibile: fissare
  // un orb in fondo allo schermo non può spostarlo improvvisamente in alto.
  function region(){
    const r=area()?.getBoundingClientRect();if(!r)return null;
    return {left:r.left,top:r.top,width:Math.max(r.width,innerWidth-8-r.left),height:Math.max(r.height,innerHeight-8-r.top)};
  }
  function ratios(){
    const r=launch.getBoundingClientRect(),a=region();
    if(!a)return {rx:.8,ry:.5};
    return {rx:clamp((r.left-a.left)/Math.max(1,a.width-r.width),0,1),ry:clamp((r.top-a.top)/Math.max(1,a.height-r.height),0,1)};
  }
  function place(){
    if(!pinned||!anchor)return;
    const a=region();if(!a)return;
    const w=launch.offsetWidth,h=launch.offsetHeight;
    const x=scrollX+a.left+anchor.rx*Math.max(0,a.width-w);
    const y=scrollY+a.top+anchor.ry*Math.max(0,a.height-h);
    launch.style.left=Math.max(0,x)+'px';launch.style.top=Math.max(0,y)+'px';
    launch.style.right='auto';launch.style.bottom='auto';
  }
  function save(){try{localStorage.setItem(keyV58,String(pinned));if(anchor)localStorage.setItem(docKeyV58,JSON.stringify(anchor));}catch(_){}}
  function renderPin(){
    document.documentElement.classList.toggle('af52-orb-pinned',pinned);
    pin.setAttribute('aria-pressed',String(pinned));
    pin.setAttribute('aria-label',pinned?'Sblocca posizione Finder':'Fissa Finder in questo punto della sezione');
    launch.removeAttribute('title');pin.removeAttribute('title');
  }
  pin.addEventListener('click',event=>{
    event.stopPropagation();
    const r=launch.getBoundingClientRect();
    if(!pinned){anchor=ratios();pinned=true;renderPin();place();}
    else{pinned=false;renderPin();launch.style.left='auto';launch.style.top='auto';
      launch.style.right=Math.max(8,innerWidth-r.right)+'px';launch.style.bottom=Math.max(8,innerHeight-r.bottom)+'px';}
    save();
  });
  // Posizione percentuale rispetto alla sezione corrente: il cambio pagina non lascia Finder fuori scena.
  const main=document.getElementById('mainContent');
  if(main)new MutationObserver(()=>{if(pinned)requestAnimationFrame(place);})
    .observe(main,{attributes:true,attributeFilter:['hidden'],subtree:true});
  window.addEventListener('resize',()=>{if(pinned)requestAnimationFrame(place);});
  // Trascinamento dell'orb anche in stato fissato; aggiorna lo stesso ancoraggio.
  window.addEventListener('af58-finder-pinned-moved',()=>{if(!pinned)return;anchor=ratios();save();place();});
  controls.prepend(pin);renderPin();requestAnimationFrame(place);
 }

 // V53: niente inseguimento del puntatore; eliminati i listener di illuminazione.
 // Immagini: in caso di cache difettosa tenta una sola lettura di rete con URL aggiornato.
 // Non cambia formato, non comprime e non nasconde l'errore persistente.
 const imageRetried=new WeakSet();
 document.addEventListener('error',event=>{
  const img=event.target;
  if(!(img instanceof HTMLImageElement)||imageRetried.has(img))return;
  if(!img.src||img.src.startsWith('data:'))return;
  let url;
  try{url=new URL(img.currentSrc||img.src,document.baseURI);}catch(_){return;}
  if(url.origin!==location.origin)return;
  imageRetried.add(img);
  url.searchParams.set('af52-retry','1');
  img.src=url.href;
 },true);
 // Offscreen animation policy: pause ornamental gradient if the element isn't visible.
 if('IntersectionObserver' in window){
  const watch=new IntersectionObserver(entries=>{
   entries.forEach(entry=>entry.target.classList.toggle('af52-offscreen',!entry.isIntersecting));
  },{rootMargin:'60px'});
  ['#versioniList','#siteFooter','#finderLaunch'].forEach(sel=>{const el=document.querySelector(sel);if(el)watch.observe(el);});
 }
 // Enhanced Admin dashboard, deliberately local and read-only diagnostics.
 const api=window.AulaFinderAdminData,consolePanel=$('af51AdminConsole');
 if(api&&consolePanel){
  const info={af52AdminClasses:Object.keys(window.AULAFINDER_DATA?.classes||{}).length,
   af52AdminRooms:Object.keys(window.AULAFINDER_DATA?.rooms||{}).length,
   af52AdminTeachers:Object.keys(window.AULAFINDER_DATA?.teachers||{}).length,
   af52AdminEdits:api.getEdits().length};
  Object.entries(info).forEach(([id,count])=>{if($(id))$(id).textContent=count.toLocaleString('it-IT');});
  const host=$('af52AdminHistory');
  if(host){
   const edits=api.getEdits().slice(-6).reverse();
   if(edits.length)host.replaceChildren(...edits.map(e=>{
    const li=document.createElement('li');li.textContent=`${e.classId}, ${e.day}, ${e.hour}ª ora: ${e.subject} · ${e.room} · ${e.teacher}`;return li;
   }));
  }
 }
})();
