(() => {
document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('admin-login-form');
  const err = document.getElementById('admin-login-error');
  if (!form) return;
  if (window.MBAAuth?.isAdmin?.()) {
    location.replace('/mbac-control-7x4k9/portal');
    return;
  }
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn=form.querySelector('button');
    const username=document.getElementById('admin-username').value.trim();
    const password=document.getElementById('admin-password').value;
    if(btn) btn.disabled=true;
    if(err) err.hidden=true;
    try {
      await window.MBAAuth.adminSignIn(username,password);
      location.replace('/mbac-control-7x4k9/portal');
    } catch(ex) {
      if(err){ err.hidden=false; err.textContent=ex?.message||'Incorrect username or password.'; }
    } finally { if(btn) btn.disabled=false; }
  });
});
})();