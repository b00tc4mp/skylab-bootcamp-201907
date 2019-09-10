const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, 
        retrieveUser, updateUser, unregisterUser } = require('./user')

const { retrieveRecipe, searchRecipe } = require('./recipe')

const { registerDay, retrieveDay } = require('./day')

const { registerWeek, retrieveWeek } = require('./week')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)

/* RECIPE */
router.get('/recipe/:id', jsonBodyParser, retrieveRecipe)
router.get('/recipes/:category', jsonBodyParser, searchRecipe)

/* DAY */
router.post('/day', jsonBodyParser, registerDay)
router.get('/days', jsonBodyParser, retrieveDay) 

/* WEEK */ 
router.post('/week', jsonBodyParser, registerWeek)
//router.get('/week/:id', [tokenMiddleware, jsonBodyParser], retrieveWeek)

module.exports = router