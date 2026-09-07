(function(){
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const wa='2348106958638';
  function initInventoryPage(){
    const list=document.getElementById('inventory-list'), empty=document.getElementById('empty-state');
    if(!list||!empty||!window.MBStore)return;
    const search=document.getElementById('inventory-search'); const filters=[...document.querySelectorAll('.filter-btn')];
    let filter='all', query='';
    function modal(car){
      const old=document.querySelector('.modal-backdrop'); if(old)old.remove();
      const wrap=document.createElement('div'); wrap.className='modal-backdrop';
      wrap.innerHTML=`<div class="purchase-modal" role="dialog" aria-modal="true" aria-labelledby="purchase-title"><button class="modal-close" aria-label="Close">×</button><h2 id="purchase-title">Request ${esc(car.name)}</h2><p>${esc(car.year||'')} · ${esc(car.specTag||'')} · ${window.MBStore.formatNGN(car.priceNGN)}</p><form class="purchase-form" action="https://formsubmit.co/sammyemmy237@gmail.com" method="POST"><input type="hidden" name="_subject" value="Moses Benz Auto Care — Vehicle Purchase Enquiry"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="_template" value="table"><input type="hidden" name="vehicle" value="${esc(car.name)} (${esc(car.year||'')})"><label>Email<input name="email" type="email" required placeholder="you@example.com"></label><label>WhatsApp<input name="whatsapp" type="tel" required placeholder="080... / +234..."></label><label>What do you want to know?<textarea name="request" required placeholder="Tell us what you would like to know about this vehicle or your purchase request."></textarea></label><button class="btn btn-primary" type="submit">Submit Request</button></form></div>`;
      document.body.appendChild(wrap); const close=()=>wrap.remove(); wrap.querySelector('.modal-close').onclick=close; wrap.addEventListener('click',e=>{if(e.target===wrap)close()}); document.addEventListener('keydown',function h(e){if(e.key==='Escape'){close();document.removeEventListener('keydown',h)}});
    }
    function render(){let cars=window.MBStore.getCars(); if(filter!=='all')cars=cars.filter(c=>c.status===filter); if(query)cars=cars.filter(c=>`${c.name} ${c.year} ${c.specTag} ${c.description}`.toLowerCase().includes(query)); cars.sort((a,b)=>a.status===b.status?0:a.status==='available'?-1:1); list.innerHTML=cars.map(car=>`<article class="car-card" tabindex="0" data-id="${esc(car.id)}"><div class="car-media"><span class="car-status${car.status==='sold'?' sold':''}">${car.status==='sold'?'Sold':'Available'}</span><img src="${esc(car.image)}" alt="${esc(car.name)}" loading="lazy"></div><div class="car-body"><div class="car-heading"><h3>${esc(car.name)}</h3><span class="car-price">${window.MBStore.formatNGN(car.priceNGN)}</span></div><div class="car-specs"><span>${esc(car.year)}</span><span>${esc(car.specTag)}</span><span>${window.MBStore.formatKm(car.mileageKm)}</span></div><p class="desc">${esc(car.description||'')}</p><div class="car-cta"><span class="text-link">View vehicle →</span></div></div></article>`).join(''); empty.hidden=cars.length>0;
      list.querySelectorAll('.car-card').forEach(card=>{const car=cars.find(x=>String(x.id)===card.dataset.id);card.addEventListener('click',()=>modal(car));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();modal(car)}})});
    }
    filters.forEach(b=>b.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('is-active'));b.classList.add('is-active');filter=b.dataset.filter;render()}));
    search?.addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render()}); render();
  }
  window.initInventoryPage=initInventoryPage;
})();
