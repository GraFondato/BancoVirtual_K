const express = require('express')
const path = require('path');

let router = express.Router();
const controller = require('../controllers/usersController');

const validationRegister = require('../middlewares/validationRegister');
const validationLogin = require('../middlewares/validationLogin');
const authMiddleware= require('../middlewares/authMiddleware');

// Configura la ruta "/register"
router.get('/register', controller.register);
router.post("/register",validationRegister, controller.processRegister);
router.get("/login", controller.login);
router.post("/login", validationLogin, controller.loginProcess);
router.get("/profile", authMiddleware, controller.profile);

module.exports = router
