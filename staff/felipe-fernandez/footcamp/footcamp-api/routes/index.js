const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')
const registerUser = require('./user/register')
const authenticateUser = require('./user/authenticate')
const retrieveUser = require('./user/retrieve')
const updateUser = require('./user/update')
const unregisterUser = require('./user/unregister')

const createLeague = require('./league/create')
const joinLeague = require('./league/join')
const retrieveLeague = require('./league/retrieve')
const leaveLeagues = require('./league/leave')
const retrieveAllLeagues = require('./league/retrieve-all')

const createTeam = require('./team/create')
const retrieveTeam = require('./team/retrieve')
const lineUpTeam = require('./team/lineup')

const retrievePlayer = require('./player/retrieve')


const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)

/*LEAGUE*/
router.post('/users/leagues', [tokenMiddleware, jsonBodyParser], createLeague)
router.post ('/users/leagues/join', [tokenMiddleware, jsonBodyParser], joinLeague)
router.get ('/users/leagues', [tokenMiddleware, jsonBodyParser], retrieveLeague)
router.delete ('/users/leagues', [tokenMiddleware, jsonBodyParser], leaveLeagues)
router.get ('/users/leagues/table', [tokenMiddleware, jsonBodyParser], retrieveAllLeagues)

/*TEAM*/
router.post('/users/leagues/team', [tokenMiddleware, jsonBodyParser], createTeam)
router.get ('/users/leagues/team', [tokenMiddleware, jsonBodyParser], retrieveTeam)
router.get ('/users/leagues/team/lineup', [tokenMiddleware, jsonBodyParser], lineUpTeam)


/**PLAYER**/
router.get ('/users/leagues/player', [tokenMiddleware, jsonBodyParser], retrievePlayer)

// /* VEHICLE */
// router.post('/users/:id/vehicles', [tokenMiddleware, jsonBodyParser], registerVehicle)
// router.get('/users/:id/vehicles/', [tokenMiddleware, jsonBodyParser], retrieveAllVehicle)
// router.get('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], retrieveVehicle)
// router.patch ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], updateVehicle)
// router.delete ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], unregisterVehicle)

// /* PROPERTY */ 
// router.post('/users/:id/properties', [tokenMiddleware, jsonBodyParser], registerProperty)
// router.get('/users/:id/properties/', [tokenMiddleware, jsonBodyParser], retrieveAllProperty)
// router.get('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], retrieveProperty)
// router.patch ('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], updateProperty)
// router.patch ('/users/:id/properties/:propertyId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], registerPropertyOwner)
// router.delete ('/users/:id/properties/:propertyId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], unregisterPropertyOwner)
// router.delete ('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], unregisterProperty)

// //CARD
// router.post('/users/:id/cards', [tokenMiddleware, jsonBodyParser], registerCard)
// router.get('/users/:id/cards/', [tokenMiddleware, jsonBodyParser], retrieveAllCard)
// router.get('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], retrieveCard)
// router.delete ('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], unregisterCard)



module.exports = router