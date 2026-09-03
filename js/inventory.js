(function(){
  function initInventoryPage(){
    const listEl=document.getElementById('inventory-list'); const emptyEl=document.getElementById('empty-state');
    const filterBtns=document.querySelectorAll('.filter-btn'); if(!listEl||!emptyEl||!window.MBStore)return;
    let currentFilter='all';
    function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
    function card(car){const sold=car.status==='sold'; return `<div class="car-card" data-status="${esc(car.status)}"><div class="car-media"><span class="car-status${sold?' sold':''}">${sold?'Sold':'Available'}</span><img src="${esc(car.image)}" alt="${esc(car.name)}" loading="lazy"></div><div class="car-body"><div class="car-heading"><h3>${esc(car.name)}</h3><span class="car-price">${window.MBStore.formatNGN(car.priceNGN)}</span></div><div class="car-specs"><span>${esc(car.year)}</span><span>${esc(car.specTag)}</span><span>${window.MBStore.formatKm(car.mileageKm)}</span></div><p class="desc">${esc(car.description||'')}</p><div class="car-cta"><span class="car-specs"><span>VIN on request</span></span><a href="https://wa.me/2348106958638?text=${encodeURIComponent('Hello Moses Benz Auto Care. I am enquiring about the '+car.name+' ('+car.year+').')}" target="_blank" rel="noopener">${sold?'Notify me':'Enquire'} <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div></div></div>`;}
    function render(){let cars=window.MBStore.getCars(); let filtered=currentFilter==='all'?cars:cars.filter(c=>c.status===currentFilter); filtered.sort((a,b)=>a.status===b.status?0:a.status==='available'?-1:1); listEl.innerHTML=filtered.map(card).join(''); emptyEl.hidden=filtered.length>0;}
    filterBtns.forEach(btn=>{if(btn.dataset.bound)return;btn.dataset.bound='1';btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');currentFilter=btn.dataset.filter;render();});}); render();
  }
  window.initInventoryPage=initInventoryPage;
})();
