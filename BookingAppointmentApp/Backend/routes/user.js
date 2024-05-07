const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/user/get-users', userController.getUsers)

router.post('/user/add-user', userController.addUsers);

router.delete('/user/delete-user/:id', userController.deleteUser);

router.put('/user/edit-user/:id', userController.addUsers)

module.exports = router;
