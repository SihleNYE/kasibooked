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

const enquiryForm = document.querySelector('#enquiry-form');
const enquiryNote = enquiryForm?.querySelector('.form-note');

if (new URLSearchParams(window.location.search).get('enquiry') === 'sent') {
    enquiryNote?.classList.add('success');
    if (enquiryNote) enquiryNote.textContent = 'Thanks — your request is on its way. We’ll contact you on WhatsApp.';
    history.replaceState({}, document.title, `${window.location.pathname}#contact`);
}

enquiryForm?.addEventListener('submit', (event) => {
    const form = event.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');

                                if (!form.checkValidity()) {
                                      event.preventDefault();
                                      form.reportValidity();
                                      return;
                                }

                                if (form.elements._honey?.value) {
                                      event.preventDefault();
                                      return;
                                }

                                if (submitButton) {
                                      submitButton.disabled = true;
                                      submitButton.textContent = 'Sending your request…';
                                }
    if (enquiryNote) enquiryNote.textContent = 'Sending your request…';
});
