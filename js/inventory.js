(() => {
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const seller=()=>String(window.MBSiteSettings?.whatsapp||'').replace(/\D/g,'');
  function detailUrl(car){return `/inventory/${encodeURIComponent(car.id)}`;}
  function openWhatsApp(car){
    const wa=seller(); if(!wa){alert('WhatsApp contact is not configured yet.');return;}
    const lines=[`Hello Moses Benz Auto Care, I am interested in this Mercedes-Benz listing:`,`${car.name} (${car.year||'Year not stated'})`,`Price: ${window.MBStore.formatNGN(car.priceNGN)}`,`Mileage: ${car.mileageKm?window.MBStore.formatKm(car.mileageKm):'Not stated'}`,`Condition: ${car.condition||car.status||'Not stated'}`,`Transmission: ${car.transmission||car.specTag||'Not stated'}`,`Engine: ${car.engineSize||car.specTag||'Not stated'}`,`Colour: ${car.color||'Not stated'}`,'','Please confirm availability and send the full current details.'];
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener');
  }
  function getClass(car){
    const brand=String(car?.brand||'Mercedes-Benz').trim().toLowerCase(); if(brand!=='mercedes-benz')return null;
    const n=String(car?.name||'').toUpperCase();
    const explicit=['G-CLASS','MAYBACH','AMG','GLS','GLE','GLC','GLB','GLA','CLS','CLA','SLC','SL','GT','EQ'];
    for(const key of explicit)if(new RegExp(`\\b${key.replace('-','[- ]')}\\b`).test(n))return key==='G-CLASS'?'G-Class':key;
    const m=n.match(/\b([ABCEGS])\s?[-]?\s?\d{2,3}\b/);if(m)return `${m[1]} Class`;
    return 'Other Mercedes';
  }
  function initInventoryPage(){
    const list=document.getElementById('inventory-list'),empty=document.getElementById('empty-state'); if(!list||!empty||!window.MBStore)return;
    const input=document.getElementById('inventory-search-input');
    function card(car){return `<article class="car-card" data-id="${esc(car.id)}" tabindex="0" role="link" aria-label="View ${esc(car.name)}"><div class="car-media"><img src="${esc(car.image||'images/moses-benz-logo.png')}" alt="${esc(car.name)}" loading="lazy" onerror="this.onerror=null;this.src='images/moses-benz-logo.png'"></div><div class="car-body"><div class="car-heading"><h3>${esc(car.name)}</h3><span class="car-price">${window.MBStore.formatNGN(car.priceNGN)}</span></div><div class="car-specs"><span>${esc(car.year)}</span><span>${esc(car.specTag)}</span><span>${car.mileageKm?window.MBStore.formatKm(car.mileageKm):'Mileage on request'}</span></div><p class="desc">${esc(car.description||'')}</p><div class="car-cta"><span class="car-view-link">View full details →</span><span class="car-whatsapp-hint">WhatsApp enquiry</span></div></div></article>`;}
    function render(){
      const q=(input?.value||'').trim().toLowerCase(); let cars=window.MBStore.getCars().filter(c=>c.active!==false && String(c.brand||'Mercedes-Benz').toLowerCase()==='mercedes-benz').slice();
      if(q)cars=cars.filter(c=>[c.name,c.year,c.specTag,c.description,c.condition,c.color,c.transmission,c.listingSource].join(' ').toLowerCase().includes(q));
      const groups=new Map(); cars.forEach(c=>{const key=getClass(c);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(c);});
      const order=['A Class','B Class','C Class','CLA','CLS','E Class','S Class','G-Class','GLA','GLB','GLC','GLE','GLS','SL','SLC','GT','EQ','Maybach','AMG','Other Mercedes'];
      const ordered=[...groups.entries()].sort((a,b)=>{const ai=order.indexOf(a[0]),bi=order.indexOf(b[0]);return(ai<0?999:ai)-(bi<0?999:bi)||a[0].localeCompare(b[0]);});
      list.innerHTML=ordered.map(([group,items])=>`<section class="inventory-category"><div class="inventory-category-head"><h2>${esc(group)}</h2></div><div class="inventory-carousel"><button class="inventory-scroll prev" type="button" aria-label="Previous ${esc(group)} vehicles">‹</button><div class="inventory-track">${items.map(card).join('')}</div><button class="inventory-scroll next" type="button" aria-label="Next ${esc(group)} vehicles">›</button></div></section>`).join('');
      empty.hidden=cars.length>0; const count=document.getElementById('inventory-search-count');if(count)count.textContent=q?`${cars.length} result${cars.length===1?'':'s'}`:'';
      list.querySelectorAll('.car-card').forEach(el=>{const car=cars.find(c=>c.id===el.dataset.id);const go=()=>{if(car)location.href=detailUrl(car);};el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
      list.querySelectorAll('.inventory-category').forEach(section=>{const track=section.querySelector('.inventory-track');if(!track)return;const step=()=>Math.max(Math.min(track.clientWidth*.78,track.clientWidth),260);let pausedUntil=0;const pauseAuto=()=>pausedUntil=Date.now()+6500;section.querySelector('.prev').onclick=()=>{track.scrollBy({left:-step(),behavior:'smooth'});pauseAuto();};section.querySelector('.next').onclick=()=>{track.scrollBy({left:step(),behavior:'smooth'});pauseAuto();};const advance=()=>{if(Date.now()<pausedUntil||track.scrollWidth<=track.clientWidth+8)return;const max=track.scrollWidth-track.clientWidth;const next=track.scrollLeft+step();track.scrollTo({left:next>=max-6?0:next,behavior:'smooth'});};const timer=setInterval(advance,3200);['pointerdown','touchstart','wheel','mouseenter','focusin'].forEach(ev=>track.addEventListener(ev,pauseAuto,{passive:true}));section._inventoryCarouselCleanup=()=>clearInterval(timer);});
    }
    input?.addEventListener('input',render); window.addEventListener('mb:inventory-hydrated',render); render();
  }
  function initVehicleDetail(){
    const root=document.getElementById('vehicle-detail-page'); if(!root||!window.MBStore)return;
    const params=new URLSearchParams(location.search); const id=params.get('car')||decodeURIComponent(location.pathname.split('/').pop()||'');
    const render=()=>{const car=window.MBStore.getCars().find(c=>String(c.id)===String(id)); if(!car){root.innerHTML='<div class="container"><div class="media-empty"><h1>Vehicle not found</h1><p>This listing may have been removed or is no longer available.</p><a class="btn btn-primary" href="/inventory">Back to Inventory</a></div></div>';return;}
      const specs=[['Year',car.year],['Condition',car.condition],['Transmission',car.transmission||car.specTag],['Fuel',car.fuel],['Mileage',car.mileageKm?window.MBStore.formatKm(car.mileageKm):'Not stated'],['Engine',car.engineSize||car.specTag],['Drivetrain',car.drivetrain],['Body',car.body],['Colour',car.color],['Interior',car.interiorColor],['Seats',car.seats],['Registration',car.registered]];
      const features=(car.features||[]).map(x=>`<li>${esc(x)}</li>`).join('');
      root.innerHTML=`<section class="vehicle-detail"><div class="container"><a href="/inventory" class="back-link">← Back to Inventory</a><div class="vehicle-detail-grid"><div class="vehicle-detail-media"><img src="${esc(car.image||'images/moses-benz-logo.png')}" alt="${esc(car.name)}" onerror="this.onerror=null;this.src='/images/moses-benz-logo.png'"></div><div class="vehicle-detail-copy"><span class="eyebrow">Mercedes-Benz · For Sale</span><h1>${esc(car.name)}</h1><div class="vehicle-price">${window.MBStore.formatNGN(car.priceNGN)}</div><p class="vehicle-description">${esc(car.description||'Contact Moses Benz Auto Care for current availability and full inspection details.')}</p><div class="vehicle-actions"><button class="btn btn-primary" id="vehicle-wa">Chat about this car on WhatsApp</button></div></div></div><div class="vehicle-detail-panel"><div><span class="eyebrow">Vehicle details</span><h2>Full specification</h2></div><div class="vehicle-spec-grid">${specs.filter(x=>x[1]!==undefined&&x[1]!==null&&String(x[1]).trim()!=='').map(x=>`<div><span>${esc(x[0])}</span><strong>${esc(x[1])}</strong></div>`).join('')}</div>${features?`<div class="vehicle-features"><h3>Listed features</h3><ul>${features}</ul></div>`:''}<p class="vehicle-note">Availability, price and specifications can change. When you chat with Moses Benz Auto Care, the message will include the vehicle details so the conversation starts with the exact car you viewed.</p></div></div></section>`;
      document.getElementById('vehicle-wa')?.addEventListener('click',()=>openWhatsApp(car));
    };
    window.addEventListener('mb:inventory-hydrated',render); render();
  }
  window.initInventoryPage=()=>initInventoryPage();
  window.initVehicleDetail=initVehicleDetail;
})();
