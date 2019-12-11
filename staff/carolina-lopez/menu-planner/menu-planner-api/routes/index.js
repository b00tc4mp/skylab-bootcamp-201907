const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, 
        retrieveUser, updateUser, unregisterUser } = require('./user')

const { retrieveRecipe, searchRecipe } = require('./recipe')

const { registerDay, retrieveCurrentDay } = require('./day')

const { retrieveCurrentWeek } = require('./week')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)

/* RECIPE */
router.get('/recipes/:id', jsonBodyParser, retrieveRecipe)
router.get('/recipes/search/:category', jsonBodyParser, searchRecipe)

/* DAY */
router.post('/days', [tokenMiddleware, jsonBodyParser ] , registerDay)
router.get('/days/:id', [tokenMiddleware, jsonBodyParser ], retrieveCurrentDay) 

/* WEEK */ 

router.get('/weeks/current', tokenMiddleware, retrieveCurrentWeek)

module.exports = router