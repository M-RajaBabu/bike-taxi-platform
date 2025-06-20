const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {
  validateUserRegistration,
  validateRiderRegistration,
  validateOTPVerification,
  handleValidationErrors
} = require('../middleware/validation');

// User: Send OTP for registration
router.post('/user/send-otp', validateUserRegistration, authController.generateUserOTP);
// User: Verify OTP and register
router.post('/user/verify-otp', [
  ...validateUserRegistration,
  validateOTPVerification
], authController.verifyUserOTP);
// User: Login
router.post('/user/login', [
  require('express-validator').body('phone').isMobilePhone('any').withMessage('Valid phone number is required'),
  handleValidationErrors
], authController.userLogin);

// Rider: Send OTP for registration
router.post('/rider/send-otp', validateRiderRegistration, authController.generateRiderOTP);
// Rider: Verify OTP and register
router.post('/rider/verify-otp', [
  ...validateRiderRegistration,
  validateOTPVerification
], authController.verifyRiderOTP);
// Rider: Login
router.post('/rider/login', [
  require('express-validator').body('phone').isMobilePhone('any').withMessage('Valid phone number is required'),
  handleValidationErrors
], authController.riderLogin);

// Refresh token
router.post('/refresh', authController.refreshToken);

module.exports = router; 