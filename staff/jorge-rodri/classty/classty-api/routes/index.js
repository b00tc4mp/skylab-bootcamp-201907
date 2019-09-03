const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const { registerUser, retrieveUser, unregisterUser, updateUser, authenticateUser } = require('./user')

const router = Router()

const jsonBodyParser = bodyParser.json()

//USERs
router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

module.exports = router