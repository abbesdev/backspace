const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.js')

router.get('/exam', examController.getExams);
router.post('/exam', examController.createExam);
router.get('/exam/:classId', examController.getExamsByClass);
router.put('/exam/:id', examController.updateExam);
router.delete('/exam/:id', examController.deleteExam);


module.exports = router;
