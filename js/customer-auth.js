/* Passwordless customer identity for appointment requests. No verification is required. */
(() => {
  const KEY='mbac_customer_v1';
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}};
  const save=x=>localStorage.setItem(KEY,JSON.stringify(x));
  const clear=()=>localStorage.removeItem(KEY);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  function renderMenu(){
    document.querySelectorAll('.customer-logout-item').forEach(el=>el.remove());
    if(!get())return;
    document.querySelectorAll('.main-nav ul').forEach(ul=>{
      const li=document.createElement('li');li.className='customer-logout-item';
      li.innerHTML=`<button type="button" class="mobile-logout">Log out <span>${esc(get().name)}</span></button>`;
      li.querySelector('button').onclick=()=>{clear();location.reload();};ul.appendChild(li);
    });
  }
  function init(){
    renderMenu();
    const gate=document.getElementById('customer-login');const form=document.getElementById('customer-login-form');const area=document.getElementById('appointment-area');const profile=get();
    if(gate&&form&&area){
      if(profile){gate.hidden=true;area.hidden=false;fill(profile);} else {gate.hidden=false;area.hidden=true;}
      form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const p={name:String(fd.get('name')).trim(),email:String(fd.get('email')).trim(),phone:String(fd.get('phone')).trim()};save(p);gate.hidden=true;area.hidden=false;fill(p);renderMenu();});
    }
    document.getElementById('customer-logout')?.addEventListener('click',()=>{clear();location.reload();});
  }
  function fill(p){['name','email','phone'].forEach(k=>{const el=document.querySelector(`#appointment-form [name="${k}"]`);if(el&&!el.value)el.value=p[k]||''});const badge=document.getElementById('customer-session-note');if(badge)badge.textContent=`Signed in as ${p.name} · ${p.email}`;}
  window.MBCustomer={get,save,clear,init,renderMenu};
})();
