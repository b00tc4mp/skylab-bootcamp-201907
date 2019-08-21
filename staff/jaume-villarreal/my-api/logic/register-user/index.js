const { validate } = require('../../utils')

module.exports = {
    /**
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} repassword 
     * 
     * @returns {Promise}
     */
    registerUser(name, surname, email, password, repassword) {
        // TODO this.__users__.findOne/.insertOne...
        validate.str(name , 'name')
        validate.str(surname , 'surname')
        validate.str(email , 'email')
        validate.email(email , 'email')
        validate.str(password , 'password')
        
        if(password !== repassword) throw Error ("Passwords don't match")

        return this.__users__.findOne({ email })
            .then( user => {
                if(user) throw Error('This user already exists')
                this.__users__.insertOne({ name , surname , email , password})
            }).then( () => {})
    }
}