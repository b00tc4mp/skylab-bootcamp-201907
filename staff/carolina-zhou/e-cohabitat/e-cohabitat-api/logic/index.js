module.exports = {
    registerUser: require('./user/register-user'),
    authenticateUser: require('./user/authenticate-user'),
    retrieveUser: require('./user/retrieve-user'),
    updateUser: require('./user/update-user'),
    unregisterUser: require('./user/unregister-user'),
    registerSpace: require('./space/register-space'),
    registerSpaceCouser: require('./space/register-couser'),
    retrieveAllSpaces: require('./space/retrieve-all-spaces'),
    retrievespace: require('./space/retrieve-space'),
    updatespace: require('./space/update-space'),
    unregisterspace: require('./space/unregister-space'),
    unregisterspaceCouser: require('./space/unregister-couser')
}