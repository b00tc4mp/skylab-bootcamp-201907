const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = 
/**
 * Unregister user
 * Delete a user through the ID
 * 
 * @param {string} id: User id
 * @return {string} Error message: in case that user not exist os is not find
 * @return {number} deletedCount: in case that user not exist os is not find (range max 1)
 * 
 */
function (id) {
    validate.string(id, 'id')

    return this.__users__.deleteOne({ _id: ObjectId(id) })
        .then(({ deletedCount }) => {
            if(!deletedCount) throw Error('User does not exist or is not find')

            return deletedCount
        })
}