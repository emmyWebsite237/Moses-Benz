/* Customer identity for appointment requests.
   Supabase accounts are preferred when configured; a no-verification local identity remains the fallback. */
(() => {
  const KEY='mbac_customer_v2';
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}};
  const save=x=>localStorage.setItem(KEY,JSON.stringify(x));
  const clear=()=>localStorage.removeItem(KEY);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  async function syncSupabase(){
    if(!window.MBAAuth?.configured())return get();
    try{const u=await window.MBAAuth.getUser();if(!u)return get();const p={name:u.user_metadata?.full_name||u.email?.split('@')[0]||'Customer',email:u.email||'',phone:u.user_metadata?.phone||''};save(p);return p;}catch{return get();}
  }
  function renderMenu(){
    document.querySelectorAll('.customer-account-item').forEach(el=>el.remove());
    const p=get(); if(!p)return;
    document.querySelectorAll('.main-nav ul').forEach(ul=>{
      const li=document.createElement('li');li.className='customer-account-item';
      li.innerHTML=`<button type="button" class="mobile-logout">Log out <span>${esc(p.name)}</span></button>`;
      li.querySelector('button').onclick=async()=>{try{await window.MBAAuth?.signOut?.()}catch{}clear();location.reload();};ul.insertBefore(li,ul.firstChild);
    });
  }
  async function init(){
    const profile=await syncSupabase();renderMenu();
    const gate=document.getElementById('customer-login'),form=document.getElementById('customer-login-form'),area=document.getElementById('appointment-area');
    if(gate&&form&&area){
      if(profile){gate.hidden=true;area.hidden=false;fill(profile);} else {gate.hidden=false;area.hidden=true;}
      if(!form.dataset.bound){form.dataset.bound='1';form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const p={name:String(fd.get('name')).trim(),email:String(fd.get('email')).trim(),phone:String(fd.get('phone')).trim()};save(p);gate.hidden=true;area.hidden=false;fill(p);renderMenu();});}
    }
  }
  function fill(p){['name','email','phone'].forEach(k=>{const el=document.querySelector(`#appointment-form [name="${k}"]`);if(el)el.value=p[k]||''});const badge=document.getElementById('customer-session-note');if(badge)badge.textContent=`Signed in as ${p.name} · ${p.email}`;}
  window.MBCustomer={get,save,clear,init,renderMenu,syncSupabase};
})();
