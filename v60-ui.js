/* AulaFinder V60 — normalizzazione minima, senza modifiche ai dati. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 document.documentElement.classList.remove('af52-orb-pinned');
 $('af52FinderPin')?.remove();
 const orb=$('finderLaunch');
 if(orb){
  orb.style.removeProperty('left');orb.style.removeProperty('top');orb.style.removeProperty('right');orb.style.removeProperty('bottom');
  orb.removeAttribute('title');
 }
 // Nasconde eventuali vecchie etichette della versione più recente rimaste da cache.
 const latest=$('af58LatestVersion');
 if(latest){latest.dataset.currentVersion='60';latest.setAttribute('aria-label','Apri la V60 e la sua anteprima');}
})();
