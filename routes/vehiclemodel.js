const express = require('express');
const router = express.Router();

const vehiclemodelController = require('../controllers/vehiclemodel');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, vehiclemodelController.getAllVehiclemodels);

router.get('/:id', isAuth, vehiclemodelController.getVehiclemodel);

router.post('/:id', isAuth, vehiclemodelController.postVehiclemodel);

router.put('/:id', isAuth, vehiclemodelController.putVehiclemodel);

router.delete('/:id', isAuth, vehiclemodelController.deleteVehiclemodel);

module.exports = router;