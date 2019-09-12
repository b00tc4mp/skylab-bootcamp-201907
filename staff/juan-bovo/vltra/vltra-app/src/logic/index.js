import authenticateUser from './user/authenticate-user'
import retrieveUser from './user/retrieve-user'


export default {
    set userCredentials(token){
        sessionStorage.token = token
       
    },
    get userCredentials(){
        return sessionStorage.token 
    },
    isUserLoggedIn(){
        return !!this.userCredentials
    },  
    authenticateUser,
    retrieveUser
}
      
      