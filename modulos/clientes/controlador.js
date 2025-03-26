const db = require('../../DB/mysql');

const TABLA = 'clientes';

function listar() {
    return db.todos('clientes');
}

module.exports = {
    listar,
};