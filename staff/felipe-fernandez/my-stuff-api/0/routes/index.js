const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, 
        retrieveUser, updateUser, unregisterUser } = require('./user')
    
const { registerVehicle, retrieveAllVehicle,
        retrieveVehicle, updateVehicle, unregisterVehicle } = require('./vehicle')
    
const { registerProperty, retrieveAllProperty,
        retrieveProperty, updateProperty, unregisterProperty,
        registerPropertyOwner, unregisterPropertyOwner } = require('./property')

const { registerCard, retrieveAllCard,
        retrieveCard, unregisterCard } = require('./card')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

/* VEHICLE */
router.post('/users/:id/vehicles', [tokenMiddleware, jsonBodyParser], registerVehicle)
router.get('/users/:id/vehicles/', [tokenMiddleware, jsonBodyParser], retrieveAllVehicle)
router.get('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], retrieveVehicle)
router.patch ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], updateVehicle)
router.delete ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], unregisterVehicle)

/* PROPERTY */ 
router.post('/users/:id/properties', [tokenMiddleware, jsonBodyParser], registerProperty)
router.get('/users/:id/properties/', [tokenMiddleware, jsonBodyParser], retrieveAllProperty)
router.get('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], retrieveProperty)
router.patch ('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], updateProperty)
router.patch ('/users/:id/properties/:propertyId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], registerPropertyOwner)
router.delete ('/users/:id/properties/:propertyId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], unregisterPropertyOwner)
router.delete ('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], unregisterProperty)

//CARD
router.post('/users/:id/cards', [tokenMiddleware, jsonBodyParser], registerCard)
router.get('/users/:id/cards/', [tokenMiddleware, jsonBodyParser], retrieveAllCard)
router.get('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], retrieveCard)
router.delete ('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], unregisterCard)

module.exports = router