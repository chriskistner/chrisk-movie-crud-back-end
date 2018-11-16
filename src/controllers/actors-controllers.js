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

module.exports = {
    allActors,
    getActor,
}