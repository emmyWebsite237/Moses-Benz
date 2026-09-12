const SB=window.MBAC_SUPABASE||{url:'',anonKey:''};
const BASE='';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const norm=s=>String(s??'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
let settings={phone:'',whatsapp:'',email:'',instagram:'',facebook:'',youtube:'',tiktok:'',x:''};
const POSTS=[
{slug:"how-to-keep-your-mercedes-benz-healthy-in-lagos",category:"Mercedes-Benz Maintenance",title:"How to Keep Your Mercedes-Benz Healthy in Lagos",excerpt:"Practical habits for keeping a Mercedes-Benz dependable through Lagos traffic, heat, dust and stop-start driving.",content:"Owning a Mercedes-Benz in Lagos rewards consistency. The most useful maintenance habit is not waiting for a major fault before visiting a specialist. Keep the service history, follow the correct service intervals for your model and pay attention to changes in sound, smell, vibration or performance.\n\nTraffic changes how a car is used. Long periods of idling, repeated acceleration and braking, short trips and hot weather can place more demand on cooling, braking, transmission and electrical systems. A car that feels normal today can still benefit from a scheduled inspection.\n\nCheck the basics between services. Look at tyre pressures and tread, make sure exterior lights work, watch the coolant and washer-fluid levels, and look for fresh fluid underneath a parked vehicle. Do not ignore a warning simply because the car still drives.\n\nWhen a warning light appears, diagnosis should come before parts. Clearing a code may remove the message temporarily without fixing the cause. A proper inspection combines fault codes, live data, physical checks and the driver's description of the problem.\n\nKeep records of oil and filter changes, brake work, tyres, battery replacement and major repairs. A clear history makes future diagnosis easier and helps preserve the value of the vehicle.\n\nFinally, choose a workshop that understands Mercedes-Benz systems rather than treating every vehicle as a generic car. Specialist knowledge saves time because the technician starts with the right questions and the right diagnostic approach."},
{slug:"what-dashboard-warning-lights-are-trying-to-tell-you",category:"Mercedes-Benz Knowledge",title:"What Dashboard Warning Lights Are Trying to Tell You",excerpt:"Understand what your Mercedes-Benz is trying to communicate before you reset a warning and carry on driving.",content:"Dashboard warnings are the car's way of communicating that a system needs attention. They should not automatically be treated as proof that one particular part has failed.\n\nThe first question is whether the warning is red, amber or accompanied by a serious change in how the vehicle drives. A red warning or a major braking, steering, overheating or engine problem deserves immediate attention. If the car is unsafe to continue driving, stop and arrange professional assistance.\n\nAmber warnings still deserve investigation. A sensor, battery condition, wiring problem, fluid issue or another system fault can trigger a message. Resetting the warning without finding its cause can allow the underlying problem to become more expensive.\n\nMercedes-Benz vehicles use multiple control units that communicate with one another. This means one fault can create several symptoms. A technician should read the stored information, examine live values where appropriate and physically inspect the vehicle before recommending parts.\n\nWrite down what happened when the warning appeared. Note whether the engine was cold or hot, whether the vehicle was accelerating or idling, and whether you noticed a loss of power, vibration or unusual noise. Those details can save diagnostic time.\n\nIf a warning disappears after restarting, do not assume the problem is gone. Intermittent faults can be particularly important because they may return under the same conditions. Keep the message in mind and arrange a proper check."},
{slug:"why-short-trips-can-be-hard-on-your-car",category:"Mercedes-Benz Maintenance",title:"Why Short Trips Can Be Hard on Your Mercedes-Benz",excerpt:"Frequent short journeys create a different maintenance pattern from long highway driving.",content:"A five-minute drive may feel easy on a car because the engine has barely worked. Mechanically, however, repeated short journeys can create their own challenges.\n\nAn engine needs time to reach its normal operating temperature. When a vehicle is repeatedly started, driven briefly and switched off, some systems spend much of their time warming up rather than operating under steady conditions.\n\nShort journeys can also mean more cold starts, more idling and more stop-start operation. In busy Lagos traffic, that pattern can be combined with heat and long periods of low-speed driving.\n\nThis does not mean every short trip is harmful or that you should take unnecessary long drives. It means your maintenance routine should reflect how the vehicle is actually used. Service intervals, fluid checks, battery condition and tyre inspection remain important.\n\nIf a Mercedes-Benz is used mainly for short journeys, tell the technician. Usage history is useful diagnostic information. A good service plan is based on the real operating conditions rather than an idealised driving pattern.\n\nPay attention to repeated symptoms such as slow starting, rough running, unusual smells or warning messages. Early investigation is usually easier than waiting for a small issue to become a breakdown."},
{slug:"what-to-check-before-buying-a-used-mercedes-benz",category:"Buying Guide",title:"What to Check Before Buying a Used Mercedes-Benz",excerpt:"A careful inspection can reveal much more than a clean exterior and a convincing sales description.",content:"A used Mercedes-Benz should be evaluated as a complete vehicle, not just by its badge, year and appearance. Before committing money, establish what you are actually buying.\n\nStart with the documentation. Check the model, year, identification details and available service history. Ask questions about previous repairs, accident damage and major component replacement. Incomplete history does not automatically make a car bad, but it should make you more careful.\n\nInspect the body in good light. Look for inconsistent paint texture, panel gaps, overspray, repaired areas and signs that panels have been replaced. Then inspect the tyres, wheels, lights, glass and visible suspension components.\n\nDuring a road test, pay attention to starting, idle quality, transmission behaviour, steering, braking, suspension noise and acceleration. A vehicle can look excellent while hiding expensive mechanical problems.\n\nA diagnostic scan is valuable, but it is not a substitute for a physical inspection. Stored faults, current faults, live data and the condition of the actual components all matter. Ask the inspecting technician to explain findings instead of simply giving you a list of codes.\n\nBudget for immediate maintenance as well. Even a healthy used car may need fluids, filters, tyres or other routine work after purchase. Knowing the likely cost before buying gives you a much clearer picture of the real value."},
{slug:"when-should-you-check-your-brake-system",category:"Safety & Maintenance",title:"When Should You Check Your Mercedes-Benz Brake System?",excerpt:"Noise, vibration, pulling and changes in pedal feel should never be treated as normal wear.",content:"Brakes are one of the systems where small changes deserve attention. You do not need to wait until a warning appears before checking them.\n\nA squeal can have several causes, including pad material, surface condition or wear. Grinding is more concerning because it can indicate that friction material has become severely worn. Neither sound should be diagnosed from the noise alone.\n\nNotice how the vehicle behaves under braking. Pulling to one side, vibration through the steering wheel, a pedal that feels different or a longer stopping response should prompt an inspection.\n\nA proper brake check considers pads, discs, calipers, hoses and related components. Tyres and suspension can also affect how braking feels, so the complete system matters.\n\nBrake wear is not identical on every Mercedes-Benz model. Driving style, traffic conditions, vehicle weight and component quality all affect service life. Regular inspection gives you a chance to replace worn components before they become a bigger problem.\n\nIf you are unsure whether a brake noise is serious, arrange a specialist inspection rather than guessing. A few minutes of checking can provide much more confidence than continuing to drive and hoping the sound disappears."},
{slug:"how-to-look-after-your-car-battery",category:"Electrical & Maintenance",title:"How to Look After Your Mercedes-Benz Battery",excerpt:"Battery condition affects starting, electronics and the stability of modern vehicle systems.",content:"Modern Mercedes-Benz vehicles depend heavily on electrical systems. That makes battery health more important than many drivers realise.\n\nA weak battery may first appear as slow starting or an occasional electrical message. Other symptoms can include unusual behaviour from convenience features or repeated low-voltage faults. These signs deserve investigation.\n\nHeat and repeated short trips can be demanding for batteries. If a car sits unused for long periods, the battery can also lose charge. The correct charging and replacement approach depends on the vehicle and its electrical system.\n\nDo not judge battery health by voltage alone. A proper test can examine starting performance and available capacity. The vehicle may also need the battery replacement to be registered or configured correctly depending on its system.\n\nKeep battery terminals and surrounding areas clean and secure, but avoid improvising repairs around sensitive electrical components. If a battery repeatedly goes flat, find out why instead of replacing it again and again.\n\nIf your Mercedes-Benz has become slow to start or is displaying several unrelated electrical warnings, mention all of them during diagnosis. Low system voltage can sometimes create a collection of symptoms that look like separate faults."},
{slug:"understanding-airmatic-suspension-symptoms",category:"Suspension",title:"Understanding AIRMATIC Suspension Symptoms",excerpt:"Learn the signs that can point to an air-suspension problem and why early diagnosis matters.",content:"AIRMATIC suspension can provide a comfortable and controlled ride, but it is also a system that should be diagnosed carefully when its behaviour changes.\n\nOne common sign is a vehicle sitting lower than expected, especially after being parked. Uneven ride height can suggest a leak or another suspension-system issue, but the exact cause needs to be established.\n\nYou may also notice a compressor running for longer than usual, unusual noises, a warning message or changes in ride quality. These symptoms can have different causes, so replacing an air spring or compressor without testing can waste money.\n\nA technician should inspect the suspension components and air system, check for leaks and use the vehicle's diagnostic information where appropriate. The condition of valves, lines, sensors and the compressor can all be relevant.\n\nIf one corner repeatedly drops overnight, record when it happens and whether the vehicle corrects its height after starting. That information can help the technician reproduce the fault.\n\nSuspension faults are easier to manage when addressed early. Continuing to operate a vehicle with a struggling compressor or persistent leak can place additional strain on other components."},
{slug:"why-correct-engine-oil-matters",category:"Engine Care",title:"Why the Correct Engine Oil Matters in a Mercedes-Benz",excerpt:"Oil is more than a lubricant; the correct specification supports the engine's design and service requirements.",content:"Engine oil has several jobs. It lubricates moving parts, helps manage heat, carries contaminants toward the filter and supports the operation of systems that depend on oil pressure and flow.\n\nFor a Mercedes-Benz, the important question is not simply whether an oil is described as synthetic or premium. The oil must meet the specification appropriate to the particular engine and service requirement.\n\nUsing the wrong product or extending an interval beyond what the vehicle needs can create unnecessary risk. Modern engines may have turbochargers, variable valve systems and other components that place specific demands on lubrication.\n\nCheck the vehicle's required specification and use a reputable product. During servicing, the filter should also be replaced correctly and the technician should check for leaks.\n\nOil level matters too. Both low and excessive oil levels can cause problems. If you repeatedly need to top up between services, investigate the reason rather than treating the top-up as a permanent solution.\n\nKeep the service record. Recording the oil specification, date and mileage creates a useful maintenance history and makes future servicing more straightforward."},
{slug:"simple-tyre-checks-every-driver-can-do",category:"Tyres & Safety",title:"Simple Tyre Checks Every Mercedes-Benz Driver Can Do",excerpt:"A few quick checks can help you catch tyre problems before they affect handling.",content:"Tyres are the only part of the vehicle continuously touching the road, so their condition deserves regular attention.\n\nCheck pressures when the tyres are cold and use the vehicle's recommended pressure rather than guessing. The correct value can vary with load and model, so use the information supplied for your vehicle.\n\nLook across the tread instead of checking only the centre. Uneven wear can provide clues about alignment, suspension, pressure or tyre condition. Look for cuts, bulges, cracks and objects lodged in the tread.\n\nDo not judge a tyre only by how much tread appears to remain. Age, damage and condition also matter. A tyre with adequate-looking tread can still require replacement if it has deteriorated.\n\nIf your Mercedes-Benz pulls to one side, vibrates at certain speeds or develops unusual tyre wear, have the complete wheel and suspension setup checked. Balancing and alignment are different jobs and both may be relevant.\n\nA short tyre inspection before longer journeys is a simple habit. If you see anything you cannot confidently assess, ask a specialist to inspect it rather than taking a chance."},
{slug:"why-diagnosis-should-come-before-parts",category:"Mercedes-Benz Diagnostics",title:"Why Diagnosis Should Come Before Parts",excerpt:"Good Mercedes-Benz repair starts with evidence, not a guess about which component to replace.",content:"Replacing parts until a warning disappears is an expensive way to diagnose a vehicle. A better approach is to identify the cause first.\n\nModern Mercedes-Benz vehicles contain many interconnected control units and sensors. A single symptom may have several possible causes, while one underlying electrical or mechanical problem can produce several warnings.\n\nFault codes are useful clues, but a code does not always mean that the named component itself is defective. The technician needs to interpret the code alongside live data, wiring information, physical inspection and the circumstances in which the fault occurs.\n\nA good diagnosis also starts with the customer. When did the problem begin? Was anything repaired recently? Does it happen when the engine is cold, when the car is hot, during acceleration, after rain or only occasionally? These details can narrow the investigation.\n\nOnce the cause is established, the repair can be explained clearly. You know what has failed, what needs to be done and why the recommended parts or labour are necessary.\n\nThat process is especially valuable on premium vehicles where unnecessary parts replacement can become expensive very quickly. Diagnosis is not an extra step before repair; it is part of good repair."}
];

function loadRemoteConfig(){return Promise.resolve(window.MBAC_SUPABASE||null)}
async function api(path,opts={}){try{const r=await fetch(SB.url+'/rest/v1/'+path,{...opts,headers:{apikey:SB.anonKey,Authorization:'Bearer '+SB.anonKey,'Content-Type':'application/json',Prefer:'return=representation',...(opts.headers||{})}});let data=null;try{data=await r.json()}catch{}return {ok:r.ok,data,status:r.status}}catch{return {ok:false,data:null,status:0}}}
const rpc=(fn,body)=>api('rpc/'+encodeURIComponent(fn),{method:'POST',body:JSON.stringify(body)});
function fmt(n){return new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(n||0)}
function cars(){return window.MBCars||[]}
async function loadSettings(){
  const r=await api('site_settings?select=*&id=eq.1');
  if(r.ok&&r.data?.[0]){
    settings={...settings,...r.data[0]};
    applyContacts();
  }
  return settings;
}
function applyContacts(){const digits=v=>String(v||'').replace(/\D/g,'');document.querySelectorAll('[data-contact="phone"]').forEach(a=>a.href=settings.phone?'tel:+'+digits(settings.phone):'#');document.querySelectorAll('[data-contact="whatsapp"]').forEach(a=>a.href=settings.whatsapp?'https://wa.me/'+digits(settings.whatsapp):'#');['facebook','instagram','youtube','tiktok','x'].forEach(k=>document.querySelectorAll('[data-contact="'+k+'"]').forEach(a=>{a.hidden=!settings[k];if(settings[k])a.href=settings[k]}));document.querySelectorAll('[data-email]').forEach(a=>a.onclick=e=>{e.preventDefault();if(!settings.email)return;const to=encodeURIComponent(settings.email),web='https://mail.google.com/mail/?view=cm&fs=1&to='+to;if(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)){location.href='googlegmail:///co?to='+to;setTimeout(()=>location.href=web,900)}else window.open(web,'_blank')})}
function footer(){const f=$('#footer');f.innerHTML='<div class="wrap footer-grid"><div><h3>Moses Benz Auto Care</h3><p>Mercedes-Benz repairs, maintenance, diagnosis and vehicle sales in Idimu, Lagos.</p><div class="social"><a data-contact="facebook">Facebook</a><a data-contact="tiktok">TikTok</a><a data-contact="instagram">Instagram</a><a data-contact="whatsapp">WhatsApp</a></div></div><div><h4>Explore</h4><a href="#home">Home</a><a href="#inventory">Inventory</a><a href="#blog">Blog</a><a href="#appointments">Book an Appointment</a><a href="#guide">Mercedes-Benz Guide</a></div><div><h4>Contact</h4><a data-contact="phone">Call the Workshop</a><a data-contact="email">Email Us</a><p>11 Lasu Rd, beside Federal Peace Estate, Idimu, Lagos.</p></div><div><h4>Hours</h4><p>Mon–Fri 8:00 AM–7:00 PM</p><p>Saturday 8:00 AM–3:00 PM</p><p>Sunday Closed</p></div></div><div class="footer-bottom">© 2026 Moses Benz Auto Care</div>';applyContacts()}
function fab(){if($('.fab'))return;const d=document.createElement('div');d.className='fab';d.innerHTML='<a data-contact="phone" aria-label="Call the workshop" title="Call the workshop"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 2.5 9.1 2a1.7 1.7 0 0 1 1.9 1.1l1.2 3.1a1.7 1.7 0 0 1-.4 1.8L10.4 9.4a13.2 13.2 0 0 0 4.2 4.2l1.4-1.4a1.7 1.7 0 0 1 1.8-.4l3.1 1.2A1.7 1.7 0 0 1 22 15l-.5 2.5a2 2 0 0 1-2.1 1.6C10.6 18.5 5.5 13.4 4.9 4.6A2 2 0 0 1 6.6 2.5Z"/></svg></a><a data-contact="whatsapp" aria-label="WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.3 9.3 0 0 0-8 14.1L3 21l4.6-1a9.5 9.5 0 1 0 4.4-17.5Zm0 16.8a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.7.6.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.3Zm4.1-5.4c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.8c-.2.2-.3.2-.5.1a6 6 0 0 1-1.8-1.1 7 7 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.5.2-.4c.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 1.4.6 2 .7 2.4.6.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2Z"/></svg></a>';document.body.appendChild(d);applyContacts()}

