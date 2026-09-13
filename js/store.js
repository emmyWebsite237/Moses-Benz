/* Moses Benz Auto Care — shared car catalogue. Supabase is the editable source of truth; static cars remain the safe fallback. */
(function(global){
  const VIS_KEY='mbac_car_visibility_v1';
  const cache={cars:null};
  const clone=x=>JSON.parse(JSON.stringify(x));
  const readLocal=()=>{try{const x=JSON.parse(localStorage.getItem(VIS_KEY)||'{}');return x&&typeof x==='object'?x:{};}catch{return {};}};
  const writeLocal=x=>{try{localStorage.setItem(VIS_KEY,JSON.stringify(x));}catch{}};
  const applyVisibility=(list,flags)=>list.map(c=>({...c,active:flags[c.id]!==undefined?!!flags[c.id]:c.active!==false}));
  const staticById=()=>{const m=new Map();(global.MBCars||[]).forEach(c=>m.set(String(c.id),c));return m;};
  const fromRow=(x,baseMap)=>{
    const base=baseMap.get(String(x.id))||{};
    return {
      id:x.id,slug:x.slug||base.slug||x.id,name:x.name||base.name||'Mercedes-Benz',
      year:x.year??base.year??null,priceNGN:Number(x.price_ngn)>0?Number(x.price_ngn):Number(base.priceNGN||0),
      mileageKm:Number(x.mileage_km)>0?Number(x.mileage_km):Number(base.mileageKm||0),
      specTag:x.spec_tag||base.specTag||'',status:x.status||base.status||'available',
      brand:x.brand||base.brand||'Mercedes-Benz',image:x.image_url||base.image||'',
      description:x.description||base.description||'',condition:x.condition||base.condition||'',fuel:x.fuel||base.fuel||'',
      transmission:x.transmission||base.transmission||'',body:x.body||base.body||'',drivetrain:x.drivetrain||base.drivetrain||'',
      engineSize:x.engine_size||base.engineSize||'',cylinders:x.cylinders||base.cylinders||'',horsepower:x.horsepower||base.horsepower||'',
      color:x.color||base.color||'',interiorColor:x.interior_color||base.interiorColor||'',seats:x.seats||base.seats||'',
      registered:x.registered||base.registered||'',active:x.active!==false,searchAliases:base.searchAliases||[]
    };
  };
  function getCars(){if(cache.cars)return clone(cache.cars);const flags=readLocal();cache.cars=applyVisibility((global.MBCars||[]),flags);return clone(cache.cars);}
  async function hydrate(){
    const fallback=(global.MBCars||[]).map(c=>({...c,active:true}));
    let cars=fallback, flags=readLocal();
    if(global.MBBackend?.ready){
      try{
        const r=await global.MBBackend.get('inventory','select=*');
        if(r.ok&&Array.isArray(r.data)&&r.data.length){const bm=staticById();cars=r.data.map(x=>fromRow(x,bm));}
      }catch{}
      try{const r=await global.MBBackend.get('car_visibility','select=id,active');if(r.ok&&Array.isArray(r.data)){r.data.forEach(x=>{flags[x.id]=x.active!==false;});writeLocal(flags);}}catch{}
    }
    cache.cars=applyVisibility(cars,flags);
    global.dispatchEvent(new CustomEvent('mb:inventory-hydrated'));
    return getCars();
  }
  async function setActive(id,active){
    const flags=readLocal();flags[id]=!!active;writeLocal(flags);
    if(global.MBBackend?.ready){
      const s=(()=>{try{return JSON.parse(sessionStorage.getItem('mbac_admin_session')||'{}')}catch{return {}}})();
      const r=await global.MBBackend.rpc('admin_car_visibility_set',{p_username:s.username||'',p_password:s.password||'',p_id:id,p_active:!!active});
      if(!r.ok)throw new Error('Could not save the vehicle visibility setting.');
    }
    if(cache.cars)cache.cars=cache.cars.map(c=>c.id===id?{...c,active:!!active}:c);
    global.dispatchEvent(new CustomEvent('mb:inventory-hydrated'));return true;
  }
  async function saveCar(car){
    const s=(()=>{try{return JSON.parse(sessionStorage.getItem('mbac_admin_session')||'{}')}catch{return {}}})();
    if(!global.MBBackend?.ready)throw new Error('Supabase is not configured. Car edits cannot be shared yet.');
    const r=await global.MBBackend.rpc('admin_inventory_upsert',{p_username:s.username||'',p_password:s.password||'',p_id:car.id,p_slug:car.slug,p_name:car.name,p_year:Number(car.year)||null,p_price_ngn:Number(car.priceNGN)||0,p_mileage_km:Number(car.mileageKm)||0,p_spec_tag:car.specTag||'',p_status:car.status||'available',p_image_url:car.image||'',p_description:car.description||'',p_condition:car.condition||'',p_fuel:car.fuel||'',p_transmission:car.transmission||'',p_body:car.body||'',p_drivetrain:car.drivetrain||'',p_engine_size:car.engineSize||'',p_cylinders:car.cylinders||'',p_horsepower:car.horsepower||'',p_color:car.color||'',p_interior_color:car.interiorColor||'',p_seats:car.seats||'',p_registered:car.registered||'',p_active:car.active!==false});
    if(!r.ok)throw new Error('Could not save the vehicle. Run the supplied inventory migration SQL in Supabase first if this is a new database.');
    await hydrate(); return true;
  }
  async function syncStatic(){
    if(!global.MBBackend?.ready)return false;
    try{const existing=await global.MBBackend.get('inventory','select=id&limit=1');if(existing.ok&&Array.isArray(existing.data)&&existing.data.length){await hydrate();return true;}}catch{}
    const cars=(global.MBCars||[]).map(c=>({...c,active:true}));
    let ok=true;
    for(const c of cars){try{await saveCar(c);}catch{ok=false;}}
    await hydrate(); return ok;
  }
  async function deleteCar(id){
    if(!global.MBBackend?.ready)throw new Error('Supabase is not configured.');
    const s=(()=>{try{return JSON.parse(sessionStorage.getItem('mbac_admin_session')||'{}')}catch{return {}}})();
    const r=await global.MBBackend.rpc('admin_inventory_delete',{p_username:s.username||'',p_password:s.password||'',p_id:id});
    if(!r.ok)throw new Error('Could not delete the vehicle.');
    if(cache.cars)cache.cars=cache.cars.filter(c=>c.id!==id);
    await hydrate(); return true;
  }
  const formatNGN=amount=>{try{return new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(amount);}catch{return '₦'+Number(amount||0).toLocaleString('en-NG');}};
  const formatKm=km=>Number(km||0).toLocaleString('en-NG')+' km';
  global.MBStore={getCars,hydrate,setActive,saveCar,deleteCar,syncStatic,formatNGN,formatKm};
})(window);
