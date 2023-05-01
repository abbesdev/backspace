const Exam = require('../models/exam');

// CREATE - Create a new exam record
exports.createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).send(exam);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all exam records
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.send(exams);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get exam records for a specific class
exports.getExamsByClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    const exams = await Exam.find({ class: classId });
    res.send(exams);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE - Update an existing exam record
exports.updateExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const exam = await Exam.findByIdAndUpdate(examId, req.body, { new: true });
    if (!exam) {
      return res.status(404).send('Exam record not found');
    }
    res.send(exam);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE - Delete an exam record
exports.deleteExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const exam = await Exam.findByIdAndDelete(examId);
    if (!exam) {
      return res.status(404).send('Exam record not found');
    }
    res.send(exam);
  } catch (error) {
    res.status(500).send(error);
  }
};
