/**
 * NexumPOS Landing Page Script
 * Handles UI interactions and Gemini AI integration
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.ai-card, .glass-card, .p-6.rounded-3xl');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('animate-fade-in-up');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});

// --- Groq AI Integration ---

// NOTE: Ideally, the API key should be handled via a secure backend.
// For this standalone landing page demo, it is provided here.
const GROQ_API_KEY = "TU_API_KEY_AQUI"; // Reemplaza con tu propia clave de Groq Cloud

/**
 * Generic function to fetch from Groq AI API (OpenAI Compatible)
 */
async function fetchAI(prompt, systemPrompt) {
    if (!GROQ_API_KEY) {
        console.warn("NexumIA: No se ha configurado la API Key de Groq.");
        return "⚠️ Por favor, configura tu API Key en assets/js/script.js para activar la Inteligencia Artificial.";
    }

    const endpoint = "https://api.groq.com/openai/v1/chat/completions";
    
    const payload = {
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY.trim()}`
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errData = await response.json();
            console.error("Groq API Error:", errData);
            throw new Error(errData.error?.message || `HTTP Error ${response.status}`);
        }
        
        const data = await response.json();
        const resultText = data.choices?.[0]?.message?.content;
        return resultText || "La IA no devolvió una respuesta válida.";
    } catch (error) {
        console.error("Groq Error:", error);
        return `⚠️ Error de Conexión: ${error.message}. Por favor verifica la disponibilidad de la API de Groq.`;
    }
}

/**
 * AI Auditor Feature
 */
async function runAuditAI() {
    const input = document.getElementById('audit-input');
    const res = document.getElementById('res-audit');
    const btn = document.getElementById('btn-audit');

    if (!input.value.trim()) {
        res.innerText = "Por favor describe el caso que deseas analizar.";
        res.classList.remove('hidden');
        return;
    }

    setLoading(btn, true, 'Analizando...');

    const system = "Eres NexumIA, un auditor experto para pequeños negocios en México. Tu objetivo es ayudar a entender por qué falta inventario o dinero. Analiza el caso considerando posibles errores humanos, mermas o falta de control con proveedores. Ofrece 2 razones probables y 1 consejo preventivo usando NexumPOS. Sé profesional pero cercano. Máximo 100 palabras.";
    const text = await fetchAI(`Caso: ${input.value}`, system);

    showResult(res, text);
    setLoading(btn, false, '<i class="fas fa-bolt-lightning text-yellow-400"></i> Analizar Caso');
}

/**
 * ROI Calculator Feature
 */
async function calculateROI() {
    const hours = document.getElementById('roi-hours');
    const res = document.getElementById('res-roi');
    const btn = document.getElementById('btn-roi');

    if (!hours.value) {
        res.innerText = "Ingresa cuántas horas gastas al día actualmente.";
        res.classList.remove('hidden');
        return;
    }

    setLoading(btn, true, 'Calculando...');

    const system = "Eres NexumIA Consultor. El usuario gasta tiempo en tareas manuales de administración. Calcula el ahorro anual (300 días laborables) y menciona cómo ese tiempo podría usarse para crecer el negocio o pasar tiempo con la familia. Sé inspirador. Máximo 80 palabras.";
    const text = await fetchAI(`Gasto ${hours.value} horas diarias en administración manual.`, system);

    showResult(res, text);
    setLoading(btn, false, '<i class="fas fa-calculator"></i> Calcular Beneficio');
}

/**
 * Smart Marketing Feature
 */
async function writePromo() {
    const promo = document.getElementById('promo-name');
    const res = document.getElementById('res-promo');
    const btn = document.getElementById('btn-promo');

    if (!promo.value.trim()) {
        res.innerText = "Escribe una idea breve de tu promoción.";
        res.classList.remove('hidden');
        return;
    }

    setLoading(btn, true, 'Redactando...');

    const system = "Eres NexumIA Marketing, un experto en crecimiento de negocios locales. Genera un mensaje de WhatsApp creativo y persuasivo. Destaca los beneficios tecnológicos de NexumPOS, como la Transparencia con Doble Pantalla para clientes o el Control Total de Proveedores si es relevante. Usa emojis, mantén un tono amigable mexicano e incluye [Nombre del Cliente]. Invita a la acción de manera natural.";
    const text = await fetchAI(`Promoción: ${promo.value}`, system);

    showResult(res, text);
    setLoading(btn, false, '<i class="fas fa-magic"></i> Generar Promo');
}

// --- UI Helpers ---

function setLoading(btn, isLoading, originalText) {
    if (isLoading) {
        btn.disabled = true;
        btn.innerHTML = `<div class="w-5 h-5 border-2 border-white/30 border-t-white loader rounded-full"></div> ${originalText}`;
    } else {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

function showResult(element, text) {
    element.innerHTML = text.replace(/\n/g, '<br>');
    element.classList.remove('hidden');
    element.classList.add('animate-fade-in');
}
