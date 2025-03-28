const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

//rutas
router.get('/', todos);
router.get('/:id', uno);
router.put('/', eliminar);
router.post('/', agregar);

//funciones que van a ejecutar las rutas
async function todos(req, res, next) {
    try {
        const clientes = await controlador.listar();
        respuesta.success(req, res, clientes, 200);
    } catch (error) {
        next(error);
    }
}

async function uno(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const cliente = await controlador.listarUno(id);
        respuesta.success(req, res, cliente, 200);
    } catch (error) {
        next(error);
    }
}

async function eliminar(req, res, next) {
    try {
        const cliente = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Usuario eliminado correctamente', 200);
    } catch (error) {
        next(error);
    }
}

async function agregar(req, res, next) {
    try {
        const cliente = await controlador.agregar(req.body);
        if (req.body.id == 0) {
            mensaje = 'Usuario agregado correctamente';
        } else {
            mensaje = 'Usuario actualizado correctamente';
        }
        respuesta.success(req, res, mensaje, 201);
    } catch (error) {
        next(error);
    }
}

module.exports = router;