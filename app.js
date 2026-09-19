const SB=window.MBAC_SUPABASE||{url:'',anonKey:''};
const BASE='';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const norm=s=>String(s??'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
let settings={phone:'',whatsapp:'',email:'',instagram:'',facebook:'',youtube:'',tiktok:'',x:''};
const POSTS=[
{slug:"how-to-keep-your-mercedes-benz-healthy-in-lagos",category:"Mercedes-Benz Maintenance",title:"How to Keep Your Mercedes-Benz Healthy in Lagos",excerpt:"Practical habits for keeping a Mercedes-Benz dependable through Lagos traffic, heat, dust and stop-start driving.",content:"Owning a Mercedes-Benz in Lagos rewards consistency more than any single expensive repair ever will. The most useful maintenance habit is not waiting for a major fault before visiting a specialist. Keep the service history, follow the correct service intervals for your specific model and pay close attention to changes in sound, smell, vibration or performance, because those small signals almost always arrive well before an actual breakdown does.\n\nTraffic changes how a car is used in ways that owners rarely plan around. Long periods of idling, repeated acceleration and braking, short trips and hot weather can place far more demand on cooling, braking, transmission and electrical systems than the same car would experience on an open highway. A car that feels completely normal today can still benefit from a scheduled inspection, simply because Lagos driving conditions quietly work components harder than distance alone would suggest.\n\nCheck the basics between services rather than waiting for the next appointment to reveal them. Look at tyre pressures and tread depth, make sure every exterior light actually works, watch the coolant and washer-fluid levels, and look underneath a parked vehicle for fresh fluid marks on the ground. Do not ignore a warning simply because the car still drives normally; a vehicle can continue running for a long time while a real problem quietly develops underneath.\n\nWhen a warning light appears, diagnosis should always come before parts are ordered. Clearing a fault code may remove the dashboard message temporarily without ever fixing the underlying cause, which usually means the same warning returns within days or weeks. A proper inspection combines fault codes, live sensor data, physical checks and the driver's own description of when and how the problem happens.\n\nKeep records of oil and filter changes, brake work, tyres, battery replacement and any major repairs carried out on the vehicle. A clear, organised history makes future diagnosis considerably easier for whoever works on the car next, and it also helps preserve the resale value of the vehicle by showing a prospective buyer exactly how it has been looked after.\n\nFinally, choose a workshop that genuinely understands Mercedes-Benz systems rather than treating every vehicle as a generic car with generic problems. Specialist knowledge saves real time and money because the technician starts with the right questions, recognises model-specific patterns immediately, and follows the correct diagnostic approach instead of guessing their way toward an answer."},
{slug:"what-dashboard-warning-lights-are-trying-to-tell-you",category:"Mercedes-Benz Knowledge",title:"What Dashboard Warning Lights Are Trying to Tell You",excerpt:"Understand what your Mercedes-Benz is trying to communicate before you reset a warning and carry on driving.",content:"Dashboard warnings are the car's way of communicating that a system needs attention right now rather than at some vague point in the future. They should not automatically be treated as proof that one particular part has failed, because a single warning light can sit at the end of a chain of possible causes that only a proper inspection can actually narrow down.\n\nThe first question is always whether the warning is red, amber or accompanied by a serious change in how the vehicle actually drives. A red warning, or a major braking, steering, overheating or engine problem, deserves immediate attention rather than a wait-and-see approach. If the car feels unsafe to continue driving in any way, stop as soon as it is safe to do so and arrange professional assistance straight away.\n\nAmber warnings still deserve proper investigation even though they feel less urgent. A sensor, battery condition, wiring problem, fluid issue or another system fault can all trigger the same message on the dashboard. Resetting the warning without finding its actual cause can allow the underlying problem to keep developing quietly until it eventually becomes a far more expensive repair than it needed to be.\n\nMercedes-Benz vehicles use multiple control units that constantly communicate with one another behind the scenes. This means one relatively small fault can create several different symptoms across seemingly unrelated systems. A technician should read the stored fault information, examine live values where appropriate, and physically inspect the vehicle before recommending any parts be replaced.\n\nWrite down exactly what happened when the warning first appeared, because those details are more useful than they might seem. Note whether the engine was cold or hot, whether the vehicle was accelerating or idling, and whether you noticed any loss of power, vibration or unusual noise alongside the message. Those small observations can genuinely save diagnostic time once the car is on the ramp.\n\nIf a warning disappears after restarting the vehicle, do not assume the underlying problem has gone away with it. Intermittent faults can be particularly important precisely because they tend to return under the same conditions that triggered them the first time. Keep the message in mind, note when it happened, and arrange a proper check rather than simply hoping it stays away."},
{slug:"why-short-trips-can-be-hard-on-your-car",category:"Mercedes-Benz Maintenance",title:"Why Short Trips Can Be Hard on Your Mercedes-Benz",excerpt:"Frequent short journeys create a different maintenance pattern from long highway driving.",content:"A five-minute drive may feel completely easy on a car because the engine has barely had time to work hard. Mechanically, however, repeated short journeys can create their own particular set of challenges that a longer drive would never expose in the same way, and those challenges tend to build up quietly over months rather than announcing themselves immediately.\n\nAn engine needs real time to reach its normal operating temperature before it is working under ideal conditions. When a vehicle is repeatedly started, driven briefly and then switched off again, some systems spend much of their time warming up rather than actually operating under the steady conditions they were designed around, which changes how components wear over the long run.\n\nShort journeys can also mean more cold starts, more idling and more stop-start operation packed into a single day. In busy Lagos traffic, that pattern is frequently combined with heat and long periods of low-speed driving, stacking several demanding conditions on top of one another rather than spreading them out the way a longer, steadier drive naturally would.\n\nThis does not mean every short trip is harmful, or that you should start taking unnecessary long drives just to compensate for it. It means your maintenance routine should genuinely reflect how the vehicle is actually used day to day. Service intervals, fluid checks, battery condition and tyre inspection all remain important regardless of how far the car typically travels between drives.\n\nIf a Mercedes-Benz is used mainly for short journeys around town, tell the technician exactly that during any visit. Usage history is genuinely useful diagnostic information, not just background detail. A good service plan is built around the real operating conditions the car experiences rather than an idealised driving pattern that rarely matches how the vehicle is actually driven.\n\nPay attention to repeated symptoms such as slow starting, rough running, unusual smells or warning messages that keep reappearing. Early investigation is almost always easier, faster and cheaper than waiting for a small issue to quietly develop into a full breakdown somewhere inconvenient."},
{slug:"what-to-check-before-buying-a-used-mercedes-benz",category:"Buying Guide",title:"What to Check Before Buying a Used Mercedes-Benz",excerpt:"A careful inspection can reveal much more than a clean exterior and a convincing sales description.",content:"A used Mercedes-Benz should be evaluated as a complete vehicle, not just by its badge, year and appearance in a set of photos. Before any money changes hands, take the time to establish exactly what you are actually buying, because the badge on the boot tells you almost nothing about the condition of what is underneath it.\n\nStart with the documentation available for the vehicle. Check the model, year, identification details and any available service history you can get hold of. Ask direct questions about previous repairs, accident damage and major component replacement. Incomplete history does not automatically make a car bad, but it should make you noticeably more careful before committing.\n\nInspect the body carefully in good daylight rather than under showroom lighting. Look for inconsistent paint texture, uneven panel gaps, overspray, repaired areas and any signs that panels have been replaced rather than original. Then move on to inspect the tyres, wheels, lights, glass and visible suspension components for anything that looks unusually worn or mismatched.\n\nDuring a proper road test, pay close attention to starting, idle quality, transmission behaviour, steering, braking, suspension noise and acceleration under load. A vehicle can look genuinely excellent from the outside while quietly hiding expensive mechanical problems that only reveal themselves once you are actually driving it.\n\nA diagnostic scan is valuable, but it is not a substitute for a thorough physical inspection carried out by someone who knows what to look for. Stored faults, current faults, live data and the actual condition of the components all matter together. Ask the inspecting technician to explain their findings clearly instead of simply handing you a list of unexplained codes.\n\nBudget for immediate maintenance as well as the purchase price itself. Even a genuinely healthy used car may need fluids, filters, tyres or other routine work shortly after purchase. Knowing the likely cost of that work before buying gives you a much clearer and more honest picture of the real total value of the deal."},
{slug:"when-should-you-check-your-brake-system",category:"Safety & Maintenance",title:"When Should You Check Your Mercedes-Benz Brake System?",excerpt:"Noise, vibration, pulling and changes in pedal feel should never be treated as normal wear.",content:"Brakes are one of the systems where small changes deserve attention. You do not need to wait until a warning appears before checking them.\n\nA squeal can have several causes, including pad material, surface condition or wear. Grinding is more concerning because it can indicate that friction material has become severely worn. Neither sound should be diagnosed from the noise alone.\n\nNotice how the vehicle behaves under braking. Pulling to one side, vibration through the steering wheel, a pedal that feels different or a longer stopping response should prompt an inspection.\n\nA proper brake check considers pads, discs, calipers, hoses and related components. Tyres and suspension can also affect how braking feels, so the complete system matters.\n\nBrake wear is not identical on every Mercedes-Benz model. Driving style, traffic conditions, vehicle weight and component quality all affect service life. Regular inspection gives you a chance to replace worn components before they become a bigger problem.\n\nIf you are unsure whether a brake noise is serious, arrange a specialist inspection rather than guessing. A few minutes of checking can provide much more confidence than continuing to drive and hoping the sound disappears."},
{slug:"how-to-look-after-your-car-battery",category:"Electrical & Maintenance",title:"How to Look After Your Mercedes-Benz Battery",excerpt:"Battery condition affects starting, electronics and the stability of modern vehicle systems.",content:"Modern Mercedes-Benz vehicles depend heavily on electrical systems. That makes battery health more important than many drivers realise.\n\nA weak battery may first appear as slow starting or an occasional electrical message. Other symptoms can include unusual behaviour from convenience features or repeated low-voltage faults. These signs deserve investigation.\n\nHeat and repeated short trips can be demanding for batteries. If a car sits unused for long periods, the battery can also lose charge. The correct charging and replacement approach depends on the vehicle and its electrical system.\n\nDo not judge battery health by voltage alone. A proper test can examine starting performance and available capacity. The vehicle may also need the battery replacement to be registered or configured correctly depending on its system.\n\nKeep battery terminals and surrounding areas clean and secure, but avoid improvising repairs around sensitive electrical components. If a battery repeatedly goes flat, find out why instead of replacing it again and again.\n\nIf your Mercedes-Benz has become slow to start or is displaying several unrelated electrical warnings, mention all of them during diagnosis. Low system voltage can sometimes create a collection of symptoms that look like separate faults."},
{slug:"understanding-airmatic-suspension-symptoms",category:"Suspension",title:"Understanding AIRMATIC Suspension Symptoms",excerpt:"Learn the signs that can point to an air-suspension problem and why early diagnosis matters.",content:"AIRMATIC suspension can provide a comfortable and controlled ride, but it is also a system that should be diagnosed carefully when its behaviour changes.\n\nOne common sign is a vehicle sitting lower than expected, especially after being parked. Uneven ride height can suggest a leak or another suspension-system issue, but the exact cause needs to be established.\n\nYou may also notice a compressor running for longer than usual, unusual noises, a warning message or changes in ride quality. These symptoms can have different causes, so replacing an air spring or compressor without testing can waste money.\n\nA technician should inspect the suspension components and air system, check for leaks and use the vehicle's diagnostic information where appropriate. The condition of valves, lines, sensors and the compressor can all be relevant.\n\nIf one corner repeatedly drops overnight, record when it happens and whether the vehicle corrects its height after starting. That information can help the technician reproduce the fault.\n\nSuspension faults are easier to manage when addressed early. Continuing to operate a vehicle with a struggling compressor or persistent leak can place additional strain on other components."},
{slug:"why-correct-engine-oil-matters",category:"Engine Care",title:"Why the Correct Engine Oil Matters in a Mercedes-Benz",excerpt:"Oil is more than a lubricant; the correct specification supports the engine's design and service requirements.",content:"Engine oil has several jobs. It lubricates moving parts, helps manage heat, carries contaminants toward the filter and supports the operation of systems that depend on oil pressure and flow.\n\nFor a Mercedes-Benz, the important question is not simply whether an oil is described as synthetic or premium. The oil must meet the specification appropriate to the particular engine and service requirement.\n\nUsing the wrong product or extending an interval beyond what the vehicle needs can create unnecessary risk. Modern engines may have turbochargers, variable valve systems and other components that place specific demands on lubrication.\n\nCheck the vehicle's required specification and use a reputable product. During servicing, the filter should also be replaced correctly and the technician should check for leaks.\n\nOil level matters too. Both low and excessive oil levels can cause problems. If you repeatedly need to top up between services, investigate the reason rather than treating the top-up as a permanent solution.\n\nKeep the service record. Recording the oil specification, date and mileage creates a useful maintenance history and makes future servicing more straightforward."},
{slug:"simple-tyre-checks-every-driver-can-do",category:"Tyres & Safety",title:"Simple Tyre Checks Every Mercedes-Benz Driver Can Do",excerpt:"A few quick checks can help you catch tyre problems before they affect handling.",content:"Tyres are the only part of the vehicle continuously touching the road, so their condition deserves regular attention.\n\nCheck pressures when the tyres are cold and use the vehicle's recommended pressure rather than guessing. The correct value can vary with load and model, so use the information supplied for your vehicle.\n\nLook across the tread instead of checking only the centre. Uneven wear can provide clues about alignment, suspension, pressure or tyre condition. Look for cuts, bulges, cracks and objects lodged in the tread.\n\nDo not judge a tyre only by how much tread appears to remain. Age, damage and condition also matter. A tyre with adequate-looking tread can still require replacement if it has deteriorated.\n\nIf your Mercedes-Benz pulls to one side, vibrates at certain speeds or develops unusual tyre wear, have the complete wheel and suspension setup checked. Balancing and alignment are different jobs and both may be relevant.\n\nA short tyre inspection before longer journeys is a simple habit. If you see anything you cannot confidently assess, ask a specialist to inspect it rather than taking a chance."},
{slug:"why-diagnosis-should-come-before-parts",category:"Mercedes-Benz Diagnostics",title:"Why Diagnosis Should Come Before Parts",excerpt:"Good Mercedes-Benz repair starts with evidence, not a guess about which component to replace.",content:"Replacing parts until a warning disappears is an expensive way to diagnose a vehicle. A better approach is to identify the cause first.\n\nModern Mercedes-Benz vehicles contain many interconnected control units and sensors. A single symptom may have several possible causes, while one underlying electrical or mechanical problem can produce several warnings.\n\nFault codes are useful clues, but a code does not always mean that the named component itself is defective. The technician needs to interpret the code alongside live data, wiring information, physical inspection and the circumstances in which the fault occurs.\n\nA good diagnosis also starts with the customer. When did the problem begin? Was anything repaired recently? Does it happen when the engine is cold, when the car is hot, during acceleration, after rain or only occasionally? These details can narrow the investigation.\n\nOnce the cause is established, the repair can be explained clearly. You know what has failed, what needs to be done and why the recommended parts or labour are necessary.\n\nThat process is especially valuable on premium vehicles where unnecessary parts replacement can become expensive very quickly. Diagnosis is not an extra step before repair; it is part of good repair."},
{slug:"foreign-used-vs-nigeria-used-mercedes-benz",category:"Buying Guide",title:"Foreign Used vs Nigeria Used Mercedes-Benz: What Really Changes",excerpt:"The labels tell you where a car spent its life, not automatically which one is the safer buy.",content:"Buyers in Lagos often treat \"Foreign Used\" and \"Nigeria Used\" as a simple ranking, as though one label always means a better car than the other. In reality the label describes where the vehicle has spent most of its life, not the condition of any individual example, and both categories contain excellent cars and neglected ones.\n\nA Foreign Used Mercedes-Benz typically arrives after being driven in a market with different roads, fuel quality, climate and servicing culture. That can mean gentler wear in some areas, but it also means the car's early service history, accident record and true mileage are harder to verify once it lands in Nigeria and changes hands a few times.\n\nA Nigeria Used Mercedes-Benz has usually been serviced locally from new or from an early age, which can leave a clearer paper trail if the first owner kept records. The trade-off is that it has been living with Lagos traffic, heat, fuel variability and road conditions for its entire life, which places its own demands on suspension, cooling and electrical systems.\n\nNeither label tells you about accident repair, flood exposure, how consistently it was serviced, or whether a component has already been quietly replaced with a lower-quality part. Two cars with the same badge, year and condition label can have completely different mechanical histories underneath a similar-looking exterior.\n\nWhat actually matters is what a proper inspection reveals: panel and paint consistency, chassis condition, suspension and steering behaviour, fluid condition, wiring integrity and how the vehicle's systems respond during a real diagnostic check. That inspection tells you far more than the condition label on its own ever will.\n\nWhen you are comparing vehicles in our inventory, use the condition label as a starting point for questions, not as the final verdict. Ask about documented service history, request an inspection before committing, and treat the label as one data point among many rather than the whole story."},
{slug:"preparing-your-mercedes-benz-for-lagos-rainy-season",category:"Seasonal Care",title:"Preparing Your Mercedes-Benz for the Lagos Rainy Season",excerpt:"Flooded roads, standing water and constant humidity create a very different set of demands on your car.",content:"Lagos rain does not arrive gently. Roads flood quickly, drainage struggles to keep up, and a car that felt perfectly fine in the dry season can suddenly reveal weaknesses the moment it has to deal with standing water, spray and constant dampness for weeks at a time.\n\nTyres and brakes deserve attention before the rain sets in properly. Reduced tread depth that was tolerable on dry tarmac becomes far more dangerous on a wet, pothole-scarred road, and brake pads that were due for replacement soon will wear faster still under the additional strain of constant wet-weather braking and standing water.\n\nWater ingress is one of the most expensive mistakes an owner can make. Driving through deep standing water, even slowly, can pull water into the engine through the intake or affect sensitive electrical connectors underneath the vehicle, and a Mercedes-Benz has considerably more of those connectors than an older, simpler car.\n\nElectrical systems and door, boot and sunroof seals are worth checking early rather than after you notice a damp carpet or a warning light that only appears in wet weather. A perished seal that was a minor inconvenience in dry weather can let in enough water during heavy rain to affect carpeting, wiring looms and control modules underneath the cabin floor.\n\nVisibility matters as much as mechanical condition. Worn wiper blades, a washer system that is not topped up, and headlights that have dulled with age all become significantly more dangerous once heavy rain, spray from other vehicles and Lagos evening traffic combine on the same stretch of road.\n\nA short pre-rainy-season inspection covering tyres, brakes, wiper blades, door and window seals, the underbody and drainage channels around the sunroof and boot area can catch most of these issues while they are still simple and affordable to correct, well before the first serious downpour finds them for you."},
{slug:"warning-signs-of-automatic-transmission-trouble",category:"Mercedes-Benz Maintenance",title:"Warning Signs of Automatic Transmission Trouble",excerpt:"A smooth-shifting Mercedes-Benz gearbox can start signalling trouble in ways that are easy to dismiss.",content:"The automatic transmission in a modern Mercedes-Benz is designed to shift so smoothly that most owners never think about it at all, right up until the moment something changes. Because the change is often gradual, it is easy to adjust to it without realising that the car is already telling you something is wrong.\n\nA delayed or harsh engagement when you first move from park into drive or reverse is one of the earliest signs worth paying attention to. A transmission in good health engages promptly and smoothly, and any hesitation, clunk or delay before the car actually moves deserves investigation rather than simply becoming a habit you plan your driving around.\n\nShifting behaviour under normal acceleration is another useful indicator. Shifts that suddenly feel harder than usual, a noticeable slip where the engine revs rise without a matching increase in speed, or hunting between gears on a gentle incline can all point toward fluid condition, internal wear or an electronic control issue that is worth diagnosing early.\n\nTemperature plays a bigger role than most drivers expect. Heavy Lagos traffic keeps a transmission working hard for long periods without the benefit of sustained higher speeds to help cool it, and a transmission that runs consistently hot will age considerably faster than one that gets occasional stretches of steady-speed driving to recover.\n\nWarning messages related to the transmission should never be reset and ignored. Unlike a simple sensor fault, transmission-related faults can escalate quickly from an inconvenience into a very expensive repair if the underlying cause, whether it is fluid condition, a sensor, a solenoid or something more serious, is left unresolved for too long.\n\nIf you notice any combination of delayed engagement, rough shifting, unusual noise during gear changes or a dashboard message, book a proper diagnostic check rather than waiting to see whether the symptom goes away on its own. Transmission problems rarely improve with time, and early diagnosis is consistently the more affordable path."},
{slug:"keeping-your-mercedes-benz-air-conditioning-healthy-in-lagos-heat",category:"Comfort & Climate",title:"Keeping Your Mercedes-Benz Air Conditioning Healthy in Lagos Heat",excerpt:"A struggling air conditioning system is rarely just about refrigerant, especially in constant Lagos heat and traffic.",content:"Lagos heat and traffic mean the air conditioning system in your Mercedes-Benz is almost never given a rest, and that constant demand makes it one of the systems most likely to show its age well before other, less frequently used components ever do.\n\nWeak cooling is often blamed entirely on low refrigerant, but a Mercedes-Benz climate system depends on several components working together, including the compressor, condenser, cabin filter, blend-door actuators and a network of sensors that decide how hot or cold air should be at any given moment inside the cabin.\n\nA cabin air filter clogged with Lagos dust and traffic pollution can noticeably reduce airflow long before anything else in the system has actually failed, leaving the car blowing weaker air even though the compressor and refrigerant charge are both still in perfectly good condition.\n\nUnusual smells, inconsistent temperature between the left and right sides of the cabin, or air conditioning that seems to work fine at idle but weakens noticeably once you are moving in traffic are all useful diagnostic clues rather than random inconveniences to simply live with.\n\nRefrigerant leaks are a common cause of gradually weakening performance, but the correct response is to find and repair the leak rather than repeatedly topping up refrigerant every few months. Repeated top-ups without a leak repair cost more over time and can allow moisture to enter a system that should otherwise stay completely sealed.\n\nHaving the air conditioning system checked before the hottest months arrive, rather than after it has already stopped cooling properly, is the more comfortable and usually the more affordable way to keep a Mercedes-Benz liveable through a Lagos afternoon in traffic."},
{slug:"why-specialist-labour-costs-differ-from-a-generic-mechanic",category:"Mercedes-Benz Knowledge",title:"Why Specialist Labour Costs Differ From a Generic Mechanic",excerpt:"A lower quote is not automatically a better deal once you account for diagnostic accuracy and repeat repairs.",content:"It is natural to compare a specialist workshop's quote against a cheaper estimate from a generic mechanic and wonder why the same-sounding job costs differently. The honest answer is that the two quotes are rarely describing the same process, even when they use similar words to describe the work.\n\nA Mercedes-Benz specialist workshop invests in the correct diagnostic tools, model-specific technical information and ongoing training on systems that change from one generation of vehicle to the next. That investment is reflected in labour rates, but it is also what allows a fault to be identified accurately on the first visit rather than through a slower process of trial and error.\n\nGeneric workshops can perform simple mechanical work perfectly well, and there is nothing wrong with using one for straightforward jobs. The risk appears on more complex, electronically integrated systems, where an incorrect diagnosis can lead to a part being replaced unnecessarily while the actual fault remains completely untouched and continues to cause the same symptom.\n\nRepeated visits to fix the same underlying problem are where a cheaper quote can quietly become the more expensive option overall. Paying less per visit does not help if the car returns with the same fault three times before someone finally identifies the real cause hiding behind it.\n\nSpecialist labour also typically includes the time to explain findings clearly, show supporting diagnostic data where relevant, and discuss realistic options rather than presenting a single unexplained bill at the end. That transparency has a value of its own, particularly on a vehicle where trust in the diagnosis genuinely matters.\n\nWhen comparing quotes, ask what the price actually includes: diagnostic time, the specific parts being used, warranty on the work, and how the technician arrived at their conclusion. A fair comparison is rarely just two numbers sitting side by side without any context behind them."},
{slug:"lagos-roads-suspension-wear-and-wheel-alignment",category:"Suspension",title:"Lagos Roads, Suspension Wear and Wheel Alignment",excerpt:"Potholes and uneven surfaces place a very specific kind of strain on a Mercedes-Benz suspension system.",content:"Every Lagos driver knows the particular jolt of an unseen pothole appearing at the last second, and while a single hard impact rarely destroys a modern Mercedes-Benz suspension outright, the accumulated effect of Lagos roads over months and years is a genuinely different story.\n\nBushings, control arms, ball joints and shock absorbers are all designed around a certain range of expected impact and movement. Repeated hard hits, even relatively minor ones, gradually wear these components faster than the smoother, more predictable roads that many of these parts were originally engineered and tested around.\n\nWheel alignment drifts more easily under these conditions than most owners expect. A single firm pothole impact can be enough to shift alignment out of specification, and a car that is even slightly out of alignment will wear its tyres unevenly, pull gently to one side and place additional, unnecessary strain on suspension components that are already working harder than they should need to.\n\nUnusual noise over bumps, a vehicle that feels less settled and composed than it used to, or tyres wearing unevenly across their width are all signs worth investigating rather than dismissing as simply how Lagos roads feel on any car. A well-maintained Mercedes-Benz should still ride with noticeably more composure than these symptoms suggest.\n\nRegular inspection of suspension bushings, links and shock absorbers, combined with an alignment check whenever new tyres are fitted or after a particularly hard impact, helps catch wear before it starts affecting handling, tyre life and ride comfort all at the same time.\n\nIf your Mercedes-Benz has started to feel noticeably less composed over bumps, or you notice a pull to one side under gentle braking or on a straight, flat road, have the suspension and alignment checked together rather than separately. On Lagos roads, the two problems very often travel together."}
];

function loadRemoteConfig(){return Promise.resolve(window.MBAC_SUPABASE||null)}
async function api(path,opts={}){try{const r=await fetch(SB.url+'/rest/v1/'+path,{...opts,headers:{apikey:SB.anonKey,Authorization:'Bearer '+SB.anonKey,'Content-Type':'application/json',Prefer:'return=representation',...(opts.headers||{})}});let data=null;try{data=await r.json()}catch{}return {ok:r.ok,data,status:r.status}}catch{return {ok:false,data:null,status:0}}}
const rpc=(fn,body)=>api('rpc/'+encodeURIComponent(fn),{method:'POST',body:JSON.stringify(body)});
function fmt(n){return new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(n||0)}
function cars(){return window.MBStore?.getCars?.()||window.MBCars||[]}
async function loadSettings(){
  const r=await api('site_settings?select=*&id=eq.1');
  if(r.ok&&r.data?.[0]){
    settings={...settings,...r.data[0]};
    applyContacts();
  }
  return settings;
}
function applyContacts(){
  const digits=v=>String(v||'').replace(/\D/g,'');
  document.querySelectorAll('[data-contact="phone"]').forEach(a=>{a.href=settings.phone?'tel:+'+digits(settings.phone):'#';a.removeAttribute('aria-disabled');if(!settings.phone)a.setAttribute('aria-disabled','true');});
  document.querySelectorAll('[data-contact="whatsapp"]').forEach(a=>{a.href=settings.whatsapp?'https://wa.me/'+digits(settings.whatsapp):'#';a.removeAttribute('aria-disabled');if(!settings.whatsapp)a.setAttribute('aria-disabled','true');});
  ['facebook','instagram','youtube','tiktok','x'].forEach(k=>document.querySelectorAll('[data-contact="'+k+'"]').forEach(a=>{a.hidden=!settings[k];if(settings[k])a.href=settings[k]}));
  const emailLinks=[...document.querySelectorAll('[data-contact="email"],[data-email]')];
  emailLinks.forEach(a=>{a.href='#';a.onclick=e=>{e.preventDefault();if(!settings.email)return;const to=encodeURIComponent(settings.email),web='https://mail.google.com/mail/?view=cm&fs=1&to='+to;if(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)){location.href='googlegmail:///co?to='+to;setTimeout(()=>location.href=web,900)}else window.open(web,'_blank','noopener')}});
}
function footer(){const f=$('#footer');f.innerHTML='<div class="wrap footer-grid"><div><h3>Moses Benz Auto Care</h3><p>Mercedes-Benz repairs, maintenance, diagnosis and vehicle sales in Idimu, Lagos.</p><div class="social"><a data-contact="facebook" aria-label="Facebook"><i class="fa-solid fa-square-facebook"></i></a><a data-contact="tiktok" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a><a data-contact="instagram" aria-label="Instagram"><i class="fa-solid fa-square-instagram"></i></a><a data-contact="whatsapp" aria-label="WhatsApp"><i class="fa-solid fa-square-whatsapp"></i></a></div></div><div><h4>Explore</h4><a href="#home">Home</a><a href="#inventory">Inventory</a><a href="#blog">Blog</a><a href="#appointments">Book an Appointment</a><a href="#guide">Mercedes-Benz Guide</a></div><div><h4>Contact</h4><a data-contact="phone">Call the Workshop</a><a data-contact="email">Email Us</a><p>11 Lasu Rd, beside Federal Peace Estate, Idimu, Lagos.</p></div><div><h4>Hours</h4><p>Mon–Fri 8:00 AM–7:00 PM</p><p>Saturday 8:00 AM–3:00 PM</p><p>Sunday Closed</p></div></div><div class="footer-bottom">© 2026 Moses Benz Auto Care</div>';applyContacts()}
function fab(){if($('.fab'))return;const d=document.createElement('div');d.className='fab';d.innerHTML='<a data-contact="phone" aria-label="Call the workshop" title="Call the workshop"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 2.5 9.1 2a1.7 1.7 0 0 1 1.9 1.1l1.2 3.1a1.7 1.7 0 0 1-.4 1.8L10.4 9.4a13.2 13.2 0 0 0 4.2 4.2l1.4-1.4a1.7 1.7 0 0 1 1.8-.4l3.1 1.2A1.7 1.7 0 0 1 22 15l-.5 2.5a2 2 0 0 1-2.1 1.6C10.6 18.5 5.5 13.4 4.9 4.6A2 2 0 0 1 6.6 2.5Z"/></svg></a><a data-contact="whatsapp" aria-label="WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.3 9.3 0 0 0-8 14.1L3 21l4.6-1a9.5 9.5 0 1 0 4.4-17.5Zm0 16.8a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.7.6.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.3Zm4.1-5.4c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.8c-.2.2-.3.2-.5.1a6 6 0 0 1-1.8-1.1 7 7 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.5.2-.4c.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 1.4.6 2 .7 2.4.6.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2Z"/></svg></a>';document.body.appendChild(d);applyContacts()}

