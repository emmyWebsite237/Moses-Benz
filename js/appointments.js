/* Customer appointment request. Submission stays on-site; the workshop chooses email/WhatsApp when responding. */
(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const FORM_ENDPOINT=()=>`https://formsubmit.co/ajax/${encodeURIComponent(window.MBAC_FORMS?.workshopEmail||'')}`;
  function renderOptions(){const s=document.querySelector('select[name="service"]');if(!s||!window.MBData)return;const current=new URLSearchParams(location.search).get('service')||s.value;const all=window.MBData.getServices();s.innerHTML='<option value="">Select a service</option>'+[...new Set(all)].map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');if(current)s.value=current;window.MBCombobox?.enhance(s);}
  function formSubmit(payload){
    const email=window.MBAC_FORMS?.workshopEmail;
    if(!email || email==='YOUR_WORKSHOP_EMAIL') return Promise.resolve(false);
    const body=new URLSearchParams({...payload,_subject:`New appointment request — ${payload.name}`,_replyto:payload.email,_captcha:'false',_template:'table'});
    return fetch(FORM_ENDPOINT(),{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}).then(r=>r.ok).catch(()=>false);
  }
  function bind(){const form=document.getElementById('appointment-form');if(!form||form.dataset.bound)return;form.dataset.bound='1';renderOptions();window.MBCustomer?.init();
    form.addEventListener('submit',async e=>{e.preventDefault();const customer=window.MBCustomer?.get();if(!customer){alert('Please sign in first.');return;}const fd=new FormData(form);const payload={name:customer.name,email:customer.email,phone:customer.phone,model:String(fd.get('model')).trim(),year:String(fd.get('year')||''),service:String(fd.get('service')),registration:String(fd.get('registration')||''),message:String(fd.get('message')).trim()};const status=document.getElementById('appointment-status'),btn=form.querySelector('button[type="submit"]');if(btn)btn.disabled=true;if(status)status.textContent='Sending appointment request…';const a=window.MBData.addAppointment(payload);const backendResult=window.MBBackend?.ready?await window.MBBackend.post('appointments',{id:a.id,name:a.name,email:a.email,phone:a.phone,model:a.model,year:payload.year?Number(payload.year):null,service:a.service,registration:a.registration||null,message:a.message,status:'requested'}):{ok:false};const sent=await formSubmit({...payload,reference:a.id}).catch(()=>false);if(status)status.textContent=sent?'Appointment request sent successfully. The workshop will contact you with the scheduled time.':'Your request was saved. We could not send the email notification right now, so please contact the workshop if you do not hear from us.';if(!backendResult.ok&&window.MBBackend?.ready)console.warn('Appointment database save failed; local copy retained.');form.reset();renderOptions();window.MBCustomer?.init();if(btn)btn.disabled=false;});
  }
  window.initAppointmentPage=bind;
})();
