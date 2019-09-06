const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser } = require('./user')

const {registerProduct, retrieveProduct, unregisterProduct, retrieveAll, retrieveProducts}=require('./product')

const{placeOrder}=require('./order')

const {addToCart, removeProduct}= require('./cart')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

//PRODUCT
router.post('/products',jsonBodyParser,registerProduct)
router.get('/product/one/:productId',jsonBodyParser,retrieveProduct)
router.delete('/products/:productId',jsonBodyParser,unregisterProduct)
router.get('/products',jsonBodyParser,retrieveAll)
router.get('/product/q/:title',jsonBodyParser,retrieveProducts)

//ORDER
router.post('/users/:id/orders',[tokenMiddleware, jsonBodyParser],placeOrder)
//router.get('/orders', [tokenMiddleware, jsonBodyParser], retrieveAll)

//CART
router.post('/users/:id/cart',[tokenMiddleware, jsonBodyParser],addToCart)
router.patch('/users/:id/cart/deleteItem',[tokenMiddleware, jsonBodyParser],removeProduct)



module.exports = router