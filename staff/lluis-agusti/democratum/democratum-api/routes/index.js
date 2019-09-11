const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, updateUser } = require('./user')

const { newPoll, singlePoll, listApproved, listExpired, listPending, listRejected } = require('./poll')

const votePoll = require('./poll/vote-poll')
const listAll = require('./poll/list-all')
    
// const { citizenNewPoll, cityhallNewPoll, cityhallUpdatePoll } = require('./poll')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* CITIZEN */
router.post('/auth', jsonBodyParser, authenticateUser)
router.post('/users', jsonBodyParser, registerUser)
router.patch ('/users', [tokenMiddleware, jsonBodyParser], updateUser)
//router.get ('/users', [tokenMiddleware, jsonBodyParser], retrieveUser) // ------------------> Retrieve User

/* POLL */
router.post('/users/newpoll', [tokenMiddleware, jsonBodyParser], newPoll)
router.patch('/users/votepoll/:pollId', [tokenMiddleware, jsonBodyParser], votePoll)

//router.patch ('/users/:id/polls/:id', [tokenMiddleware, jsonBodyParser], updatePoll)

// router.get ('/users/singlePolls/:id', [tokenMiddleware, jsonBodyParser], singlePoll)
router.get('/users/citypollsall/', [tokenMiddleware, jsonBodyParser], listAll)
//router.get('/users/citypollsapp/', [tokenMiddleware, jsonBodyParser], listApproved)
// router.get('/users/citypollsexp/', [tokenMiddleware, jsonBodyParser], listExpired)
// router.get('/users/citypollspen/', [tokenMiddleware, jsonBodyParser], listPending)
// router.get('/users/citypollsrej/', [tokenMiddleware, jsonBodyParser], listRejected)

module.exports = router