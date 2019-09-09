const validate = require('../../../utils/validate')
const { User, Drumkit } = require('../../../data')

/**
 * Unregisters a drumkit
 * 
 * @param {string} userId 
 * @param {string} DrummkitId 
 * 
 * @returns {Promise}
*/

module.exports = function(userId, drumkitId) {
    validate.string(drumkitId, 'drumkit id')
    validate.string(userId, 'user id')

    return(async () => {
        const user = await User.findById(userId)
 
        if (!user) throw new Error (`user with id ${userId} does not exist`)
        const index = user.drumkits.findIndex(drumkit => drumkit.id === durmkitId )
        if(index<0) throw new Error (`card with id ${drumkitId} does not exist`) 
        
        user.drumkits.splice(index) 
        
        await user.save()
     })()
}