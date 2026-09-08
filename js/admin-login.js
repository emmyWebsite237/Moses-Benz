/* Moses Benz Auto Care — simple admin table login. No Supabase Auth. */
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('admin-login-form');
    const err = document.getElementById('admin-login-error');
    if (!form) return;

    if (sessionStorage.getItem('mbac_admin_session')) {
      location.replace('/mbac-control-7x4k9/portal');
      return;
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn=form.querySelector('button[type="submit"]');
      const username=document.getElementById('admin-username')?.value.trim();
      const password=document.getElementById('admin-password')?.value || '';
      if (btn) btn.disabled=true;
      if (err) err.hidden=true;

      try {
        if (!window.MBAC_SUPABASE?.url || !window.MBAC_SUPABASE?.anonKey) {
          throw new Error('Supabase is not configured.');
        }
        if (!window.supabase?.createClient) {
          await new Promise((resolve,reject)=>{
            const s=document.createElement('script');
            s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            s.onload=resolve; s.onerror=reject; document.head.appendChild(s);
          });
        }
        const client=window.supabase.createClient(
          window.MBAC_SUPABASE.url,
          window.MBAC_SUPABASE.anonKey
        );
        const {data,error}=await client.rpc('verify_admin_login',{
          p_username: username,
          p_password: password
        });
        if(error) throw error;
        const result=Array.isArray(data)?data[0]:data;
        if(!result?.authenticated) throw new Error('Incorrect username or password.');

        sessionStorage.setItem('mbac_admin_session', JSON.stringify({
          username: result.username,
          loggedInAt: Date.now(), password
        }));
        location.replace('/mbac-control-7x4k9/portal');
      } catch(ex) {
        if(err){err.hidden=false;err.textContent=ex?.message||'Incorrect username or password.';}
      } finally {
        if(btn) btn.disabled=false;
      }
    });
  });
})();
