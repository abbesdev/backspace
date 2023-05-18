// Import the required models
const Timetable = require('../models/timetable');
const Subject = require('../models/subject');
const Class = require('../models/class')

// CREATE - Create a new timetable entry
exports.createTimetable = async (req, res) => {
  try {
    console.log(req.body);
    const { classId, startDate, endDate,  timeDuration, subjectId } = req.body;
console.log(classId);
    // Check if the provided classId and subjectId exist
    const foundClass = await Class.findById(classId);
    if (!foundClass) {
      return res.status(404).send('Class not found');
    }
    const foundSubject = await Subject.findById(subjectId);
    if (!foundSubject) {
      return res.status(404).send('Subject not found');
    }

    // Create a new timetable entry
    const newTimetable = new Timetable({
      class: classId,
      startDate,
      endDate,
     // startTime,
     timeDuration,
      subject: subjectId
    });
    await newTimetable.save();
    res.status(201).send(newTimetable);
  } catch (error) {
    res.status(400).send(error);
    //print(error);
    console.log(error);
  }
};

// READ - Get all timetable entries
exports.getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find({});
    res.send(timetables);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get timetables with classname and subject name 
exports.getTimetables2 = async (req, res) => {
  try {
    const timetables = await Timetable.find({}).populate('class', 'name').populate('subject', 'name');
    const results = timetables.map(t => {
      return {
        startDate: t.startDate,
        endDate: t.endDate,
        timeDuration: t.timeDuration,
        classes: t.class.name,
        subject: t.subject.name
      };
    });
    res.send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};



// READ - Get a specific timetable entry by ID
exports.getTimetableById = async (req, res) => {
  try {
    const timetableId = req.params.id;
    const foundTimetable = await Timetable.findById(timetableId);
    if (!foundTimetable) {
      return res.status(404).send('Timetable entry not found');
    }
    res.send(foundTimetable);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get all timetable entries for a specific class
exports.getTimetablesByClassId = async (req, res) => {
    try {
      const classId = req.params.classId;
      const timetables = await Timetable.find({ class: classId });
      res.send(timetables);
    } catch (error) {
      res.status(500).send(error);
    }
  };

// UPDATE - Update an existing timetable entry
exports.updateTimetable = async (req, res) => {
  try {
    const timetableId = req.params.id;
    const { classId, startDate, endDate, startTime, duration, subjectId } = req.body;

    // Check if the provided classId and subjectId exist
    const foundClass = await Class.findById(classId);
    if (!foundClass) {
      return res.status(404).send('Class not found');
    }
    const foundSubject = await Subject.findById(subjectId);
    if (!foundSubject) {
      return res.status(404).send('Subject not found');
    }

    

    // Update the timetable entry
    const updatedTimetable = await Timetable.findByIdAndUpdate(
      timetableId,
      { class: classId, startDate, endDate, startTime, duration, subject: subjectId },
      { new: true }
    );
    if (!updatedTimetable) {
      return res.status(404).send('Timetable entry not found');
    }
    res.send(updatedTimetable);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE - Delete a timetable entry
exports.deleteTimetable = async (req, res) => {
  try {
    const timetableId = req.params.id;
    const deletedTimetable = await Timetable.findByIdAndDelete(timetableId);
    if (!deletedTimetable) {
      return res.status(404).send('Timetable entry not found');
    }
    res.send(deletedTimetable);
  } catch (error) {
    res.status(500).send(error);
  }
};