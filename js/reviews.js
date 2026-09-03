(() => {
  const form=document.getElementById('review-form'); if(!form||form.dataset.bound)return;form.dataset.bound='1';
  const params=new URLSearchParams(location.search); const id=params.get('appointment'); const a=id&&window.MBData?.getAppointments().find(x=>x.id===id);
  if(a){document.getElementById('review-name')?.setAttribute('value',a.name||'');document.getElementById('review-model')?.setAttribute('value',a.model||'');const ap=document.getElementById('review-reference');if(ap)ap.textContent=`Appointment ${a.id}`;}
  form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const payload={appointmentId:id||null,name:fd.get('name'),model:fd.get('model'),rating:Number(fd.get('rating')),review:fd.get('review')};window.MBData?.addReview(payload);window.MBBackend?.post('reviews',payload).catch(()=>{});const status=document.getElementById('review-status');if(status)status.textContent='Thank you. Your review has been received.';form.reset();});
})();
