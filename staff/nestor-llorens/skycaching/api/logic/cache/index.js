module.exports = {
    registerCache: require('./register'),
    retrieveCache: require('./retrieve'),
    unregisterCache: require('./unregister'),
    retrieveAllCaches: require('./retrieve-all'),
    retrieveAllOwnedCaches: require('./retrieve-all-owned'),
    toggleFavoriteCache: require('./toggle-favorite'),
    retrieveFavorites: require('./retrieve-favorites'),
    logCache: require('./log'),
    retrieveNear: require('./retrieve-near'),
    retrieveLog: require('./retrieve-log')
}