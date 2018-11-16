
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies_actors', table => {
    table.integer('movie_id').references('movies.id').notNullable()
    table.integer('actor_id').references('actors.id').notNullable()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('movies_actors')
};
