//const validate = require('../../../utils/validate')
const { models: { User } } = require('vltra-data')
const { validate} = require('vltra-utils')
const bcrypt = require('bcryptjs')

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

module.exports = function(name, surname, nickname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(nickname, 'nickname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    
    const bookmarks = []
    const voted = []
    
    return (async () => {
        const nicknameCheck = await User.findOne({ nickname })
        if (nicknameCheck) throw Error(`nickname ${nickname} is already in use`)

        const user = await User.findOne({ email })
        if (user) throw Error(`user with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password,10)
        
        await User.create({name, surname, nickname, email, password : hash, bookmarks, voted})

        return user
    })()
}