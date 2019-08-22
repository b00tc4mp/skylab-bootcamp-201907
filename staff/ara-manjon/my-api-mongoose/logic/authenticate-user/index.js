const validate = require('../../utils/validate')
module.exports = function (email, password){
    /**
     * 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */


        // TODO validate fields

        return this.__users__.findOne({ email })
            .then(user => {
                if (!user || user.password !== password) throw new Error(`user with e-mail ${email} does not exist`)
                if (user.password !== password) throw new Error('wrong credentials')

                return user._id.toString()
            })
    
}