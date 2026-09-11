/* Moses Benz Auto Care — shared navigation, page transitions and forms */
(() => {
  const qs=(s,r=document)=>r.querySelector(s);
  const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal(root=document){
    const els=qsa('.reveal',root); if(!els.length)return;
    if('IntersectionObserver' in window && !reduced){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');ob.unobserve(e.target);}}),{threshold:.12});els.forEach(e=>ob.observe(e));}
    else els.forEach(e=>e.classList.add('is-visible'));
  }
  function initMarquee(root=document){qsa('.marquee-track',root).forEach(t=>{if(!t.dataset.duped){t.innerHTML+=t.innerHTML;t.dataset.duped='1';}});}
  function initHeader(){
    const header=qs('.site-header'); const toggle=qs('#nav-toggle'); const nav=qs('#main-nav'); if(!header||!toggle||!nav)return;
    const onScroll=()=>header.classList.toggle('is-scrolled',window.scrollY>40); onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
    const close=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');toggle.title='Open navigation menu';toggle.classList.remove('is-open');};
    const open=()=>{nav.classList.add('is-open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close navigation menu');toggle.title='Close navigation menu';toggle.classList.add('is-open');};
    toggle.addEventListener('click',()=>nav.classList.contains('is-open')?close():open());
    qsa('.main-nav a',nav).forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }
  function loadScript(src){return new Promise((resolve,reject)=>{const old=document.querySelector(`script[data-module="${src}"]`);if(old){resolve();return;}const s=document.createElement('script');s.src=src;s.dataset.module=src;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);});}
  function ensurePageLoader(){
    if(document.querySelector('.mb-page-loader'))return;
    const el=document.createElement('div');
    el.className='mb-page-loader';
    el.setAttribute('role','status');
    el.setAttribute('aria-live','polite');
    el.innerHTML='<div class="mb-loader-card"><span class="mb-loader-mark"></span><strong>Loading Moses Benz Auto Care</strong><span>Preparing the page…</span></div>';
    document.body.appendChild(el);
  }
  function preloadPageImages(){
    const imgs=qsa('#page-content img');
    imgs.forEach(img=>{img.loading='eager';img.decoding='sync';});
    const urls=new Set();
    imgs.forEach(img=>{
      const src=img.currentSrc||img.getAttribute('src')||img.dataset.src;
      if(src)urls.add(new URL(src,location.href).href);
    });
    qsa('#page-content *').forEach(el=>{
      const bg=getComputedStyle(el).backgroundImage||'';
      const m=bg.matchAll(/url\(["']?(.*?)["']?\)/g);
      for(const x of m)if(x[1])urls.add(new URL(x[1],location.href).href);
    });
    const waits=[...urls].map(src=>new Promise(resolve=>{
      const im=new Image();
      im.onload=im.onerror=()=>resolve();
      im.src=src;
      if(im.complete)resolve();
    }));
    const imgWaits=imgs.map(img=>new Promise(resolve=>{
      if(img.complete&&img.naturalWidth>0)return resolve();
      const done=()=>{img.removeEventListener('load',done);img.removeEventListener('error',done);resolve();};
      img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});
    }));
    return Promise.all([...waits,...imgWaits]);
  }
  async function waitForPageReady(){
    ensurePageLoader();
    const loader=document.querySelector('.mb-page-loader');
    const timeout=new Promise(resolve=>setTimeout(resolve,20000));
    await Promise.race([
      Promise.allSettled([preloadPageImages(),document.fonts?.ready||Promise.resolve()]),
      timeout
    ]);
    document.body.classList.add('mb-page-ready');
    loader?.classList.add('is-hidden');
    setTimeout(()=>loader?.remove(),350);
  }
  async function initModules(){
    await loadScript('/js/site-data.js');
    await loadScript('/js/form-config.js');
    await window.MBData?.hydrate?.(); await window.MBSiteSettingsAPI?.load?.(); await window.MBStore?.hydrate?.();
    if(qs('#home-inventory-list')){await loadScript('/js/home-inventory.js');window.initHomeInventory?.();}
    if(qs('#inventory-list')){await loadScript('/js/inventory.js');window.initInventoryPage?.();}
    if(qs('#appointment-form')){await loadScript('/js/searchable-select.js');await loadScript('/js/appointments.js');window.initAppointmentPage?.();}
    if(qs('#career-form')){await loadScript('/js/careers.js');window.initCareerPage?.();}
    if(qs('#blog-list')||qs('#blog-post')||qs('#home-blog-grid')){await loadScript('/js/blog.js');window.initBlogPage?.();}
    if(qs('#public-reviews-grid')){await loadScript('/js/reviews.js');window.initReviews?.();}
    if(qs('#before-after-grid')||qs('#credentials-grid')||qs('#home-credentials-strip')){await loadScript('/js/media.js');window.initBeforeAfter?.();window.initCredentials?.();window.initHomeCredentials?.();}
    initReveal();initMarquee();initBookingForm();initContactRoutes();
  }
  function initBookingForm(){
    const form=qs('#booking-form'); if(!form||form.dataset.bound)return; form.dataset.bound='1';
    form.addEventListener('submit',e=>{e.preventDefault();const name=qs('#bf-name')?.value.trim();const model=qs('#bf-model')?.value.trim();const phone=qs('#bf-phone')?.value.trim();const msg=`Hello Moses Benz Auto Care. I would like to request a callback.\nName: ${name}\nMercedes: ${model}\nPhone: ${phone}`;const wa=(window.MBSiteSettings?.whatsapp||'').replace(/\D/g,'');window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(msg),'_blank','noopener');});
  }
  function initContactRoutes(){
    qsa('a[href^="tel:"],a[href^="https://wa.me/"],a[target="_blank"]').forEach(a=>{a.addEventListener('click',()=>{const nav=qs('.main-nav');const t=qs('#nav-toggle');if(nav&&t){nav.classList.remove('is-open');t.classList.remove('is-open');t.setAttribute('aria-expanded','false');}});});
  }
  function setActive(url){const path=new URL(url,location.href).pathname.replace(/\/$/,'')||'/';qsa('.main-nav a').forEach(a=>{const p=new URL(a.href,location.href).pathname.replace(/\/$/,'')||'/';a.toggleAttribute('aria-current',p===path);});}
  async function navigate(url,push=true){
    const target=new URL(url,location.href); if(target.origin!==location.origin)return;
    const current=qs('#page-content'); if(!current)return window.location.href=target.href;
    try{
      document.body.classList.add('is-navigating'); document.body.classList.remove('mb-page-ready'); ensurePageLoader();
      const res=await fetch(target.href,{headers:{'X-Requested-With':'MosesBenzRouter'}}); if(!res.ok)throw new Error('Page not found');
      const text=await res.text(); const doc=new DOMParser().parseFromString(text,'text/html'); const next=doc.querySelector('#page-content'); if(!next)throw new Error('Invalid page shell');
      if(!reduced){current.classList.add('page-leave');await new Promise(r=>setTimeout(r,220));}
      current.innerHTML=next.innerHTML; current.className='page-transition page-enter';
      document.title=doc.title; const desc=doc.querySelector('meta[name="description"]'); const ours=qs('meta[name="description"]'); if(desc&&ours)ours.setAttribute('content',desc.content);
      if(push)history.pushState({url:target.href},'',target.href);
      setActive(target.href); window.scrollTo({top:0,behavior:reduced?'auto':'smooth'}); try{await initModules();}catch(err){console.error('Moses Benz page initialisation failed',err);} await waitForPageReady();
      requestAnimationFrame(()=>current.classList.add('page-enter-active'));
      setTimeout(()=>{current.classList.remove('page-enter','page-enter-active');document.body.classList.remove('is-navigating');},520);
    }catch(err){document.body.classList.remove('is-navigating');window.location.href=target.href;}
  }

  function initRouter(){
    document.addEventListener('click',e=>{const a=e.target.closest('a.page-route');if(!a)return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||a.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();navigate(href,true);});
    window.addEventListener('popstate',()=>navigate(location.href,false));
  }
  document.addEventListener('DOMContentLoaded',async()=>{ensurePageLoader();initHeader();initRouter();setActive(location.href);try{await initModules();}catch(err){console.error('Moses Benz page initialisation failed',err);}const year=qs('#year');if(year)year.textContent=new Date().getFullYear();await waitForPageReady();});
})();
