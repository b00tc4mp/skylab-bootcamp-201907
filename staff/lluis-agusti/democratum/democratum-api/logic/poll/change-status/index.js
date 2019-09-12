const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { Poll, User } = models

/**
 * 
 * @param {String} userId
 * @param {String} pollId
 * @param {String} newStatus
 *
 * 
 * @returns {Promise}
 */

module.exports = function(userId, pollId, newStatus) {

    validate.string(userId ,'userId')
    validate.string(pollId ,'pollId')
    validate.string(newStatus ,'newStatus')

    return (async () => {

        if (newStatus !== 'pending' && newStatus !== 'approved' && newStatus !== 'rejected' && newStatus !== 'expired') throw new Error('non valid newStatus')

/*         switch (newStatus) {
            case (!'pending'):
                throw new Error('non valid newStatus')
            case (!'rejected'):
                throw new Error('non valid newStatus')
            case (!'approved'):
                throw new Error('non valid newStatus')
            case (!'expired'):
                throw new Error('non valid newStatus')
        } */
        //if(newStatus != 'pending') throw new Error('non valid newStatus')

        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} does not exist`)

       const poll = await Poll.findById(pollId)
       if(!poll) throw new Error(`poll with id ${pollId} does not exist`)

       poll.pollStatus = newStatus

       //{ $push: { <field1>: { <modifier1>: <value1>, ... }, ... } }

        await poll.save()

        return poll
    })()
}