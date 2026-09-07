(() => {
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const formSubmit=async(payload)=>{const email=window.MBAC_FORMS?.workshopEmail;if(!email)return false;const body=new URLSearchParams({...payload,_subject:`Vehicle enquiry — ${payload.vehicle}`,_replyto:payload.buyerEmail,_captcha:'false',_template:'table'});try{const r=await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});return r.ok;}catch{return false;}};

  function initEnquiry(){
    const modal=document.getElementById('inventory-enquiry-modal'),form=document.getElementById('inventory-enquiry-form');if(!modal||!form||form.dataset.bound)return;form.dataset.bound='1';
    const status=document.getElementById('inventory-enquiry-status');
    const close=()=>{modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
    modal.querySelectorAll('[data-enquiry-close]').forEach(x=>x.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
    window.MBInventoryEnquiry={open(car){
      form.reset();
      form.querySelector('[name="vehicle"]').value=`${car.name} (${car.year||''})`;
      document.getElementById('enquiry-vehicle-note').textContent=`Requesting to purchase ${car.name}${car.year?` (${car.year})`:''}.`;
      status.textContent=''; modal.hidden=false; modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
      setTimeout(()=>form.querySelector('[name="buyerEmail"]')?.focus(),40);
    }};
    form.addEventListener('submit',async e=>{
      e.preventDefault(); const fd=new FormData(form);
      const payload={vehicle:String(fd.get('vehicle')).trim(),buyerEmail:String(fd.get('buyerEmail')).trim(),buyerWhatsApp:String(fd.get('buyerWhatsApp')).trim(),message:String(fd.get('message')).trim()};
      const btn=form.querySelector('button[type="submit"]'); btn.disabled=true; status.textContent='Sending request…';
      const ok=await formSubmit(payload); status.textContent=ok?'Request submitted successfully. We will contact you using the details provided.':'We could not send the request right now. Please try again.';
      if(ok)setTimeout(close,1200); btn.disabled=false;
    });
  }

  function initDetail(){
    const modal=document.getElementById('inventory-detail-modal');if(!modal||modal.dataset.bound)return;modal.dataset.bound='1';
    const close=()=>{modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
    modal.querySelectorAll('[data-detail-close]').forEach(x=>x.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
    window.MBInventoryDetail={open(car){
      modal.querySelector('[data-detail-image]').src=car.image; modal.querySelector('[data-detail-image]').alt=car.name;
      modal.querySelector('[data-detail-name]').textContent=car.name;
      modal.querySelector('[data-detail-price]').textContent=window.MBStore.formatNGN(car.priceNGN);
      modal.querySelector('[data-detail-spec]').textContent=[car.year,car.specTag,window.MBStore.formatKm(car.mileageKm)].filter(Boolean).join(' · ');
      modal.querySelector('[data-detail-description]').textContent=car.description||'Mercedes-Benz vehicle listing.';
      modal.querySelector('[data-detail-buy]').onclick=()=>window.MBInventoryEnquiry?.open(car);
      modal.hidden=false; modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
    }};
  }

  function getClass(name){
    const n=String(name||'').toUpperCase();
    const matches=['A','B','C','CLA','CLS','E','S','G','GLA','GLB','GLC','GLE','GLS','G-CLASS','SL','SLC','GT','EQ','MAYBACH','AMG'];
    // Prefer explicit multi-letter classes before single letters.
    const explicit=['G-CLASS','MAYBACH','AMG','GLS','GLE','GLC','GLB','GLA','CLS','CLA','SLC','SL','GT','EQ'];
    for(const key of explicit) if(new RegExp(`\\b${key.replace('-','[- ]')}\\b`).test(n)) return key==='G-CLASS'?'G-Class':key;
    const m=n.match(/\b([AB CEGS])\s?[-]?\s?\d{2,3}\b/); if(m) return `${m[1].replace(' ','')} Class`;
    for(const key of ['A','B','C','E','S','G']) if(new RegExp(`^MERCEDES[- ]BENZ\\s+${key}\\b`).test(n)) return `${key} Class`;
    return 'Other Mercedes';
  }

  function initInventoryPage(){
    const list=document.getElementById('inventory-list'),empty=document.getElementById('empty-state');if(!list||!empty||!window.MBStore)return;
    const input=document.getElementById('inventory-search-input');
    function card(car){
      const sold=car.status==='sold';
      return `<article class="car-card" data-id="${esc(car.id)}" tabindex="0" role="button" aria-label="View ${esc(car.name)}"><div class="car-media"><span class="car-status${sold?' sold':''}">${sold?'Sold':'Available'}</span><img src="${esc(car.image)}" alt="${esc(car.name)}" loading="lazy"></div><div class="car-body"><div class="car-heading"><h3>${esc(car.name)}</h3><span class="car-price">${window.MBStore.formatNGN(car.priceNGN)}</span></div><div class="car-specs"><span>${esc(car.year)}</span><span>${esc(car.specTag)}</span><span>${window.MBStore.formatKm(car.mileageKm)}</span></div><p class="desc">${esc(car.description||'')}</p><div class="car-cta"><span class="car-view-link">View vehicle →</span><button type="button" class="enquire-vehicle" data-id="${esc(car.id)}">${sold?'Enquire':'Request purchase'}</button></div></div></article>`;
    }
    function render(){
      const q=(input?.value||'').trim().toLowerCase(); let cars=window.MBStore.getCars().slice();
      if(q) cars=cars.filter(c=>[c.name,c.year,c.specTag,c.description].join(' ').toLowerCase().includes(q));
      const groups=new Map();
      cars.forEach(c=>{const key=getClass(c.name);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(c);});
      const preferred=['A Class','B Class','C Class','CLA','CLS','E Class','S Class','G Class','GLA','GLB','GLC','GLE','GLS','G-Class','GT','SL','SLC','EQ','AMG','MAYBACH','Other Mercedes'];
      const ordered=[...groups.entries()].sort((a,b)=>{const ai=preferred.indexOf(a[0]),bi=preferred.indexOf(b[0]);return (ai<0?999:ai)-(bi<0?999:bi)||a[0].localeCompare(b[0]);});
      list.innerHTML=ordered.map(([group,items])=>`<section class="inventory-category"><div class="inventory-category-head"><div><span class="eyebrow">Mercedes-Benz</span><h2>${esc(group)}</h2></div><span class="inventory-category-count">${items.length} vehicle${items.length===1?'':'s'}</span></div><div class="inventory-carousel"><button class="inventory-scroll prev" type="button" aria-label="Previous ${esc(group)} vehicles">‹</button><div class="inventory-track">${items.map(card).join('')}</div><button class="inventory-scroll next" type="button" aria-label="Next ${esc(group)} vehicles">›</button></div></section>`).join('');
      empty.hidden=cars.length>0;
      const count=document.getElementById('inventory-search-count');if(count)count.textContent=q?`${cars.length} result${cars.length===1?'':'s'}`:`${cars.length} vehicles`;
      list.querySelectorAll('.car-card').forEach(el=>{const car=window.MBStore.getCars().find(c=>c.id===el.dataset.id);el.addEventListener('click',e=>{if(e.target.closest('button'))return;if(car)window.MBInventoryDetail?.open(car);});el.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button')){e.preventDefault();if(car)window.MBInventoryDetail?.open(car);}});});
      list.querySelectorAll('.enquire-vehicle').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const car=window.MBStore.getCars().find(c=>c.id===b.dataset.id);if(car)window.MBInventoryEnquiry?.open(car);}));
      list.querySelectorAll('.inventory-category').forEach(section=>{const track=section.querySelector('.inventory-track');const step=()=>Math.max(track.clientWidth*.78,260);section.querySelector('.prev').onclick=()=>track.scrollBy({left:-step(),behavior:'smooth'});section.querySelector('.next').onclick=()=>track.scrollBy({left:step(),behavior:'smooth'});});
    }
    input?.addEventListener('input',render); window.addEventListener('mb:inventory-hydrated',render); render();
  }
  window.initInventoryPage=()=>{initEnquiry();initDetail();initInventoryPage();};
})();
