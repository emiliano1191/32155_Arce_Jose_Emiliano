const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('../routes/index');
const { ProductosController } = require('../controller/productos')
const viewsFolderPath = path.resolve(__dirname, '../../views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', viewsFolderPath);
app.set('view engine', 'pug');

app.get('/', (req, res) => {

    res.render('formulario');
    console.log(productos)

})

app.use('/api', mainRouter);

app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || 500;

    res.status(status).json({ message });
})

module.exports = app;
