const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.js')

router.get('/subject', subjectController.getSubjects);
router.post('/subject', subjectController.createSubject);
router.get('/subject/:id', subjectController.getSubjectById);
router.put('/subject/:id', subjectController.updateSubject);
router.delete('/subject/:id', subjectController.deleteSubject);


module.exports = router;
