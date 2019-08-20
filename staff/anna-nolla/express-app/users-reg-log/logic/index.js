logic = {}
module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveDuck: require('./retrieve-duck'),
    retrieveFavDucks: require('./retrieve-fav-ducks'),
    retrieveUser: require('./retrieve-user'),
    searchDucks: require('./search-ducks'),
    toggleFavDuck: require('./toggle-fav-duck')
}