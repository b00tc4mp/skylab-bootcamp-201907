const validate = require('../../validate')

module.exports = {
    /**
     * 
     * @param {*} name 
     * @param {*} surname 
     * @param {*} email 
     * @param {*} password 
     * 
     * @returns {Promise}
     */
     registerUser(name, surname, email, password) {
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')

        this.__users__.findOne(name)
            .then(user => console.log("la cagaste", user.name))
            .catch(error => { throw error })
        return Promise.resolve(
            this.__users__.insertOne({ name, surname, email, password })
                .then(() => { })
        )
    }
}