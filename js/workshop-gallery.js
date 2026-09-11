/* Add or replace photographs in /images/workshop-gallery and list their filenames here. */
(() => {
  const photos=[
    ['workshop-yard.jpg','Our yard on Lasu Rd — several bays working at once.'],
    ['street-cars.jpg','Cars in and around the workshop.'],
    ['workshop-technicians.jpg','Our technicians at work.'],
    ['front.jpg','The workshop frontage.'],
    ['landmark-fuel-station.jpg','Our local Idimu surroundings.']
  ];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function init(){
    const root=document.getElementById('workshop-gallery-carousel');if(!root)return;
    root.innerHTML=`<div class="workshop-gallery-viewport"><div class="workshop-gallery-track">${photos.map((p,i)=>`<figure class="workshop-gallery-slide${i===0?' is-active':''}"><img src="/images/workshop-gallery/${esc(p[0])}" alt="${esc(p[1])}" loading="eager" decoding="async"><figcaption>${esc(p[1])}</figcaption></figure>`).join('')}</div></div><button class="workshop-gallery-arrow prev" type="button" aria-label="Previous workshop photo">‹</button><button class="workshop-gallery-arrow next" type="button" aria-label="Next workshop photo">›</button>`;
    const slides=[...root.querySelectorAll('.workshop-gallery-slide')];let i=0,timer;
    const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle('is-active',j===i));};
    const next=()=>show(i+1),prev=()=>show(i-1);
    const start=()=>{clearInterval(timer);timer=setInterval(next,2800)};
    root.querySelector('.next').onclick=()=>{next();start()};root.querySelector('.prev').onclick=()=>{prev();start()};start();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
