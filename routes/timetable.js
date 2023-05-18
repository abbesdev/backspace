const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetable.js');

router.get('/timetable', timetableController.getTimetables);
router.post('/timetable', timetableController.createTimetable);
router.get('/timetable/:id', timetableController.getTimetableById);
router.get('/timetablebyclassid/:classId', timetableController.getTimetablesByClassId);
router.put('/timetable/:id', timetableController.updateTimetable);
router.delete('/timetable/:id', timetableController.deleteTimetable);

router.get('/timetablewithnames', timetableController.getTimetables2);


module.exports = router;