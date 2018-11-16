const knex = require('../../db');

function getAllActors() {
    return knex('actors')
      .then(function (peoples) {
        const promises = peoples.map(person => {
          return knex('movies_actors')
          .join('movies', 'movies.id', 'movies_actors.movie_id')
          .where('movies_actors.actor_id', person.id)
            .then(function (data) {
              person.films = data;
              return person;
            })
        })
        return Promise.all(promises);
      })
  };

  function getActor(id) {
      return knex('actors')
      .where("actors.id", id)
      .then(function (peoples) {
        const promises = peoples.map(person => {
          return knex('movies_actors')
          .join('movies', 'movies.id', 'movies_actors.movie_id')
          .where('movies_actors.actor_id', person.id)
            .then(function (data) {
              person.films = data;
              return person;
            })
        })
        return Promise.all(promises);
      })
  };

  module.exports = {
      getAllActors,
      getActor,
  }