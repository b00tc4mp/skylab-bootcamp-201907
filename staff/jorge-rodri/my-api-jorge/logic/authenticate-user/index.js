const validate = require("../../validate")

module.exports = {

    authenticateUser(email, password) {
        validate.string(email, 'username')
        validate.email(email, 'username')
        validate.string(password, 'password')
        let data = {}

        return this.__users__.findOne({ email, password })
            .then((user) => {
                if (!user) throw new Error("La jodiste")
                data.id = user._id
                return data
            })

    }
}