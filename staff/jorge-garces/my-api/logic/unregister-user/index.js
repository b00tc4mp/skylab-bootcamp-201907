const { ObjectId } = require('mongodb')
const validate = require('../../utils/validate')

module.exports = {
    /**
         * Unregisters a user by their id
         * 
         * @param {string} id 
         * 
         * @returns {Promise}
         */

    unregisterUser(id) {
        return this.__users__.deleteOne({ _id: ObjectId(id) })
    }
}