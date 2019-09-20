const validate = require('../../../utils/validate')
const { User } = require('../../../models')

/**
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 * 
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