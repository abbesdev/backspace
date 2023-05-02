const Subject = require('../models/subject');

// CREATE - Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSubject = new Subject({ name, description });
    await newSubject.save();
    res.status(201).send(newSubject);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.send(subjects);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get a specific subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const foundSubject = await Subject.findById(subjectId);
    if (!foundSubject) {
      return res.status(404).send('Subject not found');
    }
    res.send(foundSubject);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE - Update an existing subject
exports.updateSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const { name, description } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { name, description },
      { new: true }
    );
    if (!updatedSubject) {
      return res.status(404).send('Subject not found');
    }
    res.send(updatedSubject);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE - Delete a subject
exports.deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const deletedSubject = await Subject.findByIdAndDelete(subjectId);
    if (!deletedSubject) {
      return res.status(404).send('Subject not found');
    }
    res.send(deletedSubject);
  } catch (error) {
    res.status(500).send(error);
  }
};
