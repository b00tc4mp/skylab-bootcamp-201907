const validate = require('../../../utils/validate')
const { User, Card } = require('../../../models')

/**
 * 
 * @param {*} id 
 * @returns {Promise}
 * 
*/

module.exports = function(id, cardId) {
    
    validate.string(id, 'id')
    validate.string(cardId, 'cardId')

    return User.findById({id})
        .then(user=> {
            const card = user.card.find(cardId)
            debugger
            return card
        })

    // return Card.findOne({ _id: id }, { _id: 0, __v: 0 }).lean()
    //     .then(card => {
    //         if (!card) throw Error(`Card with id ${id} does not exist.`)
    //         card.id = id
    //         return card
    //     })
}