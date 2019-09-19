import isUserLoggedIn from './user/is-user-logged-in'
import registerUser from './user/register-user'
import authenticateUser from './user/authenticate-user'
import logUserOut from './user/log-user-out'
/* import retrieveUser from './user/retrieve-user'
import updateUser from './user/update-user'
import unregisterUser from './user/unregister-user' */
import registerSpace from './space/register-space'
import registerSpaceCouser from './space/register-couser'
import retrieveAllSpaces from './space/retrieve-all-spaces'
import retrieveSpace from './space/retrieve-space'
import updateSpace from './space/update-space'
/* import unregisterSpace from './space/unregister-space'
import unregisterSpaceCouser from './space/unregister-couser'*/
import addTask from './task/add-task'
/* import addTaskCompanion from './task/add-companion' */
import retrieveAllSpaceTasks from './task/retrieve-all-space-tasks'
/* import retrieveTask from './task/retrieve-task'
import editTask from './task/edit-task'*/
import deleteTask from './task/delete-task'
/* import removeTaskCompanion from './task/remove-companion'
import postComment from './comment/post-comment'
import editComment from './comment/edit-comment'
import deleteComment from './comment/delete-comment' */

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
    /* retrieveUser, updateUser, unregisterUser, */
    registerSpace, 
    registerSpaceCouser,
    retrieveAllSpaces, 
    retrieveSpace, 
    updateSpace,
    /* unregisterSpace, unregisterSpaceCouser*/
    addTask, /*addTaskCompanion, */
    retrieveAllSpaceTasks,/*  retrieveTask, editTask, */
    deleteTask/* , removeTaskCompanion,
    postComment, editComment, deleteComment */
}