const { Router } = require('express');
const { CartController } = require('../controller/cart')

const router = Router();

router.post('/', (req, res) => {

    cartId = CartController.createCart();

    res.json({
        msg: cartId
    })
});

router.delete('/:id', (req, res) => {

    const id = req.params.id;
    
    CartController.deleteCart(id);

    res.json({
        msg: `Cart eliminado`
    })
});

router.get('/:id/productos', (req, res) => {

    const id = req.params.id;

    res.json({
        msg: CartController.getCartById(id)
    });

});

router.post('/:id/productos', (req, res) => {

    const id = req.params.id;
    const { body } = req;
    
    CartController.agregarProducto(id, body);

    res.json({
        msg: `Agregue un producto al carrito`
    });

});

router.delete('/:id/productos/:id_prod', (req, res) => {

    // Elimino un producto con ID de carrito y de producto
    const idCart = req.params.id;
    const idProduct = req.params.id_prod;

    CartController.deleteProduct(idCart, idProduct);

    res.json({
        msg: `Elimine el producto con ID ${idProduct}`
    })
});


module.exports = router;