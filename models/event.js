const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true,
    trim: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
