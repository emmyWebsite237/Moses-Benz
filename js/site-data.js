/* Moses Benz Auto Care — shared editable site data.
 * Local mode works immediately. Add Supabase later for cross-device sync.
 */
(() => {
  const KEYS = {
    services: 'mbac_services_v1',
    diagnostics: 'mbac_diagnostics_v1',
    slots: 'mbac_slots_v1',
    appointments: 'mbac_appointments_v1',
    reviews: 'mbac_reviews_v1'
  };
  const SERVICES = [
    'Routine Service','Oil & Filter Service','Brake Service','Transmission Service','AIRMATIC / Suspension','Electrical Repair','Air Conditioning','Cooling System','Engine Repair','Steering & Wheel Alignment','Bodywork / Detailing','Pre-Purchase Inspection','Other'
  ];
  const DIAGNOSTICS = [
    ['D01','Full Vehicle Scan','Complete module scan, stored faults, live data review and a vehicle health report.'],
    ['D02','Engine Management','Misfires, rough idle, limp mode, poor acceleration, fuel and sensor faults.'],
    ['D03','Transmission','Gear selection, harsh shifts, slipping, warning messages and transmission control faults.'],
    ['D04','ABS / ESP / SBC','Brake control modules, wheel-speed sensors, stability and braking warnings.'],
    ['D05','AIRMATIC / Suspension','Ride-height faults, compressor issues, leaks, calibration and suspension warnings.'],
    ['D06','Electrical System','Battery drain, alternator, starter, fuses, wiring and intermittent electrical faults.'],
    ['D07','Air Conditioning','Climate-control faults, compressor operation, pressure readings and cooling performance.'],
    ['D08','MBUX / Infotainment','Display, audio, Bluetooth, connectivity, camera and infotainment module issues.'],
    ['D09','AdBlue / Emissions','AdBlue warnings, NOx sensors, emissions faults and related drivability symptoms.'],
    ['D10','Airbag / SRS','SRS warning lights, restraint systems, seat occupancy and related module faults.'],
    ['D11','Starting / No-Start','Crank/no-start, immobiliser, key recognition, fuel delivery and ignition checks.'],
    ['D12','Pre-Purchase Scan','Independent diagnostic check for a Mercedes you are considering buying.']
  ].map(([code,name,description]) => ({code,name,description}));

  const seedSlots = () => {
    const slots=[]; const now=new Date();
    for(let d=0;d<10;d++){
      const day=new Date(now); day.setDate(now.getDate()+d);
      if(day.getDay()===0) continue;
      ['08:00','09:30','11:00','13:00','14:30','16:00'].forEach(time=>slots.push({id:`slot-${day.toISOString().slice(0,10)}-${time}`,date:day.toISOString().slice(0,10),time,capacity:1,booked:0,status:'open'}));
    }
    return slots;
  };
  const read=(key,fallback)=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback;}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false;}};
  const clone=x=>JSON.parse(JSON.stringify(x));
  function getServices(){let x=read(KEYS.services,null);if(!Array.isArray(x)){x=SERVICES.slice();write(KEYS.services,x);}return x;}
  function getDiagnostics(){let x=read(KEYS.diagnostics,null);if(!Array.isArray(x)){x=clone(DIAGNOSTICS);write(KEYS.diagnostics,x);}return x;}
  function getSlots(){let x=read(KEYS.slots,null);if(!Array.isArray(x)){x=seedSlots();write(KEYS.slots,x);}return x;}
  function getAppointments(){return read(KEYS.appointments,[]);}
  function saveAppointments(x){write(KEYS.appointments,x);}
  function addAppointment(data){const list=getAppointments();const id='apt-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);const a={id,createdAt:new Date().toISOString(),status:'requested',reviewRequested:false,...data};list.push(a);saveAppointments(list);return a;}
  function updateAppointment(id,patch){const list=getAppointments();const i=list.findIndex(x=>x.id===id);if(i<0)return false;list[i]={...list[i],...patch};saveAppointments(list);return true;}
  function saveServices(x){write(KEYS.services,x);}
  function saveDiagnostics(x){write(KEYS.diagnostics,x);}
  function saveSlots(x){write(KEYS.slots,x);}
  function addSlot(data){const x=getSlots();const id='slot-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);x.push({id,booked:0,status:'open',...data});saveSlots(x);return id;}
  function bookSlot(id){const x=getSlots();const s=x.find(v=>v.id===id);if(!s||s.status!=='open'||Number(s.booked)>=Number(s.capacity))return false;s.booked=Number(s.booked)+1;if(s.booked>=s.capacity)s.status='full';saveSlots(x);return true;}
  function getReviews(){return read(KEYS.reviews,[]);}
  function addReview(data){const x=getReviews();x.unshift({id:'rev-'+Date.now().toString(36),createdAt:new Date().toISOString(),...data});write(KEYS.reviews,x);return x[0];}
  window.MBData={getServices,getDiagnostics,getSlots,getAppointments,saveAppointments,addAppointment,updateAppointment,saveServices,saveDiagnostics,addSlot,bookSlot,getReviews,addReview,KEYS};
})();
