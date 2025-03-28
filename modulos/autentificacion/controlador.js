const TABLA = 'autentificacion';
const bcrypt = require('bcrypt');
const auth = require('../../autenticacion');

module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }

    async function login (usuario, contraseña) {
        const data = await  db.query(TABLA, { usuario: usuario });

        return bcrypt.compare(contraseña, data.contraseña)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // Generar token
                    return auth.asignToken({ ...data });
                } else {
                    throw new Error('Información inválida');
                }
            });
    }
    
    async function agregar(body) {
        const autentificacion = {
            id: body.id,
        };

        if (body.usuario) {
            autentificacion.usuario = body.usuario;
        }   

        if(body.contraseña) {
            autentificacion.contraseña = await bcrypt.hash(body.contraseña.toString(), 5);
        }

        return db.agregar(TABLA, autentificacion);
    }

    return {
        agregar,
        login
    };
};