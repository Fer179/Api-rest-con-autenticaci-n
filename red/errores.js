const respuesta = require('./respuestas');

function manejarErrores(errores, req, res, next) {
    console.error('[error]', errores);

    const message = errores.message || 'Error interno';
    const status = errores.statusCode || 500;

    respuesta.error(req, res, message, status);
}

module.exports = manejarErrores;