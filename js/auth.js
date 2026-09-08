/* Moses Benz Auto Care — simple Supabase admin login.
   No Supabase Auth. Password is verified by a Supabase RPC and is never
   returned to the browser. */
(() => {
  const cfg = window.MBAC_SUPABASE || {};
  let client = null, readyPromise = null;
  const SESSION_KEY = 'mbac_admin_session';

  function loadSdk() {
    if (window.supabase?.createClient) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function init() {
    if (readyPromise) return readyPromise;
    readyPromise = (async () => {
      if (!cfg.url || !cfg.anonKey) return null;
      await loadSdk();
      client = window.supabase.createClient(cfg.url, cfg.anonKey);
      return client;
    })().catch(() => null);
    return readyPromise;
  }

  function session() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
    catch { return null; }
  }

  async function adminSignIn(username, password) {
    const c = await init();
    if (!c) throw new Error('Supabase is not configured.');

    const clean = String(username || '').trim();
    if (!clean || !password) throw new Error('Username and password are required.');

    const { data, error } = await c.rpc('verify_admin_login', {
      p_username: clean,
      p_password: String(password)
    });
    if (error) throw error;
    if (!data?.ok) throw new Error('Incorrect username or password.');

    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      username: data.username,
      loginAt: Date.now()
    }));
    return data;
  }

  function isAdmin() { return Boolean(session()); }
  function getAdmin() { return session(); }

  async function signOut() {
    sessionStorage.removeItem(SESSION_KEY);
    location.replace('/mbac-control-7x4k9');
  }

  window.MBAAuth = { init, adminSignIn, isAdmin, getAdmin, signOut };
})();
