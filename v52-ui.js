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
   // In "Altre funzioni" la prima interazione riguarda il logo nell'HEADER.
   requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}));
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
  const pinKey=nested?'aulafinder.finder.pinned.v59.demo':'aulafinder.finder.pinned.v59';
  const anchorKey=nested?'aulafinder.finder.anchor.v59.demo':'aulafinder.finder.anchor.v59';
  let pinned=false,anchor=null,lastPage='';
  try {pinned=localStorage.getItem(pinKey)==='true';anchor=JSON.parse(localStorage.getItem(anchorKey)||'null');}catch(_){}
  if(nested){pinned=false;anchor=null;}
  const currentPage=()=>document.querySelector('#mainContent > .page:not([hidden])')||document.getElementById('mainContent');
  const region=()=>{
    const page=currentPage();if(!page)return null;
    const rect=page.getBoundingClientRect();
    return {id:page.id,x:rect.left+scrollX,y:rect.top+scrollY,
      width:Math.max(rect.width,launch.offsetWidth+20),
      height:Math.max(launch.offsetHeight+20,Math.min(rect.height,Math.max(innerHeight*.74,580)))};
  };
  function capture(){
    const r=launch.getBoundingClientRect(),p=region();if(!p)return {rx:.8,ry:.5};
    return {rx:clamp((r.left+scrollX-p.x)/Math.max(1,p.width-r.width),0,1),
      ry:clamp((r.top+scrollY-p.y)/Math.max(1,p.height-r.height),0,1)};
  }
  function positionAbsolute(x,y){
    launch.style.left=Math.round(x)+'px';launch.style.top=Math.round(y)+'px';
    launch.style.right='auto';launch.style.bottom='auto';
  }
  function place(){
    if(!pinned||!anchor)return;
    const p=region();if(!p)return;
    positionAbsolute(p.x+anchor.rx*Math.max(0,p.width-launch.offsetWidth),
      p.y+anchor.ry*Math.max(0,p.height-launch.offsetHeight));
  }
  function save(){try{localStorage.setItem(pinKey,String(pinned));if(anchor)localStorage.setItem(anchorKey,JSON.stringify(anchor));}catch(_){}}
  function paint(){
    document.documentElement.classList.toggle('af52-orb-pinned',pinned);
    pin.setAttribute('aria-pressed',String(pinned));
    pin.setAttribute('aria-label',pinned?'Libera Finder':'Fissa Finder in questo punto della pagina');
    launch.removeAttribute('title');pin.removeAttribute('title');
  }
  pin.addEventListener('click',event=>{
    event.stopPropagation();
    const r=launch.getBoundingClientRect();
    if(!pinned){anchor=capture();pinned=true;paint();positionAbsolute(r.left+scrollX,r.top+scrollY);}
    else{pinned=false;paint();launch.style.left='auto';launch.style.top='auto';
      launch.style.right=clamp(innerWidth-r.right,8,Math.max(8,innerWidth-launch.offsetWidth-8))+'px';
      launch.style.bottom=clamp(innerHeight-r.bottom,8,Math.max(8,innerHeight-launch.offsetHeight-8))+'px';}
    lastPage=currentPage()?.id||'';save();
  });
  // Reposition only when the actual site section changes, never during scrolling or random clicks.
  const main=document.getElementById('mainContent');lastPage=currentPage()?.id||'';
  if(main)new MutationObserver(()=>{
    if(!pinned)return;
    const page=currentPage()?.id||'';
    if(page!==lastPage){lastPage=page;requestAnimationFrame(place);}
  }).observe(main,{attributes:true,attributeFilter:['hidden'],subtree:true});
  window.addEventListener('resize',()=>{if(pinned)requestAnimationFrame(place)});
  window.addEventListener('af58-finder-pinned-moved',()=>{if(!pinned)return;anchor=capture();save();});
  controls.prepend(pin);paint();if(pinned&&anchor)requestAnimationFrame(place);

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
