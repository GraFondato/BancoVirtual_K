const express = require('express')
const path = require('path');

let router = express.Router();
const controller = require('../controllers/usersController');

const validationRegister = require('../middlewares/validationRegister');
const validationLogin = require('../middlewares/validationLogin');
const uploadFile = require('../middlewares/multerUsers')

// Configura la ruta "/register"
router.get('/register', controller.register);
router.post("/register", uploadFile.single('foto'), validationRegister, controller.processRegister);
router.get("/login", controller.login);
router.post("/login", validationLogin, controller.loginProcess);

module.exports = router
