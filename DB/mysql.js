const mysql = require('mysql');
const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let conexion;

function handleCon() {
    conexion = mysql.createConnection(dbconf);

    conexion.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 200);
        } else {
            console.log('DB conectada');
        }
    });

    conexion.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    });
}

handleCon();

function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (err, data) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(data);
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id], (err, data) => {
            if (err) return reject(err);
            resolve(data[0]);
        });
    });
}

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, [data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    query
};