import isUserLogged from './user/log-status'
import registerUser from './user/register-user'
import authenticateUser from './user/authenticate-user'
/* import retrieveUser from './user/retrieve-user'
import updateUser from './user/update-user'
import unregisterUser from './user/unregister-user' */
import registerSpace from './space/register-space'
/* import registerSpaceCouser from './space/register-couser'*/
import retrieveAllSpaces from './space/retrieve-all-spaces'
import retrieveSpace from './space/retrieve-space'
/* import updateSpace from './space/update-space'
import unregisterSpace from './space/unregister-space'
import unregisterSpaceCouser from './space/unregister-couser'
import addTask from './task/add-task'
import addTaskCompanion from './task/add-companion'
import retrieveAllTasks from './task/retrieve-all-tasks'
import retrieveTask from './task/retrieve-task'
import editTask from './task/edit-task'
import deleteTask from './task/delete-task'
import removeTaskCompanion from './task/remove-companion'
import postComment from './comment/post-comment'
import editComment from './comment/edit-comment'
import deleteComment from './comment/delete-comment' */

export default {

    set userCredentials({id,token}){
        sessionStorage.token = token
        sessionStorage.id = id
    },
    get userCredentials(){
        return { id: sessionStorage.id , token: sessionStorage.token }
    },
    isUserLogged, registerUser, authenticateUser, /* retrieveUser, updateUser, unregisterUser, */
    registerSpace, /*registerSpaceCouser, */ retrieveAllSpaces, retrieveSpace/*, updateSpace, unregisterSpace, unregisterSpaceCouser,
    addTask, addTaskCompanion, retrieveAllTasks, retrieveTask, editTask, deleteTask, removeTaskCompanion,
    postComment, editComment, deleteComment */
}