const express = require('express');
const path = require('path');
const { body } = require('express-validator');
const db = require('../../database/models')

const validations = [
    body('name').notEmpty().withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastname').notEmpty().withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un email').bail()
        .isEmail().withMessage('Debes ingresar un formato válido')
        .custom(async (value, { req }) => {
            // Verifica si el email ya está registrado en la base de datos
            const existingUser = await db.User.findOne({where: { email: value }});
            console.log(value)
            if (existingUser) {
                throw new Error('Este email ya está registrado');
            }
             // Si el email no está registrado, la validación pasa
            return true;
        }),
    body('password').notEmpty()
        .withMessage('Tienes que escribir una contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'),
]

module.exports = validations