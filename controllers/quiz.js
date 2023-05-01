const Quiz = require('../models/quiz');

// CREATE - Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get a specific quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE - Update an existing quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findByIdAndUpdate(quizId, req.body, { new: true });
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE - Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
};

// CREATE - Create a new quiz submission for a student
exports.createQuizSubmission = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const studentId = req.params.studentId;
    const quizSubmission = {
      student: studentId,
      quiz: quizId,
      answers: req.body.answers,
    };
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $push: { submissions: quizSubmission } },
      { new: true }
    );
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.status(201).send(quizSubmission);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all quiz submissions for a specific quiz
exports.getQuizSubmissionsByQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId).populate('submissions.student');
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    const quizSubmissions = quiz.submissions;
    res.send(quizSubmissions);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get quiz submissions by student ID
exports.getQuizSubmissionsByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const quizSubmissions = await Quiz.find({ 'submissions.student': studentId });
    res.send(quizSubmissions);
  } catch (error) {
    res.status(500).send(error);
  }
};