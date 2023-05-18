const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.js')

router.get('/quiz', quizController.getQuizzes);
router.get('/quiz/teacher/:id', quizController.getQuizzesByTeacherId);

router.post('/quiz', quizController.createQuiz);
router.get('/quiz/:id', quizController.getQuizById);
router.put('/quiz/:id', quizController.updateQuiz);
router.delete('/quiz/:id', quizController.deleteQuiz);

router.post('/quiz/:quizId/:studentId', quizController.createQuizSubmission);
router.get('/quiz/:quizId', quizController.getQuizSubmissionsByQuiz);

router.get('/quizbystudent/:studentId', quizController.getQuizSubmissionsByStudent);

router.get('/questionsbyquiz/:quizId', quizController.getQuestionsByQuiz);
router.get('/quiz/class/:classId',quizController.getQuizByClass);
module.exports = router;
