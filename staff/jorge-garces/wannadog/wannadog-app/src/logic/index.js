import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import isUserLoggedIn from './is-user-logged-in'
import logUserOut from './log-user-out'
import retrieveUser from './retrieve-user'
import search from './search'
import registerDog from './register-dog'
import retrieveFavorites from './retrieve-favorites'
import retrieveAllDogs from './retrieve-all-dogs'
import retrieveDog from './retrieve-dog'
import toggleFavorite from './toggle-favorite'
import unregisterDog from './unregister-dog'
import createChat from './create-chat'
import updateChat from './update-chat'
import retrieveChat from './retrieve-chat'

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
    search,
    registerDog,
    retrieveFavorites,
    retrieveAllDogs,
    retrieveDog,
    toggleFavorite,
    unregisterDog,
    createChat,
    updateChat,
    retrieveChat
}