const validate = require('../../../utils/validate')
const { User } = require('../../../models')
/**
 * 
 * @param {*} userId 
 * @param {*} cardId 
 * @returns {Promise}
 * 
*/
module.exports = function (userId, cardId) {

    validate.string(userId, 'User ID')
    validate.string(cardId, 'Card ID')
    
    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist.`)
        const card = user.cards.find(card => card.id === cardId)
        if (!card) throw Error(`Card with id ${cardId} does not exist.`)
        return card
    })()
}