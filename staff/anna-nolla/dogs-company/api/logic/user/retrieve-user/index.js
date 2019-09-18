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
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0, __V:0 }).lean()
            if (!user) throw Error(`user with id ${id} not found`)
            else {
                user.id = id
                return user
            }
    })()
}