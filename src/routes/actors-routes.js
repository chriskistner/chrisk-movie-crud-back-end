const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/actors-controllers');

router.get('/actors/', ctrl.allActors);
router.get('/actors/:id', ctrl.getActor);
router.delete('/actors/:id', ctrl.deleteActor);
router.post('/actors/', ctrl.newActor);
router.post('/actors/:id/movies', ctrl.addMovieToActor);
router.delete('/actors/:id/movies', ctrl.deleteMovieToActor);
router.put('/actors/:id', ctrl.updateActor);

module.exports = router