const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.js')

router.get('/question', questionController.getQuestions);
router.post('/question', questionController.createQuestion);
router.get('/question/:id', questionController.getQuestionById);


module.exports = router;
