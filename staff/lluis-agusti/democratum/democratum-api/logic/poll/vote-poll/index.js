const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { Poll, User } = models
const bcrypt = require('bcryptjs')

/**
 * Lists all polls of the citizen's city.
 * 
 * @param {String} userId The id of the user.
 * @param {String} pollId The id of the poll.
 * @param {String} vote The positive or negative vote.
 * 
 * @returns {Promise} An array of polls.
 */
module.exports = function(userId, pollId, vote) {

    validate.string(pollId ,'pollId')
    validate.string(userId ,'userId')
    validate.string(vote ,'vote')

    return (async () => {

        //if (vote !== 'positive' && vote !== 'negative') throw new Error('non valid vote')

    const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} does not exist`)

    let poll = await Poll.findById(pollId)
       if(!poll) throw new Error(`poll with id ${pollId} does not exist`)


    const alreadyVoted = user.participatedPolls.find(pollId => {
        return poll.id === pollId
    })

    if(alreadyVoted) throw Error(`user already voted in poll ${pollId}`)
    user.participatedPolls.push(pollId)

    if(vote === 'positive') { poll.positives++ } 
    if(vote === 'negative') { poll.negatives++ } 

    await poll.save()
    await user.save()

    return poll
    })()
}