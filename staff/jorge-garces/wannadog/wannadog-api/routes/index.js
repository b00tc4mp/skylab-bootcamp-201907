const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token.middleware.js')
const jsonBodyParser = bodyParser.json()

////   USER   ////

const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser, retrieveFavorites, toggleFavorite, registerWish } = require('./user')

router.post('/users', [jsonBodyParser], registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/user', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/user', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete('/user', [tokenMiddleware, jsonBodyParser], unregisterUser)
router.get('/user/favorites', [tokenMiddleware, jsonBodyParser], retrieveFavorites)
router.patch('/user/dog/:dogId', [tokenMiddleware, jsonBodyParser], toggleFavorite)
router.post('/user/wish', [tokenMiddleware, jsonBodyParser], registerWish)

const { createChat, retrieveAllChats, retrieveChat, updateChat } = require('./chat')

router.post('/user/chat', [tokenMiddleware, jsonBodyParser], createChat)
router.get('/user/chat', [tokenMiddleware, jsonBodyParser], retrieveAllChats)
router.get('/user/chat/:chatId', [tokenMiddleware, jsonBodyParser], retrieveChat)
router.patch('/user/chat/:chatId', [tokenMiddleware, jsonBodyParser], updateChat)

////   DOG   ////

const { registerDog, retrieveDog, unregisterDog, retrieveAllDogs, search } = require('./dog')

router.post('/user/dog', [tokenMiddleware, jsonBodyParser], registerDog)
router.get('/dog/:dogId', jsonBodyParser, retrieveDog)
router.delete('/user/:dogId', [tokenMiddleware, jsonBodyParser], unregisterDog)
router.get('/user/dogs', [tokenMiddleware, jsonBodyParser], retrieveAllDogs)
router.get('/dogs', jsonBodyParser, search)

module.exports = router