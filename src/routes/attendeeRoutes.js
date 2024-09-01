const express = require('express');
const router = express.Router();
const attendeeController = require('../controllers/attendeeController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, attendeeController.getAllAttendees);
router.post('/',authenticateToken, attendeeController.addAttendee);

module.exports = router;
