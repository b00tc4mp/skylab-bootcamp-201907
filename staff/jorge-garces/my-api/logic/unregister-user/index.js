const { ObjectId } = require('mongodb')
const validate = require('../../utils/validate')

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

    return this.__users__.deleteOne({ _id: ObjectId(id), email, password })
        .then(result => {
            if (!result.deletedCount) throw Error('Wrong user / credentials.')
        })
}