const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./user/register-user')
const authenticateUser = require('./user/authenticate-user')
const retrieveUser = require('./user/retrieve-user')
const updateUser = require('./user/update-user')
const unregisterUser = require('./user/unregister-user')

// const registerVehicle = require('./vehicle/register-vehicle')
// const retrieveAllVehicles = require('./vehicle/retrieve-all-vehicles')
// const retrieveVehicle = require('./vehicle/retrieve-vehicle')
// const updateVehicle = require('./vehicle/update-vehicle')
// const unregisterVehicle = require('./vehicle/unregister-vehicle')

// const registerProperty = require('./property/register-property')
// const registerPropertyOwner = require('./property/register-owner')
// const retrieveAllProperties = require('./property/retrieve-all-properties')
// const retrieveProperty= require('./property/retrieve-property')
// const updateProperty = require('./property/update-property')
// const unregisterProperty = require('./property/unregister-property')
// const unregisterPropertyOwner = require('./property/unregister-owner')

// const registerCard = require('./card/register-card')
// const retrieveCard = require('./card/retrieve-card')
// const retrieveAllCards = require('./card/retrieve-all-cards')
// const unregisterCard = require('./card/unregister-card')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

// /* VEHICLE */
// router.post('/users/:id/vehicles', [tokenMiddleware, jsonBodyParser], registerVehicle)
// router.get('/users/:id/vehicles/', [tokenMiddleware, jsonBodyParser], retrieveAllVehicles)
// router.get('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], retrieveVehicle)
// router.patch ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], updateVehicle)
// router.delete ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], unregisterVehicle)

// /* PROPERTY */ 
// router.post('/users/:id/properties', [tokenMiddleware, jsonBodyParser], registerProperty)
// router.patch ('/users/:id/properties/:propertyId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], registerPropertyOwner)
// router.get('/users/:id/properties/', [tokenMiddleware, jsonBodyParser], retrieveAllProperties)
// router.get('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], retrieveProperty)
// router.patch ('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], updateProperty)
// router.delete ('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], unregisterProperty)
// router.delete ('/users/:id/properties/:propertyId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], unregisterPropertyOwner)

// /* CARD */ 
// router.post('/users/:id/cards', [tokenMiddleware, jsonBodyParser], registerCard)
// router.get('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], retrieveCard)
// router.get('/users/:id/cards/', [tokenMiddleware, jsonBodyParser], retrieveAllCards)
// router.delete ('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], unregisterCard)

module.exports = router