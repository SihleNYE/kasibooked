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

enquiryForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    if (form.elements._honey?.value) return;

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending your request…';
    }
    if (enquiryNote) {
        enquiryNote.classList.remove('success');
        enquiryNote.textContent = 'Sending your request…';
    }

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Form delivery failed');

        form.reset();
        if (enquiryNote) {
            enquiryNote.classList.add('success');
            enquiryNote.textContent = 'Thanks — your request is in. We’ll contact you on WhatsApp.';
        }
    } catch (error) {
        const details = new FormData(form);
        const message = [
            'Hello Nyendwana Techworks, I’d like a free KasiBooked preview.',
            '',
            `Name: ${details.get('name')}`,
            `Business: ${details.get('business')}`,
            `WhatsApp: ${details.get('whatsapp')}`,
            `Business type: ${details.get('type')}`,
            '',
            'Please contact me about a booking website.'
        ].join('\n');
        if (enquiryNote) enquiryNote.textContent = 'Email delivery had a hiccup — WhatsApp is opening with your enquiry ready to send.';
        window.location.href = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message)}`;
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Request a free preview →';
        }
    }
});
