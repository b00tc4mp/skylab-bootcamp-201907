const validate = require('../../utils/validate')
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
        
        if (password != repassword) throw new Error('passwords do not matchh')
        
        
        return this.__users__.findOne({ email })
            .then(user => {
                if (user) throw new Error(`user with e-mail ${email} already exist`)
                
                return this.__users__.insertOne({ name, surname, email, password })
            })
            .then(() => { })
    }