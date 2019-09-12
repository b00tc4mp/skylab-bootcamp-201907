import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import registerProduct from './register-product'
import retrieveAllProducts from './retrieve-all-products'
import retrieveProduct from './retrieve-product'
import retrieveProductCategory from './retrieve-product-category'
import retrieveAllOrders from './orders-retrieve-all'
import updateUser from './update-user'
import removeUser from './remove-user'
import addToCart from './add-to-cart'
import retrieveAllOrdersUser from './orders-retrieve-user'
import updateCart from './update-cart'
import placeOrder from './order-place'
import uploadPhoto from './upload-picture'
import retrieveCart from './retrieve-cart'


export default{
    set userCredentials(token){
        sessionStorage.token=token
    },
    get userCredentials(){
        return sessionStorage.token
    },
    isUserLogged(){
        return !!this.userCredentials //desde fuera puedes consultar si hay session storage o no logic.isUserLogged?
    },
    registerUser,
    authenticateUser,
    retrieveUser,
    registerProduct,
    retrieveAllProducts,
    retrieveProduct,
    retrieveProductCategory,
    retrieveAllOrders,
    updateUser,
    removeUser,
    addToCart,
    retrieveAllOrdersUser,
    updateCart,
    placeOrder,
    uploadPhoto,
    retrieveCart
}