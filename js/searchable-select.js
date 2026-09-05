/* =========================================================
   Moses Benz Auto Care — searchable select (combobox)
   ---------------------------------------------------------
   Turns a <select> with many options into a text box you can
   type in to filter, while keeping the real <select> in the
   DOM (hidden) so existing form code (FormData, required
   validation via the visible input, etc.) keeps working
   unchanged.

   If someone types something that isn't in the list, their
   typed text is kept as the value — they're never blocked
   from submitting just because their exact wording isn't a
   preset option.

   Usage: give a <select> the attribute data-combobox="1" (or
   just call MBCombobox.enhance(selectEl) directly). Any
   select with more than 8 options is auto-enhanced.
   ========================================================= */
(() => {
  function currentLabel(select) {
    const opt = select.options[select.selectedIndex];
    return opt && opt.value ? opt.textContent : '';
  }

  function enhance(select) {
    if (!select) return;
    if (select.dataset.comboboxBound) {
      // already enhanced — just resync the visible text with the select's current value
      if (select._comboboxInput) select._comboboxInput.value = currentLabel(select);
      return;
    }
    select.dataset.comboboxBound = '1';

    const wrap = document.createElement('div');
    wrap.className = 'combobox';
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);
    select.classList.add('combobox-native');
    select.setAttribute('tabindex', '-1');
    select.removeAttribute('required'); // validation moves to the visible input below

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'combobox-input';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('role', 'combobox');
    input.placeholder = select.dataset.placeholder || 'Type to search, or choose from the list…';
    if (select.hasAttribute('required')) input.required = true;
    // copy the input styling classes the surrounding form already applies to real inputs
    wrap.appendChild(input);

    const list = document.createElement('div');
    list.className = 'combobox-list';
    list.hidden = true;
    wrap.appendChild(list);

    input.value = currentLabel(select);
    select._comboboxInput = input;

    function options() {
      return [...select.options].filter(o => o.value);
    }

    function buildList(filter) {
      const q = (filter || '').trim().toLowerCase();
      const opts = options();
      const matches = q ? opts.filter(o => o.textContent.toLowerCase().includes(q)) : opts;
      if (!matches.length) {
        list.innerHTML = '<p class="combobox-empty">No match — the text you typed will be used as-is.</p>';
        return;
      }
      list.innerHTML = matches
        .slice(0, 200)
        .map(o => `<button type="button" class="combobox-option" data-value="${o.value.replace(/"/g, '&quot;')}">${o.textContent}</button>`)
        .join('');
    }

    function open() {
      buildList(input.value);
      list.hidden = false;
      wrap.classList.add('is-open');
    }
    function close() {
      list.hidden = true;
      wrap.classList.remove('is-open');
    }

    function commitFreeText() {
      const typed = input.value.trim();
      if (!typed) { select.value = ''; return; }
      const match = options().find(o => o.textContent.toLowerCase() === typed.toLowerCase());
      if (match) { select.value = match.value; input.value = match.textContent; return; }
      let custom = select.querySelector('option[data-custom="1"]');
      if (!custom) {
        custom = document.createElement('option');
        custom.dataset.custom = '1';
        select.appendChild(custom);
      }
      custom.value = typed;
      custom.textContent = typed;
      select.value = typed;
    }

    input.addEventListener('focus', open);
    input.addEventListener('input', () => {
      buildList(input.value);
      list.hidden = false;
      wrap.classList.add('is-open');
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { close(); input.blur(); }
      if (e.key === 'Enter') { e.preventDefault(); commitFreeText(); close(); input.blur(); }
    });
    input.addEventListener('blur', () => {
      // small delay so a mousedown selection (below) registers first
      setTimeout(() => { if (list.hidden) commitFreeText(); }, 120);
    });
    list.addEventListener('mousedown', (e) => {
      const btn = e.target.closest('.combobox-option');
      if (!btn) return;
      e.preventDefault();
      select.value = btn.dataset.value;
      input.value = btn.textContent;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      close();
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) close();
    });
  }

  function enhanceAll(root = document) {
    root.querySelectorAll('select[data-combobox]').forEach(enhance);
    root.querySelectorAll('select').forEach((s) => {
      if (s.options.length > 8) enhance(s);
    });
  }

  window.MBCombobox = { enhance, enhanceAll };
})();
