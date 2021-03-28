const express = require('express');
const router = express.Router();

const vehiclemakeController = require('../controllers/vehiclemake');
const isAuth = require('../middleware/is-auth');



router.get('/', isAuth, vehiclemakeController.getAllVehiclemake); // http://localhost:8081/vehiclemake/

router.get('/:id', isAuth, vehiclemakeController.getVehiclemake); // http://localhost:8081/vehiclemake/cars

router.post('/', isAuth, vehiclemakeController.postVehiclemake); // http://localhost:8081/vehiclemake

router.put('/:id', isAuth, vehiclemakeController.putVehiclemake);

router.delete('/:id', isAuth, vehiclemakeController.deleteVehiclemake);

module.exports = router;

// REST API Principles