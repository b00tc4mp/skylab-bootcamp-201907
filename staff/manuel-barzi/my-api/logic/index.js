const { ObjectId } = require('mongodb')

module.exports = {
    /**
     * Registers a user.
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password
     * 
     * @returns {Promise}
     */
    registerUser(name, surname, email, password) {
        // TODO validate fields

        return this.__users__.findOne({ email })
            .then(user => {
                if (user) throw new Error(`user with e-mail ${email} already exists`)

                return this.__users__.insertOne({ name, surname, email, password })
            })
            .then(() => { })
    },

    /**
     * Authenticates a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise}
     */
    authenticateUser(email, password) {
        // TODO validate fields

        return this.__users__.findOne({ email })
            .then(user => {
                if (!user) throw new Error(`user with e-mail ${email} does not exist`)

                if (user.password !== password) throw new Error('wrong credentials')

                return user._id.toString()
            })
    },

    /**
     * Retrieves a user by its id.
     * 
     * @param {string} id 
     * 
     * @returns {Promise}
     */
    retrieveUser(id) {
        // TODO validate fields

        // VIKING
        // return this.__users__.findOne({ _id: ObjectId(id) })
        //     .then(user => {
        //         if (!user) throw new Error(`user with id ${id} not found`) 
        //         user.id = user._id.toString()
        //         delete user._id
        //         delete user.password

        //         return user
        //     })

        // TUNED
        return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
            .then(user => {
                if (!user) throw new Error(`user with id ${id} not found`)

                user.id = id

                return user
            })
    }
}