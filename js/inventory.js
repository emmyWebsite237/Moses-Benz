(() => {
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const seller=()=>String(window.MBSiteSettings?.whatsapp||'2348106958638').replace(/\D/g,'');
  function initDetail(){
    const modal=document.getElementById('inventory-detail-modal'); if(!modal||modal.dataset.bound)return; modal.dataset.bound='1';
    const close=()=>{modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
    modal.querySelectorAll('[data-detail-close]').forEach(x=>x.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
    window.MBInventoryDetail={open(car){
      const img=modal.querySelector('[data-detail-image]'); img.src=car.image||''; img.alt=car.name||'Vehicle';
      modal.querySelector('[data-detail-name]').textContent=car.name||'Vehicle';
      modal.querySelector('[data-detail-price]').textContent=window.MBStore.formatNGN(car.priceNGN);
      const set=(sel,value)=>{const el=modal.querySelector(sel);if(el)el.textContent=value||'—';};
      set('[data-detail-year]',car.year);set('[data-detail-engine]',car.specTag);set('[data-detail-mileage]',window.MBStore.formatKm(car.mileageKm));set('[data-detail-description]',car.description||'Contact the seller for availability, viewing and purchase details.');
      const btn=modal.querySelector('[data-detail-buy]'); if(btn)btn.onclick=()=>{const text=`Hello Moses Benz Auto Care, I am interested in the ${car.name}${car.year?` (${car.year})`:''} listed on your website. Is it still available?`;window.open(`https://wa.me/${seller()}?text=${encodeURIComponent(text)}`,'_blank','noopener');};
      modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
    }};
  }
  function getClass(car){
    const brand=String(car?.brand||'Mercedes-Benz').trim().toLowerCase();
    if(brand && brand!=='mercedes-benz')return null;
    const n=String(car?.name||'').toUpperCase();
    const explicit=['G-CLASS','MAYBACH','AMG','GLS','GLE','GLC','GLB','GLA','CLS','CLA','SLC','SL','GT','EQ'];
    for(const key of explicit)if(new RegExp(`\\b${key.replace('-','[- ]')}\\b`).test(n))return key==='G-CLASS'?'G-Class':key;
    const m=n.match(/\\b([ABCEGS])\\s?[-]?\\s?\\d{2,3}\\b/);if(m)return `${m[1]} Class`;
    for(const key of ['A','B','C','E','S','G'])if(new RegExp(`^MERCEDES[- ]BENZ\\s+${key}\\b`).test(n))return `${key} Class`;
    return 'Other Mercedes';
  }
  function initInventoryPage(){
    const list=document.getElementById('inventory-list'),empty=document.getElementById('empty-state');if(!list||!empty||!window.MBStore)return;
    const input=document.getElementById('inventory-search-input');
    function card(car){return `<article class="car-card" data-id="${esc(car.id)}" tabindex="0" role="button" aria-label="View ${esc(car.name)}"><div class="car-media"><img src="${esc(car.image)}" alt="${esc(car.name)}" loading="lazy"></div><div class="car-body"><div class="car-heading"><h3>${esc(car.name)}</h3><span class="car-price">${window.MBStore.formatNGN(car.priceNGN)}</span></div><div class="car-specs"><span>${esc(car.year)}</span><span>${esc(car.specTag)}</span><span>${window.MBStore.formatKm(car.mileageKm)}</span></div><p class="desc">${esc(car.description||'')}</p><div class="car-cta"><span class="car-view-link">View vehicle →</span><span class="car-whatsapp-hint">WhatsApp seller</span></div></div></article>`;}
    function render(){
      const q=(input?.value||'').trim().toLowerCase();let cars=window.MBStore.getCars().filter(c=>c.active!==false && String(c.brand||'Mercedes-Benz').toLowerCase()==='mercedes-benz').slice();if(q)cars=cars.filter(c=>[c.name,c.year,c.specTag,c.description].join(' ').toLowerCase().includes(q));
      const groups=new Map();cars.forEach(c=>{const key=getClass(c);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(c);});
      const order=['A Class','B Class','C Class','CLA','CLS','E Class','S Class','G-Class','GLA','GLB','GLC','GLE','GLS','SL','SLC','GT','EQ','Maybach','AMG','Other Mercedes'];
      const ordered=[...groups.entries()].sort((a,b)=>{const ai=order.indexOf(a[0]),bi=order.indexOf(b[0]);return (ai<0?999:ai)-(bi<0?999:bi)||a[0].localeCompare(b[0]);});
      list.innerHTML=ordered.map(([group,items])=>`<section class="inventory-category"><div class="inventory-category-head"><h2>${esc(group)}</h2></div><div class="inventory-carousel"><button class="inventory-scroll prev" type="button" aria-label="Previous ${esc(group)} vehicles">‹</button><div class="inventory-track">${items.map(card).join('')}</div><button class="inventory-scroll next" type="button" aria-label="Next ${esc(group)} vehicles">›</button></div></section>`).join('');
      empty.hidden=cars.length>0;const count=document.getElementById('inventory-search-count');if(count)count.textContent=q?`${cars.length} result${cars.length===1?'':'s'}`:'';
      list.querySelectorAll('.car-card').forEach(el=>{const car=window.MBStore.getCars().find(c=>c.id===el.dataset.id);el.addEventListener('click',()=>{if(car)window.MBInventoryDetail?.open(car);});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(car)window.MBInventoryDetail?.open(car);}});});
      list.querySelectorAll('.inventory-category').forEach(section=>{const track=section.querySelector('.inventory-track');if(!track)return;const step=()=>Math.max(Math.min(track.clientWidth*.78,track.clientWidth),260);section.querySelector('.prev').onclick=()=>{track.scrollBy({left:-step(),behavior:'smooth'});pauseAuto();};section.querySelector('.next').onclick=()=>{track.scrollBy({left:step(),behavior:'smooth'});pauseAuto();};let timer=null,pausedUntil=0;const pauseAuto=()=>{pausedUntil=Date.now()+6500;};const advance=()=>{if(Date.now()<pausedUntil||track.scrollWidth<=track.clientWidth+8)return;const max=track.scrollWidth-track.clientWidth;const next=track.scrollLeft+step();track.scrollTo({left:next>=max-6?0:next,behavior:'smooth'});};timer=setInterval(advance,3200);['pointerdown','touchstart','wheel','mouseenter','focusin'].forEach(ev=>track.addEventListener(ev,pauseAuto,{passive:true}));section._inventoryCarouselCleanup=()=>clearInterval(timer);});
    }
    input?.addEventListener('input',render);window.addEventListener('mb:inventory-hydrated',render);render();
  }
  window.initInventoryPage=()=>{initDetail();initInventoryPage();};
})();