const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { Poll, User } = models

/**
 * Lists all polls of the citizen's city.
 * 
 * @param {String} userId The id of the user.
 * @param {String} pollId The id of the poll.
 * @param {String} targetCityId The id of the city.
 * 
 * @returns {Promise} An array of polls.
 */

module.exports = function(userId, targetCityId) {

    validate.string(userId ,'userId')
    validate.string(targetCityId ,'targetCityId')

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`The user is not logged in`)

        //if (user.cityId !== targetCityId) throw Error('you have no permission to access')

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