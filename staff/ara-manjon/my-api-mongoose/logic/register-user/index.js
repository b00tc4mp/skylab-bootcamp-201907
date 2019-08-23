const validate = require('../../utils/validate')
const { User } = require('../../data')
    /**
     * Registers a user.
     * @param {*} name 
     * @param {*} surname 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */

module.exports = function (name, surname, email, password){

        // TODO validate fields


        return User.findOne({ email })
            .then(user => {
                if (user) throw new Error(`user with e-mail ${email} already exists`)

                return User.create({ name, surname, email, password })
            })
            .then(() => { })
    
}