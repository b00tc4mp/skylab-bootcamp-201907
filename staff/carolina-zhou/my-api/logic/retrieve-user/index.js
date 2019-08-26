const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    validate.string(id, 'id')

    // VIKING style
    // return this.__users__.findOne({ _id: ObjectId(id) })
    //     .then(user => {
    //         user.id = user._id.toString()
    //         delete user._id
    //         delete user.password

    //         return user
    //     })

    return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
        .then(user => {
            if (!user) throw new Error(`user with id ${id} not found`)

            user.id = id

            return user
        })
}