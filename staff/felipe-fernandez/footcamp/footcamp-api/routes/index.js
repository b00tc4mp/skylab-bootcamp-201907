const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')
const registerUser = require('./user/register')
const authenticateUser = require('./user/authenticate')
const retrieveUser = require('./user/retrieve')
const updateUser = require('./user/update')
const unregisterUser = require('./user/unregister')

const createLeague = require('./league/create')
const joinLeague = require('./league/join')
const retrieveLeague = require('./league/retrieve')
const leaveLeagues = require('./league/leave')
const retrieveAllLeagues = require('./league/retrieve-all')

const createTeam = require('./team/create')
const retrieveTeam = require('./team/retrieve')
const lineUpTeam = require('./team/lineup')
const deleteTeam = require('./team/delete')

const retrievePlayer = require('./player/retrieve')


const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)

/*LEAGUE*/
router.post('/users/leagues', [tokenMiddleware, jsonBodyParser], createLeague)
router.post ('/users/leagues/join', [tokenMiddleware, jsonBodyParser], joinLeague)
router.get ('/users/leagues', [tokenMiddleware, jsonBodyParser], retrieveLeague)
router.delete ('/users/leagues', [tokenMiddleware, jsonBodyParser], leaveLeagues)
router.get ('/users/leagues/table', [tokenMiddleware, jsonBodyParser], retrieveAllLeagues)

/*TEAM*/
router.post('/users/leagues/team', [tokenMiddleware, jsonBodyParser], createTeam)
router.get ('/users/leagues/team', [tokenMiddleware, jsonBodyParser], retrieveTeam)
router.get ('/users/leagues/team/lineup', [tokenMiddleware, jsonBodyParser], lineUpTeam)
router.delete ('/users/leagues/team', [tokenMiddleware, jsonBodyParser], deleteTeam)


/**PLAYER**/
router.get ('/users/leagues/player', [tokenMiddleware, jsonBodyParser], retrievePlayer)


module.exports = router