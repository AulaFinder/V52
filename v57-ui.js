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
   'Che materie ho oggi?','Che materie ho domani?','Che lezioni ho dopodomani?','Cosa devo mettere nello zaino domani?',
   'Che lezione ho alla prossima ora?','In quale aula sarò alla prossima ora?','Mostrami il mio orario completo',
   'Quali aule sono libere?','Quante aule sono libere?','Ci sono aule disponibili alla terza ora?',
   'Quali docenti sono liberi?','Quali professori hanno un’ora buca?','Quante ore fa il prof BA AN?',
   'Dove si trova la Palestra?','Dove si trova S.07?','Dove si trova T.08?','Dove si trova 1.07?',
   'Come si usa il navigatore?','Come faccio a vedere una piantina?','Come ingrandisco una piantina?',
   'Come cerco un docente usando la sigla?','Come cambio il tema?','Come salvo un preferito?',
   'Dove si trova la cronologia?','Come apro il tutorial?','Come visualizzo le vecchie versioni?',
   'Come funziona Finder?','Posso usare Finder senza microfono?','Come posso contattare gli autori?',
   'Qual è la differenza tra aula libera e ora buca?','Come posso consultare l’orario di un professore?'
  ];
  for(const d of days){intents.push(`Che materie ho ${d}?`,`Quante lezioni ho ${d}?`,`Mostrami l’orario di ${d}`,`Quali aule sono libere ${d}?`,`Quali professori sono liberi ${d}?`);}
  for(const room of ['S.01','S.07','T.01','T.08','1.01','1.07','2.01','2.14','3.01']){
   intents.push(`Dove si trova ${room}?`,`Chi usa l’aula ${room} oggi?`,`L’aula ${room} è occupata alla seconda ora?`);
  }
  const seen=new Set(),phrases=intents.filter(q=>{if(seen.has(q))return false;seen.add(q);return true;});
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
  // La posizione dell'orb è modificabile in tutorial come nel sito principale.
  const launch=document.getElementById('finderLaunch'),controls=document.querySelector('#finderPanel .finder-window-controls');
  if(launch&&controls&&!document.getElementById('af52FinderPin')){
   const pin=document.createElement('button');pin.type='button';pin.id='af52FinderPin';pin.className='finder-window-btn af52-finder-pin';pin.textContent='⌖';
   pin.setAttribute('aria-label','Fissa Finder qui sulla pagina');pin.title='Fissa Finder in questo punto della pagina';
   pin.setAttribute('aria-pressed','false');let fixed=false;
   pin.addEventListener('click',()=>{
    const r=launch.getBoundingClientRect();fixed=!fixed;
    document.documentElement.classList.toggle('af52-orb-pinned',fixed);
    if(fixed){launch.style.left=scrollX+r.left+'px';launch.style.top=scrollY+r.top+'px';launch.style.right='auto';launch.style.bottom='auto';}
    else{launch.style.left='auto';launch.style.top='auto';launch.style.right=Math.max(8,innerWidth-r.right)+'px';launch.style.bottom=Math.max(8,innerHeight-r.bottom)+'px';}
    pin.setAttribute('aria-pressed',String(fixed));pin.setAttribute('aria-label',fixed?'Sblocca Finder':'Fissa Finder qui sulla pagina');
   });
   launch.addEventListener('pointerdown',e=>{if(fixed)e.stopImmediatePropagation();},true);
   controls.prepend(pin);
  }
 }
 // L'accesso Admin è solo locale: non esporre una promessa di sicurezza server.
 // La Home storica non possiede necessariamente un vero tema scuro: il filtro è etichettato.
})();
