const express = require('express');
const {
  fetchVehicles,
  fetchVehicleByNumber,
  addVehicle,
  editVehicle,
  removeVehicle,
  fetchAnalytics
} = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/analytics/summary', authMiddleware, fetchAnalytics);
router.get('/', authMiddleware, fetchVehicles);
router.get('/:number', fetchVehicleByNumber);
router.post('/', authMiddleware, addVehicle);
router.put('/:id', authMiddleware, editVehicle);
router.delete('/:id', authMiddleware, removeVehicle);

module.exports = router;
