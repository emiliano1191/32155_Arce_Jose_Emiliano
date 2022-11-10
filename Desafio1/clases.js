
class Usuario {
    constructor (nombre, apellido, mascotas = [], libros = []){
        
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros;
      
    }

    getFullName () {
        return(`${this.nombre} ${this.apellido}`)
    }

    addMascota (mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas () {
        return(this.mascotas.length)
    }

    addBook (nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookNames () {
        return(this.libros.map( libro => libro.nombre))
    }
};

const usuario1 = new Usuario(`Ignacio`,`Bastias`);

usuario1.getFullName();
usuario1.addMascota(`Perro`);
usuario1.countMascotas();
usuario1.addBook(`Peter Pan`, `James Matthew Barrie`);
usuario1.getBookNames();
