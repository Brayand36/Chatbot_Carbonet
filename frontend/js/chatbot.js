/**
 * CHATBOT — cliente web, bilingüe, integrado con backend
 */

class ChatbotManager {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.conversationHistory = [];
    this.apiEndpoint = '/api/chatbot/chat';
    this.init();
  }

  init() {
    this.setupElements();
    this.setupEventListeners();
    this.hydrateFromStorage();
    window.addEventListener('carbonet:language', () => {
      this.updatePlaceholder();
      const hasUser = this.messages.some((m) => m.role === 'user');
      if (!hasUser) {
        this.messagesContainer.innerHTML = '';
        this.messages = [];
        this.renderInitialMessages();
      }
    });
  }

  setupElements() {
    this.toggle = document.getElementById('chatbot-toggle');
    this.container = document.getElementById('chatbot-container');
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.sendBtn = document.getElementById('chatbot-send');
    this.closeBtn = document.getElementById('chatbot-close');
    this.clearBtn = document.getElementById('chatbot-clear');
    this.reflectBtn = document.getElementById('chatbot-reflect');
    this.typingIndicator = document.getElementById('typing-indicator');
  }

  setupEventListeners() {
    this.toggle?.addEventListener('click', () => this.toggleChat());
    this.closeBtn?.addEventListener('click', () => this.closeChat());
    this.sendBtn?.addEventListener('click', () => this.sendMessage());
    this.input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    this.clearBtn?.addEventListener('click', () => this.clearChat());
    this.reflectBtn?.addEventListener('click', () => this.sendReflectivePrompt());

    document.getElementById('lang-es')?.addEventListener('click', () => this.updatePlaceholder());
    document.getElementById('lang-en')?.addEventListener('click', () => this.updatePlaceholder());
  }

  toggleChat() {
    if (this.isOpen) this.closeChat();
    else this.openChat();
  }

  openChat() {
    this.isOpen = true;
    this.container?.classList.add('open');
    this.toggle?.classList.add('active');
    this.input?.focus();
  }

  closeChat() {
    this.isOpen = false;
    this.container?.classList.remove('open');
    this.toggle?.classList.remove('active');
  }

  renderInitialMessages() {
    const intro = languageManager.get('chatbot.declarationIntro');
    const decl = languageManager.get('declaration.full');
    this.addMessage(`${intro}\n\n"${decl}"`, 'system');
    this.addMessage(languageManager.get('chatbot.welcome'), 'bot');
  }

  hydrateFromStorage() {
    const savedMessages = localStorage.getItem('chatbot_messages');
    const savedHistory = localStorage.getItem('chatbot_history');

    if (savedHistory) {
      try {
        this.conversationHistory = JSON.parse(savedHistory);
      } catch {
        this.conversationHistory = [];
      }
    }

    if (savedMessages) {
      try {
        this.messages = JSON.parse(savedMessages);
      } catch {
        this.messages = [];
      }
    }

    if (this.messages.length > 0) {
      this.messages.forEach((msg) => this.addMessage(msg.text, msg.role, false));
    } else {
      this.renderInitialMessages();
    }

    this.updatePlaceholder();
  }

  addMessage(text, role, pushToLog = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${role}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    this.messagesContainer?.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

    if (pushToLog) {
      this.messages.push({ text, role });
    }
  }

  async sendReflectivePrompt() {
    const q = languageManager.get('chatbot.reflect_question');
    this.input.value = q;
    await this.sendMessage();
  }

  async sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;

    this.addMessage(message, 'user');
    this.input.value = '';

    this.conversationHistory.push({ role: 'user', content: message });
    this.saveMessageHistory();

    this.showTypingIndicator();

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          language: languageManager.currentLanguage,
          history: this.conversationHistory,
        }),
      });

      if (!response.ok) throw new Error('Request failed');

      const data = await response.json();
      const botResponse = data.response ?? data.message ?? '';

      this.addMessage(botResponse, 'bot');
      this.conversationHistory.push({ role: 'assistant', content: botResponse });
      this.saveMessageHistory();
    } catch (error) {
      console.error(error);
      const errorMsg =
        languageManager.currentLanguage === 'es'
          ? 'No se pudo contactar al servidor. Ejecuta `npm start` y abre http://localhost:3000 .'
          : 'Could not reach the server. Run `npm start` and open http://localhost:3000 .';
      this.addMessage(errorMsg, 'bot');
    } finally {
      this.hideTypingIndicator();
    }
  }

  showTypingIndicator() {
    this.typingIndicator?.classList.remove('hidden');
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    this.typingIndicator?.classList.add('hidden');
  }

  clearChat() {
    const ok = confirm(
      languageManager.currentLanguage === 'es'
        ? '¿Deseas limpiar el historial del chat?'
        : 'Clear chat history?'
    );
    if (!ok) return;

    this.messagesContainer.innerHTML = '';
    this.messages = [];
    this.conversationHistory = [];
    localStorage.removeItem('chatbot_messages');
    localStorage.removeItem('chatbot_history');
    this.renderInitialMessages();
  }

  updatePlaceholder() {
    if (this.input) {
      this.input.placeholder = languageManager.get('chatbot.placeholder');
    }
  }

  saveMessageHistory() {
    localStorage.setItem('chatbot_messages', JSON.stringify(this.messages));
    localStorage.setItem('chatbot_history', JSON.stringify(this.conversationHistory));
  }
}

const chatbotManager = new ChatbotManager();
