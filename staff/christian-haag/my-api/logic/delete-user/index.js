
/**
* Deletes a user by its id.
* All properties passed as values to the "projection" property 
* are discarted from de return.
* 
* @param {string} id 
* 
* @returns {Promise}
*/

const { ObjectId } = require('mongodb')

module.exports = function (id) {
    return this.__users__.findOne({ _id: ObjectId(id) })
        .then(user => {

            if (!user) throw Error('user does not exist')
            return this.__users__.deleteOne({ _id: ObjectId(id) })
        })
        .catch(error => { throw error })
}
