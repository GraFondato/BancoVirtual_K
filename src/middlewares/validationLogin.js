const { body } = require('express-validator')
const path = require('path');
const fs = require('fs');
const { hashSync } = require('bcryptjs');
const db = require('../../database/models')


const validateLogin = [
    body("email")
        .notEmpty().withMessage("Debes ingresar un email")
        .isEmail().withMessage('Debes ingresar un formato valido')
        .bail()
        .custom(async (value) => {
            // Verifica si el email existe en la base de datos
            const user = await db.User.findOne({ where: { email: value } });
            if (!user) {
                throw new Error('El email no está registrado');
            }
            return true;
        }),
    body("password").notEmpty().withMessage("Debes ingresar la contraseña")
        .custom(async (value, { req }) => {
        
        if (!userToLogin) {
            // Tratar el caso en que no se haya encontrado el usuario
            throw new Error("Error al encontrar el usuario");
        }

        const passwordOk = await bcryptjs.compare(value, userToLogin.password);

        if (!passwordOk) {
            throw new Error("Las credenciales son inválidas");
        }

        return true;
    }),
    body('sesion').notEmpty().withMessage('Debes mantener iniciada la sesion')
]

module.exports = validateLogin;