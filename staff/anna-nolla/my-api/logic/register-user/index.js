const  validate  = require("../../utils")
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
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.email(email, 'username')
        validate.string(password, 'password')
        validate.string(repassword, 'passwod repeat')

        if (password !== repassword) console.log('passwords do not match')
        
        return this.__users__.findOne({ email:`${email}` }) 
            .then ( (user) => (!user ? 
                                this.__users__.insertOne({ name, surname, email, password }) 
                                : console.log("you are a noob that is already registered")))

        // TODO this.__users__.findOne/.insertOne... 
    }
}