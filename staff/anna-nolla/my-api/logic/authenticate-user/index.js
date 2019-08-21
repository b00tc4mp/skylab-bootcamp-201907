const validate = require("../../utils")

module.exports = {
    /**
     * 
     * @param {*} email
     * @param {*} password
     * 
     * @returns {Promise}
     */

    authenticateUser(email, password) {
        validate.email(email, 'email')
        validate.string(password, 'password')
        

        return this.__users__.findOne({ email: `${email}` })
            .then ((user) => { if(!user || password !== user.password) console.log("you are a noob try again")
                    console.log("congratz you logued in but nothing happened")
                    return user
            })
    }
}
