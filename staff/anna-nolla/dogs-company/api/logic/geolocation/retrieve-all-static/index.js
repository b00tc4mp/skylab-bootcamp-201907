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
module.exports = function (userId, distance){

    validate.string(userId,'user id')
       
        
    return (async () => {   
        const user = await User.findById(userId)
            if (!user) throw new Error(`User not found`)
            // if (user.dinamic.coordinates[0] === 0 & user.dinamic.coordinates[1] === 0 ) throw new Error(`User dinamic location not found`)
      
        
        response = await User.find({ static: { $near: { $geometry: {type:"point", coordinates:[user.dinamic.coordinates[0], user.dinamic.coordinates[1]]}, $maxDistance: distance }} })

        return response    
        })()    
}