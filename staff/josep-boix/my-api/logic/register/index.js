const validate = require ('../../utils/validate')

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
        validate.email(email, 'email')
        validate.string(password, 'password')
        
        if (password !== repassword) throw Error ('Password does not match, repeat it')

        return this.__users__.findOne({email})
        .then(user => {
            if(user) throw Error ('Email already exists')
            this.__users__.insertOne({name, surname, email, password})
        })
    }
}
