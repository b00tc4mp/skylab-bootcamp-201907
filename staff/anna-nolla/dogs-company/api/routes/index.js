const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')

const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser, retrieveUserId} = require('./user')

const { registerPet, retrieveAllPets, unregisterPet, retrievePet, updatePet } = require('./pets')

const { createChat, updateChat, retrieveAllChats, retrieveChat } = require('./chat')  

const { createNotification, deleteNotification, updateNotification, retrieveNotification } = require('./notification')

const { retrieveAllDinamic, updateDinamic, retrieveAllStatic, updateStatic } = require('./geolocation')
const router = Router()

router.post('/user', registerUser)
router.post('/auth', authenticateUser)
router.get('/user', [tokenMiddleware], retrieveUser)
router.get('/user/detail/:id', retrieveUserId)
router.patch ('/user', [tokenMiddleware], updateUser)
router.delete ('/user', [tokenMiddleware], unregisterUser)

router.post('/user/pet', [tokenMiddleware], registerPet)
router.get('/user/pet', [tokenMiddleware], retrieveAllPets)
router.get('/user/pet/:petId', [tokenMiddleware], retrievePet)
router.patch ('/user/pet/:petId', [tokenMiddleware], updatePet)
router.delete ('/user/pet/:petId', [tokenMiddleware], unregisterPet)

router.post('/user/chat', [tokenMiddleware], createChat)
router.get('/user/chat', [tokenMiddleware], retrieveAllChats)
router.get('/user/chat/:chatId', [tokenMiddleware], retrieveChat)
router.patch ('/user/chat/:chatId', [tokenMiddleware], updateChat)
//router.delete ('/user/chat', [tokenMiddleware], deleteChat)

router.post('/user/notification', [tokenMiddleware], createNotification)
router.get('/user/notification', [tokenMiddleware], retrieveNotification)
router.patch ('/user/notification/:notificationId', [tokenMiddleware], updateNotification)
router.delete ('/user/notification/:notificationId', [tokenMiddleware], deleteNotification)

router.get('/user/dinamic/:distance', [tokenMiddleware], retrieveAllDinamic)
router.patch ('/user/dinamic', [tokenMiddleware], updateDinamic)
router.get('/user/static/:distance', [tokenMiddleware], retrieveAllStatic)
router.patch ('/user/static', [tokenMiddleware], updateStatic)

module.exports = router