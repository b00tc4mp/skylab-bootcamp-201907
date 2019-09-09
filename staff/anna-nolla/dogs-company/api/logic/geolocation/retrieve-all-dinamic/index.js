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
    validate.number(distance, 'distance')   
        
    return (async () => {   
        // let response = []

        const user = await User.findById(id)
            if (!user) throw new Error(`user not found`)
        
        const location = user.dinamic
        //const { location: { coordinates: shh } } = user
            if (!location) throw new Error(`user location not found`)
        
        response = await User.find({ dinamic: { $near: { $geometry: location , $maxDistance: distance} } })

        return response    
        })()    
}