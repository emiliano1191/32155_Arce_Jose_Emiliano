const knex = require('knex');


const createError = require('http-errors')


class ChatSql {

    constructor(config, table) {
        this.knex = knex(config)
        this.table = table
    }

    async createTable() {

        this.knex.schema.hasTable(this.table).then((exists) => {
            if (!exists) {
                return this.knex.schema.createTable(this.table, (table) => {
                    table.string('email', 50).notNullable();
                    table.string('timeStamp', 50).notNullable();
                    table.string('msg', 100).notNullable();
                });
            }
        });

    }

    async save(msg) {

        if (!msg) throw createError(400, 'Mensaje vacio');

        const nuevoMsg = {
            email: msg.username,
            timeStamp: msg.time,
            msg: msg.text
        }

        try {
            await this.knex(this.table).insert(nuevoMsg);
        } catch {
            throw createError(400, 'Error al guardar mensaje');
        }
    }
};

module.exports = ChatSql