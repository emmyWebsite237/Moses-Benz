/* Moses Benz Auto Care — Mercedes-Benz inventory and vehicle detail pages. */
(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const norm=s=>String(s??'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
  function getClass(car){
    const n=String(car?.name||'').toUpperCase();
    const explicit=['G-CLASS','MAYBACH','AMG GT','GLS','GLE','GLC','GLB','GLA','CLS','CLA','SLC','SL'];
    for(const key of explicit){if(n.includes(key))return key==='G-CLASS'?'G-Class':key;}
    const m=n.match(/\b([ABCEGS])\s?[-]?\s?\d{2,3}\b/);if(m)return `${m[1]} Class`;
    if(/^V\s/i.test(car?.name||''))return 'V-Class';
    return 'Other Mercedes';
  }
  function matches(car,q){
    const needle=norm(q);if(!needle)return true;
    const hay=[car.name,car.year,car.specTag,car.description,car.condition,car.color,car.transmission,car.body,car.engineSize,car.searchAliases?.join(' ')].map(norm).join(' ');
    return hay.includes(needle);
  }
  function detailUrl(car){return `/cars/${encodeURIComponent(car.slug)}/${encodeURIComponent(car.slug)}.html`;}
  function openWhatsApp(car){
    const wa=String(window.MBSiteSettings?.whatsapp||'').replace(/\D/g,'');
    if(!wa)return;
    const lines=['Hello Moses Benz Auto Care. I am interested in this Mercedes-Benz vehicle.',`Vehicle: ${car.name}`,`Year: ${car.year}`,`Price: ${window.MBStore.formatNGN(car.priceNGN)}`,`Mileage: ${window.MBStore.formatKm(car.mileageKm)}`,`Specification: ${car.specTag}`,'Please confirm availability and send the full current details.'];
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener');
  }
  function card(car){
    return `<article class="car-card" data-id="${esc(car.id)}" tabindex="0" role="link" aria-label="View ${esc(car.name)}"><div class="car-media"><img src="${esc(car.image)}" alt="${esc(car.name)}" loading="eager" decoding="async" onerror="this.onerror=null;this.src='/images/moses-benz-logo.png'"></div><div class="car-body"><div class="car-heading"><h3>${esc(car.name)}</h3><span class="car-price">${window.MBStore.formatNGN(car.priceNGN)}</span></div><div class="car-specs"><span>${esc(car.year)}</span><span>${esc(car.specTag)}</span><span>${window.MBStore.formatKm(car.mileageKm)}</span></div><p class="desc">${esc(car.description||'Mercedes-Benz vehicle available through Moses Benz Auto Care.')}</p><div class="car-cta"><span class="car-view-link">View full details →</span><span class="car-whatsapp-hint">WhatsApp enquiry</span></div></div></article>`;
  }
  function renderInventory(){
    const list=document.getElementById('inventory-list'),empty=document.getElementById('empty-state');if(!list||!empty||!window.MBStore)return;
    const input=document.getElementById('inventory-search-input');
    const q=input?.value||'';
    let cars=window.MBStore.getCars().filter(c=>c.active!==false && c.brand==='Mercedes-Benz');
    if(q.trim())cars=cars.filter(c=>matches(c,q));
    const groups=new Map();cars.forEach(c=>{const key=getClass(c);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(c);});
    const order=['A Class','B Class','C Class','CLA','CLS','E Class','S Class','G-Class','GLA','GLB','GLC','GLE','GLS','SL','SLC','GT','EQ','Maybach','AMG GT','AMG','V-Class','Other Mercedes'];
    const ordered=[...groups.entries()].sort((a,b)=>{const ai=order.indexOf(a[0]),bi=order.indexOf(b[0]);return(ai<0?999:ai)-(bi<0?999:bi)||a[0].localeCompare(b[0]);});
    list.innerHTML=ordered.map(([group,items])=>`<section class="inventory-category"><div class="inventory-category-head"><h2>${esc(group)}</h2><span class="inventory-category-count">${items.length} vehicle${items.length===1?'':'s'}</span></div><div class="inventory-carousel"><button class="inventory-scroll prev" type="button" aria-label="Previous ${esc(group)} vehicles">‹</button><div class="inventory-track">${items.map(card).join('')}</div><button class="inventory-scroll next" type="button" aria-label="Next ${esc(group)} vehicles">›</button></div></section>`).join('');
    empty.hidden=cars.length>0;
    const count=document.getElementById('inventory-search-count');if(count)count.textContent=q.trim()?`${cars.length} result${cars.length===1?'':'s'}`:'';
    list.querySelectorAll('.car-card').forEach(el=>{const car=cars.find(c=>c.id===el.dataset.id);const go=()=>{if(car)location.href=detailUrl(car);};el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
    list.querySelectorAll('.inventory-category').forEach(section=>{const track=section.querySelector('.inventory-track');if(!track)return;const step=()=>Math.max(Math.min(track.clientWidth*.78,track.clientWidth),260);let pausedUntil=0;const pause=()=>pausedUntil=Date.now()+3500;section.querySelector('.prev')?.addEventListener('click',()=>{pause();track.scrollBy({left:-step(),behavior:'smooth'});});section.querySelector('.next')?.addEventListener('click',()=>{pause();if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8)track.scrollTo({left:0,behavior:'smooth'});else track.scrollBy({left:step(),behavior:'smooth'});});setInterval(()=>{if(document.hidden||Date.now()<pausedUntil)return;if(track.scrollWidth<=track.clientWidth+8)return;if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8)track.scrollTo({left:0,behavior:'smooth'});else track.scrollBy({left:step(),behavior:'smooth'});},4000);});
  }
  function initInventoryPage(){if(!document.getElementById('inventory-list'))return;const input=document.getElementById('inventory-search-input');if(input&&!input.dataset.bound){input.dataset.bound='1';input.addEventListener('input',renderInventory);}window.addEventListener('mb:inventory-hydrated',renderInventory);renderInventory();}
  function initVehicleDetail(){
    const root=document.getElementById('vehicle-detail-page');if(!root||!window.MBStore)return;
    const id=decodeURIComponent(location.pathname.split('/').filter(Boolean).pop()||'');
    const car=window.MBStore.getCars().find(c=>c.slug===id)||window.MBStore.getCars().find(c=>c.id===id);
    if(!car){root.innerHTML='<div class="container"><div class="media-empty"><h1>Vehicle not found</h1><p>This Mercedes-Benz listing may have been removed or is not currently available.</p><a class="btn btn-primary" href="/inventory">Back to Inventory</a></div></div>';return;}
    const specs=[['Year',car.year],['Condition',car.condition],['Transmission',car.transmission||car.specTag],['Fuel',car.fuel],['Mileage',car.mileageKm?window.MBStore.formatKm(car.mileageKm):'Not stated'],['Body',car.body],['Drivetrain',car.drivetrain],['Engine',car.engineSize],['Cylinders',car.cylinders],['Power',car.horsepower],['Exterior colour',car.color],['Interior colour',car.interiorColor],['Seats',car.seats],['Registration',car.registered]];
    root.innerHTML=`<section class="vehicle-detail"><div class="container"><a class="back-link page-route" href="/inventory">← Back to Inventory</a><div class="vehicle-detail-grid"><div class="vehicle-detail-media"><img src="${esc(car.image)}" alt="${esc(car.name)}" loading="eager" decoding="async" onerror="this.onerror=null;this.src='/images/moses-benz-logo.png'"></div><div class="vehicle-detail-copy"><span class="eyebrow">Mercedes-Benz · For Sale</span><h1>${esc(car.name)}</h1><div class="vehicle-price">${window.MBStore.formatNGN(car.priceNGN)}</div><p class="vehicle-description">${esc(car.description||'Contact Moses Benz Auto Care for current availability and full inspection details.')}</p><div class="vehicle-actions"><button class="btn btn-primary" id="vehicle-wa">Chat about this car on WhatsApp</button></div></div></div><div class="vehicle-detail-panel"><div><span class="eyebrow">Vehicle details</span><h2>Full specification</h2></div><div class="vehicle-spec-grid">${specs.filter(x=>x[1]!==undefined&&x[1]!==null&&String(x[1]).trim()!=='').map(x=>`<div><span>${esc(x[0])}</span><strong>${esc(x[1])}</strong></div>`).join('')}</div><p class="vehicle-note">This is a Moses Benz Auto Care vehicle page. Availability and pricing can change. WhatsApp will include the vehicle details so the conversation starts with the exact car you viewed.</p></div></div></section>`;
    document.getElementById('vehicle-wa')?.addEventListener('click',()=>openWhatsApp(car));
  }
  window.initInventoryPage=initInventoryPage;window.initVehicleDetail=initVehicleDetail;
  if(document.getElementById('vehicle-detail-page'))window.addEventListener('mb:inventory-hydrated',initVehicleDetail);
})();
