const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Retrieve all the cards registered by user id.
 * 
 * @param {String} owner Id owner
 * @returns {Promise}
 * 
*/
module.exports = function(owner) {
    validate.string(owner, 'owner')

    return User.findOne({ _id : owner }, { _id: 0, __v: 0 }).lean()
        .then(user => { 
            const { cards } = user
            if (cards<0) throw Error(`User with id ${owner} does not own any card.`)
                        
            return cards
        })
}