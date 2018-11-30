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
    .insert({ first_name, last_name})
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

  function addMovieToActor(actorID, movieID ) {
    return knex('actors')
    .where('actors.id', actorID)
    .then(function(peoples){
      if(peoples.length === 0)
        throw {status: 400, message: "Actor does not exist"}
      
      return knex('movies')
      .where('movies.id', movieID)
    })
    .then(function(films){
      if(films.length === 0)
        throw {status: 400, message: "Movie does not exist"}

      return knex('movies_actors')
      .insert({movie_id: movieID, actor_id: actorID})
      .returning('*')
    })
  }; 
  
  function deleteMovieToActor(actorID, movieID) {
    return knex('actors')
    .where(actors.id, actorID)
    .then(function(peoples){
      if(peoples.length === 0)
        throw {status: 400, message: "Actor does not exist"}
        
      return knex('movies')
      .where('movies.id', movieID)

    })
    .then(function(films){
      if(films.length === 0)
        throw {status: 400, message: "Movie doe not exist"}

      return knex('movies_actors')
    }).then(function([data]){
      delete data.id
      return data
    })
  }
  
  module.exports = {
      getAllActors,
      getActor,
      deleteActor,
      addActor,
      updateActor,
      addMovieToActor,
      deleteMovieToActor
  }