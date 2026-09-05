(function(){
  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
  function formSubmit(payload){
    const email=window.MBAC_FORMS?.workshopEmail;
    if(!email || email==='YOUR_WORKSHOP_EMAIL') return Promise.resolve(false);
    const body=new URLSearchParams({...payload,_subject:`Vehicle enquiry — ${payload.vehicle}`,_replyto:payload.buyerEmail,_captcha:'false',_template:'table'});
    return fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}).then(r=>r.ok).catch(()=>false);
  }
  function initEnquiry(){
    const modal=document.getElementById('inventory-enquiry-modal'),form=document.getElementById('inventory-enquiry-form'); if(!modal||!form||form.dataset.bound)return;
    form.dataset.bound='1'; const status=document.getElementById('inventory-enquiry-status');
    const close=()=>{modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
    document.querySelectorAll('[data-enquiry-close]').forEach(x=>x.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
    window.MBInventoryEnquiry={open(car){form.reset();form.querySelector('[name="vehicle"]').value=`${car.name} (${car.year})`;document.getElementById('enquiry-vehicle-note').textContent=`Enquiring about ${car.name} (${car.year}). Fill in your contact details and we will receive the request at the workshop.`;status.textContent='';modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>form.querySelector('[name="buyerName"]')?.focus(),50);}};
    form.addEventListener('submit',async e=>{e.preventDefault();const fd=new FormData(form);const payload={vehicle:String(fd.get('vehicle')).trim(),buyerName:String(fd.get('buyerName')).trim(),buyerEmail:String(fd.get('buyerEmail')).trim(),buyerPhone:String(fd.get('buyerPhone')).trim(),buyerWhatsApp:String(fd.get('buyerWhatsApp')).trim(),message:String(fd.get('message')).trim()};const btn=form.querySelector('button[type="submit"]');if(btn)btn.disabled=true;status.textContent='Sending enquiry…';const ok=await formSubmit(payload);if(ok){status.textContent='Enquiry sent successfully. We will contact you using the details you provided.';form.reset();form.querySelector('[name="vehicle"]').value=payload.vehicle;}else status.textContent='We could not send the enquiry right now. Please try again or contact the workshop directly.';if(btn)btn.disabled=false;});
  }
  function initInventoryPage(){
    const listEl=document.getElementById('inventory-list'); const emptyEl=document.getElementById('empty-state');
    const filterBtns=document.querySelectorAll('.filter-btn'); if(!listEl||!emptyEl||!window.MBStore)return;
    let currentFilter='all';
    function card(car){const sold=car.status==='sold'; return `<div class="car-card" id="car-${esc(car.id)}" data-status="${esc(car.status)}"><div class="car-media"><span class="car-status${sold?' sold':''}">${sold?'Sold':'Available'}</span><img src="${esc(car.image)}" alt="${esc(car.name)}" loading="lazy"></div><div class="car-body"><div class="car-heading"><h3>${esc(car.name)}</h3><span class="car-price">${window.MBStore.formatNGN(car.priceNGN)}</span></div><div class="car-specs"><span>${esc(car.year)}</span><span>${esc(car.specTag)}</span><span>${window.MBStore.formatKm(car.mileageKm)}</span></div><p class="desc">${esc(car.description||'')}</p><div class="car-cta"><span class="car-specs"><span>VIN on request</span></span><button type="button" class="enquire-vehicle" data-id="${esc(car.id)}">${sold?'Enquire about a similar car':'Enquire'} <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div></div></div>`;}
    function render(){let cars=window.MBStore.getCars(); let filtered=currentFilter==='all'?cars:cars.filter(c=>c.status===currentFilter); filtered.sort((a,b)=>a.status===b.status?0:a.status==='available'?-1:1); listEl.innerHTML=filtered.map(card).join(''); emptyEl.hidden=filtered.length>0;listEl.querySelectorAll('.enquire-vehicle').forEach(b=>b.addEventListener('click',()=>{const car=window.MBStore.getCars().find(c=>c.id===b.dataset.id);if(car)window.MBInventoryEnquiry?.open(car);}));}
    filterBtns.forEach(btn=>{if(btn.dataset.bound)return;btn.dataset.bound='1';btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');currentFilter=btn.dataset.filter;render();});}); render();
  }
  window.initInventoryPage=()=>{initEnquiry();initInventoryPage();};
})();
