const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { ProductosController } = require('../controller/productos')
const viewsFolderPath = path.resolve(__dirname, '../../views');
const myHTTPServer = http.createServer(app);
const io = socketio(myHTTPServer)

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', viewsFolderPath);
app.set('view engine', 'pug');

app.get('/', (req, res) => {

    // const productos = ProductosController.getAll();

    // res.render('index', { productos });
    res.render('index');
});

const formatMensaje = (username, text) => {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

io.on('connection', (socket) => {

    socket.on('cargaProduct', (data) => {

        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: uuidv4(),
            url: data.url
        }

        ProductosController.save(nuevoProducto);

        productsData = ProductosController.getAll();
        io.emit('productsData', productsData);
    });

    socket.emit('mensaje', formatMensaje('Chat Bot', `!Bienvenido al chat!`));

    socket.broadcast.emit('mensaje', formatMensaje('Chat Bot', `Se unio un nuevo usuario al chat`));

    socket.on('chatMensaje', (userMsj) => {

        io.emit('mensaje', formatMensaje(userMsj.email || 'Usuario anonimo', userMsj.msg));

    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('mensaje', formatMensaje('Chat Bot', 'Un usuario abandono el chat'));
    });
});

app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || 500;

    res.status(status).json({ message });
})

module.exports = myHTTPServer;
