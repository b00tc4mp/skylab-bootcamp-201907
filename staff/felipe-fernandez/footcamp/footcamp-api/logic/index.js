module.exports = {
    registerUser: require('./user/register'),
    authenticateUser: require('./user/authenticate'),
    retrieveUser: require('./user/retrieve'),
    unregisterUser: require('./user/unregister'),
    updateUser: require('./user/update'),
    createLeague: require('./league/create'),
    joinLeague: require('./league/join'), 
    leaveLeagues: require('./league/leave'),
    retrieveLeague: require('./league/retrieve'),
    retrieveAllLeagues: require ('./league/retrieve-all'),
    createTeam: require('./team/create'),
    retrieveTeam: require('./team/retrieve'),
    lineUpTeam: require('./team/team-lineup'),
    deleteTeam: require('./team/delete'),
    retrievePlayer: require('./player/retrieve')
    
    
}
