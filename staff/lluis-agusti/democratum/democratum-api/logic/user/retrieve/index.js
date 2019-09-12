const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models

/**
* 
*
* 
*
*/

module.exports = function (userId) {

    //validate.string(id, 'user id')

    return (async () => {
        const user = await User.findOne({ _id: userId }, { _id: 0, password: 0 }).lean()
        
        if (!user) throw Error(`citizen ${userId} not found`)
        
        else {
            user.id = userId
            return await user
        }
    })()
}