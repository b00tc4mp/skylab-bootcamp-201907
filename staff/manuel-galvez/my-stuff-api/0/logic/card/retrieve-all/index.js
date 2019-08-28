const validate = require('../../../utils/validate')
const { User } = require('../../../models')

/**
 * 
 * @param {*} id 
 * @returns {Promise}
 * 
*/

module.exports = function(id) {
    
    validate.string(id, 'id')

    return User.findById(id)
        
        .then(user => {
            if (!user) throw Error(`User with id ${id} does not exist.`)
            user.cards.forEach(card => {
                card.id = card._id
                delete card._id
                
            })
            return user.cards
        })
}

