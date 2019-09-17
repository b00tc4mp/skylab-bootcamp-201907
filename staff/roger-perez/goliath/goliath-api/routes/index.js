const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

// USER 
const registerUser = require('./user/register-user')
const authenticateUser = require('./user/authenticate-user')
const retrieveUser = require('./user/retrieve-user')
const updateUser = require('./user/update-user')
const unregisterUser = require('./user/unregister-user')

// INSTRUMENT 
const registerInstrument = require('./instrument/register-instrument')
const retrieveInstrument = require('./instrument/retrieve-instrument')
const unregisterInstrument = require('./instrument/unregister-instrument')
const updateInstrument = require('./instrument/update-instrument')



const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/auth', jsonBodyParser, authenticateUser)
router.post('/users', jsonBodyParser, registerUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.put('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

/* INSTRUMENT */
router.post('/instruments', jsonBodyParser, registerInstrument)
router.get('/instruments/:id',  jsonBodyParser, retrieveInstrument)
router.delete ('/instruments/:id',  jsonBodyParser, unregisterInstrument)
router.patch('/instruments/:id', jsonBodyParser, updateInstrument)
module.exports = router