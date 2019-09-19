// import retrieveUser from './retrieve-user'
import authenticateTutor from './authenticate-tutor'
import registerTutor from './register-tutor'
import retrieveTutor from './retrieve-tutor'
import registerStudent from './register-student'
import retrieveStudentsByTutor from './retrieve-students-by-tutor'
import retrieveStudent from './retrieve-student'
import updateStudent from './update-student'
import isUserLoggedIn from './is-user-logged-in'
import userLoggedOut from './user-logged-out'
import translateMessage from './translate-message'
import registerEnrollment from './register-enrollment'
import retrieveCurrentEnrollment from './retrieve-current-enrollment'

export default {
    
    set __token__(token){
        sessionStorage.token = token
    },
    
    get __token__(){
        return sessionStorage.token 
    },
    
    translateMessage, isUserLoggedIn , userLoggedOut ,
    registerTutor, authenticateTutor , retrieveTutor , 
    registerStudent , retrieveStudent , retrieveStudentsByTutor , updateStudent ,
    registerEnrollment , retrieveCurrentEnrollment
}

      
      