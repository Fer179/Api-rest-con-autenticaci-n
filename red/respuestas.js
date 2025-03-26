exports.success = function(req, res, mensaje, status) {
    const statusCode = status || 200;
    const msg = mensaje || '';
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: msg
    });
};

exports.error = function(req, res, mensaje, status) {
    const statusCode = status || 500;
    const msg = mensaje || 'Error en el servidor';
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: msg
    });
};
