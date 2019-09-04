const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')


const { registerUser, authenticateUser } = require('./user')

const router = Router()
const jsonBodyParser = bodyParser.json()


/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)


module.exports = router