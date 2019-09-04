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
    validate.string(nickname, 'surname')
    validate.string(email, 'username')
    validate.email(email, 'username')
    
    return (async () => {
        const user = await User.findOne({ email })
        
        if (user) throw Error('User already exists.')
            
        await User.create({name, surname, nickname, email, password})

        return user
    })()
}