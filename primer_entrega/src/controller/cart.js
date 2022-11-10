const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const nombreArchivo = './src/controller/cart.json';

class CartApi {
    constructor(archivo) {

        this.archivo = archivo;

    }

    leerArchivo = (path) => {

        const dato = fs.readFileSync(path, `utf-8`);
        return JSON.parse(dato);

    }

    exist(id) {

        const cart = this.leerArchivo(nombreArchivo);
        const indice = cart.findIndex(cartId => cartId.id == id);
        return indice >= 0;
    }

    productExistCart(id, indiceCart) {

        const cart = this.leerArchivo(nombreArchivo);
        const indiceProd = cart[indiceCart].productos.findIndex(productId => productId.id == id);
        return indiceProd >= 0;
    }

    createCart = () => {

        const cart = this.leerArchivo(nombreArchivo);

        const nuevoCart = {
            id: uuidv4(),
            timestamp: new Date(),
            productos: []
        }

        cart.push(nuevoCart);
        fs.writeFileSync(nombreArchivo, JSON.stringify(cart, null, '\t'));

        return (nuevoCart.id);
    }

    deleteCart(id) {

        const cart = this.leerArchivo(nombreArchivo);

        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El producto no existe');

        const indice = cart.findIndex(cartId => cartId.id == id);

        cart.splice(indice, 1);

        fs.writeFileSync(nombreArchivo, JSON.stringify(cart, null, '\t'))
    }

    getCartById(id) {

        const cart = this.leerArchivo(nombreArchivo);

        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El carrito no existe');

        const indice = cart.findIndex(cartId => cartId.id == id);

        return cart[indice].productos;
    }

    agregarProducto(id, data) {

        const cart = this.leerArchivo(nombreArchivo);

        if (!data.title || !data.price || !data.cantidad || !data.id) throw createError(400, 'Datos invalidos');

        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: data.id,
            cantidad: data.cantidad,
        };

        const indice = cart.findIndex(cartId => cartId.id == id);

        cart[indice].productos.push(nuevoProducto);
        console.log(cart)

        fs.writeFileSync(nombreArchivo, JSON.stringify(cart, null, '\t'));

        return nuevoProducto
    }

    deleteProduct(idCart, idProduct) {

        const cart = this.leerArchivo(nombreArchivo);

        const indice = cart.findIndex(cartId => cartId.id == idCart);

        const exist = this.productExistCart(idProduct, indice);

        if (exist) {

            const indiceProducto = cart[indice].productos.findIndex(prodId => prodId.id === idProduct);

            cart[indice].productos.splice(indiceProducto, 1);

            fs.writeFileSync(nombreArchivo, JSON.stringify(cart, null, '\t'));

        } else {
            throw createError(404, 'El producto no existe')
        }
    }
};

const instanciaCartApi = new CartApi();

module.exports = {
    CartController: instanciaCartApi
}
