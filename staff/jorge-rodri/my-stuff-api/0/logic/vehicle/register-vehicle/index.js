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

    return User.findOne({ _id:owner })
        .then(user => {
            if (!user) throw new Error(`User with ${owner} does not exists`)
            return Vehicle.findOne({ brand, model, year, color, electric, owner })
                .then((vehicle) => {
                    if (vehicle) throw new Error(`User already has this car.`)
                })
                .then(() => { return Vehicle.create({ brand, model, year, type, color, electric, owner }) })
                .then(() => { })
        })
}