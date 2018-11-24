const model = require('../models/actors-models');

function allActors(req, res, next) {
    model.getAllActors().then(function(result) {
    if (!result)
    return next({status: 404, message: "Sorry, but there are no movies."})
  res.status(200).send(result);
  });
};

function getActor (req, res, next) {
    const actorID = req.params.id;
    model.getActor(actorID).then(function(result) {
        if (!result)
        return next({ status: 404, message: "Actor not Found" });
    
      res.status(200).send(result);
    })
}

function deleteActor (req, res, next) {
    const actorID = req.params.id;
    model.deleteActor(actorID).then(function(result){
        if (!result)
        return next({status: 404, message: "Actor Already Deleted"});
        
        res.status(200).send(result)
    })
};

function newActor (req, res, next) {
    const {first_name, last_name} = req.body;
    model.addActor(first_name, last_name).then(function(result){
        if(!first_name || !last_name)
            return next({status: 404, message: "Actor's need a first & last name"})

        res.status(201).send(result)
    })
};

function updateActor (req, res, next) {
    const actorID = req.params.id;
    const { first_name, last_name } = req.body;
    model.updateActor(actorID, first_name, last_name).then(function(result){
        if (!first_name || !last_name)
            return next({status: 400, message: "Your Actor Still needs a first & last name"})
        res.status(201).send(result)
    });
};


module.exports = {
    allActors,
    getActor,
    deleteActor,
    newActor,
    updateActor
}