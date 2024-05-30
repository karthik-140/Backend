const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.get('/users', userControllers.getUsers);

router.post('/add-users', userControllers.addUsers);

router.delete('/users/:id', userControllers.deleteUser);

module.exports = router;
