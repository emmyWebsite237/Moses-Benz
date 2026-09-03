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
  async function initModules(){
    await loadScript('js/site-data.js');
    await loadScript('js/form-config.js');
    if(!window.MBAAuth) await loadScript('js/auth.js');
    await loadScript('js/customer-auth.js');
    await window.MBData?.hydrate?.();
    if(qs('#home-inventory-list')){await loadScript('js/home-inventory.js');window.initHomeInventory?.();}
    if(qs('#inventory-list')){await loadScript('js/inventory.js');window.initInventoryPage?.();}
    if(qs('#appointment-form')){await loadScript('js/appointments.js');window.initAppointmentPage?.();}
    if(qs('#diagnostic-option-grid')){renderDiagnosticOptions();}
    if(qs('#service-catalog-grid')||qs('#service-detail')){await loadScript('js/services.js');window.initServices?.();}
    if(qs('#before-after-grid')||qs('#credentials-grid')){await loadScript('js/media.js');window.initBeforeAfter?.();window.initCredentials?.();}
    initReveal();initMarquee();initBookingForm();initContactRoutes();renderAuthLinks();window.MBCustomer?.renderMenu?.();
  }
  function renderDiagnosticOptions(){
    const root=qs('#diagnostic-option-grid'); if(!root||!window.MBData)return;
    const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
    root.innerHTML=window.MBData.getDiagnostics().map(d=>`<article class="diagnostic-option"><span class="diag-code">${esc(d.code)}</span><h3>${esc(d.name)}</h3><p>${esc(d.description)}</p><a href="appointments.html?service=${encodeURIComponent(d.name)}" class="page-route">Book this →</a></article>`).join('');
  }
  function initBookingForm(){
    const form=qs('#booking-form'); if(!form||form.dataset.bound)return; form.dataset.bound='1';
    form.addEventListener('submit',e=>{e.preventDefault();const name=qs('#bf-name')?.value.trim();const model=qs('#bf-model')?.value.trim();const phone=qs('#bf-phone')?.value.trim();const msg=`Hello Moses Benz Auto Care. I would like to request a callback.\nName: ${name}\nMercedes: ${model}\nPhone: ${phone}`;window.open('https://wa.me/2349061526267?text='+encodeURIComponent(msg),'_blank','noopener');});
  }
  function initContactRoutes(){
    qsa('a[href^="tel:"],a[href^="https://wa.me/"],a[target="_blank"]').forEach(a=>{a.addEventListener('click',()=>{const nav=qs('.main-nav');const t=qs('#nav-toggle');if(nav&&t){nav.classList.remove('is-open');t.classList.remove('is-open');t.setAttribute('aria-expanded','false');}});});
  }
  function setActive(url){const path=new URL(url,location.href).pathname.split('/').pop()||'index.html';qsa('.main-nav a').forEach(a=>{const p=new URL(a.href,location.href).pathname.split('/').pop()||'index.html';a.toggleAttribute('aria-current',p===path);});}
  async function navigate(url,push=true){
    const target=new URL(url,location.href); if(target.origin!==location.origin)return;
    const current=qs('#page-content'); if(!current)return window.location.href=target.href;
    try{
      document.body.classList.add('is-navigating');
      const res=await fetch(target.href,{headers:{'X-Requested-With':'MosesBenzRouter'}}); if(!res.ok)throw new Error('Page not found');
      const text=await res.text(); const doc=new DOMParser().parseFromString(text,'text/html'); const next=doc.querySelector('#page-content'); if(!next)throw new Error('Invalid page shell');
      if(!reduced){current.classList.add('page-leave');await new Promise(r=>setTimeout(r,220));}
      current.innerHTML=next.innerHTML; current.className='page-transition page-enter';
      document.title=doc.title; const desc=doc.querySelector('meta[name="description"]'); const ours=qs('meta[name="description"]'); if(desc&&ours)ours.setAttribute('content',desc.content);
      if(push)history.pushState({url:target.href},'',target.href);
      setActive(target.href); window.scrollTo({top:0,behavior:reduced?'auto':'smooth'}); await initModules();
      requestAnimationFrame(()=>current.classList.add('page-enter-active'));
      setTimeout(()=>{current.classList.remove('page-enter','page-enter-active');document.body.classList.remove('is-navigating');},520);
    }catch(err){document.body.classList.remove('is-navigating');window.location.href=target.href;}
  }

  function renderAuthLinks(){
    const auth=document.querySelector('.header-auth');
    if(auth){
      auth.innerHTML='<a href="login.html">Log in</a><a href="signup.html">Sign up</a>';
      if(window.MBAAuth?.configured?.()){ window.MBAAuth.getUser().then(u=>{if(u)auth.innerHTML='<a href="index.html#account">My account</a><button type="button" class="header-logout">Log out</button>';auth.querySelector('.header-logout')?.addEventListener('click',async()=>{await window.MBAAuth.signOut();window.MBCustomer?.clear?.();location.reload();});}); }
    }
    const nav=document.querySelector('#main-nav ul');
    if(nav&&!nav.querySelector('.mobile-auth-links')){const li=document.createElement('li');li.className='mobile-auth-links';li.innerHTML='<a href="login.html">Log in</a><a href="signup.html">Sign up</a>';nav.appendChild(li);}
  }

  function initRouter(){
    document.addEventListener('click',e=>{const a=e.target.closest('a.page-route');if(!a)return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||a.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();navigate(href,true);});
    window.addEventListener('popstate',()=>navigate(location.href,false));
  }
  document.addEventListener('DOMContentLoaded',()=>{initHeader();initRouter();setActive(location.href);initModules();const year=qs('#year');if(year)year.textContent=new Date().getFullYear();});
})();
