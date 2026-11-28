/* AulaFinder V59 · Stabilizzazione delle interazioni, senza modifiche ai dati. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const nested=new URLSearchParams(location.search).has('af52guide');

 // Una ricerca vuota comunica l'errore nel testo, non disegna un secondo box interno.
 const form=$('searchForm'),input=$('searchInput');
 form?.addEventListener('submit',()=>{
   if(!input?.value.trim())input.classList.add('af59-empty-search');
 });
 input?.addEventListener('input',()=>input.classList.remove('af59-empty-search'));

 // Il focus arancione del ritorno dell'immagine non deve rimanere attivo col mouse.
 const logo=$('logoButton'),dialog=$('logoDialog');
 dialog?.addEventListener('close',()=>{
   logo?.classList.remove('af50-logo-arriving');
   if(!logo?.matches(':focus-visible'))logo?.blur();
 });
 // Non mostrare tooltip nativi, né sul logo né sul controllo Finder fissato.
 for(const el of [logo,$('af52FinderPin')])el?.removeAttribute('title');

 // L'espansione della sottosezione Orari non cambia la pagina selezionata.
 const orari=document.querySelector('.side-link[data-page="orari"]');
 const toggle=$('scheduleSubnavToggle');
 toggle?.addEventListener('click',()=>{
   const wasActive=orari?.classList.contains('is-active')||!$('orariPage')?.hidden;
   if(wasActive)requestAnimationFrame(()=>orari?.classList.add('is-active'));
 });

 // I controlli delle versioni puntano all'ultima voce: non restano fermi a V58.
 const latest=$('af58LatestVersion');
 if(latest){latest.dataset.currentVersion='59';latest.setAttribute('aria-label','Apri dettagli e anteprima di AulaFinder V59');}

 // La preferenza di sistema è la modalità iniziale finché l'utente non ne sceglie una.
 // Il comportamento è gestito da script.js e resta compatibile con le scelte salvate.

 // In una demo non mostriamo Finder fuori dalla propria tappa neppure per un frame.
 if(nested){
   const closeFinder=()=>{
     if(document.documentElement.dataset.af52DemoStep==='4')return;
     const panel=$('finderPanel');
     if(panel&&!panel.hidden)$('finderClose')?.click();
   };
   new MutationObserver(closeFinder).observe(document.documentElement,
     {attributes:true,attributeFilter:['data-af52-demo-step']});
 }
})();
