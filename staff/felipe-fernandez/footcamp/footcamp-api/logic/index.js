module.exports = {
    registerUser: require('./user/register'),
    authenticateUser: require('./user/authenticate'),
    retrieveUser: require('./user/retrieve'),
    unregisterUser: require('./user/unregister'),
    updateUser: require('./user/update'),
    createLeague: require('./league/create'),
    joinLeague: require('./league/join'), 
    retrieveLeagues: require('./league/retrieve-leagues'), 
    leaveLeagues: require('./league/leave'),
    
    // property: require('./property'),
    // card: require('./card'),
}
