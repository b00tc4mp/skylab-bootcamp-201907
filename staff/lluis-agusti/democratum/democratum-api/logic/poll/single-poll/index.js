const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { Poll, User } = models

/**
 * Lists all polls of the citizen's city.
 * 
 * @param {String} userId The id of the user.
 * @param {String} pollId The id of the poll.
 * 
 * @returns {Promise} A complete poll.
 */

module.exports = function(pollId) {

    validate.string(pollId ,'pollId')

    return (async () => {

       const poll = await Poll.findById(pollId)
       if(!poll) throw new Error(`poll with id ${pollId} does not exist`)

        return poll
    })()
}