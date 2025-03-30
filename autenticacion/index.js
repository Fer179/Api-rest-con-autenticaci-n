const jwt = require('jsonwebtoken');
const config = require('../config');
const Error = require('../middleware/error');

const secret = config.jwt.secret;

function asignToken(data){ 
    return jwt.sign(data, secret);
}

function verificarToken(token) {
    return jwt.verify(token, secret);

}

const chequearToken = {
    confirmarToken: function (req, id) {
        const decodificado = decodificarCabecera(req);

        if (decodificado.id !== id) {
            throw Error('No tienes privilegios para acceder a este recurso', 401);
        }
    }
}

function obtenerToken (autorizacion) {
    if(!autorizacion) {
        throw Error('No hay token en la cabecera', 401);
    }

    if (autorizacion.indexOf('Bearer') === -1) {
        throw Error('El token no tiene el formato correcto', 401);
    }

    let token = autorizacion.replace('Bearer ', '');
    return token;
}

function decodificarCabecera (req) {
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;

    return decodificado;
}

module.exports = {
    asignToken,
    chequearToken
};