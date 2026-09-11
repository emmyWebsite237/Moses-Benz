/* Moses Benz Auto Care — static GitHub car catalogue. No car data or images are read from Supabase. */
(function(global){
  const VIS_KEY='mbac_car_visibility_v1';
  const cache={cars:null};
  const clone=x=>JSON.parse(JSON.stringify(x));
  const readLocal=()=>{try{const x=JSON.parse(localStorage.getItem(VIS_KEY)||'{}');return x&&typeof x==='object'?x:{};}catch{return {};}};
  const writeLocal=x=>{try{localStorage.setItem(VIS_KEY,JSON.stringify(x));}catch{}};
  const norm=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
  function applyVisibility(list,flags){return list.map(c=>({...c,active:flags[c.id]!==undefined?!!flags[c.id]:c.active!==false}));}
  function getCars(){if(cache.cars)return clone(cache.cars);const flags=readLocal();cache.cars=applyVisibility((global.MBCars||[]),flags);return clone(cache.cars);}
  async function hydrate(){
    const base=(global.MBCars||[]).map(c=>({...c,active:true}));
    let flags=readLocal();
    if(global.MBBackend?.ready){
      try{const r=await global.MBBackend.get('car_visibility','select=id,active');if(r.ok&&Array.isArray(r.data)){flags={...flags};r.data.forEach(x=>{flags[x.id]=x.active!==false;});writeLocal(flags);}}catch{}
    }
    cache.cars=applyVisibility(base,flags);
    global.dispatchEvent(new CustomEvent('mb:inventory-hydrated'));
    return getCars();
  }
  async function setActive(id,active){
    const flags=readLocal();flags[id]=!!active;writeLocal(flags);
    if(global.MBBackend?.ready){
      const r=await global.MBBackend.rpc('admin_car_visibility_set',{p_username:(()=>{try{return JSON.parse(sessionStorage.getItem('mbac_admin_session')||'{}').username||'';}catch{return '';}})(),
      p_password:(()=>{try{return JSON.parse(sessionStorage.getItem('mbac_admin_session')||'{}').password||'';}catch{return '';}})(),p_id:id,p_active:!!active});
      if(!r.ok)throw new Error('Could not save the vehicle visibility setting.');
    }
    if(cache.cars)cache.cars=cache.cars.map(c=>c.id===id?{...c,active:!!active}:c);
    global.dispatchEvent(new CustomEvent('mb:inventory-hydrated'));return true;
  }
  const formatNGN=amount=>{try{return new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(amount);}catch{return '₦'+Number(amount||0).toLocaleString('en-NG');}};
  const formatKm=km=>Number(km||0).toLocaleString('en-NG')+' km';
  global.MBStore={getCars,hydrate,setActive,formatNGN,formatKm,norm};
})(window);
