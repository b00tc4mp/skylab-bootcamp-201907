const validate = require("../../validate")
const ObjectId = require('mongodb')

module.exports = {
    deleteUser(email, password) {
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')
        return this.__users__.findOne({ email, password })
            .then(user => {
                if (!user) throw new Error("User does not exist.")
                return this.__users__.deleteOne( ObjectId(user.id) )
                .then(()=>{})
            })
    }
}