// exam.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: Date,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;