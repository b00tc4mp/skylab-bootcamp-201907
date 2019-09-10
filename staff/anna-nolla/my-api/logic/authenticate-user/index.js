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
        

        return this.__users__.findOne( { $and: [{ email: `${email}` }, {password:`${password}`}] })
            .then ((user) => { if (!user) console.log("you are a noob try again")
                    console.log("congratz you logued in but nothing happened")
                    return user._id.toString()
            })
    }
}
