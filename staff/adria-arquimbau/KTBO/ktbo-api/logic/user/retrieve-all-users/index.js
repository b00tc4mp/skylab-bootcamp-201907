const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    validate.string(id, 'id')


    return(async () => { 

        const res = await User.findOne({ _id: id })

        if(res.role === 'admin'){
            const users = await User.find({}, { password: 0 }).sort({_id:1}).lean() //El sort ordena los usuarios por entrada a registro -1 seria a la inversa
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