/* Moses Benz Auto Care — central inventory data layer. Supabase is the source of truth. */
(function(global) {
  const STORAGE_KEY='mbac_cars_cache_v3';
  const CARS_SEED=[
    {
        "id": "jiji-glc-2017-black",
        "name": "Mercedes-Benz GLC 300 4MATIC",
        "year": 2017,
        "priceNGN": 32000000,
        "mileageKm": 70000,
        "specTag": "2.0L Turbo · 4MATIC",
        "status": "available",
        "brand": "Mercedes-Benz",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes%20Benz%20GLC%20250%204Matic%202017%20%2852241371196%29.jpg",
        "imageCredit": "Jiji Nigeria listing",
        "description": "Foreign-used 2017 GLC 300 4MATIC, automatic, black, listed in Lagos. Listing details include 70,000 km and no-fault condition.",
        "condition": "Foreign Used",
        "fuel": "Petrol",
        "transmission": "Automatic",
        "body": "SUV",
        "drivetrain": "4WD / 4MATIC",
        "engineSize": "2000 cc",
        "color": "Black",
        "interiorColor": "Black",
        "registered": "No",
        "listingSource": "Jiji Nigeria",
        "listingUrl": "https://jiji.ng/ajah/cars/mercedes-benz-glc-class-2017-black-5tFZkcEsvbcquinzWzNssWjB.html"
    },
    {
        "id": "jiji-gle-400-2018-black-imesco",
        "name": "Mercedes-Benz GLE 400 4MATIC",
        "year": 2018,
        "priceNGN": 55000000,
        "mileageKm": 0,
        "specTag": "3.0L V6 · 4MATIC",
        "status": "available",
        "brand": "Mercedes-Benz",
        "image": "https://pictures-nigeria.jijistatic.net/188967811_NjIwLTQ2NS0wY2Y0MTUyMGIz.webp",
        "imageCredit": "Jiji Nigeria listing",
        "description": "Foreign-used 2018 GLE 400 4MATIC listing from Lagos. The listing describes full options, reverse camera, panoramic features, duty paid and navigation.",
        "condition": "Foreign Used",
        "fuel": "Petrol",
        "transmission": "Automatic",
        "body": "SUV",
        "drivetrain": "AWD / 4MATIC",
        "engineSize": "3000 cc",
        "cylinders": "6",
        "horsepower": "328 hp",
        "color": "Black",
        "seats": "5",
        "registered": "No",
        "listingSource": "Jiji Nigeria",
        "listingUrl": "https://jiji.ng/apapa/cars/mercedes-benz-gle-class-gle-400-4matic-2018-black-aZjqBfVkGnzbGOAdZlji5S7Q.html"
    },
    {
        "id": "jiji-gle-400-2018-black-apostles",
        "name": "Mercedes-Benz GLE 400 4MATIC",
        "year": 2018,
        "priceNGN": 45700000,
        "mileageKm": 86881,
        "specTag": "3.0L V6 · 4MATIC",
        "status": "available",
        "brand": "Mercedes-Benz",
        "image": "https://pictures-nigeria.jijistatic.net/197719966_MTExLTgzLWVmOTNhYWM2NmE.webp",
        "imageCredit": "Jiji Nigeria listing",
        "description": "Foreign-used 2018 GLE 400 4MATIC listing from Lagos with 86,881 km. Listing states clean title, no accident and full options.",
        "condition": "Foreign Used",
        "fuel": "Petrol",
        "transmission": "Automatic",
        "body": "SUV",
        "drivetrain": "AWD / 4MATIC",
        "engineSize": "3000 cc",
        "cylinders": "6",
        "horsepower": "328 hp",
        "color": "Black",
        "interiorColor": "Black",
        "seats": "5",
        "registered": "No",
        "listingSource": "Jiji Nigeria",
        "listingUrl": "https://jiji.ng/apapa/cars/mercedes-benz-gle-class-gle-400-4matic-2018-black-7x9UXvHwhUPiTu6siGxFy4D4.html"
    }
];
  const cache={cars:null};
  const clone=x=>JSON.parse(JSON.stringify(x));
  const localRead=()=>{try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');return Array.isArray(x)?x:null;}catch{return null;}};
  const localWrite=x=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(x));}catch{}};
  const emit=()=>window.dispatchEvent(new CustomEvent('mb:inventory-hydrated'));
  function getCars(){ if(cache.cars) return clone(cache.cars); const x=localRead(); cache.cars=x||clone(CARS_SEED); if(!x)localWrite(cache.cars); return clone(cache.cars); }
  async function hydrate(){
    if(!window.MBBackend?.ready){emit();return getCars();}
    const r=await window.MBBackend.get('inventory','select=*&order=created_at.desc');
    if(r.ok&&Array.isArray(r.data)){const mapped=r.data.map(x=>({id:x.id,name:x.name,brand:x.brand||'Mercedes-Benz',year:x.year,priceNGN:x.price_ngn,mileageKm:x.mileage_km,specTag:x.spec_tag,status:x.status,image:x.image_url,description:x.description||'',listingUrl:x.listing_url||'',listingSource:x.listing_source||'',condition:x.condition||'',fuel:x.fuel||'',transmission:x.transmission||'',body:x.body||'',drivetrain:x.drivetrain||'',engineSize:x.engine_size||'',cylinders:x.cylinders||'',horsepower:x.horsepower||'',color:x.color||'',interiorColor:x.interior_color||'',seats:x.seats||'',registered:x.registered||'',createdAt:x.created_at})); const external=mapped.filter(x=>x.listingUrl); cache.cars=external.length?mapped:clone(CARS_SEED); localWrite(cache.cars);}
    emit(); return getCars();
  }
  async function addCar(car){
    const id='car-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
    const item={id,status:'available',brand:car.brand||'Mercedes-Benz',...car};
    if(!window.MBBackend?.ready)throw new Error('Supabase is not configured. Connect the public key before editing shared inventory.'); if(window.MBBackend?.ready){const r=await window.MBBackend.post('inventory',{id:item.id,name:item.name,brand:item.brand||'Mercedes-Benz',year:item.year,price_ngn:item.priceNGN,mileage_km:item.mileageKm,spec_tag:item.specTag,status:item.status,image_url:item.image,description:item.description||'',listing_url:item.listingUrl||'',listing_source:item.listingSource||'',condition:item.condition||'',fuel:item.fuel||'',transmission:item.transmission||'',body:item.body||'',drivetrain:item.drivetrain||'',engine_size:item.engineSize||'',cylinders:item.cylinders||'',horsepower:item.horsepower||'',color:item.color||'',interior_color:item.interiorColor||'',seats:item.seats||'',registered:item.registered||'',active:true});if(!r.ok)throw new Error('Could not save vehicle to Supabase.');}
    cache.cars=[item,...getCars().filter(x=>x.id!==id)];localWrite(cache.cars);emit();return item;
  }
  async function updateCar(id,patch){
    const current=getCars().find(x=>x.id===id);if(!current)return false;
    const next={...current,...patch};
    if(!window.MBBackend?.ready)throw new Error('Supabase is not configured. Connect the public key before editing shared inventory.'); if(window.MBBackend?.ready){const r=await window.MBBackend.patch('inventory',`id=eq.${encodeURIComponent(id)}`,{name:next.name,brand:next.brand||'Mercedes-Benz',year:next.year,price_ngn:next.priceNGN,mileage_km:next.mileageKm,spec_tag:next.specTag,status:next.status,image_url:next.image,description:next.description||'',listing_url:next.listingUrl||'',listing_source:next.listingSource||'',condition:next.condition||'',fuel:next.fuel||'',transmission:next.transmission||'',body:next.body||'',drivetrain:next.drivetrain||'',engine_size:next.engineSize||'',cylinders:next.cylinders||'',horsepower:next.horsepower||'',color:next.color||'',interior_color:next.interiorColor||'',seats:next.seats||'',registered:next.registered||'',active:true});if(!r.ok)throw new Error('Could not update vehicle in Supabase.');}
    cache.cars=getCars().map(x=>x.id===id?next:x);localWrite(cache.cars);emit();return true;
  }
  async function deleteCar(id){if(!window.MBBackend?.ready)throw new Error('Supabase is not configured. Connect the public key before editing shared inventory.'); if(window.MBBackend?.ready){const r=await window.MBBackend.remove('inventory',`id=eq.${encodeURIComponent(id)}`);if(!r.ok)throw new Error('Could not delete vehicle from Supabase.');}cache.cars=getCars().filter(x=>x.id!==id);localWrite(cache.cars);emit();return true;}
  async function markSold(id){return updateCar(id,{status:'sold'});}
  async function markAvailable(id){return updateCar(id,{status:'available'});}
  const formatNGN=amount=>{try{return new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(amount);}catch{return '₦'+Number(amount||0).toLocaleString('en-NG');}};
  const formatKm=km=>Number(km||0).toLocaleString('en-NG')+' km';
  global.MBStore={getCars,hydrate,addCar,updateCar,deleteCar,markSold,markAvailable,formatNGN,formatKm};
})(window);
