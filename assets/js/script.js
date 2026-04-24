/**
 * NexumPOS Landing Page Script
 * Modular architecture for UI
 */

const UI = {
    setLoading(btn, isLoading, text) {
        btn.disabled = isLoading;
        if (isLoading) {
            btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> ${text}`;
        } else {
            btn.innerHTML = text;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // FAQ
    window.toggleFAQ = (el) => {
        const item = el.parentElement;
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    };

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            UI.setLoading(btn, true, 'Enviando...');

            const data = new FormData(contactForm);
            const text = `Hola NexumPOS! 👋\n\nMe interesa el sistema.\n*Nombre:* ${data.get('name')}\n*Negocio:* ${data.get('business')}\n*Msg:* ${data.get('message')}`;
            
            setTimeout(() => {
                window.open(`https://wa.me/525650607108?text=${encodeURIComponent(text)}`, '_blank');
                UI.setLoading(btn, false, originalText);
                contactForm.reset();
            }, 800);
        });
    }
});

