const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
// const { authenticateUser } = require('../middleware/auth');
// const { validatePaymentMethod, validatePaymentProcess } = require('../middleware/validation');

router.post('/methods', /*authenticateUser, validatePaymentMethod,*/ paymentController.addMethod);
router.get('/methods', /*authenticateUser,*/ paymentController.getMethods);
router.post('/process', /*authenticateUser, validatePaymentProcess,*/ paymentController.processPayment);

module.exports = router; 