const express = require('express');
const router = express.Router();

const pictureController = require('../controllers/picture');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, pictureController.getAllPictures);

router.get('/:id', isAuth, pictureController.getPicture);

router.post('/:id', isAuth, pictureController.postPicture);

router.put('/:id', isAuth, pictureController.putPicture);

router.delete('/:id', isAuth, pictureController.deletePicture);

module.exports = router;
