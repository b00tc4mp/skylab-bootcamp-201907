module.exports = {
    registerCache : require('./register'),
    retrieveCache: require('./retrieve'),
    unregisterCache: require('./unregister'),
    logCache: require('./log'),
    updateCache: require('./update'),
    retrieveAllCaches: require('./retrieve-all'),
    retrieveAllOwnedCaches: require('./retrieve-all-owned'),
    toggleFavorite: require('./toggle-favorite'),
    retrieveFavorites: require('./retrieve-favorites'),
    retrieveLog: require('./retrieve-log'),
    retrieveNear: require('./retrieve-near')

}