const { Router } = require('express')
const bodyParser = require('body-parser')
const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const updateUser = require('./update-user')
const unregisterUser = require('./unregister-user')
const tokenMiddleware = require('../helpers/token-middleware')


const router = Router()

const jsonBodyParser = bodyParser.json()
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)
router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)

module.exports = router 