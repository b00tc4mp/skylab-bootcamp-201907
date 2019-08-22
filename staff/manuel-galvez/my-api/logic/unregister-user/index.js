const { ObjectId } = require('mongodb')
const validate = require('../../utils/validate')

module.exports = function(id, email, password) {

    /**
     * Unregisters a user by their id
     * 
     * @param {string} id 
     * 
     * @returns {Promise}
     */
    validate.string(id, 'id')
    validate.string(email, 'email')
    validate.string(password, 'password')

    return this.__users__.deleteOne({ _id: ObjectId(id), email, password })
        .then(response => {
            if (response.deletedCount == 0) throw Error(`Wrong user or credentials.`)
            return response
        })
}