let routeTimer=null;
function normalizeRouteHash(value){
  const raw=String(value||'').trim();
  if(!raw||raw==='#')return 'home';
  const hash=raw.startsWith('#')?raw.slice(1):raw;
  return hash.replace(/^\/+|\/+$/g,'')||'home';
}
function goRoute(hash){
  if(!hash)return;
  const next=String(hash).startsWith('#')?String(hash):'#'+String(hash);
  const current=normalizeRouteHash(location.hash);
  const target=normalizeRouteHash(next);
  const overlay=$('#route-transition');
  document.querySelector('.mobile-menu')?.classList.remove('open');

  // Re-selecting the page that is already open must be a plain browser reload.
  // Do not start the route transition: that overlay is only for real page changes.
  if(target===current){
    if(routeTimer){window.clearTimeout(routeTimer);routeTimer=null;}
    if(overlay)overlay.classList.remove('is-active');
    window.location.reload();
    return;
  }

  if(routeTimer){window.clearTimeout(routeTimer);routeTimer=null;}
  if(overlay)overlay.classList.add('is-active');
  routeTimer=window.setTimeout(()=>{
    routeTimer=null;
    location.hash=next.slice(1);
  },1000);
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
  let timer=null;
  const move=()=>{
    if(root.children.length<2)return;
    const first=root.firstElementChild;
    const width=first.getBoundingClientRect().width+18;
    root.style.transition='transform 1.8s ease-in-out';
    root.style.transform='translateX(-'+width+'px)';
    window.setTimeout(()=>{
      if(!root.isConnected)return;
      root.style.transition='none';
      root.appendChild(root.firstElementChild);
      root.style.transform='translateX(0)';
      void root.offsetWidth;
    },1850);
  };
  const start=()=>{if(timer)clearInterval(timer);timer=window.setInterval(()=>{if(!document.hidden)move();},4600);};
  root.addEventListener('mouseenter',()=>timer&&clearInterval(timer),{passive:true});
  root.addEventListener('mouseleave',start,{passive:true});
  start();
}

