(() => {
  function bind(){
    const form=document.getElementById('appointment-form');if(!form||form.dataset.bound)return;form.dataset.bound='1';
    form.addEventListener('submit',async e=>{
      e.preventDefault();const fd=new FormData(form);const payload={id:'apt-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),name:String(fd.get('name')).trim(),email:String(fd.get('email')).trim(),phone:String(fd.get('phone')).trim(),model:String(fd.get('model')).trim(),year:Number(fd.get('year')),location:String(fd.get('location')).trim(),service:'Appointment Request',registration:null,message:String(fd.get('message')).trim()};
      const btn=form.querySelector('button[type="submit"]'),status=document.getElementById('appointment-status');if(btn)btn.disabled=true;if(status)status.textContent='Preparing your WhatsApp request…';
      let saved=false;
      try{if(window.MBBackend?.ready){const r=await window.MBBackend.post('appointments',{id:payload.id,name:payload.name,email:payload.email,phone:payload.phone,model:payload.model,year:payload.year,service:payload.service,registration:null,message:`Location: ${payload.location}\n${payload.message}`,status:'requested',review_requested:false,review_required:false});saved=r.ok;}}
      catch{}
      const msg=`Hello Moses Benz Auto Care. I would like to book an appointment.\nFull Name: ${payload.name}\nEmail: ${payload.email}\nWhatsApp: ${payload.phone}\nVehicle: ${payload.model} (${payload.year})\nLocation: ${payload.location}\nWhat is the car doing: ${payload.message}`;
      if(status)status.textContent=saved?'Request saved. Opening WhatsApp so the workshop can respond directly…':'Opening WhatsApp so the workshop can respond directly…';
      window.setTimeout(()=>{const wa=(window.MBSiteSettings?.whatsapp||'').replace(/\D/g,'');window.location.href=`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;},250);
      if(btn)btn.disabled=false;
    });
  }
  window.initAppointmentPage=bind;
})();