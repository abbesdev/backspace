const {User} = require("../models/user");
const {Teacher} = require("../models/user");
const {Student} = require("../models/user");
const {Parent} = require("../models/user");
const {Admin} = require("../models/user");
const nodemailer = require("nodemailer");
const Class = require("../models/class");
const createUser = async (req, res) => {
  try {
    let user;

    switch (req.body.userRole) {
      case "teacher":
        user = new Teacher(req.body);
        break;
      case "student":
        user = new Student(req.body);
        break;
      case "parent":
        user = new Parent(req.body);
        break;
      case "admin":
        user = new Admin(req.body);
        break;
      default:
        user = new User(req.body);
        break;
    }
// Generate 4-digit random code
const otpCode = Math.floor(1000 + Math.random() * 9000);
user.otp = otpCode.toString();

      const transporter = nodemailer.createTransport({

       
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey',
          pass: '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'
        }
      });
    
      const mailOptions = {
        from: 'tmail1471@gmail.com',
        to: user.email,
        subject: 'Reset Your Password',
        html: `This is your verification code :
        <br/><br/>
        ${otpCode.toString()}`
      };
    
      await transporter.sendMail(mailOptions);
      
    
    const dataSave = await user.save();
    res.status(201).send(dataSave);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send();
    }
    res.send(users);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const users = await Student.find();
    if (!users) {
      return res.status(404).send();
    }
    res.send(users);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,
      req.body , // set verified attribute to true
     { new: true } )// return the updated document);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateStudent = async (req, res) => {
  try {
    const user = await Student.findByIdAndUpdate(req.params.id,
      req.body , // set verified attribute to true
     { new: true } )// return the updated document);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateTeacher = async (req, res) => {
  try {
    const user = await Teacher.findByIdAndUpdate(req.params.id,
      req.body , // set verified attribute to true
     { new: true } )// return the updated document);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateParent = async (req, res) => {
  try {
    const user = await Parent.findByIdAndUpdate(req.params.id,
      req.body , // set verified attribute to true
     { new: true } )// return the updated document);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateUserverfication = async (req, res) => {
  try {
    const userId = req.params.id; // get user id from request params

    const updatedUser = await User.findByIdAndUpdate(
      userId,
       req.body , // set verified attribute to true
      { new: true } // return the updated document
    );

    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    const id = student.class;
    const foundClass = await Class.findById(id);
    // return user name and class only
    const user = {
      name: student.firstName + " " + student.lastName,
      classname: foundClass.name,
      profilePhoto: student.profilePhoto
    }

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }
  catch (err) {
  }
}
const getUsersNumbers = async (req, res) => {
  try {
    const userCount = await User.count();
    const parentCount = await User.count({ userRole: 'parent' });
    const studentCount = await User.count({ userRole: 'student' });
    const teacherCount = await User.count({ userRole: 'teacher' });
    
    const counts = [userCount, studentCount,parentCount,  teacherCount];
    res.status(200).send({ counts });
  } catch (err) {
    res.status(500).send(err);
  }
}


module.exports = {
  getUsersNumbers,
  getStudentById,
  getAllUsers,
  getAllStudents,
  updateStudent,
  updateTeacher,
  updateParent,
  updateUserverfication,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    login
  };