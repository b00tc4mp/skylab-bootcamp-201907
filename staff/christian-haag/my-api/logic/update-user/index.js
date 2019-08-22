/**
* Update user data
* 
* @param {string} email old-email
* @param {string} email new-email
* 
* @returns {Promise}
*/
const { ObjectId } = require('mongodb')

module.exports = function (id, field, newData) {
    return this.__users__.update({ _id: ObjectId(id) }, { $set: { [`${field}`]: newData } })
        .then(user => { return user })
}

