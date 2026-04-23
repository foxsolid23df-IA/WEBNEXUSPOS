/**
 * NexumPOS Landing Page Script
 * Modular architecture for UI and NexumIA Integration
 */

const NexumIA = {
    apiKey: "TU_API_KEY_AQUI",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",

    async ask(prompt, systemPrompt) {
        if (!this.apiKey || this.apiKey === "TU_API_KEY_AQUI") return "⚠️ API Key no configurada.";

        const payload = {
            model: this.model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1024
        };

        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey.trim()}`
                },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            return data.choices?.[0]?.message?.content || "Sin respuesta.";
        } catch (error) {
            console.error("NexumIA Error:", error);
            return `⚠️ Error de conexión: ${error.message}`;
        }
    },

    typeWriter(element, text, speed = 10) {
        let i = 0;
        element.innerHTML = "";
        const formattedText = text.replace(/\n/g, '<br>');
        
        function type() {
            if (i < text.length) {
                // Handle newlines correctly in display
                const currentText = text.substring(0, i + 1).replace(/\n/g, '<br>');
                element.innerHTML = currentText;
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
};

const UI = {
    setLoading(btn, isLoading, text) {
        btn.disabled = isLoading;
        if (isLoading) {
            btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> ${text}`;
        } else {
            btn.innerHTML = text;
        }
    },

    showResult(container, aiText, userText) {
        container.innerHTML = "";
        container.classList.remove('hidden');
        
        if (userText) {
            const u = document.createElement('div');
            u.className = 'chat-bubble chat-bubble-user animate-slide-in';
            u.innerText = userText;
            container.appendChild(u);
        }

        const a = document.createElement('div');
        a.className = 'chat-bubble chat-bubble-ai skeleton-loading';
        container.appendChild(a);

        // Simulate thinking delay then type
        setTimeout(() => {
            a.classList.remove('skeleton-loading');
            NexumIA.typeWriter(a, aiText);
        }, 1000);
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

// AI Handlers
async function runAuditAI() {
    const input = document.getElementById('audit-input');
    const res = document.getElementById('res-audit');
    const btn = document.getElementById('btn-audit');
    const val = input.value.trim();

    if (!val) return;
    UI.setLoading(btn, true, 'Analizando...');
    const prompt = `Caso: ${val}`;
    const sys = "Eres NexumIA Auditor. Analiza faltantes de dinero o inventario. Da 2 razones y 1 consejo. Máximo 100 palabras.";
    const text = await NexumIA.ask(prompt, sys);
    UI.showResult(res, text, val);
    UI.setLoading(btn, false, '<i class="fas fa-bolt-lightning text-yellow-400"></i> Analizar Caso');
}

async function calculateROI() {
    const input = document.getElementById('roi-hours');
    const res = document.getElementById('res-roi');
    const btn = document.getElementById('btn-roi');
    const val = input.value;

    if (!val) return;
    UI.setLoading(btn, true, 'Calculando...');
    const sys = "Eres NexumIA Consultor. Calcula ahorro anual de tiempo y da un consejo inspirador. Máximo 80 palabras.";
    const text = await NexumIA.ask(`${val} horas diarias manuales`, sys);
    UI.showResult(res, text, `${val} horas/día`);
    UI.setLoading(btn, false, '<i class="fas fa-calculator"></i> Calcular Beneficio');
}

async function writePromo() {
    const input = document.getElementById('promo-name');
    const res = document.getElementById('res-promo');
    const btn = document.getElementById('btn-promo');
    const val = input.value.trim();

    if (!val) return;
    UI.setLoading(btn, true, 'Redactando...');
    const sys = "Eres NexumIA Marketing. Crea un mensaje de WhatsApp creativo incluyendo beneficios de Doble Pantalla y Control de Proveedores de NexumPOS. Usa emojis. Máximo 100 palabras.";
    const text = await NexumIA.ask(val, sys);
    UI.showResult(res, text, val);
    UI.setLoading(btn, false, '<i class="fas fa-magic"></i> Generar Promo');
}
