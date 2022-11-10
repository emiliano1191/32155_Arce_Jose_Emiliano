const Server = require('./services/server');

const PORT = 8080;

Server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});