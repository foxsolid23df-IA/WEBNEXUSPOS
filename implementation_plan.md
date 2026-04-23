# Plan de Mejora: NexumPOS Landing Page

Este documento detalla la estrategia para transformar la landing page actual de NexumPOS en una experiencia digital de nivel corporativo, optimizando su impacto visual, la claridad de su mensaje y su arquitectura técnica.

## 1. Mejora Estética (Visual & UX)

### Paleta de Colores y Estilo
- **Mesh Gradients**: Sustituir los fondos planos por gradientes de malla dinámicos (índigo profundo, cian eléctrico y violeta suave) para un look más moderno.
- **Glassmorphism 2.0**: Refinar las tarjetas con `backdrop-filter: blur(12px)` y bordes semi-transparentes de 1px para simular cristal real.
- **Micro-interacciones**: 
  - Efectos de **Parallax** suave en la imagen del Hero y en la sección de Doble Pantalla.
  - Animaciones de entrada escalonadas (staggered animations) para los beneficios.
  - Hover effects en botones con sutiles desplazamientos de luz.

### Tipografía y Jerarquía
- Aumentar el contraste entre los encabezados (Outfit) y el cuerpo de texto (Inter).
- Implementar un sistema de espaciado más generoso (whitespace) para permitir que el diseño "respire".

## 2. Organización y Estructura Técnica

### Arquitectura de Código
- **Modularización CSS**: Separar los estilos en variables globales, componentes y animaciones.
- **Refactorización de JS**: Organizar las funciones de la IA en un objeto `NexumIA` para evitar contaminar el scope global.
- **Performance**: Optimizar la carga de imágenes (WebP) y utilizar `lazy loading` para secciones que no están en el viewport inicial.

### Seguridad
- **Ocultamiento de Credenciales**: Crear un aviso claro sobre el uso de variables de entorno para la API Key, evitando que el usuario final la exponga accidentalmente en el cliente.

## 3. Estrategia de Información (Contenido & Conversión)

### Nuevas Secciones Críticas
- **Social Proof (Testimonios)**: Añadir una sección con historias de éxito (ej. dueños de lavanderías o abarrotes) para generar confianza.
- **Sección de Precios/Planes**: Aunque sea un botón de "Cotizar ahora", es vital dar una idea de la escala de inversión (ej. Plan Básico vs. Plan Enterprise).
- **FAQ (Preguntas Frecuentes)**: Resolver dudas comunes sobre la Doble Pantalla, compatibilidad de hardware y soporte técnico.

### Optimización de Mensaje
- **Hero Hook**: Refinar el título principal para que sea más directo: *"NexumPOS: El Cerebro de tu Negocio, Potenciado por IA"*.
- **SEO & Meta**: Implementar **JSON-LD Structured Data** para que Google reconozca a NexumPOS como un producto de software local en México.

## 4. Cronograma de Ejecución Propuesto

1. **Fase 1: Estética y Layout** (Rediseño de secciones existentes).
2. **Fase 2: Expansión de Contenido** (Testimonios, FAQ, Precios).
3. **Fase 3: Optimización Técnica** (JS Refactor, SEO, Performance).

---

> [!IMPORTANT]
> **¿Aprobación requerida?**
> Por favor, revisa estos puntos. Si estás de acuerdo, procederé a ejecutar la Fase 1: Rediseño estético y mejora del Hero.