function goRoute(hash){
  if(!hash)return;
  const next=String(hash).startsWith('#')?String(hash):'#'+String(hash);
  const overlay=$('#route-transition');
  document.querySelector('.mobile-menu')?.classList.remove('open');
  if(overlay) overlay.classList.add('is-active');
  window.setTimeout(()=>{ location.hash=next.slice(1); },1000);
}
function initMobileRails(){
  document.querySelectorAll('.car-rail').forEach(rail=>{
    if(rail.dataset.autoBound)return;
    rail.dataset.autoBound='1';
    if(rail.scrollWidth<=rail.clientWidth)return;
    let timer=window.setInterval(()=>{
      if(document.hidden)return;
      const max=rail.scrollWidth-rail.clientWidth;
      const next=rail.scrollLeft+Math.max(rail.clientWidth*.82,260);
      if(next>=max-8) rail.scrollTo({left:0,behavior:'smooth'});
      else rail.scrollTo({left:next,behavior:'smooth'});
    },2800);
    rail.addEventListener('mouseenter',()=>clearInterval(timer),{passive:true});
    rail.addEventListener('mouseleave',()=>{timer=window.setInterval(()=>{
      const max=rail.scrollWidth-rail.clientWidth;
      const next=rail.scrollLeft+Math.max(rail.clientWidth*.82,260);
      rail.scrollTo({left:next>=max-8?0:next,behavior:'smooth'});
    },2800)},{passive:true});
  });
  const homeRail=$('#home-cars');
  if(homeRail&&!homeRail.dataset.autoBound){
    homeRail.dataset.autoBound='1';
    window.setInterval(()=>{
      if(document.hidden||homeRail.scrollWidth<=homeRail.clientWidth)return;
      const max=homeRail.scrollWidth-homeRail.clientWidth;
      const next=homeRail.scrollLeft+homeRail.clientWidth*.88;
      homeRail.scrollTo({left:next>=max-8?0:next,behavior:'smooth'});
    },2800);
  }
}
function initGallery(){
  const track=document.querySelector('.gallery-track');
  if(!track||track.dataset.autoBound)return;
  track.dataset.autoBound='1';
  const frames=[...track.children]; let index=0;
  if(frames.length<2)return;
  const move=()=>{
    const first=frames[0];
    const width=first.getBoundingClientRect().width+18;
    index=(index+1)%frames.length;
    track.style.transform=`translateX(-${index*width}px)`;
    track.style.transition='transform .8s ease';
  };
  window.setInterval(()=>{if(!document.hidden)move();},3000);
}
function initReviewsCarousel(){
  const root=$('#reviews');
  if(!root||root.dataset.carouselBound)return;
  root.dataset.carouselBound='1';
  const move=()=>{
    if(root.children.length<2)return;
    const first=root.firstElementChild;
    const width=first.getBoundingClientRect().width+18;
    root.style.transform=`translateX(-${width}px)`;
    root.style.transition='transform 1.2s ease';
    setTimeout(()=>{
      root.style.transition='none';
      root.appendChild(root.firstElementChild);
      root.style.transform='translateX(0)';
    },1250);
  };
  window.setInterval(()=>{if(!document.hidden)move();},3800);
}

