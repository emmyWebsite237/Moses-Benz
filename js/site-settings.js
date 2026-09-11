/* Moses Benz Auto Care — public contact/social settings from Supabase. */
(() => {
  const blank = { phone:'', whatsapp:'', email:'', instagram:'', facebook:'', youtube:'', tiktok:'', x:'' };
  const clean=v=>String(v||'').replace(/[^\d+]/g,'').replace(/^\+/,'');
  const normalise=r=>({...blank,...(r||{})});
  function gmailCompose(email){
    const to=encodeURIComponent(String(email||''));
    const web=`https://mail.google.com/mail/?view=cm&fs=1&to=${to}`;
    const isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent||'');
    if(!isMobile){window.open(web,'_blank','noopener');return;}
    let fallback=setTimeout(()=>{window.location.href=web;},900);
    const cancel=()=>{clearTimeout(fallback);document.removeEventListener('visibilitychange',cancel);};
    document.addEventListener('visibilitychange',cancel,{once:true});
    window.location.href=`googlegmail:///co?to=${to}`;
  }
  function bindEmail(){
    document.querySelectorAll('[data-email-action="1"]').forEach(a=>{
      if(a.dataset.emailBound)return; a.dataset.emailBound='1';
      a.addEventListener('click',e=>{e.preventDefault(); if(window.MBSiteSettings?.email) gmailCompose(window.MBSiteSettings.email);});
    });
  }
  function ensureFloating(){
    if(document.querySelector('.contact-fab-stack'))return;
    const wrap=document.createElement('div'); wrap.className='contact-fab-stack'; wrap.setAttribute('aria-label','Quick contact');
    wrap.innerHTML=`<a class="contact-fab contact-fab-call" data-contact="phone" href="#" aria-label="Call Moses Benz Auto Care" title="Call us"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 2.8 9.1 2c.7-.2 1.4.2 1.7.9l1.1 3c.2.6 0 1.2-.5 1.6L9.9 8.8c1.1 2.3 3 4.2 5.3 5.3l1.3-1.5c.4-.5 1-.7 1.6-.5l3 1.1c.7.3 1.1 1 .9 1.7l-.8 2.5c-.2.7-.9 1.2-1.6 1.2C11 18.6 5.4 13 5.4 5.4c0-.7.5-1.4 1.2-1.6Z" fill="currentColor"/></svg></a><a class="contact-fab contact-fab-whatsapp" data-contact="whatsapp" href="#" target="_blank" rel="noopener" aria-label="WhatsApp Moses Benz Auto Care" title="WhatsApp us"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.6 21.5l4.8-1.2A9.5 9.5 0 1 0 12 2.5Zm0 17.1a7.6 7.6 0 0 1-3.9-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A7.6 7.6 0 1 1 12 19.6Zm4.2-5.7c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.2-.2.2-.4.1-.2-.1-.8-.3-1.6-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.3.1-.1 0-.2 0-.3 0-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.3 0-.4.2-.2.2-.6.6-.6 1.5s.6 1.8.7 1.9c.1.2 1.2 1.9 3 2.7 1.8.8 1.8.5 2.1.5.3 0 1.2-.5 1.4-.9.2-.4.2-.8.2-.9 0-.1-.1-.1-.3-.2Z" fill="currentColor"/></svg></a>`;
    document.body.appendChild(wrap);
  }
  function apply(s){
    const phone=clean(s.phone), wa=clean(s.whatsapp);
    document.querySelectorAll('[data-contact="phone"]').forEach(a=>{a.href=phone?`tel:+${phone}`:'#'; if(!phone)a.setAttribute('aria-disabled','true');});
    document.querySelectorAll('[data-contact="whatsapp"]').forEach(a=>{a.href=wa?`https://wa.me/${wa}`:'#'; if(!wa)a.setAttribute('aria-disabled','true');});
    document.querySelectorAll('[data-contact="email"]').forEach(a=>{a.href='#';});
    ['instagram','facebook','youtube','tiktok','x'].forEach(k=>document.querySelectorAll(`[data-contact="${k}"]`).forEach(a=>{if(s[k]){a.href=s[k];a.hidden=false;}else a.hidden=true;}));
    bindEmail(); ensureFloating();
  }
  async function load(){
    let data=null;
    try{if(window.MBBackend?.ready){const r=await window.MBBackend.get('site_settings','select=*&id=eq.1');if(r.ok&&Array.isArray(r.data)&&r.data[0])data=r.data[0];}}catch{}
    const settings=normalise(data); window.MBSiteSettings=settings; apply(settings); return settings;
  }
  window.MBSiteSettingsAPI={load,apply,gmailCompose};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
