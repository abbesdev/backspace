const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.js')

router.get('/exam', examController.getExams);
router.post('/exam', examController.createExam);
router.get('/exam/:classId', examController.getExamsByClass);
router.get('/exam/examId/:examId', examController.getExamById);
router.get('/exam/teacher/:id', examController.getExamsByTeacherId);

router.put('/exam/:id', examController.updateExam);
router.delete('/exam/:id', examController.deleteExam);


module.exports = router;
