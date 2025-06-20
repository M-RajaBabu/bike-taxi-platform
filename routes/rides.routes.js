const express = require('express');
const router = express.Router();
const ridesController = require('../controllers/rides.controller');
// const { authenticateUser } = require('../middleware/auth');
// const { validateRideBooking, validateRideId } = require('../middleware/validation');

// Estimate fare and find nearest rider
router.post('/estimate', /*authenticateUser,*/ ridesController.estimateRide);
router.post('/book', /*authenticateUser, validateRideBooking,*/ ridesController.bookRide);
router.get('/current', /*authenticateUser,*/ ridesController.getCurrentRide);
router.get('/history', /*authenticateUser,*/ ridesController.getRideHistory);
router.post('/:id/cancel', /*authenticateUser, validateRideId,*/ ridesController.cancelRide);
router.post('/:id/sos', /*authenticateUser, validateRideId,*/ ridesController.triggerSOS);

module.exports = router; 