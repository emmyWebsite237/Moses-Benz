(() => {
  const q=s=>document.querySelector(s);
  const setStatus=(msg,ok=false)=>{const el=q('#auth-status');if(el){el.textContent=msg;el.classList.toggle('is-success',ok);}};
  async function boot(){
    if(!window.MBAAuth) return;
    if(!window.MBAAuth.configured()){setStatus('Supabase is not configured yet. Add the project URL and publishable key in js/supabase-config.js.');return;}
    const login=q('#login-form');
    if(login){
      login.addEventListener('submit',async e=>{e.preventDefault();const b=login.querySelector('button[type=submit]');b.disabled=true;setStatus('Signing you in…');try{await window.MBAAuth.signIn(String(login.email.value).trim(),login.password.value);setStatus('Signed in. Redirecting…',true);setTimeout(()=>location.href='/',450);}catch(err){setStatus(err.message||'Could not sign in.');}finally{b.disabled=false;}});
    }
    const signup=q('#signup-form');
    if(signup){
      signup.addEventListener('submit',async e=>{e.preventDefault();const b=signup.querySelector('button[type=submit]');b.disabled=true;setStatus('Creating your account…');try{const data=await window.MBAAuth.signUp({name:String(signup.name.value).trim(),email:String(signup.email.value).trim(),phone:String(signup.phone.value).trim(),password:signup.password.value});if(data.session){setStatus('Account created. Redirecting…',true);setTimeout(()=>location.href='/',450);}else{setStatus('Account created, but Supabase email confirmation is enabled. Turn off Confirm email in Supabase Auth settings if you want no verification.');}}catch(err){setStatus(err.message||'Could not create the account.');}finally{b.disabled=false;}});
    }
  }
  document.addEventListener('DOMContentLoaded',boot);
})();
