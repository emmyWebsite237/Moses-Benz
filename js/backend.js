(() => {
  const cfg=window.MBAC_SUPABASE||{};
  const ready=Boolean(cfg.url&&cfg.anonKey&&/^https:\/\/[^\s]+\.supabase\.co$/.test(cfg.url));
  async function post(table,payload){if(!ready)return {ok:false,configured:false};const r=await fetch(`${cfg.url}/rest/v1/${table}`,{method:'POST',headers:{apikey:cfg.anonKey,Authorization:`Bearer ${cfg.anonKey}`, 'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(payload)});return {ok:r.ok,configured:true};}
  window.MBBackend={ready,post};
})();
