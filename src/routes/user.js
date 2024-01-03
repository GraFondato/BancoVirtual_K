const express = require('express')
const path = require('path');

let router = express.Router();
const controller = require('../controllers/usersController');

// Configura la ruta "/register"
router.get('/register', controller.register);

module.exports = router
