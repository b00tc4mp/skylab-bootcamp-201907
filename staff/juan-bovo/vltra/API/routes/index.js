const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./user/register-user')
const authenticateUser = require('./user/authenticate-user')
const retrieveUser = require('./user/retrieve-user')
const updateUser = require('./user/update-user')
const unregisterUser = require('./user/unregister-user')


const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

/* POST */

/* COMMENTS */

module.exports = router