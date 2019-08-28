const {Router} = require ('express')
const bodyParser = require ('body-parser')
const tokenMiddleware = require ('../helpers/token-middleware')
const registerUser = require ('./register-user')
const authenticateUser = require ('./authenticate-user')
const retrieveUser = require ('./retrieve-user')
const unregisterUser = require ('./unregister-user')
const updateUser = require ('./update-user')

const router = Router()

const jsonBodyParser = bodyParser.json()

router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/user/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.delete('/user/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)
router.patch('/user/:id', [tokenMiddleware, jsonBodyParser], updateUser)

module.exports = router