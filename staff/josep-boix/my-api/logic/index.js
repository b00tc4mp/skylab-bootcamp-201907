const {ObjectId} = require ('mongodb')
const validate = require ('../utils/validate')

module.exports = {
    /**
     * Register an user
     * 
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * @param {string} repassword
     * 
     * @return {Promise}
     */
    registerUser (name, surname, email, password, repassword) {
        validate.string (name, 'name')
        validate.string (surname, 'surname')
        validate.string (email, 'email')
        validate.email (email, 'email')
        validate.string (password, 'password')

        if (password !== repassword) throw Error ('passwords do not match.')

        return this.__users__.findOne({email})
            .then (user => {
                if (user) throw Error (`User with email ${mail} already exists.`)

                return this.__users__.insertOne({name, surname, email, password})
            })
            .then (() => {})
    },

    /**
     * Authenticate an user by the credentials
     * 
     * @param {string} email
     * @param {string} password
     * 
     * @returns {Promise}
     */
    authenticateUser (email, password) {
        validate.string (email, 'email')
        validate.email (email, 'email')
        validate.string (password, 'password')
        debugger
        return this.__users__.findOne ({email})
            .then (user =>{
                if (!user || user.password !== password) throw Error ('Wrong credentials')

                return user._id.toString()
            })

    }
}