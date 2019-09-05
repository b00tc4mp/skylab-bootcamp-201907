const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./user/register-user')
const authenticateUser = require('./user/authenticate-user')
const retrieveUser = require('./user/retrieve-user')
const updateUser = require('./user/update-user')
const unregisterUser = require('./user/unregister-user')

const createPost = require('./post/create-post')
const retrievePost = require('./post/retrieve-post')
const retrieveAllPosts = require('./post/retrieve-all-posts')
//const retrieveUserPosts = require('./post/retrieve-user-posts')
const deletePost = require('./post/delete-post')

// const addComment = require('./comment/add-comment')
// const retrievePostComments = require('./comment/retrieve-post-comments')
// const deleteComment = require('./comment/delete-comment')


const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

/* POST */
router.post('/posts', jsonBodyParser, createPost)
router.get('/posts/:id', [tokenMiddleware, jsonBodyParser], retrievePost)
router.get('/posts/', [tokenMiddleware, jsonBodyParser], retrieveAllPosts)
//router.get('users/:id/posts/:id', [tokenMiddleware, jsonBodyParser], retrieveUserPosts)
router.delete ('/posts/:id', [tokenMiddleware, jsonBodyParser], deletePost)

/* COMMENTS */
// router.post('/posts/:id/comments', jsonBodyParser, addComment)
// router.get('/posts/:id/comments/', [tokenMiddleware, jsonBodyParser], retrievePostComments)
// router.delete ('/posts/:id/comments/:id', [tokenMiddleware, jsonBodyParser], deleteComment)

module.exports = router