function carCard(c){return '<article class="car-card" data-slug="'+esc(c.slug)+'"><img src="'+BASE+esc(c.image)+'" alt="'+esc(c.name)+'" loading="lazy"><div><div class="car-title"><h3>'+esc(c.name)+'</h3><b>'+fmt(c.priceNGN)+'</b></div><p>'+esc(c.year)+' · '+esc(c.specTag)+' · '+Number(c.mileageKm||0).toLocaleString()+' km</p><span>View full details →</span></div></article>'}
function bindCards(){
  document.querySelectorAll('.car-card').forEach(x=>x.onclick=()=>{
    goRoute('#car/'+encodeURIComponent(x.dataset.slug));
  });
}
function home(){return `<section class="hero"><div class="hero-bg"></div><div class="wrap hero-content"><span class="eyebrow">Idimu, Lagos · Mercedes-Benz Specialists</span><h1>Keep the <i>star</i> running true.</h1><p>Mercedes-Benz diagnosis, servicing, repair and vehicle sales from a specialist workshop in Idimu, Lagos.</p><div class="actions"><a class="btn red" href="#appointments">Book an Appointment</a><a class="btn light" href="#inventory">Browse Inventory</a></div><div class="stats"><div><b>20+</b><span>Certified technicians</span></div><div><b>12+</b><span>Years of experience</span></div><div><b>Mercedes-Benz</b><span>Specialist workshop</span></div><div><b>Idimu</b><span>Lagos</span></div></div></div></section><div class="marquee"><div>C-CLASS · E-CLASS · S-CLASS · GLE · G-CLASS · AMG GT · CLA · EQ · MAYBACH · </div></div><section class="section white"><div class="wrap"><div class="section-head"><span class="eyebrow">Mercedes-Benz Sales</span><h2>Selected vehicles available through Moses Benz.</h2><p>Browse a few vehicles from the full catalogue.</p></div><div id="home-cars" class="car-grid home-car-rail">${cars().filter(c=>c.active!==false).slice(0,3).map(carCard).join('')}</div><div class="center"><a class="btn red" href="#inventory">View Full Inventory</a></div></div></section><section class="section gallery-section"><div class="wrap"><div class="section-head"><span class="eyebrow">Inside Moses Benz</span><h2>Real work. Real cars. Our workshop.</h2></div><div class="gallery"><div class="gallery-track">${['workshop-yard.jpg','street-cars.jpg','workshop-technicians.jpg','front.jpg','workshop-detail.jpg','customer-car.jpg'].map((p,i)=>`<figure><img src="${BASE}/images/workshop-gallery/${p}" alt="Moses Benz workshop photo ${i+1}" loading="lazy"><figcaption>Moses Benz Auto Care workshop</figcaption></figure>`).join('')}</div></div></div></section><section class="section dark"><div class="wrap"><div class="section-head"><span class="eyebrow">How It Works</span><h2>From booking to collection.</h2></div><div class="steps"><article><b>01</b><h3>Book</h3><p>Tell us the Mercedes model and what is happening.</p></article><article><b>02</b><h3>Diagnose</h3><p>We investigate the cause before recommending parts.</p></article><article><b>03</b><h3>Approve & Repair</h3><p>You understand the work before it begins.</p></article><article><b>04</b><h3>Collect</h3><p>We explain what was done and what to watch next.</p></article></div></div></section><section class="section white"><div class="wrap"><div class="section-head"><span class="eyebrow">From the Workshop</span><h2>Useful things to know about your car.</h2></div><div class="blog-grid">${POSTS.slice(0,3).map(postCard).join('')}</div><div class="center"><a class="btn red" href="#blog">Read the Blog</a></div></div></section><section class="section soft"><div class="wrap"><div class="section-head"><span class="eyebrow">Reviews</span><h2>Owners who trust us with the star.</h2></div><div class="reviews-window"><div id="reviews" class="review-grid"><article class="review"><b>Moses Benz Auto Care</b><p>Professional Mercedes-Benz diagnosis, servicing and repair.</p></article><article class="review"><b>Your experience matters</b><p>Share your experience with the workshop below.</p></article></div></div><form id="review-form" class="form-card review-form"><div class="two"><label>Your name *<input name="name" required maxlength="80"></label><label>Mercedes-Benz model<input name="model" maxlength="80" placeholder="C 300"></label></div><label>Rating *<select name="rating" required><option value="">Choose a rating</option><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Poor</option></select></label><label>Your review *<textarea name="review" rows="4" required maxlength="2000"></textarea></label><button class="btn red" type="submit">Submit Review</button><p id="review-status" class="status"></p></form></div></section><section class="section white"><div class="wrap career-card"><div><span class="eyebrow">Careers</span><h2>Build your career around Mercedes-Benz.</h2><p>We are interested in skilled, disciplined people who care about proper automotive work.</p></div><a class="btn red" href="#careers">Explore Careers</a></div></section><section class="find"><div class="map"><iframe src="https://www.google.com/maps?q=Moses+Benz+Auto+Care,+11+Lasu+Rd,+Idimu,+Lagos&output=embed" loading="lazy" title="Moses Benz Auto Care map"></iframe></div><div class="find-copy"><span class="eyebrow">Find Us</span><h2>11 Lasu Rd, Idimu, Lagos.</h2><p>Beside Federal Peace Estate, just off the Lasu-Isheri axis.</p><a class="btn red" href="https://www.google.com/maps/place/?q=place_id:ChIJ9wS7aQCROxARHinfFB1ds1w" target="_blank">Open in Google Maps</a></div></section>`}
function postCard(p){return '<article class="blog-card"><img src="'+BASE+'/images/workshop-yard.jpg" alt="'+esc(p.title)+'" loading="lazy"><div><span class="eyebrow">'+esc(p.category)+'</span><h2>'+esc(p.title)+'</h2><p>'+esc(p.excerpt)+'</p><a href="#blog/'+encodeURIComponent(p.slug)+'">Read article →</a></div></article>'}
async function inventory(){const q=norm(new URLSearchParams(location.hash.split('?')[1]||'').get('q')||'');return `<section class="page-head"><div class="wrap"><span class="eyebrow">For Sale</span><h1>Mercedes-Benz inventory.</h1><p>Search C300, C 300, C-300, G63, G 63 or any common model spelling.</p></div></section><section class="section white"><div class="wrap"><div class="search-row"><input id="inventory-search" value="${esc(q)}" type="search" placeholder="Search Mercedes model, year, engine…"><span id="inventory-count"></span></div><div id="inventory-list"></div></div></section>`}
function renderInventory(){const root=$('#inventory-list'),input=$('#inventory-search');if(!root)return;const render=()=>{const q=norm(input.value),list=cars().filter(c=>c.active!==false&&(!q||norm([c.name,c.slug,c.description,c.specTag,c.year,...(c.searchAliases||[])].join(' ')).includes(q)));$('#inventory-count').textContent=list.length+' vehicles';const groups={};list.forEach(c=>{const m=c.name.match(/^([A-Z]+)/i);const key=m?m[1].toUpperCase():'AMG';(groups[key]??=[]).push(c)});root.innerHTML=Object.entries(groups).map(([g,items])=>'<section class="inventory-group"><div class="group-head"><h2>'+esc(g)+' Class</h2><span>'+items.length+' vehicles</span></div><div class="car-rail">'+items.map(carCard).join('')+'</div></section>').join('')||'<div class="empty">No Mercedes-Benz vehicle matched that search.</div>';bindCards()};input.oninput=render;render()}
async function car(slug){const c=cars().find(x=>x.slug===slug);if(!c)return '<section class="section white"><div class="wrap empty"><h1>Vehicle not found</h1><a class="btn red" href="#inventory">Back to Inventory</a></div></section>';return `<section class="section white"><div class="wrap"><a class="back" href="#inventory">← Back to Inventory</a><div class="detail-grid"><div><img class="detail-image" src="${BASE}${esc(c.image)}" alt="${esc(c.name)}"></div><div><span class="eyebrow">Mercedes-Benz · For Sale</span><h1>${esc(c.name)}</h1><div class="detail-price">${fmt(c.priceNGN)}</div><p>${esc(c.description)}</p><button id="car-wa" class="btn red">Chat about this car on WhatsApp</button></div></div><div class="spec-panel"><h2>Full details</h2><div class="spec-grid">${[['Year',c.year],['Mileage',(c.mileageKm||0)+' km'],['Specification',c.specTag],['Condition',c.condition],['Transmission',c.transmission],['Fuel',c.fuel],['Body',c.body],['Drivetrain',c.drivetrain],['Engine',c.engineSize],['Colour',c.color],['Interior',c.interiorColor],['Seats',c.seats]].filter(x=>x[1]).map(x=>'<div><span>'+esc(x[0])+'</span><b>'+esc(x[1])+'</b></div>').join('')}</div></div></div></section>`}
function bindCar(slug){const c=cars().find(x=>x.slug===slug),b=$('#car-wa');if(b&&c)b.onclick=()=>{const n=String(settings.whatsapp).replace(/\D/g,'');if(n)window.open('https://wa.me/'+n+'?text='+encodeURIComponent(`Hello Moses Benz Auto Care. I am interested in the ${c.name} (${c.year}). Please send me the full current details and availability.`),'_blank')}}
async function blog(slug){
  if(slug){
    const r=await api('blog_posts?select=*&published=eq.true&slug=eq.'+encodeURIComponent(slug));
    const p=r.ok&&r.data?.[0]?r.data[0]:POSTS.find(x=>x.slug===slug);
    if(!p)return '<section class="section white"><div class="wrap empty"><h1>Article not found</h1><a class="btn red" href="#blog">Back to Blog</a></div></section>';
    const paras=String(p.content||'').split(/\n\n+/).filter(Boolean).map(x=>'<p>'+esc(x)+'</p>').join('');
    return `<section class="section white"><div class="wrap article"><a href="#blog" class="back">← Back to Blog</a><span class="eyebrow">${esc(p.category)}</span><h1>${esc(p.title)}</h1><p class="article-meta">${esc(p.author||'Moses Benz Auto Care')}</p><div class="article-body">${paras}</div><section class="comments"><div class="section-head"><span class="eyebrow">Community</span><h2>Comments</h2><p>Have a question or something useful to add? Leave a comment below.</p></div><div id="blog-comments" class="comment-list"><p class="muted">Loading comments…</p></div><form id="blog-comment-form" class="form-card"><input type="hidden" name="post_slug" value="${esc(p.slug)}"><label>Your name *<input name="name" required maxlength="80"></label><label>Your comment *<textarea name="comment" rows="5" required maxlength="2000"></textarea></label><button class="btn red" type="submit">Post Comment</button><p id="comment-status" class="status"></p></form></section></div></section>`;
  }
  return `<section class="page-head"><div class="wrap"><span class="eyebrow">Blog</span><h1>Useful things to know about your Mercedes-Benz.</h1><p>Practical maintenance, diagnosis, buying and ownership guidance from the workshop.</p></div></section><section class="section white"><div class="wrap"><div id="blog-list" class="blog-grid">${POSTS.map(postCard).join('')}</div></div></section>`;
}
function bindBlogArticle(slug){
  const list=$('#blog-comments'),form=$('#blog-comment-form'); if(!list||!form)return;
  const load=async()=>{
    const r=await api('blog_comments?select=*&approved=eq.true&post_slug=eq.'+encodeURIComponent(slug)+'&order=created_at.asc');
    if(!r.ok){list.innerHTML='<p class="muted">Comments are temporarily unavailable.</p>';return;}
    const rows=Array.isArray(r.data)?r.data:[];
    list.innerHTML=rows.length?rows.map(x=>`<article class="comment"><div><strong>${esc(x.name)}</strong><small>${new Date(x.created_at).toLocaleDateString('en-NG',{year:'numeric',month:'long',day:'numeric'})}</small></div><p>${esc(x.comment)}</p>${x.admin_reply?`<div class="admin-reply"><strong>Moses Benz Auto Care</strong><p>${esc(x.admin_reply)}</p></div>`:''}</article>`).join(''):'<p class="muted">No comments yet. Be the first to share something useful.</p>';
  };
  form.onsubmit=async e=>{
    e.preventDefault(); const btn=form.querySelector('button'); const status=$('#comment-status'); const fd=new FormData(form);
    btn.disabled=true; status.textContent='Posting comment…';
    const r=await api('blog_comments',{method:'POST',body:JSON.stringify({post_slug:slug,name:String(fd.get('name')).trim(),comment:String(fd.get('comment')).trim(),approved:true})});
    if(r.ok){status.textContent='Comment posted.';form.reset();await load();}else status.textContent='Could not post the comment. Please try again.';
    btn.disabled=false;
  };
  load();
}
function appointments(){return `<section class="page-head"><div class="wrap"><span class="eyebrow">Appointment</span><h1>Book an appointment.</h1><p>Your request is saved for the workshop and WhatsApp opens with the same details.</p></div></section><section class="section white"><div class="wrap narrow"><form id="appointment-form" class="form-card"><label>Full Name *<input name="name" required></label><label>Email *<input name="email" type="email" required></label><label>WhatsApp *<input name="phone" required></label><div class="two"><label>Vehicle Model *<input name="model" placeholder="C 300" required></label><label>Year *<input name="year" type="number" required></label></div><label>Location *<input name="location" required></label><label>What is the car doing? *<textarea name="message" rows="7" required></textarea></label><button class="btn red">Send Appointment Request</button><p id="appointment-status" class="status"></p></form></div></section>`}
function bindAppointment(){
  const f=$('#appointment-form');
  if(!f)return;
  f.onsubmit=async e=>{
    e.preventDefault();
    const fd=new FormData(f);
    const p={
      id:'apt-'+Date.now().toString(36),
      name:fd.get('name'),
      email:fd.get('email'),
      phone:fd.get('phone'),
      model:fd.get('model'),
      year:Number(fd.get('year')),
      location:fd.get('location'),
      service:'Appointment Request',
      message:String(fd.get('message')),
      status:'requested'
    };
    const status=$('#appointment-status');
    status.textContent='Saving request…';
    await api('appointments',{method:'POST',body:JSON.stringify(p)});
    const n=String(settings.whatsapp).replace(/\D/g,'');
    status.textContent='Request received. Opening WhatsApp…';
    if(n){
      const text=`Hello Moses Benz Auto Care. I would like to book an appointment.\nFull Name: ${p.name}\nEmail: ${p.email}\nWhatsApp: ${p.phone}\nVehicle: ${p.model} (${p.year})\nLocation: ${p.location}\nWhat is the car doing: ${p.message}`;
      location.href='https://wa.me/'+n+'?text='+encodeURIComponent(text);
    }
  };
}

