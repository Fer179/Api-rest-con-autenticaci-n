const TABLA = 'usuarios';

module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }

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

    return {
        listar,
        listarUno,
        eliminar,
        agregar
    };
};