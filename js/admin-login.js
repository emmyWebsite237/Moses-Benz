(() => {
  const KEY='mbac_admin_session_v4',SESSIONS='mbac_admin_active_sessions_v2',SESSION_ID=(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));
  const HASH='3e63b248812b2a9a92c8a8fe1f147f38d57ebb9e6d9685dee219d85f8400f089';
  const sessions=()=>{try{return JSON.parse(localStorage.getItem(SESSIONS)||'[]')}catch{return[]}};
  const claim=()=>{const cutoff=Date.now()-20*60*1000;const x=sessions().filter(s=>s.lastSeen>cutoff);if(x.length>=2)return false;x.push({id:SESSION_ID,lastSeen:Date.now()});localStorage.setItem(SESSIONS,JSON.stringify(x));return true;};
  async function hash(s){const h=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('');}
  document.addEventListener('DOMContentLoaded',()=>{const form=document.getElementById('admin-login-form'),err=document.getElementById('admin-login-error');if(!form)return;form.addEventListener('submit',async e=>{e.preventDefault();const ok=await hash(document.getElementById('admin-password').value)===HASH;if(!ok){err.hidden=false;err.textContent='Incorrect password.';return;}if(!claim()){err.hidden=false;err.textContent='Two admin sessions are already active on this device. Sign out one first.';return;}sessionStorage.setItem(KEY,'yes');location.replace('admin.html');});});
})();
