const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')

const registerUser = require('./user/register-user')
const authenticateUser = require('./user/authenticate-user')
const retrieveUser = require('./user/retrieve-user')
const updateUser = require('./user/update-user')
const unregisterUser = require('./user/unregister-user')
const toggleBookmarks = require('./user/toggle-bookmark')

const createPost = require('./post/create-post')
const retrievePost = require('./post/retrieve-post')
const retrieveAllPosts = require('./post/retrieve-all-posts')
const retrieveUserPosts = require('./post/retrieve-user-posts')
const deletePost = require('./post/delete-post')
const votePost = require('./post/vote-post')

const addComment = require('./comment/add-comment')
const retrievePostComments = require('./comment/retrieve-post-comments')
const deleteComment = require('./comment/delete-comment')


const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser) //'user: id'
router.patch ('/users', [tokenMiddleware, jsonBodyParser], updateUser) //'user: id'
router.delete ('/users', [tokenMiddleware, jsonBodyParser], unregisterUser) //'user: id'
router.post('/bookmark', [tokenMiddleware, jsonBodyParser], toggleBookmarks) //router.post('/bookmark', jsonBodyParser, toggleBookmarks)

/* POST */
router.post('/posts', [tokenMiddleware, jsonBodyParser], createPost) //router.post('/posts', jsonBodyParser, createPost)
//router.post('/posts', jsonBodyParser, createPost)
router.get('/post/:postId', jsonBodyParser, retrievePost) //router.get('/post', [tokenMiddleware, jsonBodyParser], retrievePost)
router.get('/posts', [] , retrieveAllPosts) // router.get('/posts', [tokenMiddleware, jsonBodyParser], retrieveAllPosts)
router.get('/posts/author/', [tokenMiddleware], retrieveUserPosts) //router.get('/posts/author', [tokenMiddleware, jsonBodyParser], retrieveUserPosts)
router.delete ('/posts', [tokenMiddleware, jsonBodyParser], deletePost)
router.post('/post/vote', [tokenMiddleware, jsonBodyParser], votePost) //router.post('/post/vote', jsonBodyParser, votePost)

/* COMMENTS */
router.post('/posts/comments/', [tokenMiddleware, jsonBodyParser], addComment) //router.post('/posts/comments', jsonBodyParser, addComment)
router.get('/posts/comments/:postId', jsonBodyParser, retrievePostComments) //router.get('/posts/comments/', [tokenMiddleware, jsonBodyParser], retrievePostComments)
router.delete ('/posts/comments', [tokenMiddleware, jsonBodyParser], deleteComment)

module.exports = router