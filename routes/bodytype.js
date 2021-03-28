const express = require('express');
const router = express.Router();

const bodytypeController = require('../controllers/bodytype');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, bodytypeController.getAllBodytype);

router.get('/:id', isAuth, bodytypeController.getBodytype);

router.post('/:id', isAuth, bodytypeController.postBodytype);

router.put('/:id', isAuth, bodytypeController.putBodytype);

router.delete('/:id', isAuth, bodytypeController.deleteBodytype);

module.exports = router;