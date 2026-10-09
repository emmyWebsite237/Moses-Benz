/* Moses Benz Auto Care — workshop gallery.
   Keep each photo's original filename and extension; no img1/img2 renaming. */
(() => {
  const photos = [
    {file:"IMG_3708.jpeg", alt:"Moses Benz workshop"},
    {file:"IMG_3786.jpeg", alt:"Moses Benz workshop"},
    {file:"IMG_3790.jpeg", alt:"Moses Benz workshop"},
    {file:"IMG_3791.jpeg", alt:"Moses Benz workshop"},
    {file:"IMG_3793.jpeg", alt:"Moses Benz workshop"},
    {file:"IMG_3798.jpeg", alt:"Moses Benz workshop"},
    {file:"IMG_3806.jpeg", alt:"Moses Benz workshop"},
    {file:"landmark-fuel-station.jpg", alt:"Workshop exterior"},
    {file:"street-cars.jpg", alt:"Cars at the workshop"},
    {file:"workshop-technicians.jpg", alt:"Workshop technicians"}
  ];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  function init() {
    const root = document.getElementById("workshop-gallery-carousel");
    if (!root) return;
    const slides = photos.map(p => `<figure class="workshop-gallery-slide"><img src="/images/workshop-gallery/${esc(p.file)}" alt="${esc(p.alt)}" loading="lazy" decoding="async" onerror="this.closest('figure')?.remove()"><figcaption>${esc(p.alt)}</figcaption></figure>`).join("");
    root.innerHTML = `<div class="workshop-gallery-viewport"><div class="workshop-gallery-track">${slides}</div></div>`;
    const track = root.querySelector(".workshop-gallery-track");
    const original = [...track.children];
    if (original.length < 2) return;
    track.innerHTML = original.map(x => x.outerHTML).concat(original.map(x => x.outerHTML)).join("");
    const count = original.length;
    let index = 0, timer;
    const step = () => Math.max(root.querySelector(".workshop-gallery-slide")?.getBoundingClientRect().width || 0, 260);
    const move = () => { index++; track.style.transform = `translateX(-${index * step()}px)`; };
    track.addEventListener("transitionend", () => {
      if (index >= count) {
        track.style.transition = "none"; index = 0; track.style.transform = "translateX(0)";
        requestAnimationFrame(() => requestAnimationFrame(() => track.style.transition = "transform .65s cubic-bezier(.2,.75,.2,1)"));
      }
    });
    track.style.transition = "transform .65s cubic-bezier(.2,.75,.2,1)";
    timer = setInterval(move, 3000);
    window.addEventListener("pagehide", () => clearInterval(timer), {once:true});
    window.addEventListener("resize", () => {
      track.style.transition = "none"; track.style.transform = `translateX(-${index * step()}px)`;
      requestAnimationFrame(() => track.style.transition = "transform .65s cubic-bezier(.2,.75,.2,1)");
    }, {passive:true});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
