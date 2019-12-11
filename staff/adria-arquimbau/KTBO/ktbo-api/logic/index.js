module.exports = {

    ////   USER   ////
    registerUser: require('./user/register-user'),
    authenticateUser: require('./user/authenticate-user'),
    updateUser: require('./user/update-user'),
    unregisterUser: require('./user/unregister-user'),
    retrieveUser: require('./user/retrieve-user'),
    retrieveAllUsers: require('./user/retrieve-all-users'),

    ////   ARTICLE   ////
    registerArticle: require('./article/register-article'),
    retrieveArticle: require('./article/retrieve-article'),
    retrieveAllArticles: require('./article/retrieve-all-articles'),
    searchArticles: require('./article/search-articles'),
    retrieveCategory: require('./article/retrieve-category'),

    ////   ORDER   ////
    placeOrder: require('./order/place-order'),
    retrieveOrder: require('./order/retrieve-order'),
    retrieveAllUserOrders: require('./order/retrieve-all-user-orders'),
    retrieveAllOrders: require('./order/retrieve-all-orders'),
    retrieveClosedOrders: require('./order/retrieve-closed-orders'),
    retrievePendingOrders: require('./order/retrieve-pending-orders'),
    changeOrderState: require('./order/change-order-state'),
    removePendingOrder: require('./order/remove-pending-order'),

    ////   CART   ////
    addToCart: require('./cart/add-to-cart'),
    removeArticle: require('./cart/remove-article')
}