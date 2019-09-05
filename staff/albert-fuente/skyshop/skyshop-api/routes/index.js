const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser } = require('./user')

const {registerProduct, retrieveProduct, unregisterProduct, retrieveAll, retrieveProducts}=require('./product')

/* const{registerOrder, retrieveAll}=require('./order')
 */
const {registerItem, unregisterItem}= require('./item')

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
router.post('/orders/:id',[tokenMiddleware, jsonBodyParser],registerOrder)
router.get('/orders', [tokenMiddleware, jsonBodyParser], retrieveAll)

//ITEM
router.post('/items/:productId',jsonBodyParser,registerItem)
router.delete('/items/:productId/delete',jsonBodyParser,unregisterItem)


module.exports = router