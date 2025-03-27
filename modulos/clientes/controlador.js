const db = require('../../DB/mysql');

const TABLA = 'clientes';

function listar() {
    return db.todos('clientes');
}

function listarUno(id) {
    return db.uno('CLientes', id);
}

module.exports = {
    listar,
    listarUno,
};