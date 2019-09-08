const { models: { User } } = require('data')
const { validate }= require('utils')

/**
 * Updates a user geolocation.
 * 
 * @param {string} id 
 * @param {string} longitude 
 * @param {string} latitude 
 * 
 * @returns {Promise}
 */

module.exports = function (id, longitude, latitude) {
    validate.string(id, 'id')
    validate.number(longitude, 'longitude')
    validate.number(latitude, 'latitude')

    const dinamic = { type: 'Point', coordinates: [longitude, latitude] }

    return (async () => {
        const user = await User.findById(id).lean()
            if (!user) throw new Error(`user not found`)

        await User.updateOne({ _id:id }, { $set: dinamic })

    })()
}
