/* AulaFinder V54 · zoom contestuale del tutorial (senza alterare il sito reale). */
(()=>{
 'use strict';
 const frame=document.getElementById('af51LiveFrame');
 const holder=frame?.closest('.af51-live-frame');
 if(!frame||!holder)return;
 const page=document.getElementById('tutorialPage');
 const oldTabs=[...page.querySelectorAll('[data-tutorial-select]')];
 const controls=document.createElement('div');
 controls.className='af54-guide-controls';
 controls.setAttribute('role','group');
 controls.setAttribute('aria-label','Zoom della dimostrazione');
 controls.innerHTML='<button type="button" data-af54-zoom="out" aria-label="Rimpicciolisci la demo">−</button><span id="af54GuideZoom" aria-live="polite">100%</span><button type="button" data-af54-zoom="in" aria-label="Ingrandisci la demo">+</button><button type="button" data-af54-zoom="reset" aria-label="Ripristina lo zoom mirato">Adatta</button>';
 holder.append(controls);
 const zoomLabel=controls.querySelector('#af54GuideZoom');
 let step=0,manualZoom=1,delayed=0;
 const targets=[
  '#homePage .home-search-area',
  '#orariPage .orari-category-tabs',
  '#orariPage .orari-category-tabs',
  '#navigatorPage #navigatorForm',
  '#finderPanel',
  '#piantinaPage .plan-card:not([hidden])',
  '#siteFooter'
 ];
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 function place(shouldFocus=false){
  if(page?.hidden)return;
  const width=holder.clientWidth;if(!width)return;
  const mobile=width<560;
  const desiredField=mobile?(step===4?430:step===3?510:560):width<800?(step===4?570:690):(step===4?650:790);
  const scale=clamp((width/desiredField)*manualZoom,.35,1.55);
  let x=0,y=0;
  try{
   const win=frame.contentWindow,doc=frame.contentDocument;
   if(doc&&doc.readyState!=='loading'){
    const target=doc.querySelector(targets[step]);
    if(target){
     if(shouldFocus){
      // Il documento interno si sposta alla funzione scelta: non si modifica il layout originale.
      const r=target.getBoundingClientRect();
      const scroll=doc.scrollingElement;
      const offset=step===6?0:Math.max(0,r.top-145);
      if(scroll&&offset>0)scroll.scrollTop+=offset;
     }
     const rect=target.getBoundingClientRect();
     // L'inquadratura privilegia l'area interattiva, anche se lo schermo è stretto.
     const centre=rect.left+rect.width/2-(step===1||step===2?55:0);
     x=clamp(width/2-centre*scale,width-1024*scale,0);
     y=clamp(32-Math.max(0,rect.top-55)*scale,-850*scale,28);
    }else x=clamp(width/2-580*scale,width-1024*scale,0);
   }
  }catch(_){x=clamp(width/2-580*scale,width-1024*scale,0);}
  frame.style.setProperty('--af54-guide-scale',String(scale));
  frame.style.setProperty('--af54-guide-x',Math.round(x)+'px');
  frame.style.setProperty('--af54-guide-y',Math.round(y)+'px');
  zoomLabel.textContent=Math.round(scale*100)+'%';
  holder.style.setProperty('--af54-guide-height',mobile?'min(70dvh, 560px)':'min(70dvh, 720px)');
 }
 function focusStep(n){
  step=clamp(n,0,6);manualZoom=1;
  window.clearTimeout(delayed);
  // Aspetta che il sito reale riceva il messaggio di cambio sezione e aggiorni la pagina.
  requestAnimationFrame(()=>requestAnimationFrame(()=>place(true)));
  delayed=window.setTimeout(()=>place(true),170);
 }
 oldTabs.forEach(el=>el.addEventListener('click',()=>focusStep(Number(el.dataset.tutorialSelect))));
 const prev=document.getElementById('tutorialPrev'),next=document.getElementById('tutorialNext');
 prev?.addEventListener('click',()=>focusStep(Number(page.querySelector('[data-tutorial-select][aria-selected="true"]')?.dataset.tutorialSelect||0)));
 next?.addEventListener('click',()=>focusStep(Number(page.querySelector('[data-tutorial-select][aria-selected="true"]')?.dataset.tutorialSelect||0)));
 // Mantieni la messa a fuoco anche avanzando con frecce, Home/End e altre tecnologie assistive.
 const tabObserver=new MutationObserver(()=>{
  const current=Number(page.querySelector('[data-tutorial-select][aria-selected="true"]')?.dataset.tutorialSelect||0);
  if(current!==step)focusStep(current);
 });
 oldTabs.forEach(el=>tabObserver.observe(el,{attributes:true,attributeFilter:['aria-selected']}));
 controls.addEventListener('click',event=>{
  const button=event.target.closest('button[data-af54-zoom]');if(!button)return;
  const action=button.dataset.af54Zoom;
  manualZoom=action==='reset'?1:clamp(manualZoom+(action==='in'?.15:-.15),.65,1.8);
  place(false);
 });
 frame.addEventListener('load',()=>window.setTimeout(()=>place(true),140));
 if('ResizeObserver' in window)new ResizeObserver(()=>place(false)).observe(holder);
 window.addEventListener('resize',()=>place(false),{passive:true});
 new MutationObserver(()=>{if(!page.hidden)window.setTimeout(()=>place(true),100);})
  .observe(page,{attributes:true,attributeFilter:['hidden']});
 place(false);
})();
