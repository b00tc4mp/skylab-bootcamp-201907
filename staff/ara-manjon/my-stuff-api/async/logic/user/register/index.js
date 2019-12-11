const validate = require('../../../utils/validate')
const { User } = require('../../../data')
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

module.exports = function(name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'username')
    validate.email(email, 'username')
    
    return (async () => {
        const user = await User.findOne({ email })
        
        if (user) throw Error('User already exists.')
            
        await User.create({name, surname, email, password})
        return user
    })()
}