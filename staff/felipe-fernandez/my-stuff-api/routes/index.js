const {Router} = require('express')
const bodyparser = require('body-parser')
const registerUser = require('./user/register-user')
const authenticateUser = require('./user/authenticate-user')

// const express = require('express')
// const router = express.Router();

const router = Router()

const jsonBodyParser = bodyparser.json()

router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)


module.exports = router