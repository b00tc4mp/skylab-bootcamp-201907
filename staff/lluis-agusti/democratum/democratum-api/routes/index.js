const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, updateUser } = require('./user')

const { newPoll, updatePoll, listApproved, listExpired, listPending, listRejected } = require('./poll')

const votePoll = require('./poll/vote-poll')
    
// const { citizenNewPoll, cityhallNewPoll, cityhallUpdatePoll } = require('./poll')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* CITIZEN */
router.post('/auth', jsonBodyParser, authenticateUser)
router.post('/users', jsonBodyParser, registerUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
//router.get ('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser) // ------------------> Retrieve User

/* POLL */
router.post('/users/:id/newpoll', [tokenMiddleware, jsonBodyParser], newPoll)
router.patch('/users/:id/votepoll/:pollId', [tokenMiddleware, jsonBodyParser], votePoll)

/*router.patch ('/users/:id/polls/:id', [tokenMiddleware, jsonBodyParser], updatePoll)
router.get('/users/:id/poll/', [tokenMiddleware, jsonBodyParser], listApproved)
router.get('/users/:id/poll/', [tokenMiddleware, jsonBodyParser], listExpired)
router.get('/users/:id/poll/', [tokenMiddleware, jsonBodyParser], listPending)
router.get('/users/:id/poll/', [tokenMiddleware, jsonBodyParser], listRejected) */

module.exports = router