const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { Poll } = models

/**
 * Updates a user .
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */

module.exports = function (id, data) {
    
    validate.string(id, 'id')
    
    async () => {
        const poll = await Poll.findByIdAndUpdate(id, {$set:data})

        if (!poll) throw new Error(`user with id ${id} does not exist`)
        
        poll.id = poll._id.toString()

        delete poll._id

    }
}