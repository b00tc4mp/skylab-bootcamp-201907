const {validate} = require('footcamp-utils')
const { models: { User } } = require('footcamp-data')

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
        debugger
        const user = await User.findOne({ email, password })
        if (!user) throw Error('Wrong credentials.')
        return user.id
    })()
}
