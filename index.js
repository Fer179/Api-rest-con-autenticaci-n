const app = require('./app.js');

app.listen(app.get('port'), () => {
    console.log(`Server escuchando en el puerto ${app.get('port')}`);
});

