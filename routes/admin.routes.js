const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
// const { authenticateAdmin } = require('../middleware/auth');
// const { validateRiderId } = require('../middleware/validation');

router.get('/riders/pending', /*authenticateAdmin,*/ adminController.getPendingRiders);
router.put('/riders/:riderId/verify', /*authenticateAdmin, validateRiderId,*/ adminController.verifyRider);
router.get('/analytics/rides', /*authenticateAdmin,*/ adminController.getRideAnalytics);
router.get('/dashboard', /*authenticateAdmin,*/ adminController.getDashboard);

module.exports = router; 