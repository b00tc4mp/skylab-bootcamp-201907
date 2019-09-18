const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { User, Poll } = models

/**
 * Creates a new poll. Users with the role 'citizen' only can create polls with status 'pending'.
 * 
 *  
 * @param {String} cityId The id of the city.
 * @param {String} authorId The id of the author.
 * @param {String} question Question of the poll.
 * @param {String} optionA First choice.
 * @param {String} optionB Second choice.
 * @param {String} description Detailed description of the question.
 * @param {Date} expiryDate Expiry date of the poll.
 * @param {String} imagePoll Image of the poll.
 * @param {Number} positives Positive votes.
 * @param {Number} negatives Negative votes.
 * @param {String} pollStatus Publiching status of the poll.
 *
 * @returns {Promise} The created poll.
 */



module.exports = function(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus) {
    
    positives = parseFloat(positives)
    negatives = parseFloat(negatives)
        
    validate.string(cityId, 'cityId')
    validate.string(authorId, 'authorId')
    validate.string(question, 'question')
    validate.string(optionA, 'optionA')
    validate.string(optionB, 'optionB')
    validate.string(description, 'description')
    validate.string(imagePoll, 'imagePoll')
    validate.number(positives, 'positives')
    validate.number(negatives, 'negatives')
    validate.string(pollStatus, 'pollStatus')
    
    return (async () => {

        //let user = await User.findOne({ _id: userId }, { _id: 0, password: 0 }).lean()
        //if (!user) throw Error('User does not exists')

        let poll = await Poll.findOne({ question })
        if (poll) throw Error('Poll already exists.')

        poll = new Poll ({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus: 'pending' })

        //poll.authorId = userId

        await poll.save()

        return poll
    })()
}