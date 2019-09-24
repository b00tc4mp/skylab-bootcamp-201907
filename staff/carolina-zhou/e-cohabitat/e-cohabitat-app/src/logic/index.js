import isUserLoggedIn from './user/is-user-logged-in'
import registerUser from './user/register-user'
import authenticateUser from './user/authenticate-user'
import logUserOut from './user/log-user-out'

import registerSpace from './space/register-space'
import registerSpaceCouser from './space/register-couser'
import retrieveAllSpaces from './space/retrieve-all-spaces'
import retrieveSpace from './space/retrieve-space'
import updateSpace from './space/update-space'

import addTask from './task/add-task'
import retrieveAllSpaceTasks from './task/retrieve-all-space-tasks'
import deleteTask from './task/delete-task'


export default {
    set __userCredentials__({ id, token }) {
        sessionStorage.token = token
        sessionStorage.id = id
    },
    get __userCredentials__() {
        return { id: sessionStorage.id, token: sessionStorage.token }
    },
    isUserLoggedIn,
    registerUser,
    authenticateUser,
    logUserOut,
    registerSpace, 
    registerSpaceCouser,
    retrieveAllSpaces, 
    retrieveSpace, 
    updateSpace,
    addTask, 
    retrieveAllSpaceTasks,
    deleteTask
}