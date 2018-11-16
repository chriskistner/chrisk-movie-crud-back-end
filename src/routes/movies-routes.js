const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/movies-controllers');

router.get('/movies/', ctrl.allMovies);
router.get('/movies/:id', ctrl.getMovie);
// router.delete('/movies/:id', ctrl.deleteMovie);
router.post('/movies/', ctrl.addMovie);
// router.put('/movies/:id', ctrl.updateMovie);

module.exports = router