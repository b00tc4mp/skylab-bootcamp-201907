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

module.exports = function (id) {

    //validate.string(id, 'user id')

    return (async () => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        
        if (!user) throw Error(`citizen ${id} not found`)
        
        else {
            user.id = id
            return await user
        }
    })()
}