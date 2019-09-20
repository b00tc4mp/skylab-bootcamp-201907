// const validate = require('../../../utils/validate')
// const { User, Card } = require('../../../models')

// /**
//  * Unregisters a user by their id
//  * 
//  * @param {string} id 
//  * 
//  * @returns {Promise}
// */

// module.exports = function(id, owner) {
//     validate.string(id, 'id')
//     validate.string(owner, 'owner')

//     return User.findOne({ _id : owner }, { _id: 0, __v: 0 })
//         .then(user => { 
            
//             const { cards } = user
//             const index = cards.findIndex(card => card.id == id)
//             if (index<0) throw Error(`Card not found.`)
//             cards.splice(index,1)
//             user.save()
              
//         })
// }

const validate = require('../../../utils/validate')
const { User, Card } = require('../../../models')

/**
 * Unregisters card by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(userId , cardId){
    validate.string(userId , 'user id')
    validate.string(cardId , 'card id')
    return(async () => {
        const user = await User.findById(userId)
 
        if (!user) throw new Error (`user with id ${userId} does not exist`)
        const index = user.cards.findIndex(card => card.id === cardId )
        if(index<0) throw new Error (`card with id ${cardId} does not exist`) 
        
        user.cards.splice(index) 
        
        await user.save()
     })()
}