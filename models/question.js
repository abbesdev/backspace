// class.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
   "text":String,
   "options":[String]
  });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;