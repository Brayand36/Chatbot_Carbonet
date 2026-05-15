/**
 * GESTIÓN DE INTERFAZ — navegación, dashboard, idioma
 */

class UIManager {
  constructor() {
    this.currentSection = 'inicio';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupDashboardNavigation();
    this.syncLangButtons();
    window.addEventListener('carbonet:language', () => {
      this.syncLangButtons();
      this.refreshDashboardTitle();
    });
  }

  syncLangButtons() {
    this.updateLanguageButtons(languageManager.currentLanguage);
  }

  setupEventListeners() {
    document.getElementById('btn-dashboard')?.addEventListener('click', () => this.openDashboard());

    document.getElementById('btn-chat')?.addEventListener('click', () => {
      document.getElementById('chatbot-toggle')?.click();
    });

    document.getElementById('btn-back-home')?.addEventListener('click', () => this.closeDashboard());

    document.getElementById('lang-es')?.addEventListener('click', () => {
      languageManager.setLanguage('es');
    });

    document.getElementById('lang-en')?.addEventListener('click', () => {
      languageManager.setLanguage('en');
    });

    document.getElementById('nav-open-dashboard')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openDashboard();
    });
  }

  setupDashboardNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        this.switchSection(section, link);
        sidebarLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  switchSection(section, linkEl) {
    document.querySelectorAll('.content-section').forEach((s) => s.classList.remove('active'));

    const activeSection = document.getElementById(`section-${section}`);
    if (activeSection) activeSection.classList.add('active');

    const titleKey = linkEl?.getAttribute('data-title-key');
    const titleElement = document.getElementById('section-title');
    if (titleElement && titleKey) {
      titleElement.textContent = languageManager.get(titleKey);
    }

    this.currentSection = section;
  }

  refreshDashboardTitle() {
    const active = document.querySelector('.sidebar-link.active');
    if (active) {
      const section = active.getAttribute('data-section');
      this.switchSection(section, active);
    }
  }

  openDashboard() {
    const hero = document.getElementById('inicio');
    const dashboard = document.getElementById('dashboard');
    if (hero && dashboard) {
      hero.classList.add('hidden');
      dashboard.classList.remove('hidden');
      window.scrollTo(0, 0);
      this.refreshDashboardTitle();
    }
  }

  closeDashboard() {
    const hero = document.getElementById('inicio');
    const dashboard = document.getElementById('dashboard');
    if (hero && dashboard) {
      dashboard.classList.add('hidden');
      hero.classList.remove('hidden');
      window.scrollTo(0, 0);
    }
  }

  updateLanguageButtons(lang) {
    const btnEs = document.getElementById('lang-es');
    const btnEn = document.getElementById('lang-en');
    btnEs?.classList.toggle('active', lang === 'es');
    btnEn?.classList.toggle('active', lang === 'en');
  }
}

const uiManager = new UIManager();
