const validate = require ('../../utils/validate')

module.exports = {

    authenticateUser (email, password){
        validate.string(email, 'email')
        validate.email(email, 'email')
        validate.string(password, 'password')
        
        return this.__users__.findOne({email})
        .then (user => {
            if (!user) throw Error ('Email does not exists')

            user.password
        })
    }
    

}