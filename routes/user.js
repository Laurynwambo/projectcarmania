const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, userController.getAllUsers);

router.get('/:id', isAuth, userController.getUser);

router.post('/:id', isAuth, userController.postUser);

router.put('/:id', isAuth, userController.putUser);

router.delete('/:id', isAuth, userController.deleteUser);

module.exports = router;
