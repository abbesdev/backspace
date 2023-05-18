const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.js')

router.get('/class', classController.getClasses);
router.post('/class', classController.createClass);
router.get('/class/:id', classController.getClassById);
router.get('/class/teacher/:teacherId', classController.getClassesByT);

router.put('/class/:id', classController.updateClass);
router.delete('/class/:id', classController.deleteClass);


module.exports = router;
