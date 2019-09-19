const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const updateUser = require('./update-user')
const unregisterUser = require('./unregister-user')

const router = Router()

const jsonBodyParser = bodyParser.json()

router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.patch('/users', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)

module.exports = router