const validate = require('../../utils/validate')

module.exports = {
    registerUser(id , token) {
        validate.string(name, 'name')
        validate.string(surname, 'surname')
        validate.email(email, 'email')
        validate.string(password, 'password')
        validate.string(repassword, 'repassword repeat')

        if(password !== repassword) throw new Error('passwords do not match')

        return this.__users__.findOne(
                { _id: ObjectId(id) },
                { password: 0}
            )
            .then(user => {
                if (!response) throw Error('Wrong credentials.')

                this.__users__.insertOne({ name, surname, email, password})
            })
    }


}