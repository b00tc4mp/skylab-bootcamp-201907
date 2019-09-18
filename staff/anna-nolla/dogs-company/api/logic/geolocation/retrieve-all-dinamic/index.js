const { models: { User } } = require('data')
const { validate } = require('utils')
      /**
       * Retrieves users by geolocation respect a coordenates of id user.
       * 
       * @param {string} id
       * @param {number} distance
       * 
       * @returns {Promise}
       * 
       */
module.exports = function (id, distance){

    validate.string(id,'user id')
    // validate.number(distance, 'distance')   
        
    return (async () => {   

        const user = await User.findById(id)
            if (!user) throw new Error(`User not found`)
        
        const location = user.dinamic
        if (user.dinamic.coordinates[0] === 0 & user.dinamic.coordinates[1] === 0 ) throw new Error(`User dinamic location not found`)
        //const { location: { coordinates: shh } } = user
        
        response = await User.find({ dinamic: { $near: { $geometry: location, $maxDistance: distance} } })

        return response    
        })()    
}