const { models: { User } } = require('menu-planner-data')
const { validate } = require('menu-planner-utils')
const bcrypt = require('bcryptjs') 


/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/


module.exports = function (userId, data) {
    
    validate.string(userId, 'id')

    return(async () => {
        const user = await User.findByIdAndUpdate(userId, { $set: data })
        if (!user) throw new Error(`user with id ${id} does not exist`)

        if(data.password) {
            const hash = await bcrypt.hash(data.password, 10)
            data.password = hash
        }

    })()
}