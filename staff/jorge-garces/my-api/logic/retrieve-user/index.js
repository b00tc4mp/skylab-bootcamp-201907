const { ObjectId } = require('mongodb')
const validate = require('../../utils/validate')

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

        // VIKING style
        // return this.__users__.findOne({ _id: ObjectId(id) })
        //     .then(user => {
        //         user.id = user._id.toString()
        //         delete user._id
        //         delete user.password

        //         return user
        //     })

        // TUNED style
        return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
            .then(user => {
                user.id = id

                return user
            })
    }

}