const { models: { User } } = require('data')
const { validate }= require('utils')
      /**
       * Retrieves users by geolocation respect a coordenates of id user.
       * 
       * @param {string} id The id its given by authenticateUser
       * @param {number} distance
       * 
       * @returns {Promise}
       * 
       */
module.exports = function (id, distance){
    validate.string(id,'user id') 
    validate.number(distance, 'distance') 
    debugger
        return (async () => {            
            const user = await User.findOne({ _id: id}, { _id: 0, password: 0 } ).lean()
                if (!user) throw new Error(`user with id ${id} not found`)
            
            const _location = user.static.coordinates
            //const { location: { coordinates: shh } } = user
                if (!_location) throw new Error(`user location with id ${id} not found`)

                // User.createIndex({point:"2dsphere"});
            
            const response = await User.find({ static: { $near: { $geometry: { type: "Point", coordinates: [ 2.1894, 41.403 ] }, $maxDistance: 5 * 100 } } })
                return response    
        })()    
}