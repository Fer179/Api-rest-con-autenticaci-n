const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

router.get('/', (req, res) => {
    const todos = controlador.listar().then((clientes) => {
        respuesta.success(req, res, clientes, 200);
    }).catch((error) => {
        respuesta.error(req, res, error, 500);
    });
});

module.exports = router;