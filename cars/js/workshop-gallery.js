/* Moses Benz Auto Care — homepage workshop gallery. Add photographs to /images/workshop-gallery and list filenames below. */
(() => {
  const photos=Array.from({length:12},(_,i)=>[`img${i+1}`,`Moses Benz workshop image ${i+1}`]);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function init(){
    const root=document.getElementById('workshop-gallery-carousel');if(!root)return;
    const usable=photos.filter(p=>p[0]);
    const slides=usable.map(p=>`<figure class="workshop-gallery-slide"><img src="/images/workshop-gallery/${esc(p[0])}.jpg" alt="${esc(p[1])}" loading="lazy" decoding="async" onerror="this.dataset.ext=(Number(this.dataset.ext||0)+1);const e=['jpg','jpeg','png','webp'][Number(this.dataset.ext)];if(e)this.src='/images/workshop-gallery/${esc(p[0])}.'+e;else this.closest('figure')?.remove()"><figcaption>${esc(p[1])}</figcaption></figure>`).join('');
    root.innerHTML=`<div class="workshop-gallery-viewport"><div class="workshop-gallery-track">${slides}</div></div>`;
    const track=root.querySelector('.workshop-gallery-track'); const items=[...track.children]; if(items.length<2)return;
    // Clone once so the movement can pass the end and continue naturally.
    track.innerHTML=items.map(x=>x.outerHTML).concat(items.map(x=>x.outerHTML)).join('');
    const all=[...track.children]; const originalCount=items.length; let index=0; let timer;
    const step=()=>Math.max(root.querySelector('.workshop-gallery-slide')?.getBoundingClientRect().width||0,260);
    const move=()=>{index++;track.style.transform=`translateX(-${index*step()}px)`;};
    track.addEventListener('transitionend',()=>{if(index>=originalCount){track.style.transition='none';index=0;track.style.transform='translateX(0)';requestAnimationFrame(()=>requestAnimationFrame(()=>track.style.transition='transform .65s cubic-bezier(.2,.75,.2,1)'));}});
    track.style.transition='transform .65s cubic-bezier(.2,.75,.2,1)';
    const start=()=>{clearInterval(timer);timer=setInterval(move,3000)}; start();
    window.addEventListener('resize',()=>{track.style.transition='none';track.style.transform=`translateX(-${index*step()}px)`;requestAnimationFrame(()=>track.style.transition='transform .65s cubic-bezier(.2,.75,.2,1)')},{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
