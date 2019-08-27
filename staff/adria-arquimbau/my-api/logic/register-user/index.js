const validate = require('../../utils/validate')
module.exports = function (name, surname, email, password){
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
        // TODO validate fields
    
        //NOVA AKI ESTA MIERDA if (password !== repassword) throw new Error('passwords do not match')

        return this.__users__.findOne({ email })
            .then(user => {
                if (user) throw new Error(`user with e-mail ${email} already exists`)

                return this.__users__.insertOne({ name, surname, email, password })
            })
            .then(() => { })
    
}