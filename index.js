
//IMPORTS

const express = require("express");
const cors = require("cors");
const { HOST, DB } = require("./config/db");
const mongoose = require('mongoose');
bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routes/user.js');
const attendanceRouter = require('./routes/attendance.js');
const eventRouter = require('./routes/event.js');
const feeRouter = require('./routes/fee.js');
const examRouter = require('./routes/exam.js');
const classRouter = require('./routes/class.js');
const quizRouter = require('./routes/quiz.js');
const questionRouter = require('./routes/question.js');
const subjectRouter = require('./routes/subject.js');
const timetableRouter = require('./routes/timetable.js');



var corsOptions = {
  origin: "http://localhost:8005"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//DATABASE CALL

mongoose
  .connect(`${HOST}`, {
    dbName: `${DB}`,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");


  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


//ROUTES BELOW

// initial route
app.get("/", (req, res) => {
  res.json({ message: "School space backend initial ..." });
});

app.use(userRouter);
app.use(attendanceRouter);
app.use(eventRouter);
app.use(feeRouter);
app.use(examRouter);
app.use(classRouter);
app.use(quizRouter);
app.use(questionRouter);
app.use(subjectRouter);
app.use(timetableRouter);