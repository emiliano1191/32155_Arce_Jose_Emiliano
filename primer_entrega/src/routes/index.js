const { Router } = require('express');
const productosRouter = require('./productos');
const cartRouter = require('./cart');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'ok router'
    })
});

router.use('/productos', productosRouter);
router.use('/carrito', cartRouter);

module.exports = router;