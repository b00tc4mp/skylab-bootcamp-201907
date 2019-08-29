const {
    validate
} = require('../../utils')
      /**
       * 
       * @param {string} name String introduced by user
       * @param {string} surname String introduced by user
       * @param {string} email String introduced by user, it should has condition of email
       * @param {string} password String introduced by user
       * @param {string} repassword String introduced by user, it should be equal to password
       * Introduce the user dades to mongodb://localhost/skylab. 
       * @returns {Promise}
       */
module.exports = function (name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return this.__users__.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            return this.__users__.insertOne({ name, surname, email, password })
        })
        .then(() => { })
}