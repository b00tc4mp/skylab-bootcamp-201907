import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import isUserLoggedIn from './is-user-logged-in'
import logUserOut from './log-user-out'
import retrieveUser from './retrieve-user'
import retrieveAllCaches from './retrieve-all-caches'
import updateUser from './update-user'
import retrieveNear from './retrieve-near'
import updateCache from './update-cache'
import registerCache from './register-cache'
import retrieveOwnCaches from './retrieve-own-caches'
import unregisterCache from './unregister-cache'
import retrieveCache from './retrieve-cache'
import logCache from './log-cache'
import retrieveUserById from './retrieve-user-by-id'

export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUser,
    retrieveAllCaches,
    updateUser,
    retrieveNear,
    updateCache,
    registerCache,
    retrieveOwnCaches,
    unregisterCache,
    retrieveCache,
    logCache,
    retrieveUserById
}