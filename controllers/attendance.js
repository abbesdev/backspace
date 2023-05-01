const Attendance = require('../models/attendance');

// CREATE - Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all attendance records
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({});
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get attendance records for a specific student
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const attendance = await Attendance.find({ student: studentId });
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE - Update an existing attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const attendance = await Attendance.findByIdAndUpdate(attendanceId, req.body, { new: true });
    if (!attendance) {
      return res.status(404).send('Attendance record not found');
    }
    res.send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE - Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const attendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!attendance) {
      return res.status(404).send('Attendance record not found');
    }
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
};
