const Server = require('./services/server');

const PORT = 3000;

Server.listen(PORT, () => {
    console.log('Server escuchando en el puerto', PORT);
});