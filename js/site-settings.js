/* Moses Benz Auto Care — public contact/social settings from Supabase. */
(() => {
  const fallback = {
    phone: '2349061526267',
    whatsapp: '2348106958638',
    email: '',
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    x: ''
  };
  const cleanPhone=v=>String(v||'').replace(/[^\d+]/g,'').replace(/^\+/,'');
  const normalise=(r)=>({...fallback,...(r||{})});
  async function load(){
    let data=null;
    try{
      if(window.MBBackend?.ready){
        const r=await window.MBBackend.get('site_settings','select=*&id=eq.1');
        if(r.ok && Array.isArray(r.data) && r.data[0]) data=r.data[0];
      }
    }catch{}
    const settings=normalise(data);
    window.MBSiteSettings=settings;
    apply(settings);
    return settings;
  }
  function apply(s){
    const phone=cleanPhone(s.phone), wa=cleanPhone(s.whatsapp);
    document.querySelectorAll('[data-contact="phone"]').forEach(a=>{
      a.href=phone?`tel:+${phone}`:'#';
      if(a.dataset.contactLabel==='number') a.textContent=`+${phone}`;
    });
    document.querySelectorAll('[data-contact="whatsapp"]').forEach(a=>{
      a.href=wa?`https://wa.me/${wa}`:'#';
    });
    document.querySelectorAll('[data-contact="email"]').forEach(a=>{
      a.href=s.email?`mailto:${s.email}`:'#';
      if(a.dataset.contactLabel==='address') a.textContent=s.email||'Email the workshop';
    });
    ['instagram','facebook','youtube','tiktok','x'].forEach(k=>{
      document.querySelectorAll(`[data-contact="${k}"]`).forEach(a=>{
        if(s[k]){a.href=s[k];a.hidden=false;}else{a.hidden=true;}
      });
    });
  }
  window.MBSiteSettingsAPI={load,apply};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();