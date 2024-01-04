const express = require('express');
const path = require('path')
const router = express.Router();
const { User, Account } = require('../../../database/models/User.js'); 

// Ruta para obtener datos del usuario
router.get('/api/user', async (req, res) => {
  try {
    // Obtener el usuario actual basado en la sesión o la autenticación
    const user = await User.findByPk(req.user.id); 
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Enviar datos del usuario como respuesta
    res.json({
      name: user.name,
      lastname: user.lastname,
      balance: user.account ? user.account.balance : 0,
    });
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para consultar el saldo del usuario
router.get('/balance', async (req, res) => {
  try {
    // Obtener el usuario actual basado en la sesión o la autenticación
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Account, as: 'account' }], // Incluir la relación con la cuenta
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Enviar el saldo como respuesta
    res.json({
      balance: user.account ? user.account.balance : 0, // Verificar si hay una cuenta asociada
    });
  } catch (error) {
    console.error('Error al consultar el saldo del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/api/user/transfer', async (req, res) => {
  try {
    // Obtener datos del formulario de la solicitud
    const { recipientEmail, amount } = req.body;

    // Obtener el usuario actual y su cuenta
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Account, as: 'account' }],
    });

    if (!user || !user.account) {
      return res.status(404).json({ error: 'Usuario o cuenta no encontrados' });
    }

    // Validar si hay suficientes fondos para la transferencia
    if (user.account.balance < amount) {
      return res.status(400).json({ error: 'Saldo insuficiente para la transferencia' });
    }

    // Realizar la transferencia (actualizar saldos, registrar movimiento, etc.)

    // Enviar una respuesta exitosa
    res.json({ message: 'Transferencia exitosa' });
  } catch (error) {
    console.error('Error al procesar la transferencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = router;