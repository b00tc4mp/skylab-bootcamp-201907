module.exports = {
    registerUser: require('./user/register'),
    authenticateUser: require('./user/authenticate'),
    retrieveUser: require('./user/retrieve'),
    unregisterUser: require('./user/unregister'),
    updateUser: require('./user/update'),
    calculateWorkout: require('./movement/calcworkout'),
    favWorkout: require('./movement/tooglefavworkout'),
    retrieveFavWorkout: require('./movement/retrievefavworkout'),
    endWorkout: require('./movement/endworkout')


}