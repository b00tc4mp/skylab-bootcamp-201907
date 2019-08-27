const validate = require('../../../utils/validate')
const { User, Card } = require('../../../data')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id, owner) {
    validate.string(id, 'id')
    validate.string(owner, 'owner')

    return User.findOne({ _id : owner }, { _id: 0, __v: 0 })
        .then(user => { 
            
            const { cards } = user
            const index = cards.findIndex(card => card.id === id)
            if (index<0) throw Error(`Card not found.`)
            cards.splice(index)
            user.save()
              
        })
}