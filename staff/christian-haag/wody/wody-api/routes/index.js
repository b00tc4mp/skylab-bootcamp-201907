const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const registerUser = require('./user-register')
const authenticateUser = require('./user-authenticate')
const retrieveUser = require('./user-retrieve')
const updateUser = require('./user-update')
const unregisterUser = require('./user-unregister')

const calculateWorkout = require('./workout-calculate')
const toogleFavWorkout = require('./workout-toogle-fav')
const endWorkout = require('./workout-end')
const retrieveFavWorkout = require('./workout-retrieve-fav')


const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/users', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)


router.post('/users/calcworkout', [tokenMiddleware, jsonBodyParser], calculateWorkout)
router.post('/users/workoutfav/:workoutId', [tokenMiddleware, jsonBodyParser], toogleFavWorkout)
router.post('/users/workoutend/:workoutId', [tokenMiddleware, jsonBodyParser], endWorkout)
router.get('/users/retrievefav', [tokenMiddleware, jsonBodyParser], retrieveFavWorkout)


module.exports = router