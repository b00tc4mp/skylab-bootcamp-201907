const { models: { User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')
const bcrypt = require('bcryptjs')

/**
 * Updates a user.
 * 
 * @param {string} id - Identifier of the user.
 * @param {Object} data - Object with the update data.
 * 
 */

module.exports = function (id, data) {
    
    validate.string(id, 'id')
    
    return (async () => {

        if(!data.oldPassword) throw Error(`Old password is required`)

        const user = await User.findById( id )
        if(!user) throw Error(`user with id ${id} does not exist`)

        const match = await bcrypt.compare(data.oldPassword, user.password)
        if (!match) throw new Error('wrong credentials')

        if(data.password.length == 0) throw Error ('New password required')

        if(data.password){
        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        }

        if(data.role){
            if(user.role != "admin") throw Error('Not ADMIN user to will change the role')
        }
        
        await User.findByIdAndUpdate(id, { $set: data })

    })()
}