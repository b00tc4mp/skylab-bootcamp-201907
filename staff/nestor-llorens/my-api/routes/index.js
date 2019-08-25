const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const updateUser = require('./update-user')
const unregisterUser = require('./unregister-user')

const router = Router()

router.post('/users', registerUser)

router.post('/auth', authenticateUser)

router.get('/users/:id', tokenMiddleware, retrieveUser)

router.patch('/users/:id', tokenMiddleware, updateUser)

router.delete('/users/:id', tokenMiddleware, unregisterUser)

module.exports = router