function carCard(c,opts={}){
  const popular=opts.popular||false;
  const meta=[c.specTag,c.mileageKm?Number(c.mileageKm).toLocaleString()+' km':''].filter(Boolean).join(' · ');
  const condition=c.condition?`<span class="stock-meta">${esc(c.condition)}</span>`:'';
  return `<article class="car-card inventory-card${popular?' is-popular':''}" data-slug="${esc(c.slug)}">
    <div class="car-card-media">
      <img src="${BASE+esc(c.image)}" alt="${esc(c.name)}" loading="lazy">
      ${popular?'<span class="car-badge popular-badge">Popular</span>':''}
    </div>
    <div class="car-card-body">
      <b class="card-price">${fmt(c.priceNGN)}</b>
      <h3>${esc(c.name)}</h3>
      ${meta?`<p class="card-meta">${esc(meta)}</p>`:''}
      ${condition}
    </div>
  </article>`;
}
function bindCards(){
  document.querySelectorAll('.car-card').forEach(x=>x.onclick=()=>{
    goRoute('#car/'+encodeURIComponent(x.dataset.slug));
  });
}
function home(){return `<section class="hero"><div class="hero-bg"></div><div class="wrap hero-content"><span class="eyebrow">Idimu, Lagos · Mercedes-Benz Specialists</span><h1>Keep the <i>star</i> running true.</h1><p>Mercedes-Benz diagnosis, servicing, repair and vehicle sales from a specialist workshop in Idimu, Lagos.</p><div class="actions"><a class="btn red" href="#appointments">Book an Appointment</a><a class="btn light" href="#inventory">Browse Inventory</a></div><div class="stats"><div><b>20+</b><span>Certified technicians</span></div><div><b>12+</b><span>Years of experience</span></div><div><b>Mercedes-Benz</b><span>Specialist workshop</span></div><div><b>Idimu</b><span>Lagos</span></div></div></div></section><div class="marquee"><div>C-CLASS · E-CLASS · S-CLASS · GLE · G-CLASS · AMG GT · CLA · EQ · MAYBACH · </div></div><section class="section white"><div class="wrap"><div class="section-head"><span class="eyebrow">Mercedes-Benz Sales</span><h2>Selected vehicles available through Moses Benz.</h2><p>Browse a few vehicles from the full catalogue.</p></div><div id="home-cars" class="car-grid home-car-rail">${cars().filter(c=>c.active!==false).slice(0,3).map(carCard).join('')}</div><div class="center"><a class="btn red" href="#inventory">View Full Inventory</a></div></div></section><section class="section gallery-section"><div class="wrap"><div class="section-head"><span class="eyebrow">Inside Moses Benz</span><h2>Real work. Real cars. Our workshop.</h2></div><div class="gallery"><div class="gallery-track">${['workshop-yard.jpg','street-cars.jpg','workshop-technicians.jpg','front.jpg','workshop-detail.jpg','customer-car.jpg'].map((p,i)=>`<figure><img src="${BASE}/images/workshop-gallery/${p}" alt="Moses Benz workshop photo ${i+1}" loading="lazy"><figcaption>Moses Benz Auto Care workshop</figcaption></figure>`).join('')}</div></div></div></section><section class="section dark"><div class="wrap"><div class="section-head"><span class="eyebrow">How It Works</span><h2>From booking to collection.</h2></div><div class="steps"><article><b>01</b><h3>Book</h3><p>Tell us the Mercedes model and what is happening.</p></article><article><b>02</b><h3>Diagnose</h3><p>We investigate the cause before recommending parts.</p></article><article><b>03</b><h3>Approve & Repair</h3><p>You understand the work before it begins.</p></article><article><b>04</b><h3>Collect</h3><p>We explain what was done and what to watch next.</p></article></div></div></section><section class="section white"><div class="wrap"><div class="section-head"><span class="eyebrow">From the Workshop</span><h2>Useful things to know about your car.</h2></div><div class="blog-grid">${POSTS.slice(0,3).map(postCard).join('')}</div><div class="center"><a class="btn red" href="#blog">Read the Blog</a></div></div></section><section class="section soft"><div class="wrap"><div class="section-head"><span class="eyebrow">Reviews</span><h2>Owners who trust us with the star.</h2></div><div class="reviews-window"><div id="reviews" class="review-grid"><article class="review"><b>Moses Benz Auto Care</b><p>Professional Mercedes-Benz diagnosis, servicing and repair.</p></article><article class="review"><b>Your experience matters</b><p>Share your experience with the workshop below.</p></article></div></div><form id="review-form" class="form-card review-form"><div class="two"><label>Your name *<input name="name" required maxlength="80"></label><label>Mercedes-Benz model<input name="model" maxlength="80" placeholder="C 300"></label></div><label>Rating *<select name="rating" required><option value="">Choose a rating</option><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Poor</option></select></label><label>Your review *<textarea name="review" rows="4" required maxlength="2000"></textarea></label><button class="btn red" type="submit">Submit Review</button><p id="review-status" class="status"></p></form></div></section><section class="section white"><div class="wrap career-card"><div><span class="eyebrow">Careers</span><h2>Build your career around Mercedes-Benz.</h2><p>We are interested in skilled, disciplined people who care about proper automotive work.</p></div><a class="btn red" href="#careers">Explore Careers</a></div></section><section class="find"><div class="map"><iframe src="https://www.google.com/maps?q=Moses+Benz+Auto+Care,+11+Lasu+Rd,+Idimu,+Lagos&output=embed" loading="lazy" title="Moses Benz Auto Care map"></iframe></div><div class="find-copy"><span class="eyebrow">Find Us</span><h2>11 Lasu Rd, Idimu, Lagos.</h2><p>Beside Federal Peace Estate, just off the Lasu-Isheri axis.</p><a class="btn red" href="https://www.google.com/maps/place/?q=place_id:ChIJ9wS7aQCROxARHinfFB1ds1w" target="_blank">Open in Google Maps</a></div></section>`}
function postCard(p){return '<article class="blog-card"><img src="'+BASE+'/images/workshop-yard.jpg" alt="'+esc(p.title)+'" loading="lazy"><div><span class="eyebrow">'+esc(p.category)+'</span><h2>'+esc(p.title)+'</h2><p>'+esc(p.excerpt)+'</p><a href="#blog/'+encodeURIComponent(p.slug)+'">Read article →</a></div></article>'}
const MODEL_FAMILY_INFO={
"A-Class":"The A-Class is Mercedes-Benz's entry point into the range: a compact hatchback built around everyday usability, efficient turbocharged four-cylinder engines and the brand's newer cabin technology. It suits city driving, a first Mercedes-Benz, or anyone who wants the badge and build quality without stepping up to a larger sedan.",
"CLA":"The CLA is a four-door coupe built on the same compact platform as the A-Class, but with a lower, more sloped roofline and a sportier stance. It trades a little rear headroom and boot space for styling, making it a popular choice for buyers who want compact-executive presence at a lower price point than a C-Class.",
"C-Class":"The C-Class is Mercedes-Benz's compact executive sedan and the volume model that most people picture when they think of the brand: a comfortable, well-built saloon suited to both daily commuting and longer trips. AMG-badged C-Class variants (like the C 43 and C 63 S) add a more powerful engine, sports suspension and a firmer, more performance-focused character.",
"E-Class":"The E-Class sits above the C-Class as Mercedes-Benz's mid-size executive sedan, with a longer wheelbase, a quieter cabin and generally more advanced standard technology. It is the traditional choice for business owners and executives who want genuine comfort over long distances without moving up to the flagship S-Class.",
"S-Class":"The S-Class is Mercedes-Benz's flagship sedan and historically the model that introduces new technology to the rest of the range. It prioritises rear-seat comfort, cabin refinement and a smooth, quiet ride above all else, and is the natural choice for owners who are driven as often as they drive.",
"Maybach S-Class":"Mercedes-Maybach is the ultra-luxury extension of the S-Class, with a longer body, a more elaborately finished cabin and an even greater focus on rear-seat comfort. It is aimed at owners who are chauffeured, prioritising a hushed, cosseting ride and standout presence over outright driving involvement.",
"GLA":"The GLA is Mercedes-Benz's smallest SUV, sharing its platform and engines with the A-Class and CLA. It gives buyers a raised driving position and SUV styling in a compact, easy-to-park footprint, making it a practical choice for city driving that still wants some ground clearance.",
"GLB":"The GLB is a boxier, more upright SUV than the GLA, with a longer wheelbase and the option of a third row of seats in some markets. It is aimed at buyers who want genuine practicality and interior space from a compact SUV rather than a sportier, more sloped roofline.",
"GLC":"The GLC is Mercedes-Benz's compact SUV and one of its best-selling models worldwide, built on the same underpinnings as the C-Class. It balances a comfortable ride, a usable boot and everyday practicality with the higher driving position SUV buyers want, and is offered in a more coupe-styled GLC Coupe body as well.",
"GLC Coupe":"The GLC Coupe shares its mechanical underpinnings with the standard GLC but wears a lower, more sloped roofline for a sportier profile. It sacrifices some rear headroom and cargo space in exchange for styling, appealing to buyers who want an SUV's practicality with more visual presence.",
"GLE":"The GLE is Mercedes-Benz's mid-size SUV, sitting above the GLC with more interior space, a smoother ride and the option of a third row of seats in some configurations. It suits families and buyers who want a genuinely spacious SUV without moving up to the full-size GLS, and is also offered as the more sharply styled GLE Coupe.",
"GLE Coupe":"The GLE Coupe carries the GLE's size and underpinnings but with a lower, coupe-inspired roofline for a sportier stance. It gives up some rear headroom compared with the standard GLE in exchange for a more dramatic silhouette, and AMG versions add significantly more power and a firmer sports chassis.",
"GLS":"The GLS is Mercedes-Benz's full-size, flagship SUV, built to carry up to seven occupants in genuine comfort across three rows. It is the SUV equivalent of the S-Class, prioritising cabin space, ride comfort and presence for large families or buyers who want maximum room.",
"Maybach GLS":"The Mercedes-Maybach GLS applies Maybach's ultra-luxury treatment to the full-size GLS SUV, with a more elaborate cabin, additional sound insulation and extra rear-seat comfort features. It targets buyers who want SUV practicality and ground clearance without compromising on the plush, chauffeur-friendly experience of the S-Class-based Maybach.",
"G-Class":"The G-Class (or 'G-Wagon') is Mercedes-Benz's boxy, body-on-frame off-roader, built on an engineering platform that has changed relatively little in decades because it works. It combines genuine off-road capability with a highly distinctive, upright shape, and AMG versions turn that same rugged platform into a very fast, very loud performance SUV.",
"V-Class":"The V-Class is Mercedes-Benz's large passenger van, built for carrying people rather than cargo, with configurable seating for large families or small groups travelling together. It offers car-like comfort and equipment in a genuinely spacious cabin, making it a practical choice for airport transfers, large families or group travel.",
"SL":"The SL is Mercedes-Benz's long-running luxury roadster, historically pairing open-top driving with genuine grand-touring comfort rather than a stripped-out sports car feel. Modern AMG-badged SL models add significant performance while keeping the model's traditional focus on being comfortable enough to drive long distances with the roof down.",
"AMG GT":"The AMG GT is Mercedes-AMG's dedicated sports car, built with a front-mid-mounted engine and a low, wide stance purely for performance driving. It sits apart from the rest of the range as a car chosen specifically for how it drives, rather than for passenger space or everyday practicality.",
"EQ":"Models under the EQ name are Mercedes-Benz's electric vehicles, built around battery-electric drivetrains rather than a traditional combustion engine. They carry over the brand's usual comfort and build quality while offering silent running and instant electric response, aimed at buyers moving away from petrol or diesel power."
};
function modelFamily(name){
  const n=String(name||'').replace(/^AMG\s+/i,'').trim();
  const isMaybach=/^Maybach\s+/i.test(n);
  const rest=n.replace(/^Maybach\s+/i,'');
  const code=(rest.match(/^[A-Z]{1,3}/)||[''])[0];
  const isCoupe=/coupe/i.test(rest);
  if(isMaybach)return code==='GLS'?'Maybach GLS':'Maybach S-Class';
  if(code==='GLC'&&isCoupe)return 'GLC Coupe';
  if(code==='GLE'&&isCoupe)return 'GLE Coupe';
  const map={A:'A-Class',B:'B-Class',C:'C-Class',E:'E-Class',S:'S-Class',CLA:'CLA',CLS:'CLS',CLE:'CLE',GLA:'GLA',GLB:'GLB',GLC:'GLC',GLE:'GLE',GLS:'GLS',G:'G-Class',V:'V-Class',SL:'SL',GT:'AMG GT',EQ:'EQ'};
  return map[code]||'';
}
async function car(slug){const c=cars().find(x=>x.slug===slug);if(!c)return '<section class="section white"><div class="wrap empty"><h1>Vehicle not found</h1><a class="btn red" href="#inventory">Back to Inventory</a></div></section>';
  const family=modelFamily(c.name),about=MODEL_FAMILY_INFO[family];
  return `<section class="section white"><div class="wrap"><a class="back" href="#inventory">← Back to Inventory</a><div class="detail-grid"><div><img class="detail-image" src="${BASE}${esc(c.image)}" alt="${esc(c.name)}"></div><div><span class="eyebrow">Mercedes-Benz · For Sale</span><h1>${esc(c.name)}</h1><div class="detail-price">${fmt(c.priceNGN)}</div><p>${esc(c.description)}</p><button id="car-wa" class="btn red">Chat about this car on WhatsApp</button></div></div><div class="spec-panel"><h2>Full details</h2><div class="spec-grid">${[['Year',c.year],['Mileage',(c.mileageKm||0)+' km'],['Specification',c.specTag],['Condition',c.condition],['Transmission',c.transmission],['Fuel',c.fuel],['Body',c.body],['Drivetrain',c.drivetrain],['Engine',c.engineSize],['Cylinders',c.cylinders],['Horsepower',c.horsepower?c.horsepower+' hp':''],['Colour',c.color],['Interior',c.interiorColor],['Seats',c.seats],['Registration',c.registered]].filter(x=>x[1]).map(x=>'<div><span>'+esc(x[0])+'</span><b>'+esc(x[1])+'</b></div>').join('')}</div>${about?`<div class="model-about"><h3>About the ${esc(family)}</h3><p>${esc(about)}</p></div>`:''}</div></div></section>`}
