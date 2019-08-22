const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

    /**
     * Retrieves a user by its id.
     * 
     * @param {string} id 
     * 
     * @returns {Promise}
     */
module.exports = function(id) {
        return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
            .then(user => {
                user.id = id
                return user
            })
    }