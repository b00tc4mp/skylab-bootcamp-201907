/**
 * Authenticate an user by credentials
 * 
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */
   
module.exports = function (email, password) {
    validate.string (email, 'email')
    validate.email (email, 'email')
    validate.string (password, 'password')
    // debugger
    return this.__users__.findOne ({email})
        .then (user =>{
            if (!user || user.password !== password) throw Error ('Wrong credentials')

            return user._id.toString()
        })
}