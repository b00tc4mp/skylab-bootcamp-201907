const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { Poll, User } = models

/**
 * 
 * @param {String} userId
 * @param {String} cityId
 * 
 * @returns {Promise}
 */

module.exports = function(userId, targetCityId) {

    validate.string(userId ,'userId')
    validate.string(targetCityId ,'targetCityId')

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`The user is not logged in`)

        const polls = await Poll.find({cityId : targetCityId})
        if (!polls) throw Error(`There are no polls to show`)

        else {
    
            return polls
        }
    })()
}

/*

 module.exports = function() {
    
    return (async () => {
        const polls = await Poll.find( {},{ __v: 0 }).sort({_id:1}).lean() 
        if (!polls) throw Error(`there are no polls`)   
        
        return polls
    })()

*/