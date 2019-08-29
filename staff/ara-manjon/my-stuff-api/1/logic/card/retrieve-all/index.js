const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Retrieve all cards by user id.
 * @param {String} id User id
 * @returns {Promise}
 * 
*/
module.exports = function(id) {
    validate.string(id, 'owner')
    return (async () => {
        const user = await User.findById(id)
        const cards = user.cards
        if (!cards) throw Error(`this user does not have any cards`)
        return cards
    })()
}