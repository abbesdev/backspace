const Class = require('../models/class');

// CREATE - Create a new class
exports.createClass = async (req, res) => {
  try {
    const { name, grade, section, teachers } = req.body;
    const newClass = new Class({ name, grade, section, teachers });
    await newClass.save();
    res.status(201).send(newClass);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.send(classes);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getClassesByT = async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const classes = await Class.find({ teachers: teacherId });
    res.send(classes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get a specific class by ID
exports.getClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const foundClass = await Class.findById(classId);
    if (!foundClass) {
      return res.status(404).send('Class not found');
    }
    res.send(foundClass);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE - Update an existing class
exports.updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { name, grade, section, teachers } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { name, grade, section, teachers },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).send('Class not found');
    }
    res.send(updatedClass);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE - Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      return res.status(404).send('Class not found');
    }
    res.send(deletedClass);
  } catch (error) {
    res.status(500).send(error);
  }
};
