const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#enquiry-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const business = form.elements.business.value.trim();
  const type = form.elements.type.value;
  const subject = encodeURIComponent(`KasiBooked preview request — ${business}`);
  const body = encodeURIComponent(`Hi KasiBooked,\n\nI would like a free preview for ${business}.\n\nMy name: ${name}\nBusiness type: ${type}\n\nPlease contact me with the next steps.`);
  const note = form.querySelector('.form-note');
  note.classList.add('success');
  note.textContent = 'Thanks — your email app will open with your preview request ready to send.';
  window.location.href = `mailto:sihlejeromenyendwana@gmail.com?subject=${subject}&body=${body}`;
});