const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')


const {registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser}= require('./user')
const {registerVehicle, retrieveVehicle, retrieveAll,updateVehicle,unregisterVehicle}= require('./vehicle')

const router = Router()

const jsonBodyParser = bodyParser.json()


/* USER */

router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)



/* VEHICLE */

router.post('/users/:id/vehicles', [tokenMiddleware, jsonBodyParser], registerVehicle)
router.get('/users/:id/vehicles/', [tokenMiddleware, jsonBodyParser], retrieveAll)
router.get('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], retrieveVehicle)
router.patch ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], updateVehicle)
router.delete ('/users/:id/vehicles/:vehicleId', [tokenMiddleware, jsonBodyParser], unregisterVehicle)

module.exports = router