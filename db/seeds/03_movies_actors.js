
exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('movies_actors').insert(
      { movie_id: 1, actor_id: 1 },
      { movie_id: 2, actor_id: 1 },
      { movie_id: 1, actor_id: 2 },
      { movie_id: 2, actor_id: 2 },
      { movie_id: 3, actor_id: 2 },
      { movie_id: 3, actor_id: 3 },
      ),
  ])
}

