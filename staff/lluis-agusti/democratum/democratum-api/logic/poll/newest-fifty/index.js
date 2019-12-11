const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
//const bcrypt = require('bcryptjs')
const { Poll, User} = models

/**
 * Lists all polls of the citizen's city.
 * 
 * @param {String} userId The id of the user.
 * @param {String} targetCityId The id of the city.
 * 
 * @returns {Promise} An array of polls.
 */

module.exports = function(userId, status) {
    
    validate.string(userId ,'userId')
    validate.string(status ,'status')

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw Error(`You have to log in to list polls`)
        
        const polls = await Poll.find({ pollStatus : status }).limit(50)
        if (!polls) throw Error(`There are no polls to show`)
        else {

        return polls
        }
    })()
}