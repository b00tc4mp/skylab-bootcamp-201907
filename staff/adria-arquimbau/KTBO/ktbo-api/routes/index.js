const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

    ////   USER   ////
    const registerUser = require('./user/register-user')
    const authenticateUser = require('./user/authenticate-user')
    const updateUser = require('./user/update-user')
    const unregisterUser = require('./user/unregister-user')
    const retrieveUser = require('./user/retrieve-user')
    const retrieveAllUsers = require('./user/retrieve-all-users')

    ////   ARTICLE   ////
    const registerArticle = require('./article/register-article')
    const retrieveArticle = require('./article/retrieve-article')
    const searchArticles = require('./article/search-articles')
    const retrieveAllArticles = require('./article/retrieve-all-articles')
    const retrieveCategory = require('./article/retrieve-category')
    const updateArticle = require('./article/update-article')
    const unregisterArticle = require('./article/unregister-article')

    ////   ORDER   ////
    const placeOrder = require('./order/place-order')
    const retrieveOrder = require('./order/retrieve-order')
    const retrieveAllUserOrders = require('./order/retrieve-all-user-orders')
    const retrieveAllOrders = require('./order/retrieve-all-orders')
    const retrieveClosedOrders = require('./order/retrieve-closed-orders')
    const retrievePendingOrders = require('./order/retrieve-pending-orders')
    const changeOrderState = require('./order/change-order-state')
    const removePendingOrder = require('./order/remove-pending-order')

    ////   CART   ////
    const addToCart = require('./cart/add-to-cart')
    const removeArticle = require('./cart/remove-article')

    const router = Router()
    const jsonBodyParser = bodyParser.json()

    ////   USER   //// 6
    router.post('/user', [tokenMiddleware, jsonBodyParser], registerUser)
    router.post('/auth', jsonBodyParser, authenticateUser)
    router.get('/user', [tokenMiddleware, jsonBodyParser], retrieveUser)
    router.get('/user/allUsers', [tokenMiddleware, jsonBodyParser], retrieveAllUsers)
    router.patch('/user', [tokenMiddleware, jsonBodyParser], updateUser)
    router.delete('/user', [tokenMiddleware, jsonBodyParser], unregisterUser)

    ////   ARTICLE   //// 7
    router.post('/user/article', [tokenMiddleware, jsonBodyParser], registerArticle)
    router.get('/user/article/:articleId', [tokenMiddleware, jsonBodyParser], retrieveArticle)
    router.get('/user/searchArticles/:q', [tokenMiddleware, jsonBodyParser], searchArticles)
    router.get('/user/articles', [tokenMiddleware, jsonBodyParser], retrieveAllArticles)
    router.get('/user/articles/:category', [tokenMiddleware, jsonBodyParser], retrieveCategory)
    router.patch ('/user/article/:articleId', [tokenMiddleware, jsonBodyParser], updateArticle)
    router.delete ('/user/article/:articleId', [tokenMiddleware, jsonBodyParser], unregisterArticle)

    ////   ORDER   //// 8
    router.post('/user/order', [tokenMiddleware, jsonBodyParser], placeOrder)
    router.get('/user/order/:orderId', [tokenMiddleware, jsonBodyParser], retrieveOrder)
    router.get('/user/orders', [tokenMiddleware, jsonBodyParser], retrieveAllUserOrders)
    router.get('/user/allOrders', [tokenMiddleware, jsonBodyParser], retrieveAllOrders)
    router.get('/user/closedOrders', [tokenMiddleware, jsonBodyParser], retrieveClosedOrders)
    router.get('/user/pendingOrders', [tokenMiddleware, jsonBodyParser], retrievePendingOrders)
    router.patch('/user/order/:orderId', [tokenMiddleware, jsonBodyParser], changeOrderState)
    router.patch('/user/removeOrder/:orderId', [tokenMiddleware, jsonBodyParser], removePendingOrder)

    ////   CART    //// 2
    router.post('/user/cart', [tokenMiddleware, jsonBodyParser], addToCart)
    router.patch('/user/cart', [tokenMiddleware, jsonBodyParser], removeArticle)

module.exports = router