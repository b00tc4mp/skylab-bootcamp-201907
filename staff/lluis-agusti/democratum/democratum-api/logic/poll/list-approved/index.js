const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { User, Poll } = models

/**
* Retrieves approved/active polls.
* 
* @param {string} id
* 
* @returns {Promise}
*/


module.exports = function (id) {

    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id).lean()

        if (!user) throw new Error(`user with id ${id} not found`)

        const list = await Poll.find({ _id: pollId }, { _v: 0}).lean()

        if(!poll) throw new Error(`Poll with id ${pollId} not exist`)

        poll.forEach(polls => {
            polls.id = polls._id.toString()

            delete polls._id
        })

        return polls
    })()
}
