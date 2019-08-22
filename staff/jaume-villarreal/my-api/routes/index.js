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
router.post('/users' , jsonBodyParser , authenticateUser )
router.get('/users/:id' , jsonBodyParser , tokenMiddleware,  retriveUser)
router.patch('/users/:id' , jsonBodyParser , tokenMiddleware , updateUser)
router.delete('/users/:id' , jsonBodyParser , tokenMiddleware , unregisterUser)

module.exports = router


