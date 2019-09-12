/**
 * 
 */
const validate = require('utils/validate')
const { models: { User, Cache } } = require('data')

function retrieveNear(userId, distance) {
    
    validate.string(userId, 'user id')
    validate.number(distance, 'distance')

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new Error(`user does not exist`)
        
        const location = user.location
        if (user.location.coordinates[0] === 0 & user.location.coordinates[1] === 0 ) throw new Error(`User location not found`)

        response = await Cache.find({ location: { $near: { $geometry: location, $maxDistance: distance} } })

        return response    
         
    })()
}

module.exports = retrieveNear
