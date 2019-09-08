const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { User } = models

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Object}
 */

module.exports = function(id, fieldsToUpdate) {

    validate.string(id, 'id')
    
    if(!fieldsToUpdate)throw Error('No field to update provided')
    return(async()=>{
        const user=await User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
             if (!user) throw Error(`User with id ${id} does not exist.`)

    })()

}



/* 
module.exports = function (id, data) {
     validate.string(id, 'id')
    
    return (async () => {
        const user = await User.findByIdAndUpdate(id, {$set:data})

        if (!user) throw new Error(`user with id ${id} does not exist`)

        user.id = user._id.toString()
        delete user._id

        return user

        })()
} */



// esta bien el verify del hash???

//onst user = await User.findByIdAndUpdate(id, {$set:data, new: true, runValidators: true } ).select('-__v -password').lean()