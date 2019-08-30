const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const registerUser = require('./user-register')
const authenticateUser = require('./user-authenticate')
const retrieveUser = require('./user-retrieve')
const updateUser = require('./user-update')
const unregisterUser = require('./user-unregister')

// const { registerVehicle, retrieveAllVehicle,
//     retrieveVehicle, updateVehicle, unregisterVehicle } = require('./vehicle')

const registerProperty = require('./properties-add')
const retrieveAllProperty = require('./properties-retrieve-all')
const retrieveProperty = require('./properties-retrieve')
const updateProperty = require('./properties-update')
const unregisterProperty = require('./properties-unregister')
const registerPropertyOwner = require('./properties-register-owner')
const unregisterPropertyOwner = require('./property-unregister-owner')

const registerCard = require('./card-register')
const retrieveCard = require('./card-retrieve')
const unregisterCard = require('./card-unregister')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

//CARD
router.post('/users/:id/cards', [tokenMiddleware, jsonBodyParser], registerCard)
router.get('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], retrieveCard)
router.delete('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], unregisterCard)

/* PROPERTY */
router.post('/users/:id/properties', [tokenMiddleware, jsonBodyParser], registerProperty)
router.get('/users/:id/properties/', [tokenMiddleware, jsonBodyParser], retrieveAllProperty)
router.get('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], retrieveProperty)
router.patch('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], updateProperty)
router.patch('/users/:id/properties/:propertyId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], registerPropertyOwner)
router.delete('/users/:id/properties/:propertyId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], unregisterPropertyOwner)
router.delete('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], unregisterProperty)

// /* VEHICLE */
// router.post('/users/:id/vehicles', [tokenMiddleware, jsonBodyParser], registerVehicle)
// router.get('/users/:id/vehicles/', [tokenMiddleware, jsonBodyParser], retrieveAllVehicle)
// router.get('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], retrieveVehicle)
// router.patch('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], updateVehicle)
// router.delete('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], unregisterVehicle)



module.exports = router