const validate = require('../../../utils/validate')
const bcrypt = require('bcryptjs')
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

module.exports = function (targetPollId, userId, vote) {

    validate.string(userId, 'userId')
    validate.string(targetPollId, 'targetPollId')
    validate.string(vote, 'vote')
    
    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} does not exist`)

        const poll = await Poll.findById(targetPollId)
        if(!poll) throw new Error(`poll with id ${targetPollId} does not exist`)

        const alreadyVoted = user.participatedPolls.find(targetPollId => {
            return poll.id === targetPollId
        })

        if(alreadyVoted) throw Error(`user already voted in poll ${targetPollId}`)
        user.participatedPolls.push(targetPollId)

        if(vote === 'positive') {
            poll.positives++
        }
        if(vote === 'negative') {
            poll.negatives++
        } 

        await poll.save()
        await user.save()

        return { targetPollId, positives: poll.positives, negatives: poll.negatives }
    })()
}




// verificar alreadyVoited