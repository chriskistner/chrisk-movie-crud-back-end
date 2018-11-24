const model = require('../models/movies-models');

function allMovies(req, res, next) {
    model.getAllMovies().then(function(result) {
    if (!result)
    return next({status: 404, message: "Sorry, but there are no movies."})

  res.status(200).send(result);
  });
};

function getMovie (req, res, next) {
    const movieID = req.params.id;
    model.getMovie(movieID).then(function(result) {
        if (!result || result.length == 0)
        return next({ status: 404, message: "Movie not Found" });
    
      res.status(200).send(result);
    })
};

function addMovie (req, res, next) {
    const { title, released, director, rating, poster } = req.body;
    model.addMovie(title, released, director, rating, poster).then(function(result){
        if (!title || title.length <= 0)
            return next({ status: 400, message: "A Movie has to have a name" });

        if (rating <= 0 || rating > 5)
            return next({ status: 400, message: "Rating must be between 1 & 5 stars"})
      res.status(201).send(result);
    })
};

function deleteMovie (req, res, next) {
    const movieID = req.params.id;
    model.deleteMovie(movieID).then(function(result){
        if (!result)
        return next({status: 404, message: "Movie Already Deleted"});
        
        res.status(200).send(result)
    })
};

function updateMovie (req, res, next) {
    const movieID = req.params.id;
    const { title, released, director, rating, poster } = req.body;
    model.updateMovie(movieID, title, released, director, rating, poster).then(function(result){
        if (!title || title.length <= 0)
            return next({status: 400, message: "Your Movie still has to  have a name"})
        
        if (rating <= 0 || rating > 5)
            return next({ status: 400, message: "Rating must be between 1 & 5 stars"})

        res.status(201).send(result)
    });
};


  module.exports = {
      allMovies,
      getMovie,
      addMovie,
      deleteMovie,
      updateMovie
  };