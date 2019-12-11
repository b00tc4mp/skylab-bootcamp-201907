const { models: { User } } = require('my-project-data')
const { validate } = require('my-project-utils')

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
    
    return (async () => {
        const user = await User.findOne({ email, password })
            if (!user) throw new Error('Wrong credentials.')
            else return user.id
    })()
}