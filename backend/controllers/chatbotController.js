/**
 * CONTROLADOR DEL CHATBOT
 */

const path = require('path');
const geminiService = require('../services/geminiService');

const knowledgeBase = require(path.join(__dirname, '../../knowledge-base/carbonet-kb.json'));

function buildKbContext(language) {
  const lang = language === 'en' ? 'en' : 'es';
  const proyecto = knowledgeBase.sections.proyecto[lang];
  const filosofia = knowledgeBase.sections.filosofia[lang];
  const faqs = knowledgeBase.preguntas_frecuentes[lang]
    .map((f) => `Q: ${f.pregunta}\nA: ${f.respuesta}`)
    .join('\n\n');

  return `
CONTEXT (use only to answer about CARBONET, knowledge management, ethics, autonomy, declaration):
Project: ${proyecto.titulo} — ${proyecto.descripcion}
Institutional declaration (${filosofia.titulo}): ${filosofia.texto}
Pillars: ${filosofia.pilares.join('; ')}
FAQ:
${faqs}
`.trim();
}

function localFallbackResponse(message, language) {
  const lang = language === 'en' ? 'en' : 'es';
  const lower = message.toLowerCase();

  const philosophyKeys =
    lang === 'en'
      ? ['declaration', 'transhuman', 'ethics', 'ethical', 'autonomy', 'autonomous', 'responsible', 'free', 'wellbeing', 'well-being', 'evolution', 'social responsibility']
      : ['declaración', 'transhuman', 'ética', 'etica', 'autonomía', 'autonomia', 'responsable', 'libre', 'bienestar', 'evolución', 'evolucion', 'responsabilidad social', 'filosofía', 'filosofia'];

  const filosofia = knowledgeBase.sections.filosofia[lang];
  if (philosophyKeys.some((k) => lower.includes(k))) {
    return `${filosofia.titulo}\n\n"${filosofia.texto}"\n\n${filosofia.pilares.map((p) => `• ${p}`).join('\n')}`;
  }

  const faqs = knowledgeBase.preguntas_frecuentes[lang];
  for (const item of faqs) {
    const q = item.pregunta.toLowerCase();
    const words = q.split(/\s+/).filter((w) => w.length > 3);
    if (words.some((w) => lower.includes(w)) || lower.includes(q.slice(0, 12))) {
      return item.respuesta;
    }
  }

  const carbonetKeys =
    lang === 'en'
      ? ['carbonet', 'sample', 'laboratory', 'lab', 'inventory', 'report', 'traceability', 'mining', 'dashboard']
      : ['carbonet', 'muestra', 'laboratorio', 'inventario', 'informe', 'trazabilidad', 'minería', 'mineria', 'dashboard'];

  if (carbonetKeys.some((k) => lower.includes(k))) {
    const p = knowledgeBase.sections.proyecto[lang];
    return `${p.titulo}\n\n${p.descripcion}\n\n${p.beneficios.map((b) => `• ${b}`).join('\n')}`;
  }

  if (/^(hola|hi|hello|hey|buenas|good morning|good afternoon)\b/.test(lower)) {
    return lang === 'en'
      ? 'Hello. I am AURO, the CARBONET assistant. Ask me about samples, laboratories, inventory, reports, traceability, or the institutional declaration on ethics and autonomy.'
      : 'Hola. Soy AURO, el asistente CARBONET. Pregúntame sobre muestras, laboratorios, inventario, informes, trazabilidad o la declaración institucional sobre ética y autonomía.';
  }

  return lang === 'en'
    ? 'I can help with CARBONET (samples, labs, inventory, reports, traceability) and with the institutional declaration on freedom, autonomy and responsibility. What would you like to know?'
    : 'Puedo ayudarte con CARBONET (muestras, laboratorios, inventario, informes, trazabilidad) y con la declaración institucional sobre libertad, autonomía y responsabilidad. ¿Qué te gustaría saber?';
}

class ChatbotController {
  static async handleChat(req, res) {
    try {
      const { message, language = 'es', history = [] } = req.body;

      if (!message || message.trim().length === 0) {
        return res.status(400).json({
          error: 'El mensaje no puede estar vacío',
        });
      }

      const systemPrompt = ChatbotController.generateSystemPrompt(language);
      let responseText;

      if (geminiService.isConfigured()) {
        try {
          responseText = await geminiService.generateResponse(message, language, history, systemPrompt);
        } catch (e) {
          console.warn('Gemini unavailable, using local KB:', e.message);
          responseText = localFallbackResponse(message, language);
        }
      } else {
        responseText = localFallbackResponse(message, language);
      }

      res.json({
        response: responseText,
        isFromKB: !geminiService.isConfigured(),
        language,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error en handleChat:', error);
      res.status(500).json({
        error: 'Error procesando la solicitud',
        message: error.message,
      });
    }
  }

  static getHealth(req, res) {
    res.json({
      status: 'OK',
      service: 'CARBONET Chatbot',
      geminiConfigured: geminiService.isConfigured(),
      timestamp: new Date(),
    });
  }

  static generateSystemPrompt(language) {
    const kb = buildKbContext(language);

    if (language === 'en') {
      return `You are AURO, a bilingual assistant (Spanish/English) for CARBONET, a web system for mining sample, laboratory and inventory management, integrated with the student's knowledge-management portal.

${kb}

Rules:
1. Answer about CARBONET, its modules, processes, and the institutional Transhuman Person declaration (ethics, autonomy, human development, positive transformation, wellbeing, social responsibility).
2. Keep a professional, supportive tone.
3. Reply in English unless the user writes clearly in Spanish.
4. When discussing values, connect them to responsible use of technology in mining and education.

INSTITUTIONAL DECLARATION (must respect and may quote when relevant):
"I am FREE, AUTONOMOUS AND RESPONSIBLE through dialogue and construction as a regulatory ideal; I direct myself, control myself and dictate my own laws."`;
    }

    return `Eres AURO, asistente bilingüe (Español/Inglés) para CARBONET, sistema web de gestión de muestras mineras, laboratorios e inventario, integrado en el portal de gestión del conocimiento del estudiante.

${kb}

Reglas:
1. Responde sobre CARBONET, sus módulos, procesos y la Declaración Persona Transhumana (ética, autonomía, desarrollo humano, transformación positiva, bienestar, responsabilidad social).
2. Mantén un tono profesional y cercano.
3. Responde en español salvo que el usuario escriba claramente en inglés.
4. Al hablar de valores, vincúlalos con el uso responsable de la tecnología en minería y en la formación.

DECLARACIÓN INSTITUCIONAL (respétala y cítala cuando sea pertinente):
"Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción, como ideal regulativo; me dirijo, controlo y dicto mis propias leyes."`;
  }
}

module.exports = ChatbotController;
