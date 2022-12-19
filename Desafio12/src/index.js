import Server from './services/server.js';

const PORT = 8080;

Server.listen(PORT, () => {
    console.log('Server escuchando en el puerto', PORT);
});