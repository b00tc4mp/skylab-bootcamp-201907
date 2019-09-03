const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./user/register-user')
const authenticateUser = require('./user/authenticate-user')
const retrieveUser = require('./user/retrieve-user')
const updateUser = require('./user/update-user')
const unregisterUser = require('./user/unregister-user')

const registerSpace = require('./space/register-space')
const registerSpaceCouser = require('./space/register-couser')
const retrieveAllSpaces = require('./space/retrieve-all-spaces')
const retrieveSpace= require('./space/retrieve-space')
const updateSpace = require('./space/update-space')
const unregisterSpace = require('./space/unregister-space')
const unregisterSpaceCouser = require('./space/unregister-couser')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

/* SPACE */ 
router.post('/users/:id/spaces', [tokenMiddleware, jsonBodyParser], registerSpace)
router.patch ('/users/:id/spaces/:spaceId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], registerSpaceCouser)
router.get('/users/:id/spaces/', [tokenMiddleware, jsonBodyParser], retrieveAllSpaces)
router.get('/users/:id/spaces/:spaceId', [tokenMiddleware, jsonBodyParser], retrieveSpace)
router.patch ('/users/:id/spaces/:spaceId', [tokenMiddleware, jsonBodyParser], updateSpace)
router.delete ('/users/:id/spaces/:spaceId', [tokenMiddleware, jsonBodyParser], unregisterSpace)
router.delete ('/users/:id/spaces/:spaceId/owners/:ownerId', [tokenMiddleware, jsonBodyParser], unregisterSpaceCouser)

module.exports = router