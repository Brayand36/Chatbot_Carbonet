/**
 * RUTAS DEL CHATBOT
 */

const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const securityMiddleware = require('../middleware/security');

router.post('/chat', securityMiddleware.validateInput, securityMiddleware.validateLanguage, chatbotController.handleChat);

router.get('/health', chatbotController.getHealth);

module.exports = router;
