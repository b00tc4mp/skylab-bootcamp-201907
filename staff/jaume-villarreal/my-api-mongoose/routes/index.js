const { Router } = require('express')
const router = Router()

const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const tokenMiddleware = require('../helpers/token-middleware')

const authenticateUser = require('./authenticate-user')
const registerUser = require('./register-user')
const retrieveUser = require('./retrieve-user')
const updateUser = require('./update-user')
const unregisterUser = require('./unregister-user')

router.post('/users' , jsonBodyParser , registerUser )
router.post('/auth' , jsonBodyParser , authenticateUser )
router.get('/users/:id' , [tokenMiddleware , jsonBodyParser] , retrieveUser)
router.patch('/users/:id' , [tokenMiddleware ,jsonBodyParser] , updateUser)
router.delete('/users/:id' , [tokenMiddleware , jsonBodyParser] , unregisterUser)

module.exports = router


