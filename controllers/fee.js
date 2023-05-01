const Fees = require('../models/fee');

// CREATE - Create a new fee record
exports.createFee = async (req, res) => {
  try {
    const fee = new Fees(req.body);
    await fee.save();
    res.status(201).send(fee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ - Get all fee records
exports.getFees = async (req, res) => {
  try {
    const fees = await Fees.find({});
    res.send(fees);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ - Get fee records for a specific student
exports.getFeesByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const fees = await Fees.find({ student: studentId });
    res.send(fees);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE - Update an existing fee record
exports.updateFee = async (req, res) => {
  try {
    const feeId = req.params.id;
    const fee = await Fees.findByIdAndUpdate(feeId, req.body, { new: true });
    if (!fee) {
      return res.status(404).send('Fee record not found');
    }
    res.send(fee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE - Delete a fee record
exports.deleteFee = async (req, res) => {
  try {
    const feeId = req.params.id;
    const fee = await Fees.findByIdAndDelete(feeId);
    if (!fee) {
      return res.status(404).send('Fee record not found');
    }
    res.send(fee);
  } catch (error) {
    res.status(500).send(error);
  }
};
