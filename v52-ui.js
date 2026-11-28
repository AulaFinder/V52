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

 // V60: nessun comando Fissa. L'orb rimane ancorato alla finestra.
 document.documentElement.classList.remove('af52-orb-pinned');
 document.getElementById('af52FinderPin')?.remove();

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
