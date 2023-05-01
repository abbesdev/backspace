const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.js')

router.get('/event', eventController.getEvents);
router.post('/event', eventController.createEvent);
router.get('/event/:id', eventController.getEventById);
router.put('/event/:id', eventController.updateEvent);
router.delete('/event/:id', eventController.deleteEvent);


module.exports = router;
