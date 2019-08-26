const validate = require('../../utils/validate')
const {User} = require('../../models')
/**
     * 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */


 module.exports = function(email, password) {
        
        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')

        return User.findOne({ email })
            .then(user => {
                if (!user || user.password !== password) throw Error(`user with e-mail ${email} does not exist`)

                return user._id.toString()
            })
    }
