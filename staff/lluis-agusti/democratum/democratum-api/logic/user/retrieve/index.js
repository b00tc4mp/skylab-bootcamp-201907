const { models: { User } } = require('democratum-data')
// const { validate } = require('generisad-utils')

/**
* 
* @param {String} cityId
* @param {String} authorId
* @param {String} question
* @param {String} optionA
* @param {String} optionB
* @param {String} description
* @param {Date} expiryDate
* @param {String} imagePoll
* @param {Number} positives
* @param {Number} negatives
* @param {String} pollStatus
*
* @returns {Promise}
*
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')

    return (async () => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
            if (!user) throw Error(`user with id ${id} not found`)
            else {
                user.id = id
                return user
            }
    })()
}