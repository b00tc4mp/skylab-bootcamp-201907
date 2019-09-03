const validate = require('../../utils/validate')
// const { ObjectId } = require('mongodb')
// Add:
const { User } = require('../../data')
const mongoose = require('mongoose')

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

    // return User.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
    return User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${id} not found`)

            user.id = id

            return user
        })
}