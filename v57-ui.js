/* AulaFinder V57 · Interazioni additive, compatibili con le versioni storiche. */
(()=>{
 'use strict';
 document.documentElement.classList.add('af57-ready');
 const nested=new URLSearchParams(location.search).has('af52guide')||window.frameElement?.id==='af51LiveFrame';
 // Le frasi di Finder sostituiscono le liste statiche e scorrono solo se visibili.
 const host=document.getElementById('finderPrompts'),details=document.getElementById('finderPromptsWrap');
 if(host&&details){
  const days=['lunedì','martedì','mercoledì','giovedì','venerdì'];
  const intents=[
    'Come funziona Finder?',
    'Come seleziono la mia classe in Finder?',
    'Che materie ho oggi?',
    'Che materie ho domani?',
    'Cosa devo mettere nello zaino domani?',
    'Che lezione ho alla prossima ora?',
    'Mostrami l’orario della mia classe',
    'Quali aule sono libere?',
    'Quante aule sono libere?',
    'Quali professori sono liberi?',
    'Quali professori hanno un’ora buca?',
    'Come trovo un’aula nella piantina?',
    'Come funziona il navigatore?',
    'Come cerco un docente usando la sigla?',
    'Come consulto l’orario di un professore?',
    'Come aggiungo un preferito?',
    'Come consulto la cronologia?',
    'Come cambio il tema chiaro o scuro?',
    'Come si usa il tutorial?',
    'Dove vedo le versioni precedenti?',
    'Finder funziona senza microfono?'
  ];
  const seen=new Set(),phrases=intents.filter(q=>{if(seen.has(q))return false;seen.add(q);return true;});
  window.AulaFinderPromptExamples=phrases.slice();
  let i=0,changing=false;
  const box=document.createElement('div');box.className='af57-prompt-rotator';
  const tip=document.createElement('span');tip.className='af57-prompt-caption';tip.textContent='Prova a chiedere a Finder';
  const button=document.createElement('button');button.type='button';button.dataset.finderPrompt=phrases[0];button.textContent=phrases[0];
  box.append(tip,button);host.replaceChildren(box);details.open=true;
  let paused=false;box.addEventListener('pointerenter',()=>{paused=true});box.addEventListener('pointerleave',()=>{paused=false});
  box.addEventListener('focusin',()=>{paused=true});box.addEventListener('focusout',()=>{paused=false});
  const interval=window.setInterval(()=>{
   if(paused||document.hidden||!details.open||host.closest('[hidden]')||changing)return;
   if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
   changing=true;button.classList.add('is-changing');
   window.setTimeout(()=>{if(!button.isConnected)return;i=(i+1)%phrases.length;button.dataset.finderPrompt=phrases[i];button.textContent=phrases[i];button.classList.remove('is-changing');changing=false;},290);
  },4200);
  window.addEventListener('pagehide',()=>clearInterval(interval),{once:true});
 }
 // Demo: i preferiti e la cronologia non devono mai comparire né essere modificati.
 if(nested){
  document.documentElement.classList.add('af57-demo');
  document.addEventListener('click',e=>{
   if(!e.isTrusted)return;
   if(e.target.closest('[data-favorite-kind],[data-fav-open],[data-fav-remove],#clearHistoryButton,#clearFavoritesButton')){
    e.preventDefault();e.stopImmediatePropagation();
   }
  },true);
  // Finder usa la stessa puntina SVG della pagina normale (v52-ui.js).
 }
 // L'accesso Admin è solo locale: non esporre una promessa di sicurezza server.
 // La Home storica non possiede necessariamente un vero tema scuro: il filtro è etichettato.
})();
