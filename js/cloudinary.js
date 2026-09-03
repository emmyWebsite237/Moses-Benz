(() => {
  function openUploader(){
    const cfg=window.MBAC_CLOUDINARY||{};const status=document.getElementById('cloudinary-status');
    if(!cfg.cloudName||cfg.cloudName==='YOUR_CLOUD_NAME'||!cfg.uploadPreset||cfg.uploadPreset==='YOUR_UNSIGNED_UPLOAD_PRESET'){if(status)status.textContent='Cloudinary is not configured yet. Add your cloud name and unsigned upload preset in js/cloudinary-config.js.';return;}
    if(!window.cloudinary){if(status)status.textContent='Cloudinary upload widget is still loading. Try again in a moment.';return;}
    window.cloudinary.openUploadWidget({cloudName:cfg.cloudName,uploadPreset:cfg.uploadPreset,sources:['local','url','camera'],multiple:true,maxFiles:20,resourceType:'auto',clientAllowedFormats:['jpg','jpeg','png','webp','gif','mp4','mov','webm'],folder:'moses-benz-auto-care'},(error,result)=>{if(error){if(status)status.textContent='Upload failed or was cancelled.';return;}if(result?.event==='success'){const info=result.info||{};if(status)status.textContent=`Uploaded: ${info.secure_url||'asset ready'}. Copy the URL into Inventory or Before & After.`;}});
  }
  window.MBCloudinary={openUploader};
})();
