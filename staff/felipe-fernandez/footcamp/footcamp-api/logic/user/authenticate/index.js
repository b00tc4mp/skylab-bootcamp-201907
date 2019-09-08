const {validate} = require('footcamp-utils')
const { models: { User } } = require('footcamp-data')
const bcrypt = require('bcryptjs')

 /**
 * Authenticate a user

 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
*/

module.exports = function(email, password) {
   
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        
        const user = await User.findOne({ email })
        if (!user) throw Error('Wrong credentials.')

        const match = await bcrypt.compare(password , user.password)
        if(!match) throw new Error ('Wrong credentials')
        
        return user.id
    })()
}
