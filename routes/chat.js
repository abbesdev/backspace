const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.js');

router.get('/chat/:parentId/:teacherId', chatController.getChatHistory);
router.post('/chat', chatController.createChatMessage);

module.exports = router;
