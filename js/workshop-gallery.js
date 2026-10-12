/* Moses Benz Auto Care — homepage workshop gallery. Add photographs to /images/workshop-gallery and list filenames below. */
(() => {
  const photos=Array.from({length:12},(_,i)=>[`img${i+1}`,`Moses Benz workshop image ${i+1}`]);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function init(){
    const root=document.getElementById('workshop-gallery-carousel');if(!root)return;
    const usable=photos.filter(p=>p[0]);
    const slideMarkup=usable.map(p=>`<figure class="workshop-gallery-slide"><img src="/images/workshop-gallery/${esc(p[0])}.jpg" alt="${esc(p[1])}" loading="lazy" decoding="async" onerror="this.dataset.ext=(Number(this.dataset.ext||0)+1);const e=['jpg','jpeg','png','webp'][Number(this.dataset.ext)];if(e)this.src='/images/workshop-gallery/${esc(p[0])}.'+e;else this.closest('figure')?.remove()"><figcaption>${esc(p[1])}</figcaption></figure>`).join('');
    root.innerHTML=`<div class="workshop-gallery-viewport"><div class="workshop-gallery-track">${slideMarkup}</div></div>`;
    const track=root.querySelector('.workshop-gallery-track');
    const originalSlides=[...track.children];
    if(originalSlides.length<2)return;
    const originalCount=originalSlides.length;
    track.innerHTML=originalSlides.map(el=>el.outerHTML).concat(originalSlides.map(el=>el.outerHTML)).join('');
    const slides=[...track.children];
    let index=0,timer;
    const offset=i=>slides[i].offsetLeft-slides[0].offsetLeft;
    const move=()=>{index++;track.style.transform=`translateX(-${offset(index)}px)`;};
    track.style.transition='transform .65s cubic-bezier(.2,.75,.2,1)';
    track.addEventListener('transitionend',()=>{
      if(index>=originalCount){
        track.style.transition='none';index=0;track.style.transform='translateX(0)';
        requestAnimationFrame(()=>requestAnimationFrame(()=>{track.style.transition='transform .65s cubic-bezier(.2,.75,.2,1)';}));
      }
    });
    timer=window.setInterval(()=>{if(!document.hidden)move();},3000);
    window.addEventListener('pagehide',()=>window.clearInterval(timer),{once:true});
    window.addEventListener('resize',()=>{
      track.style.transition='none';track.style.transform=`translateX(-${offset(index)}px)`;
      requestAnimationFrame(()=>{track.style.transition='transform .65s cubic-bezier(.2,.75,.2,1)';});
    },{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
