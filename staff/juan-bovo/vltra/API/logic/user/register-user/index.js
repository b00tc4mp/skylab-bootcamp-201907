//const validate = require('../../../utils/validate')
const { models: { User } } = require('vltra-data')
const { validate} = require('vltra-utils')

/* Add: const { User } = require('../../../data')*/ 



/**
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} nickname
 * @param {*} email 
 * @param {*} password 
 * 
 * @returns {Promise}
 */

module.exports = function(name, surname, nickname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(nickname, 'nickname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    
    return (async () => {
        const user = await User.findOne({ email })
        
        if (user) throw Error(`user with e-mail ${email} already exists`)
            
        await User.create({name, surname, nickname, email, password})

        return user
    })()
}