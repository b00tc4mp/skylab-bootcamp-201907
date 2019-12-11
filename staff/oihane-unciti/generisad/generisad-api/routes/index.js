const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const retrieveUserAd = require('./retrieve-user-ad')
const retrieveFav = require('./retrieve-fav')
const toggleUserFav = require('./toggle-user-fav')

const registerAd = require('./register-ad')
const retrieveAllAd = require('./retrieve-all-ad')
const retrieveAd = require('./retrieve-ad')
const deleteAd = require('./delete-ad')
const searchAd = require('./search-ad')

const sendMessage = require('./send-message')
const responseEmail = require("./response-email")
const retrieveUserMessage =  require("./retrieve-user-message")
const retrieveUserMessageRead =require("./retrieve-message-read")

const uploadPhoto =  require("./upload-photo")


//USER
const router = Router()

const jsonBodyParser = bodyParser.json()
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.get('/product/owner/:merchant', [tokenMiddleware, jsonBodyParser], retrieveUserAd)

router.get('/users/favorites/:merchant', [tokenMiddleware, jsonBodyParser], retrieveFav)
router.post('/users/ads/:id/favorite', [tokenMiddleware, jsonBodyParser], toggleUserFav)

//IMAGE

router.post('/users/ads/:id/upload', [tokenMiddleware], uploadPhoto)



//AD
router.post('/users/ads', [tokenMiddleware, jsonBodyParser], registerAd)
router.get('/products/:merchant',  jsonBodyParser, retrieveAllAd)
router.get('/search',  jsonBodyParser, searchAd)
router.get('/product/:id', jsonBodyParser, retrieveAd)
router.delete('/product/:id', [tokenMiddleware, jsonBodyParser], deleteAd)

//MAIl
router.post('/users/ads/:id/message', [tokenMiddleware, jsonBodyParser], sendMessage)
router.post('/users/message/:id', [tokenMiddleware, jsonBodyParser], responseEmail)
router.get('/users/message/:merchant', [tokenMiddleware, jsonBodyParser], retrieveUserMessage)
router.get('/users/message/read/:merchant', [tokenMiddleware, jsonBodyParser], retrieveUserMessageRead)






// router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)

// router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

module.exports = router