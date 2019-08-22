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
    return this.__users__.deleteOne({ _id: ObjectId(id), email, password })
        .then(response => {
            if (response.deletedCount == 0) throw Error('Wrong user / credentials.')
            return response
        })
}