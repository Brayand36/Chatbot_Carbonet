/**
 * SERVICIO DE INTEGRACIÓN CON GEMINI API
 */

const axios = require('axios');
const config = require('../../config/environment');

class GeminiService {
  isConfigured() {
    return Boolean(config.geminiApiKey && config.geminiApiKey.length > 0);
  }

  /**
   * @returns {Promise<string>}
   */
  async generateResponse(userMessage, language, history = [], systemPrompt) {
    if (!this.isConfigured()) {
      throw new Error('GEMINI_API_KEY_NOT_SET');
    }

    const model = config.geminiModel;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const messages = this.buildContents(userMessage, history, systemPrompt);

    const response = await axios.post(
      apiUrl,
      {
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': config.geminiApiKey,
        },
        timeout: config.requestTimeout,
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('EMPTY_GEMINI_RESPONSE');
    }

    return text;
  }

  buildContents(userMessage, history = [], systemPrompt) {
    const contents = [];

    contents.push({
      role: 'user',
      parts: [{ text: systemPrompt }],
    });

    contents.push({
      role: 'model',
      parts: [{ text: language === 'en' ? 'Understood. I am AURO, the CARBONET assistant. How can I help?' : 'Entendido. Soy AURO, el asistente CARBONET. ¿En qué puedo ayudarte?' }],
    });

    const capped = history.slice(-(config.maxHistoryMessages || 20));
    capped.forEach((msg) => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    });

    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    return contents;
  }
}

module.exports = new GeminiService();
