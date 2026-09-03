(() => {
  const slug=s=>String(s).toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const detail={
    'service-a':'Routine Mercedes-Benz maintenance covering oil, filters, fluid levels, tyre pressures, brake inspection and service-counter reset.',
    'service-b':'A more comprehensive scheduled maintenance visit including oil and filter work, cabin filtration, brake-fluid checks and a broader vehicle inspection.',
    'oil-filter-service':'Engine oil and filter replacement using the correct specification for your Mercedes, followed by fluid and leak checks.',
    'brake-pad-replacement':'Inspection and replacement of worn brake pads, with brake-disc condition, sensors and braking-system health checked at the same time.',
    'transmission-service':'Transmission fluid and filter service, leak inspection, adaptation checks and fault diagnosis for automatic gearboxes.',
    'airmatic-diagnosis-and-repair':'Inspection of air suspension compressors, bags, valve blocks, ride-height sensors, leaks and calibration faults.',
    'engine-repair':'Diagnosis-led engine repair for overheating, misfires, oil leaks, timing faults, poor performance and other mechanical complaints.',
    'ecu-coding-and-programming':'Module coding, configuration and programming where supported, following diagnosis rather than changing modules blindly.',
    'air-conditioning-service':'AC performance testing, refrigerant checks, leak diagnosis, compressor checks, blower and climate-control troubleshooting.',
    'pre-purchase-inspection':'A structured Mercedes inspection before purchase covering diagnostics, mechanical condition, suspension, brakes, electronics and visible body condition.'
  };
  function initCatalog(){const root=document.getElementById('service-catalog-grid');if(!root||!window.MBData)return;root.innerHTML=window.MBData.getServices().map((name,i)=>{const s=slug(name);return `<article class="option-card"><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(name)}</h3><p>${esc(detail[s]||'Mercedes-Benz specialist service covering inspection, diagnosis, repair or maintenance for this system. We explain the finding before work begins.')}</p><a href="service.html?service=${encodeURIComponent(name)}" class="text-link page-route">About this service →</a></article>`}).join('');}
  function initDetail(){const root=document.getElementById('service-detail');if(!root)return;const name=new URLSearchParams(location.search).get('service')||'Mercedes-Benz Service';const s=slug(name);const text=detail[s]||`At Moses Benz Auto Care, ${name} is approached with inspection first, clear communication and repair work matched to the condition of the vehicle. We identify the cause, explain the finding and only proceed with approved work.`;root.innerHTML=`<span class="eyebrow">Service Detail</span><h1>${esc(name)}</h1><p>${esc(text)}</p><div class="service-detail-points"><div><strong>01</strong><span>Inspect and diagnose the vehicle before replacing parts.</span></div><div><strong>02</strong><span>Explain the finding and separate urgent repairs from maintenance.</span></div><div><strong>03</strong><span>Carry out the approved work and explain the completed job at handover.</span></div></div><a href="appointments.html?service=${encodeURIComponent(name)}" class="btn btn-primary page-route">Request this service</a>`;}
  window.initServices=()=>{initCatalog();initDetail();};
})();
