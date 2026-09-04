
(function(){
function grid(){
 document.querySelectorAll('.inventory-grid,#inventory-grid,.inventory-list,#inventory-list,.inventory-items,#inventory-items,.admin-inventory-grid,.admin-inventory-list,[data-inventory-grid]')
 .forEach(function(e){e.classList.add('inventory-grid');});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',grid);else grid();
new MutationObserver(grid).observe(document.documentElement,{childList:true,subtree:true});
})();
