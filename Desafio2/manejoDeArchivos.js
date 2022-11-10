const fs = require('fs');
const path = require('path');

const nombreArchivo = "./productos.json";


class Contenedor {
    constructor(archivo) {

        this.archivo = archivo;

    }

    leerArchivo = () => {

        try {
            const dato = fs.readFileSync(nombreArchivo, `utf-8`);
            return JSON.parse(dato);
        }
        catch {
            throw new Error('Archivo no existe');
        }

    }

    getAll = async () => {

        try {
            const productos = this.leerArchivo()
            return (productos);
        }
        catch {
            console.log('Sin productos');
        }

    }

    save = async (nuevoProducto) => {

        const productos = this.leerArchivo();

        let newId = 0;

        if (productos.length !== 0) {
            newId = productos[productos.length - 1].id + 1;
        } else {
            newId = 1;
        }

        const producto = {
            title: nuevoProducto.title,
            price: nuevoProducto.price,
            id: newId,
        }

        productos.push(producto);

        try {
            await fs.promises.writeFile(nombreArchivo, JSON.stringify(productos, null, '\t'));
            return (newId);
        }
        catch {
            throw new Error('Error al guardar');
        }
    }

    getById = async (id) => {

        const productos = this.leerArchivo();

        try {
            const indice = productos.findIndex((producto) => producto.id === id);

            if (indice !== -1) {
                productos.splice(indice, 1);
                return (productos[indice]);
            } else {
                console.log("El producto no existe");
            }

        }
        catch {
            throw new Error('Error al traer por ID');
        }

    }

    deleteById = async (id) => {

        const productos = this.leerArchivo();

        try {
            const indice = productos.findIndex((producto) => producto.id === id);

            if (indice === -1) {
                console.log("El producto no existe")
            } else {
                productos.splice(indice, 1);
                await fs.promises.writeFile(nombreArchivo, JSON.stringify(productos, null, '\t'));
            }
        }
        catch {
            throw new Error('Error al borrar por ID');
        }

    }

    deleteAll = async () => {

        try {
            await fs.promises.writeFile(nombreArchivo, JSON.stringify([], null, '\t'));
        }
        catch {
            throw new Error('Sin productos');
        }

    }


};

const contenedor1 = new Contenedor(nombreArchivo);

// LLAMO TODOS LOS PRODUCTOS
// contenedor1.getAll()
// .then((data) => {console.log(data)})
// .catch(err => console.log(err))


// LLAMO PRODUCTO POR ID
// contenedor1.getById(2)
// .then((data) => {console.log(data)})
// .catch(err => console.log(err));




// AGREGO UN NUEVO PRODUCTO
// contenedor1.save({
//     title: "Xiaomi Redmi",
//     price: 12000,
// })
// .then((data) => { console.log(data) })
// .catch(err => console.log(err));



// BORRO TODOS LOS PRODUCTOS
// contenedor1.deleteAll()
// .catch(console.log('Fallo al borrar productos'));


// BORRO PRODUCTO POR ID
// contenedor1.deleteById(2)
// .catch(console.log('Fallo al borrar por ID'));
