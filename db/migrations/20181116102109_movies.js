exports.up = function (knex, Promise) {
    return knex.schema.createTable('movies', table => {
        table.increments()
        table.string('title').notNullable()
        table.integer('released').defaultTo(1900)
        table.string('director')
        table.integer('rating').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('movies')
};