const { ObjectId } = require('mongodb')

module.exports = {
    /**
     * Retrieves a user by its id.
     * 
     * @param {string} id 
     * 
     * @returns {Promise}
    */
    retrieveUser(id) {
        // TODO validate fields
        return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
            .then(user => {
                if (!user) throw new Error(`user with id ${id} not found`)
                user.id = id
                return user
            })
    }
}