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
    createTeam: require('./team/create'),
    retrieveTeam: require('./team/retrieve'),
    classificationTeam: require ('./team/classification'),
    lineUpTeam: require('./team/team-lineup'),
    retrievePlayer: require('./player/retrieve')
    
    
}
