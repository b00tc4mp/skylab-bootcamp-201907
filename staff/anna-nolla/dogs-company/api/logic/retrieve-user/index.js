const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 * @param {*} repassword 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')

    return (async () => {
        const user = await User.findById(id).lean()
            if (!user) throw Error(`user with id ${id} not found`)
            else {
                user.id = id
                return user
            }
    })()
}