function contact(){return `<section class="page-head"><div class="wrap"><span class="eyebrow">Contact</span><h1>Talk to Moses Benz Auto Care.</h1><p>Call, WhatsApp, email or book an appointment.</p></div></section><section class="section white"><div class="wrap contact-grid"><div class="contact-card"><span>01</span><h2>Call the Workshop</h2><p>Speak directly with the workshop.</p><a data-contact="phone" class="btn red">Call Us</a></div><div class="contact-card"><span>02</span><h2>WhatsApp</h2><p>Send a message and include your vehicle model.</p><a data-contact="whatsapp" class="btn red" target="_blank">WhatsApp Us</a></div><div class="contact-card"><span>03</span><h2>Book an Appointment</h2><p>Send the vehicle details and the issue directly to the workshop.</p><a class="btn red" href="#appointments">Book an Appointment</a></div><div class="contact-card"><span>04</span><h2>Email</h2><p>Use email when you prefer a written request.</p><a data-contact="email" class="btn red">Email Us</a></div><div class="contact-card"><span>05</span><h2>Facebook</h2><p>Follow workshop updates.</p><a data-contact="facebook" class="btn red" target="_blank">Facebook</a></div><div class="contact-card"><span>06</span><h2>TikTok</h2><p>See workshop clips and vehicle content.</p><a data-contact="tiktok" class="btn red" target="_blank">TikTok</a></div><div class="contact-card"><span>07</span><h2>Instagram</h2><p>Follow workshop updates and Mercedes-Benz content.</p><a data-contact="instagram" class="btn red" target="_blank">Instagram</a></div><div class="contact-card"><span>08</span><h2>YouTube</h2><p>Watch workshop videos and useful guides.</p><a data-contact="youtube" class="btn red" target="_blank">YouTube</a></div><div class="contact-card"><span>09</span><h2>X</h2><p>Follow workshop news and updates.</p><a data-contact="x" class="btn red" target="_blank">X</a></div></div></section>`}
function careers(){return `<section class="page-head"><div class="wrap"><span class="eyebrow">Careers</span><h1>Work with a Mercedes-Benz specialist.</h1><p>We are interested in skilled, disciplined people who care about proper automotive work.</p></div></section><section class="section white"><div class="wrap narrow prose"><h2>Join Moses Benz Auto Care</h2><p>Tell us about your experience, the kind of work you do best and why you want to work around Mercedes-Benz vehicles.</p><form id="career-form" class="form-card career-form"><div class="two"><label>Full Name *<input name="name" required maxlength="120"></label><label>Phone / WhatsApp *<input name="phone" required maxlength="40"></label></div><label>Email<input name="email" type="email" maxlength="160"></label><label>Role you are applying for *<input name="role" required placeholder="Mercedes-Benz Technician, Auto Electrician, etc."></label><label>Experience *<textarea name="experience" rows="4" required placeholder="Tell us about your experience and skills."></textarea></label><label>Anything else<textarea name="message" rows="4" placeholder="Qualifications, certifications or other information"></textarea></label><button class="btn red" type="submit">Submit Application</button><p id="career-status" class="status"></p></form></div></section>`}
function bindCareerForm(){
  const f=$('#career-form'); if(!f||f.dataset.bound)return; f.dataset.bound='1';
  f.onsubmit=async e=>{
    e.preventDefault();const fd=new FormData(f),btn=f.querySelector('button'),status=$('#career-status');
    const p={name:String(fd.get('name')).trim(),phone:String(fd.get('phone')).trim(),email:String(fd.get('email')||'').trim(),role:String(fd.get('role')).trim(),experience:String(fd.get('experience')).trim(),message:String(fd.get('message')||'').trim()};
    const msg=`Hello Moses Benz Auto Care, I would like to apply for a role.\nName: ${p.name}\nPhone/WhatsApp: ${p.phone}\nEmail: ${p.email||'Not provided'}\nRole: ${p.role}\nExperience: ${p.experience}\n${p.message?'Additional information: '+p.message:''}`;
    btn.disabled=true;status.textContent='Preparing your application…';
    let sent=false;
    const email=String(settings.email||'').trim();
    if(email){
      try{
        const body=new URLSearchParams({...p,_subject:`New job application — ${p.name}`,_replyto:p.email,_captcha:'false',_template:'table'});
        const r=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(email),{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
        sent=r.ok;
      }catch{}
    }
    const wa=String(settings.whatsapp||'').replace(/\D/g,'');
    if(wa)window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(msg),'_blank','noopener');
    status.textContent=sent?'Application sent. WhatsApp has also been opened for direct follow-up.':'WhatsApp has been opened with your application details. Tap Send there to complete it.';
    f.reset();btn.disabled=false;
  };
}
function guide(){return `<section class="page-head"><div class="wrap"><span class="eyebrow">Mercedes-Benz Guide</span><h1>Mercedes-Benz ownership guidance.</h1></div></section><section class="section white"><div class="wrap prose"><h2>Diagnosis before parts</h2><p>A warning code is a clue, not automatically a command to replace a part. Good diagnosis combines fault codes, live information, physical inspection and the owner's description of the problem.</p><h2>Maintenance in Lagos</h2><p>Heat, traffic, dust and repeated short trips make regular inspection important. Keep records of oil, filters, brakes, tyres, battery and major repairs.</p><h2>Buying a used Mercedes-Benz</h2><p>Check documentation, body condition, service history, mechanical behaviour and diagnostic information before money changes hands.</p></div></section>`}
async function render(){const hash=location.hash.replace(/^#/,'')||'home',parts=hash.split('/'),route=parts[0],arg=parts.slice(1).join('/');let html=route==='home'?home():route==='inventory'?await inventory():route==='car'?await car(decodeURIComponent(arg)):route==='blog'?await blog(arg?decodeURIComponent(arg):''):route==='appointments'?appointments():route==='contact'?contact():route==='careers'?careers():route==='guide'?guide():home();$('#app').innerHTML=html;$('#route-transition')?.classList.remove('is-active');window.scrollTo({top:0,behavior:'instant'});footer();fab();applyContacts();if(route==='home'){bindCards();homeReviews();bindReviewForm();initGallery()}if(route==='inventory'){renderInventory();initMobileRails();}if(route==='car')bindCar(decodeURIComponent(arg));if(route==='appointments')bindAppointment();if(route==='careers')bindCareerForm();if(route==='blog'){bindCards();if(arg){bindBlogArticle(decodeURIComponent(arg));}}}
async function homeReviews(){
  const r=await api('reviews?select=*&approved=eq.true&order=created_at.desc&limit=12'),root=$('#reviews');
  if(root&&r.ok&&Array.isArray(r.data)&&r.data.length){
    root.innerHTML=r.data.map(x=>`<article class="review"><b>${esc(x.name||'Customer')}</b>${x.model?`<small>${esc(x.model)}</small>`:''}<p>“${esc(x.review||'Great service.')}”</p><span class="stars">${'★'.repeat(Math.max(1,Math.min(5,Number(x.rating)||5)))}</span></article>`).join('');
  }
  initReviewsCarousel();
}
function bindReviewForm(){
  const f=$('#review-form'); if(!f||f.dataset.bound)return; f.dataset.bound='1';
  f.onsubmit=async e=>{
    e.preventDefault(); const fd=new FormData(f),btn=f.querySelector('button'),status=$('#review-status');
    btn.disabled=true; status.textContent='Submitting review…';
    const payload={id:'review-'+Date.now().toString(36),name:String(fd.get('name')).trim(),model:String(fd.get('model')||'').trim(),rating:Number(fd.get('rating')),review:String(fd.get('review')).trim(),approved:true};
    const r=await api('reviews',{method:'POST',body:JSON.stringify(payload)});
    if(r.ok){status.textContent='Thank you. Your review has been added.';f.reset();await homeReviews();}
    else status.textContent='We could not add the review right now. Please try again.';
    btn.disabled=false;
  };
}
function boot(){
  const bar=$('#top-progress'); if(bar){bar.style.width='100%';setTimeout(()=>bar.remove(),350)}
  const menu=document.querySelector('.menu-btn'),drawer=document.querySelector('.mobile-menu');
  menu?.addEventListener('click',()=>drawer?.classList.toggle('open'));
  drawer?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>drawer.classList.remove('open')));
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');
    if(!a)return;
    const href=a.getAttribute('href');
    if(!href||href==='#'||a.closest('form')||a.dataset.noDelay==='true')return;
    e.preventDefault();
    drawer?.classList.remove('open');
    goRoute(href);
  });
  render();
  loadSettings().then(()=>{applyContacts();footer();});
  window.addEventListener('hashchange',render);
}
boot();