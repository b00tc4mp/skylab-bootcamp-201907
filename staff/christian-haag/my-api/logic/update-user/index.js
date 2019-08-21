const { ObjectId } = require('mongodb')
const logic = require('../retrieve-user')
module.exports = {
    /**
     * Update user data
     * 
     * @param {string} email old-email
     * @param {string} email new-email
     * 
     * @returns {Promise}
     */
    updateUser(id, field, newData) {
        return this.__users__.update({ _id: ObjectId(id) }, { $set: { [`${field}`]: newData } })
            .then(user => { return user })
    }

}