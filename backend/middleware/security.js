/**
 * MIDDLEWARE DE SEGURIDAD
 */

const securityMiddleware = {
  validateInput: (req, res, next) => {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'El campo message es requerido',
      });
    }

    if (typeof message !== 'string') {
      return res.status(400).json({
        error: 'El mensaje debe ser texto',
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: 'El mensaje es demasiado largo (máximo 2000 caracteres)',
      });
    }

    req.body.message = message.trim();
    next();
  },

  validateLanguage: (req, res, next) => {
    const { language } = req.body;
    const allowedLanguages = ['es', 'en'];

    if (language && !allowedLanguages.includes(language)) {
      return res.status(400).json({
        error: 'Idioma no soportado',
      });
    }

    next();
  },
};

module.exports = securityMiddleware;
