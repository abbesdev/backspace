const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  subject:String,
  present: {
    type: Boolean,
    default: false
  },
  absent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;