const Event = require('../models/event');

// CREATE - Create a new event record
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all event records
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get an event record by ID
exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE - Update an existing event record
exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE - Delete an event record
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};
