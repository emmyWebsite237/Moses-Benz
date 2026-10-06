/* Moses Benz Auto Care — workshop control centre. */
(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const api=()=>window.MBBackend;
  async function ensure(){
  try{
    const s=JSON.parse(sessionStorage.getItem('mbac_admin_session')||'null');
    if(!s?.username){location.replace('/mbac-control-7x4k9');return false;}
    return true;
  }catch{location.replace('/mbac-control-7x4k9');return false;}
}
  function sectionNav(){const buttons=[...document.querySelectorAll('[data-admin-section]')],sections=[...document.querySelectorAll('.admin-directory-section')];const activate=name=>{buttons.forEach(b=>b.classList.toggle('is-active',b.dataset.adminSection===name));sections.forEach(s=>s.hidden=s.id!==`admin-section-${name}`);history.replaceState(null,'',`#${name}`);};buttons.forEach(b=>b.onclick=()=>activate(b.dataset.adminSection));activate(location.hash.slice(1)||buttons[0]?.dataset.adminSection);}
  function carEditor(){
    let modal=document.getElementById('admin-car-editor'); if(modal)return modal;
    modal=document.createElement('div'); modal.id='admin-car-editor'; modal.className='admin-editor-modal'; modal.hidden=true;
    modal.innerHTML=`<div class="admin-editor-backdrop" data-car-close></div><section class="admin-editor-dialog" role="dialog" aria-modal="true" aria-labelledby="car-editor-title"><button type="button" class="enquiry-close" data-car-close aria-label="Close">×</button><span class="eyebrow">Inventory</span><h2 id="car-editor-title">Edit vehicle</h2><form id="car-editor-form" class="admin-form"><input type="hidden" name="id"><div class="admin-form-grid"><label>Model name<input name="name" required></label><label>Year<input name="year" type="number" min="1900" max="2100" required></label><label>Mileage (km)<input name="mileageKm" type="number" min="0" required></label><label>Spec / engine tag<input name="specTag"></label><label>Status<select name="status"><option value="available">Available</option><option value="sold">Sold</option></select></label></div><label>Image URL<input name="image"></label><label>Description<textarea name="description" rows="4"></textarea></label><div class="admin-form-grid"><label>Condition<input name="condition"></label><label>Fuel<input name="fuel"></label><label>Transmission<input name="transmission"></label><label>Body<input name="body"></label><label>Drivetrain<input name="drivetrain"></label><label>Engine size<input name="engineSize"></label><label>Cylinders<input name="cylinders"></label><label>Horsepower<input name="horsepower"></label><label>Colour<input name="color"></label><label>Interior colour<input name="interiorColor"></label><label>Seats<input name="seats"></label><label>Registered<input name="registered"></label></div><div class="admin-editor-actions"><button type="button" class="btn btn-ghost-light" data-car-close>Cancel</button><button type="submit" class="btn btn-primary">Save vehicle</button></div><p id="car-editor-status" class="form-status"></p></form></section>`;
    document.body.appendChild(modal);
    const close=()=>{modal.hidden=true;document.body.classList.remove('modal-open');};
    modal.querySelectorAll('[data-car-close]').forEach(x=>x.addEventListener('click',close));
    modal.querySelector('form').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,fd=new FormData(form),id=String(fd.get('id')),old=window.MBStore.getCars().find(c=>c.id===id)||{};const status=document.getElementById('car-editor-status'),btn=form.querySelector('button[type="submit"]');const car={...old,id,name:String(fd.get('name')||'').trim(),slug:old.slug||id.replace(/^car-/,'') ,year:Number(fd.get('year')),priceNGN:old.priceNGN||0,mileageKm:Number(fd.get('mileageKm')),specTag:String(fd.get('specTag')||'').trim(),status:String(fd.get('status')||'available'),image:String(fd.get('image')||'').trim(),description:String(fd.get('description')||'').trim(),condition:String(fd.get('condition')||'').trim(),fuel:String(fd.get('fuel')||'').trim(),transmission:String(fd.get('transmission')||'').trim(),body:String(fd.get('body')||'').trim(),drivetrain:String(fd.get('drivetrain')||'').trim(),engineSize:String(fd.get('engineSize')||'').trim(),cylinders:String(fd.get('cylinders')||'').trim(),horsepower:String(fd.get('horsepower')||'').trim(),color:String(fd.get('color')||'').trim(),interiorColor:String(fd.get('interiorColor')||'').trim(),seats:String(fd.get('seats')||'').trim(),registered:String(fd.get('registered')||'').trim(),active:old.active!==false};btn.disabled=true;status.textContent='Saving…';try{await window.MBStore.saveCar(car);status.textContent='Vehicle saved.';setTimeout(()=>{close();renderCars();},350);}catch(ex){status.textContent=ex.message||'Could not save vehicle.';}finally{btn.disabled=false;}});
    return modal;
  }
  function openCarEditor(car){const modal=carEditor(),form=modal.querySelector('form');Object.keys(car).forEach(k=>{if(form.elements[k])form.elements[k].value=car[k]??'';});form.elements.id.value=car.id;document.getElementById('car-editor-status').textContent='';modal.hidden=false;document.body.classList.add('modal-open');}
  async function renderCars(){
    const list=document.getElementById('admin-car-list'),count=document.getElementById('admin-count');if(!list)return;
    const cars=window.MBStore.getCars().filter(c=>c.brand==='Mercedes-Benz');
    if(count)count.textContent=`${cars.length} cars`;
    list.innerHTML=cars.length?cars.map(c=>`<article class="admin-car-row"><img src="${esc(c.image)}" alt="${esc(c.name)}" class="admin-car-thumb" onerror="this.closest('.admin-car-row')?.remove()"><div class="admin-car-info"><div class="admin-car-title"><strong>${esc(c.name)}</strong><span class="admin-status-pill${c.active===false?' sold':''}">${c.active===false?'Hidden':'Visible'}</span></div><div class="admin-car-meta">${esc(c.year)} · ${esc(c.specTag)} · ${window.MBStore.formatKm(c.mileageKm)}</div><p>${esc(c.description||'')}</p></div><div class="admin-car-actions"><button class="btn btn-ghost-light edit-car" data-id="${esc(c.id)}">Edit</button><button class="btn ${c.active===false?'btn-primary':'btn-ghost-light'} toggle-visibility" data-id="${esc(c.id)}">${c.active===false?'Show on site':'Hide from site'}</button><button class="btn btn-danger delete-car" data-id="${esc(c.id)}">Delete</button></div></article>`).join(''):'<p class="admin-card-note">No Mercedes-Benz vehicles are registered.</p>';
    list.querySelectorAll('.edit-car').forEach(b=>b.onclick=()=>{const car=window.MBStore.getCars().find(c=>c.id===b.dataset.id);if(car)openCarEditor(car);});
    list.querySelectorAll('.toggle-visibility').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await window.MBStore.setActive(b.dataset.id,window.MBStore.getCars().find(c=>c.id===b.dataset.id)?.active===false);await renderCars();}catch(ex){alert(ex.message);b.disabled=false;}});
    list.querySelectorAll('.delete-car').forEach(b=>b.onclick=async()=>{const car=window.MBStore.getCars().find(c=>c.id===b.dataset.id);if(!car)return;if(!confirm(`Delete ${car.name} from the shared inventory? This cannot be undone.`))return;b.disabled=true;try{await window.MBStore.deleteCar(car.id);await renderCars();}catch(ex){alert(ex.message);b.disabled=false;}});
  }
  async function renderAppointments(){const list=document.getElementById('admin-appointment-list');if(!list)return;const c=adminCreds();let items=[];if(api()?.ready){const r=await api().rpc('admin_appointments_list',{p_username:c.username||'',p_password:c.password||''});if(r.ok&&Array.isArray(r.data))items=r.data.map(x=>({id:x.id,name:x.name,email:x.email,phone:x.phone,model:x.model,year:x.year,service:x.service,registration:x.registration,location:x.location||'',message:x.message,status:x.status,scheduledDate:x.scheduled_date,scheduledTime:x.scheduled_time,createdAt:x.created_at}));}if(!items.length)items=window.MBData.getAppointments().sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));list.innerHTML=items.length?items.map(x=>`<article class="admin-item admin-appointment-item"><div class="admin-item-main"><strong>${esc(x.name)} · ${esc(x.model)}</strong><small>${esc(x.email)} · ${esc(x.phone)}</small><small>${esc(x.service||'Appointment Request')}${x.year?` · ${esc(x.year)}`:''}${x.location?` · ${esc(x.location)}`:''}</small><small>${esc(x.message||'')}</small><small>${x.scheduledDate||x.scheduledTime?`Scheduled: ${esc(x.scheduledDate||'')} ${esc(x.scheduledTime||'')}`:'Not scheduled yet'}</small></div><div class="admin-appointment-actions"><select class="appointment-status" data-id="${esc(x.id)}"><option value="requested" ${x.status==='requested'?'selected':''}>Requested</option><option value="confirmed" ${x.status==='confirmed'?'selected':''}>Confirmed</option><option value="in_progress" ${x.status==='in_progress'?'selected':''}>In progress</option><option value="done" ${x.status==='done'?'selected':''}>Done</option><option value="cancelled" ${x.status==='cancelled'?'selected':''}>Cancelled</option></select><button class="btn btn-ghost-light adjust-time" data-id="${esc(x.id)}">Adjust date &amp; time</button><button class="btn btn-ghost-light email-customer" data-id="${esc(x.id)}">Via Email</button><button class="btn btn-ghost-light whatsapp-customer" data-id="${esc(x.id)}">Via WhatsApp</button>${x.status==='done'||x.status==='cancelled'?`<button class="btn btn-ghost-light delete-appointment" data-id="${esc(x.id)}">Delete</button>`:''}</div></article>`).join(''):'<p class="admin-card-note">No appointment requests yet.</p>';
    list.querySelectorAll('.appointment-status').forEach(sel=>sel.onchange=async()=>{const id=sel.dataset.id,val=sel.value;try{if(api()?.ready){const r=await api().rpc('admin_appointment_status',{p_username:c.username||'',p_password:c.password||'',p_id:id,p_status:val});if(!r.ok)throw new Error('Could not update appointment.');}window.MBData.updateAppointment(id,{status:val});await renderAppointments();}catch(ex){alert(ex.message);}});
    list.querySelectorAll('.adjust-time').forEach(b=>b.onclick=()=>openTimeModal(items.find(x=>x.id===b.dataset.id)));
    list.querySelectorAll('.email-customer').forEach(b=>b.onclick=()=>{const a=items.find(v=>v.id===b.dataset.id);if(!a)return;const subject=`Moses Benz Auto Care appointment — ${a.model}`;const body=`Hello ${a.name},\n\nYour appointment with Moses Benz Auto Care is scheduled for ${a.scheduledDate||'[DATE]'} at ${a.scheduledTime||'[TIME]'}.\n\nVehicle: ${a.model}${a.year?` (${a.year})`:''}\nLocation: ${a.location||'[LOCATION]'}\n\nPlease reply if you need assistance.\n\nMoses Benz Auto Care`;window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(a.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,'_blank');});
    list.querySelectorAll('.whatsapp-customer').forEach(b=>b.onclick=()=>{const a=items.find(v=>v.id===b.dataset.id);if(!a)return;const phone=String(a.phone||'').replace(/\D/g,'').replace(/^0/,'234');const msg=`Hello ${a.name},\n\nYour appointment with Moses Benz Auto Care is scheduled for ${a.scheduledDate||'[DATE]'} at ${a.scheduledTime||'[TIME]'}.\n\nVehicle: ${a.model}${a.year?` (${a.year})`:''}\nLocation: ${a.location||'[LOCATION]'}\n\nMoses Benz Auto Care`;window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank');});
    list.querySelectorAll('.delete-appointment').forEach(b=>b.onclick=async()=>{if(!confirm('Delete this completed/cancelled appointment permanently?'))return;try{if(api()?.ready){const r=await api().rpc('admin_appointment_delete',{p_username:c.username||'',p_password:c.password||'',p_id:b.dataset.id});if(!r.ok)throw new Error('Could not delete appointment.');}window.MBData.deleteAppointment(b.dataset.id).catch(()=>{});await renderAppointments();}catch(ex){alert(ex.message);}});
  }
  function openTimeModal(a){const modal=document.getElementById('appointment-time-modal'),form=document.getElementById('appointment-time-form');if(!modal||!form||!a)return;form.querySelector('[name="id"]').value=a.id;form.date.value=/^\d{{4}}-\d{{2}}-\d{{2}}$/.test(a.scheduledDate||'')?a.scheduledDate:'';form.time.value=a.scheduledTime||'';document.getElementById('appointment-time-status').textContent='';modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
  function bindTimeModal(){const modal=document.getElementById('appointment-time-modal'),form=document.getElementById('appointment-time-form');if(!modal||!form)return;const close=()=>{modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};modal.querySelectorAll('[data-time-close]').forEach(x=>x.onclick=close);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});form.onsubmit=async e=>{e.preventDefault();const fd=new FormData(form),id=String(fd.get('id')),date=String(fd.get('date')),time=String(fd.get('time')),status=document.getElementById('appointment-time-status'),btn=form.querySelector('button[type="submit"]');btn.disabled=true;status.textContent='Saving…';try{if(api()?.ready){const c=adminCreds();const r=await api().rpc('admin_appointment_schedule',{p_username:c.username||'',p_password:c.password||'',p_id:id,p_date:date,p_time:time});if(!r.ok)throw new Error('Could not save appointment time.');}window.MBData.updateAppointment(id,{scheduledDate:date,scheduledTime:time,status:'confirmed'});status.textContent='Date and time updated.';setTimeout(async()=>{close();await renderAppointments();},500);}catch(ex){status.textContent=ex.message;}finally{btn.disabled=false;}};}
  function adminCreds(){try{return JSON.parse(sessionStorage.getItem('mbac_admin_session')||'null')||{};}catch{return {};}}
  async function renderBlog(){const list=document.getElementById('admin-blog-list');if(!list||!api()?.ready)return;const c=adminCreds();const r=await api().rpc('admin_blog_list',{p_username:c.username||'',p_password:c.password||''});const items=r?.ok&&Array.isArray(r.data)?r.data:[];list.classList.add('admin-blog-grid');list.innerHTML=items.length?items.map(x=>{const image=String(x.image_url||'').trim();return `<article class="admin-blog-card"><div class="admin-blog-media">${image?`<img src="${esc(image)}" alt="${esc(x.title)}" loading="lazy">`:''}<span class="admin-status-pill${x.published?'':' sold'}">${x.published?'Published':'Draft'}</span></div><div class="admin-blog-body"><span class="eyebrow">${esc(x.category)}</span><h3>${esc(x.title)}</h3><p>${esc(x.excerpt)}</p>${image?`<small>${esc(image)}</small>`:''}<div class="admin-blog-actions"><button class="btn btn-ghost-light delete-blog" data-id="${esc(x.id)}">Delete</button></div></div></article>`}).join(''):'<p class="admin-card-note">No blog posts yet.</p>';list.querySelectorAll('.delete-blog').forEach(b=>b.onclick=async()=>{if(!confirm('Delete this blog post?'))return;const q=await api().rpc('admin_blog_delete',{p_username:c.username||'',p_password:c.password||'',p_id:b.dataset.id});if(!q.ok)alert('Could not delete blog post.');else renderBlog();});}
  async function refreshBlogAdmin(){await renderBlog();await renderBlogComments();}
  function bindBlog(){const form=document.getElementById('add-blog-form');if(!form||form.dataset.bound)return;form.dataset.bound='1';form.addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(form),title=String(f.get('title')).trim(),category=String(f.get('category')).trim(),excerpt=String(f.get('excerpt')).trim(),content=String(f.get('content')).trim(),image_url=String(f.get('image_url')||'').trim(),slug=title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'-'+Date.now().toString(36),c=adminCreds(),status=document.getElementById('blog-admin-status');try{const r=await api().rpc('admin_blog_create',{p_username:c.username||'',p_password:c.password||'',p_slug:slug,p_title:title,p_category:category,p_excerpt:excerpt,p_content:content,p_image_url:image_url,p_published:true});if(!r.ok)throw new Error('Could not publish blog post.');status.textContent='Blog post published.';form.reset();renderBlog();}catch(ex){status.textContent=ex.message||'Could not publish blog post.';}});}

  async function renderBlogComments(){
    const list=document.getElementById('admin-blog-comments'); if(!list||!api()?.ready)return;
    const c=adminCreds();
    const [r,rr]=await Promise.all([
      api().rpc('admin_blog_comments_list',{p_username:c.username||'',p_password:c.password||''}),
      api().rpc('admin_blog_comment_replies_list',{p_username:c.username||'',p_password:c.password||''})
    ]);
    const items=r?.ok&&Array.isArray(r.data)?r.data:[];
    const allReplies=rr?.ok&&Array.isArray(rr.data)?rr.data:[];
    const byComment={}; allReplies.forEach(x=>{(byComment[x.comment_id]=byComment[x.comment_id]||[]).push(x);});
    list.innerHTML=items.length?items.map(x=>{
      const reps=(byComment[x.id]||[]).sort((a,b)=>(b.is_admin-a.is_admin)||String(a.created_at).localeCompare(String(b.created_at)));
      return `<article class="admin-item" data-comment-id="${esc(x.id)}">
        <div class="admin-item-main">
          <strong>${esc(x.post_slug)}</strong>
          <small>${esc(x.name)} · ${new Date(x.created_at).toLocaleString('en-NG')} · ${Number(x.likes)||0} like${Number(x.likes)===1?'':'s'}</small>
          <p>${esc(x.comment)}</p>
          ${reps.length?`<button type="button" class="btn btn-ghost-light admin-toggle-replies" data-toggle="${esc(x.id)}">View ${reps.length} repl${reps.length===1?'y':'ies'}</button>
          <div class="admin-reply-thread" data-thread="${esc(x.id)}" hidden>${reps.map(rp=>`<div class="admin-reply${rp.is_admin?' is-admin':''}"><strong>${rp.is_admin?'Your reply (Team)':esc(rp.name)}</strong><p>${esc(rp.reply)}</p><button type="button" class="admin-delete-reply" data-reply-id="${esc(rp.id)}">Delete</button></div>`).join('')}</div>`:''}
        </div>
        <div class="admin-item-actions">
          <button class="btn btn-ghost-light reply-comment" data-id="${esc(x.id)}">Reply</button>
          <button class="btn btn-ghost-light delete-comment" data-id="${esc(x.id)}">Delete comment</button>
        </div>
      </article>`;
    }).join(''):'<p class="admin-card-note">No public comments yet.</p>';
    list.querySelectorAll('.admin-toggle-replies').forEach(b=>b.onclick=()=>{
      const box=list.querySelector(`[data-thread="${b.dataset.toggle}"]`); if(!box)return;
      box.hidden=!box.hidden; b.textContent=box.hidden?b.textContent.replace('Hide','View'):b.textContent.replace('View','Hide');
    });
    list.querySelectorAll('.reply-comment').forEach(b=>b.onclick=async()=>{
      const reply=prompt('Reply to this comment (visible to everyone, shown first among replies):',''); if(reply===null||!reply.trim())return;
      const q=await api().rpc('admin_blog_comment_reply_add',{p_username:c.username||'',p_password:c.password||'',p_comment_id:b.dataset.id,p_reply:reply.trim()});
      if(!q.ok)alert('Could not save reply.'); else renderBlogComments();
    });
    list.querySelectorAll('.admin-delete-reply').forEach(b=>b.onclick=async()=>{
      if(!confirm('Delete this reply?'))return;
      const q=await api().rpc('admin_blog_reply_delete',{p_username:c.username||'',p_password:c.password||'',p_id:b.dataset.replyId});
      if(!q.ok)alert('Could not delete reply.'); else renderBlogComments();
    });
    list.querySelectorAll('.delete-comment').forEach(b=>b.onclick=async()=>{
      if(!confirm('Delete this public comment and all its replies?'))return;
      const q=await api().rpc('admin_blog_comment_delete',{p_username:c.username||'',p_password:c.password||'',p_id:b.dataset.id});
      if(!q.ok)alert('Could not delete comment.'); else renderBlogComments();
    });
  }
  async function loadSiteSettingsForm(){
    const form=document.getElementById('site-settings-form'); if(!form||!api()?.ready)return;
    const c=adminCreds(); const r=await api().rpc('admin_site_settings_get',{p_username:c.username||'',p_password:c.password||''});
    if(r?.ok&&Array.isArray(r.data)&&r.data[0]){const x=r.data[0];['phone','whatsapp','email','instagram','facebook','youtube','tiktok','x'].forEach(k=>{if(form.elements[k])form.elements[k].value=x[k]||'';});}
  }
  function bindSiteSettings(){
    const form=document.getElementById('site-settings-form'); if(!form||form.dataset.bound)return; form.dataset.bound='1';
    form.addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(form),c=adminCreds(),status=document.getElementById('site-settings-status');try{
      const payload={phone:String(f.get('phone')||'').trim(),whatsapp:String(f.get('whatsapp')||'').trim(),email:String(f.get('email')||'').trim(),instagram:String(f.get('instagram')||'').trim(),facebook:String(f.get('facebook')||'').trim(),youtube:String(f.get('youtube')||'').trim(),tiktok:String(f.get('tiktok')||'').trim(),x:String(f.get('x')||'').trim()};
      const r=await api().rpc('admin_site_settings_update',{p_username:c.username||'',p_password:c.password||'',p_phone:payload.phone,p_whatsapp:payload.whatsapp,p_email:payload.email,p_instagram:payload.instagram,p_facebook:payload.facebook,p_youtube:payload.youtube,p_tiktok:payload.tiktok,p_x:payload.x});
      if(!r.ok)throw new Error('Could not save site settings.'); status.textContent='Saved. Public links will use these values.';
      window.MBSiteSettings={...window.MBSiteSettings,...payload}; window.MBSiteSettingsAPI?.apply(window.MBSiteSettings);
    }catch(ex){status.textContent=ex.message||'Could not save site settings.';}
    });
    loadSiteSettingsForm();
  }

  function bindForms(){document.getElementById('admin-logout')?.addEventListener('click',()=>{sessionStorage.removeItem('mbac_admin_session');location.replace('/mbac-control-7x4k9');});}
  async function boot(){if(!(await ensure()))return;document.querySelector('.site-header')?.style.removeProperty('visibility');document.getElementById('page-content')?.style.removeProperty('visibility');sectionNav();bindTimeModal();bindBlog();bindSiteSettings();bindForms();await Promise.allSettled([window.MBData?.hydrate?.(true),window.MBStore?.hydrate?.()]);if(window.MBBackend?.ready && window.MBStore?.syncStatic){await window.MBStore.syncStatic();}await Promise.allSettled([renderCars(),renderAppointments(),renderBlog(),renderBlogComments(),loadSiteSettingsForm()]);}
  document.addEventListener('DOMContentLoaded',boot);
})();
