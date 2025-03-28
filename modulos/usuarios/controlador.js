const autentificacion = require('../autentificacion');

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
    
    async function agregar(body) {
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo,
        };

        const respuesta = await db.agregar(TABLA, usuario);
        console.log('Respuesta: ', respuesta);
        

        var insertId = 0;
        if (body.id == 0) {
            insertId = respuesta.insertId;
        } else {
            insertId = body.id;
        }

        let respuesta2 = '';
        if (body.usuario || body.contraseña) {
            respuesta2 = await autentificacion.agregar({
                id: insertId,
                usuario: body.usuario,
                contraseña: body.contraseña
            });
        }
            

        return respuesta2;
    }

    return {
        listar,
        listarUno,
        eliminar,
        agregar
    };
};