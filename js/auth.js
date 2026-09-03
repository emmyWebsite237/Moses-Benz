/* Moses Benz Auto Care — Supabase customer account helper.
   Uses the public/publishable key only. No service-role key belongs here. */
(() => {
  const cfg = window.MBAC_SUPABASE || {};
  const KEY = 'mbac_supabase_session_hint';
  let client = null;
  let readyPromise = null;

  function loadSdk(){
    if(window.supabase?.createClient) return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const existing=document.querySelector('script[data-supabase-sdk]');
      if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});return;}
      const s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.dataset.supabaseSdk='1'; s.onload=resolve; s.onerror=reject; document.head.appendChild(s);
    });
  }
  async function init(){
    if(readyPromise) return readyPromise;
    readyPromise=(async()=>{
      if(!cfg.url || !cfg.anonKey) return null;
      await loadSdk();
      client=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      return client;
    })().catch(()=>null);
    return readyPromise;
  }
  async function getUser(){const c=await init();if(!c)return null;const {data}=await c.auth.getUser();return data?.user||null;}
  async function signUp({name,email,password,phone}){
    const c=await init(); if(!c) throw new Error('Supabase is not configured yet.');
    const {data,error}=await c.auth.signUp({email,password,options:{data:{full_name:name||'',phone:phone||''}}});
    if(error) throw error;
    if(data.user) localStorage.setItem(KEY,'1');
    return data;
  }
  async function signIn(email,password){
    const c=await init(); if(!c) throw new Error('Supabase is not configured yet.');
    const {data,error}=await c.auth.signInWithPassword({email,password});
    if(error) throw error; localStorage.setItem(KEY,'1'); return data;
  }
  async function signOut(){const c=await init();if(c)await c.auth.signOut();localStorage.removeItem(KEY);}
  async function updateProfile({name,phone}){const c=await init();if(!c)throw new Error('Supabase is not configured yet.');const {data,error}=await c.auth.updateUser({data:{full_name:name||'',phone:phone||''}});if(error)throw error;return data.user;}
  function configured(){return Boolean(cfg.url&&cfg.anonKey);}
  window.MBAAuth={init,getUser,signUp,signIn,signOut,updateProfile,configured};
})();
