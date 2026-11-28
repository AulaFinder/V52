/* Admin V51 - console operativa sul dispositivo: importa/esporta/revisione degli orari. */
(() => {
 'use strict';
 const API=window.AulaFinderAdminData;
 const $=id=>document.getElementById(id), page=$('adminPage');if(!API||!page)return;
 const login=$('af51AdminLogin'),console=$('af51AdminConsole'),pass=$('af51AdminPassword');
 const cls=$('af51AdminClass'),day=$('af51AdminDay'),hour=$('af51AdminHour');
 const subject=$('af51AdminSubject'),teacher=$('af51AdminTeacher'),room=$('af51AdminRoom');
 const status=$('af51AdminStatus'),hint=$('af51AdminLoginStatus');
 const makeOption=(val,label)=>{const el=document.createElement('option');el.value=val;el.textContent=label;return el;};
 const setMessage=(message,problem=false)=>{status.textContent=message;status.dataset.error=String(problem);};
 let authenticated=false;
 function unlock(){authenticated=true;login.hidden=true;console.hidden=false;hint.textContent='Accesso consentito';loadLesson();}
 function lock(){authenticated=false;pass.value='';console.hidden=true;login.hidden=false;hint.textContent='';hint.classList.remove('af57-access-ok','af57-access-denied');}
 // Il client pubblicato non può conservare un segreto: il digest evita solo la stringa in chiaro.
 const salt='b3dff8de3dea1821ea233bfa5a6c64d6',expected='46e4d2a84e048229e8a8262db53f68532078d677f9c8127f45cceb977d2df693';
 const feedback=(message,ok)=>{hint.textContent=message;hint.classList.toggle('af57-access-ok',ok===true);hint.classList.toggle('af57-access-denied',ok===false);};
 const eye=$('af51AdminShowPassword'),eyeIcon=$('af57EyeIcon');
 eye.addEventListener('click',()=>{const show=pass.type==='password';pass.type=show?'text':'password';eye.setAttribute('aria-pressed',String(show));eye.setAttribute('aria-label',show?'Nascondi password':'Mostra password');if(eyeIcon)eyeIcon.classList.toggle('is-open',show);pass.focus({preventScroll:true});});
 $('af51AdminAuth').addEventListener('submit',async e=>{
  e.preventDefault();
  const bytes=new TextEncoder().encode(salt+pass.value);
  let verified=false;
  try{const result=await crypto.subtle.digest('SHA-256',bytes);const value=Array.from(new Uint8Array(result),v=>v.toString(16).padStart(2,'0')).join('');verified=value===expected;}catch(_ ){feedback('Impossibile verificare il codice su questo browser.',false);return;}
  if(verified){feedback('Accesso consentito',true);setTimeout(unlock,620);}
  else{feedback('Accesso negato',false);pass.select();login.classList.remove('af51-admin-shake');void login.offsetWidth;login.classList.add('af51-admin-shake');}
 });
 $('af51AdminLock').addEventListener('click',lock);
 const classIds=Object.keys(API.base.classes).sort((a,b)=>a.localeCompare(b,'it',{numeric:true}));
 cls.replaceChildren(...classIds.map(v=>makeOption(v,v)));
 day.replaceChildren(...API.base.days.map(d=>makeOption(d,d)));
 hour.replaceChildren(...[1,2,3,4,5,6].map(i=>makeOption(String(i),i+'ª ora')));
 teacher.replaceChildren(...API.baseTeacherCodes.map(v=>makeOption(v,v)));
 room.replaceChildren(...Object.keys(API.base.rooms).map(v=>makeOption(v,v)));
 cls.value=classIds.includes('4AS')?'4AS':classIds[0];day.value='Mercoledì';hour.value='4';
 function loadLesson(){
  const current=window.AULAFINDER_DATA.classes[cls.value]?.days?.[day.value]?.[Number(hour.value)-1];
  subject.value=current?.subject||'';teacher.value=current?.teacher||API.baseTeacherCodes[0];room.value=current?.room||Object.keys(API.base.rooms)[0];
  const edit=API.getEdits().some(e=>e.classId===cls.value&&e.day===day.value&&e.hour===Number(hour.value));
  setMessage(edit?'Questa lezione contiene una modifica locale salvata.':'Lezione letta dagli orari attualmente caricati.');
 }
 for(const field of [cls,day,hour])field.addEventListener('change',loadLesson);
 function reload(){try{sessionStorage.setItem('aulafinder.admin.return.v51','1');}catch(_){}location.reload();}
 $('af51AdminEdit').addEventListener('submit',e=>{
  e.preventDefault();if(!authenticated)return;
  const value={classId:cls.value,day:day.value,hour:Number(hour.value),subject:subject.value.trim(),teacher:teacher.value,room:room.value};
  const edits=API.getEdits().filter(x=>!(x.classId===value.classId&&x.day===value.day&&x.hour===value.hour));
  edits.push(value);
  try{API.commit(edits);setMessage('Modifica salvata. Aggiornamento degli orari in corso.');reload();}catch(error){setMessage(error.message,true);}
 });
 $('af51AdminRestore').addEventListener('click',()=>{
  if(!authenticated)return;
  const edits=API.getEdits().filter(x=>!(x.classId===cls.value&&x.day===day.value&&x.hour===Number(hour.value)));
  try{API.commit(edits);reload();}catch(error){setMessage(error.message,true);}
 });
 $('af51AdminReset').addEventListener('click',()=>{if(!authenticated||!confirm('Ripristinare tutti gli orari originali su questo dispositivo?'))return;localStorage.removeItem(API.storage);reload();});
 $('af51AdminExport').addEventListener('click',()=>{
  if(!authenticated)return;
  const blob=new Blob([API.export()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='AulaFinderV51_modifiche_orari.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);setMessage('File JSON esportato.');
 });
 $('af51AdminImport').addEventListener('change',async e=>{
  if(!authenticated)return;
  const file=e.target.files?.[0];if(!file)return;
  try{
   if(file.size>250000)throw Error('File troppo grande.');
   const obj=JSON.parse(await file.text());
   if(!obj||obj.format!=='AulaFinder-V51-overrides'||obj.version!==1)throw Error('Formato non riconosciuto. Importa un file esportato da AulaFinder V51.');
   API.commit(obj.overrides);reload();
  }catch(error){setMessage('Importazione rifiutata: '+error.message,true);}finally{e.target.value='';}
 });
 // On save return to Admin while NEVER restoring the password field automatically.
 try{if(sessionStorage.getItem('aulafinder.admin.return.v51')==='1'){
   sessionStorage.removeItem('aulafinder.admin.return.v51');
   addEventListener('load',()=>{document.querySelector('[data-page="admin"]')?.click();hint.textContent='Dati salvati. Inserisci la password per continuare.';},{once:true});
 }}catch(_){}
 if(!API.loadResult.ok)hint.textContent='Attenzione: modifiche locali non valide. '+API.loadResult.error;
})();
