const { User } = require('../../data')
const validate = require('../../utils/validate')

    /**
     * Authenticates a user by its credentials.
     * 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */


    module.exports = function (email, password) {
        // TODO validate fields
    
        return User.findOne({ email })
            .then(user => {
                if (!user) throw new Error(`user with e-mail ${email} does not exist`)
    
                if (user.password !== password) throw new Error('wrong credentials')
    
                return user.id
            })
    }