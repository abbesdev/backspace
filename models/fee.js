const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feesSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Parent',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    required: true
  }
});

const Fees = mongoose.model('Fees', feesSchema);

module.exports = Fees;
