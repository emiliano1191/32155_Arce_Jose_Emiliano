const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const nombreArchivo = './src/controller/productos.json';

class ProductosApi {
    constructor(archivo) {

        this.archivo = archivo;

    }

    leerArchivo = () => {

        const dato = fs.readFileSync(nombreArchivo, `utf-8`);
        return JSON.parse(dato);

    }

    exist(id) {

        const productos = this.leerArchivo();

        const indice =  productos.findIndex(productId => productId.id == id);

        return indice >= 0;
    }

    getAll() {

        const productos = this.leerArchivo()
        return (productos);

    }

    getById(id) {

        const productos = this.leerArchivo();

        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El producto no existe');

        const indice = productos.findIndex(productId => productId.id == id);

        return productos[indice];
    }

    save = async (data) => {

        const productos = this.leerArchivo();

        if (!data.title || !data.price) throw createError(400, 'Datos invalidos');

        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: uuidv4(),
            codigo: uuidv4(),
            stock: data.stock,
            descripcion: data.descripcion,
            timestamp: new Date(),
            img: data.url
        }

        productos.push(nuevoProducto);

        await fs.promises.writeFile(nombreArchivo, JSON.stringify(productos, null, '\t'));

        return nuevoProducto.id;
    }

    update(id, dataNueva) {

        const productos = this.leerArchivo();

        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El producto no existe');

        const indice = productos.findIndex(productId => productId.id == id);
        const producto = productos[indice];

        const nuevoProducto = {
            title: dataNueva.title,
            price: dataNueva.price,
            id: producto.id,
            codigo: producto.codigo,
            stock: dataNueva.stock,
            descripcion: dataNueva.descripcion,
            timestamp: producto.timestamp,
            img: producto.img
        }

        productos.splice(indice, 1, nuevoProducto);

        fs.writeFileSync(nombreArchivo, JSON.stringify(productos, null, '\t'))

        return nuevoProducto;
    }

    deleteById(id) {

        const productos = this.leerArchivo();

        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El producto no existe');

        const indice = productos.findIndex(productId => productId.id == id);

        productos.splice(indice, 1);

        fs.writeFileSync(nombreArchivo, JSON.stringify(productos, null, '\t'));
    }

};

const instanciaProductosApi = new ProductosApi();

module.exports = {
    ProductosController: instanciaProductosApi
}
