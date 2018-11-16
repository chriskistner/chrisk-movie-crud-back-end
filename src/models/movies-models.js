const knex = require('../../db');


  function getAllMovies() {
    return knex('movies')
      .then(function (films) {
        const promises = films.map(film => {
          return knex('movies_actors')
          .join('actors', 'actors.id', 'movies_actors.actor_id')
          .where('movies_actors.movie_id', film.id)
            .then(function (data) {
              film.actors = data;
              return film;
            })
        })
        return Promise.all(promises);
      })
  };

  function getMovie(id) {
    return knex('movies')
    .where('movies.id', id)
      .then(function (films) {
        const promises = films.map(film => {
          return knex('movies_actors')
          .join('actors', 'actors.id', 'movies_actors.actor_id')
          .where('movies_actors.movie_id', film.id)
            .then(function (data) {
              film.actors = data;
              return film;
            })
        })
        return Promise.all(promises);
      })
  };

  function addMovie(title, released, director, rating, poster ) {
      return knex('movies')
      .insert({ title, released, director, rating, poster})
      .returning('*')
      .then(function([data]){
          return data
      })
  }

  module.exports = {
      getAllMovies,
      getMovie,
      addMovie
  }