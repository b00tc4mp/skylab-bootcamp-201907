const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

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

    return Property.findByIdAndUpdate(id, { $set: data })
        .then(user => {
            if (!user) throw new Error(`user with id ${id} does not exist`)
        })
}