const validate = require('../../../utils/validate')
const { User } = require('../../../models')

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

    return User.findOne({ email, password })
        .then(user => {
            if (!user) throw Error('Wrong credentials.')

            return user._id.toString()
        })
}
