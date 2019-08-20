const { validate , call } = require('../../utils')
module.exports = {
    /**
     * 
     * @param {*} name 
     * @param {*} surname 
     * @param {*} email 
     * @param {*} password 
     * @param {*} repassword 
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
        return Promise.resolve()
    }
}