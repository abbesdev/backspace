const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.js')

router.get('/attendance', attendanceController.getAttendance);
router.post('/attendance', attendanceController.createAttendance);
router.get('/attendance/:studentId', attendanceController.getAttendanceByStudent);
router.put('/attendance/:id', attendanceController.updateAttendance);
router.delete('/attendance/:id', attendanceController.deleteAttendance);


module.exports = router;
