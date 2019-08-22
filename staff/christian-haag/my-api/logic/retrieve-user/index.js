const { ObjectId } = require('mongodb')
/**
    * Retrieves a user by its id.
    * All properties passed as values to the "projection" property 
    * are discarted from de return.
    * 
    * @param {string} id 
    * 
    * @returns {Promise}
    */

module.exports = function (id) {
    return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
        .then(user => {
            user.id = id
            return user
        })
}