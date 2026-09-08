/* Shared Supabase REST helper — no Supabase Auth/customer authentication. */
(() => {
  const cfg = window.MBAC_SUPABASE || {};
  const ready = Boolean(cfg.url && cfg.anonKey && /^https:\/\/[^\s]+\.supabase\.co$/.test(cfg.url));

  async function request(table, options = {}) {
    if (!ready) return { ok:false, configured:false, data:null };
    const { method='GET', query='', body } = options;
    const r = await fetch(`${cfg.url}/rest/v1/${table}${query ? `?${query}` : ''}`, {
      method,
      headers: {
        apikey: cfg.anonKey,
        Authorization: `Bearer ${cfg.anonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    let data = null;
    try { data = await r.json(); } catch {}
    return { ok:r.ok, configured:true, data, status:r.status };
  }

  window.MBBackend = {
    ready,
    get:(t,q='')=>request(t,{query:q}),
    post:(t,b)=>request(t,{method:'POST',body:b}),
    patch:(t,q,b)=>request(t,{method:'PATCH',query:q,body:b}),
    remove:(t,q)=>request(t,{method:'DELETE',query:q})
  };
})();
