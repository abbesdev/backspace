// class.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: String,
    grade: String,
    section: String,
    teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }]
  });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;