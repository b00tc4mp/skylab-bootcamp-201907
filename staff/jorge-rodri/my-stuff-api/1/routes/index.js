const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const { registerCard, retrieveCard, unregisterCard } = require('./cards')
const { registerProperty, retrieveProperty, addOwner, unregisterProperty } = require('./property')
const { registerUser, retrieveUser, unregisterUser, updateUser, authenticateUser } = require('./user')
const { registerVehicle, retrieveVehicle, unregisterVehicle } = require('./vehicle')

const router = Router()

const jsonBodyParser = bodyParser.json()

//USERs
router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

//VEHICLES
router.post('/users/:id/vehicles', [tokenMiddleware, jsonBodyParser], registerVehicle)

router.get('/users/:id/vehicles', [tokenMiddleware, jsonBodyParser], retrieveVehicle)

router.delete('/users/:id/vehicles/:idv', [tokenMiddleware, jsonBodyParser], unregisterVehicle)

//PROPERTIES
router.post('/users/:id/properties', [tokenMiddleware, jsonBodyParser], registerProperty)

router.get('/users/:id/properties', [tokenMiddleware, jsonBodyParser], retrieveProperty)

router.delete('/users/:id/properties/:idp', [tokenMiddleware, jsonBodyParser], unregisterProperty)

router.post('/users/:id/properties', [tokenMiddleware, jsonBodyParser], addOwner)

//CARDS
router.post('/users/:id/cards', [tokenMiddleware, jsonBodyParser], registerCard)

router.get('/users/:id/cards/:idc', [tokenMiddleware, jsonBodyParser], retrieveCard)

router.delete('/users/:id/cards/:idc',[tokenMiddleware, jsonBodyParser], unregisterCard)

module.exports = router