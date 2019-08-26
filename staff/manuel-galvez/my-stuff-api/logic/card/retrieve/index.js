const { ObjectId } = require('mongodb')
const validate = require('../../../utils/validate')
const { Card } = require('../../../models')

/**
 * 
 * @param {*} id 
 * @param {*} cardId 
 * @returns {Promise}
 * 
*/

module.exports = function(id, cardId) {
    
    validate.string(id, 'id')
    validate.string(cardId, 'Card ID')

    return User.findById(id)
        .then(user => {
            if (!user) throw Error(`User with id ${id} does not exist.`)
            const card = user.cards.find(card => card.id === cardId)
            if (!card) throw Error(`Card with id ${id} does not exist.`)
            return card
        })
}