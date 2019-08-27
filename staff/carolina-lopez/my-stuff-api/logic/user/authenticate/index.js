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
   
    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    return User.findOne({ email, password })
        .then(user => {
            if (!user) throw Error('wrong credentials')

            return user._id.toString()
        })
}
