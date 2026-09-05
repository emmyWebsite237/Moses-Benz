/* =========================================================
   Moses Benz Auto Care — global search
   ---------------------------------------------------------
   Adds a search button into the header (once, since the
   header stays mounted across client-side page navigation)
   and an overlay that searches the services list and the
   cars-for-sale inventory together, so visitors don't have
   to browse the full catalogue or inventory page by hand.
   ========================================================= */
(() => {
  const SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const CLOSE_ICON = '<svg viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  function esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
  }

  function buildOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'site-search-overlay';
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search the site">
        <div class="search-panel-head">
          ${SEARCH_ICON}
          <input type="text" id="site-search-input" placeholder="Search services or cars for sale…" aria-label="Search services or cars for sale">
          <button type="button" class="search-panel-close" id="site-search-close" aria-label="Close search">${CLOSE_ICON}</button>
        </div>
        <div class="search-results" id="site-search-results">
          <p class="search-hint">Start typing — e.g. "brakes", "AIRMATIC", or "GLE".</p>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    return overlay;
  }

  function buildButton() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'header-search-btn';
    btn.id = 'site-search-open';
    btn.setAttribute('aria-label', 'Search services and inventory');
    btn.title = 'Search';
    btn.innerHTML = SEARCH_ICON;
    return btn;
  }

  function renderResults(query) {
    const resultsEl = document.getElementById('site-search-results');
    if (!resultsEl) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      resultsEl.innerHTML = '<p class="search-hint">Start typing — e.g. "brakes", "AIRMATIC", or "GLE".</p>';
      return;
    }

    const services = (window.MBData?.getServices?.() || [])
      .filter(name => name.toLowerCase().includes(q))
      .slice(0, 8);

    const cars = (window.MBStore?.getCars?.() || [])
      .filter(car => {
        const haystack = `${car.name} ${car.specTag || ''} ${car.year || ''}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 8);

    if (!services.length && !cars.length) {
      resultsEl.innerHTML = `<p class="search-empty">No matches for "${esc(query)}". Try a different word, or <a href="/contact" class="page-route">contact the workshop</a> directly.</p>`;
      return;
    }

    let html = '';
    if (services.length) {
      html += `<div class="search-group"><div class="search-group-label">Services</div>${services.map(name => `
        <a href="/service?service=${encodeURIComponent(name)}" class="search-result page-route">
          <span>${esc(name)}<small>Service details &amp; booking</small></span>
        </a>`).join('')}</div>`;
    }
    if (cars.length) {
      html += `<div class="search-group"><div class="search-group-label">Cars For Sale</div>${cars.map(car => `
        <a href="/inventory#car-${esc(car.id)}" class="search-result">
          <span>${esc(car.name)} (${esc(car.year)})<small>${esc(car.specTag || '')} · ${window.MBStore.formatKm(car.mileageKm)}</small></span>
          <span class="price">${car.status === 'sold' ? 'Sold' : window.MBStore.formatNGN(car.priceNGN)}</span>
        </a>`).join('')}</div>`;
    }
    resultsEl.innerHTML = html;
  }

  function initGlobalSearch() {
    const headerCta = document.querySelector('.header-cta');
    if (!headerCta || document.getElementById('site-search-open')) return;

    const btn = buildButton();
    headerCta.insertBefore(btn, headerCta.firstChild);
    const overlay = buildOverlay();
    const input = overlay.querySelector('#site-search-input');
    const closeBtn = overlay.querySelector('#site-search-close');

    function open() {
      overlay.hidden = false;
      document.body.classList.add('modal-open');
      renderResults(input.value);
      setTimeout(() => input.focus(), 30);
    }
    function close() {
      overlay.hidden = true;
      document.body.classList.remove('modal-open');
    }

    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    input.addEventListener('input', () => renderResults(input.value));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) close();
      const tag = (e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
      if (e.key === '/' && !typing && overlay.hidden) { e.preventDefault(); open(); }
    });
    // First Enter with a single result set jumps straight there
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const first = overlay.querySelector('.search-result');
      if (first) { e.preventDefault(); first.click(); }
    });
  }

  window.initGlobalSearch = initGlobalSearch;
})();
