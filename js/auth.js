/* Supabase Auth helper. Customer auth is intentionally not used. Admin auth uses one configured username mapped to a Supabase Auth email. */
(() => {
  const cfg=window.MBAC_SUPABASE||{}; let client=null,readyPromise=null;
  function loadSdk(){if(window.supabase?.createClient)return Promise.resolve();return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
  async function init(){if(readyPromise)return readyPromise;readyPromise=(async()=>{if(!cfg.url||!cfg.anonKey)return null;await loadSdk();client=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});return client;})().catch(()=>null);return readyPromise;}
  async function getUser(){const c=await init();if(!c)return null;const {data}=await c.auth.getUser();return data?.user||null;}
  async function getAccessToken(){const c=await init();if(!c)return null;const {data}=await c.auth.getSession();return data?.session?.access_token||null;}
  async function adminSignIn(username,password){const expected=String(cfg.adminUsername||'').trim();if(!expected||username.trim()!==expected)throw new Error('Incorrect username or password.');const c=await init();if(!c)throw new Error('Supabase is not configured.');const {data,error}=await c.auth.signInWithPassword({email:cfg.adminEmail,password});if(error)throw error;return data;}
  async function signOut(){const c=await init();if(c)await c.auth.signOut();}
  async function updatePassword(password){const c=await init();if(!c)throw new Error('Supabase is not configured.');const {data,error}=await c.auth.updateUser({password});if(error)throw error;return data;}
  window.MBAAuth={init,getUser,getAccessToken,adminSignIn,signOut,updatePassword,configured:()=>Boolean(cfg.url&&cfg.anonKey&&cfg.adminUsername&&cfg.adminEmail)};
})();
