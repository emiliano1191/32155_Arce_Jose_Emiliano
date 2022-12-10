const knex = require('knex');

const createError = require('http-errors')


class ProductsSql {
    constructor(config, table) {
        this.knex = knex(config)
        this.table = table
    }

    async createTable() {

        this.knex.schema.hasTable(this.table).then((exists) => {
            if (!exists) {
                return this.knex.schema.createTable(this.table, (table) => {
                    table.increments('id').primary();
                    table.string('title', 50).notNullable();
                    table.string('url', 100).notNullable();
                    table.integer('price');
                });
            }
        });
    }

    async getAll() {

        try {
            const products = await this.knex(this.table).select('*');
            return products
        } catch (error) {
            throw createError(400, 'Error al traer productos');
        }
    }

    async save(data) {

        if (!data.title || !data.price || !data.url) throw createError(400, 'Datos invalidos');

        const nuevoProducto = {
            title: data.title,
            url: data.url,
            price: data.price
        }

        try {
            await this.knex(this.table).insert(nuevoProducto);
        } catch {
            throw createError(400, 'Error al guardar');
        }
    }
};

module.exports = ProductsSql ;
