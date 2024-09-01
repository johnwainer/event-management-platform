const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, eventController.getAllEvents);
router.post('/', authenticateToken, eventController.addEvent);
router.get('/:id', authenticateToken, eventController.getEventById);
router.put('/:id', authenticateToken, eventController.updateEvent);
router.delete('/:id', authenticateToken, eventController.deleteEvent);

router.get('/:id/nearby', authenticateToken, eventController.getNearbyLocations);
module.exports = router;