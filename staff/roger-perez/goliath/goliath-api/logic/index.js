module.exports = {
    // USER
    registerUser: require('./user/register-user'),
    authenticateUser: require('./user/authenticate-user'),
    retrieveUser: require('./user/retrieve-user'),
    updateUser: require('./user/update-user'),
    unregisterUser: require('./user/unregister-user'),
    
    // INSTRUMENT
    registerInstrument: require('./instrument/register-instrument'),
    retrieveInstrument: require('./instrument/retrieve-instrument'),
    unregisterInstrument: require('./instrument/unregister-instrument'),
    updateInstrument: require('./instrument/update-instrument')

    // TRACKS
    // registerInstrument: require('./instrument/register-instrument'),
    // retrieveInstrument: require('./instrument/retrieve-instrument'),
    // unregisterInstrument: require('./instrument/unregister-instrument'),
    // updateInstrument: require('./instrument/update-instrument'),



}