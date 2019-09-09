const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./user/register-user')
const authenticateUser = require('./user/authenticate-user')
const retrieveUser = require('./user/retrieve-user')
const updateUser = require('./user/update-user')
const unregisterUser = require('./user/unregister-user')

const registerSpace = require('./space/register-space')
const registerSpaceCouser = require('./space/register-couser')
const retrieveAllSpaces = require('./space/retrieve-all-spaces')
const retrieveSpace= require('./space/retrieve-space')
const updateSpace = require('./space/update-space')
const unregisterSpace = require('./space/unregister-space')
const unregisterSpaceCouser = require('./space/unregister-couser')

const addTask = require('./task/add-task')
const addTaskCompanion = require('./task/add-companion')
const retrieveAllTasks = require('./task/retrieve-all-tasks')
const retrieveTask = require('./task/retrieve-task')
const editTask = require('./task/edit-task')
const deleteTask = require('./task/delete-task')
const removeTaskCompanion = require('./task/remove-companion')

const postComment = require('./comment/post-comment')
const editComment = require('./comment/edit-comment')
const deleteComment = require('./comment/delete-comment')

const router = Router()

/* USER */
router.post('/users', registerUser)
router.post('/auth', authenticateUser)
router.get('/users/:id', [tokenMiddleware], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware], updateUser)
router.delete ('/users/:id', [tokenMiddleware], unregisterUser)

/* SPACE */ 
router.post('/users/:id/spaces', [tokenMiddleware], registerSpace)
router.patch ('/users/:id/spaces/:spaceId/cousers/:coUserId', [tokenMiddleware], registerSpaceCouser)
router.get('/users/:id/spaces/', [tokenMiddleware], retrieveAllSpaces)
router.get('/users/:id/spaces/:spaceId', [tokenMiddleware], retrieveSpace)
router.patch ('/users/:id/spaces/:spaceId', [tokenMiddleware], updateSpace)
router.delete ('/users/:id/spaces/:spaceId', [tokenMiddleware], unregisterSpace)
router.delete ('/users/:id/spaces/:spaceId/cousers/:coUserId', [tokenMiddleware], unregisterSpaceCouser)

/* TASK */
router.post('/users/:id/spaces/:spaceId/tasks', [tokenMiddleware], addTask)
router.patch ('/users/:id/spaces/:spaceId/tasks/:taskId/companions/:companionId', [tokenMiddleware], addTaskCompanion)
router.get('/users/:id/spaces/:spaceId/tasks', [tokenMiddleware], retrieveAllTasks)
router.get('/users/:id/spaces/:spaceId/tasks/:taskId', [tokenMiddleware], retrieveTask)
router.patch ('/users/:id/spaces/:spaceId/tasks/:taskId', [tokenMiddleware], editTask)
router.delete ('/users/:id/spaces/:spaceId/tasks/:taskId', [tokenMiddleware], deleteTask)
router.delete ('/users/:id/spaces/:spaceId/tasks/:taskId/companions/:companionId', [tokenMiddleware], removeTaskCompanion)

/* COMMENT */
router.post('/users/:id/spaces/:spaceId/tasks/:taskId/comments', [tokenMiddleware], postComment)
router.patch ('/users/:id/spaces/:spaceId/tasks/:taskId/comments/:commentId', [tokenMiddleware], editComment)
router.delete ('/users/:id/spaces/:spaceId/tasks/:taskId/comments/:commentId', [tokenMiddleware], deleteComment)

module.exports = router
