module.exports = {
    registerUser: require('./user/register-user'),
    authenticateUser: require('./user/authenticate-user'),
    retrieveUser: require('./user/retrieve-user'),
    updateUser: require('./user/update-user'),
    unregisterUser: require('./user/unregister-user'),
    registerSpace: require('./space/register-space'),
    registerSpaceCouser: require('./space/register-couser'),
    retrieveAllSpaces: require('./space/retrieve-all-spaces'),
    retrieveSpace: require('./space/retrieve-space'),
    updateSpace: require('./space/update-space'),
    unregisterSpace: require('./space/unregister-space'),
    unregisterSpaceCouser: require('./space/unregister-couser')
}