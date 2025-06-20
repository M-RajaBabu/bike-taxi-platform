const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/tracking.controller');
// const { authenticateRider, authenticateUser } = require('../middleware/auth');
// const { validateTrackingUpdate } = require('../middleware/validation');

router.post('/update', /*authenticateRider, validateTrackingUpdate,*/ trackingController.updateTracking);
router.get('/:rideId', /*authenticateUser,*/ trackingController.getTracking);

module.exports = router; 