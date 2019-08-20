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
        // validate.str(email, 'email')
        validate.email(email, 'email')
        validate.str(password, 'password')

        return this.__users__.findOne({ email })
            .then( user => {
                if(!user) throw Error ("User not found")
                else{
                    if(email !== user.email || password !== user.password){
                        throw Error ("Wrong credentials")
                    }else{
                        return {email: user.email , password: user.password}
                    }
                }
            })
    }
}

