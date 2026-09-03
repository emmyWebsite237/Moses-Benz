/* Appointment request: customer signs in locally, then sends a request to the workshop. */
(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const WA='2348106958638';
  const FORM_ENDPOINT=()=>`https://formsubmit.co/ajax/${encodeURIComponent(window.MBAC_FORMS?.workshopEmail||'')}`;
  function renderOptions(){const s=document.querySelector('select[name="service"]');if(!s||!window.MBData)return;const current=new URLSearchParams(location.search).get('service')||s.value;const all=[...window.MBData.getServices(),...window.MBData.getDiagnostics().map(x=>x.name)];s.innerHTML='<option value="">Select a service or diagnostic</option>'+[...new Set(all)].map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');if(current)s.value=current;}
  function formSubmit(payload){
    if(!window.MBAC_FORMS?.workshopEmail||window.MBAC_FORMS.workshopEmail==='YOUR_WORKSHOP_EMAIL') return Promise.resolve(false);
    const body=new URLSearchParams({...payload,_subject:`New appointment request — ${payload.name}`,_replyto:payload.email,_captcha:'false'});
    return fetch(FORM_ENDPOINT(),{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}).then(r=>r.ok).catch(()=>false);
  }
  function bind(){const form=document.getElementById('appointment-form');if(!form||form.dataset.bound)return;form.dataset.bound='1';renderOptions();window.MBCustomer?.init();
    form.addEventListener('submit',async e=>{e.preventDefault();const customer=window.MBCustomer?.get();if(!customer){alert('Please sign in first.');return;}const fd=new FormData(form);const payload={name:customer.name,email:customer.email,phone:customer.phone,model:String(fd.get('model')).trim(),year:String(fd.get('year')||''),service:String(fd.get('service')),registration:String(fd.get('registration')||''),message:String(fd.get('message')).trim()};
      const a=window.MBData.addAppointment(payload);window.MBBackend?.post('appointments',{...payload,year:payload.year?Number(payload.year):null,status:'requested'}).catch(()=>{});
      const status=document.getElementById('appointment-status');if(status)status.textContent='Request received. Opening WhatsApp so the workshop can acknowledge it.';
      const msg=[`Hello Moses Benz Auto Care. New appointment request.`,`Reference: ${a.id}`,`Name: ${a.name}`,`Email: ${a.email}`,`Phone: ${a.phone}`,`Mercedes: ${a.model}${a.year?` (${a.year})`:''}`,`Service / Diagnostic: ${a.service}`,`Registration: ${a.registration||'Not supplied'}`,`Request: ${a.message}`].join('\n');
      await formSubmit(payload).catch(()=>false);window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank','noopener');form.reset();renderOptions();window.MBCustomer?.init();
    });
  }
  window.initAppointmentPage=bind;
})();
