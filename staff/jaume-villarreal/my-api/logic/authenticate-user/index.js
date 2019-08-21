const { validate} = require('../../utils')

module.exports = {
    /**
    * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Promise}
    */

    authenticateUser(email, password) {
            validate.email(email, 'email')
            validate.str(password, 'password')

            return this.__users__.findOne( {$and: [{ email } , { password }]})
                .then( user => {
                    if(!user) throw Error ("Wrong credentials")
                    user._id.toString()
                }).
                catch( error => {throw error})
    }
}
