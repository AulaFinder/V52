/* AulaFinder V58 - Controlli dell'interfaccia, senza modifiche ai dati degli orari. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const isDemo=new URLSearchParams(location.search).has('af52guide');

 // I titoli restano accessibili grazie ad aria-label, ma non compare il tooltip nativo invasivo.
 document.querySelectorAll('#logoButton,.brand-title,#sidebarClose,.footer-logo').forEach(el=>el.removeAttribute('title'));

 // Evidenziazione progressiva lungo la circonferenza, senza cambiare gli avatar originali.
 document.querySelectorAll('#siteFooter .team-member').forEach(member=>{
  if(member.querySelector('.af58-member-ring'))return;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('aria-hidden','true');svg.classList.add('af58-member-ring');
  const ring=document.createElementNS('http://www.w3.org/2000/svg','circle');
  ring.setAttribute('cx','50');ring.setAttribute('cy','50');ring.setAttribute('r','46');
  ring.setAttribute('fill','none');ring.setAttribute('stroke','currentColor');ring.setAttribute('stroke-width','3.5');
  svg.append(ring);member.append(svg);
 });

 // Aggiornamento selezione Orari anche usando la sola freccia del menu.
 $('scheduleSubnavToggle')?.addEventListener('click',()=>{
  const orari=document.querySelector('.side-link[data-page="orari"]');
  if(!$('#scheduleSubnav')?.hidden)orari?.classList.add('is-active');
 });

 // In Versioni la scheda evidenziata in testata è cliccabile e apre davvero l'anteprima.
 $('af58LatestVersion')?.addEventListener('click',()=>{
  const entry=document.querySelector('#versioniList details[data-version="58"]');if(!entry)return;
  entry.open=true;
  const preview=entry.querySelector('.af49-version-preview-button');
  if(preview&&preview.getAttribute('aria-expanded')!=='true')preview.click();
  entry.classList.remove('af58-version-flash');void entry.offsetWidth;entry.classList.add('af58-version-flash');
  entry.scrollIntoView({block:'start',behavior:reduced()?'instant':'smooth'});
  entry.addEventListener('animationend',()=>entry.classList.remove('af58-version-flash'),{once:true});
 });

 // Il suggerimento a comparsa resta il principale; un controllo separato mostra tutte le domande.
 const prompts=$('finderPrompts'),wrap=$('finderPromptsWrap');
 if(prompts&&wrap){
  const choices=window.AulaFinderPromptExamples||[];
  if(choices.length){
   const reveal=document.createElement('button');reveal.type='button';reveal.className='af58-prompt-all-toggle';
   reveal.textContent='Mostra tutte le domande';reveal.setAttribute('aria-expanded','false');
   const list=document.createElement('div');list.className='af58-prompt-all-list';list.hidden=true;
   list.setAttribute('role','group');list.setAttribute('aria-label','Domande da chiedere a Finder');
   // Evitiamo centinaia di elementi nella pagina finché l'utente non apre l'elenco.
   let populated=false;
   reveal.addEventListener('click',()=>{
    const open=list.hidden;list.hidden=!open;reveal.setAttribute('aria-expanded',String(open));
    reveal.textContent=open?'Nascondi le domande':'Mostra tutte le domande';
    if(open&&!populated){populated=true;const fragment=document.createDocumentFragment();
     for(const question of choices){const b=document.createElement('button');b.type='button';b.dataset.finderPrompt=question;b.textContent=question;fragment.append(b);}
     list.append(fragment);
    }
   });
   list.addEventListener('click',event=>{const target=event.target.closest('button[data-finder-prompt]');if(target)window.AulaFinderVoice?.ask?.(target.dataset.finderPrompt);});
   wrap.append(reveal,list);
  }
 }

 // Demo con componenti autentici isolati, non tutto il sito navigabile.
 if(isDemo){
  document.documentElement.classList.add('af58-tour-slice');
  // Il pannello Admin e la cronologia non diventano accessibili dalla guida.
  document.querySelectorAll('.favorites-block,.history-block,#homeFavorites').forEach(el=>el.hidden=true);
  document.addEventListener('click',e=>{
   if(!e.isTrusted)return;
   const target=e.target.closest('a[href],button[data-page],.footer-admin-button');
   if(target?.classList.contains('footer-admin-button')||target?.dataset.page==='admin'){
    e.preventDefault();e.stopImmediatePropagation();
   }
  },true);
 }
})();
