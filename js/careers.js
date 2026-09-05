/* Careers application form. Sends the applicant's details to the workshop via
   WhatsApp (always works, no configuration needed) and, if configured,
   also emails a copy through FormSubmit. */
(() => {
  function formSubmit(payload) {
    const email = window.MBAC_FORMS?.workshopEmail;
    if (!email || email === 'YOUR_WORKSHOP_EMAIL') return Promise.resolve(false);
    const body = new URLSearchParams({
      ...payload,
      _subject: `New job application — ${payload.name}`,
      _replyto: payload.email || '',
      _captcha: 'false',
      _template: 'table'
    });
    return fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    }).then(r => r.ok).catch(() => false);
  }

  function bind() {
    const form = document.getElementById('career-form');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = '1';
    const status = document.getElementById('career-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        name: String(fd.get('name') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        role: String(fd.get('role') || '').trim(),
        experience: String(fd.get('experience') || '').trim(),
        message: String(fd.get('message') || '').trim()
      };
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      if (status) status.textContent = 'Sending your application…';

      const waMessage =
        `Hello Moses Benz Auto Care, I would like to apply for a role.\n` +
        `Name: ${payload.name}\n` +
        `Phone: ${payload.phone}\n` +
        (payload.email ? `Email: ${payload.email}\n` : '') +
        `Role: ${payload.role}\n` +
        `Experience: ${payload.experience}\n` +
        (payload.message ? `About me: ${payload.message}` : '');

      const emailed = await formSubmit(payload).catch(() => false);
      window.open('https://wa.me/2348106958638?text=' + encodeURIComponent(waMessage), '_blank', 'noopener');

      if (status) {
        status.textContent = emailed
          ? 'Application sent — we also opened WhatsApp so you can send it directly. We will be in touch.'
          : 'We opened WhatsApp with your application details — please hit send there to complete your application.';
      }
      form.reset();
      if (btn) btn.disabled = false;
    });
  }

  window.initCareerPage = bind;
})();
