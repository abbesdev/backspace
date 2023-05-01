const Question = require('../models/question');

// CREATE - Create a new Question
exports.createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).send(newQuestion);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all Question
exports.getQuestions = async (req, res) => {
  try {
    const question = await Question.find({});
    res.send(question);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get a specific Question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;
    const foundQuestion = await Question.findById(questionId);
    if (!foundQuestion) {
      return res.status(404).send('Question not found');
    }
    res.send(foundQuestion);
  } catch (error) {
    res.status(500).send(error);
  }
};


