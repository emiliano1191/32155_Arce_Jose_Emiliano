const express = require('express');
const {ProductosController} = require('../controller/productos');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', (req, res) => {

  const productos = ProductosController.getAll();

  res.render('tabla', { productos });
  console.log(productos)

})

router.post('/', (req, res) => {
    
  const data = req.body;

  const nuevoProducto = {
    title: data.title,
    price: data.price,
    id: uuidv4(),
    url: data.url
}

  ProductosController.save(nuevoProducto);

  res.redirect('/')
});

module.exports = router