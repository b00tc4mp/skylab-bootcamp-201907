const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { User, Poll } = models

/**
 * Updates body of a poll.
 * 
 * @param {string} pollId
 * @param {Object} body
 * 
 * @returns {Promise}
 */

module.exports = function (id, body) {
    
    //validate.string(pollId, 'pollId')
    
    return (async () => {

        //if (userRole !== "admin") throw new Error('You have no authorization to update the poll')

        //const user = await User.findById(id)
        //if (!user) throw new Error(`user with id ${id} does not exist`)

        const poll = await Poll.findByIdAndUpdate(id, {$set:body})
        if (!poll) throw new Error(`poll with id ${id} does not exist`)
        
        /* poll.id = poll._id.toString()

        delete poll._id */
    })()
}