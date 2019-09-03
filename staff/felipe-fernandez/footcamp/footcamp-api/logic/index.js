module.exports = {
    registerUser: require('./user/register'),
    authenticateUser: require('./user/authenticate'),
    retrieveUser: require('./user/retrieve'),
    unregisterUser: require('./user/unregister'),
    updateUser: require('./user/update'),
    createLeague: require('./league/create')
    // property: require('./property'),
    // card: require('./card'),
}
