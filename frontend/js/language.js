/**
 * SISTEMA DE GESTIÓN DE IDIOMAS — Español / Inglés
 */

class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'es';
    this.translations = {
      es: {
        'nav.home': 'Inicio',
        'nav.gkm': 'Gestión del conocimiento',
        'nav.philosophy': 'Filosofía del proyecto',
        'nav.features': 'Funcionalidades',
        'nav.dashboard': 'Dashboard',
        'nav.about': 'Acerca de',

        'hero.title': 'Minería inteligente y gestión del conocimiento con CARBONET',
        'hero.subtitle':
          'Tu portal integra muestras, laboratorios, inventario y un asistente bilingüe para el aprendizaje responsable.',
        'hero.btn-dashboard': 'Ir al Dashboard',
        'hero.btn-chat': 'Abrir chatbot',

        'gkm.title': 'Gestión del conocimiento del estudiante',
        'gkm.lead':
          'Este sitio es tu espacio de Gestión del Conocimiento: organiza aprendizajes, consulta módulos operativos y dialoga con el asistente AURO en español o inglés.',
        'gkm.b1': 'Documentar y consultar procesos (muestras, laboratorios, informes).',
        'gkm.b2': 'Usar el chatbot integrado para resolver dudas con contexto del proyecto.',
        'gkm.b3': 'Alternar idioma para practicar comunicación técnica bilingüe.',
        'gkm.b4': 'Reflexionar sobre ética y autonomía en el uso de IA aplicada a minería.',

        'philosophy.landingTitle': 'Declaración Persona Transhumana',
        'philosophy.intro':
          'Filosofía orientadora del proyecto: la tecnología y el diálogo sirven al desarrollo humano, la responsabilidad social y el bienestar.',
        'declaration.full':
          'Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción, como ideal regulativo; me dirijo, controlo y dicto mis propias leyes.',
        'philosophy.short': 'Soy LIBRE, AUTÓNOMO Y RESPONSABLE',

        'values.section_title': 'Dimensiones humanas y éticas',

        'values.ethics.title': 'Ética',
        'values.ethics.desc': 'Decisiones transparentes y cuidado del impacto de la IA.',
        'values.autonomy.title': 'Autonomía',
        'values.autonomy.desc': 'Dirigir el propio aprendizaje y el uso crítico de herramientas.',
        'values.human.title': 'Desarrollo humano',
        'values.human.desc': 'Priorizar competencias y saberes sobre la automatización ciega.',
        'values.transform.title': 'Transformación positiva',
        'values.transform.desc': 'Mejorar procesos mineros con visión de sostenibilidad.',
        'values.wellbeing.title': 'Bienestar',
        'values.wellbeing.desc': 'Equilibrio entre exigencia académica y salud mental.',
        'values.growth.title': 'Evolución personal',
        'values.growth.desc': 'Metas de mejora continua y reflexión en el portafolio.',
        'values.social.title': 'Responsabilidad social',
        'values.social.desc': 'Minería y tecnología al servicio de comunidades y entorno.',

        'features.title': 'Características principales',
        'features.samples': 'Gestión de muestras',
        'features.samples-desc': 'Registro y seguimiento completo de muestras mineras',
        'features.labs': 'Gestión de laboratorios',
        'features.labs-desc': 'Administración de procesos y capacidades',
        'features.inventory': 'Control de inventario',
        'features.inventory-desc': 'Monitoreo en tiempo real de recursos',
        'features.reports': 'Informes mineros',
        'features.reports-desc': 'Análisis detallados y exportación de datos',
        'features.traceability': 'Trazabilidad',
        'features.traceability-desc': 'Seguimiento completo del ciclo de vida',
        'features.chatbot': 'Asistencia IA bilingüe',
        'features.chatbot-desc': 'AURO integrado en la interfaz web del proyecto',
        'features.km': 'Gestión del conocimiento',
        'features.km-desc': 'Navegación clara entre módulos y recursos para tu evidencia académica',

        'dashboard.menu': 'Menú principal',
        'dashboard.welcome': 'Bienvenido al Dashboard CARBONET',
        'dashboard.welcome-desc':
          'Selecciona una opción del menú para gestionar muestras, laboratorios, inventario e informes.',

        'menu.home': 'Inicio',
        'menu.samples': 'Muestras',
        'menu.labs': 'Laboratorios',
        'menu.inventory': 'Inventario',
        'menu.reports': 'Informes',

        'stats.samples': 'Muestras',
        'stats.labs': 'Laboratorios',
        'stats.efficiency': 'Eficiencia',

        'samples.title': 'Gestión de muestras',
        'samples.description':
          'Registra, visualiza y gestiona todas las muestras mineras enviadas a laboratorios. Obtén información sobre el estado, trazabilidad y análisis de cada muestra.',

        'labs.title': 'Gestión de laboratorios',
        'labs.description': 'Administra laboratorios, sus capacidades, equipos y procesos disponibles.',
        'labs.capacity': 'Capacidad: 50 muestras/mes',
        'labs.status': 'Estado: Activo ✓',

        'inventory.title': 'Control de inventario',
        'inventory.description': 'Monitorea recursos, materiales y equipos disponibles en el sistema.',

        'reports.title': 'Informes mineros',
        'reports.description': 'Genera y consulta informes detallados de análisis, trazabilidad y resultados.',

        'btn.new-sample': 'Nueva muestra',
        'btn.new-lab': 'Nuevo laboratorio',
        'btn.generate-report': 'Generar reporte',
        'btn.download': 'Descargar',
        'btn.back': 'Volver',

        'table.id': 'ID',
        'table.name': 'Nombre',
        'table.date': 'Fecha',
        'table.status': 'Estado',
        'table.item': 'Artículo',
        'table.quantity': 'Cantidad',
        'table.location': 'Ubicación',

        'chatbot.title': 'Asistente AURO — CARBONET',
        'chatbot.welcome':
          'Hola. Puedo orientarte sobre CARBONET (muestras, laboratorios, inventario, informes) y sobre la declaración institucional de libertad, autonomía y responsabilidad. ¿En qué te ayudo?',
        'chatbot.declarationIntro': 'Mensaje institucional (Persona Transhumana):',
        'chatbot.clear': 'Limpiar',
        'chatbot.reflect': 'Módulo reflexivo',
        'chatbot.reflect_question':
          '¿Cómo se relaciona la Declaración Persona Transhumana con el uso ético de la IA en CARBONET y con mi autonomía como estudiante?',
        'chatbot.placeholder': 'Escribe tu pregunta...',

        'dash.title.inicio': 'Dashboard CARBONET',
        'dash.title.muestras': 'Gestión de muestras',
        'dash.title.laboratorios': 'Gestión de laboratorios',
        'dash.title.inventario': 'Control de inventario',
        'dash.title.informes': 'Informes mineros',

        'about.title': 'Acerca de este entregable',
        'about.body':
          'Proyecto web de Gestión del Conocimiento con chatbot funcional (Node.js + Express + API opcional Gemini). Para tu video técnico en inglés, explica arquitectura, rutas /api/chatbot/chat, internacionalización e integración de la declaración institucional.',

        'philosophy': 'Soy LIBRE, AUTÓNOMO Y RESPONSABLE',
      },
      en: {
        'nav.home': 'Home',
        'nav.gkm': 'Knowledge management',
        'nav.philosophy': 'Project philosophy',
        'nav.features': 'Features',
        'nav.dashboard': 'Dashboard',
        'nav.about': 'About',

        'hero.title': 'Smart mining and knowledge management with CARBONET',
        'hero.subtitle':
          'Your portal combines samples, labs, inventory, and a bilingual assistant for responsible learning.',
        'hero.btn-dashboard': 'Go to Dashboard',
        'hero.btn-chat': 'Open chatbot',

        'gkm.title': 'Student knowledge management',
        'gkm.lead':
          'This site is your Knowledge Management hub: organize learning, browse operational modules, and talk to AURO in Spanish or English.',
        'gkm.b1': 'Document and review processes (samples, labs, reports).',
        'gkm.b2': 'Use the embedded chatbot for answers grounded in the project.',
        'gkm.b3': 'Switch language to practice bilingual technical communication.',
        'gkm.b4': 'Reflect on ethics and autonomy when applying AI to mining scenarios.',

        'philosophy.landingTitle': 'Transhuman Person Declaration',
        'philosophy.intro':
          'Guiding philosophy: technology and dialogue serve human development, social responsibility, and wellbeing.',
        'declaration.full':
          'I am FREE, AUTONOMOUS AND RESPONSIBLE through dialogue and construction as a regulatory ideal; I direct myself, control myself and dictate my own laws.',
        'philosophy.short': 'I am FREE, AUTONOMOUS AND RESPONSIBLE',

        'values.section_title': 'Human and ethical dimensions',

        'values.ethics.title': 'Ethics',
        'values.ethics.desc': 'Transparent choices and mindful AI impact.',
        'values.autonomy.title': 'Autonomy',
        'values.autonomy.desc': 'Steer your own learning and critical tool use.',
        'values.human.title': 'Human development',
        'values.human.desc': 'Prioritize skills and sense-making over blind automation.',
        'values.transform.title': 'Positive transformation',
        'values.transform.desc': 'Improve mining workflows with sustainability in view.',
        'values.wellbeing.title': 'Wellbeing',
        'values.wellbeing.desc': 'Balance academic rigor with mental health.',
        'values.growth.title': 'Personal evolution',
        'values.growth.desc': 'Continuous improvement goals and portfolio reflection.',
        'values.social.title': 'Social responsibility',
        'values.social.desc': 'Mining and technology in service of communities and environment.',

        'features.title': 'Main features',
        'features.samples': 'Sample management',
        'features.samples-desc': 'Full registration and tracking of mining samples',
        'features.labs': 'Laboratory management',
        'features.labs-desc': 'Administration of processes and capabilities',
        'features.inventory': 'Inventory control',
        'features.inventory-desc': 'Real-time monitoring of resources',
        'features.reports': 'Mining reports',
        'features.reports-desc': 'Detailed analysis and data export',
        'features.traceability': 'Traceability',
        'features.traceability-desc': 'Complete lifecycle tracking',
        'features.chatbot': 'Bilingual AI assistance',
        'features.chatbot-desc': 'AURO embedded in the project web UI',
        'features.km': 'Knowledge management',
        'features.km-desc': 'Clear navigation across modules for your academic evidence',

        'dashboard.menu': 'Main menu',
        'dashboard.welcome': 'Welcome to the CARBONET Dashboard',
        'dashboard.welcome-desc': 'Pick a menu option to manage samples, labs, inventory, and reports.',

        'menu.home': 'Home',
        'menu.samples': 'Samples',
        'menu.labs': 'Laboratories',
        'menu.inventory': 'Inventory',
        'menu.reports': 'Reports',

        'stats.samples': 'Samples',
        'stats.labs': 'Laboratories',
        'stats.efficiency': 'Efficiency',

        'samples.title': 'Sample management',
        'samples.description':
          'Register, view, and manage mining samples sent to labs. Track status, traceability, and analyses.',

        'labs.title': 'Laboratory management',
        'labs.description': 'Manage labs, capacities, equipment, and available processes.',
        'labs.capacity': 'Capacity: 50 samples/month',
        'labs.status': 'Status: Active ✓',

        'inventory.title': 'Inventory control',
        'inventory.description': 'Monitor resources, materials, and equipment available in the system.',

        'reports.title': 'Mining reports',
        'reports.description': 'Generate and review detailed analysis, traceability, and results reports.',

        'btn.new-sample': 'New sample',
        'btn.new-lab': 'New laboratory',
        'btn.generate-report': 'Generate report',
        'btn.download': 'Download',
        'btn.back': 'Back',

        'table.id': 'ID',
        'table.name': 'Name',
        'table.date': 'Date',
        'table.status': 'Status',
        'table.item': 'Item',
        'table.quantity': 'Quantity',
        'table.location': 'Location',

        'chatbot.title': 'AURO Assistant — CARBONET',
        'chatbot.welcome':
          'Hi. I can help with CARBONET (samples, labs, inventory, reports) and with the institutional declaration on freedom, autonomy, and responsibility. What do you need?',
        'chatbot.declarationIntro': 'Institutional message (Transhuman Person):',
        'chatbot.clear': 'Clear',
        'chatbot.reflect': 'Reflection prompt',
        'chatbot.reflect_question':
          'How does the Transhuman Person Declaration relate to ethical AI use in CARBONET and to my autonomy as a student?',
        'chatbot.placeholder': 'Type your question...',

        'dash.title.inicio': 'CARBONET Dashboard',
        'dash.title.muestras': 'Sample management',
        'dash.title.laboratorios': 'Laboratory management',
        'dash.title.inventario': 'Inventory control',
        'dash.title.informes': 'Mining reports',

        'about.title': 'About this deliverable',
        'about.body':
          'Knowledge-management web project with a functional chatbot (Node.js + Express + optional Gemini API). For your technical video in English, explain architecture, /api/chatbot/chat routes, i18n, and institutional declaration integration.',

        'philosophy': 'I am FREE, AUTONOMOUS AND RESPONSIBLE',
      },
    };
    this.init();
  }

  init() {
    this.setLanguage(this.currentLanguage);
  }

  setLanguage(lang) {
    if (!this.translations[lang]) return;
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.updateDOM();
    window.dispatchEvent(new CustomEvent('carbonet:language', { detail: { lang } }));
  }

  updateDOM() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const text = this.get(key);
      if (!text) return;
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    });
  }

  get(key) {
    return this.translations[this.currentLanguage][key] || key;
  }

  detectLanguage() {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' || browserLang === 'en' ? browserLang : 'es';
  }
}

const languageManager = new LanguageManager();
