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
const retrieveAllLeagues = require('./league/retrieve-all')
const leaveLeagues = require('./league/leave')
const retrieveTable = require('./league/retrieve-table')

const createTeam = require('./team/create')
const retrieveTeam = require('./team/retrieve')
const lineUpTeam = require('./team/lineup')
const retrievelineUpTeam = require('./team/retrieve-lineup')
const deleteTeam = require('./team/delete')
const updateTeam = require('./team/update')

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
router.get ('/users/leagues/:leagueId', [tokenMiddleware, jsonBodyParser], retrieveLeague)
router.get ('/users/leagues', [tokenMiddleware, jsonBodyParser], retrieveAllLeagues)
router.delete ('/users/leagues/:leagueId', [tokenMiddleware, jsonBodyParser], leaveLeagues)
router.get ('/users/leagues/:leagueId/table', [tokenMiddleware, jsonBodyParser], retrieveTable)

/*TEAM*/
router.post('/users/leagues/:leagueId/team', [tokenMiddleware, jsonBodyParser], createTeam)
router.get ('/users/leagues/:leagueId/team/:teamId', [tokenMiddleware, jsonBodyParser], retrieveTeam)
router.get ('/users/leagues/:leagueId/team/:teamId/lineup', [tokenMiddleware, jsonBodyParser], lineUpTeam)
router.get ('/users/leagues/:leagueId/team/:teamId/lineups', [tokenMiddleware, jsonBodyParser], retrievelineUpTeam)
router.delete ('/users/leagues/:leagueId/team/:teamId', [tokenMiddleware, jsonBodyParser], deleteTeam)
router.post ('/users/leagues/:leagueId/team/:teamId', [tokenMiddleware, jsonBodyParser], updateTeam)


/**PLAYER**/
router.get ('/users/leagues/player/:playerId', [tokenMiddleware, jsonBodyParser], retrievePlayer)


module.exports = router