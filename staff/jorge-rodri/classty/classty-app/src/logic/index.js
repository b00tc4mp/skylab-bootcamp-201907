import authenticateUser from './user/authenticate-user'
import retrieveUser from './user/retrieve-user'
import registerUser from './user/register-user'
import isUserLoggedIn from './user/is-user-logged-in'
import listSubjects from './subject/list-subjects'
import isStudent from './user/is-student'
import isTeacher from './user/is-teacher'
import isMentor from './user/is-mentor'
import logUserOut from './user/log-user-out'
import retrieveClasses from './classes/retrieve-classes'
import registerClass from './classes/register-class'
import removeClass from './classes/remove-class'
import retrieveAll from './common/retrieve-all'
import unregisterUser from './user/unregister-user'
import retrieveTeachersSubjects from './subject/retrieve-list-tea-sub'
import retrievePost from './post/retrieve-post'
import createPost from './post/create-post'
import retrieveAllExams from './exam/retrieve-all-exams'
import retrieveNotDel from './homework/retrieve-not-del'
import retrieveDel from './homework/retrieve-del'
import delivery from './homework/delivery'
import notDelivery from './homework/not-delivery'
import retrieveTeacherHome from './subject/retrieve-subject-teacher'
import createExam from './exam/register-exam'
import retrieveAllExamsTeacher from './exam/retrieve-ex-teacher'
import addNote from './exam/add-note'
import retrieveHomeworks from './homework/retrieve-homeworks'
import createHomework from './homework/create-homework'
import retrieveOther from './user/retrieve-other'
import uploadPhoto from './upload-photo'


export default {
    set __userCredentials__(token) {

        sessionStorage.token = token

    },
    get __userCredentials__() {

        return sessionStorage.token
    },
    set __userType__(type) {
        
        sessionStorage.type = type
    },
    get __userType__(){
        
        return sessionStorage.type
    },
    isUserLoggedIn,
    authenticateUser,
    retrieveUser,
    registerUser,
    listSubjects,
    isTeacher,
    isStudent,
    isMentor,
    logUserOut,
    retrieveClasses,
    registerClass,
    removeClass,
    retrieveAll,
    unregisterUser,
    retrieveTeachersSubjects,
    retrievePost,
    createPost,
    retrieveAllExams,
    retrieveNotDel,
    retrieveDel,
    delivery,
    notDelivery,
    retrieveTeacherHome,
    createExam,
    retrieveAllExamsTeacher,
    addNote,
    retrieveHomeworks,
    createHomework,
    retrieveOther,
    uploadPhoto
}

