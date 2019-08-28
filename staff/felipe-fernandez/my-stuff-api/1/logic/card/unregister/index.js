const validate = require('../../../utils/validate')
const { User } = require('../../../models')
/**
 * Unregisters a card by their id
 * 
 * @param {string} userId 
 * @param {string} cardId 
 * 
 * @returns {Promise}
*/
module.exports = function (userId, cardId) {

    validate.string(userId, 'User ID')
    validate.string(cardId, 'Card ID')
 
    return (async() => {

        const user = await User.findById(userId)
        debugger
            if (!user) throw Error(`User with id ${userId} does not exist.`)
            const cardFound = user.cards.find(card => card.id === cardId)
            if (!cardFound) throw Error(`Card with id ${cardId} not found`)
            user.cards.splice(user.cards.indexOf(cardFound, 1))
            await user.save()
       

    })()
    
}