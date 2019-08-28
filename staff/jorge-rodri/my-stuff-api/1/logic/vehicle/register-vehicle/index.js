const { User, Vehicle } = require('../../../data')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (brand, model, year, type, color, electric, owner) {
    // TODO validate fields
    return (async () => {
        const user = await User.findOne({ _id: owner })
        if (!user) throw new Error(`User with ${owner} does not exists`)
        const vehicle = await Vehicle.findOne({ brand, model, year, color, electric, owner })

        if (vehicle) throw new Error(`User already has this car.`)

        const res = await Vehicle.create({ brand, model, year, type, color, electric, owner })

        return res
    })()
}