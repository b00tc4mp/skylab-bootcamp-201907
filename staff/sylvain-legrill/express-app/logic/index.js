logic = {}
module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    searchDucks: require('./search-ducks'),
    retrieveDuck: require('./retrieve-duck'),
    toggleFavDuck: require('./toggle-fav-duck')
}