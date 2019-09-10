const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token.middleware.js')
const jsonBodyParser = bodyParser.json()

////   USER   ////

const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser, retrieveFavorites, toggleFavorite, registerWish } = require('./user')

router.post('/users', [jsonBodyParser], registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/user/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/user/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete('/user/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)
router.get('/user/:id/favorites', [tokenMiddleware, jsonBodyParser], retrieveFavorites)
router.patch('/user/:id/:dogId', [tokenMiddleware, jsonBodyParser], toggleFavorite)
router.post('/user/:id/wish', [tokenMiddleware, jsonBodyParser], registerWish)

const { createChat, retrieveAllChats, retrieveChat, updateChat } = require('./chat')

router.post('/user/chat', [tokenMiddleware, jsonBodyParser], createChat)
router.get('/user/chat', [tokenMiddleware, jsonBodyParser], retrieveAllChats)
router.get('/user/chat/:chatId', [tokenMiddleware, jsonBodyParser], retrieveChat)
router.patch('/user/chat/:chatId', [tokenMiddleware, jsonBodyParser], updateChat)

////   DOG   ////

const { registerDog, retrieveDog, unregisterDog, retrieveAllDogs, search } = require('./dog')

router.post('/user/:id/dog', [tokenMiddleware, jsonBodyParser], registerDog)
router.get('/dog/:dogId', jsonBodyParser, retrieveDog)
router.delete('/user/:id/:dogId', [tokenMiddleware, jsonBodyParser], unregisterDog)
router.get('/user/:id/dogs', [tokenMiddleware, jsonBodyParser], retrieveAllDogs)
router.get('/dogs', jsonBodyParser, search)

module.exports = router