const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// const { authenticateUser } = require('../middleware/auth');
// const { validateUserProfile, validateLocation, validateSOSContact } = require('../middleware/validation');

router.get('/profile', /*authenticateUser,*/ userController.getProfile);
router.put('/profile', /*authenticateUser, validateUserProfile,*/ userController.updateProfile);
router.post('/locations', /*authenticateUser, validateLocation,*/ userController.addLocation);
router.get('/locations', /*authenticateUser,*/ userController.getLocations);
router.post('/sos-contacts', /*authenticateUser, validateSOSContact,*/ userController.addSOSContact);
router.get('/sos-contacts', /*authenticateUser,*/ userController.getSOSContacts);

module.exports = router; 