const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {

    validate.string(id, 'id')

    return Vehicle.findByIdAndUpdate(id, { $set: data })
        .then(user => {
            if (!user) throw new Error(`user with id ${id} does not exist`)
        })
}