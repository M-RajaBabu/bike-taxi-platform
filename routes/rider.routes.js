const express = require('express');
const router = express.Router();
const riderController = require('../controllers/rider.controller');
// const { authenticateRider } = require('../middleware/auth');
// const { validateRiderStatus, validateRideAction } = require('../middleware/validation');

router.get('/profile', /*authenticateRider,*/ riderController.getProfile);
router.put('/status', /*authenticateRider, validateRiderStatus,*/ riderController.updateStatus);
router.get('/nearby-rides', /*authenticateRider,*/ riderController.getNearbyRides);
router.post('/rides/:rideId/accept', /*authenticateRider, validateRideAction,*/ riderController.acceptRide);
router.post('/rides/:rideId/start', /*authenticateRider, validateRideAction,*/ riderController.startRide);
router.post('/rides/:rideId/complete', /*authenticateRider, validateRideAction,*/ riderController.completeRide);
router.get('/earnings', /*authenticateRider,*/ riderController.getEarnings);

module.exports = router; 