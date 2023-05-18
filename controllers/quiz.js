const Quiz = require('../models/quiz');
const Question = require('../models/question');

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

//GET ALL QUIZZES FOR A SPECIFIC TEACHER BY ID

exports.getQuizzesByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const quizzes = await Quiz.find({ createdBy: teacherId });
    res.send(quizzes);
  } catch (error) {
    throw error;
  }
}

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

    // find the quiz submission for the current student
    const submission = quiz.submissions.find(
      (s) => String(s.student) === studentId
    );

    // calculate the grade for the current submission
    let totalScore = 0;
    for (const answer of submission.answers) {
      const question = await Question.findById(answer.question._id);
      console.log(question.correctAnswer)
      const correctAnswer = question.correctAnswer;
      const score = answer.answer.toString() === correctAnswer.toString() ? 1 : 0;
      totalScore += score;
    }
    const percentageScore = await (totalScore / quiz.questions.length) * 100;
     submission.grade = percentageScore;

    // save the updated quiz object to the database
    await quiz.save();

    res.status(201).send(submission);
  } catch (error) {
    console.log(error);
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

// get all questions for a specific quiz
exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
   // const questions = quiz.questions;
    res.send(quiz.questions);

  }
  catch (error) {
    res.status(500).send(error); 
  }
};