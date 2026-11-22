/* AulaFinder V53 — rendering adattivo della demo reale e preferenze d'accessibilità. */
(()=>{
 'use strict';
 const frame=document.getElementById('af51LiveFrame');
 const holder=frame?.closest('.af51-live-frame');
 if(frame&&holder){
   const fit=()=>{
     const w=holder.getBoundingClientRect().width;
     if(!w)return;
     const scale=Math.min(1,Math.max(.2,w/1024));
     holder.style.setProperty('--v53-guide-scale',String(scale));
     holder.style.setProperty('--v53-guide-height',Math.round(960*scale)+'px');
     frame.title='Demo AulaFinder originale in scala, interattiva solo nella funzione corrente';
   };
   if('ResizeObserver' in window)new ResizeObserver(fit).observe(holder);
   window.addEventListener('resize',fit,{passive:true});
   fit();
 }
 // Nel tutorial il pannello Orari mostra solo le categorie previste dalla tappa.
 if(document.documentElement.classList.contains('af52-in-demo')){
   const observer=new MutationObserver(()=>{
     const step=document.documentElement.dataset.af52DemoStep;
     document.documentElement.dataset.af53TutorialScope=step==='1'?'orari':step==='2'?'disponibilita':'altro';
   });
   observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-af52-demo-step']});
 }
})();
