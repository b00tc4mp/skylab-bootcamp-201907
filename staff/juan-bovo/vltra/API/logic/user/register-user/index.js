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
 * @param {*} bookmarks 
 * @param {*} voted 
 * 
 * @returns {Promise}
 */

module.exports = function(name, surname, nickname, email, password, bookmarks, voted) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(nickname, 'nickname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.array(bookmarks, 'bookmarks')
    validate.array(voted, 'voted')
    
    return (async () => {
        const user = await User.findOne({ email })
        
        if (user) throw Error(`user with e-mail ${email} already exists`)
            
        await User.create({name, surname, nickname, email, password, bookmarks, voted})

        return user
    })()
}