const { validate } = require('../../utils') 

module.exports = {
    /**
     * Registers a user.
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
        validate.string(email, 'email')
        validate.string(password, 'password')
        validate.string(repassword, 'password repeat') 

        if (password !== repassword) throw new Error('passwords do not match') 

/*         return this.__users__.findOne({email})
            .then(user => {
                if(user) throw new Error(`${user.email} already exists`)
                else
                this.__users__.insertOne({ name, surname, email, password})                
            }) */
        return this.__users__.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            return this.__users__.insertOne({ name, surname, email, password })
        })
        .then(() => { })
        
    }
}