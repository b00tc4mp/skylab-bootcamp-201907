const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {

    validate.string(id, 'id')

    return Property.deleteOne({ _id: id })
        .then(result => {
            if (!result.deletedCount) throw Error('wrong credentials')
        })
}