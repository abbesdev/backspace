const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.js')

router.get('/quiz', quizController.getQuizzes);
router.post('/quiz', quizController.createQuiz);
router.get('/quiz/:id', quizController.getQuizById);
router.put('/quiz/:id', quizController.updateQuiz);
router.delete('/quiz/:id', quizController.deleteQuiz);

router.post('/quiz/:quizId/:studentId', quizController.createQuizSubmission);
router.get('/quiz/:quizId', quizController.getQuizSubmissionsByQuiz);

router.get('/quiz/:studentId', quizController.getQuizSubmissionsByStudent);

module.exports = router;
