(() => {
  const cfg=window.MBAC_SUPABASE||{};
  const ready=Boolean(cfg.url&&cfg.anonKey&&/^https:\/\/[^\s]+\.supabase\.co$/.test(cfg.url));
  async function request(table,options={}){
    if(!ready)return {ok:false,configured:false,data:null};
    const {method='GET',query='',body}=options;
    const r=await fetch(`${cfg.url}/rest/v1/${table}${query?`?${query}`:''}`,{method,headers:{apikey:cfg.anonKey,Authorization:`Bearer ${cfg.anonKey}`,'Content-Type':'application/json',Prefer:'return=representation'},body:body===undefined?undefined:JSON.stringify(body)});
    let data=null;try{data=await r.json();}catch{}
    return {ok:r.ok,configured:true,data,status:r.status};
  }
  const get=(table,query='')=>request(table,{query});
  const post=(table,payload)=>request(table,{method:'POST',body:payload});
  const patch=(table,query,payload)=>request(table,{method:'PATCH',query,body:payload});
  const remove=(table,query)=>request(table,{method:'DELETE',query});
  window.MBBackend={ready,get,post,patch,remove,request};
})();
