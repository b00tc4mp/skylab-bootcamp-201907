const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { User, Poll } = models

/**
 * Lists all polls of the citizen's city.
 * 
 * @param {String} id The id of the poll.
 * @param {String} body The full id of the city.
 * 
 */

module.exports = function (id, body) {
    
    validate.string(id, 'id')
    
    return (async () => {

        const poll = await Poll.findByIdAndUpdate(id, { $set: body })

        if (!poll) throw new Error(`poll with id ${id} does not exist`)
        
        poll.id = poll._id.toString()

        delete poll._id

    })()
}
