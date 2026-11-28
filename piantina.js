/* AulaFinder V13 · focus sull'aula cercata */
(function(){
var cur=null;
var tooltip=document.getElementById('room-tooltip');
var hovered=null;
var alwaysVisible={"Archivio":true,"Caldaie":true,"Palestra":true};
var actionsPanel=null;
var actionRoom='';
function cleanRoomName(t){return String(t||'').split('·')[0].trim();}
function canonicalRoom(t){return cleanRoomName(t).replace(/^Informatica\s+/i,'').replace(/[.\s]/g,'').toUpperCase();}
function hasRoomSchedule(t){return Object.keys(window.AULAFINDER_DATA?.rooms||{}).some(function(k){return canonicalRoom(k)===canonicalRoom(t)});}
function isNavigableRoom(t){return /^(?:[STP]\.\d+|[123]\.\d+|Palestra|Ingresso|Archivio|Caldaie)$/i.test(cleanRoomName(t));}
function hideActions(){if(actionsPanel){actionsPanel.remove();actionsPanel=null;}actionRoom='';}
function showActions(g){
  hideActions();
  var code=cleanRoomName(g.dataset.t);
  if(!isNavigableRoom(code))return;
  var holder=g.closest('.plan-body'); if(!holder)return;
  var box=document.createElement('div');box.className='room-actions';box.setAttribute('role','group');box.setAttribute('aria-label','Azioni per '+code);
  var title=document.createElement('p');title.className='room-actions-title';title.textContent=code;box.appendChild(title);
  var go=document.createElement('button');go.type='button';go.dataset.mapAction='navigate';go.textContent='Portami qui';box.appendChild(go);
  if(hasRoomSchedule(code)){
    var schedule=document.createElement('button');schedule.type='button';schedule.dataset.mapAction='schedule';schedule.textContent='Vedi orario';box.appendChild(schedule);
  }
  actionsPanel=box;actionRoom=code;
  var banner=holder.closest('.plan-card').querySelector('.plan-banner');
  if(!banner)return;
  // A fianco della stanza selezionata, con posizionamento che non esce dalla mappa.
  holder.appendChild(box);
  requestAnimationFrame(function(){
    if(!box.isConnected)return;
    var room=g.getBoundingClientRect(),area=holder.getBoundingClientRect();
    var left=room.right-area.left+10+holder.scrollLeft;
    var top=room.top-area.top+holder.scrollTop;
    var maxLeft=holder.scrollWidth-box.offsetWidth-8;
    if(left>maxLeft)left=room.left-area.left-box.offsetWidth-10+holder.scrollLeft;
    box.style.left=Math.max(8,Math.min(maxLeft,left))+'px';
    box.style.top=Math.max(8,Math.min(holder.scrollHeight-box.offsetHeight-8,top))+'px';
  });

}

function hideTip(){
  hovered=null;
  if(tooltip){tooltip.classList.remove('visible');tooltip.setAttribute('aria-hidden','true');}
}
function labelFor(g){
  var t=(g && g.dataset && g.dataset.t ? g.dataset.t : '').trim();
  if(!t || alwaysVisible[t]) return '';
  var m=t.match(/^(?:\d+\.\d+|[STP]\.\d+)\s*[·]\s*(.+)$/i);
  if(m) return m[1].trim().replace(/^\.\.\.$/,'');
  if(/^(?:\d+\.\d+|[STP]\.\d+)$/i.test(t)) return '';
  return t;
}
function positionTip(e){
  if(!tooltip || !hovered) return;
  var left=e.clientX+14, top=e.clientY+14;
  tooltip.style.left='0px'; tooltip.style.top='0px';
  var r=tooltip.getBoundingClientRect();
  left=Math.min(left, Math.max(8, window.innerWidth-r.width-8));
  top=Math.min(top, Math.max(8, window.innerHeight-r.height-8));
  tooltip.style.left=left+'px'; tooltip.style.top=top+'px';
}
function showTip(g,e){
  var label=labelFor(g);
  if(!label){hideTip();return;}
  hovered=g; tooltip.textContent=label;
  tooltip.classList.add('visible'); tooltip.setAttribute('aria-hidden','false');
  positionTip(e);
}
function clear(){
  document.querySelectorAll('.sel-clone').forEach(function(n){n.remove()});
  document.querySelectorAll('.sel-chip').forEach(function(c){c.textContent=''});
  cur=null;hideActions();
}
function pick(g){
  hideTip();
  if(cur===g && actionsPanel){clear();return;}
  clear();cur=g;mark(g);showActions(g);
  requestAnimationFrame(function(){focusRoom(g);});
}
function mark(g){
  var cx=+g.dataset.cx,cy=+g.dataset.cy,s=+g.dataset.s,c=g.cloneNode(true);
  c.classList.remove('room');c.classList.add('sel-clone');c.removeAttribute('tabindex');
  // V45: la stanza originale ha gia' la contro-rotazione di 180°.
  // L'evidenziazione deve scalare e conservare la stessa contro-rotazione,
  // invece di sostituirla con una trasformazione CSS che rovescia il testo.
  c.style.removeProperty('transform');
  c.setAttribute('transform',`translate(${cx} ${cy}) scale(${s}) rotate(180) translate(${-cx} ${-cy})`);
  g.closest('svg').querySelector('.top').appendChild(c);
  var t=(g.dataset.t||'').split('·')[0].trim();
  var code=/^(?:\d+\.\d+|[STP]\.\d+)$/i.test(t) ? t : '';
  g.closest('.plan-card').querySelector('.sel-chip').textContent=code || (t==='Ingresso'?'Ingresso':'');
}
// Porta la vista direttamente sull'aula: la centra nella pagina e, sugli schermi stretti, scorre anche la piantina in orizzontale.
function focusRoom(g){
  var behavior=(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)?'auto':'smooth';
  var r=g.getBoundingClientRect();
  var body=g.closest('.plan-body');
  if(body && body.scrollWidth>body.clientWidth){
    var b=body.getBoundingClientRect();
    body.scrollTo({left:body.scrollLeft+(r.left+r.width/2)-(b.left+b.width/2),behavior:behavior});
  }
  window.scrollTo({top:Math.max(0,window.scrollY+r.top+r.height/2-window.innerHeight/2),behavior:behavior});
}
// Elimina selezioni e finestre quando si cambia sezione; evita overlay invisibili al ritorno.
var planPage=document.getElementById('piantinaPage');
if(planPage){new MutationObserver(function(){if(planPage.hidden)clear();}).observe(planPage,{attributes:true,attributeFilter:['hidden']});}
window.AFPiantina={show:function(room){
  // 'Informatica 1.07' -> '1.07'; la Palestra e' disegnata su due piani e viene evidenziata in entrambi.
  var code=String(room).replace(/^Informatica\s+/i,'').trim().toLowerCase();
  var gs=[].filter.call(document.querySelectorAll('#piantinaPage g.room'),function(g){return (g.dataset.t||'').split('·')[0].trim().toLowerCase()===code;});
  if(!gs.length) return false;
  var floors={};gs.forEach(function(g){floors[g.closest('.plan-card').id]=1;});
  var boxes=[].slice.call(document.querySelectorAll('.floor-option input[type="checkbox"]'));
  boxes.forEach(function(c){c.checked=!!floors[c.value];});
  boxes[0].dispatchEvent(new Event('change',{bubbles:true}));
  hideTip();clear();gs.forEach(mark);cur=gs[0];showActions(gs[0]);
  focusRoom(gs[0]);
  return true;
 },
 getRoomActions:function(room){
  var code=cleanRoomName(room);
  return {room:code,navigable:isNavigableRoom(code),hasSchedule:hasRoomSchedule(code)};
 },
 runRoomAction:function(room,kind){
  var code=cleanRoomName(room);
  if(!isNavigableRoom(code))return false;
  if(kind==='navigate'){
   var btn=document.querySelector('.side-link[data-page="navigator"]');
   if(window.AulaFinderNavigator?.setDestination(code)&&btn){btn.click();return true;}
  }else if(kind==='schedule'&&hasRoomSchedule(code)&&window.AulaFinderRoomSchedule){
   window.AulaFinderRoomSchedule(code);return true;
  }
  return false;
 }
};
document.addEventListener('mouseover',function(e){
  var g=e.target && e.target.closest ? e.target.closest('g.room') : null;
  if(!g || (e.relatedTarget && g.contains(e.relatedTarget))) return;
  showTip(g,e);
});
document.addEventListener('mousemove',function(e){
  if(hovered && hovered.contains(e.target)) positionTip(e);
});
document.addEventListener('mouseout',function(e){
  if(hovered && !hovered.contains(e.relatedTarget)) hideTip();
});
document.addEventListener('click',function(e){
  var action=e.target.closest&&e.target.closest('[data-map-action]');
  if(action){
    e.preventDefault();var room=actionRoom;
    window.AFPiantina.runRoomAction(room,action.dataset.mapAction);
    hideActions();return;
  }
  var g=e.target.closest ? e.target.closest('#piantinaPage g.room') : null;
  if(g){pick(g)}
  else if(e.target.closest && e.target.closest('.sel-clone')){hideTip();clear()}
  else if(e.target.closest && e.target.closest('#piantinaPage svg.plan')){hideTip();clear()}
  else if(actionsPanel && !e.target.closest('.room-actions')){hideActions()}
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){hideTip();clear();return;}
  if((e.key==='Enter'||e.key===' ')&&e.target.closest('#piantinaPage g.room')&&e.target.classList&&e.target.classList.contains('room')){e.preventDefault();pick(e.target)}
});
})();
(function(){
  var checks=Array.prototype.slice.call(document.querySelectorAll('.floor-option input[type="checkbox"]'));
  var cards=Array.prototype.slice.call(document.querySelectorAll('.plan-card'));
  var status=document.getElementById('filter-status');
  var allSwitch=document.getElementById('all-plans-switch');
  function setAll(value){checks.forEach(function(c){c.checked=value;});allSwitch.checked=value;update();}
  function update(){
    var selected=checks.filter(function(c){return c.checked;}).map(function(c){return c.value;});
    cards.forEach(function(card){card.hidden=selected.indexOf(card.id)===-1;});
    allSwitch.checked=selected.length===checks.length;
    status.textContent=selected.length===0?'Nessun piano selezionato.':'Visualizzati '+selected.length+' '+(selected.length===1?'piano':'piani')+' su '+checks.length+'.';
  }
  checks.forEach(function(c){c.addEventListener('change',update);});
  document.getElementById('show-all-plans').addEventListener('click',function(){setAll(true);});
  document.getElementById('hide-all-plans').addEventListener('click',function(){setAll(false);});
  allSwitch.addEventListener('change',function(){setAll(allSwitch.checked);});
  update();
})();
