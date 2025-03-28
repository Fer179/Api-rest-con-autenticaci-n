const db = require('../../DB/mysql');

const TABLA = 'clientes';

function listar() {
    return db.todos(TABLA);
}

function listarUno(id) {
    return db.uno(TABLA, id);
}

function eliminar(body) {
    return db.eliminar(TABLA, body);
}

function agregar(body) {
    return db.agregar(TABLA, body);
}

module.exports = {
    listar,
    listarUno,
    eliminar,
    agregar
};