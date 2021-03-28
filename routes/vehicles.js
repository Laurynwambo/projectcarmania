const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicles");
const isAuth = require("../middleware/is-auth");

router.get('/',isAuth, vehicleController.getAllVehicles);

router.get('/:id', isAuth, vehicleController.getVehicle);

router.post('/:id', isAuth, vehicleController.postVehicle);

router.put('/:id', isAuth, vehicleController.putVehicle);

router.delete('/:id', isAuth, vehicleController.deleteVehicle);

module.exports = router;