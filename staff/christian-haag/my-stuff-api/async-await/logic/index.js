module.exports = {

    registerCard: require('./card/register'),
    retrieveCard: require('./card/retrieve'),
    unregisterCard: require('./card/unregister'),
    registerProperty: require('./property/register'),
    registerOwnerProperty: require('./property/register-owner'),
    retrieveProperty: require('./property/retrieve'),
    retrieveAllProperty: require('./property/retrieve-all'),
    unregisterProperty: require('./property/unregister'),
    unregisterOwnerProperty: require('./property/unregister-owner'),
    updateProperty: require('./property/update'),
    authenticateUser: require('./user/authenticate'),
    registerUser: require('./user/register'),
    retrieveUser: require('./user/retrieve'),
    unregisterUser: require('./user/unregister'),
    updateUser: require('./user/update'),
    registerVehicle: require('./vehicle/register'),
    retrieveVehicle: require('./vehicle/retrieve'),
    retrieveAllVehicle: require('./vehicle/retrieve-all'),
    unregisterVehicle: require('./vehicle/unregister'),
    updateVehicle: require('./vehicle/update')

}