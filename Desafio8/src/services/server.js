const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const moment = require('moment');

const { optionsMySql } = require('../../options/mariaDB');
const ProductsSql = require('../controller/productos')

const { optionsSqlite3 } = require('../../options/sqlite');
const ChatSql = require('../controller/chat')

const viewsFolderPath = path.resolve(__dirname, '../../views');
const myHTTPServer = http.createServer(app);
const io = socketio(myHTTPServer)

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', viewsFolderPath);
app.set('view engine', 'pug');

app.get('/', (req, res) => {

    res.render('index');
});

// INSTANCIO CLASE PRODUCTOS
const prodSql = new ProductsSql(optionsMySql, 'products')

// INSTANCIO CLASE CHAT  
const chatSql = new ChatSql(optionsSqlite3, 'chat')

const formatMensaje = (username, text) => {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

// CONNECTION

io.on('connection', async (socket) => {

    // CREO TABLA PARA GUARDAR PRODUCTOS

    await prodSql.createTable();

    // CREO TABLA PARA GUARDAR MENSAJES

    await chatSql.createTable();

    // CARGA DE PRODUCTOS POR FORM

    socket.on('cargaProduct', async (data) => {

        try {

            await prodSql.save(data);
            productsData = await prodSql.getAll();
            io.emit('productsData', productsData);

        } catch {
            (err) => { next(err) }
        }
    });

    // BIENVENIDA AL CHAT

    socket.emit('mensaje', formatMensaje('Chat Bot', `!Bienvenido al chat!`));

    // AVISO A OTROS USUARIOS - NUEVO USUARIO EN EL CHAT

    socket.broadcast.emit('mensaje', formatMensaje('Chat Bot', `Se unio un nuevo usuario al chat`));

    // MENSAJES ENTRE TODO EL CHAT

    socket.on('chatMensaje', async (userMsj) => {

        const newMensaje = formatMensaje(userMsj.email || 'Usuario anonimo', userMsj.msg);
        await chatSql.save(newMensaje);

        io.emit('mensaje', newMensaje);

    });

    // AVISO DE DESCONECCION

    socket.on('disconnect', () => {
        socket.broadcast.emit('mensaje', formatMensaje('Chat Bot', 'Un usuario abandono el chat'));
    });
});

// MIDLEWARE DE ERRORES

app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || 500;

    res.status(status).json({ message });
})

module.exports = myHTTPServer;
