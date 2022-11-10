const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');

class ProductosApi {
    constructor() {
        this.productos = []
    }

    exist(id) {

        const indice = this.productos.findIndex(productId => productId.id == id);

        return indice >= 0;
    }

    getAll() {
        return this.productos;
    }

    save(data) {

        if (!data.title || !data.price || !data.url) throw createError(400, 'Datos invalidos');

        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: uuidv4(),
            url: data.url
        }

        this.productos.push(nuevoProducto);

        return nuevoProducto;
    }

};

const instanciaProductosApi = new ProductosApi();

module.exports = {
    ProductosController: instanciaProductosApi
}
