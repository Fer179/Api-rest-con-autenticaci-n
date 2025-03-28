const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

router.get('/login', async function(req, res, next) {
    try {
        const token = await controlador.login(req.body.usuario, req.body.contraseña);
        respuesta.success(req, res, token, 200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;