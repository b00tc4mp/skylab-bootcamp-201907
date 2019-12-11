module.exports = {
    registerUser: require('./user/register'),
    authenticateUser: require('./user/authenticate'),
    retrieveUser: require('./user/retrieve'),
    updateUser: require('./user/update'),
    unregisterUser: require('./user/unregister'),

    searchRecipe: require('./recipe/search'),
    retrieveRecipe: require('./recipe/retrieve'),

    registerDay: require('./day/register-day'),
    retrieveCurrentDay: require('./day/retrieve-current-day'),

    retrieveCurrentWeek: require('./week/retrieve-current-week')
}
