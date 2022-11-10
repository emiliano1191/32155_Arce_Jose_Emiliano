const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 8080;
const nombreArchivo = "./productosExpress.json";


const between = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min)
}


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

};

const contenedor1 = new Contenedor(nombreArchivo);



app.get('/productos', (req, res) => {

    contenedor1.getAll().then((data) => {
        res.send(data)
    });

})

app.get('/productoRandom', (req, res) => {

    contenedor1.getAll().then((data) => {

        let idRandom = between(1, data.length);

        contenedor1.getById(idRandom).then((productoRandom) => {

            res.send(productoRandom)

        });
    });
})



const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
});

server.on('error', error => console.log(`error en servidor ${error}`));
