const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas');

router.get('/', (req, res) => {
    respuesta.success(req, res, 'jala bien', 200);
});

module.exports = router;