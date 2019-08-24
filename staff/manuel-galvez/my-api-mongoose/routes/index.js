const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')
const { registerUser, authenticateUser, 
        retrieveUser, updateUser, unregisterUser } = require('./user')
const { registerCar, retrieveCar, updateCar, unregisterCar } = require('./car')

const router = Router()

const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

/* VEHICLE */
router.post('/users/:id/vehicles', jsonBodyParser, registerVehicle)
router.get('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], retrieveVehicle)
router.patch ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], updateVehicle)
router.delete ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], unregisterVehicle)

/* PROPERTY */
router.post('/users/:id/properties', jsonBodyParser, registerProperty)
router.get('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], retrieveProperty)
router.patch ('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], updateProperty)
router.delete ('/users/:id/properties/:propertyId', [tokenMiddleware, jsonBodyParser], unregisterProperty)

/* CARD */
router.post('/users/:id/cards', jsonBodyParser, registerProperty)
router.get('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], retrieveProperty)
router.patch ('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], updateProperty)
router.delete ('/users/:id/cards/:cardId', [tokenMiddleware, jsonBodyParser], unregisterProperty)
module.exports = router