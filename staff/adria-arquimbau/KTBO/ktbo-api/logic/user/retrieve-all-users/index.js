const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Retrieves all users by admin id.
 * 
 * @param {string} id - Identifier of the admin.
 * 
 * @returns {Promise} - Returns a promise with the all of the users with params without passwords.
 */

module.exports = function (id) {

    validate.string(id, 'id')

    return(async () => { 

        const res = await User.findOne({ _id: id })
        if(res.role === 'admin'){

            const users = await User.find({}, { password: 0 }).sort({_id:1}).lean()
            if (!users) throw new Error(`There isn't some user with id ${id}`)
    
            const retrievedUsers = users.map(user => {
                user.id = user._id.toString()
                return user

            })

            return retrievedUsers

        } else {
            throw new Error(`User with id ${id} is not an admin`)
        }

    })()
}