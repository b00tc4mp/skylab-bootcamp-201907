const validate = require('../../utils/validate')
const { User } = require('../../models')

/**
     * Unregisters a user by their id
     * 
     * @param {string} id 
     * 
     * @returns {Promise}
     */

module.exports = function (id, email, password) {

    // validate.string(id, 'id')
    // validate.string(email, 'email')
    // validate.string(password, 'password')

    return User.deleteOne({ _id: id, email, password })
        .then(result => {
            if (!result.deletedCount) throw Error('Wrong user / credentials.')
        })
}