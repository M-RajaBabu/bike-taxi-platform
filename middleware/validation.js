const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

/**
 * Validation rules for user registration
 */
const validateUserRegistration = [
  body('phone')
    .isMobilePhone('any')
    .withMessage('Valid phone number is required'),
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required'),
  handleValidationErrors
];

/**
 * Validation rules for rider registration
 */
const validateRiderRegistration = [
  body('phone')
    .isMobilePhone('any')
    .withMessage('Valid phone number is required'),
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required'),
  body('vehicle_number')
    .isLength({ min: 5, max: 20 })
    .withMessage('Vehicle number must be between 5 and 20 characters'),
  body('vehicle_model')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Vehicle model must be between 2 and 100 characters'),
  body('vehicle_color')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Vehicle color must be between 2 and 50 characters'),
  handleValidationErrors
];

/**
 * Validation rules for OTP verification
 */
const validateOTPVerification = [
  body('phone')
    .isMobilePhone('any')
    .withMessage('Valid phone number is required'),
  body('otp')
    .isLength({ min: 4, max: 8 })
    .isNumeric()
    .withMessage('OTP must be 4-8 digits'),
  handleValidationErrors
];

/**
 * Validation rules for ride request
 */
const validateRideRequest = [
  body('pickup_latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid pickup latitude is required'),
  body('pickup_longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid pickup longitude is required'),
  body('pickup_address')
    .isLength({ min: 5, max: 500 })
    .withMessage('Pickup address must be between 5 and 500 characters'),
  body('drop_latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid drop latitude is required'),
  body('drop_longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid drop longitude is required'),
  body('drop_address')
    .isLength({ min: 5, max: 500 })
    .withMessage('Drop address must be between 5 and 500 characters'),
  handleValidationErrors
];

/**
 * Validation rules for location updates
 */
const validateLocationUpdate = [
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid latitude is required'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid longitude is required'),
  handleValidationErrors
];

/**
 * Validation rules for rating
 */
const validateRating = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Comment must not exceed 500 characters'),
  handleValidationErrors
];

/**
 * Validation rules for payment method
 */
const validatePaymentMethod = [
  body('payment_type')
    .isIn(['card', 'upi', 'wallet', 'cash'])
    .withMessage('Valid payment type is required'),
  body('payment_details')
    .optional()
    .isJSON()
    .withMessage('Payment details must be valid JSON'),
  handleValidationErrors
];

/**
 * Validation rules for promo code
 */
const validatePromoCode = [
  body('code')
    .isLength({ min: 3, max: 20 })
    .withMessage('Promo code must be between 3 and 20 characters'),
  handleValidationErrors
];

/**
 * Validation rules for ID parameters
 */
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid ID is required'),
  handleValidationErrors
];

/**
 * Validation rules for pagination
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateRiderRegistration,
  validateOTPVerification,
  validateRideRequest,
  validateLocationUpdate,
  validateRating,
  validatePaymentMethod,
  validatePromoCode,
  validateId,
  validatePagination
}; 