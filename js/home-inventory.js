(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function initHomeInventory(){
    const el=document.getElementById('home-inventory-list');if(!el||!window.MBStore)return;
    const cars=window.MBStore.getCars().filter(c=>c.active!==false && c.brand==='Mercedes-Benz').slice(0,3);
    el.innerHTML=cars.map(c=>`<article class="car-card" data-home-car="${esc(c.id)}"><div class="car-media"><img src="${esc(c.image)}" alt="${esc(c.name)}" loading="eager" decoding="async" onerror="this.onerror=null;this.src='/images/moses-benz-logo.png'"></div><div class="car-body"><div class="car-heading"><h3>${esc(c.name)}</h3><span class="car-price">${window.MBStore.formatNGN(c.priceNGN)}</span></div><div class="car-specs"><span>${esc(c.year)}</span><span>${esc(c.specTag)}</span><span>${window.MBStore.formatKm(c.mileageKm)}</span></div><div class="car-cta"><a href="/cars/${encodeURIComponent(c.slug)}/${encodeURIComponent(c.slug)}.html" class="page-route">View details →</a></div></div></article>`).join('');
  }
  window.initHomeInventory=initHomeInventory;
  window.addEventListener('mb:inventory-hydrated',initHomeInventory);
})();
