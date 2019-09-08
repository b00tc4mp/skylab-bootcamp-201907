const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { User, Poll } = models

/**
 * Citizen votes on poll.
 * 
 * @param {String} userId
 * @param {String} pollId
 * @param {String} vote
 * 
 * @returns {Object} 
 */

module.exports = function (userId, pollId, vote) {

    validate.string(userId, 'userId')
    validate.string(pollId, 'pollId')
    validate.string(vote, 'vote')
    
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} does not exist`)

        const poll = await Poll.findById(pollId)
        if(!poll) throw new Error(`poll with id ${pollId} does not exist`)

        const alreadyVoted = user.participatedPolls.find(poll => {
            return poll.id === pollId
        })

        if(alreadyVoted) throw Error(`user already voted in poll ${pollId}`)
        user.participatedPolls.push(pollId)

        if(vote === 'positive') {
            poll.positives++
        }
        if(vote === 'negative') {
            poll.negatives++
        } 

        await poll.save()
        await user.save()

        return { pollId, positives: poll.positives, negatives: poll.negatives }
    })()
}
