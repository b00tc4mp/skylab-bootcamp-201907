const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
//const bcrypt = require('bcryptjs')
const { Poll, User } = models

/**
 * Lists all pending polls of the citizen's city.
 * 
 * @param {String} userId The id of the user.
 * @param {String} pollId The id of the poll.
 * @param {String} targetCityId The id of the city.
 * 
 * @returns {Promise} An array of polls.
 */

module.exports = function(userId, targetCityId, status) {
    
    validate.string(userId ,'userId')
    validate.string(targetCityId ,'targetCityId')
    validate.string(status ,'status')

    return (async () => {

        const user = await User.findById(userId, targetCityId)
        if (!user) throw Error(`You have to log in to list polls`)
        
        const polls = await Poll.find({ pollStatus : status })
        if (!polls) throw Error(`There are no expired polls to show`)
        else {

        return polls
        }
    })()
}