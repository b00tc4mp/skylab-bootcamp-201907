const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser, addLocation } = require('./user')
const { registerCache, retrieveCache, unregisterCache, logCache, updateCache, retrieveAllCaches,
retrieveAllOwnedCaches, toggleFavorite, retrieveFavorites, retrieveLog, retrieveNear } = require('./cache')

const router = Router()

// user routes

router.get('/users/favorites', tokenMiddleware, retrieveFavorites)

router.get('/users/log', tokenMiddleware, retrieveLog)

router.post('/users/location', tokenMiddleware, addLocation)

router.post('/users', registerUser)

router.post('/auth', authenticateUser)

router.get('/users', tokenMiddleware, retrieveUser)

router.patch('/users', tokenMiddleware, updateUser)

router.delete('/users', tokenMiddleware, unregisterUser)



// cache routes

router.post('/caches', tokenMiddleware, registerCache)

router.get('/caches/owned', tokenMiddleware, retrieveAllOwnedCaches)

router.get('/caches/:distance', tokenMiddleware, retrieveNear)

router.get('/caches/:cacheId', tokenMiddleware, retrieveCache)

router.delete('/caches/:cacheId', tokenMiddleware, unregisterCache)

router.post('/caches/favorite/:cacheId', tokenMiddleware, toggleFavorite)

router.post('/caches/:cacheId', tokenMiddleware, logCache)

router.patch('/caches/:cacheId', tokenMiddleware, updateCache)

router.get('/caches', tokenMiddleware, retrieveAllCaches)





// router.patch('/users', tokenMiddleware, updateUser)

// router.delete('/users', tokenMiddleware, unregisterUser)


module.exports = router