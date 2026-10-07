(() => {
  function bind(){
    const form=document.getElementById('appointment-form');
    if(!form||form.dataset.bound)return;
    form.dataset.bound='1';
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const fd=new FormData(form),payload={id:'apt-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),name:String(fd.get('name')||'').trim(),email:String(fd.get('email')||'').trim(),phone:String(fd.get('phone')||'').trim(),model:String(fd.get('model')||'').trim(),year:Number(fd.get('year')),location:String(fd.get('location')||'').trim(),service:'Appointment Request',registration:null,message:String(fd.get('message')||'').trim(),status:'requested'};
      const btn=form.querySelector('button[type="submit"]'),status=document.getElementById('appointment-status');
      if(btn)btn.disabled=true;if(status)status.textContent='Saving request to the workshop…';
      let saved=false;
      try{
        if(window.MBBackend?.ready){
          const r=await window.MBBackend.rpc('create_appointment',{p_id:payload.id,p_name:payload.name,p_email:payload.email,p_phone:payload.phone,p_model:payload.model,p_year:payload.year,p_service:payload.service,p_registration:null,p_location:payload.location,p_message:payload.message});
          if(r.ok)saved=true;
          else {const direct=await window.MBBackend.post('appointments',payload);saved=direct.ok;}
        }
      }catch{}
      if(!saved){if(status)status.textContent='We could not save the appointment. Please try again — WhatsApp was not opened.';if(btn)btn.disabled=false;return;}
      try{window.MBData?.addAppointment?.(payload);}catch{}
      const raw=String(window.MBSiteSettings?.whatsapp||'').trim(),wa=raw.match(/https?:\/\/\S+/i)?.[0]||'';
      if(status)status.textContent=wa?'Appointment saved. Opening WhatsApp…':'Appointment saved.';
      if(btn)btn.disabled=false;
      if(wa)window.setTimeout(()=>{window.location.href=wa+(wa.includes('?')?'&':'?')+'text='+encodeURIComponent(`Hello Moses Benz Auto Care. I would like to book an appointment.\nFull Name: ${payload.name}\nEmail: ${payload.email}\nWhatsApp: ${payload.phone}\nVehicle: ${payload.model} (${payload.year})\nLocation: ${payload.location}\nWhat is the car doing: ${payload.message}`);},250);
    });
  }
  window.initAppointmentPage=bind;
})();