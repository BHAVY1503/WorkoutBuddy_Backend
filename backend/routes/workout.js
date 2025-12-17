const express = require('express');
const router = express.Router();
const controller = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

//require Auth for all workouts
router.use(requireAuth)

//get all workouts
router.get('/',controller.getallWorkouts);

//get a single workout
router.get('/:id',controller.singleWorkout)

//post a new workout
router.post('/',controller.createWorkout)

//delete a workout
router.delete('/:id',controller.deleteWorkout)

//update a workout
router.patch('/:id',controller.updateWorkout)

module.exports = router