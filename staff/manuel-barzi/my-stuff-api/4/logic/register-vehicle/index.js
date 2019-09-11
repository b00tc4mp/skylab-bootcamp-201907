const { models: { User, Vehicle } } = require('my-stuff-data')

/**
 * Registers a card associated to a user.
 * 
 * @param {string} id 
 * @param {string} brand
 * @param {string} model
 * @param {string} license
 * @param {number} year
 * @param {string} type
 * @param {string} color
 * @param {boolean} electric
 * 
 * @returns {Promise}
 */
module.exports = function (id, brand, model, license, year, type, color, electric) {
    // TODO validate fields

    return Promise.all([User.findById(id), Vehicle.findOne({ license })])
        .then(([user, vehicle]) => {
            if (!user) throw new Error(`user with id ${id} does not exists`)

            if (vehicle) throw new Error(`vehicle with license ${license} already exists`)

            vehicle = new Vehicle({ brand, model, license, year, type, color, electric })

            vehicle.owner = id

            return vehicle.save()
        })
        .then(({ id }) => id)
}