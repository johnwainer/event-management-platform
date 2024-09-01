const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendeeController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/attendance-report', authenticateToken, attendanceController.getAttendanceReport);

module.exports = router;