function bindCar(slug){const c=cars().find(x=>x.slug===slug),b=$('#car-wa');if(b&&c)b.onclick=()=>{const n=String(settings.whatsapp).replace(/\D/g,'');if(n)window.open('https://wa.me/'+n+'?text='+encodeURIComponent(`Hello Moses Benz Auto Care. I am interested in the ${c.name} (${c.year}). Please send me the full current details and availability.`),'_blank')}}
const POPULAR_MODEL_PATTERNS=[
  /\bc\s*-?\s*(180|200|300|350)\b/i,
  /\bglk\s*350\b/i,
  /\b(m|ml)\s*350\b/i,
  /\bgle\s*(350|43)\b/i,
  /\be\s*(300|350)\b/i,
  /\bglc\s*300\b/i,
  /\bgla\s*250\b/i,
  /\bcla\s*250\b/i
];
function isPopularCar(c){return POPULAR_MODEL_PATTERNS.some(re=>re.test(String(c.name||'')+' '+String(c.slug||'')));}
function bodyType(c){
  const text=norm([c.body,c.name,c.slug,c.description].filter(Boolean).join(' '));
  if(/gle|glc|glk|gla|glb|gls|ml|m class|g 400|g 450|g 500|g 550|g 63|maybach gls/.test(text))return 'SUV / Crossover';
  if(/sl 43|sl 55|amg gt/.test(text))return 'Performance';
  if(/v 220|v 250|v 300/.test(text))return 'MPV';
  if(/cla|amg gt/.test(text))return 'Coupe / Fastback';
  if(/a 180|a 200|a 250/.test(text))return 'Compact';
  return 'Executive Sedan';
}
function conditionType(c){
  const t=norm(c.condition||'');
  if(t.includes('foreign'))return 'Foreign Used';
  if(t.includes('nigeria')||t.includes('local'))return 'Nigeria Used';
  return 'All conditions';
}
function inventoryCardData(list){return list.map(c=>({...c,_popular:isPopularCar(c),_body:bodyType(c),_condition:conditionType(c)}));}
function inventory(){
  const q=norm(new URLSearchParams(location.hash.split('?')[1]||'').get('q')||'');
  return `<section class="page-head inventory-page-head"><div class="wrap"><span class="eyebrow">Mercedes-Benz Sales</span><h1>Mercedes-Benz inventory.</h1><p>Find the right Mercedes-Benz without endless horizontal scrolling. Search, refine and compare the vehicles in a clean dealership-style grid.</p></div></section>
  <section class="section white inventory-section"><div class="wrap">
    <div class="inventory-toolbar" aria-label="Inventory filters">
      <input id="inventory-search" value="${esc(q)}" type="search" placeholder="Search C300, GLE, E350…">
      <select id="inventory-type" aria-label="Vehicle type"><option value="all">All types</option><option>SUV / Crossover</option><option>Executive Sedan</option><option>Coupe / Fastback</option><option>Performance</option><option>Compact</option><option>MPV</option></select>
      <select id="inventory-condition" aria-label="Condition"><option value="all">All conditions</option><option>Foreign Used</option><option>Nigeria Used</option></select>
      <select id="inventory-sort" aria-label="Sort by"><option value="popular">Most popular</option><option value="newest">Newest year</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Model name</option></select>
      <button id="inventory-clear" class="filter-clear" type="button">Clear</button>
    </div>
    <div class="results-head"><b id="inventory-count">0 vehicles</b><span>Popular models are shown first.</span></div>
    <main class="inventory-results">
      <div id="inventory-list" class="car-grid inventory-grid"></div>
      <nav id="inventory-pagination" class="inventory-pagination" aria-label="Inventory pages"></nav>
    </main>
  </div></section>`;
}
function renderInventory(){
  const root=$('#inventory-list'), input=$('#inventory-search');
  if(!root||!input)return;
  const typeEl=$('#inventory-type'),conditionEl=$('#inventory-condition'),sortEl=$('#inventory-sort'),countEl=$('#inventory-count'),pager=$('#inventory-pagination');
  let page=1; const pageSize=12;
  const source=inventoryCardData(cars().filter(c=>c.active!==false));
  const apply=()=>{
    const q=norm(input.value);
    let list=source.filter(c=>!q||norm([c.name,c.slug,c.description,c.specTag,c.year,...(c.searchAliases||[])].join(' ')).includes(q));
    if(typeEl.value!=='all')list=list.filter(c=>c._body===typeEl.value);
    if(conditionEl.value!=='all')list=list.filter(c=>c._condition===conditionEl.value);
    switch(sortEl.value){
      case 'newest': list.sort((a,b)=>Number(b.year||0)-Number(a.year||0));break;
      case 'price-low': list.sort((a,b)=>Number(a.priceNGN||0)-Number(b.priceNGN||0));break;
      case 'price-high': list.sort((a,b)=>Number(b.priceNGN||0)-Number(a.priceNGN||0));break;
      case 'name': list.sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));break;
      default: list.sort((a,b)=>Number(b._popular)-Number(a._popular)||Number(b.year||0)-Number(a.year||0));
    }
    const pages=Math.max(1,Math.ceil(list.length/pageSize)); if(page>pages)page=pages;
    const slice=list.slice((page-1)*pageSize,page*pageSize);
    root.innerHTML=slice.map(c=>carCard(c,{popular:c._popular})).join('')||'<div class="empty inventory-empty">No Mercedes-Benz vehicle matched those filters.</div>';
    countEl.textContent=list.length+' vehicle'+(list.length===1?'':'s'); bindCards();
    pager.innerHTML=Array.from({length:pages},(_,i)=>`<button type="button" class="page-btn${i+1===page?' active':''}" data-page="${i+1}">${i+1}</button>`).join('');
    pager.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{page=Number(b.dataset.page);apply();document.querySelector('.inventory-results')?.scrollIntoView({behavior:'smooth',block:'start'});});
  };
  [input,typeEl,conditionEl,sortEl].forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',()=>{page=1;apply();}));
  $('#inventory-clear').onclick=()=>{input.value='';typeEl.value='all';conditionEl.value='all';sortEl.value='popular';page=1;apply();};
  apply();
}
async function blog(slug){
  if(slug){
    const r=await api('blog_posts?select=*&published=eq.true&slug=eq.'+encodeURIComponent(slug));
    const p=r.ok&&r.data?.[0]?r.data[0]:POSTS.find(x=>x.slug===slug);
    if(!p)return '<section class="section white"><div class="wrap empty"><h1>Article not found</h1><a class="btn red" href="#blog">Back to Blog</a></div></section>';
    const paras=String(p.content||'').split(/\n\n+/).filter(Boolean).map(x=>'<p>'+esc(x)+'</p>').join('');
    return `<section class="section white"><div class="wrap article"><a href="#blog" class="back">← Back to Blog</a><span class="eyebrow">${esc(p.category)}</span><h1>${esc(p.title)}</h1><p class="article-meta">${esc(p.author||'Moses Benz Auto Care')}</p><div class="article-body">${paras}</div><section class="comments"><div class="section-head"><span class="eyebrow">Community</span><h2>Comments</h2><p>Have a question or something useful to add? Leave a comment below.</p></div><form id="blog-comment-form" class="form-card"><input type="hidden" name="post_slug" value="${esc(p.slug)}"><label>Your name *<input name="name" required maxlength="80"></label><label>Your comment *<textarea name="comment" rows="4" required maxlength="2000"></textarea></label><button class="btn red" type="submit">Post Comment</button><p id="comment-status" class="status"></p></form><div id="blog-comments" class="comment-list"><p class="muted">Loading comments…</p></div></section></div></section>`;
  }
  return `<section class="page-head"><div class="wrap"><span class="eyebrow">Blog</span><h1>Useful things to know about your Mercedes-Benz.</h1><p>Practical maintenance, diagnosis, buying and ownership guidance from the workshop.</p></div></section><section class="section white"><div class="wrap"><div id="blog-list" class="blog-grid">${POSTS.map(postCard).join('')}</div></div></section>`;
}
function likedComments(){try{return JSON.parse(localStorage.getItem('mbac_liked_comments')||'[]')}catch{return []}}
function markLiked(id){try{const s=likedComments();if(!s.includes(id)){s.push(id);localStorage.setItem('mbac_liked_comments',JSON.stringify(s))}}catch{}}
function dateLabel(v){return new Date(v).toLocaleDateString('en-NG',{year:'numeric',month:'long',day:'numeric'})}
function replyRow(x){return `<div class="reply${x.is_admin?' is-admin':''}"><div class="reply-head"><strong>${x.is_admin?'Moses Benz Auto Care':esc(x.name)}</strong>${x.is_admin?'<span class="admin-tag">Team</span>':''}<small>${dateLabel(x.created_at)}</small></div><p>${esc(x.reply)}</p></div>`;}
function commentRow(x,replies){
  const liked=likedComments().includes(x.id);
  const sorted=[...replies].sort((a,b)=>(b.is_admin-a.is_admin)||String(a.created_at).localeCompare(String(b.created_at)));
  return `<article class="comment" data-comment-id="${esc(x.id)}">
    <div class="comment-head"><strong>${esc(x.name)}</strong><small>${dateLabel(x.created_at)}</small></div>
    <p>${esc(x.comment)}</p>
    <div class="comment-actions">
      <button type="button" class="comment-like${liked?' liked':''}" data-like="${esc(x.id)}"><i class="fa-solid fa-heart"></i><span class="like-count">${Number(x.likes)||0}</span></button>
      <button type="button" class="comment-reply-btn" data-reply-open="${esc(x.id)}">Reply</button>
      ${sorted.length?`<button type="button" class="comment-view-replies" data-toggle-replies="${esc(x.id)}"><span>View ${sorted.length} repl${sorted.length===1?'y':'ies'}</span><i class="fa-solid fa-chevron-down"></i></button>`:''}
    </div>
    <form class="reply-form" data-reply-form="${esc(x.id)}" hidden>
      <input name="name" placeholder="Your name" required maxlength="80">
      <input name="reply" placeholder="Write a reply…" required maxlength="2000">
      <button class="btn red" type="submit">Send</button>
    </form>
    ${sorted.length?`<div class="comment-replies" data-replies="${esc(x.id)}" hidden>${sorted.map(replyRow).join('')}</div>`:''}
  </article>`;
}
function bindBlogArticle(slug){
  const list=$('#blog-comments'),form=$('#blog-comment-form'); if(!list||!form)return;
  let comments=[],repliesByComment={};
  const load=async()=>{
    const r=await api('blog_comments?select=*&approved=eq.true&post_slug=eq.'+encodeURIComponent(slug)+'&order=created_at.asc');
    if(!r.ok){list.innerHTML='<p class="muted">Comments are temporarily unavailable.</p>';return;}
    comments=Array.isArray(r.data)?r.data:[];
    repliesByComment={};
    if(comments.length){
      const ids=comments.map(c=>c.id).join(',');
      const rr=await api('blog_comment_replies?select=*&approved=eq.true&comment_id=in.('+ids+')&order=created_at.asc');
      if(rr.ok&&Array.isArray(rr.data))rr.data.forEach(rep=>{(repliesByComment[rep.comment_id]=repliesByComment[rep.comment_id]||[]).push(rep)});
    }
    list.innerHTML=comments.length?comments.map(x=>commentRow(x,repliesByComment[x.id]||[])).join(''):'<p class="muted">No comments yet. Be the first to share something useful.</p>';
    bindCommentActions();
  };
  const bindCommentActions=()=>{
    list.querySelectorAll('[data-toggle-replies]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.toggleReplies,box=list.querySelector(`[data-replies="${id}"]`); if(!box)return;
      const open=!box.hidden; box.hidden=open; b.classList.toggle('open',!open);
      b.querySelector('span').textContent=open?`View ${repliesByComment[id].length} repl${repliesByComment[id].length===1?'y':'ies'}`:'Hide replies';
    });
    list.querySelectorAll('[data-reply-open]').forEach(b=>b.onclick=()=>{
      const f=list.querySelector(`[data-reply-form="${b.dataset.replyOpen}"]`); if(!f)return; f.hidden=!f.hidden; if(!f.hidden)f.querySelector('input')?.focus();
    });
    list.querySelectorAll('[data-like]').forEach(b=>b.onclick=async()=>{
      const id=b.dataset.like; if(likedComments().includes(id))return;
      b.disabled=true;
      const r=await rpc('blog_comment_like',{p_id:id});
      if(r.ok){markLiked(id);b.classList.add('liked');b.querySelector('.like-count').textContent=r.data??((Number(b.querySelector('.like-count').textContent)||0)+1);}
      b.disabled=false;
    });
    list.querySelectorAll('.reply-form').forEach(f=>{
      if(f.dataset.bound)return; f.dataset.bound='1';
      f.onsubmit=async e=>{
        e.preventDefault(); const fd=new FormData(f),btn=f.querySelector('button'),id=f.dataset.replyForm;
        const name=String(fd.get('name')||'').trim(),replyText=String(fd.get('reply')||'').trim(); if(!name||!replyText)return;
        btn.disabled=true;
        const r=await api('blog_comment_replies',{method:'POST',body:JSON.stringify({comment_id:id,name,reply:replyText,is_admin:false,approved:true})});
        btn.disabled=false;
        if(r.ok){f.reset();f.hidden=true;await load();const box=list.querySelector(`[data-replies="${id}"]`);if(box)box.hidden=false;}
      };
    });
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

function contact(){return `<section class="page-head"><div class="wrap"><span class="eyebrow">Contact</span><h1>Talk to Moses Benz Auto Care.</h1><p>Call, WhatsApp, email or book an appointment.</p></div></section><section class="section white"><div class="wrap contact-grid"><div class="contact-card"><span>01</span><h2>Call the Workshop</h2><p>Speak directly with the workshop.</p><a data-contact="phone" class="btn red">Call Us</a></div><div class="contact-card"><span>02</span><h2>WhatsApp</h2><p>Send a message and include your vehicle model.</p><a data-contact="whatsapp" class="btn red" target="_blank">WhatsApp Us</a></div><div class="contact-card"><span>03</span><h2>Book an Appointment</h2><p>Send the vehicle details and the issue directly to the workshop.</p><a class="btn red" href="#appointments">Book an Appointment</a></div><div class="contact-card"><span>04</span><h2>Email</h2><p>Use email when you prefer a written request.</p><a data-contact="email" class="btn red">Email Us</a></div><div class="contact-card"><span>05</span><h2>Facebook</h2><p>Follow workshop updates.</p><a data-contact="facebook" class="btn red" target="_blank">Facebook</a></div><div class="contact-card"><span>06</span><h2>TikTok</h2><p>See workshop clips and vehicle content.</p><a data-contact="tiktok" class="btn red" target="_blank">TikTok</a></div></div></section>`}
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
async function render(){const hash=location.hash.replace(/^#/,'')||'home',parts=hash.split('/'),route=parts[0],arg=parts.slice(1).join('/');let html=route==='home'?home():route==='inventory'?await inventory():route==='car'?await car(decodeURIComponent(arg)):route==='blog'?await blog(arg?decodeURIComponent(arg):''):route==='appointments'?appointments():route==='contact'?contact():route==='careers'?careers():route==='guide'?guide():home();$('#app').innerHTML=html;$('#route-transition')?.classList.remove('is-active');window.scrollTo({top:0,behavior:'instant'});footer();fab();applyContacts();if(route==='home'){bindCards();homeReviews();bindReviewForm();initGallery();initMobileRails()}if(route==='inventory'){renderInventory();initMobileRails();}if(route==='car')bindCar(decodeURIComponent(arg));if(route==='appointments')bindAppointment();if(route==='careers')bindCareerForm();if(route==='blog'){bindCards();if(arg){bindBlogArticle(decodeURIComponent(arg));}}}
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
  const syncMenu=()=>{const open=drawer?.classList.contains('open');if(menu){menu.textContent=open?'×':'☰';menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.setAttribute('aria-expanded',open?'true':'false');}};
  menu?.addEventListener('click',()=>{drawer?.classList.toggle('open');syncMenu();});
  drawer?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{drawer.classList.remove('open');syncMenu();}));
  syncMenu();
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
  if(window.MBStore?.hydrate){window.MBStore.hydrate().then(()=>render()).catch(()=>{});}
  window.addEventListener('hashchange',render);
}
boot();