const { User, Vehicle } = require('../../../data')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    return User.findOne({ _id: id }, { password: 0 }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${id} not found`)
            return Vehicle.findOne({owner: user._id})
                .then( vehicle => {
                    if (!vehicle) throw new Error(`vehicle with id ${vehicle._id} not found`)  
                    return vehicle
                })
        })
}