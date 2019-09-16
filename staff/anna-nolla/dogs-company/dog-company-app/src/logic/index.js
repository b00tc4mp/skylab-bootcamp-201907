import registerUser from './user/register-user'
import logUserIn from './user/log-user-in'
import retrieveUser from './user/retrieve-user'
import isUserLoggedIn from './user/is-user-logged-in'
import logUserOut from './log-out'
import updateUser from './user/update-user'
import registerPet from './pet/register-pet'
import retrieveAllPets from './pet/retrieve-pets'
import retrievePet from './pet/retrieve-pet'
import updatePet from './pet/update-pet'
import unregisterUser from './user/unregister-user'
import createChat from './chat/create-chat'
import unregisterPet from './pet/unregister-pet'
import retrieveAllChats from './chat/retrieve-all-chats'
import retrieveChat from './chat/retrieve-chat'
import updateChat from './chat/update-chat'
import createNotification from './notifications/create-notification'
import updateNotification from './notifications/update-notification'
import deleteNotification from './notifications/delete-notification'
import retrieveNotification from './notifications/retrieve-notification'
import updateStaticLocation from './geo/update-static'
import updateDinamicLocation from './geo/update-dinamic'
import retrieveAllUsers from './geo/retrieve-all-users'

export default {

    set __token__(token){
        sessionStorage.token = token 
    },  
    get __token__(){
      return sessionStorage.token 
    },

    registerUser,
    logUserIn, 
    retrieveUser,
    isUserLoggedIn,
    logUserOut,
    updateUser,
    registerPet,
    retrieveAllPets,
    retrievePet,
    updatePet,
    unregisterUser,
    unregisterPet, 
    createChat,
    retrieveAllChats,
    retrieveChat,
    updateChat,
    createNotification,
    updateNotification,
    deleteNotification,
    retrieveNotification,
    updateStaticLocation,
    updateDinamicLocation,
    retrieveAllUsers
}