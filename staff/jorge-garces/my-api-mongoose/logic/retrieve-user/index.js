const validate = require('../../utils/validate')
const { User } = require('../../models')


/**
     * Retrieves a user by its id.
     * 
     * @param {string} id 
     * 
     * @returns {Promise}
     */

module.exports = function (id) {
    // TODO validate fields

    // VIKING style
    // return this.__users__.findOne({ _id: ObjectId(id) })
    //     .then(user => {
    //         user.id = user._id.toString()
    //         delete user._id
    //         delete user.password

    //         return user
    //     })

    // TUNED style
    return User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        .then(user => {
            if (!user) throw Error(`User with id ${id} does not exist.`)
            user.id = id

            return user
        })
}