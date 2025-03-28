function error (message, code) {
    let e = new Error(message);
    if (code) {
        e.statusCode = code;
    }
    return e;
}

module.exports = error;
// Compare this snippet from middleware/error.js: