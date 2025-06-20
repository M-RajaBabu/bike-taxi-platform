const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');
// const { authenticateUser } = require('../middleware/auth');
// const { validateRating } = require('../middleware/validation');

router.post('/ride', /*authenticateUser, validateRating,*/ ratingController.rateRide);
router.get('/', /*authenticateUser,*/ ratingController.getRatings);

module.exports = router; 