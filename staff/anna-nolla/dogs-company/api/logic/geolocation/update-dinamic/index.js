const { models: { User } } = require('data')
const { validate }= require('utils')

/**
 * Updates a user geolocation.(dinamic) to be refreshed every 3 seconds
 * 
 * @param {string} id 
 * @param {number} longitude 
 * @param {number} latitude 
 * 
 * @returns {Promise}
 */

module.exports = function (id, longitude, latitude) {
    validate.string(id, 'user id')
    validate.number(longitude, 'longitude')
    validate.number(latitude, 'latitude')
   
    const dinamic = { type: 'Point', coordinates: [longitude, latitude] }

    return (async () => {
        const user= await User.findById(id)
            if (!user) throw new Error(`User not found`)

            user.dinamic = dinamic
            user.dinamic.id = user.dinamic._id
            delete user.dinamic._id

        await user.save()
    })()
}
