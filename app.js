const express = require('express');
const config = require('./config');
const morgan = require('morgan');

const clientes = require('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const errores = require('./red/errores');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuración del puerto
app.set('port', config.app.port);

//rutas
app.use('/api/clientes', clientes);  
app.use('/api/usuarios', usuarios);  
app.use(errores);  

module.exports = app;