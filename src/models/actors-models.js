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

  function addActor(first_name, last_name ) {
    return knex('actors')
    .insert({ title, released, director, rating, poster})
    .returning('*')
    .then(function([data]){
        return data
    })
};

  function deleteActor(id) {
    return knex('actors')
    .del()
    .where('actors.id', id)
    .returning('*')
    .then(function([data]){
      delete data.id
      return data
    })
  };

  function updateActor(id, first_name, last_name) {
    return knex('actors')
    .update({first_name, last_name})
    .where('actors.id', id)
    .returning('*')
    .then(function([data]){
      return data
    })
  };

  module.exports = {
      getAllActors,
      getActor,
      deleteActor,
      addActor,
      updateActor
  }