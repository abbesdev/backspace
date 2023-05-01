const express = require('express');
const router = express.Router();
const feeController = require('../controllers/fee.js')

router.get('/fee', feeController.getFees);
router.post('/fee', feeController.createFee);
router.get('/fee/:studentId', feeController.getFeesByStudent);
router.put('/fee/:id', feeController.updateFee);
router.delete('/fee/:id', feeController.deleteFee);


module.exports = router;
