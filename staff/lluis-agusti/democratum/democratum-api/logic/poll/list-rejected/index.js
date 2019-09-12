const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
//const bcrypt = require('bcryptjs')
const { Poll, User } = models

/**
 * 
 * @param {String} userId
 * @param {String} targetCityId
 * @param {String} status
 *
 * 
 * @returns {Promise}
 */

module.exports = function(userId, targetCityId, status) {
    
    validate.string(userId ,'userId')
    validate.string(targetCityId ,'targetCityId')
    validate.string(status ,'status')

    return (async () => {

        const user = await User.findById(userId, targetCityId)
        if (!user) throw Error(`You have to log in to list polls`)
        
        const polls = await Poll.find({ pollStatus : status })
        if (!polls) throw Error(`There are no rejected polls to show`)
        else {

        return polls
        }
    })()
}