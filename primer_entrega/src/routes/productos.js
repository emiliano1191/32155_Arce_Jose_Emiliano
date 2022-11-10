const { Router } = require('express');
const { ProductosController } = require('../controller/productos')

const router = Router();

const admin = true;

const validateAdmin = (req, res, next) => {

    if(!admin){
        return res.status(401).json({
            msg:"no estas autorizado capo"
        })
    }

    next();
}

router.get('/', (req, res) => {
    res.json({
        msg: ProductosController.getAll()
    })
});

router.get('/:id', (req, res) => {

    const id = req.params.id;

    const producto = ProductosController.getById(id);

    res.json({
        msg: producto
    })

});

router.post('/', validateAdmin, (req, res) => {

    const { body } = req;
    ProductosController.save(body);

    res.json({
        msg: body
    })
});

router.put('/:id', validateAdmin, (req, res) => {

    const id = req.params.id;
    const { body } = req;
    const data = ProductosController.update(id, body);
    res.json({
        msg: data
    })
});

router.delete('/:id', validateAdmin, (req, res) => {

    const id = req.params.id;
    ProductosController.deleteById(id);

    res.json({
        msg: 'Producto eliminado'
    })
});

module.exports = router;