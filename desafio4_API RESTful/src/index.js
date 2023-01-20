const Sever = require('./services/server.js')

const puerto = 8080;
Sever.listen(puerto, () => {
	console.log(`Servidor Escuchando en el puerto ${puerto}`);
});

