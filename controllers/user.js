const {User} = require("../models/user");
const {Teacher} = require("../models/user");
const {Student} = require("../models/user");
const {Parent} = require("../models/user");
const {Admin} = require("../models/user");

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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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

module.exports = {
  getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
  };